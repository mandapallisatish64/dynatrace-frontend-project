import { IsInt, Min } from 'class-validator';
import { MINIMUM_INTEGER_LIMIT } from '../constants';
import { CreateSalesLeadsDto } from './createLeads.dto';
import { SalesLeadDto } from './lead.dto';

export class ModificationSalesLeadDto extends CreateSalesLeadsDto
  implements Required<SalesLeadDto> {
  @IsInt()
  @Min(MINIMUM_INTEGER_LIMIT, {
    message: `Expected Sales lead id to be integer greater than ${MINIMUM_INTEGER_LIMIT}`,
  })
  id: number;
}
