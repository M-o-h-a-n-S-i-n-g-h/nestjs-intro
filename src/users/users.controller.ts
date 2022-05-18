import {Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {User} from "./entities/user-entity";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.usersService.findAll(name);
  }

  @Get(":id")
  getUsersById(@Param("id", ParseIntPipe) id: number): User {
    const user = this.usersService.findById(id);

    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
