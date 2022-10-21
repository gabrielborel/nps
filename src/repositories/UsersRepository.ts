import { dataSource } from "../database";
import { User } from "../models/User";

export const UsersRepository = dataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return UsersRepository.findOne({
      where: {
        email,
      },
    });
  },
});
