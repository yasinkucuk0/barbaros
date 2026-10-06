const {
  findAll,
  create,
} = require("../repositories/appointment.repository");

const getAllAppointments = async () => {
  return await findAll();
};

const createAppointment = async (appointmentData) => {
  return await create(appointmentData);
};

module.exports = {
  getAllAppointments,
  createAppointment,
};