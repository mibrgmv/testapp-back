import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {User} from './users/user.entity';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {QuizModule} from "./quiz/quiz.module";
import {Quiz} from "./quiz/quiz.entity";
import {join} from 'path';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get<string>('POSTGRES_USERNAME'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DATABASE'),
                entities: [User, Quiz],
                synchronize: true,
                migrationsRun: true,
                migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
                migrationsTableName: 'migrations'
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        QuizModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
}
