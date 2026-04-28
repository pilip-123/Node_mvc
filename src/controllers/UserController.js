import UserModel from '../models/UserModel.js';

export default class UserController {

  // LIST
  static async getUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      res.send(users);
    } catch (err) {
      res.status(500).send('database error');
    }
  }

  // CREATE
  static async createUser(req, res) {
    try {
      const { name, age, gender, numberphone, phone } = req.body;

      const phoneValue = numberphone ?? phone;

      const user = await UserModel.create({
        name,
        age,
        gender,
        phone: phoneValue
      });

      res.status(201).send(user);
    } catch (err) {
      res.status(500).send('database error');
    }
  }

  // UPDATE
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, age, gender, numberphone, phone } = req.body;

      const phoneValue = numberphone ?? phone;

      const result = await UserModel.update(id, {
        name,
        age,
        gender,
        phone: phoneValue
      });

      if (result.affectedRows === 0) {
        return res.status(404).send('user not found');
      }

      res.send('successful');
    } catch (err) {
      if (err.message === 'no fields to update') {
        return res.status(400).send(err.message);
      }
      res.status(500).send('database error');
    }
  }

  // DELETE
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await UserModel.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).send('user not found');
      }

      res.send('successful');
    } catch (err) {
      res.status(500).send('database error');
    }
  }
}