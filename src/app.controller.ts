import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('resizeAndUpload')
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @UseInterceptors( FilesInterceptor('files[]', 5,))
  uploadImage(@UploadedFiles() files:any): any {
    this.appService.uploadImage(files)
  }

  @Get()
  checkStatus(): any {
   
  }
}
