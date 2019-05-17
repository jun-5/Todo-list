import React from 'react';
import './Form.css';
import { DatePicker } from 'antd';

const Form = ({value_title,value_text,value_time, onChange_text,onChange_title, onCreate, onKeyPress, onChange_time}) => {
  return (
    <div className="form">
     {console.log(value_title,value_text,value_time)}
      <input value={value_title} onChange={onChange_title} onKeyPress={onKeyPress} placeholder="제목을 입력해주세요" />
      <input value={value_text} onChange={onChange_text} onKeyPress={onKeyPress} placeholder="내용을 입력해주세요"/>      
      <DatePicker onChange={onChange_time}  placeholder="데드라인"  /> 

      
    <div className="create-button" onClick={onCreate}>
    +      
    </div>
  
  
    </div>
  );
};

export default Form;