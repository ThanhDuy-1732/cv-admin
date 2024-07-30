// Utilities
import "reflect-metadata";
import { ClassExclude } from '@/libs/utils/index';
import { Expose, plainToInstance } from "class-transformer";

export default class Model {
  static build(data: any) {
    return plainToInstance(this, data, {
      excludeExtraneousValues: true,
    });
  }
}

export class BaseModel extends Model {
  @Expose() id: number = 0;
  @Expose() _id?: string = '';
}

export class BaseContentModel extends ClassExclude(BaseModel, ['_id']) {
  content: string = ''
}