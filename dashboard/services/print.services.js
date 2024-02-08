const printBugs = (res) => {
  return res.Items.map(
    (item, i) =>
      `*${i + 1}:* ${item.Id} - ${item.EntityState.Name} - ${
        item.Severity.Name
      }`
  ).join("\n");
};

const printRegressBugs = (res) => {
  return res.Items.map(
    (item, i) =>
      `*${i + 1}:* ${item.Id} - ${item.EntityState.Name} - ${
        item.Severity.Name
      }`
  ).join("\n");
};
export { printBugs, printRegressBugs };
