import { AuthClientRequest } from "./models/auth-client-request.model.";
import { Request, Response } from "express";
import {
  getWhatsAppConnectQrCodeAsync,
  sendWhatsAppMessageAsync,
} from "./controllers/whatsapp.controller";
import {
  asyncHandler,
  errorHandlerMiddleware,
} from "./middlewares/error-handler.middleware";
import { authenticationHandlerMiddleware } from "./middlewares/authentication-handler.middleware";
import {
  getJwtAuthClients,
  getPort as getRunningPort,
} from "./providers/env-variable.provider";
import { initializePromClient } from "./clients/metric-client";

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

initializePromClient(app);

app.use(express.json());

const PORT = getRunningPort();

//Add CORS to allow requests from any origin
app.use(cors());

//Add a POST endpoint to get a token
app.post("/get-token", (req: Request, res: Response) => {
  const { clientId, clientSecret } = req.body as AuthClientRequest;

  var authClients = getJwtAuthClients();

  var user = authClients.find((a) => a.clientId == clientId);

  if (!user || clientSecret !== user.clientSecret) {
    return res.status(403).json({ error: "Invalid client ID or secret" });
  }

  var token = jwt.sign({ clientId: user.clientId }, user.clientSecret, {
    expiresIn: user.expiresIn,
  });

  res.json({ token });
});
app.use(authenticationHandlerMiddleware);

app.get("/wp/qr", asyncHandler(getWhatsAppConnectQrCodeAsync));
app.post("/wp/send", asyncHandler(sendWhatsAppMessageAsync));

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
