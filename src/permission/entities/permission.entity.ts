/**
 * @description: This file contains the entity class for the permission table.
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SysModule } from '../../sysmodule/entities/sysmodule.entity';

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
  sysModule: SysModule;
}
