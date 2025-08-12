// src/indexeddb/memos.ts
import Dexie, { Table } from 'dexie'   // ← Table を個別import

export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor')
database.version(1).stores({ memos: '&datetime' })

const memos: Table<MemoRecord, string> = database.table('memos') // ← ここ

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}

export const getMemos = (): Promise<MemoRecord[]> => {
  return memos.orderBy('datetime').reverse().toArray()
}
