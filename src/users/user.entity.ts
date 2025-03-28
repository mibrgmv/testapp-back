import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({
        description: 'Unique identifier for the user',
        example: 1
    })
    @PrimaryGeneratedColumn()
    userId: number;

    @ApiProperty({
        description: 'Unique username for the user',
        example: 'johndoe'
    })
    @Column({ unique: true })
    username: string;

    @ApiProperty({
        description: 'User\'s password (will be hashed)',
        example: 'hashedPassword123'
    })
    @Column()
    password: string;

    @ApiProperty({
        description: 'Date and time when the user was created',
        example: '2023-01-01T00:00:00.000Z'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({
        description: 'Date and time of the user\'s last login',
        example: '2023-01-02T12:00:00.000Z'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;
}