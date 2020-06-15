const AWS = require('aws-sdk');
const uuid = require('uuid');

// const dynamoOpts = {region: process.env.DYNAMODB_AWS_REGION};
// const docClient = new AWS.DynamoDB.DocumentClient(dynamoOpts);

const countryCodeId = {
  '1':'es',
  '11':'in',
  '21':'ke',
  '31':'mx',
  '41':'us',
  '51':'hk',
  '61':'fr',
  '71':'sg',
  '81':'it',
  '91':'pk',
  '101':'br',
  '111':'gb',
  '121':'au'
};

const countryCodeName = {
  'es':'Spain',
  'in':'India',
  'ke':'Kenya',
  'mx':'Mexico',
  'us':'United State',
  'hk':'Hong Kong',
  'fr':'France',
  'sg':'Singapur',
  'it':'Italy',
  'pk':'Pakistan',
  'br':'Brazil',
  'gb':'United Kingdom',
  'au':'Australia'
};

const countryCode = {
  'es':'1',
  'in':'11',
  'ke':'21',
  'mx':'31',
  'us':'41',
  'hk':'51',
  'fr':'61',
  'sg':'71',
  'it':'81',
  'pk':'91',
  'br':'101',
  'gb':'111',
  'au':'121'
};

const doDynamoDBParams = (params) => {
  const {country, locationId, programId} = params;
  const rpParams = {
    createdAt: `${new Date(new Date().toUTCString())}`,
    createdBy: {
      attributes: {
        email: 'rogelio@generation.org',
        middle_name: 'Vargas',
        name: 'Rogelio',
        organization: '31',
        picture: 'https://pm1.narvii.com/7232/5b7b4860193606793c45c18861935518f31b143fr1-863-720v2_128.jpg',
        position: 'Developer'
      },
      username: '117a0949-8c6d-4e36-8cc4-822e467c8176'
    },
    id: uuid.v4(),
    locationId: `${locationId}`,
    organizationId: `${countryCode[country]}`,
    programId: `${programId}`,
    sections: null,
    status: 'draft',
    title: `M - ${countryCodeName[country]}-${programId}-${locationId}`,
    updatedAt: `${new Date(new Date().toUTCString())}`,
    updatedBy: {
      attributes: {
        email: 'rogelio@generation.org',
        middle_name: 'Vargas',
        name: 'Rogelio',
        organization: '31',
        picture: 'https://pm1.narvii.com/7232/5b7b4860193606793c45c18861935518f31b143fr1-863-720v2_128.jpg',
        position: 'Developer'
      },
      username: '117a0949-8c6d-4e36-8cc4-822e467c8176'
    }
  }

  return rpParams;
};

module.exports = {
  doDynamoDBParams
};
