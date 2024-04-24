import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';


@Injectable()
export class MessageProducerService {
    constructor(private readonly sqsService: AWS.SQS) { }

    async sendMessage(dataInfo: any) {

        console.log(dataInfo)
        const id = String(Math.floor(Math.random() * 1000000));


        try {
            dataInfo.forEach(data => {
                const message: any = JSON.stringify(data);
                this.sqsService.sendMessage({
                    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/799513362811/im-homework',
                    MessageBody: message
                }, (err, data) => {
                    if (err)
                        console.log('somethign went wrong!', err);
                    if (data)
                        console.log('somethign went ok!', data);
                });
            });

        } catch (error) {
            console.log('error in producing image!', error);
        }

    }
}