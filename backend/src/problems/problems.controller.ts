import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AddTestDto,
  AddTesterDto,
  CreateProblemDto,
  UpdateProblemDto,
  UpdateTestDto,
  UpdateTesterDto,
} from './dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}
  @Roles(Role.ADMIN, Role.USER)
  @Get('')
  async getProblems(
    @Query() query: PageOptionsDto,
    @GetUser('id') userId: string,
  ) {
    return await this.problemsService.get(query, userId);
  }
  @Get('admin')
  async getProblemsAdmin(@Query() query: PageOptionsDto) {
    return await this.problemsService.getAdmin(query);
  }
  @Roles(Role.ADMIN, Role.USER)
  @Get('search')
  async search(@Query() query: SearchDto) {
    return await this.problemsService.search(query);
  }
  @Get('tests/:id')
  async getTestCases(@Param('id') id: string) {
    return await this.problemsService.getTestCases(id);
  }
  @Get('test/:id')
  async getTestCaseById(@Param('id') id: string) {
    return await this.problemsService.getTestCaseById(id);
  }
  @Get('tester/problem/:id')
  async getTesterByProblemId(@Param('id') id: string) {
    return await this.problemsService.getTesterByProblemId(id);
  }
  @Get('tester/:id')
  async getTesterById(@Param('id') id: string) {
    return await this.problemsService.getTesterById(id);
  }
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async getProblemById(@Param('id') id: string) {
    return await this.problemsService.getById(id);
  }
  @Post('')
  async createProblem(@Body() dto: CreateProblemDto) {
    return await this.problemsService.create(dto);
  }
  @Post('tests/:id')
  async addTest(@Body() dto: AddTestDto, @Param('id') id: string) {
    return await this.problemsService.addTestCase(id, dto);
  }
  @Post('testers/:id')
  async addTester(@Body() dto: AddTesterDto, @Param('id') id: string) {
    return await this.problemsService.addTester(id, dto);
  }
  @Patch(':id')
  async updateProblem(@Body() dto: UpdateProblemDto, @Param('id') id: string) {
    return await this.problemsService.updateProblem(id, dto);
  }
  @Patch('tests/:id')
  async updateTest(@Body() dto: UpdateTestDto, @Param('id') id: string) {
    return await this.problemsService.updateTestCase(id, dto);
  }
  @Patch('testers/:id')
  async updateTester(@Body() dto: UpdateTesterDto, @Param('id') id: string) {
    return await this.problemsService.updateTester(id, dto);
  }
  @Delete(':id')
  async removeProblem(@Param('id') id: string) {
    return await this.problemsService.removeProblem(id);
  }
  @Delete('tests/:id')
  async removeTest(@Param('id') id: string) {
    return await this.problemsService.removeTestCase(id);
  }
  @Delete('testers/:id')
  async removeTester(@Param('id') id: string) {
    return await this.problemsService.removeTester(id);
  }
}
