import { isSpecifiedBy } from './spec';
const express = require('express');
const path = require('path');
const app = express();
const port = 9001;

const CAMPAIGNS = 'subtract add';
const isCampaign = campaign => CAMPAIGNS.includes(campaign);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', async function(req, res) {
  const campaign = Object.keys(req.query)[0];
  if (!isCampaign(campaign)) {
    return res.send('Campaign invalid.');
  }
  const params = req.query[campaign].split(',').map(Number);

  const isSatisfied = await isSpecifiedBy(campaign);
  const result = isSatisfied(...params);

  res.send(
    Date().toString() +
      ': Campaign: ' +
      Object.keys(req.query)[0] +
      ' ' +
      req.query[campaign] +
      ' ==> ' +
      result
  );
});

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`bePay app is listening on ${port}! http://localhost:${port}`);
});
