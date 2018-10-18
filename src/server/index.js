import express from 'express';
import store from './store';

const port = process.env.PORT || 8080
const app = express();

app.get('/', (req, res) => {
  console.log(store);
  res.send('hello world');
});

app.listen(port, () => console.log(`listening on port ${port}`));