import React from 'react';

const Label = (props) => {
    return <label style={{display: props.labelInline ? 'inline' : 'block'}}>{props.children}</label>;
};

export default Label;