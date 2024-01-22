import { getBugsStatisticFromStaging } from "./services/api.services.js";
import { saveBugsData } from "./services/storage.services.js";
import { getKeyVal } from "./services/statistic_calc.services.js";
import { getArgs } from "./helpers/args.js";

const saveProdBugs = async (env, firstDay, lastDay) => {
  await getBugsStatisticFromStaging(env, firstDay, lastDay).then((res) => {
    saveBugsData(res);
  });
};

const calStat = async (env) => {
  await getKeyVal(env);
};

const initCli = async () => {
  const args = getArgs();
  await saveProdBugs(args[0], args[1], args[2]);
  await calStat(args[0]);
};

await initCli();
