import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContestDto, UpdateContestDto } from './dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination.util';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ContestsService {
  constructor(private prisma: PrismaService) {}
  async get(query: PageOptionsDto, userId: string) {
    return await paginate(
      this.prisma.contest,
      {
        where: {
          team: {
            participants: {
              some: {
                id: userId,
              },
            },
          },
        },
        orderBy: {
          name: query.order,
        },
        include: {
          problems: true,
        },
      },
      { page: query.page },
    );
  }
  async search(query: SearchDto, userId: string) {
    return await this.prisma.contest.findMany({
      where: {
        name: { contains: query.search },
        team: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
      },
    });
  }
  async getResults(id: string, userId: string) {
    const contest = await this.prisma.contest.findUnique({
      where: {
        id,
        team: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
      },
    });
    if (!contest) {
      throw new BadRequestException(
        'contest with that id and user doesnt exist',
      );
    }
    const problems = this.prisma.problem.findMany({
      where: {
        contests: {
          some: {
            id: contest.id,
          },
        },
      },
      include: {
        submission: {
          distinct: ['userId'],
          where: {
            createdAt: {
              gte: contest.timeStart,
              lte: contest.timeEnd,
            },
          },
          select: {
            id: true,
            verdict: true,
            createdAt: true,
            user: {
              select: {
                username: true,
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return problems;
  }
  async getByTeam(userId: string, teamId: string) {
    return await this.prisma.contest.findMany({
      where: {
        team: {
          id: teamId,
          participants: {
            some: {
              id: userId,
            },
          },
        },
      },
      include: {
        problems: true,
      },
    });
  }
  async getById(userId: string, id: string) {
    return await this.prisma.contest.findUnique({
      where: {
        id,
        team: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
      },
      include: {
        problems: true,
      },
    });
  }
  async create(dto: CreateContestDto) {
    return await this.prisma.contest.create({
      data: {
        problems: {
          connect: dto.problems.map((id) => ({ id })),
        },
        team: {
          connect: {
            id: dto.teamId,
          },
        },
        name: dto.name,
        timeEnd: dto.timeEnd,
        timeStart: dto.timeStart,
      },
    });
  }
  async update(dto: UpdateContestDto, id: string, userId: string) {
    const contest = await this.prisma.contest.findUnique({
      where: {
        id,
        team: {
          ownerId: userId,
        },
      },
    });
    if (!contest) {
      throw new BadRequestException(
        'contest with that id and owner doesnt exist',
      );
    }
    await this.prisma.contest.update({
      where: {
        id,
      },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.timeEnd && { timeEnd: dto.timeEnd }),
        ...(dto.timeStart && { timeStart: dto.timeStart }),
        ...(dto.problems && {
          problems: {
            set: dto.problems.map((id) => ({ id })),
          },
        }),
      },
    });
  }
  async remove(id: string, userId: string) {
    const contest = await this.prisma.contest.findUnique({
      where: {
        id,
        team: {
          ownerId: userId,
        },
      },
    });
    if (!contest) {
      throw new BadRequestException(
        'contest with that id and owner doesnt exist',
      );
    }
    return await this.prisma.contest.delete({ where: { id } });
  }
}
