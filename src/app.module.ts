import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ToyService } from './toy/toy.service';
import { KidService } from './kid/kid.service';
import { ToyController } from './toy/toy.controller';
import { KidController } from './kid/kid.controller';

@Module({
  imports: [],
  controllers: [ToyController, KidController],
  providers: [PrismaService, ToyService, KidService],
})
export class AppModule {}
