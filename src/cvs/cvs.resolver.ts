import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { connect } from "puppeteer-core";
import { CvsService } from "./cvs.service";
import { CreateCvDto, UpdateCvDto, DeleteCvDto } from "./dto/cv.dto";
import { AddCvSkillDto, UpdateCvSkillDto, DeleteCvSkillDto } from "./dto/cv-skill.dto";
import { ExportPdfDto } from "./dto/pdf.dto";

@Resolver()
export class CvsResolver {
  constructor(private readonly cvsService: CvsService) {}

  @Query("cvs")
  cvs() {
    return this.cvsService.findAll();
  }

  @Query("cv")
  cv(@Args("cvId") cvId: string) {
    return this.cvsService.findOneByIdAndJoinProfile(cvId);
  }

  @Mutation("createCv")
  createCv(@Args("cv") args: CreateCvDto) {
    return this.cvsService.createCv(args);
  }

  // TODO: user can update only his own cvs
  // admin can update any
  @Mutation("updateCv")
  updateCv(@Args("cv") args: UpdateCvDto) {
    return this.cvsService.updateCv(args);
  }

  // TODO: user can delete only his own cvs
  // admin can delete any
  @Mutation("deleteCv")
  deleteCv(@Args("cv") args: DeleteCvDto) {
    return this.cvsService.deleteCv(args);
  }

  @Mutation("addCvSkill")
  addCvSkill(@Args("skill") args: AddCvSkillDto) {
    return this.cvsService.addCvSkill(args);
  }

  @Mutation("updateCvSkill")
  updateCvSkill(@Args("skill") args: UpdateCvSkillDto) {
    return this.cvsService.updateCvSkill(args);
  }

  @Mutation("deleteCvSkill")
  deleteCvSkill(@Args("skill") args: DeleteCvSkillDto) {
    return this.cvsService.deleteCvSkill(args);
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
