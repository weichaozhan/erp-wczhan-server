import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import {
  KEY_REL_ROLE,
  KEY_REL_USER,
  REL_USER_ROLE,
} from '../../global/constants/entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  userId: string;

  @Column({ unique: true })
  username: string;

  @Exclude() // 不返回给客户端
  @Column({
    select: false, // 查询时不从数据库读取该字段
  })
  password: string;

  @Column({ default: false })
  frozen: boolean;

  @CreateDateColumn()
  readonly createDate: Date;

  @UpdateDateColumn()
  readonly updateDate: Date;

  @Column({ nullable: true })
  createBy: string;

  @Column({ nullable: true, update: false })
  creatorId: number;

  @BeforeInsert()
  async hashSync() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  @ManyToMany(() => Role)
  @JoinTable({
    name: REL_USER_ROLE,
    joinColumn: {
      name: KEY_REL_USER,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: KEY_REL_ROLE,
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
