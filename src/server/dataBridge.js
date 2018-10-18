import sqlite from 'sqlite';

class DataBridge {
  constructor() {
    this._db = null;
  }
  async connect() {
    this._db = await sqlite.open('table.sqlite');
    return this;
  }
  async items() {
    return await this._db.all('SELECT * from ITEM');
  }
  async item(no) {
    return await this._db.get(`SELECT * from ITEM where no = ${no}`);
  }
  async close() {
    if(this._db) {
      await this._db.close();
      this._db = null;
    }
  }  
}

export default new DataBridge();