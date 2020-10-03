const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../src/datalog/', 'infolog.json');
const AutoWrite =  async (datalog) => {
  let tempData = {
    data: datalog,
  };
  
  let parseData = await JSON.stringify(tempData, null , 1);
  // fs.writeFileSync('loginfo.json', parseData);
  fs.writeFile(dirPath, parseData, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}


const Open = () => {

  exec('ls -la', (error, stdout, stderr) => {
    if (error) {

      AutoWrite(error.message);
      // console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      AutoWrite(stderr);
      // console.log(`stderr: ${stderr}`);
      return;
    }
    AutoWrite(stdout);
    
  });
}
module.exports = Open;
