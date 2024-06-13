import { plainToInstance } from "class-transformer";

export default class Model {
  static build(data: any) {
    return plainToInstance(this, data, {
      excludeExtraneousValues: true
    });
  }
}
