export default async function handler(req, res) {
  try {
    const { beginDate, endDate } = req.query;

    const url =
      `https://agridata.ec.europa.eu/extensions/DataPortal/api/fruitAndVegetable/pricesSupplyChain` +
      `?memberStateCodes=ES` +
      `&beginDate=${beginDate}` +
      `&endDate=${endDate}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
}