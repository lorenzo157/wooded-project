import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreeModule } from './tree/tree.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { UnitWorkModule } from './unitwork/unitwork.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '.env'),
    }),
    DatabaseModule,
    TreeModule,
    ProjectModule,
    UserModule,
    AuthModule,
    UnitWorkModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
