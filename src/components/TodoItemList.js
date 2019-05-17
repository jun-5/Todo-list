import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.todos !== nextProps.todos;
  // }

  render() {
    const { todos, onToggle, onRemove, EditToggle, onChange, onEditor, onEdit } = this.props;

    const todoList = todos.map(
      ({id, title,text, checked, edit,time}) => (
        <TodoItem
          id={id}
          title={title}
          text={text}
          time={time}
          checked={checked}
          edit={edit}
          onToggle={onToggle}
          EditToggle={EditToggle}
          onRemove={onRemove}
          key={id}
          onChange={onChange}
          onEditor={onEditor}
          onEdit={onEdit}
        />
      )
    );

    return (
      <div>
        {todoList}    
      </div>
    );
  }
}

export default TodoItemList;