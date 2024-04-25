import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { MessageProducerService } from './producerModule/messageProducer.service';


@Injectable()
export class UploadImagesS3Service {

    constructor(private messageProducer: MessageProducerService) { }

    s3Client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY,
        },
    });
    async uploadImageS3(files: any, width: any, height: any) {
        if (files.length === 0) {
            return Error;
        }
        let uploadedImages = []
       
        if (files.length > 1) {
            files.forEach((file) => {
                console.log(file)
                uploadedImages.push(this.s3_upload(
                    file.buffer,
                    process.env.AWSS3BUCKET,
                    file.originalname,
                    file.mimetype,
                ))
            })
        }
        let sqsData =[]
        await Promise.all(uploadedImages).then((value) => {
            files.forEach((data) => {
                sqsData.push({width:width.width, height:height.height, nameKey:data.originalname})
            })
        }).catch((error) => console.log(error))
      
        this.messageProducer.sendMessage(sqsData)
        return uploadedImages
    }

    async s3_upload(file: any, bucket: any, name: any, mimetype: any) {
        try {
            let s3Response = await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Key: String(name),
                    Body: file,
                    ContentType: mimetype,
                }),
            );
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}
