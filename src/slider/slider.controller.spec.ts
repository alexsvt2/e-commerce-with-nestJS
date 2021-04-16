import { Test, TestingModule } from '@nestjs/testing';
import { SliderController } from './slider.controller';

describe('SliderController', () => {
  let controller: SliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SliderController],
    }).compile();

    controller = module.get<SliderController>(SliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
