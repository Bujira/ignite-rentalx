import { S3 } from "aws-sdk";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async delete(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { S3StorageProvider };
