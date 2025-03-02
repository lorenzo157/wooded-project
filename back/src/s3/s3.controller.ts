import { Controller, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { Response } from 'express';
//import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
@Controller('s3')
//@UseGuards(JwtAuthGuard)
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('uploadfile')
  async uploadFile(@Body() uploadFileDto: UploadFileDto, @Res() res: Response) {
    try {
      const response = await this.s3Service.uploadFile(uploadFileDto);
      res.status(HttpStatus.OK).send(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
