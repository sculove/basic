import express from 'express';
import sqliteBridge from './dataBridge';

const port = process.env.PORT || 3000;
const app = express();

// 아이템 등록
app.post('/api/items', async (req, res) => {
  const item = await bridge.item(req.params.no);
  res.json(item);  
});
// 아이템 삭제
app.delete('/api/items/:no', async (req, res) => {
  const item = await bridge.item(req.params.no);
  res.json(item);  
});
// 아이템 수정
app.put('/api/items/:no', async (req, res) => {
  const item = await bridge.item(req.params.no);
  res.json(item);  
});
// 아이템 조회 (단건)
app.get('/api/items/:no', async (req, res) => {
  const item = await bridge.item(req.params.no);
  res.json( item);  
});
// 아이템 조회 (다건)
app.get('/api/items', async (req, res) => {
  const items = await bridge.items();
  res.json( items);  
});


let bridge;
async function main() {
  bridge = await sqliteBridge.connect();  
  app.listen(port, () => console.log(`listening on port ${port}`));
}
main();

