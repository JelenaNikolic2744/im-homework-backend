import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import * as AWS from 'aws-sdk';


const writeFileAsync = promisify(fs.writeFile);


@Injectable()
export class AppService {
  AWS_S3_BUCKET = 'im-homework';
  s3 = new AWS.S3({
    apiVersion:"2006-03-01",
    region: "us-east-1",
  
  });

  async uploadImage(files) {
    console.log(files);
    if (files.length < 0) {
      return Error
    }
    let file = files[0]
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  // async uploadImage(files: any) {
  // }
}
