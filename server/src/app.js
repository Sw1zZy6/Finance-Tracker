import express, { json } from "express";
import Database from "better-sqlite3";
import cors from "cors";

const db = new Database("finances.db")
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/finances", (req, res) => {
    let allInfo = "SELECT * FROM finances";
    const finances = db.prepare(allInfo).all();
    const financesCopy = [...finances];
    const sort = req.query.sort;


    console.log(sort);
    if (sort === "asc") {
        financesCopy.sort((a, b) => b.amount - a.amount);
    } else if (sort === "desc") {
        financesCopy.sort((a, b) => a.amount - b.amount);
    }

    res.json({ finances: financesCopy })
});

app.get("/finances/:id", (req, res) => {
    const id = req.params.id;
    const cashFlow = db.prepare("SELECT * FROM finances WHERE id = ?").get(id);

    if (!cashFlow) {
        return res.status(404).json({ error: "cashflow not found."})
    }
    res.json({ cashFlow })
});

app.post("/finances", (req, res) => {
    const { name, amount }= req.body;

    if (!name) {
        return res.status(404).json({ error: "Name required."});
    }
    if (!amount) {
        return res.status(404).json({ error: "amount required."});
    }

    const result = db.prepare("INSERT INTO finances (name, amount) values (?, ?)").run(name, amount);

    res.status(201).json({ id: result.lastInsertRowid})
});

app.put("/finances/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, amount } = req.body;

    if (!name) {
        return res.status(404).json({ error: "name required"})
    }
    if (!amount) {
        return res.status(404).json({ error: "amount required"})
    }

    const cashflow = db.prepare("UPDATE finances SET name = ?, amount = ? WHERE id = ?").run(name, amount, id);
    
    if (!cashflow) {
        res.status(404).json({ error: "cashflow not found."})
    }

    res.sendStatus(200);
});

app.patch("/finances/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, amount } = req.body;

    if (!name && !amount) {
        return res.status(404).json({ error: "Name or amount required." });
    }

    const cashFlow = db.prepare("UPDATE finances SET name = COALESCE(?, name), amount = COALESCE(?, amount) WHERE id = ?").run(name, amount, id);

    if (!cashFlow.changes) {
        return res.sendStatus(404).json({ error: "cashflow not found" });
    }

    res.sendStatus(200);
})

app.delete("/finances/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cashFlow = db.prepare("DELETE FROM finances WHERE id = ?").run(id);
    
    if (!cashFlow.changes) {
        return res.status(404).json("Failed to find cashflow.");
    }

    res.sendStatus(200);  
})

app.listen(port, () => {
    console.log(`running http://localhost:${port}...`)
});