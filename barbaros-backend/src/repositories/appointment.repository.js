const appointments = [
  {
    id: 1,
    customerName: "Test Müşteri",
    service: "Saç Kesimi",
    barber: "Yasin",
    date: "2026-10-10",
    time: "14:00",
  },
];

const findAll = () => {
  return appointments;
};

const create = (appointmentData) => {
  const newAppointment = {
    id: appointments.length + 1,
    ...appointmentData,
  };

  appointments.push(newAppointment);

  return newAppointment;
};

module.exports = {
  findAll,
  create,
};