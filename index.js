const mysql = require("mysql2");
const readline = require("readline");
const { sqlOptions } = require('./config.json'); 

const conn = mysql.createPool(sqlOptions);

console.log("BITCHSQL READY. TYPE END TO END.")

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface.on("line", (msg) => {

    if (msg.toLowerCase() == "end") {
        conn.end((err) => {
            if (err) {
                console.log("FAILED TO CLOSE CONNECTION");
                return;
            }

            console.log("SQL NO LONGER BITCH! CLOSED CONNECTION, ENDING PROGRAM");
            interface.close();
        });
    }
    
    if (msg.toLowerCase().startsWith("sql")) {
        var a = msg.split(" ");
        a = a.slice(1, undefined);
        a = a.join(" ");

        conn.query(a, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(res);
        })
    }
})