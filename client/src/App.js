import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataTable from './components/DataTable'; 

function App() {
  const [datasets, setData] = useState(null);

  const fetchData = async (location) => {
    const response = await fetch(`/data/${location}`);
    const result = await response.json();
    setData(result);
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"}>
      <h1>Select location to fetch data from</h1>
      <Stack spacing={2} direction="row" padding={3}>
        <Button sx={{ backgroundColor:"#28262C" }} variant="contained" onClick={() => fetchData("northamerica")}>North America</Button>
        <Button sx={{ backgroundColor:"#28262C" }} variant="contained" onClick={() => fetchData("europe")}>Europe</Button>
        <Button sx={{ backgroundColor:"#28262C" }} variant="contained" onClick={() => fetchData("asia")}>Asia</Button>
      </Stack>
      {datasets ? <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
      {datasets.map((dataset, index) => (
        <Box alignItems="center" justifyContent={"center"} key={index} padding={1}>
          <h3>
            {dataset.title}
          </h3>
          <DataTable data={dataset.data} />
          </Box>
        ))}
      </Box> : "No data!"}
      
      
    </Box>
    
  );
}

export default App;
