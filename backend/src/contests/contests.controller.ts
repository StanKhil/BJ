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
import { ContestsService } from './contests.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateContestDto, UpdateContestDto } from './dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { SearchDto } from 'src/shared/dto/search.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('contests')
@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) {}
  @Get('')
  async get(@GetUser('id') userId: string, @Query() query: PageOptionsDto) {
    return await this.contestsService.get(query, userId);
  }
  @Get('results/:id')
  async getResults(@GetUser('id') userId: string, @Param('id') id: string) {
    return await this.contestsService.getResults(id, userId);
  }
  @Get('team/:id')
  async getByTeam(@GetUser('id') userId: string, @Param('id') id: string) {
    return await this.contestsService.getByTeam(userId, id);
  }
  @Get('search')
  async search(@Query() query: SearchDto, @GetUser('id') userId: string) {
    return await this.contestsService.search(query, userId);
  }
  @Get(':id')
  async getById(@GetUser('id') userId: string, @Param('id') id: string) {
    return await this.contestsService.getById(userId, id);
  }
  @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() dto: CreateContestDto) {
    return await this.contestsService.create(dto);
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateContestDto,
  ) {
    return await this.contestsService.update(dto, id, userId);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return await this.contestsService.remove(id, userId);
  }
}
