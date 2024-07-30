import Model from "@/libs/model";
import { Expose } from "class-transformer";

export class Overview extends Model {
  @Expose() id: number = 0;
  @Expose() _id: string = '';
  @Expose() value: string = '';
}