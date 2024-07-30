// Utilities
import { BaseModel } from "@/libs/model";
import { Expose, Type } from "class-transformer";
import { ClassExclude } from '@/libs/utils/index';

export class EducationSubInfo extends ClassExclude(BaseModel, ['_id']) {
  @Expose() content: string = '';
}

export class Education extends BaseModel {
  @Expose() id: number = 0;
  @Expose() _id: string = '';
  @Expose() time: string = '';
  @Expose() title: string = '';
  @Expose() score: string = '';
  @Expose() location?: string = '';
  @Expose() @Type(() => EducationSubInfo) subInfo: EducationSubInfo[] = [];
}
