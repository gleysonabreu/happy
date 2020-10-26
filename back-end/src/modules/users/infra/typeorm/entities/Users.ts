import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Orphanage, orphanage => orphanage.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'user_id' })
  orphanages: Orphanage[];

  encryptPassword = async () => {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.SALT_ROUNDS),
    );
  };

  checkPasswordIsValid = async (password: string) => {
    const isValid = await bcrypt.compare(password, this.password);

    return isValid;
  };
}

export default Users;
