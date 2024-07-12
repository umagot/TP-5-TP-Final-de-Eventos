import decryptToken from "./encriptartoken.js";

export default function AuthMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Forbidden");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    decryptToken(token)
      .then(payload => {
        if (payload) {
          req.user = payload;
          next();
        } else {
          return res.status(401).send("Error con el Token");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        return res.status(401).send("Token error");
      });
  }
}
