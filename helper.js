export const CAMPAIGNS = 'subtract add';
export const isCampaign = campaign => CAMPAIGNS.includes(campaign);
export const getCampaignFromRequest = req => {
  const campaign = Object.keys(req.query)[0];
  if (campaign !== 'campaign') {
    return null;
  }
  const queryParam = req.query[campaign];
  const name = queryParam.split('(')[0];
  if (!isCampaign(name)) {
    return null;
  }
  const params = queryParam
    .substr(queryParam.indexOf('(') + 1, queryParam.indexOf(')') - 4)
    .split(',')
    .map(Number);
  return { name, params };
};
