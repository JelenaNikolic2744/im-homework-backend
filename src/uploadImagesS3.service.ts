import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { MessageProducerService } from './producerModule/messageProducer.service';


@Injectable()
export class UploadImagesS3Service {

    constructor(private configService: ConfigService,
        private messageProducer: MessageProducerService) { }

    s3Client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: this.configService.get('ACCESSKEYID'),
            secretAccessKey: this.configService.get('SECRETACCESSKEY'),
        },
    });
    async uploadImageS3(files, width, height) {
        if (files.length === 0) {
            return Error;
        }
        let uploadedImages = []
       
        if (files.length > 1) {
            files.forEach((file) => {
                console.log(file)
                uploadedImages.push(this.s3_upload(
                    file.buffer,
                    this.configService.get('AWSS3BUCKET'),
                    file.originalname,
                    file.mimetype,
                ))
            })
        }
        let sqsData =[]
        await Promise.all(uploadedImages).then((value) => {
            console.log(value)
            files.forEach((data) => {
                sqsData.push({width:width.width, height:height.height, nameKey:data.originalname})
            })
        }).catch((error) => console.log(error))
      
        this.messageProducer.sendMessage(sqsData)
        return uploadedImages
    }

    async s3_upload(file, bucket, name, mimetype) {
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
