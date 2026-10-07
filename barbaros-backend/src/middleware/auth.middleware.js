const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Bu işlem için giriş yapmanız gerekiyor.",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Geçersiz oturum bilgisi.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error(
        "JWT_SECRET ortam değişkeni tanımlanmamış."
      );

      return res.status(500).json({
        success: false,
        message: "Sunucu güvenlik yapılandırması eksik.",
      });
    }

    const decodedToken = jwt.verify(
      token,
      jwtSecret
    );

    if (
      decodedToken.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz bulunmuyor.",
      });
    }

    req.admin = {
      id: decodedToken.id,
      username: decodedToken.username,
      role: decodedToken.role,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Oturumunuz geçersiz veya süresi dolmuş. Lütfen tekrar giriş yapın.",
      });
    }

    console.error(
      "Admin yetkilendirme hatası:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Yetkilendirme işlemi başarısız oldu.",
    });
  }
};

module.exports = {
  protectAdmin,
};