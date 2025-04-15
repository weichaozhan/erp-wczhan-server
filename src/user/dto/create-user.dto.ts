import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Matches(/^(\d|\w|_|[\u4e00-\u9fa5])+$/, {
    message: '用户名只允许字母数字下划线及汉字组成',
  })
  username: string;

  @IsNotEmpty({ message: '邮箱为空' })
  @Matches(/^\w+[-+.]?\w+@\w+(-.\w+)*.\w+(-.\w+)*$/, {
    message: '请输入正确的邮箱格式',
  })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Matches(
    /^(?=.*\d)(?!.*(\d)\1{2})(?!.*(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210))(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{1,}$/,
    {
      message:
        '密码至少包含字母、数字、特殊字符，并且不能连续出现3个大小连续或相同的数字(如：456、654、888)',
    },
  )
  password: string;
}
