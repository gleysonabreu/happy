import Users from '../../typeorm/entities/Users';

export default {
  render(user: Users) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      orphanages: user.orphanages,
    };
  },

  renderMany(users: Users[]): Users[] {
    return users.map(user => this.render(user));
  },
};
