import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "src/graphql";
import { SkillCategoryModel } from "src/skill_categories/model/skill_category.model";
import { Expose } from "class-transformer";

@Entity("skill")
export class SkillModel implements Skill {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column()
  name: string;

  @ManyToOne(() => SkillCategoryModel, {
    nullable: true,
    eager: true,
    onDelete: "SET NULL",
  })
  category?: SkillCategoryModel;

  @Expose()
  get category_name() {
    if (!this.category) {
      return null;
    }

    return this.category.name;
  }

  @Expose()
  get category_parent_name() {
    if (!this.category?.parent) {
      return null;
    }

    return this.category.parent.name;
  }
}
