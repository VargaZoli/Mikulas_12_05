import { Module } from '@nestjs/common';
import { KidService } from './kid.service';
import { KidController } from './kid.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KidController],
  providers: [KidService, PrismaService],
})
export class KidModule {}
