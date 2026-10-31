
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllServices = async () => {
  return prisma.service.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const getServiceById = async (id) => {
  return prisma.service.findUnique({
    where: { id },
  });
};

const createService = async (data) => {
  return prisma.service.create({
    data,
  });
};

const updateService = async (id, data) => {
  return prisma.service.update({
    where: { id },
    data,
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
};
