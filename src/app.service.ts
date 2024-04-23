import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import * as AWS from 'aws-sdk';


const writeFileAsync = promisify(fs.writeFile);


@Injectable()
export class AppService {
  
  async uploadImage(files: any) {
    console.log(files)

    // if (files.length > 1) { 
    //   for (let file of files) {
    //     const filePath = `./uploads/${file.originalname}`;
    //     await writeFileAsync(filePath, Buffer.from(file, "base64"));
    //   }
    // } else {
    //   const filePath = `./uploads/${files[0].originalname}`;
    //   await writeFileAsync(filePath, Buffer.from(files[0], "base64"));
    // }
  }
}
