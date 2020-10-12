import { db_offline } from './db_offline';

export default function create_tables_if_not_exists(){
    user_table()
    classification_table()
    area_table()
}

async function user_table(){
    db_offline.transaction(tx => {
        tx.executeSql(
          "create table if not exists users (id text primary key not null, name text, password text, email text);");
    });
}

function classification_table(){
    db_offline.transaction(tx => {
        tx.executeSql(
          "create table if not exists classifications (id text primary key not null, name text, password text, type_action text);"
        );
    });
}

function area_table(){
    db_offline.transaction(tx => {
        tx.executeSql(
          "create table if not exists areas (id text primary key not null, name text, description text, location text, user_id text, type_area_id text, new_register boolean);"
        );
    });
}