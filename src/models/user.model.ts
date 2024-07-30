// Utilities
import { BaseModel } from "@/libs/model";
import { Expose } from "class-transformer";
import { ClassExclude } from '@/libs/utils/index';

export enum UserState {
  Active = "active",
  InActive = "inActive",
}

export class User extends ClassExclude(BaseModel, ['_id']) {
  @Expose() id: number = 0;
  @Expose() phone: string = '';
  @Expose() email: string = '';
  @Expose() username: string = '';
  @Expose() password: string = '';
  @Expose() state: UserState = UserState.Active;
}