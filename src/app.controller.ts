import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()	

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  @ApiExcludeEndpoint()	

  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
}
