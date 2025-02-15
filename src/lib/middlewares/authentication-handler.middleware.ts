require("dotenv").config();
import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../models/custom-request.model";
import { getJwtAuthClients } from "../providers/env-variable.provider";
const jwt = require("jsonwebtoken");

// Global Error Handling Middleware
export function authenticationHandlerMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  //Fix authentication middle ware
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  // Step 1: Decode token WITHOUT verification to get the userId
  const decodedToken = jwt.decode(token) as JwtPayload;
  if (decodedToken?.clientId) {
    var authClients = getJwtAuthClients();

    var user = authClients.find((a) => a.clientId == decodedToken.clientId);

    if (user) {
      jwt.verify(
        token,
        user.clientSecret,
        (err: Error, verifiedToken: string) => {
          if (err) return res.status(403).json({ error: "Invalid Token" });

          req.ClientId = user!.clientId;

          return next();
        }
      );
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
