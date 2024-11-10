import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Reference for table: https://mui.com/material-ui/react-table/
function DataTable({ data = [] }) {
    const columns = data.length > 0 ? Object.keys(data[0]) : []; // saving column names to an array
    console.log(data)


    return (
      <TableContainer>
        <Table sx={{ backgroundColor:"#D4C2FC", alignItems:"center", justifyContent:"center", maxWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => ( // adding data titles
                <TableCell sx={{fontWeight:'bold'}}  key={column} align="center">
                  {column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => ( // inserting data to correct column
                  <TableCell key={column} align="center"> 
                    {row[column]} 
                  </TableCell> // accessing specific data for each column in the row
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default DataTable
