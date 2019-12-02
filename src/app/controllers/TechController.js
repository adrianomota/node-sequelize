import User from '../models/User';
import Tech from '../models/Tech';

class TechController {
  async index(req, res) {
    const { user_id } = req.params;

    const users = await User.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    });

    return res.json(users);
  }

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) return res.status(400).json({ error: 'user not exist' });

    const [tech] = await Tech.findOrCreate({
      where: { name },
    });

    await user.addTech(tech);

    return res.json(tech);
  }

  async destroy(req, res) {
    const { user_id } = req.params;

    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) return res.status(400).json({ error: 'user not exist' });

    const tech = await Tech.findOne({
      where: { name },
    });

    await user.removeTech(tech);

    return res.json();
  }
}

export default new TechController();
