// const path = require('path');
// const fs = require('fs');
const { conn, query } = require('./mysql');
const mysqlRealEscapeString = require('./mysqlRealEscapeString');
// const file = fs.readFileSync(path.resolve(__dirname, './catalog_20200607.json'));
// const params = JSON.parse(file);

const getApplicationStage = async () => {


  const getSqlGAS = `SELECT * FROM global_application_stage WHERE stageName = 'videoInterview'`;
  const rowsGAS = await query(getSqlGAS);

  for (let row in rowsGAS) {
    let title = (rowsGAS[row].displayStageName !== '' && rowsGAS[row].displayStageName !== null) ? `${rowsGAS[row].displayStageName}` : '';
    let description = (rowsGAS[row].stageInstruction !== '' && rowsGAS[row].stageInstruction !== null) ? `<p>${rowsGAS[row].stageInstruction}</p>` : '';

    let newJson = {
      title,
      description,
      maxFilesCount: 1,
      minFilesCount: 1,
      validFileTypes: ['MOV', 'MP4']
    }
    let sqlUpdate = `UPDATE global_application_stage SET stageInstruction='${mysqlRealEscapeString(JSON.stringify(newJson))}' WHERE id=${rowsGAS[row].id};`;
    console.log(sqlUpdate);
  }
    
 
   
  // console.log('MESSAGE', JSON.stringify(final));
}


getApplicationStage();

/*
 {
	"title": "asaSAsaasda",
	"description": "<p>asdsadasdasdas</p>",
	"maxFilesCount": "2",
	"validFileTypes": ["MOV", "MP4"]
}
 */