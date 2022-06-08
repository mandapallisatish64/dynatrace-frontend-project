import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SALES_LEAD_SERVICE } from './constants';
import { CreateSalesLeadsDto } from './dtos/createLeads.dto';
import { ModificationSalesLeadDto } from './dtos/modificationLead.dto';
import { LeadsService } from './leads.service';
import { SalesLeadDto } from './dtos/lead.dto';
import { Response } from 'express';
import { NoSalesLeadError } from './error/lead.error';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  private static readonly logger = new Logger(LeadsController.name);

  constructor(
    @Inject(SALES_LEAD_SERVICE) private readonly leadsService: LeadsService,
  ) {}

  @Get()
  getLeads(): Promise<SalesLeadDto[]> {
    return this.leadsService.getLeads();
  }

  @Get(':id')
  async getLead(
    @Param('id', new ParseIntPipe()) salesLeadId: number,
    @Res() res: Response,
  ): Promise<void> {
    const payload = await this.leadsService
      .getLead(salesLeadId)
      .catch((error: Error) => {
        Logger.error(error.message);
        if (error instanceof NoSalesLeadError) {
          res
            .status(HttpStatus.NOT_FOUND)
            .json({ statusCode: HttpStatus.NOT_FOUND, message: error.message });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
        }
      });
    res.json(payload);
  }

  @Post()
  async createLead(
    @Body() leadsDto: CreateSalesLeadsDto,
  ): Promise<SalesLeadDto[]> {
    await this.leadsService.createLead(leadsDto);
    return this.leadsService.getLeads();
  }

  @Put()
  async updateLead(
    @Body() leadsDto: ModificationSalesLeadDto,
  ): Promise<SalesLeadDto[]> {
    await this.leadsService.updateLead(leadsDto);
    return this.leadsService.getLeads();
  }

  @Delete(':id')
  async deleteLead(
    @Param('id', new ParseIntPipe()) salesLeadId: number,
  ): Promise<SalesLeadDto[]> {
    await this.leadsService.deleteLead(salesLeadId);
    return this.leadsService.getLeads();
  }
}
