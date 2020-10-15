import { execute_db_offline } from './db_offline';
import {has_new_version} from '../utils/version_control';

export default async function create_tables_if_not_exists(){
    execute_db_offline("CREATE TABLE IF NOT EXISTS database_versions (name text, version text, description text);");
    const new_version = await has_new_version('db_offline')
    if(new_version){           

        //CHAMAR FUNÇÃO PARA SINCRONIZAR

        await execute_db_offline("DROP TABLE users;");
        await execute_db_offline("DROP TABLE classifications;");
        await execute_db_offline("DROP TABLE areas;");
        await execute_db_offline("DROP TABLE type_areas;");
 
        await execute_db_offline("CREATE TABLE users (id text not null, name text, password text, email text);");
        await execute_db_offline("CREATE TABLE classifications (id text not null, name text, password text, type_action text);");
        await execute_db_offline("CREATE TABLE areas (id text not null, name text, description text, location text, user_id text, type_area_id text, type_area_name text, type_action text);");
        await execute_db_offline("CREATE TABLE type_areas (id text not null, name text, description text);");
    
        execute_db_offline("UPDATE database_versions SET version = ? WHERE name = ?", [new_version, 'db_offline']);
    }
}