import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {

  uploadImage(files: any) {
    let temp = files[0]
   
      console.log(temp)
    
  

    // const filePath = `./uploads/${file.originalname}`;
    // fs.writeFileSync(filePath, file.buffer);
  }

}
