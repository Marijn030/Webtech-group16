const sqlite3 = require("sqlite3").verbose();

function getUserById(userId){
    const db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.get("SELECT * FROM user WHERE user.id = ?", [userId], (err, rows) => {
            if(err){ console.log(err);}
            console.log(rows);
            return rows; //returns JSON object
        });
    })
    db.close();
}

function getUserByLogin(login){
    const db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.get("SELECT * FROM user WHERE user.login = ?", [login], (err, rows) => {
            if(err){ console.log(err);}
            console.log(rows);
            return rows; //returns JSON object
        });
    })
    db.close();
}

function registerUser(name, email, login, password, address, creditcard){
    const db = new sqlite3.Database("cinema");
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO user (name, email, login, password, address, creditcard) VALUES (?, ?, ?, ?, ?, ?)");
        stmt.run(name, email, login, password, address, creditcard);
        stmt.finalize();    
    });
    db.close();
}


