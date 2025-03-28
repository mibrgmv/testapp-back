import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Username for the new user',
        example: 'johndoe',
        minLength: 3
    })
    username: string;

    @ApiProperty({
        description: 'Password for the new user',
        example: 'strongPassword123',
        minLength: 6
    })
    password: string;
}