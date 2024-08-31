import React from 'react';
import styled from 'styled-components';
import TaskQuadrant from './taskquadrant';

const MatrixContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  width: 80%;
  height: 80%;
`;

const TaskMatrix: React.FC = () => {
  return (
    <MatrixContainer>
      <TaskQuadrant title="Important & Urgent" color="#FF6B6B" />
      <TaskQuadrant title="Important & Not Urgent" color="#FFD93D" />
      <TaskQuadrant title="Urgent & Not Important" color="#4ECDC4" />
      <TaskQuadrant title="Not Important & Not Urgent" color="#C7F9CC" />
    </MatrixContainer>
  );
};

export default TaskMatrix;