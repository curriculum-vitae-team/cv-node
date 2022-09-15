import { Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";

@Injectable()
export class CloudService {
  private readonly cloudRepository = v2.uploader;

  async uploadImage(base64: string) {
    const result = await this.cloudRepository.upload(base64, {
      folder: "user_avatars",
    });
    return result.secure_url;
  }
}
