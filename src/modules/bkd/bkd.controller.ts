import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BkdService } from './bkd.service';
import { CreateBkdDto } from './dto/create-bkd.dto';
import { UpdateBkdDto } from './dto/update-bkd.dto';

@Controller('bkd')
export class BkdController {
  constructor(private readonly bkdService: BkdService) {}

  @Post()
  create(@Body() createBkdDto: CreateBkdDto) {
    return this.bkdService.create(createBkdDto);
  }

  @Get()
  findAll() {
    return this.bkdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bkdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBkdDto: UpdateBkdDto) {
    return this.bkdService.update(+id, updateBkdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bkdService.remove(+id);
  }
}
