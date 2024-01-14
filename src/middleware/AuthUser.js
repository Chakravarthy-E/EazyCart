export const dynamic = "force-dynamic";
import jwt from "jsonwebtoken";
const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return false;
//   console.log(token);
  try {
    const extractAuthUserInfo = jwt.verify(token, "defualt_secret_key");
    // console.log(extractAuthUserInfo);
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default AuthUser;
