import { Injectable } from '@nestjs/common';
import { UploadImagesS3Service } from './uploadImagesS3.service';

let size = 0

@Injectable()
export class AppService {


  constructor(private uploadImagesS3Service: UploadImagesS3Service) { }

  uploadImage(files: any, width: any, height: any) {
    this.countSize(files)
    return this.uploadImagesS3Service.uploadImageS3(files, width, height)
  }

  getSize() {
    return size
  }

  countSize(files: any) {
    files.forEach(file => {
      size += file.size
    });
  }
}
