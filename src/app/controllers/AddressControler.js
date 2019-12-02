import Address from '../models/Address';
import User from '../models/User';

class AddressControler {
  async index(req, res) {
    const { user_id } = req.params;

    const userExists = await User.findByPk(user_id, {
      include: [
        {
          model: Address,
          as: 'addresses',
          attributes: ['zipcode', 'street', 'number'],
        },
      ],
    });

    return res.json(userExists);
  }

  async store(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const userExists = await User.findByPk(user_id);

    if (!userExists) return res.status(400).json({ error: 'user not exist' });

    const newAddress = await Address.create({
      zipcode,
      street,
      number,
      user_id,
    });

    return res.json(newAddress);
  }
}

export default new AddressControler();
