import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { IsOptional, IsDateString, IsUUID, IsInt } from 'class-validator';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsOptional()
    @IsInt()
    accountId?: number;

    @IsOptional()
    @IsInt()
    agentId?: number;

    @IsOptional()
    @IsDateString()
    startTime?: string;

    @IsOptional()
    @IsDateString()
    endTime?: string;
}
