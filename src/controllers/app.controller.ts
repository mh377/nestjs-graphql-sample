import { Controller, Get, Logger, Headers, Param } from '@nestjs/common';
import { User } from '../models/user.model';
import { AppService } from '../services/app.service';

@Controller('/users')
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('/:userId')
  async getUser(@Headers() headers, @Param('userId') userId: number): Promise<User> {

    this.logger.log(`Received a REST request to retrieve a user with id ${userId}`);

    return this.appService.getUser(userId);
  }
}
