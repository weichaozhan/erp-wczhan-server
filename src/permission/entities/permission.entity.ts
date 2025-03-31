/**
 * @description: This file contains the entity class for the permission table.
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SysModule } from '../../sysmodule/entities/sysmodule.entity';
import { KEY_REL_SYSM } from '../../global/constants/entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nameDesc: string;

  @Column({ nullable: true })
  parentID: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => SysModule, (sysModule) => sysModule.permissions)
  @JoinColumn({ name: KEY_REL_SYSM })
  sysModule: SysModule;
}
