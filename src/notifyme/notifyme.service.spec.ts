import { Test, TestingModule } from '@nestjs/testing';
import { NotifymeService } from './notifyme.service';

describe('NotifymeService', () => {
  let service: NotifymeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifymeService],
    }).compile();

    service = module.get<NotifymeService>(NotifymeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
