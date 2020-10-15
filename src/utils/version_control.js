import Api from '../services/api';
import {execute_db_offline} from '../db/db_offline';

export async function has_new_version(versionName){
    try {
        const response01 = await execute_db_offline('SELECT * from database_versions WHERE name = ?', [versionName]);
        let currentVersion = '0.0.0';
        if (response01.version){
            currentVersion = response01.version;
        }else {
            execute_db_offline("INSERT INTO database_versions (name, version, description) VALUES (?, ?, ?);", ['db_offline','0.0.0','Versão desse banco']);
        }

        const response02 = await Api.get(`/version/${versionName}`);
        const dbVersion = response02.data.data.version;

        if(dbVersion === currentVersion) return false;

        const subDbVersion = dbVersion.split('.');
        const subVersion = currentVersion.split('.');

        if(subVersion[0] < subDbVersion[0]){
            return dbVersion;
        }
        if((subVersion[0] === subDbVersion[0]) && (subVersion[1] < subDbVersion[1])){
            return dbVersion;
        }
        if((subVersion[0] === subDbVersion[0]) && (subVersion[1] === subDbVersion[1])  && (subVersion[3] < subDbVersion[3])){
            return dbVersion;
        }
        return false;
    } catch(err) {
        console.log(err)
    }
}