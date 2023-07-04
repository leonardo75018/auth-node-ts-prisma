import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Verify if user is Authenticate
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Token not prodivder" });
  }

  const [, token] = authorization.split(" ");
  try {
    const decoded = verify(token, "secret");
    const { id } = decoded as TokenPayload;

    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}
