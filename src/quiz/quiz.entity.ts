import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('quizzes')
export class Quiz {
    @ApiProperty({
        description: 'Unique identifier for the quiz',
        example: 1
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        description: 'Title of the quiz',
        example: 'JavaScript Fundamentals Quiz'
    })
    @Column({length: 255})
    title: string;

    @ApiProperty({
        description: 'Optional description of the quiz',
        example: 'A comprehensive quiz to test your JavaScript knowledge',
        required: false
    })
    @Column({type: 'text', nullable: true})
    description: string;
}