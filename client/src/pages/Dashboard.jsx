import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks", config);

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await API.post(
      "/tasks",
      {
        title,
        description,
      },
      config,
    );

    fetchTasks();

    setTitle("");
    setDescription("");
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, config);

    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await API.put(
      `/tasks/${task._id}`,
      {
        completed: !task.completed,
        status: !task.completed ? "Completed" : "Pending",
      },
      config,
    );

    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-grid">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={task.completed ? "task-card completed" : "task-card"}
            >
              <div className="task-top">
                <h3>{task.title}</h3>

                <span
                  className={
                    task.completed
                      ? "status completed-status"
                      : "status pending-status"
                  }
                >
                  {task.status}
                </span>
              </div>

              <p>{task.description}</p>

              <div className="task-buttons">
                <button
                  className="complete-btn"
                  onClick={() => toggleComplete(task)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
