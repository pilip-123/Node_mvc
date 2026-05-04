import db from '../config/db.js';
import BaseModel from './baseModel.js';

export default class UserModel extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get selectableFields() {
    return ['id', 'name', 'age', 'gender', 'phone AS numberphone'];
  }

  static get editableFields() {
    return {
      name: 'name',
      age: 'age',
      gender: 'gender',
      phone: 'phone'
    };
  }

  // CREATE
  static async create({ name, age, gender, phone }) {
    const [result] = await db.query(
      'INSERT INTO users (name, age, gender, phone) VALUES (?, ?, ?, ?)',
      [name, age, gender, phone]
    );

    return { id: result.insertId, name, age, gender, numberphone: phone };
  }
}
