/**
 * @description: system role entity
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
import {
  KEY_REL_ROLE,
  KEY_REL_SYSM,
  REL_ROLE_SYSM,
} from '../../global/constants/entity';
import { SysModule } from '../../sysmodule/entities/sysmodule.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => SysModule)
  @JoinTable({
    name: REL_ROLE_SYSM,
    joinColumn: {
      name: KEY_REL_ROLE,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: KEY_REL_SYSM,
      referencedColumnName: 'id',
    },
  })
  sysModules: SysModule[];
}
