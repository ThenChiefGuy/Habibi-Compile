import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  executeCodeSchema,
  insertSharedCodeSchema,
  type ExecuteCodeResponse,
} from "@shared/schema";

// Default versions for supported languages - MUST match Piston API runtimes
const defaultVersions: Record<string, string> = {
  python: "3.10.0",      // Fixed from 3.104.0
  javascript: "18.15.0",
  typescript: "5.0.3",
  java: "15.0.2",        // Fixed from 21.0.
  c: "10.2.0",
  cpp: "10.2.0",
  go: "1.16.2",
  rust: "1.68.2",
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Execute code using Piston API
  app.post("/api/execute", async (req, res) => {
    try {
      const validatedData = executeCodeSchema.parse(req.body);

      const language = validatedData.language;
      let version = validatedData.version;

      // Fill default version if missing
      if (!version || version.trim() === "" || version === "latest") {
        version = defaultVersions[language] || "*";
      }

      console.log(`Executing ${language} with version: ${version}`);

      // Call Piston API to execute code
      const pistonResponse = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          version,
          files: [{ content: validatedData.code }],
          stdin: validatedData.stdin || "",
        }),
      });

      const pistonData = await pistonResponse.json();
      console.log("Piston API response:", JSON.stringify(pistonData, null, 2));

      if (!pistonResponse.ok || pistonData.message) {
        throw new Error(pistonData.message || `Piston API error: ${pistonResponse.statusText}`);
      }

      const response: ExecuteCodeResponse = {
        stdout: pistonData.run?.stdout || "",
        stderr: pistonData.run?.stderr || "",
        exitCode: pistonData.run?.code !== undefined ? pistonData.run.code : 0,
        executionTime: pistonData.run?.time || undefined,
      };

      console.log("Sending response:", JSON.stringify(response, null, 2));
      res.json(response);
    } catch (error: any) {
      console.error("Error executing code:", error);
      res.status(500).json({
        stdout: "",
        stderr: error.message || "Internal server error",
        exitCode: 1,
      });
    }
  });

  // Share code - create a shareable link
  app.post("/api/share", async (req, res) => {
    try {
      const validatedData = insertSharedCodeSchema.parse(req.body);
      const sharedCode = await storage.createSharedCode(validatedData);
      res.json({ id: sharedCode.id });
    } catch (error: any) {
      console.error("Error sharing code:", error);
      res.status(400).json({
        error: error.message || "Failed to share code",
      });
    }
  });

  // Get shared code by ID
  app.get("/api/share/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const sharedCode = await storage.getSharedCode(id);

      if (!sharedCode) {
        return res.status(404).json({
          error: "Shared code not found",
        });
      }

      res.json(sharedCode);
    } catch (error: any) {
      console.error("Error getting shared code:", error);
      res.status(500).json({
        error: error.message || "Failed to retrieve shared code",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
