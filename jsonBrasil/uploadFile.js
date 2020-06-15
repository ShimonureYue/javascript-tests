// const path = require('path');
// const fs = require('fs');
const { conn, query } = require('./mysql');
const mysqlRealEscapeString = require('./mysqlRealEscapeString');
// const file = fs.readFileSync(path.resolve(__dirname, './catalog_20200607.json'));
// const params = JSON.parse(file);

const getApplicationStage = async () => {

  const sqlAllIds = `
    SELECT distinct applicationStageId FROM global_application_stage_uploads
  ;`;

  const sqlASU = `
    SELECT * FROM global_application_stage_uploads
    ;
  `;

  const getSqlGAS = (id) => `SELECT * FROM global_application_stage WHERE id = ${id};`;
  const rowsASU = await query(sqlASU);
  const rowsAllIds = await query(sqlAllIds);

  // console.log(rowsASU);
  let final = [];
  for (let row in rowsAllIds) {
    let description = '';
    let descriptionIntro = '';
    let maxFilesCount = 1;
    let minFilesCount = 0;
    let id = 0;
    let rowStage = await query(getSqlGAS(rowsAllIds[row].applicationStageId));
    let title = ( rowStage[0].displayStageName !== '' && rowStage[0].displayStageName !== null) && rowStage[0].displayStageName;
    if ( rowStage[0].stageInstruction !== '' && rowStage[0].stageInstruction !== null ) {
      descriptionIntro = `<p>${rowStage[0].stageInstruction}</p>`;
    }
    for (let j in rowsASU) {
      if (rowsASU[j].applicationStageId == rowsAllIds[row].applicationStageId) {
        description = `${description}<li>${
            (rowsASU[j].filename !== '' && rowsASU[j].filename !== null ) ? `<b>${rowsASU[j].filename}</b> ` : ''
          }${
            (rowsASU[j].filename !== '' && rowsASU[j].filename !== null && (rowsASU[j].comment !== '' && rowsASU[j].comment !== null ) ? ': ' : '' )
          }${
            (rowsASU[j].comment !== '' && rowsASU[j].comment !== null ) ? `${rowsASU[j].comment}` : ''
          }</li>`;
        maxFilesCount = maxFilesCount + 1;
        if (rowsASU[j].isMandatory) {
          minFilesCount = minFilesCount + 1;
        }
        id = rowsASU[j].applicationStageId;
      }
      
    }

    // console.log(rowsAllIds[row].applicationStageId);
    
    description = `${descriptionIntro}<ul>${description}</ul>`;
    let newJson = {
      validFileTypes: ['PDF','TXT','MOV','JPG','PNG','DOC','MP4','MP3','PPT','WMV','JPEG','GIF','DOCX'],
      title,
      description,
      minFilesCount,
      maxFilesCount,
    }; 
    let sqlUpdate = `UPDATE global_application_stage SET stageInstruction='${mysqlRealEscapeString(JSON.stringify(newJson))}' WHERE id=${id};`;
 
    console.log(sqlUpdate);

        
  }
  // console.log('MESSAGE', JSON.stringify(final));
}


getApplicationStage();

    // console.log('MESSAGE', message);
    /*
    {
      "validFileTypes": [
          "PDF"
      ],
      "title": "Upload your certificate",
      "description": "",
      "minFilesCount": "2",
      "maxFilesCount": "5"
  }
  */