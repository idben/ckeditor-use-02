import { createRouter } from "next-connect";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { v4 as uuidv4 } from 'uuid';

const defaultData = { articles: []};
const db = new Low(new JSONFile('./data/db.json'), defaultData);
await db.read();

const router = createRouter();

router.post(async (req, res) => {
  const { title, author, article } = req.body;
  const createTime = new Date();
  const id = uuidv4();
  try {
    db.data.articles.push({id, title, author, article, createTime});
    await db.write();
    res.status(200).json({message: "寫入成功"});
  } catch (error) {
    console.error("處理過程中發生錯誤:", error);
    console.error("id:", id);
    res.status(500).json({ message: "伺服器錯誤", id });
  }
});

router.get(async (req, res) => {
  const { id } = req.query;
  try {
    if (!db.data) {
      db.data = { articles: [] };
    }

    const article = db.data.articles.find(article => article.id === id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "文章未找到" });
    }
  } catch (error) {
    console.error("處理過程中發生錯誤:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

export default router.handler({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).end(err.message);
    },
  });