// src/components/Dashboard.jsx

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { getToken, isTokenValid } from '../utils/tokenUtils';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 150, editable: true },
  { field: 'lastLogin', headerName: 'Last Login', width: 180, editable: true },
];

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Ref to ensure redirection happens only once.
  const hasRedirected = useRef(false);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const users = await response.json();
      const mappedRows = users.map(user => ({
        id: user.USERID,
        name: user.NAME,
        email: user.EMAIL,
        lastLogin: user.LASTLOGIN,
      }));

      setRows(mappedRows);
      setTotalUsers(users.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token && !hasRedirected.current) {
      console.error("No token found in sessionStorage. Redirecting to login.");
      hasRedirected.current = true;
      navigate('/login', { replace: true });
      return;
    }
    
    const checkTokenAndFetch = async () => {
      const valid = await isTokenValid(token);
      if (valid) {
        fetchUsers(token);
      } else if (!hasRedirected.current) {
        console.error("Invalid or expired token. Redirecting to login.");
        hasRedirected.current = true;
        navigate('/login', { replace: true });
      }
    };

    checkTokenAndFetch();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        textAlign="center"
        style={{ marginTop: '40px', fontWeight: 'bolder' }}
      >
        Dashboard
      </Typography>
      {/* NavBar is now rendered at the App level */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: 1 }}>
        <Box sx={{ p: 2, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Data Table (Total Users: {totalUsers})
      </Typography>
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          hideFooter
          disableRowSelectionOnClick
          rowHeight={30}
          sx={{
            height:'200px',
            minWidth: '300px',
            fontSize: '12px',
          }}
        />
      </Box>
    </Paper>

          <Paper elevation={3} sx={{ p: 2 }} style={{ padding: 20, marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Quarterly Performance
            </Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={125}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </Paper>
        </Box>
        <Box sx={{ p: 2, flex: 1 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Metrics
            </Typography>
            <Stack direction="column" spacing={3} alignItems="center">
              <Gauge width={175} height={200} value={70} innerRadius={40} />
              <Gauge width={175} height={200} value={90} startAngle={-90} endAngle={90} innerRadius={40} />
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
