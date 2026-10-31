
const serviceService = require("../services/service.service");

// Tüm hizmetleri listele
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Hizmet listeleme hatası:", error);

    return res.status(500).json({
      success: false,
      message: "Hizmetler yüklenemedi.",
    });
  }
};

// Sitede gösterilecek aktif hizmetleri listele (herkese açık)
const getActiveServices = async (req, res) => {
  try {
    const services = await serviceService.getActiveServices();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Aktif hizmet listeleme hatası:", error);

    return res.status(500).json({
      success: false,
      message: "Hizmetler yüklenemedi.",
    });
  }
};

// Yeni hizmet ekle
const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);

    return res.status(201).json({
      success: true,
      message: "Hizmet başarıyla oluşturuldu.",
      data: service,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Bu isimde bir hizmet zaten mevcut.",
      });
    }

    if (
      error.message?.includes("zorunludur") ||
      error.message?.includes("Geçerli") ||
      error.message?.includes("olmalıdır")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Hizmet oluşturma hatası:", error);

    return res.status(500).json({
      success: false,
      message: "Hizmet oluşturulamadı.",
    });
  }
};

// Hizmet bilgilerini güncelle
const updateService = async (req, res) => {
  try {
    const service = await serviceService.updateService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Hizmet başarıyla güncellendi.",
      data: service,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Bu isimde bir hizmet zaten mevcut.",
      });
    }

    if (error.message === "Hizmet bulunamadı.") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message?.includes("Geçersiz") ||
      error.message?.includes("Geçerli") ||
      error.message?.includes("boş olamaz") ||
      error.message?.includes("olmalıdır")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Hizmet güncelleme hatası:", error);

    return res.status(500).json({
      success: false,
      message: "Hizmet güncellenemedi.",
    });
  }
};

module.exports = {
  getActiveServices,
  getAllServices,
  createService,
  updateService,
};
