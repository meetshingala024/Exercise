import React, { useState } from 'react';
import { Table, Input, Button,  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleEditTodo = (index, editedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editedTodo;
    setTodos(updatedTodos);
    setEditingTodo('');
    setEditIndex(-1);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleEditButtonClick = (index, task) => {
    setEditingTodo(task);
    setEditIndex(index);
  };

  const handleCancelButtonClick = () => {
    setEditingTodo('');
    setEditIndex(-1);
  };

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleEditingTodoChange = (e) => {
    setEditingTodo(e.target.value);
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: (text, record, index) => {
        if (editIndex === index) {
          return (
            <Input
              value={editingTodo}
              onChange={handleEditingTodoChange}
            />
          );
        }
        return text;
      },
    },
    {   
      align: 'right',
      render: (_, record, index) => (
        <div>
          {editIndex === index ? (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => handleEditTodo(index, editingTodo)}
              />
              <Button
                type="default"
                icon={<DeleteOutlined />}
                onClick={handleCancelButtonClick}
              />
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => handleEditButtonClick(index, record.task)}
              />
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveTodo(index)}
              />
            </>
          )}
          </div>
      )
    }
  ];

  const dataSource = todos.map((todo, index) => ({
    key: index,
    index: index + 1,
    task: todo,
  }));

  return (
    <div className='container'>
        <div className='card'>
      <h1 style={{textAlign:'center'}}>To-Do List</h1>
      <Input
        value={newTodo}
        onChange={handleNewTodoChange}
        placeholder="Enter a new task"
        
      />
      <Button type="primary" onClick={handleAddTodo}>
        Add
      </Button>
      {todos.length > 0 ? (
        <Table columns={columns} dataSource={dataSource} />
      ) : (
        <p>No tasks yet.</p>
      )}
    </div>
    </div>
  );
};

export default TodoList;
