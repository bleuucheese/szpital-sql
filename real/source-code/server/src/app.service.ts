import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {
    this.connection.on('connecting', () => {
      console.log('connecting');
    })
    this.connection.on('connected', () => {
      console.log('connected');
    })
    this.connection.on('disconnecting', () => {
      console.log('disconnecting');
    })
    this.connection.on('disconnected', () => {
      console.log('disconnected');
    })
  }
  getHello(): string {
    return 'Hello World!';
  }
}
