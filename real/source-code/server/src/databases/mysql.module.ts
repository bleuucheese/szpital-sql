import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Local
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        // entities: [User, Post],
        logging: false,
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //     useFactory: (configService: ConfigService) => ({
    //         type: 'postgres',
    //         host: configService.getOrThrow('DATABASE_HOST'),
    //         username: configService.getOrThrow('DATABASE_USERNAME'),
    //         password: configService.getOrThrow('DATABASE_PASSWORD'),
    //         database: configService.getOrThrow('DATABASE_NAME'),
    //         autoLoadEntities: true,
    //         synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE'),
    //         ssl: true
    //     }),
    //     inject: [ConfigService],
    // }),
  ],
})
export class MySqlModule { }
