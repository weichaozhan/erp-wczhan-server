/**
 * @description: system module entity
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class SysModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nameToShow: string;

  @Column({ nullable: true })
  parentID: number;

  @Column({ length: 10, nullable: true })
  type: string;

  @Column({
    length: 50,
    nullable: true,
  })
  icon: string;

  @Column({
    length: 50,
    nullable: true,
  })
  path: string;

  @Column({
    length: 50,
  })
  createBy: string;

  @Column()
  isMenu: boolean;

  @Column()
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @OneToMany(() => Permission, (permission) => permission.sysModule)
  permissions: Permission[];

  constructor(init: Partial<SysModule>) {
    Object.assign(this, init);
  }
}
