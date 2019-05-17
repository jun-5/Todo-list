import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component{
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.checked !== nextProps.checked;
    //   }
    constructor(props){
        super(props);

        this.state={
            id:1, 
            text:'',
            edit:false   
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleId = this.handleId.bind(this);
    
    }

    handleToggle() {
        if(!this.state.edit){
            this.setState({
                text:this.props.text
            });
        }else{
            this.handleEdit()
        }

        this.setState({
            edit:!this.state.edit
        })
        
    }
    

    handleEdit() {
        this.props.onEdit(this.state.id,this.state.text)
    }

    handleChange(e) {  
    
        this.setState({
            text:e.target.value
        });

        console.log(e.target);
        console.log(this.state.id);

       }

    handleId(id){
        this.setState({
            id:id
        });
    }
       



    render(){
        const { title,text, checked, id, onToggle, onRemove} = this.props;
        const details = (
            <div className="todo-item" onClick={()=> onToggle(id)}>

            <div className="remove" onClick={(e) => {
                e.stopPropagation();
                 //토글이 실행되지 않도록 함
                onRemove(id)}
            }>삭제</div>

        
           <div className="edit" onClick={(e) => {
                e.stopPropagation();
                 //토글이 실행되지 않도록 함 
                 this.handleId(id)
                this.handleToggle() } 
            }>수정</div>



            <div className={`todo-text ${checked && 'checked'}`}>
            
            <div className="title_out">{title}</div>
            <div className="text_out">{text}</div>
            
            </div>
            {
                checked && (<div className="check-mark" >✓</div>)
            }
        </div>
    );
        
    const edit2 = (
        <div className="todo-item" >

       <div className="edit" onClick={(e) => {
            e.stopPropagation();
                                 //토글이 실행되지 않도록 함 
            this.handleChange(e);
            this.handleToggle() } 
        }>수정완료</div>

       
        <div>
            <p>
                <input
                type="text"
                text="text"
                placeholder="text"
               value={this.state.text}
               onChange={this.handleChange}
                />
            </p>
        </div>
        
        
    </div>
);

        const view = this.state.edit? edit2 : details;
   
        return(
            view

       );

    }
}

export default TodoItem;