import { Test, TestingModule } from '@nestjs/testing';
import { FashionModelController } from './fashion-model.controller';

describe('FashionModelController', () => {
  let controller: FashionModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FashionModelController],
    }).compile();

    controller = module.get<FashionModelController>(FashionModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
