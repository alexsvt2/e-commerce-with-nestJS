import { Test, TestingModule } from '@nestjs/testing';
import { FashionModelService } from './fashion-model.service';

describe('FashionModelService', () => {
  let service: FashionModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FashionModelService],
    }).compile();

    service = module.get<FashionModelService>(FashionModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
