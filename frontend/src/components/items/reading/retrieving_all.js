import React, {useState,useEffect}  from 'react'

export function RetrieveAll(){

    // Fecth listItems
    const[listItems, setlistItems] = useState([])
    var myToken = localStorage.getItem('myaccess_token')
    useEffect(()=>{
        const fetchlistItems =() =>{
            fetch('http://localhost:5000/api/v1/listItems/all',{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization':`Bearer ${myToken}`
                 }
          }).then((response) => response.json())
            .then((data)=>{setlistItems(data.data); localStorage.setItem('mylistItems', JSON.stringify(data.data))})
        }
        fetchlistItems();
    }, [])
    // console.log("listItems state:",listItems)
    // console.log("storagelistItems", JSON.parse(localStorage.getItem("mylistItems")))
    return (
            <div className='section'>
                <h3>A list of my listItems</h3>
                <div className='list'>
                {
            listItems?.map(listitem =>(<>
            <div className="listitem">
                                    
                                    <div>                               
                                            <h3>{listitem["id"]}:{listitem["name"]}</h3>
                                            <p>Price: {listitem["price unit"]}{listitem["price"]}</p>
                                            
                                            <p>Grand Price: {listitem["grand price"]}</p>
                                            <p>Status: {listitem["status"]}</p> 
                                    </div>
                                    
                                </div>
                                <hr></hr></>))}
                    </div>
                </div>
        )

}