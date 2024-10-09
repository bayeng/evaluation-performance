import { Module } from '@nestjs/common';
import { BkdModule } from './modules/bkd/bkd.module';
import { SkpModule } from './modules/skp/skp.module';
import { TahunAjaranModule } from './modules/tahun-ajaran/tahun-ajaran.module';
import { DetailUserModule } from './modules/detail-user/detail-user.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BkdModule, SkpModule, TahunAjaranModule, DetailUserModule, UserModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
