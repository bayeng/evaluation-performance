import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SkpService } from './skp.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../../upload/upload.service';

@Controller('skp')
export class SkpController {
  constructor(private readonly skpService: SkpService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('skp', new FileUploadInterceptor().createMulterOptions()),
  )
  async create(@Body() createSkpDto, @UploadedFile() skp: Express.Multer.File) {
    return this.skpService.createSkp(createSkpDto, skp);
  }

  @Get()
  findAll() {
    return this.skpService.findAllSkpByFilters();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: any) {
    return this.skpService.updateSkp(+id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skpService.remove(+id);
  }
}
