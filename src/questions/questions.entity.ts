import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../quiz/quiz.entity';

@Entity('questions')
export class Question {
    @ApiProperty({
        description: 'Unique identifier for the question',
        example: 1
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        description: 'Body/text of the question',
        example: 'What is the capital of France?'
    })
    @Column('text')
    body: string;

    @ApiProperty({
        description: 'Array of possible answers',
        example: ['Paris', 'London', 'Berlin', 'Rome']
    })
    @Column('simple-array')
    answers: string[];

    @ApiProperty({
        description: 'ID of the quiz this question belongs to',
        example: 1
    })
    @Column()
    quizId: number;
}