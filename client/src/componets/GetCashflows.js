import { useState, useEffect, } from "react";
import App from "../App";

export default function GetCashflows() {
    let [ cashflows, setCashflows ] = useState([]);

    
    const getCashflows = async () => {
        try {
            const response = await fetch("http://localhost:3001/finances");
            if (!response) {
                throw new Error("Couldnt fetch cashflows");
            }

            const data = await response.json();
            setCashflows(data.finances);
        } catch (error){
            console.error("Failed to fetch cashflow", error);
        }
    }

    useEffect(() => {
        getCashflows();
    }, []);

    return (
        <div className='cfContainer'>
            {cashflows.map(cashflow => (
                <ul key={cashflow.id} className="cf">
                    <li style={{ color: "black"}} className="cf-name">{cashflow.name}</li>
                    <li style={{ color: cashflow.amount < 0 ? "red" : "#05a124"}} className="cf-amount">
                        {cashflow.amount}
                    </li>
                </ul>
            ))}
        </div>
    );
}