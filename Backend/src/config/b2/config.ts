import B2 from 'backblaze-b2';
import dotenv from 'dotenv';

dotenv.config();

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_KEY!
});

(async () => {
  await b2.authorize();
})();

export default b2;
