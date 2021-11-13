import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../user/dto/create-user.dto";


@Injectable()
export class AuthService {
  constructor(
      private  usersService: UserService,
      private  jwtService: JwtService,
  ) {}

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({
      email,
      password
    });
    if (user && user.password === password) {
      const  { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData)
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const {password, ...user} = await this.usersService.create({
        email: dto.email,
        password: dto.password,
        fullName: dto.fullName,
      });
      return{
        ...user,
        token: this.generateJwtToken(user)
      }
    } catch (err) {
      throw new ForbiddenException('Ошибка при регистрации');
    }

  }


}
