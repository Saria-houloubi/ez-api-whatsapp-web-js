import { AuthClient } from "../models/auth-client.model.";

require("dotenv").config();

export const getJwtAuthClients = (): AuthClient[] =>
  JSON.parse(process.env.JWT_AUTH_CLIENTS || "[]") as AuthClient[];

export const getPort = (): number => parseInt(process.env.PORT || "3000");

export const getWhatsAppStoreAwsRegion = (): string =>
  process.env.WHATSAPP_CLIENT_STORE_AWS_S3_REGION || "";

export const getWhatsAppStoreAwsAccessKeyId = (): string =>
  process.env.WHATSAPP_CLIENT_STORE_AWS_S3_KEY || "";

export const getWhatsAppStoreAwsSecretAccessKey = (): string =>
  process.env.WHATSAPP_CLIENT_STORE_AWS_S3_SECRET_ACCESS_KEY || "";

export const getWhatsAppStoreAwsBucketName = (): string =>
  process.env.WHATSAPP_CLIENT_STORE_AWS_S3_BUCKET || "";

export const getWhatsAppStoreAwsBucketPath = (): string =>
  process.env.WHATSAPP_CLIENT_STORE_AWS_S3_STORE_PATH || "";
