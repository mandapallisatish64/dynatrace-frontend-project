import { Inject, Injectable } from '@nestjs/common';
import {
  SALES_CLIENT_REPOSITORY,
  SALES_LEAD_REPOSITORY,
  SALES_OWNER_REPOSITORY,
} from './constants';
import { SalesClient } from './entity/client.entity';
import { SalesLead } from './entity/lead.entity';
import { SalesOwner } from './entity/owner.entity';
import { SalesLeadDto } from './dtos/lead.dto';
import { NoSalesLeadError } from './error/lead.error';
@Injectable()
export class LeadsService {
  constructor(
    @Inject(SALES_LEAD_REPOSITORY)
    private readonly salesLeadRepository: typeof SalesLead,
    @Inject(SALES_OWNER_REPOSITORY)
    private readonly salesOwnerRepository: typeof SalesOwner,
    @Inject(SALES_CLIENT_REPOSITORY)
    private readonly salesClientRepository: typeof SalesClient,
  ) {}

  private transformLeadToDto(salesLead: SalesLead): SalesLeadDto {
    return {
      id: salesLead.id,
      name: salesLead.name,
      value: salesLead.value,
      date: salesLead.date,
      ownerName: salesLead.salesOwner.name,
      clientName: salesLead.salesClient.name,
    };
  }

  async getLeads(): Promise<SalesLeadDto[]> {
    const leads: SalesLead[] = await this.salesLeadRepository.findAll({
      include: [
        {
          model: SalesOwner,
          attributes: ['name'],
        },
        {
          model: SalesClient,
          attributes: ['name'],
        },
      ],
      attributes: ['id', 'name', 'value', 'date'],
      order: [['date', 'DESC']],
    });

    return leads.map(this.transformLeadToDto);
  }

  async getLead(leadsId: number): Promise<SalesLeadDto> {
    const lead: SalesLead = await this.salesLeadRepository.findOne({
      include: [
        {
          model: SalesOwner,
          attributes: ['name'],
        },
        {
          model: SalesClient,
          attributes: ['name'],
        },
      ],
      attributes: ['id', 'name', 'value', 'date'],
      where: { id: leadsId },
    });
    if (!lead) {
      throw new NoSalesLeadError(`No sales lead with id: ${leadsId}`);
    }
    return this.transformLeadToDto(lead);
  }

  async createLead(salesLeadDto: SalesLeadDto): Promise<SalesLead> {
    const [createdSalesOwner, createdSalesClient] = await Promise.all([
      this.salesOwnerRepository.create(
        {
          name: salesLeadDto.ownerName,
        },
        { fields: ['name'] },
      ),
      this.salesClientRepository.create(
        {
          name: salesLeadDto.clientName,
        },
        { fields: ['name'] },
      ),
    ]);
    return this.salesLeadRepository.create(
      {
        name: salesLeadDto.name,
        value: salesLeadDto.value,
        date: new Date(salesLeadDto.date),
        salesClientId: createdSalesClient.id,
        salesOwnerId: createdSalesOwner.id,
      },
      {
        fields: ['name', 'value', 'date', 'salesClientId', 'salesOwnerId'],
      },
    );
  }

  async updateLead(
    salesLeadDto: SalesLeadDto,
  ): Promise<[[number, SalesOwner[]], [number, SalesClient[]]]> {
    const [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      affectedRows,
      [salesLeadUpdate],
    ] = await this.salesLeadRepository.update(
      {
        name: salesLeadDto.name,
        value: salesLeadDto.value,
        date: salesLeadDto.date,
      },
      { where: { id: salesLeadDto.id }, returning: true },
    );

    return Promise.all([
      this.salesOwnerRepository.update(
        {
          name: salesLeadDto.ownerName,
        },
        { where: { id: salesLeadUpdate.salesOwnerId }, returning: false },
      ),
      this.salesClientRepository.update(
        {
          name: salesLeadDto.clientName,
        },
        { where: { id: salesLeadUpdate.salesClientId }, returning: false },
      ),
    ]);
  }

  async deleteLead(salesLeadId: number): Promise<number> {
    return this.salesLeadRepository.destroy({ where: { id: salesLeadId } });
  }
}
