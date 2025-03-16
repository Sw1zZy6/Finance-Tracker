import { useState } from "react";
import "/All Code/codingprojects/finance/client/src/App.css";

export default function AddCashflow({ onAddCashflow }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();


    const addCashflow = async () => {
        const cashFlow = { name, amount }

        try {
            const response = await fetch("http://localhost:3001/finances", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cashFlow)
            });

            if (!response) {
                console.log("Failed to add cashflow");
            } else {
                const data = response.json();
                console.log("Cashflow addded.");        
                setName("");
                setAmount("");
                onAddCashflow(data);
            }

        } catch (error) {
            console.error("Error:", error)
        }        
    }

    const clearInput = () => {
        setName("");
        setAmount("");
    }

    return (
        <div>
            <h1 className="cf-title">Add Cashflow</h1>
            <div className="inputCf">
                <input type="text" placeholder="Add income/Expense" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <div className="btns">
                    <button className="clearBtn" onClick={clearInput} >Clear</button>
                    <button className="addCfBtn" onClick={addCashflow}>Add Cashflow</button>
                </div>
            </div>
        </div>
    )
}