import * as SQLite from 'expo-sqlite';

export const db_offline = SQLite.openDatabase("db_temp.db");

export const execute_db_offline = async (sql, params = []) => {
    return new Promise((resolve, reject) => db_offline.transaction(tx => {
      tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
    }))
}