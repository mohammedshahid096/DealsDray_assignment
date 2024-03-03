const { Create_JWT_Token } = require("../Utils/jwt.token");

module.exports = async (userData, status, res) => {
  const AccessToken = await Create_JWT_Token(userData._id, userData.role);

  const AccessTokenOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_TOKEN_KEY_TIME_COOKIE) * 8640000
    ), // for day
    httpOnly: true,
    sameSite: "none",
    secure: true,
    // maxAge: parseInt(process.env.COOKIE_MAX_TIME),
  };

  res.cookie("access_token", AccessToken, AccessTokenOptions);
  res.status(status).json({
    success: true,
    statusCode: status,
    user: {
      email: userData.email,
      _id: userData._id,
      role: userData.role,
    },
    AccessToken,
  });
};
