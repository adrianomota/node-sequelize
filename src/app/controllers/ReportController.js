import { Op } from 'sequelize';
import User from '../models/User';

class ReportController {
  async index(req, res) {
    const users = await User.findOne({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@gmail.com',
        },
      },
      include: [
        {
          association: 'addresses',
          where: { street: { [Op.iLike]: 'street%' } },
        },
        {
          association: 'techs',
          required: false,
          where: { name: { [Op.iLike]: 'Elixir%' } },
        },
      ],
    });

    return res.json(users);
  }
}

export default new ReportController();
