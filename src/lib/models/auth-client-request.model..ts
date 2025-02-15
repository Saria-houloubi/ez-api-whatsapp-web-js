export interface AuthClientRequest extends ReadableStream<Uint8Array> {
  clientId: string;
  clientSecret: string;
}
