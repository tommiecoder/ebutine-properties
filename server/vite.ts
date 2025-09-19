import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";
import type { UserConfig } from "vite";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  if (process.env.NODE_ENV === "production") return;

  // 🔹 dynamically import vite.config.ts
  // @ts-ignore
  const viteConfig = (await import("../vite.config.ts")).default as UserConfig;

  };
  // 🔹 call the default export to get the actual config object
  const userConfig: UserConfig = await rawConfigModule.default();

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...userConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

export function serveStatic(app: Express) {
  const distPath = path.resolve("dist");
  const publicPath = path.join(distPath, "public");

  if (!fs.existsSync(publicPath)) {
    log(`Build directory not found: ${publicPath}. Creating directory structure.`);
    try {
      fs.mkdirSync(publicPath, { recursive: true });
      log(`Created build directory: ${publicPath}`);
    } catch (error) {
      log(`Failed to create build directory: ${error}`);
      return;
    }
  }

  app.use(express.static(publicPath));

  app.use("*", (_req, res) => {
    const indexPath = path.resolve(publicPath, "index.html");
    res.sendFile(indexPath);
  });
} // <- closes serveStatic function only, nothing else after this

