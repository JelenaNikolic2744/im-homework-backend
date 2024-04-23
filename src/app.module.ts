import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './uploads',
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    }, // Destination folder for uploaded files
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
