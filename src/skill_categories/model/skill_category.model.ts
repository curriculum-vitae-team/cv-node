import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SkillCategory } from "src/graphql";

@Entity("skill_category")
export class SkillCategoryModel implements SkillCategory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column("int")
  order: number;

  @ManyToOne(() => SkillCategoryModel, (category) => category.children, {
    nullable: true,
    eager: false,
    onDelete: "SET NULL",
  })
  parent?: SkillCategoryModel;

  @OneToMany(() => SkillCategoryModel, (category) => category.parent, {
    cascade: true,
    onDelete: "SET NULL",
  })
  children: SkillCategoryModel[];
}
