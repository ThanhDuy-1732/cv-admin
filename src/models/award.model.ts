// Utilities
import { BaseModel } from "@/libs/model"
import { Expose } from "class-transformer"

export class Award extends BaseModel {
  @Expose() time: string = '';
  @Expose() title: string = '';
  @Expose() location: string = '';
  @Expose() position: string = '';
}