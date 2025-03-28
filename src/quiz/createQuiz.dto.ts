import {ApiProperty} from '@nestjs/swagger';

export class CreateQuizDto {
    @ApiProperty({
        description: 'Title of the quiz',
        example: 'JavaScript Fundamentals',
        maxLength: 255
    })
    title: string;

    @ApiProperty({
        description: 'Optional description of the quiz',
        example: 'A comprehensive quiz to test JavaScript knowledge',
        required: false,
        maxLength: 1000
    })
    description?: string;
}