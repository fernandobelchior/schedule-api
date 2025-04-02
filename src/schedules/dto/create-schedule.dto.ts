import { IsInt, IsDateString, Validate } from 'class-validator';
import {ExistsRule} from "../../common/validators/exists.rule";

export class CreateScheduleDto {
    @IsInt()
    @Validate(ExistsRule, ['account'])
    accountId: number;

    @IsInt()
    @Validate(ExistsRule, ['agent'])
    agentId: number;

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string;
}
