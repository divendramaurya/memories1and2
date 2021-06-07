import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    console.log("in auth middleware try");
    let decodedData;
    if (token && isCustomAuth) {
      console.log("its a custom token");
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData.id;
    } else {
      console.log("its a google token");
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }

    next();
  } catch (error) {
    console.log("error occured in auth middleware ::", error);
  }
};

export default auth;
