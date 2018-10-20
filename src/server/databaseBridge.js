import sqlite from 'sqlite';

// https://github.com/mapbox/node-sqlite3/wiki/API
// https://www.sqlite.org/lang.html
class DatabaseBridge {
  constructor() {
    this._db = null;
  }
  async connect() {
    this._db = await sqlite.open('db.sqlite');
    return this;
  }
  async insertItem({
    title,
    content,
    image
  }) {
    return await this._db.run(`INSERT INTO ITEM (title, content, image) VALUES (${title}, ${content}, ${image})`)
  }
  async deleteItem(no) {
    return await this._db.get(`DELETE from ITEM where no = ${no}`);
  }
  async updateItem(no, {
    title,
    content,
    image
  }) {
    const columns = '';

    if (title) {
      columns += `title = ${title}`;
    }
    if (content) {
      columns += `content = ${content}`;
    }
    if (image) {
      columns += `image = ${image}`;
    }

    if (columns) {
      return await this._db.get(`UPDATE ITEM SET ${columns} where no = ${no}`);  
    } else {
      return;
    }
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

export default new DatabaseBridge();