import { NextResponse } from "next/server";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

// 設定上傳目錄
const uploadDir = "public/images/article";

// 設定 Multer 存儲方式
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      await fs.mkdir(uploadDir, { recursive: true }); // 確保目錄存在
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const filename = uuidv4() + fileExt;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// **Next.js App Router 需要手動處理 FormData**
export async function POST(req) {
  try {
    // **手動解析 FormData**
    const formData = await req.formData();
    const file = formData.get("articleImage");

    if (!file) {
      return NextResponse.json({ message: "檔案未上傳成功" }, { status: 400 });
    }

    // **存儲檔案**
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = path.extname(file.name);
    const filename = uuidv4() + fileExt;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json(
      {
        message: "檔案上傳成功",
        url: `/images/article/${filename}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("上傳錯誤:", error);
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}

// **關閉 Next.js 內建 bodyParser**
export const config = {
  api: {
    bodyParser: false,
  },
};