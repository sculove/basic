import express from 'express';
import sqliteBridge from './databaseBridge';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // post json parser

// 아이템 등록
app.post('/api/items', async (req, res) => {
  const {
    title = "",
      content = "",
      star,
      image = null,
      reference_url = ""
  } = req.body;
  try {
    const statement = await bridge.insertItem({
      title,
      content,
      star,
      image,
      referenceUrl: reference_url
    });
    res.json({
      id: statement.lastId
    });
  } catch (e) {
    res.json({});
  }
});
// 아이템 삭제
app.delete('/api/items/:no', async (req, res) => {
  const {
    no
  } = req.params;
  const item = await bridge.deleteItem(no);
  res.json(item);
});
// 아이템 수정
app.put('/api/items/:no', async (req, res) => {
  const {
    no
  } = req.params;
  const {
    title,
    content,
    image
  } = req.body;
  const item = await bridge.updateItem(no, {
    title,
    content,
    image
  });
  res.json(item);
});
// 아이템 조회 (단건)
app.get('/api/items/:no', async (req, res) => {
  const {
    no
  } = req.params;
  const item = await bridge.item(no);
  res.json(item);
});
// 아이템 조회 (다건)
app.get('/api/items', async (req, res) => {
  const items = await bridge.items();
  res.json(items);
});

let bridge;
async function main() {
  bridge = await sqliteBridge.connect();
  app.listen(port, () => console.log(`listening on port ${port}`));
}
main();