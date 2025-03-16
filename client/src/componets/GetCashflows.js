import { useState, useEffect, } from "react";
import AddCashflow from "./AddCashflows";

export default function GetCashflows() {
    const [ cashflows, setCashflows ] = useState([]);
    const [ editingCashflow, setEditingCashflow ] = useState(null);
    const [ editName, setEditName ] = useState("");
    const [ editAmount, setEditAmount ] = useState();
    
    const getCashflows = async () => {
        try {
            const response = await fetch("http://localhost:3001/finances");
            if (!response.ok) {
                throw new Error("Couldn't fetch cashflows");
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

    const handleAddCashflow = (newCashflow) => {
        getCashflows();
        setCashflows(prevCashflows => [...prevCashflows, newCashflow]);
    }

    const handleEditClick = (cashflow) => {
        setEditingCashflow(cashflow.id)
        setEditName(cashflow.name)
        setEditAmount(cashflow.amount);
    }

    const updateCashflow = async () => {
        const updatedCashflow = {
            id: editingCashflow,
            name: editName,
            amount: editAmount,
        };

        try {
            const data = await fetch(`http://localhost:3001/finances/${updatedCashflow.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({ name: updatedCashflow.name, amount: updatedCashflow.amount})
            });

            if (!data.ok) {
                throw new Error("Failed to update cashflow.");
            }            

            setCashflows((prevCashflows) =>
                prevCashflows.map((cashflow) =>
                    cashflow.id === updatedCashflow.id ? updatedCashflow : cashflow
                )
            );
    
            setEditingCashflow(null);
            setEditName("");
            setEditAmount(null);

        } catch (error) {
            console.error("Failed to update cashflow", error);
        }



    }

    const DeleteCashflow = async (id) => {
        try {
            const data = await fetch(`http://localhost:3001/finances/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"}
            })

            if (!data.ok) {
                throw new Error("Failed to delete cashflow");
            }

            setCashflows((prevCashflows) => prevCashflows.filter((cashflow) => cashflow.id !== id))
        } catch (error) {
            console.Error("Failed to fetch cashflows", error);
        }
    }
    
    return (
        <div>
            <div className='cfContainer'>
                {cashflows.map(cashflow => (
                    <div key={cashflow.id} className="cf">
                        {editingCashflow === cashflow.id ? (
                            <div className="editSection">
                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                                <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)}/>

                                <div className="buttonGroup">
                                    <button className="saveButton" onClick={() => updateCashflow(cashflow.id)}>Save</button>
                                    <button onClick={() => setEditingCashflow(null)} className="cancelButton">Cancel</button>
                                </div>
                            </div>
                        ) : (
                        <div className="cfDetails">
                            <ul>
                                <li style={{ color: "black"}} className="cf-name">{cashflow.name}</li>
                                <li style={{ color: cashflow.amount < 0 ? "red" : "#05a124"}} className="cf-amount">
                                    {cashflow.amount}
                                </li>
                            </ul>
                            <div className="buttonGroup">
                                <button onClick={() => handleEditClick(cashflow)} className="editButton">Edit</button>
                                <button onClick={() => DeleteCashflow(cashflow.id)} className="deleteButton">Delete</button>   
                            </div>
                        </div>
                        )}

                    </div>
                ))}
            </div>
            <AddCashflow onAddCashflow={handleAddCashflow}/> 
        </div>
    );
}