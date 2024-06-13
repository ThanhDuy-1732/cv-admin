// Utilities
import Model from "@/libs/model";
import { Expose } from "class-transformer";

export enum UserState {
  Active = "active",
  InActive = "inActive",
}

export class User extends Model {
  @Expose id: number = 0;
  @Expose phone: string = '';
  @Expose email: string = '';
  @Expose username: string = '';
  @Expose password: string = '';
  @Expose state: UserState = UserState.Active;
}