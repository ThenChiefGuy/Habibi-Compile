import { type SharedCode, type InsertSharedCode } from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  createSharedCode(code: InsertSharedCode): Promise<SharedCode>;
  getSharedCode(id: string): Promise<SharedCode | undefined>;
}

export class MemStorage implements IStorage {
  private sharedCodes: Map<string, SharedCode>;

  constructor() {
    this.sharedCodes = new Map();
  }

  async createSharedCode(insertCode: InsertSharedCode): Promise<SharedCode> {
    const id = nanoid(10);
    const sharedCode: SharedCode = {
      ...insertCode,
      id,
      createdAt: new Date(),
    };
    this.sharedCodes.set(id, sharedCode);
    return sharedCode;
  }

  async getSharedCode(id: string): Promise<SharedCode | undefined> {
    return this.sharedCodes.get(id);
  }
}

export const storage = new MemStorage();
