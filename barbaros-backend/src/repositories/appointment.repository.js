const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAll = async () => {
  return await prisma.appointment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findByBarberDateAndTime = async (barber, date, time) => {
  return await prisma.appointment.findFirst({
    where: {
      barber,
      date,
      time,
    },
  });
};

const create = async (appointmentData) => {
  return await prisma.appointment.create({
    data: {
      name: appointmentData.name,
      phone: appointmentData.phone,
      service: appointmentData.service,
      barber: appointmentData.barber,
      date: appointmentData.date,
      time: appointmentData.time,
    },
  });
};

module.exports = {
  findAll,
  findByBarberDateAndTime,
  create,
};