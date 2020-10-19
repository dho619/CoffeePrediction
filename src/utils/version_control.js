import Api from '../services/api';
import { execute_db_offline } from '../db/db_offline';

export async function has_new_version(versionName) {
    try {
        const response01 = await execute_db_offline('SELECT * FROM database_versions WHERE name = ?', [versionName]);
        let currentVersion = '0.0.0';
        if (response01 !== undefined && response01.length && response01[0].version) {
            currentVersion = response01[0].version;
        } else {
            execute_db_offline("DELETE FROM database_versions WHERE name = ?", [versionName]);
            execute_db_offline("INSERT INTO database_versions (name, version, description) VALUES (?, ?, ?);", [versionName, '0.0.0', 'Versão desse banco']);
        }

        const response02 = await Api.get(`/version/${versionName}`);
        const dbVersion = response02.data.data.version;

        if (dbVersion === currentVersion) return false;

        const subDbVersion = dbVersion.split('.');
        const subVersion = currentVersion.split('.');

        if (subVersion[0] < subDbVersion[0]) {
            return dbVersion;
        }
        if ((subVersion[0] === subDbVersion[0]) && (subVersion[1] < subDbVersion[1])) {
            return dbVersion;
        }
        if ((subVersion[0] === subDbVersion[0]) && (subVersion[1] === subDbVersion[1]) && (subVersion[3] < subDbVersion[3])) {
            return dbVersion;
        }
        return false;
    } catch (err) {
        console.log(err)
    }
}