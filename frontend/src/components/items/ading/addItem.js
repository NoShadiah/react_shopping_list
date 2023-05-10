import React from "react";
import "./addItem.css";

// import {Navigate, Link} from "react-router-dom";

export function AddItem(){

    return(
        <div className="MyAddItem">
            
            <h1>Promise's AddItem page.</h1>
            <form>
                <div>
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="name" placeholder="enter your email please"/>
                </div>
                <div>
                    <label for="price">Price: </label>
                    <input type="price" name="price" id="price"/>
                </div>
                <div>
                    <label for="quantity">Quantity: </label>
                    <input type="number" name="quantity" id="quantity"/>
                </div>
                <div>
                    <label for="Grand_Price">Grand Price: </label>
                    <input type="Grand_Price" name="Grand_Price" id="Grand_Price"/>
                </div>
                <div><button>Add Item</button></div>
            </form>
        </div>
    );
} 