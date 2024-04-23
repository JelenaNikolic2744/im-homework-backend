import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('resizeAndUpload')
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images[]'))
  uploadImage(@UploadedFiles() files:any): any {
    this.appService.uploadImage(files)
  }

  @Get()
  checkStatus(): any {
   
  }
}
