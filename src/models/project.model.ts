// Utilities
import { Expose, Type } from "class-transformer";
import { BaseModel, BaseContentModel } from "@/libs/model";

export class ProjectURL extends BaseContentModel {}
export class ProjectMainTeach extends BaseContentModel {}
export class ProjectTeachInUse extends BaseContentModel {}
export class ProjectResponsibility extends BaseContentModel {}

export class Project extends BaseModel {
 @Expose() name: string = '';
 @Expose() time: string = '';
 @Expose() company?: string = '';
 @Expose() position: string = '';
 @Expose() description: string = '';
 @Expose() numberOfMember: number = 0;
 @Expose() @Type(() => ProjectURL) url: ProjectURL[] = [];
 @Expose() @Type(() => ProjectMainTeach) mainTechs: ProjectMainTeach[] = [];
 @Expose() @Type(() => ProjectTeachInUse) technologyInUse: ProjectTeachInUse[] = [];
 @Expose() @Type(() => ProjectResponsibility) responsibilitiesAndAchievement: ProjectResponsibility[] = [];
}
