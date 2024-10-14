import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as sharp from 'sharp';

@Injectable()
export class MediaService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }
  async create(createMediaDto: CreateMediaDto) {

    const { buffer } = createMediaDto
    // Compress the image
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1024 }) // Optionally resize the image
      .webp({ quality: 80 }) // Convert to JPEG with 80% quality
      .toBuffer();
    const currentDate = new Date().getTime();
    const name = `${currentDate.toString()}.webp`
    const query = `INSERT INTO media (name, content, type) VALUES (?, ?, ?);`;
    await this.entityManager.query(query, [
      name, compressedBuffer, 'image/webp' // ensure to specify the actual mimetype if different
    ]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const result = await this.entityManager.query(lastInsertIdQuery);
    const { id } = result[0]; // Ensure the id is correctly extracted
    console.log(process.env.BASE_URL)
    return {
      id,
      image_url: `${process.env.BASE_URL}/media/${name}`
    };
  }

  findAll() {
    return `This action returns all media`;
  }

  async findOne(name: string) {
    const query = `SELECT * FROM media WHERE name = ?;`;  // Use parameterized query to prevent SQL injection
    const result = await this.entityManager.query(query, [name]);

    if (result.length === 0) {
      throw new NotFoundException(`No media found with the name: ${name}`);  // Optionally, you could throw an exception here
    }

    return result[0];  // Returns the first (and should be only) media entry with that name
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
