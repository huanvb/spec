import { isSpecifiedBy } from './spec';
import { getCampaignFromRequest, CAMPAIGNS } from './helper';
const express = require('express');
const path = require('path');
const app = express();
const port = 9001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', async function(req, res) {
  const campaign = getCampaignFromRequest(req);
  if (!campaign) {
    return res.send(`Campaign invalid. Campaign is only ${CAMPAIGNS}`);
  }
  const isSatisfied = await isSpecifiedBy(campaign.name);
  const result = isSatisfied(...campaign.params);
  res.send(
    new Date().getTime() +
      ': Campaign: ' +
      campaign.name +
      ' ' +
      campaign.params +
      ' ==> ' +
      result
  );
});

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`The app is listening on ${port}! http://localhost:${port}`);
  console.log(`\nClick here http://localhost:${port}/?campaign=add(4,5,6)`);
  console.log(`Change file ./rules/add.js then refresh`);
});
