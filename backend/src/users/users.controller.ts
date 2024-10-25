import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('')
  get() {
    return this.userService.get();
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
