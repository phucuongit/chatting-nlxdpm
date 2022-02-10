const { connection } = require("../config/database");

//them mot tin nhan da phuong tien moi
module.exports.create = (mediaMessage) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO mediamessage SET ?', mediaMessage, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result))
                let res = {
                    ...mediaMessage,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    })
}

module.exports.get = (userId, limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT message.id, path FROM message JOIN mediamessage ON message.id = mediamessage.messageId and message.type = "media" WHERE message.receiveId = ?;`
        connection.query(sql,[userId, limit, offset], function (error, result) {
            if (error) {
                reject(error);
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result));
                    resolve(endResult);
                } else {
                    resolve(null);
                }
            }
        });
    })
}