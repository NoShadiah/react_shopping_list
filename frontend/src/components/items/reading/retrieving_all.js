import React, {useState,useEffect}  from 'react'

export function RetrieveAll(){

    // Fecth listItems
    const[listItems, setlistItems] = useState([])
    useEffect(()=>{
        const fetchlistItems =() =>{
            fetch('http://localhost:5000/api/v1/listItems/all',{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NDEyODM4MiwianRpIjoiMWM5YmEwNTktYTE3NC00YjA0LWFiODUtMjYwYzE1ZTFlNWFlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjg0MTI4MzgyLCJleHAiOjE2ODQxMjkyODJ9.6qcGrUZMoGKELGiGBL48GBph53HK0W54NsB5Q41wM1s`
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