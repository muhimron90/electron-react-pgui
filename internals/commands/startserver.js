// import { spawn } from 'child_process';
// import util from 'util'
// import  Logger from '../scripts/Logger';

// const run = util.promisify(spawn);

// // const gitcmd = (cmd,par, callback) => {

// //   const start =spawn(cmd, par);
// //   let results = '';

// //   start.stdout.on('data', function (data) {
// //     results += data.toString();
// //   });
// //   start.on('close', function (code) {
// //     return callback(results);
// //   });
// // }

// //   gitcmd('git', ['status'], function (result) {
// //     Logger.info(result);
// //   });

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const Logger = require('../scripts/Logger');

async function gitcmd(sts) {
  let url = String.raw`"E:\POSTGRESQL\10\data"`;
  let status;
  if (sts === 'stop') {
    status = 'pg_ctl -D ' + url + ' ' + sts + ' -m fast';
  }
  if (sts === 'start' ) {
    status = 'pg_ctl -D ' + url + ' ' + '-w' + ' ' + sts;
  }
  if (sts === 'restart') {
    status = 'pg_ctl -D ' + url + ' ' + '-w' + ' ' + sts;
  }
   if (sts === 'status') {
     status = 'pg_ctl -D ' + url + ' '+ sts;
   }
  
 const { stdout, stderr } = await exec(status);
  let results = '';
  
  
  try {
    if (stderr) {
      Logger.info(stderr);
      return { error: stderr };
    } else {
      results += stdout.toString();
      Logger.info(results);
      return results;
    }
  } catch (err) {
    Logger.info(err);
    return err;
  }

}
// gitcmd('git', ['status']);



module.exports =  gitcmd;
