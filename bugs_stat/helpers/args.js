import chalk from "chalk";
import dedent from "dedent";
const getArgs = () => {
  const commandLineArgs = process.argv.slice(2);
  if (commandLineArgs.length === 0) {
    return console.log(dedent`${chalk.bgCyan.red("команда помощь - help")}`);
  } else if (commandLineArgs[0] === "help") {
    return console.log(
      dedent`${chalk.bgCyan.red("для того что бы запрос получился валидным")}
              формат даты такой год-месяц-день
              формат строки [дата отсчета] [конечная дата]
              ${chalk.red("ПРИМЕР")}
              first date format- 2023-10-01 
              last date format - 2023-10-31`,
    );
  } else {
    let env = commandLineArgs[0];
    let firstDate = commandLineArgs[1];
    let lastDate = commandLineArgs[2];
    return [env, firstDate, lastDate];
  }
};

export { getArgs };
