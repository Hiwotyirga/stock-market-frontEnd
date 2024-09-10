// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function UserList() {
//   const [userList,setUserList]=useState([])

//   useEffect(()=>{

//     axios.get("http://localhost:9000").then((response)=>{
//     setUserList(response.data)
    
//     }) 
//     })
//   return (
//     <div>{userList.map((value,key)=>{
//       return(
//         <div> 
//           <div> <div> {value.name}</div>
//              <div> {value.email}</div>
//           <div> {value.password}</div></div>
//           </div>
        
//       )
//     })}</div>
//   )
// }

// export default UserList;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './userlist.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';

function UserList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/user');
        const data = await response.json();
        setImages(data.items.map(image => ({ ...image, showFullDescription: false }))); // Extract items and add showFullDescription
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit image with id:', id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/media/file/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
  
      if (response.status === 200) {
        swal(`File is deleted successfully.`);
        setImages(images.filter(image => image.id !== id));
      } else {
        swal('Failed to delete file. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      swal('Error deleting file. Please try again.');
    }
  };
  

  const toggleDescription = (index) => {
    setImages(images.map((image, i) =>
      i === index ? { ...image, showFullDescription: !image.showFullDescription } : image
    ));
  };

  return (
    <div className="container" style={{ fontSize: "15px" }}>
      <main className="main-content">
        <div className="header">
          <button className="btn-primary">
            <Link to='/adduser' style={{ color: 'white' }}>Add User</Link>
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {/* <th>Post Time</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No user available</td>
                </tr>
              ) : (
                images.map((image, index) => (
                  <tr key={image.id}>
                    <td>{image.id}</td>
                    <td>{image.name}</td>
                    <td>
                        {image.email}
                    </td>
                    <td>{image.role}</td>
                    <td>
                      <span
                        className="action-icon"
                        onClick={() => handleEdit(image.id)}
                        title="Edit"
                        style={{ marginRight: "20px", cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        className="action-icon"
                        onClick={() => handleDelete(image.id)}
                        title="Delete"
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UserList;
