import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { error } from 'console';

let size = 0

@Injectable()
export class AppService {
  AWS_S3_BUCKET = 'im-homework';

  constructor(private configService: ConfigService) { }

  getSize() {
    return size
  }

  countSize(files) {
    if (files.length === 1) {
      size += files[0].size
    }
    else {
      files.forEach(file => {
        size += file.size
      });
    }
  }

  s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: this.configService.get('ACCESSKEYID'),
      secretAccessKey: this.configService.get('SECRETACCESSKEY'),
    },
  });
  async uploadImage(files) {
    this.countSize(files)
    if (files.length === 0) {
      return Error;
    }
    let uploadedImages = []
    if (files.length > 1) {
      files.forEach((file) => {
        uploadedImages.push(this.s3_upload(
          file.buffer,
          this.AWS_S3_BUCKET,
          file.originalname,
          file.mimetype,
        ))
      })
    }
    Promise.all(uploadedImages).then((value) =>{console.log(value)}).catch((error)=>console.log(error))
    console.log(uploadedImages)

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
