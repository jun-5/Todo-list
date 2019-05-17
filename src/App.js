import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList'


class App extends Component{
  
  state={
    nextid:3,
    input_text:'',
    input_title:'',
    input_time:'',
    selectedId:4,
    todos: [
      { id:0, title:"제목1", text: '여기가 아이디', checked: false, time:'기간만료' },
      { id:1, title:"제목2",text: '부분 ', checked: true, time:'기간만료'},
      { id:2, title:"제목3",text: '입니다', checked: false, time:'기간만료'}
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

  
  
  handleChange_time =(dateString) =>{
    var a =new Date(dateString).getTime();
    var now=new Date().getTime();
    var distance = a-now;
    var d=Math.floor(distance/(1000*60*60*24));
    var h=Math.floor(distance%(1000*60*60*24)/(1000*60*60));
    if(distance < 0 ){
      this.setState({
        input_time:"기간 만료"
      });
    }else{
      if(d===0){
        this.setState({
          input_time:"D-"+h+"hour"
        });
      }
      else{
      this.setState({
      input_time:"D-"+d
        });}
      }
    console.log("xxxx",this.state.input_time);
  }



  handleCreate = () =>{
    const { input_time,input_text,input_title, todos} = this.state;
    if(input_title === '' ){          
      return;
    }
    if(input_text === ''){
      return;
    }
    if(input_time === ''){
      return;
    }
    this.setState({
      input_text:'',
      input_title:'',
      input_time:'',
      nextid:this.state.nextid+1,
      todos:todos.concat({
        id: this.state.nextid,
        text: input_text,
        title:input_title,
        checked: false,
        time: input_time
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
  
  handleEdit = (id,text,title,time) =>{
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      text: text,
      title: title,
      time: time
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
    console.log("this.state.time",this.state.input_time)

  }


  

  

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos:todos.filter(todo => todo.id !== id)
    });
  }


  render(){
    const { input_text,input_title,input_time, todos } = this.state;
    const {
      handleChange_text,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleChange_title,
      handleEdit,
      handleChange_time
      
    } = this;

    return(
      
      <TodoListTemplate form={(
      <Form
        value_text= {input_text}
        value_title = {input_title}
        value_time = {input_time}
        onKeyPress={handleKeyPress}
        onChange_text={handleChange_text}
        onChange_title={handleChange_title}
        onCreate={handleCreate}
        onChange_time={handleChange_time}
      />
      )}>
      <TodoItemList todos={todos} onToggle = {handleToggle} onRemove ={handleRemove} onChange_text={handleChange_text} onChange_title={handleChange_title} onEdit={handleEdit}/>
      
        </TodoListTemplate>
    );
  }
}

export default App;