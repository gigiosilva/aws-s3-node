require('dotenv').config();

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const fileName = 'contacts.csv';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'my-campaign',
         Key: 'contacts.csv',
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

const getFile = () => {
  const paramsBucket = {
    Bucket: 'my-campaign',
    // MaxKeys: 2
  };

  s3.listObjectsV2(paramsBucket, (err, data) => {
    console.log(data)
  });

  const params = {
    Bucket: 'my-campaign',
    Key: "Listadeclientes-2021-05-30.csv"
    // MaxKeys: 2
  };

  s3.getObject(params, (err, data) => {
    console.log(data);
    fs.writeFile(params.Key, data.Body, function (err) {
      if (err) return console.log(err);
    });
  });
}

// uploadFile();
// getFile();