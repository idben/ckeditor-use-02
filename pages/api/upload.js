import { createRouter } from "next-connect";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const router = createRouter();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/article')
  },
  filename: function(req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const filename = uuidv4() + fileExt;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// 使用 next-connect 是為了方便的處理 Next API 路由 Middleware，需要額外安裝
// 參考文件
// https://github.com/hoangvvo/next-connect?tab=readme-ov-file
router.use(upload.single('articleImage'))
  .post((req, res) => {
    // 文件上傳成功後的處理
    res.status(200).json({ message: "檔案上傳成功", data: req.file });
  });

export const config = {
  api: {
    bodyParser: false, // 關掉 body parsing, multer 會代為處理
  },
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
