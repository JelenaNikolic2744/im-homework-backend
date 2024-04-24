import { Module } from '@nestjs/common';
import { MessageProducerService } from './messageProducer.service';
import * as AWS from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [],
    providers: [{
        provide: AWS.SQS,
        useFactory: () => {
            const region = 'us-east-1';
            const accessKeyId = process.env.ACCESSKEYID;
            const secretAccessKey =  process.env.SECRETACCESSKEY;

            AWS.config.update({
                region,
                accessKeyId,
                secretAccessKey,
            });

            return new AWS.SQS();
        },

    }, MessageProducerService],
    exports: [MessageProducerService],
})
export class SQSProducerModule { }