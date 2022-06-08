import { Module, Scope } from '@nestjs/common';
import { databaseProviders } from '../leads/leads.providers';
import { LeadsService } from '../leads/leads.service';
import { LeadsController } from './leads.controller';
import { SALES_LEAD_SERVICE } from './constants';

@Module({
  providers: [
    {
      provide: SALES_LEAD_SERVICE,
      useClass: LeadsService,
      scope: Scope.DEFAULT,
    },
    ...databaseProviders,
  ],
  controllers: [LeadsController],
})
export class LeadsModule {}
