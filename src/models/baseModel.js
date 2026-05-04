import db from '../config/db.js';

export default class BaseModel {
  constructor() {
    if (new.target === BaseModel) {
      throw new Error('BaseModel is an abstract class and cannot be instantiated directly');
    }
  }

  static get tableName() {
    throw new Error('Child model must define tableName');
  }

  static get selectableFields() {
    throw new Error('Child model must define selectableFields');
  }

  static get editableFields() {
    throw new Error('Child model must define editableFields');
  }

  static async getAll() {
    const [rows] = await db.query(
      `SELECT ${this.selectableFields.join(', ')} FROM ${this.tableName}`
    );

    return rows;
  }

  static async update(id, data) {
    const updates = [];
    const values = [];

    for (const [requestField, columnName] of Object.entries(this.editableFields)) {
      if (data[requestField] !== undefined) {
        updates.push(`${columnName} = ?`);
        values.push(data[requestField]);
      }
    }

    if (updates.length === 0) {
      throw new Error('no fields to update');
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result;
  }

  static async delete(id) {
    const [result] = await db.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    return result;
  }
}
