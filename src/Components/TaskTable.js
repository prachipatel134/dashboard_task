import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button ,Chip} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTasks, CreateTask, EditTask, DeleteTask } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  const { data: tasks, isLoading, isError } = useQuery('tasks', getTasks);

  const deleteTaskMutation = useMutation(DeleteTask, {
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries('tasks');
    },
  });
  const getPriorityChip = (priority) => {
    switch (priority) {
      case 'high':
        return <Chip label="High" sx={{ backgroundColor: '#be1328', color: '#fff' }} />;
      case 'medium':
        return <Chip label="Medium" sx={{ backgroundColor: '#faad14', color: '#fff' }} />;
      case 'low':
        return <Chip label="Low" sx={{ backgroundColor: '#D3CFFF', color: '#5038ED' }} />;
      default:
        return <Chip label={priority} />;
    }
  }

  const getStatusChip = (status) => {
    switch (status) {
      case 'completed':
        return <Chip label="Completed" color="success" />;
      case 'in_progress':
        return <Chip label="In Progress" color="primary" />;
      case 'pending':
        return <Chip label="Pending" color="default" />;
      
      default:
        return <Chip label={status} />;
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks...</div>;

  return (
    <>
    <ToastContainer />
    <TableContainer component={Paper} className='table-mr'>
      <Table className="task-table">
        <TableHead>
          <TableRow className="Table-header">
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            
            <TableCell>Priority</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task._id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell className="table-cell">
                {getStatusChip(task.status)}
              </TableCell>
              <TableCell className="table-cell">
                {getPriorityChip(task.priority)}
              </TableCell>
              <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(task.createDate).toLocaleDateString()}</TableCell>
              <TableCell>
              <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  style={{ marginRight: '8px',marginBottom:'10px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  sx={{ backgroundColor: '#1e2772', color: '#fff',marginBottom:'10px' }}
                  onClick={() => deleteTaskMutation.mutate(task._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TaskTable;
