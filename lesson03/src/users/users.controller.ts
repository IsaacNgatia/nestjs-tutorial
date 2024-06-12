import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll(
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'DEVELOPER' | 'MANAGER',
  ) {
    return this.usersService.findAll(role);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Post()
  createUser(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.createUser(user);
  }
  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body('updatedUser', ValidationPipe)
    updatedUser: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updatedUser);
  }
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }
}
