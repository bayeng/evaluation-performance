import { PartialType } from '@nestjs/swagger';
import { CreateSkpDto } from './create-skp.dto';

export class UpdateSkpDto extends PartialType(CreateSkpDto) {}
