import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface TaskQuadrantProps {
  title: string;
  color: string;
  tasks: Array<{ id: string; description: string }>;
}

const Quadrant = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    background: ${({ color }) => color + 'CC'};
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
`;

const TaskCard = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: grab;
`;

const TaskQuadrant: React.FC<TaskQuadrantProps> = ({ title, color, tasks }) => {
  return (
    <Quadrant color={color}>
      <Title>{title}</Title>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <TaskCard
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p>{task.description}</p>
            </TaskCard>
          )}
        </Draggable>
      ))}
    </Quadrant>
  );
};

export default TaskQuadrant;