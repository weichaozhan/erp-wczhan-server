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
  KEY_REL_GROUP,
  KEY_REL_USER,
  REL__GROUP_USER,
} from '../../global/constants/entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, update: false })
  name: string;

  @Column()
  nameToShow: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  readonly createTime: Date;

  @UpdateDateColumn()
  readonly updateTime: Date;

  @Column({ nullable: true })
  createBy: string;

  @Column({ nullable: true, update: false })
  creatorId: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: REL__GROUP_USER,
    joinColumn: {
      name: KEY_REL_GROUP,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: KEY_REL_USER,
      referencedColumnName: 'id',
    },
  })
  users: User[];

  constructor(init?: Partial<Group>) {
    Object.assign(this, init ?? {});
  }
}
