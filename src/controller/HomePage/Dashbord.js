import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, VerticalBarSeries } from 'react-vis';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import 'react-vis/dist/style.css'; // Import react-vis styles

const data = {
  sales: [
    { x: "January", y: 21 },
    { x: "February", y: 35 },
    { x: "March", y: 75 },
    { x: "April", y: 51 },
    { x: "May", y: 41 },
    { x: "June", y: 47 }
  ],
  leads: [
    { x: "January", y: 41 },
    { x: "February", y: 79 },
    { x: "March", y: 57 },
    { x: "April", y: 47 },
    { x: "May", y: 63 },
    { x: "June", y: 71 }
  ],
  pieData: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState(0);
  const [like, setLike] = useState(0);
  const [localStock, setLocalStock] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      // Your fetch logic
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchMediaCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/media/count');
        setMediaCount(response.data.count);
      } catch (err) {
        swal('Failed to fetch media count');
        console.error(err);
      }
    };

    fetchMediaCount();
  }, []);

  // useEffect(() => {
  //   const fetchLocalStockCount = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/localstock/count');
  //       setLocalStock(response.data.count);
  //     } catch (err) {
  //       // swal('Failed to fetch local stock count');
  //       console.error(err);
  //     }
  //   };

  //   fetchLocalStockCount();
  // }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/users/count');
        setUserCount(response.data.count);
      } catch (err) {
        swal('Failed to fetch user count');
        console.error(err);
      }
    };

    fetchUserCount();
  }, []);

  const handleLike = (id) => {
    console.log('Edit image with id:', id);
  };

  const handleComment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/media/file/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.status === 200) {
        swal('File is deleted successfully.');
        setImages(images.filter(image => image.id !== id));
      } else {
        swal('Failed to delete file. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      swal('Error deleting file. Please try again.');
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <main className="main-content">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body" style={{ gap: "10px" }}>
                  <h5 className="card-title">User : {userCount}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Media : {mediaCount}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Local Stock : {localStock}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h3 className="section-title">Line Chart</h3>
              <XYPlot xType="ordinal" width={500} height={300}>
                <XAxis />
                <YAxis />
                <VerticalGridLines />
                <HorizontalGridLines />
                <LineMarkSeries data={data.sales} color="#FB8833" />
                <LineMarkSeries data={data.leads} color="#17A8F5" />
              </XYPlot>
            </div>

            <div className="col-md-6">
              <h3 className="section-title">Bar Chart</h3>
              <XYPlot xType="ordinal" width={500} height={300}>
                <XAxis />
                <YAxis />
                <VerticalGridLines />
                <HorizontalGridLines />
                <VerticalBarSeries data={data.sales} color="#FB8833" />
                <VerticalBarSeries data={data.leads} color="#17A8F5" />
              </XYPlot>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <h3 className="section-title">Pie Chart</h3>
              <PieChart width={500} height={400}>
                <Pie
                  data={data.pieData}
                  cx={250}
                  cy={200}
                  innerRadius={0} // Ensure this is set to 0 for a full pie chart
                  outerRadius={150}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
