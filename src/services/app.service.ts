import { Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class AppService {

  private readonly logger: Logger = new Logger(AppService.name);

  getUser(userId: number): User {

    this.logger.log(`Found user with id ${userId}`);

    return {
      "id": 1,
      "title": "Mr",
      "firstname": "Test",
      "surname": "User"
    };
  }
}
