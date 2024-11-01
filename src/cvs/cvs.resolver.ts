import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { connect } from "puppeteer-core";
import { CvsService } from "./cvs.service";
import { CreateCvDto, UpdateCvDto, DeleteCvDto } from "./dto/cv.dto";
import { ExportPdfDto } from "./dto/pdf.dto";
import { UseGuards } from "@nestjs/common";
import { OwnCvGuard } from "src/app/guards/own_cv.guard";
import { GetUserId } from "src/app/decorators/get_user_id.decorator";
import { GetUserRole } from "src/app/decorators/get_user_role.decorator";
import { UserRole } from "src/graphql";

@Resolver()
export class CvsResolver {
  constructor(private readonly cvsService: CvsService) {}

  @Query("cvs")
  cvs(@GetUserRole() role: UserRole, @GetUserId() userId: string) {
    if (role === UserRole.Admin) {
      return this.cvsService.findAll();
    }

    return this.cvsService.findAllByUserId(userId);
  }

  @Query("cv")
  cv(@Args("cvId") cvId: string) {
    return this.cvsService.findOneByIdAndJoin(cvId);
  }

  @Mutation("createCv")
  createCv(@Args("cv") args: CreateCvDto) {
    return this.cvsService.createCv(args);
  }

  @UseGuards(OwnCvGuard)
  @Mutation("updateCv")
  async updateCv(@Args("cv") args: UpdateCvDto) {
    return this.cvsService.updateCv(args);
  }

  @UseGuards(OwnCvGuard)
  @Mutation("deleteCv")
  deleteCv(@Args("cv") args: DeleteCvDto) {
    return this.cvsService.deleteCv(args);
  }

  @Mutation("exportPdf")
  async exportPdf(@Args("pdf") args: ExportPdfDto) {
    const browser = await connect({
      browserWSEndpoint: process.env.CHROME_WS,
    });
    const page = await browser.newPage();
    await page.setContent(args.html);
    const buffer = await page.pdf({
      format: "A4",
      margin: args.margin,
      printBackground: true,
    });
    await browser.close();
    return buffer.toString("base64");
  }
}
