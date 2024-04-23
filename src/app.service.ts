import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {

  uploadImage(files: any) {
   
      console.log(files)
    
  

    // const filePath = `./uploads/${file.originalname}`;
    // fs.writeFileSync(filePath, file.buffer);
  }

}
