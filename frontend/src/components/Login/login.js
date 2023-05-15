import React, {useState, useEffect} from "react";
import "./login.css";
import { SignUp } from "../Signup/signup";

// import {Navigate, Link} from "react-router-dom";

export function Login(){

    const [password, setPassword]=useState("");
    const [email, setEmail]=useState("");
    
    const ChangePassword=(e)=>{
             setPassword(e.target.value)
            
             console.log(password)

    }
    const ChangeEmail=(e)=>{
        
       setEmail(e.target.value)
        console.log(email)
    }
    
    function UserLogin(){
        // const [isloggedIn, setIsLoggedIn] = useState(false)
        const details = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        fetch('http://127.0.0.1:5000/api/v1/users/login', details)
        .then(response => response.json())
        .then((data)=>{
            console.log(data); 
            if (data.access_token){
                // setIsLoggedIn(true);
                alert(data.message)
                localStorage.setItem('myaccess_token', JSON.stringify(data.access_token));
                localStorage.setItem('myrefresh_token', JSON.stringify(data.refresh_token));
                localStorage.setItem('myuser_type', JSON.stringify(data.user_type));
            }
            

    })
        .catch(error =>(
            console.error("There is a problem with the data", error)
        ))
    }
   
    const handleSubmit = (event) =>{
        event.preventDefault();
        UserLogin()
        setEmail("");
        setPassword("");
        // console.log("Your password is",password+"!?23%4"+email+"!&")
    }
    
    return(
        <div className="MyLogin">
            
            <h1>Promise's Login page.</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="email">Email: </label>
                    <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="enter your email please"
                    value={email}
                    onChange={ChangeEmail}/>
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={ChangePassword}/>
                </div>
                <div><button>Submit</button></div>
            </form>
            <div>
                <p>Don't have an account| <button onClick={SignUp}>SignUp</button></p>
            </div>
        </div>
    );
} 