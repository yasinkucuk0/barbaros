
"use strict";

/*
 * BARBAROS ERKEK KUAFORU
 * Randevu Sistemi - Davranis Testleri
 *
 * Gercek veritabanina baglanmaz.
 * Prisma migration calistirmaz.
 * Mevcut proje dosyalarini degistirmez.
 */

const test = require("node:test");
const assert = require("node:assert/strict");

const CANCELLED = "cancelled";

// Iki randevunun ayni berber, tarih ve saatte
// olup olmadigini kontrol eder.
function sameSlot(a, b) {
  return (
    a.barber === b.barber &&
    a.date === b.date &&
    a.time === b.time
  );
}

// Mevcut veritabani UNIQUE kisitinin davranisi.
// Iptal edilen randevulari da engel sayar.
function currentDatabaseAllows(records, candidate) {
  return !records.some((record) =>
    sameSlot(record, candidate)
  );
}

// Hedefledigimiz yeni randevu kurali.
// Iptal edilen randevular saati bloke etmez.
function desiredBookingAllows(records, candidate) {
  if (candidate.status === CANCELLED) {
    return true;
  }

  return !records.some((record) =>
    record.status !== CANCELLED &&
    sameSlot(record, candidate)
  );
}

const cancelledAppointment = {
  id: 1,
  barber: "Yasin Küçük",
  date: "2026-11-10",
  time: "14:00",
  status: CANCELLED,
};

const newAppointment = {
  id: 2,
  barber: "Yasin Küçük",
  date: "2026-11-10",
  time: "14:00",
  status: "pending",
};

// TEST 1
test(
  "Mevcut UNIQUE kisiti iptal edilen saati engeller",
  () => {
    const result = currentDatabaseAllows(
      [cancelledAppointment],
      newAppointment
    );

    assert.equal(result, false);
  }
);

// TEST 2
test(
  "Hedef kural iptal edilen saati yeniden acar",
  () => {
    const result = desiredBookingAllows(
      [cancelledAppointment],
      newAppointment
    );

    assert.equal(result, true);
  }
);

// TEST 3
test(
  "Hedef kural iki aktif randevuya izin vermez",
  () => {
    const activeAppointment = {
      ...cancelledAppointment,
      status: "pending",
    };

    const result = desiredBookingAllows(
      [activeAppointment],
      newAppointment
    );

    assert.equal(result, false);
  }
);

// TEST 4
test(
  "Hedef kural iptal gecmisini koruyabilir",
  () => {
    const records = [
      cancelledAppointment,
    ];

    const allowed = desiredBookingAllows(
      records,
      newAppointment
    );

    if (allowed) {
      records.push(newAppointment);
    }

    assert.equal(records.length, 2);
    assert.equal(records[0].status, CANCELLED);
    assert.equal(records[1].status, "pending");
  }
);

// TEST 5
test(
  "Farkli berber ayni saatte randevu alabilir",
  () => {
    const otherBarber = {
      ...newAppointment,
      barber: "Emir Küçük",
    };

    const result = desiredBookingAllows(
      [newAppointment],
      otherBarber
    );

    assert.equal(result, true);
  }
);

// TEST 6
test(
  "Farkli tarihte ayni saat kullanilabilir",
  () => {
    const anotherDate = {
      ...newAppointment,
      date: "2026-11-11",
    };

    const result = desiredBookingAllows(
      [newAppointment],
      anotherDate
    );

    assert.equal(result, true);
  }
);
