import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, StreamableFile, } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from "express";

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  create(@UploadedFile() file: CreateMediaDto) {
    return this.mediaService.create(file);
  }
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string, @Res({ passthrough: true }) res: Response) {
    const file = await this.mediaService.findOne(name);
    res.set({
      "Content-Type": file.type,
      "Content-Disposition": `inline; filename="${file.name}"`,
    });
    return new StreamableFile(file.content);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
