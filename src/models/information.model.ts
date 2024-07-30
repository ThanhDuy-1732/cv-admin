// Utilities
import Model from "@/libs/model";
import { Expose } from "class-transformer";

export enum InfoTitle {
  DOB = 'DOB',
  Phone = 'Phone',
  Email = 'Email',
  Other = 'Other',
  Github = 'Github',
  Address = 'Address',
}

export class Information extends Model {
  @Expose() id: number = 0;
  @Expose() _id: string = '';
  @Expose() content: string = '';
  @Expose() title: InfoTitle = InfoTitle.Other;
}