import { execute_db_offline } from './db_offline';
import { has_new_version } from '../utils/version_control';

export default async function create_tables_if_not_exists() {
    await execute_db_offline("CREATE TABLE IF NOT EXISTS database_versions (name text, version text, description text);");
    const new_version = await has_new_version('db_offline')
    if (new_version) {

        //CHAMAR FUNÇÃO PARA SINCRONIZAR

        try {
            await execute_db_offline("DROP TABLE users;");
        } catch (err) { }
        try {
            await execute_db_offline("DROP TABLE classifications;");
        } catch{ }
        try {
            await execute_db_offline("DROP TABLE areas;");
        } catch{ }
        try {
            await execute_db_offline("DROP TABLE type_areas;");
        } catch{ }

        try {
            await execute_db_offline("CREATE TABLE users (replication_sequence INTEGER PRIMARY KEY, id text not null, name text, email text);");
            await execute_db_offline("CREATE TABLE classifications (replication_sequence  INTEGER PRIMARY KEY, id text not null, name text, description text, image text, area_id text, user_id text, type_action text);");
            await execute_db_offline("CREATE TABLE areas (replication_sequence  INTEGER PRIMARY KEY, id text not null, name text, description text, location text, user_id text, type_area_id text, type_area_name text, type_action text);");
            await execute_db_offline("CREATE TABLE type_areas (replication_sequence  INTEGER PRIMARY KEY, id text not null, name text, description text);");

            execute_db_offline("UPDATE database_versions SET version = ? WHERE name = ?", [new_version, 'db_offline']);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}