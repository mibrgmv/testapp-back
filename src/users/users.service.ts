
import { Injectable } from '@nestjs/common';

export type User = any;

export class UserDto {
    username: string;
    createdAt: Date;
    lastLogin: Date;
}

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            createdAt: new Date(),
            lastLogin: new Date(),
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            createdAt: new Date(),
            lastLogin: new Date(),
        },
        {
            userId: 3,
            username: 'root',
            password: 'root',
            createdAt: new Date(),
            lastLogin: new Date(),
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findAll(): Promise<UserDto[]> {
        return this.users.map(user => ({
            username: user.username,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
        }));
    }

    async updateLastLogin(username: string): Promise<void> {
        const user = await this.findOne(username);
        if (user) {
            user.lastLogin = new Date();
        }
    }
}
