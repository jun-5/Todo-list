import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList'


class App extends Component{
  
  state={
    nextid:3,
    input_text:'',
    input_title:'',
    selectedId:4,
    todos: [
      { id:0, title:"제목1", text: '여기가 아이디', checked: false},
      { id:1, title:"제목2",text: '부분 ', checked: true},
      { id:2, title:"제목3",text: '입니다', checked: false}
    ]
  }



  handleChange_title = (e) =>{
    this.setState({
      input_title: e.target.value //input 의 다음 바뀔 값.
    })
  }

  handleChange_text = (e) =>{
    this.setState({
      input_text:e.target.value
    })
  }



  handleCreate = () =>{
    const { input_text,input_title, todos} = this.state;
    if(input_title === '' ){          
      return;
    }
    if(input_text === ''){
      return;
    }
    this.setState({
      input_text:'',
      input_title:'',
      todos:todos.concat({
        id: this.state.nextid++,
        text: input_text,
        title:input_title,
        checked: false,
      })
    });
  }

  handleKeyPress = (e) => {
    //눌려진 키가 enter면  handle Create 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
    ;
  }
  
  handleEdit = (id,text) =>{
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      text: text,
    };

    this.setState({
      todos: nextTodos
    });

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
    console.log("EditToggle",todos)

  }


  

  

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos:todos.filter(todo => todo.id !== id)
    });
  }


  render(){
    const { input_text,input_title, todos } = this.state;
    const {
      handleChange_text,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleChange_title,
      handleEdit
    } = this;



    return(
      <TodoListTemplate form={(
      <Form
        value_text= {input_text}
        value_title = {input_title}
        onKeyPress={handleKeyPress}
        onChange_text={handleChange_text}
        onChange_title={handleChange_title}
        onCreate={handleCreate}
      />
      )}>
      <TodoItemList todos={todos} onToggle = {handleToggle} onRemove ={handleRemove} onChange_text={handleChange_text} onChange_title={handleChange_title} onEdit={handleEdit}/>
      
        </TodoListTemplate>
    )
  }
}

export default App;
