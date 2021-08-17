import { Request } from 'express';

export interface FilesMapper {
  files: Express.Multer.File[];
  req: Request;
}