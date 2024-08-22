import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Navbar from '../Components/Navbar';
import { getTasks, CreateTask } from '../utils/api';
import TaskTable from '../Components/TaskTable';
import { User } from '../utils/api';

export default function Dashboard() {
  
   const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ["Tasks"],
    queryFn: User,
  });

 if (isLoading) {
    return <p>Loading...</p>;
  }
 if (error) {
  return <p>Error loading tasks: {error.message}</p>;
  }

  return (
    <>
      <Navbar />
      <div className='main-section'>
        <div className='item-between'>
            <h3 className='font-20'>User Tasks</h3>
           <Button  variant="contained" className='btn-primary' onClick={() => navigate(`/tasks`)}>
               Add Task
            </Button>
        </div>

        <TaskTable />
      </div>
    </>
  );
}
