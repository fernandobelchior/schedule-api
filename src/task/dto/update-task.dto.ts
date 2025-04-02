import {
    IsOptional,
    IsInt,
    IsUUID,
    IsDateString,
    IsEnum,
    Validate,
} from 'class-validator';
import { TaskType } from '@prisma/client';
import { ExistsRule } from 'src/common/validators/exists.rule';

export class UpdateTaskDto {
    @IsOptional()
    @IsInt()
    @Validate(ExistsRule, ['account'])
    accountId?: number;

    @IsOptional()
    @IsUUID()
    @Validate(ExistsRule, ['schedule'])
    scheduleId?: string;

    @IsOptional()
    @IsDateString()
    startTime?: string;

    @IsOptional()
    @IsInt()
    duration?: number;

    @IsOptional()
    @IsEnum(TaskType)
    type?: TaskType;
}
