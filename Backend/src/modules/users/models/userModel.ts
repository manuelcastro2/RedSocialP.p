import multer from "multer";
import path from "path";

export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads/photos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
