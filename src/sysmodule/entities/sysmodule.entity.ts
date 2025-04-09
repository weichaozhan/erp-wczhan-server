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

  @Column({ unique: true, update: false })
  name: string;

  @Column()
  nameToShow: string;

  @Column({ nullable: true, update: false })
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

  @Column({ nullable: true, update: false })
  creatorId: number;

  @Column()
  isMenu: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  readonly createTime: Date;

  @UpdateDateColumn()
  readonly updateTime: Date;

  @OneToMany(() => Permission, (permission) => permission.sysModule)
  permissions: Permission[];

  constructor(init?: Partial<SysModule>) {
    Object.assign(this, init ?? {});
  }
}
