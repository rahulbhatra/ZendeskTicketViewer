import { DataGrid } from '@mui/x-data-grid';
import { createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Toast from '../toast/toast';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { orange } from '@mui/material/colors';


const theme = createTheme();

export default function Tickets() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSevertiy] = useState('success');
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: '40'},
    { field: 'status', headerName: 'Status', width: '150'},
    { field: 'subject', headerName: 'Subject', width: '350' },
    { field: 'requester', headerName: 'Requester', width: '200' },
    { field: 'updated_at', headerName: 'Requester Updated', width: '200', valueFormatter: (params) => {
      const date = new Date(params.value);
      return `${date.toLocaleString()}`;
    }, },
    { field: 'assignee', headerName: 'Assignee', width: '200'},
    {
      field: 'action',
      headerName: 'Action',
      width: '150',
      sortable: false,
      renderCell: (params) => {
        const handleClick = (e) => {
          console.log(params.row.id);
          navigate("/ticket-details", {
            state: {
              ticket: params.row
            }
          });
        };
  
        return <Button sx={{backgroundColor: orange[500]}} variant="contained" onClick={handleClick}>Ticket Details</Button>;
      },
    },
  ];

  
  const getData = async () => {
    await axios.post('http://localhost:4000/api/tickets')
      .then(res => {
        console.log(res.data.rows);
        setRows(res.data.rows);
        setToastOpen(true);
        setToastMessage('Successfully Loaded Tickets');
        setToastSevertiy('success');
        
      })
      .catch(error => {
        console.log(error);
        setToastOpen(true);
        setToastMessage('Some problem occured!');
        setToastSevertiy('error');
      });
    }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{width: '100%'}}>
      <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} severity={toastSeverity} />
      <div style={{ height: '90vh', width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
        />
      </div>
    </ Box>
  );
}