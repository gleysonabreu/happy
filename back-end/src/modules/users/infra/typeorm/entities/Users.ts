import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import jwt from 'jsonwebtoken';

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
    cascade: ['insert', 'update'],
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

  createSession = async (): Promise<string> => {
    const token = jwt.sign(
      {
        email: this.email,
        id: this.id,
        name: this.name,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 86400,
      },
    );

    return token;
  };
}

export default Users;
