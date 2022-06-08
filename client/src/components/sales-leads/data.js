const newRow = (i) => ({
  leadName: `Lead Name${i ? ` ${i}` : ""}`,
  salesRep: `Sales Rep Name${i ? ` ${i}` : ""}`,
  clients: `Client Name${i ? ` ${i}` : ""}`,
  amount: Math.floor(Math.random() * 100000),
  date: new Date(
    +new Date() - Math.floor(Math.random() * 10000000000)
  ).toISOString(),
});

export const getSalesLeadsData = (totalRows) => {
  const arr = Array.apply(null, Array(totalRows));
  const results = arr.map((rowObj, i) => {
    const row = newRow(i);
    return row;
  });
  return results;
};
