import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Question} from './questions.entity';
import {CreateQuestionDto} from './createQuestion.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>,
    ) {
    }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = this.questionsRepository.create(createQuestionDto);
        return this.questionsRepository.save(question);
    }

    async findAll(): Promise<Question[]> {
        return this.questionsRepository.find();
    }

    async findByQuizId(quizId: number): Promise<Question[]> {
        return this.questionsRepository.find({
            where: {quizId},
            order: {id: 'ASC'}
        });
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.questionsRepository.findOne({where: {id}});
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
        return question;
    }

    async delete(id: number): Promise<void> {
        const question = await this.findOne(id);
        await this.questionsRepository.remove(question);
    }
}