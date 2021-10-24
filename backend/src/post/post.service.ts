import {Injectable, NotFoundException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PostEntity} from "./entities/post.entity";
import {UserEntity} from "../user/entities/user.entity";
import {SearchPostDto} from "./dto/search-post.dto";
import {find} from "rxjs";

@Injectable()
export class PostService {
  constructor(
      @InjectRepository(PostEntity)
      private repository: Repository<PostEntity>
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC').limit(10);
    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total
    }
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p');
    qb.limit(dto.limit).offset(dto.offset);

    if (dto.views) {
      qb.orderBy('views', dto.views);
    }

    if (dto.body) {
      qb.andWhere(`p.body ILIKE :body`)
    }

    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title`)
    }

    if (dto.tag) {
      qb.andWhere(`p.tag ILIKE :tag`)
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || 'DESC',
    })

    const [items, total] = await qb.getManyAndCount();

    return {items, total};
  }


  async findOne(id: number) {
    const post = this.repository.findOne(+id)

    if (!post) {
      throw new NotFoundException('Статья не найдена');
    }

    await this.repository
        .createQueryBuilder('posts')
        .whereInIds(id)
        .update()
        .set({
          views: () => 'views + 1'
        })
        .execute();

    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.repository.findOne(+id);

    if (!post) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const post = await this.repository.findOne(+id);

    if (!post) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.repository.delete(id);
  }
}
