import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async root() {
    try {
      const rootMessage = this.appService.rootMessage();
      return {
        message: rootMessage,
        description: 'API for authentication such as google, facebook, etc',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
