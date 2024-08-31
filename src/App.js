import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskDescription.trim()) {
      setTasks([...tasks, { id: `task-${tasks.length}`, description: taskDescription, isImportant, isUrgent }]);
      setTaskDescription('');
      setIsImportant(false);
      setIsUrgent(false);
    }
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const renderTasks = (filterFn) => {
    return tasks.filter(filterFn).map((task, index) => (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card"
          >
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="important-urgent">
            {(provided) => (
              <div
                className="quadrant important-urgent glass-effect"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Important & Urgent</h2>
                {renderTasks(task => task.isImportant && task.isUrgent)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="important-not-urgent">
            {(provided) => (
              <div
                className="quadrant important-not-urgent glass-effect"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Important & Not Urgent</h2>
                {renderTasks(task => task.isImportant && !task.isUrgent)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="urgent-not-important">
            {(provided) => (
              <div
                className="quadrant urgent-not-important glass-effect"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Urgent & Not Important</h2>
                {renderTasks(task => !task.isImportant && task.isUrgent)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="not-important-not-urgent">
            {(provided) => (
              <div
                className="quadrant not-important-not-urgent glass-effect"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Not Important & Not Urgent</h2>
                {renderTasks(task => !task.isImportant && !task.isUrgent)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="task-input">
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Add a new task"
          />
          <label>
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            Important
          </label>
          <label>
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
            />
            Urgent
          </label>
          <button onClick={addTask}>Add Task</button>
        </div>
      </header>
    </div>
  );
}

export default App;