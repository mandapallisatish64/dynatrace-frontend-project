import { Test, TestingModule } from '@nestjs/testing';
import {
  SALES_CLIENT_REPOSITORY,
  SALES_LEAD_REPOSITORY,
  SALES_OWNER_REPOSITORY,
} from './constants';
import { SalesLeadDto } from './dtos/lead.dto';
import { SalesClient } from './entity/client.entity';
import { SalesLead } from './entity/lead.entity';
import { SalesOwner } from './entity/owner.entity';
import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  let leadsService: LeadsService;
  const salesLeadId = 1;
  const lead: SalesLeadDto = {
    id: salesLeadId,
    name: 'somename',
    value: 1234,
    date: new Date(),
    ownerName: 'somename',
    clientName: 'somename',
  };
  const salesLeadEntity = {
    id: salesLeadId,
    name: 'somename',
    value: 1234,
    date: new Date(),
    salesOwner: {
      name: 'somename',
    },
    salesClient: {
      name: 'somename',
    },
  };
  let salesLeadRepository: typeof SalesLead;
  let salesClientRepository: typeof SalesClient;
  let salesOwnerRepository: typeof SalesOwner;

  beforeEach(async () => {
    const salesLeadRepositoryMock = jest.fn<Partial<typeof SalesLead>, []>(
      () => ({
        findAll: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(salesLeadEntity),
        create: jest.fn().mockResolvedValue(lead),
        update: jest
          .fn()
          .mockResolvedValue([1, [{ salesOwnerId: 2, salesClientId: 2 }]]),
        destroy: jest.fn().mockResolvedValue(salesLeadId),
      }),
    );
    const salesClientRepositoryMock = jest.fn<Partial<typeof SalesClient>, []>(
      () => ({
        findAll: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({ id: 2 } as SalesOwner),
        update: jest.fn().mockResolvedValue([1, [{ id: 2 }]]),
        destroy: jest.fn().mockResolvedValue(salesLeadId),
      }),
    );
    const salesOwnerRepositoryMock = jest.fn<Partial<typeof SalesOwner>, []>(
      () => ({
        findAll: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({ id: 2 } as SalesOwner),
        update: jest.fn().mockResolvedValue([1, [{ id: 2 }]]),
        destroy: jest.fn().mockResolvedValue(salesLeadId),
      }),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: SALES_LEAD_REPOSITORY,
          useValue: salesLeadRepositoryMock(),
        },
        {
          provide: SALES_OWNER_REPOSITORY,
          useValue: salesOwnerRepositoryMock(),
        },
        {
          provide: SALES_CLIENT_REPOSITORY,
          useValue: salesClientRepositoryMock(),
        },
      ],
    }).compile();

    leadsService = module.get<LeadsService>(LeadsService);
    salesLeadRepository = module.get<typeof SalesLead>(SALES_LEAD_REPOSITORY);
    salesOwnerRepository = module.get<typeof SalesOwner>(
      SALES_OWNER_REPOSITORY,
    );
    salesClientRepository = module.get<typeof SalesClient>(
      SALES_CLIENT_REPOSITORY,
    );
  });

  describe('getLeads', () => {
    it('should call repository findAll', async () => {
      await leadsService.getLeads();
      expect(salesLeadRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('getLead', () => {
    it('should call repository findOne method', async () => {
      await leadsService.getLead(salesLeadId);
      expect(salesLeadRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('createLead', () => {
    it('should call repository create methods', async () => {
      await leadsService.createLead(lead);
      expect(salesClientRepository.create).toHaveBeenCalled();
      expect(salesOwnerRepository.create).toHaveBeenCalled();
      expect(salesLeadRepository.create).toHaveBeenCalled();
    });

    it('should return instanceof Object', async () => {
      const result = await leadsService.createLead(lead);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('updateLead', () => {
    it('should call repository update methods', async () => {
      await leadsService.updateLead(lead);
      expect(salesClientRepository.update).toHaveBeenCalled();
      expect(salesOwnerRepository.update).toHaveBeenCalled();
      expect(salesLeadRepository.update).toHaveBeenCalled();
    });

    it('should return instanceOf Array', async () => {
      const result = await leadsService.updateLead(lead);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('deleteLead', () => {
    it('should return a typeof number', async () => {
      const result = await leadsService.deleteLead(salesLeadId);
      expect(typeof result).toBe('number');
    });

    it('should call downstream repository destroy call', async () => {
      await leadsService.deleteLead(salesLeadId);
      expect(salesLeadRepository.destroy).toHaveBeenCalled();
    });
  });
});
