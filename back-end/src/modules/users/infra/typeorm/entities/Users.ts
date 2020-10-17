import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

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
