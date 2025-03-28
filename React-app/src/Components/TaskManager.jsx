import React, { useState, useEffect } from "react";
import "./TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reminder, setReminder] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const addTask = () => {
    if (title.trim() === "" || dueDate === "" || reminder === "") return;

    const newTask = { title, dueDate, priority, reminder };
    let updatedTasks;

    if (editIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    setTitle("");
    setDueDate("");
    setPriority("Medium");
    setReminder("");
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Tasks saved successfully! ✅");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDueDate(taskToEdit.dueDate);
    setPriority(taskToEdit.priority);
    setReminder(taskToEdit.reminder);
    setEditIndex(index);
  };

  return (
    <div className="task-manager">
      <h1 className="task-title">Task Management System</h1>

      <div className="task-inputs">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
        <button className="add-task-btn" onClick={addTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
        <button className="save-task-btn" onClick={saveTasks}>
          Save Tasks
        </button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Reminder</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={task.priority.toLowerCase()}>
              <td>{task.title}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.reminder).toLocaleString()}</td>
              <td>
                <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;
