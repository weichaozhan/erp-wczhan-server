import { FindOptionsWhere, Repository } from 'typeorm';

export async function isFiledExit<T>(
  tableRepository: Repository<T>,
  filedName: string,
  val: any | any[],
) {
  const result = await tableRepository.find({
    where: {
      [filedName]: val,
    } as FindOptionsWhere<T>,
  });
  return result.length > 0;
}
