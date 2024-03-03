const jwt = require("jsonwebtoken");

// generate the jwt token
module.exports.Create_JWT_Token = async (userid, role) => {
  let payload = {
    id: userid,
    role,
  };

  const config = { expiresIn: process.env.JWT_TOKEN_KEY_TIME };
  const Token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, config);

  return Promise.resolve(Token);
};

// verifying  the jwt token
module.exports.Verify_JWT_Token = async (token) => {
  try {
    let data = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    return Promise.resolve({ success: true, ...data });
  } catch (error) {
    return Promise.resolve({ success: false, error });
  }
};
