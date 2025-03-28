import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {QuizController} from './quiz.controller';
import {Quiz} from './quiz.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Quiz])],
    controllers: [QuizController],
    providers: [],
    exports: [TypeOrmModule],
})

export class QuizModule {}