import { Request, Response, Express } from "express";
import promClient from "prom-client";

const collectDefaultMetrics = promClient.collectDefaultMetrics;

const prefix = "ez_wp_";

const promClientRegistry = promClient.Registry;

const register = new promClientRegistry();

collectDefaultMetrics({ register, prefix: prefix });

const failWPClientConnectionCounter = new promClient.Counter({
  name: `${prefix}fail_wp_client_counter`,
  help: "Count of failed connection",
  labelNames: ["clientId"],
  registers: [register],
});

export const increaseFailWPClientConnection = (clientId: string) => {
  failWPClientConnectionCounter.labels(clientId).inc();
};

export const initializePromClient = (app: Express) => {
  app.get("/metrics", async (req: Request, res: Response): Promise<void> => {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
  });
};
