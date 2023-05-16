import React from "react";
import { useState } from "react";
import "./overall.css";
import { AddItem } from "../ading/addItem";
import { RetrieveAll } from "../reading/retrieving_all";
import { ClearedItems, Uncleared } from "../reading/filtering";

// import {Navigate, Link} from "react-router-dom";

export function Items(){
    const [active, setActive] = useState("")
    const handleOptionClick = (event) => {
        setActive(event.target.value);
        console.log(`Selected option: ${event.target.value}`);
      };

    return(
        <div className="MyItems">
            <h1>Handle your items here with ease</h1>
            <div>
                <button value="add item" onClick={handleOptionClick}>Add Item</button>
                <button value="view all" onClick={handleOptionClick}>View all</button>
                <button value="uncleared items" onClick={handleOptionClick}>Uncleared items</button>
                <button value="cleared items" onClick={handleOptionClick}>Cleared items</button>
            </div>
            <div>
                {active === "add item" && <AddItem/>}
                {active === "view all" && <RetrieveAll/>}
                {active === "uncleared items" && <Uncleared/>}
                {active === "clearede items" && <ClearedItems/>}
            </div>
            
            
        </div>
    );
} 