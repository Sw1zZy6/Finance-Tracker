import { useState, useEffect } from "react";

export default function GetCashflowsAmount() {
    let [ total, setTotal ] = useState ();
    let [loading, setLoading] = useState(true);

    const getCashflowsAmount = async () => {
        setLoading("loading...")
        let totalAmount = 0;        
        try {
            const response = await fetch("http://localhost:3001/finances");
            if (!response) {
                throw new Error("Couldnt fetch cashflows");
            }

            const data = await response.json();
            
            data.finances.forEach(cashflow => {
                totalAmount += cashflow.amount;
            });
            setLoading("");
        } catch (error){
            return console.error("Failed to fetch cashflow", error);
        }
        setTotal(totalAmount);        
    };

    useEffect(() => {
        setLoading();
        getCashflowsAmount();
    }, []);

    return (
        <div>
            <p style={{fontSize: "2rem", position: "absolute", textAlign: "center", width: "100%"}}>{loading}</p>

            <h2 style={{display: "flex", justifyContent: "center", }} className="total-profit">
                Total Profit
            </h2>
            <p className="total">{total}</p>
        </div>
    )
}