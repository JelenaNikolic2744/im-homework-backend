import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('resizeAndUpload')
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  uploadImage(@Body() files:any): any {
    this.appService.uploadImage(files)
  }

  @Get()
  checkStatus(): any {
   
  }
}
