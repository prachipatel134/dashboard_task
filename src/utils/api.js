import apiInstance from '../utils/apiInstance'; 

const getTasks = async() =>{
    try{
    const response = apiInstance.get('/api/v1/users/tasks?status=in_progress')
    const TaskData = await response;
    console.log(TaskData.data.response.tasks);
    return TaskData.data.response.tasks;
    }
    catch(error){
        console.error('Error Getting task:', error);
        throw error;
    }
};
const User = async() =>{
  try{
  const response = apiInstance.get('/api/v1/users/viewProfile')
  const TaskData = await response;
  console.log(TaskData);
  return TaskData.data.response.user;
  }
  catch(error){
      console.error('Error Getting task:', error);
      throw error;
  }
};

const getTask = async(taskId) =>{
  try{
  const response = apiInstance.get(`/api/v1/users/tasks/${taskId}`)
  const TaskData = await response;
  console.log(TaskData.data.response.tasks);
  return TaskData.data.response.tasks;
  }
  catch(error){
      console.error('Error Getting task:', error);
      throw error;
  }
};
const CreateTask = async(task)=>{
    try{
    const response = apiInstance.post('/api/v1/users/tasks', task )
    return response.data;
    }
    catch(error){
        console.error('Error Creating task:', error);
        throw error;
    }

}
const EditTask = async (taskId, updatedTask) => {
    try {
      const response = await apiInstance.put(`/api/v1/users/tasks/${taskId}`, updatedTask);
      return response.data; 
    } catch (error) {
      console.error('Error editing task:', error);
      throw error;
    }
  };
  
const DeleteTask = async (taskId) => {
    try {
      const response = await apiInstance.delete(`/api/v1/users/tasks/${taskId}`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };
  export {getTasks,getTask,CreateTask,EditTask,DeleteTask,User};