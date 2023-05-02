import React from "react";
import "./login.css";

// import {Navigate, Link} from "react-router-dom";

export function Login(){

    return(
        <div className="MyLogin">
            
            <h1>Promise's Login page.</h1>
            <form>
                <div>
                    <label for="email">Email: </label>
                    <input type="text" name="email" id="email" placeholder="enter your email please"/>
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div><button>Submit</button></div>
            </form>
        </div>
    );
} 