export default async function handler(req, res) {
  const { beginDate, endDate } = req.query;

  const url = `https://agridata.ec.europa.eu/extensions/DataPortal/api/fruitAndVegetable/pricesSupplyChain?memberStateCodes=ES&beginDate=${beginDate}&endDate=${endDate}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}