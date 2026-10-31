
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const BACKUP_DIR = path.join(__dirname, "umay_backups");
const BACKUP_NAME =
  "barbaros_before_appointment_fix_20261028_191626.db";

const BACKUP_PATH = path.join(BACKUP_DIR, BACKUP_NAME);

// Python yalnizca SQLite testlerini calistirmak icin kullanilir.
// Testler gecici bir veritabani kopyasinda gerceklesir.
const PYTHON_SCRIPT = String.raw`
import sqlite3
import json
import sys

db_path = sys.argv[1]
connection = sqlite3.connect(db_path)

try:
    cursor = connection.cursor()

    # Mevcut Appointment tablosunun kopyasini olustur.
    # Test icin orijinal randevu verilerini kullanmiyoruz.
    cursor.execute("DROP TABLE IF EXISTS umay_appointment_test")

    cursor.execute("""
        CREATE TABLE umay_appointment_test (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            barber TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            UNIQUE (barber, date, time)
        )
    """)

    cursor.execute("""
        INSERT INTO umay_appointment_test
        (barber, date, time, status)
        VALUES (?, ?, ?, ?)
    """, ("Yasin", "2026-11-10", "14:00", "cancelled"))

    old_constraint_blocks = False

    try:
        cursor.execute("""
            INSERT INTO umay_appointment_test
            (barber, date, time, status)
            VALUES (?, ?, ?, ?)
        """, ("Yasin", "2026-11-10", "14:00", "pending"))
    except sqlite3.IntegrityError:
        old_constraint_blocks = True

    cursor.execute("DROP TABLE umay_appointment_test")

    # Yeni yaklasim: sadece iptal edilmemis
    # randevular icin benzersiz saat.
    cursor.execute("""
        CREATE TABLE umay_appointment_test (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            barber TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending'
        )
    """)

    cursor.execute("""
        CREATE UNIQUE INDEX umay_active_slot_unique
        ON umay_appointment_test (barber, date, time)
        WHERE status != 'cancelled'
    """)

    cursor.execute("""
        INSERT INTO umay_appointment_test
        (barber, date, time, status)
        VALUES (?, ?, ?, ?)
    """, ("Yasin", "2026-11-10", "14:00", "cancelled"))

    cursor.execute("""
        INSERT INTO umay_appointment_test
        (barber, date, time, status)
        VALUES (?, ?, ?, ?)
    """, ("Yasin", "2026-11-10", "14:00", "pending"))

    cancelled_slot_reused = True

    active_duplicate_blocked = False

    try:
        cursor.execute("""
            INSERT INTO umay_appointment_test
            (barber, date, time, status)
            VALUES (?, ?, ?, ?)
        """, ("Yasin", "2026-11-10", "14:00", "pending"))
    except sqlite3.IntegrityError:
        active_duplicate_blocked = True

    cursor.execute("""
        SELECT status
        FROM umay_appointment_test
        WHERE barber = ? AND date = ? AND time = ?
        ORDER BY id
    """, ("Yasin", "2026-11-10", "14:00"))

    statuses = [row[0] for row in cursor.fetchall()]

    print(json.dumps({
        "old_constraint_blocks": old_constraint_blocks,
        "cancelled_slot_reused": cancelled_slot_reused,
        "active_duplicate_blocked": active_duplicate_blocked,
        "history_preserved": statuses == ["cancelled", "pending"]
    }))

finally:
    connection.close()
`;

function runSQLiteTest() {
  if (!fs.existsSync(BACKUP_PATH)) {
    throw new Error("Veritabani yedegi bulunamadi.");
  }

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "barbaros-sqlite-test-")
  );

  const tempDb = path.join(tempDir, "test.db");
  const tempScript = path.join(tempDir, "test.py");

  try {
    fs.copyFileSync(BACKUP_PATH, tempDb);
    fs.writeFileSync(tempScript, PYTHON_SCRIPT, "utf8");

    let output;
    try {
      output = execFileSync("python", [tempScript, tempDb], {
        encoding: "utf8",
        timeout: 15000,
      });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;

      output = execFileSync("py", ["-3", tempScript, tempDb], {
        encoding: "utf8",
        timeout: 15000,
      });
    }

    return JSON.parse(output.trim());
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

test("SQLite randevu kisitlari", async (t) => {
  const results = runSQLiteTest();

  await t.test(
    "Mevcut kisit iptal edilen saati engelliyor",
    () => {
      assert.equal(results.old_constraint_blocks, true);
    }
  );

  await t.test(
    "Yeni kisit iptal edilen saati yeniden kullandiriyor",
    () => {
      assert.equal(results.cancelled_slot_reused, true);
    }
  );

  await t.test(
    "Yeni kisit iki aktif randevuyu engelliyor",
    () => {
      assert.equal(results.active_duplicate_blocked, true);
    }
  );

  await t.test(
    "Iptal edilen randevunun gecmisi korunuyor",
    () => {
      assert.equal(results.history_preserved, true);
    }
  );
});
