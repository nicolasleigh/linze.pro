import { openDB } from "idb"

const DB_NAME = "blog-post"
const STORE_NAME = "blog-content"

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    },
  })
}

export async function idbAddItem(id: string, item: string) {
  const db = await initDB()
  await db.put(STORE_NAME, item, id)
}

export async function idbGetItem(id: string) {
  const db = await initDB()
  return db.get(STORE_NAME, id)
}

export async function idbGetAllItems() {
  const db = await initDB()
  return db.getAll(STORE_NAME)
}

export async function idbDeleteItem(id: string) {
  const db = await initDB()
  return db.delete(STORE_NAME, id)
}
