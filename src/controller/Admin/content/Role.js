import { useEffect, useState } from 'react';
import '../../../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Role() {
  const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
  const [userList, setUserList] = useState([]);
  const navigate =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object from state
    const data = {
      name,
      
    //   roleId:[]
    };

    try {
      const response = await axios.post("http://localhost:8080/role", data);
      setUserList(response.data); 
      navigate('/adminuserregister'); 
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }

    
  };
  

  return (   
<div>

<div className='body'>
  
  
  <div className="App">
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div>
              <label htmlFor="name">Role</label>
            </div>
            <input
              type='text'
              placeholder='Enter Role'
              className='form-control'
              id='name'
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
         
          <div className='form-group'>
            <button type='submit'>Submit</button>
          </div>
          {/* <button><Link to='/userLogin ' style={{color:"black"}}>Register</Link></button> */}
        </form>
        <div > 
        </div>
       
      </div>
     </div>
  
</div>
    
  );
}

export default Role;
