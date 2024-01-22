import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { firstLetterCapital } from "../helpers/upCase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../bugs_data/prod_bugs.json");

const getKeyVal = async (env) => {
  let items;
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath);
    const data = JSON.parse(file);
    items = data.Items;
    let server = firstLetterCapital(env);
    calcBlocking(server, items);
    calcFixAsap(server, items);
    calcFixSoon(server, items);
    calcBugsSum(server, items);
  }
  return undefined;
};
const calcBugsSum = (env, items) => {
  const filteredItems = items.filter((item) => {
    return (
      item.EntityState.Name === "In Prod" ||
      item.EntityState.Name === "Completed" ||
      item.EntityState.Name === "Prod Deploy"
    );
  });

  console.log(`[${env}] сумма всех [Created] багов = ${items.length}`);
  console.log(
    `[${env}] сумма всех [Completed] багов = ${filteredItems.length}`,
  );
};
const calcFixSoon = (env, items) => {
  const createdFixSoonBugs = items.filter((item) => {
    return item.Severity.Name === "Fix Soon";
  });
  const completedFixSoonBugs = createdFixSoonBugs.filter(
    (createdFixSoonBug) => {
      return (
        createdFixSoonBug.EntityState.Name === "In Prod" ||
        createdFixSoonBug.EntityState.Name === "Completed" ||
        createdFixSoonBug.EntityState.Name === "Prod Deploy"
      );
    },
  );

  console.log(
    `[${env}] сумма всех [Created][Fix Soon] багов = ${createdFixSoonBugs.length}`,
  );
  console.log(
    `[${env}] сумма всех [Completed][Fix Soon] багов = ${completedFixSoonBugs.length}`,
  );
};
const calcFixAsap = (env, items) => {
  const createdFixAsapBugs = items.filter((item) => {
    return item.Severity.Name === "Fix ASAP";
  });
  const completedFixAsapBugs = createdFixAsapBugs.filter(
    (createdFixAsapBug) => {
      return (
        createdFixAsapBug.EntityState.Name === "In Prod" ||
        createdFixAsapBug.EntityState.Name === "Completed" ||
        createdFixAsapBug.EntityState.Name === "Prod Deploy"
      );
    },
  );
  console.log(
    `[${env}] сумма всех [Created][Fix ASAP] багов = ${createdFixAsapBugs.length}`,
  );
  console.log(
    `[${env}] сумма всех [Completed][Fix ASAP] багов = ${completedFixAsapBugs.length}`,
  );
};
const calcBlocking = (env, items) => {
  const createdBlockingBugs = items.filter((item) => {
    return item.Severity.Name === "Blocking";
  });
  const completedBlockingBugs = createdBlockingBugs.filter(
    (createdBlockingBug) => {
      return (
        createdBlockingBug.EntityState.Name === "In Prod" ||
        createdBlockingBug.EntityState.Name === "Completed" ||
        createdBlockingBug.EntityState.Name === "Prod Deploy"
      );
    },
  );
  console.log(
    `[${env}] сумма всех [Created][Blocking] багов = ${createdBlockingBugs.length}`,
  );
  console.log(
    `[${env}] сумма всех [Completed][Blocking] багов = ${completedBlockingBugs.length}`,
  );
};

const isExist = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { getKeyVal, calcFixSoon };
