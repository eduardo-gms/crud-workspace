import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileDto } from './dto/profile.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiResponse({ status: 201, type: ProfileDto })
  @ApiResponse({ status: 400 })
  create(@Body() createProfileDto: CreateProfileDto): Promise<ProfileDto> {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [ProfileDto] })
  findAll(): Promise<ProfileDto[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ProfileDto })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string): Promise<ProfileDto | null> {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ProfileDto })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<ProfileDto> {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string): Promise<ProfileDto> {
    return this.profilesService.remove(id);
  }
}
