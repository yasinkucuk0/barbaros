const { test, describe, expect } = require('node:test');
const { strict: assertStrict } = require('node:assert/strict');

const { getAllAppointments, getBookedTimes, createAppointment, changeAppointmentStatus } = require('../appointment.service');

describe('Appointment Service Tests', () => {
  test('should reject with error when calling getAllAppointments with invalid input', async () => {
    await assertStrict.rejects(getAllAppointments('invalidInput'));
  });

  test('should reject with error when calling getBookedTimes with invalid barber', async () => {
    await assertStrict.rejects(getBookedTimes('invalidBarber', '2023-10-01'));
  });

  test('should reject with error when calling getBookedTimes with invalid date', async () => {
    await assertStrict.rejects(getBookedTimes('Yasin Küçük', 'invalidDate'));
  });

  test('should reject with error when calling createAppointment with invalid input', async () => {
    await assertStrict.rejects(createAppointment({}));
  });

  test('should reject with error when calling changeAppointmentStatus with invalid id', async () => {
    await assertStrict.rejects(changeAppointmentStatus('invalidId', 'pending'));
  });

  test('should reject with error when calling changeAppointmentStatus with invalid status', async () => {
    await assertStrict.rejects(changeAppointmentStatus('1', 'invalidStatus'));
  });
});