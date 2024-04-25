import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';


@Injectable()
export class MessageProducerService {
    constructor(private readonly sqsService: AWS.SQS) { }

    async sendMessage(dataInfo: any) {

        try {
            dataInfo.forEach(data => {
                const message: any = JSON.stringify(data);
                this.sqsService.sendMessage({
                    QueueUrl: process.env.QUEUEURL,
                    MessageBody: message
                }, (err, data) => {
                    if (err)
                        console.log('somethign went wrong!', err);
                    if (data)
                        console.log('ok!', data);
                });
            });

        } catch (error) {
            console.log('error in producing image!', error);
        }

    }
}