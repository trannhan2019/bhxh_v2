import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { RegisterDto } from './auth.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  async register() {
    const user: RegisterDto = {
      name: 'admin',
      email: 'admin@admin.com',
      password: '123456789',
    };
    const checkUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (checkUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hashPassword(user.password);
    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
    return newUser;
  }
}
