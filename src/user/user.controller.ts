import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../global/decorator/public.decorator';
import { CaptchaGuard } from '../global/guard/captcha.guard';
import { Request } from 'express';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @UseGuards(CaptchaGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: GetUserDto) {
    return this.userService.findAll(query);
  }

  // get user detail by id
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // get logined user's detail, the user is who send the request
  @Get('info')
  getLoginUser(@Req() req: Request) {
    const user = req.user;
    return this.userService.getLoginUser(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
