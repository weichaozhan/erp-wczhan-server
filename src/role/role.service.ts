import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
  ) {
    this.createAdmin();
  }

  private async createAdmin() {
    this.role
      .findBy?.({
        id: 1,
      })
      .then((res) => {
        console.log('Role res', res);

        if (res.length) {
          return;
        }

        const admin = new Role();

        admin.name = 'admin';
        admin.description = '超级管理员';
        admin.nameToShow = '超级管理员';

        this.role.save(admin);
      })
      .catch((err) => {
        console.log('SysModule err', err);
      });
  }
}
