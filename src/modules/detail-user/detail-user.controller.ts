import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { DetailUserService } from './detail-user.service';
import { CreateDetailUserDto } from './dto/create-detail-user.dto';
import { UpdateDetailUserDto } from './dto/update-detail-user.dto';
import { ResponseHelper } from '../../helper/response.helper';

@Controller('detail-users')
export class DetailUserController {
  constructor(private readonly detailUserService: DetailUserService) {}

  @Post()
  async create(@Body() createDetailUserDto: any) {
    try {
      const data = await this.detailUserService.create(createDetailUserDto);
      return ResponseHelper.success(
        HttpStatus.CREATED,
        'user detail created',
        data,
      );
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const datas = await this.detailUserService.findAll();
      return ResponseHelper.success(HttpStatus.OK, 'user details found', datas);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.detailUserService.findOne(+id);
      return ResponseHelper.success(HttpStatus.OK, 'user detail found', data);
    } catch (e) {
      throw ResponseHelper.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'internal server error',
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailUserDto: UpdateDetailUserDto,
  ) {
    return this.detailUserService.update(+id, updateDetailUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailUserService.remove(+id);
  }
}
