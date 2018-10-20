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
    star,
    image,
    referenceUrl
  }) {
    return await this._db.run(`INSERT INTO MOVIE 
      (title, content, star, image, reference_url, reg_date) VALUES(
      '${title}', '${content}', '${star}', '${image}', '${referenceUrl}', CURRENT_TIMESTAMP
      )`);
  }
  async deleteItem(no) {
    return await this._db.get(`DELETE from MOVIE where no = ${no}`);
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
      return await this._db.get(`UPDATE MOVIE SET ${columns} where no = ${no}`);
    } else {
      return;
    }
  }
  async items() {
    return await this._db.all('SELECT * from MOVIE');
  }
  async item(no) {
    return await this._db.get(`SELECT * from MOVIE where no = ${no}`);
  }
  async close() {
    if (this._db) {
      await this._db.close();
      this._db = null;
    }
  }
}

export default new DatabaseBridge();