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
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('')
  get(@Query() query: PageOptionsDto) {
    return this.userService.get(query);
  }
  @Roles(Role.ADMIN, Role.USER)
  @Get('me')
  async getMe(@GetUser('id') id: string) {
    return await this.userService.getById(id);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.userService.search(query);
  }
  @Post('')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @Patch(':id')
  update(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(dto, id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
