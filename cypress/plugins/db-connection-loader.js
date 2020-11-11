/**
 * Function that loads database connection based on parameters passed from `cli`
 * @param {boolean} flag - Flag that determines whether DB connection is required or not
 * @param {string} db - Database to connect to 
 */
function loadDatabaseConnection(flag, db) {
    if (flag !== false) {
        console.log(`database_connection: ${flag}`)
        if (db !== null) {
            console.log(`database: ${db}`)
            if (db === "nls" || db === "snap") {
                require(`../database/${db}`);
            } else if (db === "snap-nls") {
                require('../database/snap');
                require('../database/nls');
            } else {
                throw `Database '${db}' does not exist.\nTry 'nls', 'snap', or 'snap-nls'.`;
            }
        }
    } else {
        console.log(`database_connection: ${config.env.database_connection}`);
    }
}
exports.loadDatabaseConnection = loadDatabaseConnection;