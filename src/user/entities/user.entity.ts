import { hashSync } from 'bcrypt';
// import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
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
  @Column({
    select: false, // 不返回给客户端
  })
  // @Exclude() // 不返回给客户端
  password: string;
  @CreateDateColumn()
  readonly createDate: Date;
  @UpdateDateColumn()
  readonly updateDate: Date;
  @BeforeInsert()
  async hashSync() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
