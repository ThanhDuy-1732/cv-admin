// Utilities
import { Expose, Type } from "class-transformer";
import { BaseContentModel, BaseModel } from "@/libs/model";

export class SkillItem extends BaseContentModel {}

export class Skill extends BaseModel {
  @Expose() type: string = '';
  @Expose() @Type(() => SkillItem) skills: SkillItem[] = [];
}