export interface WhatsAppSendRequest extends ReadableStream<Uint8Array> {
  // The phone number of the recipient
  phone: string;

  // The message to send
  message: string;

  // Link preview
  linkPreview: false;
}
