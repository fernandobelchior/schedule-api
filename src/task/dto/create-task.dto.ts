import { IsUUID, IsInt, IsDateString, IsEnum, Validate } from 'class-validator';
import { TaskType } from '@prisma/client';
import { ExistsRule } from "../../common/validators/exists.rule";

export class CreateTaskDto {
    @IsInt()
    @Validate(ExistsRule, ['account'])
    accountId: number;

    @IsUUID()
    @Validate(ExistsRule, ['schedule'])
    scheduleId: string;

    @IsDateString()
    startTime: string;

    @IsInt()
    duration: number;

    @IsEnum(TaskType)
    type: TaskType;
}
