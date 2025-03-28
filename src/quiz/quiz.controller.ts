import {
    Controller,
    Get,
    Param,
    NotFoundException,
    ParseIntPipe
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
    ) {}

    @Get('q')
    @ApiOperation({
        summary: 'Get all quizzes',
        description: 'Retrieve a list of all available quizzes'
    })
    @ApiResponse({
        status: 200,
        description: 'List of quizzes retrieved successfully',
        type: [Quiz]
    })
    async findAll(): Promise<Quiz[]> {
        return await this.quizRepository.find();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a specific quiz by ID',
        description: 'Retrieve a single quiz by its unique identifier'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the quiz',
        type: 'number',
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Quiz retrieved successfully',
        type: Quiz
    })
    @ApiResponse({
        status: 404,
        description: 'Quiz not found'
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
        const quiz = await this.quizRepository.findOne({
            where: {id}
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        return quiz;
    }
}