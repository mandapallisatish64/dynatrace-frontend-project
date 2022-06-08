import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { SALES_LEAD_SERVICE } from './constants';
import { CreateSalesLeadsDto } from './dtos/createLeads.dto';
import { SalesLeadDto } from './dtos/lead.dto';
import { ModificationSalesLeadDto } from './dtos/modificationLead.dto';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { NoSalesLeadError } from './error/lead.error';
import { HttpStatus } from '@nestjs/common';
import { Response as MockResponse } from 'jest-express/lib/response';

describe('Leads Controller', () => {
  let leadsController: LeadsController;
  let leadsService: LeadsService;
  let response;

  const leadsId = 1234;
  const lead: SalesLeadDto = {
    id: leadsId,
    name: 'somename',
    value: 1234,
    date: new Date(),
    ownerName: 'somename',
    clientName: 'somename',
  };

  describe('Success Response', () => {
    beforeEach(async () => {
      const leadsServiceMock = jest.fn<Partial<LeadsService>, []>(() => ({
        getLeads: jest.fn().mockResolvedValue([lead]),
        getLead: jest.fn().mockResolvedValue(lead),
        createLead: jest.fn().mockResolvedValue([]),
        updateLead: jest.fn().mockResolvedValue([]),
        deleteLead: jest.fn().mockResolvedValue(1),
      }));
      response = (new MockResponse() as unknown) as Response;
      const module: TestingModule = await Test.createTestingModule({
        controllers: [LeadsController],
        providers: [
          { provide: SALES_LEAD_SERVICE, useFactory: () => leadsServiceMock() },
        ],
      }).compile();

      leadsController = module.get<LeadsController>(LeadsController);
      leadsService = module.get<LeadsService>(SALES_LEAD_SERVICE);
    });

    afterEach(() => {
      response.resetMocked();
    });

    describe('getLeads', () => {
      it('should be return an instanceOf Array', async () => {
        expect(await leadsController.getLeads()).toBeInstanceOf(Array);
      });

      it('should call downstream service', async () => {
        await leadsController.getLeads();
        expect(leadsService.getLeads).toHaveBeenCalled();
      });
    });

    describe('getLead', () => {
      it('should call downstream service', async () => {
        await leadsController.getLead(leadsId, response);
        expect(leadsService.getLead).toHaveBeenCalled();
      });
    });

    describe('createLead', () => {
      it('should return an instanceOf Array', async () => {
        expect(
          await leadsController.createLead(lead as CreateSalesLeadsDto),
        ).toBeInstanceOf(Array);
      });

      it('should call downstream service', async () => {
        await leadsController.createLead(lead as CreateSalesLeadsDto);
        expect(leadsService.createLead).toHaveBeenCalled();
        expect(leadsService.getLeads).toHaveBeenCalled();
      });
    });

    describe('updateLead', () => {
      it('should be return a single Lead', async () => {
        expect(
          await leadsController.updateLead(lead as ModificationSalesLeadDto),
        ).toBeInstanceOf(Array);
      });

      it('should call downstream service', async () => {
        await leadsController.updateLead(lead as ModificationSalesLeadDto);
        expect(leadsService.updateLead).toHaveBeenCalled();
        expect(leadsService.getLeads).toHaveBeenCalled();
      });
    });

    describe('deleteLead', () => {
      it('should be return an instanceOf Array', async () => {
        expect(await leadsController.deleteLead(leadsId)).toBeInstanceOf(Array);
      });

      it('should call downstream services', async () => {
        await leadsController.deleteLead(leadsId);
        expect(leadsService.deleteLead).toHaveBeenCalled();
        expect(leadsService.getLeads).toHaveBeenCalled();
      });
    });
  });

  describe('Error Response', () => {
    beforeEach(async () => {
      const leadsServiceMock = jest.fn<Partial<LeadsService>, []>(() => ({
        getLeads: jest.fn().mockResolvedValue([lead]),
        getLead: jest
          .fn()
          .mockRejectedValue(
            new NoSalesLeadError(
              `There was a fake ${NoSalesLeadError.name} error`,
            ),
          ),
        createLead: jest.fn().mockResolvedValue([]),
        updateLead: jest.fn().mockResolvedValue([]),
        deleteLead: jest.fn().mockResolvedValue(1),
      }));
      response = new MockResponse();
      const module: TestingModule = await Test.createTestingModule({
        controllers: [LeadsController],
        providers: [
          { provide: SALES_LEAD_SERVICE, useFactory: () => leadsServiceMock() },
        ],
      }).compile();

      leadsController = module.get<LeadsController>(LeadsController);
      leadsService = module.get<LeadsService>(SALES_LEAD_SERVICE);
    });

    afterEach(() => {
      response.resetMocked();
    });

    describe('getLead', () => {
      it('should call downstream service', async () => {
        await leadsController.getLead(leadsId, response);
        expect(leadsService.getLead).toHaveBeenCalled();
      });

      it(`should return HTTP status ${HttpStatus.NOT_FOUND}`, async () => {
        await leadsController.getLead(leadsId, response);
        expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      });
    });
  });
});
