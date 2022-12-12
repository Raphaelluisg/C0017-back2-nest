import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { IHttpResponse } from 'src/utils/httpResponse';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAllUser(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IUserEntity> {
    try {
      return await this.service.getUserById(id);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  async createUser(
    @Body() { name, email, password, cpf, role }: UserDto,
    @Res() response: Response, 
  ) {
    try {
      const result = await this.service.createUser({
        cpf,
        email,
        name,
        password,
        role,
      });
      response.status(201).send(result);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  @Patch()
  async updateUser(@Body() userData: PartialUserDto): Promise<IUserEntity> {
    try {
      return await this.service.updateUser(userData);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<string> {
    const userIsDeleted = await this.service.deleteUserById(id);
    if (userIsDeleted) {
      return 'User deleted successfully!';
    } else {
      return 'User not found!';
    }
  }
}
