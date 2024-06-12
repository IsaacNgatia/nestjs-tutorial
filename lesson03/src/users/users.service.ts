import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'graham@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'howell@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'bauch@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'lebsack@gmail.com',
      role: 'MANAGER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'dietrich@gmail.com',
      role: 'DEVELOPER',
    },
  ];
  findAll(role?: 'INTERN' | 'MANAGER' | 'DEVELOPER' | 'ENGINEER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException(`Role ${role} not found`);
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }
  createUser(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  updateOne(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });
    return this.findOne(id);
  }
  deleteOne(id: number) {
    const removedUser = this.findOne(id);
    // this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
