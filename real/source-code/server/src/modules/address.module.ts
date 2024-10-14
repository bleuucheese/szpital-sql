import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from 'src/controllers/address.controller';
import { Address } from 'src/entities/address.entity';
import { Patient } from 'src/entities/patient.entity';
import { AddressService } from 'src/services/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Patient])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }
