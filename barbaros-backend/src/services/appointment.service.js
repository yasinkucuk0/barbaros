const {
  findAll,
  findByBarberDateAndTime,
  create,
} = require("../repositories/appointment.repository");

const getAllAppointments = async () => {
  return await findAll();
};

const createAppointment = async (appointmentData) => {
  const existingAppointment = await findByBarberDateAndTime(
    appointmentData.barber,
    appointmentData.date,
    appointmentData.time
  );

  if (existingAppointment) {
    const error = new Error(
      "Seçtiğiniz berber bu tarih ve saatte dolu."
    );

    error.statusCode = 409;
    throw error;
  }

  return await create(appointmentData);
};

module.exports = {
  getAllAppointments,
  createAppointment,
};