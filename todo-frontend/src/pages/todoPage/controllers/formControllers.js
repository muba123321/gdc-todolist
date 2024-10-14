import { signout } from "../../../redux/User/authSlice";
import api from "../../../utils/axios";

export const fetchTasks = async (setTasks, setError) => {
  try {
    console.log("starting to fecth");
    const res = await api.get("/tasks");
    console.log(`fetch: ${res.data}`);
    setTasks(res.data);
  } catch (err) {
    setError("Failed to load tasks. Please try again.");
  }
};

export const addTask = async (
  newTask,
  tasks,
  setTasks,
  setNewTask,
  setError
) => {
  try {
    const res = await api.post("/tasks", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  } catch {
    setError("Failed to add task");
  }
};

export const handleEditTask = async (
  editTask,
  tasks,
  setTasks,
  setShowModal,
  setError
) => {
  try {
    const res = await api.put(`/tasks/${editTask._id}`, {
      title: editTask.title,
    });
    const updatedTasks = tasks.map((task) =>
      task._id === editTask._id ? res.data : task
    );
    setTasks(updatedTasks);
    setShowModal(false);
  } catch (err) {
    setError("Failed to update task.");
  }
};

export const deleteTask = async (taskId, tasks, setTasks, setError) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  } catch (err) {
    setError("Failed to delete task.");
  }
};

export const toggleTaskCompletion = async (task, tasks, setTasks, setError) => {
  try {
    const updatedTask = { ...task, completed: !task.completed };
    const res = await api.put(`/tasks/${task._id}`, updatedTask);
    const updatedTasks = tasks.map((t) => (t._id === task._id ? res.data : t));
    setTasks(updatedTasks);
  } catch (err) {
    setError("Failed to update task status.");
  }
};

export const handleLogout = async (dispatch, navigate, setError) => {
  try {
    const res = await api.get("/auth/signout");
    if (!res.data.success) {
      setError("Error logging out:", res.data);
      return;
    }
    dispatch(signout());
    navigate("/");
  } catch (err) {
    setError("Failed to log out.");
  }
};
