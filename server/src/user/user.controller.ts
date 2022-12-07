import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';

@Controller()
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
  ): Promise<IUserEntity> {
    try {
      return await this.service.createUser({
        cpf,
        email,
        name,
        password,
        role,
      });
    } catch (err) {
      console.log(err);
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
