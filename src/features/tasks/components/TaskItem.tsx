import React from 'react'
import styled from 'styled-components'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Task } from '../taskTypes'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <StyledTaskItem className='task-item'>
      <Card>
        <CardHeader>
          <h3>{task.title}</h3>
        </CardHeader>

        <CardContent>
          <p>{task.description}</p>
        </CardContent>
      </Card>
    </StyledTaskItem>
  )
}

const StyledTaskItem = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f9f9f9;
  }
`

export default TaskItem
