import axios from 'axios';

// הגדרת כתובת ה-API כברירת מחדל
axios.defaults.baseURL = "process.env.REACT_APP_API_URL";

// הוספת Interceptor לתפיסת שגיאות ורישום ללוג
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default {
  // שליפת כל המשימות
  getTasks: async () => {
    try {
      const result = await axios.get('/tasks');
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      alert("Failed to load tasks.");
      return [];
    }
  },

  // הוספת משימה חדשה
  addTask: async (name) => {
    console.log('Adding task:', name);
    try {
      const result = await axios.post('/tasks', { Name: name, isComplete: false }); 
      return result.data;
    } catch (error) {
      alert("Failed to add task.");
      return null;
    }
  },

  // עדכון סטטוס משימה
  setCompleted: async (id, isComplete) => {
    console.log('Updating task', { id, isComplete });
    try {
      const result = await axios.put(`/tasks/${id}`, { isComplete }); 
      return result.data;
    } catch (error) {
      alert("Failed to update task.");
      return null;
    }
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    console.log('Deleting task:', id);
    try {
      const result = await axios.delete(`/tasks/${id}`); 
      return result.data;
    } catch (error) {
      alert("Failed to delete task.");
      return null;
    }
  }
};
