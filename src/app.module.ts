import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { SQSProducerModule } from './producerModule/producer.module';
import { UploadImagesS3Service } from './uploadImagesS3.service';

@Module({
  imports: [MulterModule,  ConfigModule.forRoot(), SQSProducerModule],
  controllers: [AppController],
  providers: [AppService, UploadImagesS3Service],
})
export class AppModule { }
