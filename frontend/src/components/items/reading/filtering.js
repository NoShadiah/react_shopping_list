import React, {useState,useEffect}  from 'react'

export function Uncleared(){

    // Fecth listItems
    const[unclearedItems, setunclearedItems] = useState([])
    
    useEffect(()=>{
        const MyUnclearedItems =() =>{
            fetch('http://localhost:5000/api/v1/listItems/items_status/Uncleared',{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NDEzNjExOSwianRpIjoiMGY1NGM3YzQtNDJlZS00NGQ4LWFhM2QtMmE3MmFmODliZGU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjg0MTM2MTE5LCJleHAiOjE2ODQxMzcwMTl9.zHeL8NiPnmNlTN0khbf0JrEtu5O_DyZeW3kKgSnah54`
                 }
          }).then((response) => response.json())
            .then((data)=>{setunclearedItems(data.data); localStorage.setItem('myunclearedItems', JSON.stringify(data.data))})
        }
        
        MyUnclearedItems();
    }, [])
    // console.log("listItems state:",listItems)
    // console.log("storagelistItems", JSON.parse(localStorage.getItem("mylistItems")))
    return (<>
                <div className='section'>
                <h3>You have {unclearedItems.length} uncleared Items</h3>
                <div className='list'>
                {
            unclearedItems?.map(uncleareditem =>(<>
            <div className="uncleareditem">
                                    
                                    <div>                               
                                            <h3>{uncleareditem["id"]}:{uncleareditem["name"]}</h3>
                                            <p>Price: {uncleareditem["price unit"]}{uncleareditem["price"]}</p>
                                            <p>Quantity: {uncleareditem["quantity"]}</p>
                                            <p>Grand Price: {uncleareditem["grand price"]}</p>                                
                                    </div>
                                    
                                </div>
                                <hr></hr></>))}
                    </div>
                </div>
                
            </>           
        )
}

export function ClearedItems(){
    const[cleared, setClearedItems] = useState([]);

    useEffect(()=>{
        const ClearedIs =() =>{
            fetch('http://localhost:5000/api/v1/listItems/items_status/Cleared',{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NDEzNzAzNSwianRpIjoiNGVhNDdjNzQtZTNhNC00Mjk2LWI3YTgtYWU5OTI1ZDQ0NzgyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjg0MTM3MDM1LCJleHAiOjE2ODQxMzc5MzV9.0-UJibtC_yrqsUsPL8iZA2Zmidvu3Kl4NrdTvvtr1Cw`
                 }
          }).then((response) => response.json())
            .then((data)=>{setClearedItems(data.data); localStorage.setItem('myClearedItems', JSON.stringify(data.data))})
        }
        ClearedIs();
    },[])
    return (
        <div className='section'>
        <h3>You have {ClearedItems.length} cleared Items</h3>
        <div className='list'>
        {
    cleared?.map(Cleareditem =>(<>
    <div className="Cleareditem">
                            
                            <div>                               
                                    <h3>{Cleareditem["id"]}:{Cleareditem["name"]}</h3>
                                    <p>Price: {Cleareditem["price unit"]}{Cleareditem["price"]}</p>
                                    <p>Quantity: {Cleareditem["quantity"]}</p>
                                    <p>Grand Price: {Cleareditem["grand price"]}</p>
                                     
                            </div>
                            
                        </div>
                        <hr></hr></>))}
            </div>
        </div>
    )
}
