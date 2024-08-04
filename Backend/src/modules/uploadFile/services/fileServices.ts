import b2 from '../../../config/b2/config.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileToB2 = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${uuidv4()}-${file.originalname}`;

  const uploadUrlResponse = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID!
  });

  await b2.uploadFile({
    uploadUrl: uploadUrlResponse.data.uploadUrl,
    uploadAuthToken: uploadUrlResponse.data.authorizationToken,
    fileName,
    data: file.buffer,
    mimeType: file.mimetype
  });

  return `${process.env.B2_DOWNLOAD_URL}/file/${process.env.B2_BUCKET_ID}/${fileName}`;
};
