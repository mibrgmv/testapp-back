import {ApiProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsArray,
    ArrayMinSize,
    IsInt,
    Min
} from 'class-validator';

export class CreateQuestionDto {
    @ApiProperty({
        description: 'Body/text of the question',
        example: 'What is the capital of France?'
    })
    @IsString()
    @IsNotEmpty()
    body: string;

    @ApiProperty({
        description: 'Array of possible answers',
        example: ['Paris', 'London', 'Berlin', 'Rome']
    })
    @IsArray()
    @ArrayMinSize(2)
    @IsString({each: true})
    answers: string[];

    @ApiProperty({
        description: 'ID of the quiz this question belongs to',
        example: 1
    })
    @IsInt()
    @Min(1)
    quizId: number;
}