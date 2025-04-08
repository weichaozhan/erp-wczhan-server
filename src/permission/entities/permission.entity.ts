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

  @Column({ unique: true })
  name: string;

  @Column()
  nameDesc: string;

  @Column()
  parentID: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  createBy: string;

  @Column({ nullable: true })
  creatorId: number;

  @CreateDateColumn()
  readonly createTime: Date;

  @UpdateDateColumn()
  readonly updateTime: Date;

  @ManyToOne(() => SysModule, (sysModule) => sysModule.permissions)
  @JoinColumn({ name: KEY_REL_SYSM })
  sysModule: SysModule;

  constructor(init?: Partial<Permission>) {
    Object.assign(this, init ?? {});
  }
}
