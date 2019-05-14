import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList'


class App extends Component{
  
  id=3;

  state={
    input: '',
    todos: [
      { id:0, text: '원녕이 놀아주기', checked: false},
      { id:1, text: '원녕이 꽃사주기', checked: true},
      { id:2, text: '아트박스절대안가기', checked: false}
    ]
  }

  handleChange = (e) =>{
    this.setState({
      input: e.target.value //input 의 다음 바뀔 값.
    })
  }

  handleCreate = () =>{
    const { input, todos} = this.state;
    this.setState({
      input:'',
      todos:todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    //눌려진 키가 enter면  handle Create 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos:todos.filter(todo => todo.id !== id)
    });
  }

  render(){
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return(
      <TodoListTemplate form={(
      <Form
        value= {input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate}
      />
      )}>
      <TodoItemList todos={todos} onToggle = {handleToggle} onRemove ={handleRemove}/>
        </TodoListTemplate>
    )
  }
}

export default App;
