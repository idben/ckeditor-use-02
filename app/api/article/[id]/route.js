import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
  const { id } = params; // 取得網址參數 `id`

  try {
    const filePath = path.join(process.cwd(), "app/article/_data/db.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    // **查找對應的文章**
    const article = data.articles.find((item) => item.id === id);

    if (!article) {
      return NextResponse.json({ message: "文章不存在" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("讀取 db.json 失敗:", error);
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}