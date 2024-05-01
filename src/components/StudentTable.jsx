import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { API_URL } from "../api/studentAPI";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import "./StudentTable.css";

function StudentTable({ setToken, token }) {
  const [students, setStudents] = useState([]);

  // Function to fetch student data
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}`); // Adjust the URL as needed
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = async (studentId) => {
    await axios.delete(`${API_URL}/${studentId}`);
    fetchStudents();
  };

  const handleClickDelete = (studentId) => {
    deleteStudent(studentId);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleLogout = () => {
    setToken(null);
  };

  const columns = [
    { field: 'studentId', headerName: 'Student ID', width: 120, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    { field: 'name', headerName: 'Name', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    { field: 'major', headerName: 'Major', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    { field: 'year', headerName: 'Year', width: 80, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    {
      field: 'edit', headerName: '', width: 80, sortable: false, filterable: false,
      disableColumnMenu: true, headerClassName: 'custom-header', headerAlign: 'center', align: 'center',
      renderCell: (params) => <EditStudent studentData={params.row} setStudents={setStudents} />
    },
    {
      field: 'delete', headerName: '', width: 80, sortable: false, filterable: false,
      disableColumnMenu: true, headerClassName: 'custom-header', headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <Tooltip title="Delete Student">
          <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(params.row.studentId)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="bg-container">
      <div className="tbl-container">
        <div className="btn-container">
          <button onClick={handleLogout}>Sign Out</button>
          <AddStudent setStudents={setStudents} />
        </div>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'hot' : 'cold'}
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .cold': {
              backgroundColor: '#e7f0f7',
            },
            '& .hot': {
              backgroundColor: '#ccdfef',
            },
          }}
        />
      </div>
    </div>
  );
}

export default StudentTable;
