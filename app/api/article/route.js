import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";

const filePath = path.join(process.cwd(), "app/article/_data/db.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("讀取 JSON 失敗:", error);
    return NextResponse.json({ message: "讀取失敗" }, { status: 500 });
  }
}

// **處理 POST 請求：寫入 db.json**
export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
    
    const { title, article, author } = data // 取得前端傳來的資料
    

    if (!title || !article || !author) {
      return NextResponse.json({ message: "標題、作者名稱和內容不可為空" }, { status: 400 });
    }

    // **讀取現有文章**
    const fileContent = await fs.readFile(filePath, "utf8");
    const articlesData = JSON.parse(fileContent);

    // **新增文章**
    const newArticle = {
      id: uuidv4(), // 產生唯一 ID
      title,
      author,
      article,
      createTime: new Date().toISOString(),
    };

    articlesData.articles.push(newArticle); // 加入文章

    // **寫入檔案**
    await fs.writeFile(filePath, JSON.stringify(articlesData, null, 2));

    return NextResponse.json(
      {
        message: "文章新增成功",
        article: newArticle,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("寫入 db.json 失敗:", error);
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}