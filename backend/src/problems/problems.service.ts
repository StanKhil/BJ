import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddTestDto,
  AddTesterDto,
  CreateProblemDto,
  UpdateProblemDto,
  UpdateTestDto,
  UpdateTesterDto,
} from './dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination.util';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { ProblemSubmissions } from './interface/problem.submissions.interface';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}
  async get(query: PageOptionsDto, userId: string) {
    const paginated = await paginate(
      this.prisma.problem,
      {
        where: {
          draft: false,
        },
        orderBy: {
          name: query.order,
        },
        include: {
          submissions: {
            where: {
              userId,
            },
            select: {
              verdict: true,
              id: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      },
      { page: query.page },
    );
    const transformedProblems = paginated.data.map(
      (problem: ProblemSubmissions) => {
        return {
          ...problem,
          submission: problem.submissions[0] || null,
        };
      },
    );
    transformedProblems.forEach((problem) => delete problem.submissions);
    return { data: transformedProblems, meta: paginated.meta };
  }
  async getAdmin(query: PageOptionsDto) {
    return await paginate(
      this.prisma.problem,
      {
        orderBy: {
          name: query.order,
        },
      },
      { page: query.page },
    );
  }
  async search(query: SearchDto) {
    return await this.prisma.problem.findMany({
      where: {
        OR: [
          { name: { contains: query.search } },
          { description: { contains: query.search } },
        ],
      },
    });
  }
  async getById(id: string) {
    return await this.prisma.problem.findUnique({ where: { id } });
  }
  async getTestCases(id: string) {
    return await this.prisma.testCase.findMany({
      where: {
        problemId: id,
      },
    });
  }
  async getTestCaseById(id: string) {
    return await this.prisma.testCase.findUnique({
      where: {
        id,
      },
    });
  }
  async getTesterByProblemId(id: string) {
    return await this.prisma.tester.findFirst({
      where: {
        problemId: id,
      },
    });
  }
  async getTesterById(id: string) {
    return await this.prisma.tester.findFirst({
      where: {
        id,
      },
    });
  }
  async create(dto: CreateProblemDto) {
    return await this.prisma.problem.create({ data: dto });
  }
  async addTestCase(id: string, dto: AddTestDto) {
    const problem = await this.prisma.problem.findUnique({
      where: { id },
    });
    if (!problem) {
      throw new BadRequestException('problem with this id doesnt exist');
    }
    const testCase = this.prisma.testCase.create({
      data: {
        problem: {
          connect: {
            id,
          },
        },
        input: dto.input,
      },
    });
    return testCase;
  }
  async addTester(id: string, dto: AddTesterDto) {
    const problem = await this.prisma.problem.findUnique({
      where: { id },
    });
    if (!problem) {
      throw new BadRequestException('problem with this id doesnt exist');
    }
    const tester = this.prisma.tester.create({
      data: {
        problem: {
          connect: {
            id,
          },
        },
        language: dto.language,
        code: dto.code,
      },
    });
    return tester;
  }
  async updateProblem(id: string, dto: UpdateProblemDto) {
    return this.prisma.problem.update({
      where: { id },
      data: dto,
    });
  }
  async updateTester(id: string, dto: UpdateTesterDto) {
    return this.prisma.tester.update({
      where: { id },
      data: dto,
    });
  }
  async updateTestCase(id: string, dto: UpdateTestDto) {
    return this.prisma.testCase.update({
      where: { id },
      data: dto,
    });
  }
  async removeTestCase(id: string) {
    const testCase = this.prisma.testCase.delete({ where: { id } });
    return testCase;
  }
  async removeTester(id: string) {
    const tester = this.prisma.tester.delete({ where: { id } });
    return tester;
  }
  async removeProblem(id: string) {
    const problem = this.prisma.problem.delete({ where: { id } });
    return problem;
  }
}
