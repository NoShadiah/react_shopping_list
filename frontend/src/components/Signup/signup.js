import React, {useState, useEffect} from "react";

export function SignUp(){

    // The Constants to be posted to the backend
    const[firstname, setFirstName] = useState("")
    const[lastname, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[address, setAddress] = useState("")
    const[gender, setGender] = useState("12222334")
    const[password, setPassword] = useState("")
    const[contact, setContact] = useState("")
    const usertype = "client"

    // functions to handle the change of the variables
    const ChangeFirstName = (e) =>{
        setFirstName(e.target.value)
        console.log(firstname)
    }

    const ChangeLastName = (e) =>{
        setLastName(e.target.value)
        console.log(lastname)
    }

    const ChangeEmail = (e) =>{
        setEmail(e.target.value)
        console.log(email)
    }

    const ChangeGender = (e) =>{
        setGender(e.target.value)
        console.log(gender)
    }

    const ChangePassword = (e) =>{
        setPassword(e.target.value)
        console.log(password)
    }

    const ChangeContact = (e) =>{
        setContact(e.target.value)
        console.log(contact)
    }

    const ChangeAddress = (e) =>{
        setAddress(e.target.value)
        console.log(address)
    }

    function InsertUser(){
        const data = {
         firstname,
         lastname,
         email,
         contact,
         address,
         password,
         gender,
         user_type:usertype
     }
     
 
         fetch("http://localhost:5000/api/v1/users/register", {
         method: "POST", // or 'PUT'
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
         })
         .then((response) => response.json())
         .then((data) => {
             console.log("Success:", data);
         })
         .catch((error) => {
             console.error("Error:", error);
         });
     }
         
   
       const handleSubmit=(event)=>{ 
         event.preventDefault()
         InsertUser()
         setFirstName('')
         setLastName('')
         setEmail('')
         setContact('')
         setAddress('')
         setPassword('')
         setGender('')
       }

       const Abort = ()=>{
         setFirstName('')
         setLastName('')
         setEmail('')
         setContact('')
         setAddress('')
         setPassword('')
         setGender('')
       }

    return(
        <div className="MySignUp">
            
            <p>My SignUp page</p>
            <form>
                <div>
                    <label for="firstname">First Name: </label>
                    <input 
                    type="text" 
                    name="firstname" 
                    id="firstname" 
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={ChangeFirstName}/>
                </div>
                <div>
                    <label for="lastname">Last Name: </label>
                    <input 
                    type="text" 
                    name="lastname" 
                    id="lastname" 
                    placeholder="Enter your lastname"
                    value={lastname}
                    onChange={ChangeLastName}/>
                </div>
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
                    <label for="gender">Gender: </label>
                    
                    <select
                    
                    >
                        <option onChange={ChangeGender}>F</option>
                        <option onChange={ChangeGender}>M</option>
                    </select>
                </div>
                <div>
                    <label for="contact">Contact: </label>
                    <input 
                    type="telephone" 
                    name="contact" 
                    id="cotact" 
                    placeholder="0787832323" 
                    maxLength={10}
                    value={contact}
                    onChange={ChangeContact}/>
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="..........."
                    value={password}
                    onChange={ChangePassword}/>
                </div>
                <div>
                    <label for="address">Address: </label>
                    <input 
                    type="text" 
                    name="address" 
                    id="address" 
                    placeholder="Kamwokya Bukoto Street"
                    value={address}
                    onChange={ChangeAddress}/>
                </div>
                <div>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                    <button onClick={Abort}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}