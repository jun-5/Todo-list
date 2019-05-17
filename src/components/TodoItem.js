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
            time:'',
            title:'',
            edit:false   
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange_title = this.handleChange_title.bind(this);
        this.handleChange_text = this.handleChange_text.bind(this);
        this.handleChange_time = this.handleChange_time.bind(this);

        this.handleId = this.handleId.bind(this);
    
    }

    handleToggle() {
        if(!this.state.edit){
            this.setState({
                text:this.props.text,
                title:this.props.title
            });
        }else{
            this.handleEdit()
        }

        this.setState({
            edit:!this.state.edit
        })
        
    }
    

    handleEdit() {
        var a=new Date(this.state.time).getTime();
        var now=new Date().getTime();
        var distance = a-now;
        var d=Math.floor(distance/(1000*60*60*24));
        var h=Math.floor(distance%(1000*60*60*24)/(1000*60*60));
        console.log(this.state.time); 
        var ti="undefined";
        if(distance < 0 ){
            
             ti="기간 만료";
            
          }else{
            if(d===0){
                 ti="D-"+h+"hour"
              }
            else{
                ti="D-"+d
            }
          }
          console.log(ti);
        this.props.onEdit(this.state.id,this.state.text,this.state.title,ti)
    }

    
    handleChange_title(e) {  
    
        this.setState({
            title:e.target.value,
        });

       }
           
    handleChange_text(e) {  
    
        this.setState({
            text:e.target.value,
        });

       }


    handleChange_time(e) {  
    
        this.setState({
            time:e.target.value,
        });
       }

    
           
       

    handleId(id){
        this.setState({
            id:id
        });
    }
       



    render(){
        const { time ,title,text, checked, id, onToggle, onRemove} = this.props;
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
            
            <div className="title_out"> {"Title : "} {title} </div>
            <div className="text_out">{"Text : "}{text}</div>
            <div className="time_out">{"Time : "}{time}</div>
            
            </div>
            {
                checked && (<div className="check-mark" >✓</div>)
            }
        </div>
    );
        
    const edit2 = (
        <div className="todo-item" >

       <div className="edit" onClick={(e) => {
           //e.stopPropagation();
                                 //토글이 실행되지 않도록 함 
            this.handleChange_text(e);
            this.handleChange_title(e)
            this.handleChange_time(e);
            this.handleToggle() } 
        }>수정완료</div>

       
        <div>
            <p>
               <input
                type="title"
                text="title"
                placeholder={this.state.title}
               value={this.state.title}
               onChange={this.handleChange_title}
                />

                <input
                type="text"
                text="text"
                placeholder={this.state.text}
               value={this.state.text}
               onChange={this.handleChange_text}
                />
                  <input
                type="text"
                text="text"
                placeholder="2019-08-15//양식에 맞게"
               value={this.state.date}
               onChange={this.handleChange_time}
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