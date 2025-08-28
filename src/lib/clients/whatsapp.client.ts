import { Client, RemoteAuth } from "whatsapp-web.js";
import { getAwsStore } from "./awss3.client";
import { increaseFailWPClientConnection } from "./metric-client";
import { WhatsAppSendRequest } from "../models/requests/whatsapp-send.requests.model";

const clients: { [key: string]: WhatsAppClient } = {};

export class WhatsAppClient {
  private client: Client;
  private connectQrCode: string = "";
  private clientId: string;
  constructor(clientId: string) {
    this.clientId = clientId;
    this.client = new Client({
      authStrategy: new RemoteAuth({
        store: getAwsStore(),
        clientId: clientId,
        backupSyncIntervalMs: 600000,
      }),
      puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    this.start();
  }

  /**
   * Starts the clients connection
   */
  start(): void {
    this.client.on("qr", (qr) => {
      this.connectQrCode = qr;
    });
    this.client.on("ready", () => {
      this.connectQrCode = "";
      console.log("Client is ready!");
    });

    this.client.initialize();
  }

  /** send a message to a phone number
   * @param phone number to send the message to including country code
   * @param message message to send
   * @returns
   */
  async sendMessage(request: WhatsAppSendRequest): Promise<string> {
    await this.isConnectedAsync();

    const wpPhoneNumber = await this.client.getNumberId(request.phone);

    var response = await this.client.sendMessage(
      `${wpPhoneNumber?.user}@${wpPhoneNumber?.server}`,
      request.message,
      {
        linkPreview: request.linkPreview,
      }
    );
    return response.id.id;
  }

  /**
   * gets qr code to connect phone number
   * @returns
   */
  async getConnectQrCodeAsync(): Promise<string> {
    for (let index = 0; index < 10; index++) {
      await delay(1000);
      if (this.connectQrCode) {
        break;
      }
    }

    return this.connectQrCode;
  }
  /**
   * checks if the client is connected
   * @returns
   */
  async isConnectedAsync(): Promise<void> {
    for (let index = 0; index < 10; index++) {
      await delay(2000);
      if (this.client.info) {
        return;
      }
    }
    increaseFailWPClientConnection(this.clientId);
    throw new Error("Whatsapp client is no able to be connected!");
  }
}

export const getWhatsAppClient = (clientId: string) => {
  if (!clients[clientId]) {
    clients[clientId] = new WhatsAppClient(clientId);
  }
  return clients[clientId];
};
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
