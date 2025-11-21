import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto, UserUpdateDto } from './user.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async store(data: UserDto) {
    const checkUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (checkUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hashPassword(data.password);
    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });
    return 'ok';
  }

  async update(id: number, values: UserUpdateDto) {
    let data = { ...values };
    if (values.password) {
      const hashedPassword = await hashPassword(values.password);
      data.password = hashedPassword;
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async destroy(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
