
const serviceRepository = require("../repositories/service.repository");

const getAllServices = async () => {
  return serviceRepository.getAllServices();
};

// Müşteriye yalnızca aktif hizmetler gösterilir.
const getActiveServices = async () => {
  const services = await serviceRepository.getAllServices();
  return services.filter((service) => service.isActive);
};

const createService = async (data) => {
  const name = String(data?.name ?? "").trim();
  const price = Number(data?.price);
  const durationMinutes = Number(data?.durationMinutes ?? 30);

  if (!name) {
    throw new Error("Hizmet adı zorunludur.");
  }

  if (
    data?.price === undefined ||
    data?.price === null ||
    data?.price === "" ||
    !Number.isInteger(price) ||
    price < 0
  ) {
    throw new Error("Geçerli bir hizmet fiyatı giriniz.");
  }

  if (
    !Number.isInteger(durationMinutes) ||
    durationMinutes <= 0
  ) {
    throw new Error("Hizmet süresi pozitif bir tam sayı olmalıdır.");
  }

  return serviceRepository.createService({
    name,
    price,
    durationMinutes,
    isActive: true,
  });
};

const updateService = async (id, data) => {
  const serviceId = Number(id);

  if (!Number.isInteger(serviceId) || serviceId <= 0) {
    throw new Error("Geçersiz hizmet numarası.");
  }

  const existingService =
    await serviceRepository.getServiceById(serviceId);

  if (!existingService) {
    throw new Error("Hizmet bulunamadı.");
  }

  const updates = {};

  if (data?.name !== undefined) {
    const name = String(data.name ?? "").trim();

    if (!name) {
      throw new Error("Hizmet adı boş olamaz.");
    }

    updates.name = name;
  }

  if (data?.price !== undefined) {
    const price = Number(data.price);

    if (
      data.price === null ||
      data.price === "" ||
      !Number.isInteger(price) ||
      price < 0
    ) {
      throw new Error("Geçerli bir hizmet fiyatı giriniz.");
    }

    updates.price = price;
  }

  if (data?.durationMinutes !== undefined) {
    const durationMinutes = Number(data.durationMinutes);

    if (
      !Number.isInteger(durationMinutes) ||
      durationMinutes <= 0
    ) {
      throw new Error("Geçerli bir hizmet süresi giriniz.");
    }

    updates.durationMinutes = durationMinutes;
  }

  if (data?.isActive !== undefined) {
    if (typeof data.isActive !== "boolean") {
      throw new Error("Aktiflik durumu doğru veya yanlış olmalıdır.");
    }

    updates.isActive = data.isActive;
  }

  return serviceRepository.updateService(serviceId, updates);
};

module.exports = {
  getAllServices,
  getActiveServices,
  createService,
  updateService,
};
