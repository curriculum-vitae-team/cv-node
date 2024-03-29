import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CvProject } from "src/graphql";
import { ProjectModel } from "src/projects/model/project.model";
import { Expose } from "class-transformer";

@Entity("cv_project")
export class CvProjectModel implements CvProject {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ProjectModel, (project) => project, { onDelete: "CASCADE" })
  @JoinTable()
  project: ProjectModel;

  @Expose()
  get name() {
    return this.project.name;
  }

  @Expose()
  get internal_name() {
    return this.project.internal_name;
  }

  @Expose()
  get description() {
    return this.project.description;
  }

  @Expose()
  get domain() {
    return this.project.domain;
  }

  @Column("date")
  start_date: string;

  @Column("date", { nullable: true })
  end_date?: string;

  @Expose()
  get team_size() {
    return this.project.team_size;
  }

  @Column("simple-json", { default: [] })
  roles: string[];

  @Column("simple-json", { default: [] })
  responsibilities: string[];
}
