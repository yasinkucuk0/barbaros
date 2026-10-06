const {
  findAll,
  create,
} = require("../repositories/appointment.repository");

const getAllAppointments = () => {
  return findAll();
};

const createAppointment = (appointmentData) => {
  return create(appointmentData);
};

module.exports = {
  getAllAppointments,
  createAppointment,
};