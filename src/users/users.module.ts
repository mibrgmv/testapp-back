import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})

export class UsersModule {}
