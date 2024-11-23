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
import { TeamsService } from './teams.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';

@ApiTags('teams')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Roles(Role.ADMIN, Role.USER)
  @Get('')
  async get(@GetUser('id') userId: string, @Query() query: PageOptionsDto) {
    return await this.teamsService.get(query, userId);
  }
  @Get('admin')
  async getAdmin(@Query() query: PageOptionsDto) {
    return await this.teamsService.getAdmin(query);
  }
  @Get('search')
  async search(@Query() query: SearchDto) {
    return await this.teamsService.search(query);
  }
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.teamsService.getById(id);
  }
  @Post('')
  async create(@Body() dto: CreateTeamDto) {
    return await this.teamsService.create(dto);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return await this.teamsService.update(id, dto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.teamsService.remove(id);
  }
}
