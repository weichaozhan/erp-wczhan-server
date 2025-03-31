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

  @Column({ nullable: true })
  parentID: number;

  @Column({ length: 10 })
  type: string;

  @Column({
    length: 50,
    nullable: true,
  })
  icon: string;

  @Column({
    length: 50,
  })
  path: string;

  @Column({
    length: 50,
    nullable: true,
  })
  createBy: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @OneToMany(() => Permission, (permission) => permission.sysModule)
  permissions: Permission[];
}
