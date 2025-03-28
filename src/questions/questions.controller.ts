import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param,
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
import {QuestionsService} from './questions.service';
import {CreateQuestionDto} from './createQuestion.dto';
import {Question} from './questions.entity';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new question',
        description: 'Create a new question for a specific quiz'
    })
    @ApiBody({type: CreateQuestionDto})
    @ApiResponse({
        status: 201,
        description: 'Question created successfully',
        type: Question
    })
    async create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.questionsService.create(createQuestionDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all questions',
        description: 'Retrieve all questions from all quizzes'
    })
    @ApiResponse({
        status: 200,
        description: 'List of all questions',
        type: [Question]
    })
    async findAll(): Promise<Question[]> {
        return this.questionsService.findAll();
    }

    @Get('quiz/:quizId')
    @ApiOperation({
        summary: 'Get questions by quiz ID',
        description: 'Retrieve all questions for a specific quiz'
    })
    @ApiParam({
        name: 'quizId',
        description: 'ID of the quiz to retrieve questions for',
        type: 'number'
    })
    @ApiResponse({
        status: 200,
        description: 'List of questions for the specified quiz',
        type: [Question]
    })
    async findByQuizId(@Param('quizId', ParseIntPipe) quizId: number): Promise<Question[]> {
        return this.questionsService.findByQuizId(quizId);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a question',
        description: 'Delete a specific question by its ID'
    })
    @ApiParam({
        name: 'id',
        description: 'ID of the question to delete',
        type: 'number'
    })
    @ApiResponse({
        status: 200,
        description: 'Question deleted successfully'
    })
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.questionsService.delete(id);
    }
}