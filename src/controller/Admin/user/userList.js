import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserList() {
  const [userList,setUserList]=useState([])

  useEffect(()=>{

    axios.get("http://localhost:9000").then((response)=>{
    setUserList(response.data)
    
    }) 
    })
  return (
    <div>{userList.map((value,key)=>{
      return(
        <div> 
          <div> <div> {value.name}</div>
             <div> {value.email}</div>
          <div> {value.password}</div></div>
          </div>
        
      )
    })}</div>
  )
}

export default UserList;