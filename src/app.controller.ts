import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('resizeAndUpload')
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @UseInterceptors( FilesInterceptor('files[]', 5, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const suffix = Date.now() + '-';
        const extension = extname(file.originalname);
        callback(null, `${file.fieldname}-${suffix}${extension}`);
      },
    }),
  }),)
  uploadImage(@UploadedFiles() files:any): any {
    console.log(files)
    this.appService.uploadImage(files)
  }

  @Get()
  checkStatus(): any {
   
  }
}
