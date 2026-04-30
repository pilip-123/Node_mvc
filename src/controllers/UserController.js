import UserModel from '../models/UserModel.js';
import { Basecontrollers } from './baseController.js';

export class UserController  extends Basecontrollers{

  // LIST
  async getUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      this.success(res, 'get users successful', users);
    } catch (err) {
      this.error(res, err.message, 500);
    }
  }

  // CREATE
  async createUser(req, res) {
    try {
      const { name, age, gender, numberphone, phone } = req.body;

      const phoneValue = numberphone ?? phone;

      const user = await UserModel.create({
        name,
        age,
        gender,
        phone: phoneValue
      });
      this.success(res, 'user created successful', user, 201);
    } catch (err) {
      this.error(res, err.message, 500);
    }
  }

  // UPDATE
  async updateUser(req, res) {
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
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'user updated successful');
    } catch (err) {
      if (err.message === 'no fields to update') {
        return this.error(res, err.message, 400);
      }
      return this.error(res, err.message, 500);
    }
  }

  // DELETE
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await UserModel.delete(id);

      if (result.affectedRows === 0) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'user deleted successful');
    } catch (err) {
      this.error(res, err.message, 500);
    }
  }
}
