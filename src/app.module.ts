import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToyModule } from './toy/toy.module';
import { KidModule } from './kid/kid.module';

@Module({
  imports: [ToyModule, KidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
