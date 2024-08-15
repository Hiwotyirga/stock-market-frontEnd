import { useEffect, useState } from 'react';
import '../../../App.css';
import axios from 'axios';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object from state
    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:9000", data);
      setUserList(response.data);  
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }

    
  };
  useEffect(()=>{

  axios.get("http://localhost:9000").then((response)=>{
  setUserList(response.data)
  })

  
  })

  return (
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
      </form>
      <div > 
      </div>
    </div>
  );
}

export default Register;
