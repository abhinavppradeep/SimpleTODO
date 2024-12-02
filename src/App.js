import './App.css';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      isCompleted: false,
    };
    setTodoList([...todoList, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const markDone = (id) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1 className="title">Mission Planner</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a new mission..."
          />
          <button onClick={addTask}>Add Mission</button>
        </div>
        <div className="task-list">
          {todoList.map((task) => (
            <div key={task.id} className="task-item">
              <button onClick={() => markDone(task.id)} className="mark-done">
                ✈️
              </button>
              <span
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                  color: task.isCompleted ? "#00ffcc" : "#ffffff", // Green for completed tasks
                }}
              >
                {task.taskName}
              </span>
              <button onClick={() => deleteTask(task.id)} className="delete">
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
