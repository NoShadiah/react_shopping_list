import React from "react";

export function SignUp(){

    return(
        <div className="MySignUp">
            
            <p>My SignUp page</p>
            <form>
                <div>
                    <label for="firstname">First Name: </label>
                    <input type="text" name="firstname" id="firstname" placeholder="Enter your first name"/>
                </div>
                <div>
                    <label for="lastname">Last Name: </label>
                    <input type="text" name="lastname" id="lastname" placeholder="Enter your lastname"/>
                </div>
                <div>
                    <label for="gender">Gender: </label>
                    <input type="text" name="gender" id="gender" placeholder="Enter your gender"/>
                </div>
                <div>
                    <label for="email">Email: </label>
                    {/* <input type="text" name="email" id="email" placeholder="enter your email please"/> */}
                    <select>
                        <option>F</option>
                        <option>M</option>
                    </select>
                </div>
                <div>
                    <label for="cotact">Contact: </label>
                    <input type="telephone" name="contact" id="cotact" placeholder="093783232323" maxLength={10}/>
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder="..........."/>
                </div>
                <div>
                    <label for="address">Address: </label>
                    <input type="text" name="address" id="address" placeholder="Kamwokya Bukoto Street"/>
                </div>
                <div><button>Submit</button></div>
            </form>
        </div>
    );
}