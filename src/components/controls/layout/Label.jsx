import React from 'react';

const Label = (props) => {
    const requiredToken = props.isRequired ? <span style={{color: 'red'}}> *</span> : null;
    return <label style={{display: props.labelInline ? 'inline' : 'block'}}>{props.children}{requiredToken}</label>;
};

export default Label;