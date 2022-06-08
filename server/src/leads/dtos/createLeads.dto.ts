import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { DEFAULT_STRING_LIMIT, MINIMUM_INTEGER_LIMIT } from '../constants';
import { SalesLeadDto } from './lead.dto';

export class CreateSalesLeadsDto implements SalesLeadDto {
  @ApiProperty({
    description: 'The name of the sales lead',
    maxLength: DEFAULT_STRING_LIMIT,
  })
  @IsString()
  @MaxLength(DEFAULT_STRING_LIMIT)
  name: string;

  @ApiProperty({
    description: 'The sales leads value',
    minimum: MINIMUM_INTEGER_LIMIT,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(MINIMUM_INTEGER_LIMIT, {
    message: 'Expected value to be decimal number greater or equal to 0',
  })
  value: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'The name of the client',
    maxLength: DEFAULT_STRING_LIMIT,
  })
  @IsString()
  @MaxLength(DEFAULT_STRING_LIMIT)
  clientName: string;

  @ApiProperty({
    description: 'The name of the owner',
    maxLength: DEFAULT_STRING_LIMIT,
  })
  @IsString()
  @MaxLength(DEFAULT_STRING_LIMIT)
  ownerName: string;
}
