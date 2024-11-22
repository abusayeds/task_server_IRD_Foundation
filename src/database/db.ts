import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function connectToDatabase() {
  const db = await open({
    filename: path.resolve(__dirname, "../../data/dua_main.sqlite"),
    driver: sqlite3.Database,
  });

  console.log("Connected to the SQLite database.");
  return db;
}
