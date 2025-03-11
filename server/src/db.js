import Database from "better-sqlite3";
const db = new Database("finances.db");

const createTable = `
    CREATE TABLE IF NOT EXISTS finances (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        amount INTEGER NOT NULL
    )
`
db.exec(createTable)

const finances = [
    {id: 1, name: "Work paycheck", amount: 1200},
    {id: 2, name: "Rent", amount: 500}
];

const addData = db.prepare("INSERT INTO finances (name, amount) values (?, ?)");

finances.forEach(cashFlow => {
    addData.run(cashFlow.name, cashFlow.amount);
});

db.close();