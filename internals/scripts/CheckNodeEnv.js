// import { chalk } from 'chalk';
const chalk = require('chalk')

function CheckNodeEnv(expectedEnv) {
  console.log(
    chalk.yellowBright.bold(`using webpack config mode : ${expectedEnv}  `)
  );
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      chalk.whiteBright.bgRed.bold(
        `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`
      )
    );
    
    process.exit(2);
  }
}
module.exports =  CheckNodeEnv;