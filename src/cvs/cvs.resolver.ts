import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { connect } from "puppeteer-core";
import { CvsService } from "./cvs.service";
import { CvDto } from "./dto/cv.dto";
import { ExportPdfDto } from "./dto/pdf.dto";

@Resolver()
export class CvsResolver {
  constructor(private readonly cvsService: CvsService) {}

  @Query("cvs")
  cvs() {
    return this.cvsService.findAll();
  }

  @Query("cv")
  cv(@Args("id") id: string) {
    return this.cvsService.findOneByIdAndJoinProfile(id);
  }

  @Mutation("createCv")
  createCv(@Args("cv") args: CvDto) {
    return this.cvsService.create(args);
  }

  // TODO: user can update only his own cvs
  // admin can update any
  @Mutation("updateCv")
  updateCv(@Args("id") id: string, @Args("cv") args: CvDto) {
    return this.cvsService.update(id, args);
  }

  // TODO: user can delete only his own cvs
  // admin can delete any
  @Mutation("deleteCv")
  deleteCv(@Args("id") id: string) {
    return this.cvsService.delete(id);
  }

  @Mutation("unbindCv")
  unbindCv(@Args("id") id: string) {
    return this.cvsService.unbind(id);
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
    });
    await browser.close();
    return buffer.toString("base64");
  }
}
