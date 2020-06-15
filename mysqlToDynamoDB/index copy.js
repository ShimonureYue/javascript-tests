const path = require('path');
const fs = require('fs');
const { conn, query } = require('./mysql');
const { doDynamoDBParams } = require('./dynamoDB');

const file = fs.readFileSync(path.resolve(__dirname, './catalog_20200607.json'));
const params = JSON.parse(file);

const getApplicationStage = async () => {
  for (let i in params) {
    /*
    const sqlStage = `
      SELECT * FROM global_application_stage 
      WHERE
        country='${params[i].country}'
        AND programId=${params[i].programId}
        AND locationId=${params[i].locationId}
      ;
    `;
    console.log(sqlStage);
    */
    console.log(doDynamoDBParams(params[i]));
    
    
  }
  
  // const rowsStage = await query(sqlStage);
  // console.log(rowsStage);
}


getApplicationStage();