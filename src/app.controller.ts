import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('resizeAndUpload')
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @UseInterceptors( FilesInterceptor('files[]', 5,))
  uploadImage(@UploadedFiles() files:any, @Body() width:any, @Body() height:any): any {
    this.appService.uploadImage(files, width, height)
  }

  @Get()
  checkStatus(): any {
  }

  @Get('stats')
  getStats(){
    return this.appService.getSize()
  }
}
