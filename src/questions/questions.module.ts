import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {QuestionsController} from './questions.controller';
import {QuestionsService} from './questions.service';
import {Question} from './questions.entity';
import {Quiz} from '../quiz/quiz.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Question, Quiz])],
    controllers: [QuestionsController],
    providers: [QuestionsService],
    exports: [QuestionsService],
})

export class QuestionsModule{}