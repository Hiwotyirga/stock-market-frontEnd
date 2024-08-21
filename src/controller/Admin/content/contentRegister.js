import { useEffect, useState } from 'react';
import '../../../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ContentRegister() {
    const {roleId}=useParams()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [userList, setUserList] = useState([]);
  const navigate =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object from state
    const data = {
      name,
      email,
      password,
    //   roleId:[]
    };

    try {
      const response = await axios.post(`http://localhost:8080/admin`, data);
      setUserList(response.data); 
      navigate('/adminlogin'); 
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
              <label htmlFor="name">Name</label>
            </div>
            <input
              type='text'
              placeholder='Enter name'
              className='form-control'
              id='name'
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              id='email'
              value={email}
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <div>
              <label htmlFor="pass">Enter password</label>
            </div>
            <input
              type='password'
              name='password'
              id='pass'
              value={password}
              className='form-control'
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button type='submit'>Register</button>
          </div>
          <button><Link to='/adminlogin ' style={{color:"black"}}>Login</Link></button>
        </form>
        <div > 
        </div>
       
      </div>
     </div>
  
</div>
    
  );
}

export default ContentRegister;
