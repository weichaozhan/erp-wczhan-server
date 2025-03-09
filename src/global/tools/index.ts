import { FindOptionsWhere, Repository } from 'typeorm';
import { JWT_EXPIRES, JWT_SECRET, JWT_TEMP_EXPIRES } from '../constants';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function isFiledExit<T>(
  tableRepository: Repository<T>,
  filedName: string,
  val: any | any[],
) {
  const result = await tableRepository.findOneBy({
    [filedName]: val,
  } as FindOptionsWhere<T>);
  return !!result;
}

export const isEmail = (emailStr: string) =>
  /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/.test(emailStr);

type GetJWTOptions = (isTemp?: boolean) => JwtModuleOptions;
export const getJWTOptions: GetJWTOptions = (isTemp = false) => ({
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: isTemp ? JWT_TEMP_EXPIRES : JWT_EXPIRES,
  },
});

export const getCaptchaKey = (id: string) => `${id}_captcha_key`;
