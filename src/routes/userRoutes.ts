import express, { Request, Response } from "express";
import { connectToDatabase } from "../database/db";

const router = express.Router();

router.get("/mainCategory", async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();

    const categories = await db.all("SELECT * FROM category");

    const response = {
      categories,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
router.get("/categorise", async (req: Request, res: Response) => {
  const { cat_id } = req.query;
  try {
    const db = await connectToDatabase();

    const subCategories = await db.all(
      "SELECT * FROM sub_category WHERE cat_id = ?",
      [cat_id]
    );

    const response = {
      subCategories,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
router.get("/sub_categorise", async (req: Request, res: Response) => {
  const { subcat_id } = req.query;
  try {
    const db = await connectToDatabase();

    const subCategories = await db.all(
      "SELECT * FROM dua WHERE subcat_id = ?",
      [subcat_id]
    );

    const response = {
      subCategories,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/dua", async (req: Request, res: Response) => {
  const { cat_id, subcat_id, dua_id, dua_name_en } = req.query;

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (cat_id) {
    conditions.push("cat_id = ?");
    params.push(cat_id as string);
  }

  if (subcat_id) {
    conditions.push("subcat_id = ?");
    params.push(subcat_id as string);
  }

  if (dua_id) {
    conditions.push("dua_id = ?");
    params.push(dua_id as string);
  }

  if (dua_name_en) {
    conditions.push("dua_name_en LIKE ?");
    params.push(`%${dua_name_en}%`);
  }

  const whereClause = conditions.length
    ? "WHERE " + conditions.join(" AND ")
    : "";

  try {
    const db = await connectToDatabase();

    const subCategories = await db.all(
      `SELECT * FROM dua ${whereClause}`,
      params
    );

    const response = {
      subCategories,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
