const {
  findAll,
  findById,
  findByBarberDateAndTime,
  findByBarberAndDate,
  create,
  updateStatus,
} = require("../repositories/appointment.repository");

const serviceRepository = require("../repositories/service.repository");

const allowedServices = [
  "Saç Kesimi",
  "Öğrenci",
  "Çocuk",
  "Sakal",
  "Saç + Sakal",
  "Saç & Yüz Bakımı",
  "Buhar & Cilt Temizleme",
  "Keratin",
];

const normalizeServiceName = (value) =>
  String(value || "").toLocaleUpperCase("tr-TR").replace(/\s+/g, " ").trim();

// Panelde aktif hizmet varsa randevu yalnızca onlarla alınır;
// panel boşsa veya veritabanı okunamazsa sabit liste kullanılır.
const getBookableServiceNames = async () => {
  try {
    const services = await serviceRepository.getAllServices();
    const active = services
      .filter((service) => service.isActive)
      .map((service) => service.name);

    return active.length > 0 ? active : allowedServices;
  } catch (error) {
    return allowedServices;
  }
};

const allowedBarbers = [
  "Yasin Küçük",
  "Emir Küçük",
];

const allowedTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const allowedStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getAllAppointments = async () => {
  return await findAll();
};

const getBookedTimes = async (barber, date) => {
  if (!allowedBarbers.includes(barber)) {
    throw createError("Geçersiz usta seçimi.");
  }

  if (!date) {
    throw createError("Tarih bilgisi gereklidir.");
  }

  const appointments = await findByBarberAndDate(
    barber,
    date
  );

  return appointments.map(
    (appointment) => appointment.time
  );
};

const validateAppointment = (
  appointmentData,
  serviceNames = allowedServices
) => {
  const {
    name,
    phone,
    service,
    barber,
    date,
    time,
  } = appointmentData;

  if (
    !name ||
    !phone ||
    !service ||
    !barber ||
    !date ||
    !time
  ) {
    throw createError(
      "Lütfen tüm randevu bilgilerini doldurun."
    );
  }

  if (name.trim().length < 2) {
    throw createError(
      "Lütfen geçerli bir ad soyad girin."
    );
  }

  if (!serviceNames.includes(service)) {
    throw createError("Geçersiz hizmet seçimi.");
  }

  if (!allowedBarbers.includes(barber)) {
    throw createError("Geçersiz usta seçimi.");
  }

  if (!allowedTimes.includes(time)) {
    throw createError("Geçersiz randevu saati.");
  }

  const phoneDigits = phone.replace(/\D/g, "");

  if (
    phoneDigits.length !== 11 ||
    !phoneDigits.startsWith("05")
  ) {
    throw createError(
      "Telefon numarası 05XX XXX XX XX formatında olmalıdır."
    );
  }

  const selectedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    throw createError("Geçersiz tarih bilgisi.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    throw createError(
      "Geçmiş bir tarihe randevu oluşturamazsınız."
    );
  }
};

const createAppointment = async (incomingData) => {
  const serviceNames = await getBookableServiceNames();
  const canonicalService = serviceNames.find(
    (name) =>
      normalizeServiceName(name) ===
      normalizeServiceName(incomingData?.service)
  );

  const appointmentData = {
    ...incomingData,
    service: canonicalService || incomingData?.service,
  };

  validateAppointment(appointmentData, serviceNames);

  const existingAppointment =
    await findByBarberDateAndTime(
      appointmentData.barber,
      appointmentData.date,
      appointmentData.time
    );

  if (existingAppointment) {
    throw createError(
      "Seçtiğiniz berber bu tarih ve saatte dolu.",
      409
    );
  }

  try {
    return await create({
      ...appointmentData,
      name: appointmentData.name.trim(),
      phone: appointmentData.phone.trim(),
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw createError(
        "Seçtiğiniz berber bu tarih ve saatte dolu.",
        409
      );
    }

    throw error;
  }
};

const changeAppointmentStatus = async (
  appointmentId,
  status
) => {
  const id = Number(appointmentId);

  if (!Number.isInteger(id) || id <= 0) {
    throw createError(
      "Geçersiz randevu numarası."
    );
  }

  if (!allowedStatuses.includes(status)) {
    throw createError(
      "Geçersiz randevu durumu."
    );
  }

  const appointment = await findById(id);

  if (!appointment) {
    throw createError(
      "Randevu bulunamadı.",
      404
    );
  }

  try {
    return await updateStatus(id, status);
  } catch (error) {
    if (error.code === "P2002") {
      throw createError(
        "Bu tarih ve saatte baska bir aktif randevu var.",
        409
      );
    }
    throw error;
  }
};

module.exports = {
  getAllAppointments,
  getBookedTimes,
  createAppointment,
  changeAppointmentStatus,
};