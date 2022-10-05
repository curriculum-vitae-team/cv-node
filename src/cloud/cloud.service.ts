import { Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";
import { createHash } from "node:crypto";

@Injectable()
export class CloudService {
  private readonly cloudRepository = v2.uploader;

  async uploadImage(base64: string) {
    const hash = createHash("md5").update(base64);
    const filename = hash.digest("base64");
    const result = await this.cloudRepository.upload(base64, {
      folder: "user_avatars_v2",
      use_filename: true,
      unique_filename: false,
      filename_override: filename,
    });
    return result.secure_url;
  }
}
