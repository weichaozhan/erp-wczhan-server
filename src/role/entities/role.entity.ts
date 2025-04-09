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
  KEY_REL_PERMISSION,
  KEY_REL_ROLE,
  KEY_REL_SYSM,
  REL_ROLE_PERMISSION,
  REL_ROLE_SYSM,
} from '../../global/constants/entity';
import { SysModule } from '../../sysmodule/entities/sysmodule.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, update: false })
  name: string;

  @Column()
  nameToShow: string;

  @Column()
  description: string;

  @CreateDateColumn()
  readonly createTime: Date;

  @UpdateDateColumn()
  readonly updateTime: Date;

  @Column({ nullable: true })
  createBy: string;

  @Column({ nullable: true, update: false })
  creatorId: number;

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

  @ManyToMany(() => Permission)
  @JoinTable({
    name: REL_ROLE_PERMISSION,
    joinColumn: {
      name: KEY_REL_ROLE,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: KEY_REL_PERMISSION,
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
