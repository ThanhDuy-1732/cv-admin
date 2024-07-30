// Utilities
import { Expose, Type } from "class-transformer";
import { BaseContentModel, BaseModel } from "@/libs/model";

export class WorkDescription extends BaseContentModel {}

export class WorkExperience extends BaseModel {
  @Expose() time: string = '';
  @Expose() company: string = '';
  @Expose() position: string = '';
  @Expose() @Type(() => WorkDescription) description: WorkDescription[] = [];
}