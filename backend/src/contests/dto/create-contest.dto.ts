import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateContestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  problems: string[];
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  timeEnd: Date;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  timeStart: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  teamId: string;
}
