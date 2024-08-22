import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getTasks, EditTask, CreateTask } from '../utils/api';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Box } from '@mui/material';
import Navbar from '../Components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: task, isLoading, isError } = useQuery(
    ['task', id],
    () => isEditMode ? getTasks().then(tasks => tasks.find(t => t._id === id)) : null,
    { enabled: isEditMode }
  );

  const editTaskMutation = useMutation((updatedTask) => EditTask(id, updatedTask), {
    onSuccess: () => {
        toast.success('Task updated successfully!');
        setTimeout(() => navigate('/dashboard'), 2000); 
      },
      onError: (error) => {
        toast.error('Error editing task!');
        console.error('Error editing task:', error);
      },
  });

  const createTaskMutation = useMutation(CreateTask, {
    onSuccess: () => {
        toast.success('Task created successfully!');
        setTimeout(() => navigate('/dashboard'), 2000); 
      },
      onError: (error) => {
        toast.error('Error creating task!');
        console.error('Error creating task:', error);
      },
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'in_progress',
    priority: 'medium',
    deadline: ''
  });

  useEffect(() => {
    if (isEditMode && task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: new Date(task.deadline).toISOString().split('T')[0],
      });
    }
  }, [task, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      editTaskMutation.mutate(formData);
    } else {
      createTaskMutation.mutate(formData);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading task...</Typography>;

  return (
    <>
      <Navbar />
      <Box sx={{ padding: { xs: '20px', sm: '30px', md: '40px' }, margin: { xs: '10px', md: '0px' } }}>
      <ToastContainer />
        <Paper elevation={3} sx={{ padding: { xs: '20px', sm: '30px' }, margin: 'auto', maxWidth: '900px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isEditMode ? 'Edit Task' : 'Add Task'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ marginTop: "20px" }}>
              <Grid item xs={4} sm={2}>
                <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'start' } }}>Title</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Task Title"
                  required
                />
              </Grid>

              <Grid item xs={4} sm={2}>
                <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'start' } }}>Description</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Task Description"
                  required
                />
              </Grid>

              <Grid item xs={4} sm={2}>
                <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'start' } }}>Status</Typography>
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4} sm={2}>
                <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'start' } }}>Priority</Typography>
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4} sm={2}>
                <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'start' } }}>Deadline</Typography>
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isEditMode ? editTaskMutation.isLoading : createTaskMutation.isLoading}
                >
                  {isEditMode ? (editTaskMutation.isLoading ? 'Updating...' : 'Update Task') : (createTaskMutation.isLoading ? 'Creating...' : 'Add Task')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default EditTaskPage;
