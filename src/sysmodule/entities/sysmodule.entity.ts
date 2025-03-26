/**
 * @description: system module entity
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import {
  KEY_REL_PER,
  KEY_REL_SYSM,
  REL_SYSM_PER,
} from '../../global/constants/entity';

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

  @ManyToMany(() => Permission)
  @JoinTable({
    name: REL_SYSM_PER,
    joinColumn: {
      name: KEY_REL_SYSM,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: KEY_REL_PER,
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
