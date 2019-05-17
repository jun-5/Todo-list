import React from 'react';
import './Form.css';

const Form = ({value_title,value_text, onChange_text,onChange_title, onCreate, onKeyPress}) => {
  return (
    <div className="form">
     {console.log(value_title,value_text)}
      <input value={value_title} onChange={onChange_title} onKeyPress={onKeyPress}/>
      <input value={value_text} onChange={onChange_text} onKeyPress={onKeyPress}/>
      <div className="create-button" onClick={onCreate}>
        +      
      </div>
    </div>
  );
};

export default Form;