import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination.util';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async get(query: PageOptionsDto, userId: string) {
    return await paginate(
      this.prisma.team,
      {
        where: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          participants: {
            omit: { password: true },
          },
        },
      },
      { page: query.page },
    );
  }
  async search(query: SearchDto, userId: string) {
    return await this.prisma.team.findMany({
      where: {
        name: { contains: query.search },
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });
  }
  async getById(id: string, userId: string) {
    return await this.prisma.team.findUnique({
      where: {
        id,
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });
  }
  async create(userId: string, dto: CreateTeamDto) {
    return await this.prisma.team.create({
      data: {
        name: dto.name,
        owner: {
          connect: {
            id: userId,
          },
        },
        participants: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async update(userId: string, id: string, dto: UpdateTeamDto) {
    const team = this.prisma.team.findUnique({
      where: { id, ownerId: userId },
    });
    if (!team) {
      throw new BadRequestException(
        'team with this id and ownerId doesnt exist',
      );
    }
    return await this.prisma.team.update({
      where: {
        id,
      },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.participants && {
          participants: {
            set: dto.participants.map((id) => ({ id })),
          },
        }),
      },
    });
  }
  async remove(userId: string, id: string) {
    const team = this.prisma.team.findUnique({
      where: { id, ownerId: userId },
    });
    if (!team) {
      throw new BadRequestException(
        'team with this id and ownerId doesnt exist',
      );
    }
    return await this.prisma.team.delete({
      where: {
        id,
      },
    });
  }
}
