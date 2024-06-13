// utils/dynamoDB.js

import AWS from 'aws-sdk';

// Explicitly set AWS credentials for local development
AWS.config.update({
  accessKeyId: 'dummyAccessKeyId',
  secretAccessKey: 'dummySecretAccessKey',
  region: 'us-west-2', // Your AWS region
  endpoint: 'http://localhost:8000', // Endpoint for local DynamoDB
});

console.log('AWS SDK Configuration:', AWS.config);
console.log('AWS Credentials:', AWS.config.credentials);

const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Calculations';

// Function to store data in DynamoDB
export const storeData = async (data) => {
    console.log(data,"from aws");
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: data.name,
      name: data.name,
      fpValues: data.fpValues,
      accountValue: data.accountValue,
      fundExpenses: data.fundExpenses,
      fpPayout: data.fpPayout,
      houseHoldValue: data.houseHoldValue,
      feeType: data.feeType,
      programFee: data.programFee,
      programFeeValues: data.programFeeValues,
      strategistFeeValues: data.strategistFeeValues,
      totalAccountFeeValues: data.totalAccountFeeValues,
      totalClientFeeValues: data.totalClientFeeValues,
      grossAnnualFeeValues: data.grossAnnualFeeValues,
      netAnnualFeeValues: data.netAnnualFeeValues,
    },
  };

  try {
    await docClient.put(params).promise();
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Function to retrieve data from DynamoDB
export const retrieveData = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    console.log('Data retrieved successfully:', data.Item);
    return data.Item;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};
