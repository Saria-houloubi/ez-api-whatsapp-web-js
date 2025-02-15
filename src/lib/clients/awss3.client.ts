import {
  getWhatsAppStoreAwsAccessKeyId,
  getWhatsAppStoreAwsBucketName,
  getWhatsAppStoreAwsBucketPath,
  getWhatsAppStoreAwsRegion,
  getWhatsAppStoreAwsSecretAccessKey,
} from "../providers/env-variable.provider";

const { AwsS3Store } = require("wwebjs-aws-s3");
const {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

export const getAwsStore = () => {
  var s3 = new S3Client({
    region: getWhatsAppStoreAwsRegion(),
    credentials: {
      accessKeyId: getWhatsAppStoreAwsAccessKeyId(),
      secretAccessKey: getWhatsAppStoreAwsSecretAccessKey(),
    },
  });
  var putObjectCommand = PutObjectCommand;
  var headObjectCommand = HeadObjectCommand;
  var getObjectCommand = GetObjectCommand;
  var deleteObjectCommand = DeleteObjectCommand;

  var store = new AwsS3Store({
    bucketName: getWhatsAppStoreAwsBucketName(),
    remoteDataPath: getWhatsAppStoreAwsBucketPath(),
    s3Client: s3,
    putObjectCommand,
    headObjectCommand,
    getObjectCommand,
    deleteObjectCommand,
  });

  return store;
};
