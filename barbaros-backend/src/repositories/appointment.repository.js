const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAll = async () => {
  return await prisma.appointment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findById = async (id) => {
  return await prisma.appointment.findUnique({
    where: {
      id,
    },
  });
};

const findByBarberDateAndTime = async (
  barber,
  date,
  time
) => {
  return await prisma.appointment.findFirst({
    where: {
      barber,
      date,
      time,
    },
  });
};

const findByBarberAndDate = async (barber, date) => {
  return await prisma.appointment.findMany({
    where: {
      barber,
      date,
    },
    select: {
      time: true,
    },
    orderBy: {
      time: "asc",
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

const updateStatus = async (id, status) => {
  return await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

module.exports = {
  findAll,
  findById,
  findByBarberDateAndTime,
  findByBarberAndDate,
  create,
  updateStatus,
};