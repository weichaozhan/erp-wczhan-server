import { FindOptionsWhere, Repository } from 'typeorm';

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
