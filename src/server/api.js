import express from 'express';
import sqliteBridge from './dataBridge';

const port = process.env.PORT || 3000;
const app = express();
app.get('/api/items', async (req, res) => {
  const items = await bridge.items();
  res.send( items);  
});

let bridge;
async function main() {
  bridge = await sqliteBridge.connect();  
  app.listen(port, () => console.log(`listening on port ${port}`));
}
main();

