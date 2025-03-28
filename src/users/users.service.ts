import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'Unique identifier for the user',
        example: 1
    })
    userId?: number;

    @ApiProperty({
        description: 'Username of the user',
        example: 'johndoe'
    })
    username: string;

    @ApiProperty({
        description: 'Date and time when the user was created',
        example: '2023-01-01T00:00:00.000Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date and time of the user\'s last login',
        example: '2023-01-02T12:00:00.000Z'
    })
    lastLogin: Date;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.usersRepository.find();
        return users.map((user) => ({
            userId: user.userId,
            username: user.username,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
        }));
    }

    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async updateLastLogin(username: string): Promise<void> {
        const user = await this.findOne(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.lastLogin = new Date();
        await this.usersRepository.save(user);
    }
}
