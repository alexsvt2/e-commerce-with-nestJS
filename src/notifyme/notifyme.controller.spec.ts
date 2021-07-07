import { Test, TestingModule } from '@nestjs/testing';
import { NotifymeController } from './notifyme.controller';

describe('NotifymeController', () => {
  let controller: NotifymeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifymeController],
    }).compile();

    controller = module.get<NotifymeController>(NotifymeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
