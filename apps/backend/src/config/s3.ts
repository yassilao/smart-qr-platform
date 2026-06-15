import AWS from 'aws-sdk';

const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: process.env.S3_ENDPOINT || 'https://s3.amazonaws.com',
  region: process.env.S3_REGION || 'us-east-1',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
};

export const s3 = new AWS.S3(s3Config);
export const bucket = process.env.S3_BUCKET || 'smart-qr';

export const generateSignedUrl = (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: bucket,
        Key: key,
        Expires: expiresIn,
      },
      (err, url) => {
        if (err) reject(err);
        else resolve(url);
      }
    );
  });
};
