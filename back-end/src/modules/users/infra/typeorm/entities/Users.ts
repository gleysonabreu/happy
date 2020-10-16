import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Users;
