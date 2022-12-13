import { PrismaService } from 'src/prisma/prisma.service';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { IUserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: IUserEntity): Promise<IUserEntity> {
    try {
      const CreatedUser = await this.prisma.user.create({ data: user });
      return CreatedUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Error while create user, CPF or EMAIL already in use.',
      );
    }
  }

  async updateUser(user: PartialUserDto): Promise<IUserEntity> {
    try {
      const UpdatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: user,
      });
      return UpdatedUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Error while updated user.',
      );
    }
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id: id },
      });
      return deletedUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'User not found in database',
      );
    }
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    try {
      const allUsers = await this.prisma.user.findMany();
      return allUsers;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findUserById(id: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
      });
      return foundUser;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
