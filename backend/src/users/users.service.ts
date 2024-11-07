import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination.util';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { SearchDto } from 'src/shared/dto/search.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async get(query: PageOptionsDto) {
    return await paginate(
      this.prisma.user,
      {
        orderBy: {
          username: query.order,
        },
        omit: {
          password: true,
        },
      },
      { page: query.page },
    );
  }
  async getById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }
  async search(query: SearchDto) {
    return await this.prisma.user.findMany({
      where: {
        username: {
          contains: query.search,
        },
      },
      omit: {
        password: true,
      },
    });
  }
  async create(dto: CreateUserDto) {
    try {
      const password = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        omit: {
          password: true,
        },
        data: {
          username: dto.username,
          password,
          role: dto.role,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            'User with this username already exists',
          );
        }
      }
      throw e;
    }
  }
  async update(dto: UpdateUserDto, id: string) {
    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }
    return await this.prisma.user.update({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      data: dto,
    });
  }
  async remove(id: string) {
    try {
      const user = this.prisma.user.delete({
        omit: { password: true },
        where: { id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }
}
