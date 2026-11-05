// Barbaros randevu servisi birim testleri (UMAY 7, node:test).
// Sadece veritabanina gitmeden ONCE yapilan dogrulamalar test edilir.
const test = require("node:test");
const assert = require("node:assert/strict");
const service = require("./appointment.service");

const rejectsWith = (promise, message) =>
  assert.rejects(promise, (error) => {
    assert.equal(error.message, message);
    assert.equal(error.statusCode, 400);
    return true;
  });

test("getBookedTimes: geçersiz usta reddedilir", async () => {
  await rejectsWith(service.getBookedTimes("Olmayan Usta", "2030-01-01"), "Geçersiz usta seçimi.");
});

test("getBookedTimes: tarih yoksa reddedilir", async () => {
  await rejectsWith(service.getBookedTimes("Yasin Küçük", ""), "Tarih bilgisi gereklidir.");
});

test("changeAppointmentStatus: geçersiz randevu numarası reddedilir", async () => {
  await rejectsWith(service.changeAppointmentStatus("abc", "confirmed"), "Geçersiz randevu numarası.");
  await rejectsWith(service.changeAppointmentStatus(0, "confirmed"), "Geçersiz randevu numarası.");
});

test("changeAppointmentStatus: geçersiz durum reddedilir", async () => {
  await rejectsWith(service.changeAppointmentStatus(1, "silindi"), "Geçersiz randevu durumu.");
});
