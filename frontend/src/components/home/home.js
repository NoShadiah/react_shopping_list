import React from "react";
import { useState } from "react";
import { Login } from "../Login/login";
import { SignUp } from "../Signup/signup";
import {Navigate, Link} from "react-router-dom";
import { Items } from "../items/overrall/overall";
import { RetrieveAll } from "../items/reading/retrieving_all";
import "./home.css"

export function Home(){
    const [active, setActive] = useState('Home')

    return(<>
        <div className="Myhome">
            
                <nav id="header">
                    <button onClick={()=>setActive('Home')}>Home</button>
                    
                </nav>
            
           
            <body>
                <div>
                    <img src="https://tinyurl.com/2tck4vr7"/>
                </div>
                    <div>
                    
                        {active === 'Home' && <div>
                            <nav>
                            <button onClick={()=>setActive('Login')}>Login</button>
                            <button onClick={()=>setActive('Signup')}>SignUp</button>
                            <button onClick={()=>setActive('Items')}>Items</button>
                            </nav>
                            <h1><b>Welcome to the</b></h1>
                            <h2>Mega Shopping list.</h2>
                    </div>}
                        {active === 'Login' && 
                        <><Login/></>
                        }
                        {active === 'Signup' && <SignUp/>}
                        {active === 'Items' && <Items/>}
                    </div>
            </body>
            
        </div>
        
    </>
        
    );
} 