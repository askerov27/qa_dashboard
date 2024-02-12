const printBugs = (res) => {
  return res.Items.map(
    (item, i) =>
      `*${i + 1} - * ${item.Id} - ${item.EntityState.Name} - ${
        item.Severity.Name
      }`
  ).join("\n");
};

const printOpenBugs = (res) => {
  const filteredItems = res.Items.filter(
    (item) =>
      item.EntityState.Name !== "Prod Deploy" &&
      item.EntityState.Name !== "Testing Complete" &&
      item.EntityState.Name !== "Completed"
  );

  const severityOrder = {
    Blocking: 1,
    "Fix ASAP": 2,
    "Fix Soon": 3,
  };

  filteredItems.sort((a, b) => {
    const severityA = severityOrder[a.Severity.Name] || Number.MAX_SAFE_INTEGER;
    const severityB = severityOrder[b.Severity.Name] || Number.MAX_SAFE_INTEGER;
    if (severityA !== severityB) {
      return severityA - severityB;
    }
    return a.Id - b.Id;
  });

  return filteredItems
    .map(
      (item, i) =>
        `*${i + 1} - * ${item.Id} - ${item.EntityState.Name} - ${
          item.Severity.Name
        }`
    )
    .join("\n");
};

const printRegressBugs = (res) => {
  return res.Items.map(
    (item, i) =>
      `*${i + 1} - * ${item.Id} - ${item.EntityState.Name} - ${
        item.Severity.Name
      }`
  ).join("\n");
};

const printRegressOpenBugs = (res) => {
  const filteredItems = res.Items.filter(
    (item) =>
      item.EntityState.Name !== "Prod Deploy" &&
      item.EntityState.Name !== "Testing Complete" &&
      item.EntityState.Name !== "Completed"
  );

  const severityOrder = {
    Blocking: 1,
    "Fix ASAP": 2,
    "Fix Soon": 3,
  };

  filteredItems.sort((a, b) => {
    const severityA = severityOrder[a.Severity.Name] || Number.MAX_SAFE_INTEGER;
    const severityB = severityOrder[b.Severity.Name] || Number.MAX_SAFE_INTEGER;
    if (severityA !== severityB) {
      return severityA - severityB;
    }
    return a.Id - b.Id;
  });

  return filteredItems
    .map(
      (item, i) =>
        `*${i + 1} - * ${item.Id} - ${item.EntityState.Name} - ${
          item.Severity.Name
        }`
    )
    .join("\n");
};
export { printBugs, printOpenBugs, printRegressBugs, printRegressOpenBugs };
