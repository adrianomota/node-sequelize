import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async store(req, res) {
    const { name, email } = req.body;

    const newUser = await User.create({ name, email });

    return res.json(newUser);
  }
}

export default new UserController();
