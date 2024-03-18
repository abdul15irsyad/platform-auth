import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  rootMessage(): string {
    return 'Platform Auth APi';
  }
}
