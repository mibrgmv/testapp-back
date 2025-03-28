import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    NotFoundException,
    ParseIntPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody
} from '@nestjs/swagger';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Quiz} from './quiz.entity';

class CreateQuizDto {
    title: string;
    description?: string;
}

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
    ) {}

    @Get()
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

    @Post()
    @ApiOperation({
        summary: 'Create a new quiz',
        description: 'Create a new quiz with the provided details'
    })
    @ApiBody({
        type: CreateQuizDto,
        description: 'Quiz creation details'
    })
    @ApiResponse({
        status: 201,
        description: 'Quiz created successfully',
        type: Quiz
    })
    async create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
        const quiz = this.quizRepository.create({
            title: createQuizDto.title,
            description: createQuizDto.description
        });

        return await this.quizRepository.save(quiz);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a quiz',
        description: 'Delete a quiz by its unique identifier'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the quiz to delete',
        type: 'number',
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Quiz deleted successfully'
    })
    @ApiResponse({
        status: 404,
        description: 'Quiz not found'
    })
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const quiz = await this.quizRepository.findOne({where: {id}});

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        await this.quizRepository.remove(quiz);
    }
}