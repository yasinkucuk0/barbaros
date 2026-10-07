const {
  loginAdmin,
} = require("../services/auth.service");

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await loginAdmin(
      username,
      password
    );

    return res.status(200).json({
      success: true,
      message: "Giriş başarılı.",
      data: result,
    });
  } catch (error) {
    console.error(
      "Admin giriş hatası:",
      error.message
    );

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Giriş işlemi gerçekleştirilemedi."
          : error.message,
    });
  }
};

module.exports = {
  adminLogin,
};