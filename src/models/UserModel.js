import db from '../config/db.js';

export default class UserModel {

  // GET ALL
  static async getAll() {
    const [rows] = await db.query(
      'SELECT id, name, age, gender, phone AS numberphone FROM users'
    );
    return rows;
  }

  // CREATE
  static async create({ name, age, gender, phone }) {
    const [result] = await db.query(
      'INSERT INTO users (name, age, gender, phone) VALUES (?, ?, ?, ?)',
      [name, age, gender, phone]
    );

    return { id: result.insertId, name, age, gender, numberphone: phone };
  }

  // UPDATE
  static async update(id, data) {
    const updates = [];
    const values = [];

    const { name, age, gender, phone } = data;

    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (age !== undefined) {
      updates.push('age = ?');
      values.push(age);
    }
    if (gender !== undefined) {
      updates.push('gender = ?');
      values.push(gender);
    }
    if (phone !== undefined) {
      updates.push('phone = ?');
      values.push(phone);
    }

    if (updates.length === 0) {
      throw new Error('no fields to update');
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result;
  }

  // DELETE
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    return result;
  }
}