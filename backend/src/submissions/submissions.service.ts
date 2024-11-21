import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubmissionDto } from './dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination.util';
import { SearchDto } from 'src/shared/dto/search.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class SubmissionsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('judge') private judgeQueue: Queue,
  ) {}
  async get(userId: string, query: PageOptionsDto) {
    return await paginate(
      this.prisma.submission,
      {
        orderBy: {
          createdAt: query.order,
        },
        where: { userId },
      },
      { page: query.page },
    );
  }
  async getAdmin(query: PageOptionsDto) {
    return await paginate(
      this.prisma.submission,
      {
        orderBy: {
          createdAt: query.order,
        },
      },
      { page: query.page },
    );
  }
  async search(query: SearchDto) {
    return await this.prisma.submission.findMany({
      where: {
        OR: [
          { id: { contains: query.search } },
          { user: { id: { contains: query.search } } },
          { problem: { id: { contains: query.search } } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getById(id: string) {
    return await this.prisma.submission.findUnique({ where: { id } });
  }
  async getByProblemId(problemId: string, userId: string) {
    return await this.prisma.submission.findMany({
      where: { problemId, userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async create(id: string, userId: string, dto: CreateSubmissionDto) {
    const problem = await this.prisma.problem.findUnique({
      where: { id, draft: false },
      include: {
        testCases: true,
        tester: true,
      },
    });
    if (
      !problem ||
      problem.draft ||
      !problem.tester.id ||
      problem.testCases.length === 0
    ) {
      throw new BadRequestException('problem with this id isnt exist');
    }
    const submission = await this.prisma.submission.create({
      data: {
        problem: {
          connect: {
            id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        language: dto.language,
        code: dto.code,
      },
    });
    await this.judgeQueue.add('judge', {
      tests: problem.testCases,
      tester: problem.tester,
      submission,
    });
    return submission;
  }
}
