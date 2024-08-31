import React from 'react';
import styled from 'styled-components';

interface TaskQuadrantProps {
  title: string;
  color: string;
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

const TaskQuadrant: React.FC<TaskQuadrantProps> = ({ title, color }) => {
  return (
    <Quadrant color={color}>
      <Title>{title}</Title>
      {/* Task list and input can be added here */}
    </Quadrant>
  );
};

export default TaskQuadrant;