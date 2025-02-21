import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: string;
  @Column()
  username: string;
  @Column()
  @Exclude()
  password: string;
  @CreateDateColumn()
  readonly createDate: Date;
  @UpdateDateColumn()
  readonly updateDate: Date;
}
