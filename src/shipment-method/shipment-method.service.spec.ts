import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentMethodService } from './shipment-method.service';

describe('ShipmentMethodService', () => {
  let service: ShipmentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentMethodService],
    }).compile();

    service = module.get<ShipmentMethodService>(ShipmentMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
