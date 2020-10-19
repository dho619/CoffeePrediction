import * as SQLite from 'expo-sqlite';

export const db_offline = SQLite.openDatabase("db_temp.db");

export const execute_db_offline = async (sql, params = []) => {
  return new Promise((resolve, reject) => db_offline.transaction(tx => {
    tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
  }))
}

export const get_guid = async () => {
  let StrAux = await S4()
  guid = (await S4() + await S4() + "-" + await S4() + "-4" + StrAux.substr(0, 3) + "-" + await S4() + "-" + await S4() + await S4() + await S4()).toLowerCase();
  return guid
}

async function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
