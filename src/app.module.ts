import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MulterModule,  ConfigModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
