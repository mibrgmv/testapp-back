import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserDto, UsersService} from "./users.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAllUsersWithDetails(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }
}