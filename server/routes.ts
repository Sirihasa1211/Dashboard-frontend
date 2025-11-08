import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  });

  app.get("/api/dashboard/vendor-spend", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const vendorSpend = await storage.getVendorSpend(limit);
      res.json(vendorSpend);
    } catch (error) {
      console.error("Error fetching vendor spend:", error);
      res.status(500).json({ error: "Failed to fetch vendor spend" });
    }
  });

  app.get("/api/dashboard/invoice-trend", async (req, res) => {
    try {
      const trend = await storage.getInvoiceTrend();
      res.json(trend);
    } catch (error) {
      console.error("Error fetching invoice trend:", error);
      res.status(500).json({ error: "Failed to fetch invoice trend" });
    }
  });

  app.get("/api/dashboard/invoices", async (req, res) => {
    try {
      const invoices = await storage.getAllInvoices();
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
