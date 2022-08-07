import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  checkStatus() {
    return "Server is running";
  }
}
