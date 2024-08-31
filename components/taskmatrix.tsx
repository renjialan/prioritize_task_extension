import React, { useState } from 'react';
import styled from 'styled-components';
import TaskQuadrant from './taskquadrant';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const MatrixContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  width: 80%;
  height: 80%;
`;

const TaskMatrix = () => {
  const [tasks, setTasks] = useState([
    { id: 'task-1', description: 'Task 1', isImportant: true, isUrgent: true },
    { id: 'task-2', description: 'Task 2', isImportant: true, isUrgent: false },
    { id: 'task-3', description: 'Task 3', isImportant: false, isUrgent: true },
    { id: 'task-4', description: 'Task 4', isImportant: false, isUrgent: false },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.isImportant = result.destination.droppableId.includes('important');
    movedTask.isUrgent = result.destination.droppableId.includes('urgent');
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MatrixContainer>
        <Droppable droppableId="important-urgent">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskQuadrant title="Important & Urgent" color="#FF6B6B" tasks={tasks.filter(task => task.isImportant && task.isUrgent)} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="important-not-urgent">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskQuadrant title="Important & Not Urgent" color="#FFD93D" tasks={tasks.filter(task => task.isImportant && !task.isUrgent)} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="urgent-not-important">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskQuadrant title="Urgent & Not Important" color="#4ECDC4" tasks={tasks.filter(task => !task.isImportant && task.isUrgent)} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="not-important-not-urgent">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskQuadrant title="Not Important & Not Urgent" color="#C7F9CC" tasks={tasks.filter(task => !task.isImportant && !task.isUrgent)} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </MatrixContainer>
    </DragDropContext>
  );
};

export default TaskMatrix;