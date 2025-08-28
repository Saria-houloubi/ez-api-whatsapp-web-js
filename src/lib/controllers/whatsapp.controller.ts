import { Response } from "express";
import { getWhatsAppClient } from "../clients/whatsapp.client";
import { CustomRequest } from "../models/custom-request.model";
import QRCode from "qrcode";
import { WhatsAppSendRequest } from "../models/requests/whatsapp-send.requests.model";

export const getWhatsAppConnectQrCodeAsync = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  var clientId = req.query.cid as string;

  var clientId = getClientId(req);

  var client = getWhatsAppClient(clientId);

  var code = await client.getConnectQrCodeAsync();

  if (code === "") {
    throw new Error("Client is already connected!");
  }

  var qrBase64 = await QRCode.toDataURL(code);

  return res
    .status(200)
    .json({ code: await client.getConnectQrCodeAsync(), qrCode: qrBase64 });
};

export const sendWhatsAppMessageAsync = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  var clientId = getClientId(req);

  var wpRequest = req.body as WhatsAppSendRequest;

  var client = getWhatsAppClient(clientId);

  var response = await client.sendMessage(wpRequest);

  return res.status(200).json({ messageId: response });
};

const getClientId = (req: CustomRequest): string => {
  return `${(req.query.cid as string as string) ?? "default"}_${req.ClientId}`;
};
