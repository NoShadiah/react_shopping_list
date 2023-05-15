import React, {useState, useEffect} from "react";
import "./addItem.css";

// import {Navigate, Link} from "react-router-dom";

export function AddItem(){

    const [Name, setName]=useState("");
    const [Price, setPrice]=useState("");
    const [Quantity, setQuantity]=useState("");
    const[mytoken, setMytoken] = useState(localStorage.getItem("myaccess_token"));
    // 
    
    
    const ChangeName=(e)=>{
             setName(e.target.value)
            
             console.log(Name)

    }
    const ChangePrice=(e)=>{
        
       setPrice(e.target.value)
        console.log(Price)
    }
    const ChangeQuantity=(e)=>{
        
        setQuantity(e.target.value)
         console.log(Quantity)
     }
    
    function UserLogin(){
        // const [isloggedIn, setIsLoggedIn] = useState(false)
        
        const details = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':`Bearer ${mytoken.slice(0, mytoken.length)}` 
                //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NDA5ODU0NywianRpIjoiY2E2NjRmOTYtYWFkYS00NGQ1LWIxY2EtN2IzMmFjNDg5MjFhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjg0MDk4NTQ3LCJleHAiOjE2ODQwOTk0NDd9.C4DiCXV6Rlr0M_-S2U9aLtZbMV74OHmWgdS32DPxNeg`
            },
            body: JSON.stringify({
                price:Price,
                name:Name,
                quantity:Quantity
            })
        }
        fetch('http://127.0.0.1:5000/api/v1/listItems/register', details)
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            alert(data.message);
    })
        .catch(error =>(
            console.error("There is a problem with the data", error)
        ))
    }
   
    const handleSubmit = (event) =>{
        event.preventDefault();
        UserLogin()
        setPrice("");
        setName("");
        // console.log("Your Name is",Name+"!?23%4"+Price+"!&")
    }
    const Abort = ()=>{
        setName('')
        setPrice('')
        }
    return(
        <div className="MyAddItem">
            
            <h1>Promise's AddItem page.</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="name">Name: </label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="enter your Price please"
                    value={Name}
                    onChange={ChangeName}/>
                </div>
                <div>
                    <label for="price">Price: </label>
                    <input 
                    type="price" 
                    name="price" 
                    id="price"
                    value={Price}
                    onChange={ChangePrice}/>
                </div>
                <div>
                    <label for="quantity">Quantity: </label>
                    <input 
                    type="number" 
                    name="quantity" 
                    id="quantity"
                    value={Quantity}
                    onChange={ChangeQuantity}/>
                </div>
                
                <div>
                    <button>Add Item</button>
                    <button onClick={Abort}>Abort</button>
                </div>
            </form>
        </div>
    );
} 