import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsRule implements ValidatorConstraintInterface {
    constructor(private readonly prisma: PrismaService) {}

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const [model, field = 'id'] = args.constraints as [keyof PrismaService, string];
        const delegate = (this.prisma[model] as any);

        if (!delegate?.findUnique) return false;

        const record = await delegate.findUnique({
            where: { [field]: value },
        });

        return !!record;
    }

    defaultMessage(args: ValidationArguments) {
        const [model, field = 'id'] = args.constraints;
        return `${model} with ${field}=${args.value} does not exist`;
    }
}
