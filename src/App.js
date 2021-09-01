import React, { useEffect, useState } from 'react';
import './App.css';
import api from './api/allDataUrl';

//Retrieve Data
const getData = async () => {
  const response = await api.get();
  return response.data;
};

const App = () => {
  const [allData, setAllData] = useState();

  useEffect(() => {
    const getAllData = async () => {
      const getAllData = await getData();
      if (getAllData) setAllData(getAllData);
      console.log(allData);
    };
    getAllData();
  }, []);

  return (
    <div className="App">
      {/* {allData &&
        Object.entries(allData).map((item) => {
          console.log(item);
          return <h1>{item.id}</h1>;
        })} */}
    </div>
  );
};

export default App;
