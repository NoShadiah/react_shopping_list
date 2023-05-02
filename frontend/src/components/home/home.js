import React from "react";
import { useState } from "react";
import { Login } from "../Login/login";
import { SignUp } from "../Signup/signup";
import {Navigate, Link} from "react-router-dom";
import "./home.css"

export function Home(){
    const [active, setActive] = useState('Home')

    return(<>
        <div className="Myhome">
            
                <nav id="header">
                    <button onClick={()=>setActive('Home')}>Home</button>
                    <button onClick={()=>setActive('Login')}>Login</button>
                    <button onClick={()=>setActive('Signup')}>SignUp</button>
                </nav>
            
           
            <body>
                <div>
                    <img src="https://tinyurl.com/2tck4vr7"/>
                </div>
                    <div>
                    
                        {active === 'Home' && <div>
                            <h1><b>Welcome to the</b></h1>
                            <h2>Mega Shopping list.</h2>
                            </div>}
                        {active === 'Login' && 
                        <><Login/></>
                        }
                        {active === 'Signup' && <SignUp/>}
                    </div>
            </body>
            
        </div>
        
    </>
        
    );
} 