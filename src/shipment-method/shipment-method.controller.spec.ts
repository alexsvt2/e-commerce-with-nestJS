import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentMethodController } from './shipment-method.controller';

describe('ShipmentMethodController', () => {
  let controller: ShipmentMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentMethodController],
    }).compile();

    controller = module.get<ShipmentMethodController>(ShipmentMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
