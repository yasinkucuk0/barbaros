const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const loginAdmin = async (username, password) => {
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    throw createError(
      "Kullanıcı adı ve şifre gereklidir.",
      400
    );
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  if (
    !adminUsername ||
    !adminPasswordHash ||
    !jwtSecret
  ) {
    console.error(
      "Admin güvenlik ortam değişkenleri eksik."
    );

    throw createError(
      "Sunucu güvenlik yapılandırması eksik.",
      500
    );
  }

  const usernameMatches =
    username.trim() === adminUsername;

  if (!usernameMatches) {
    throw createError(
      "Kullanıcı adı veya şifre hatalı.",
      401
    );
  }

  const passwordMatches = await bcrypt.compare(
    password,
    adminPasswordHash
  );

  if (!passwordMatches) {
    throw createError(
      "Kullanıcı adı veya şifre hatalı.",
      401
    );
  }

  const token = jwt.sign(
    {
      id: "barbaros-admin",
      username: adminUsername,
      role: "admin",
    },
    jwtSecret,
    {
      expiresIn: "8h",
    }
  );

  return {
    token,
    admin: {
      username: adminUsername,
      role: "admin",
    },
  };
};

module.exports = {
  loginAdmin,
};