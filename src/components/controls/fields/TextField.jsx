import React, { useEffect } from 'react';

const TextField = (props) => {
    const { schema, value, OnChange } = props;

    const { ref, minlength, maxlength } = schema;

    let maxLength = maxlength ? maxlength : null;

    useEffect( () => {
        let minLength = minlength ? minlength : null;
        if(minLength!==null){
            if(value!==undefined && (value!=null && value.length>0) && value.length<minLength){
                OnChange(value, ref, ref, ['Minimum length is '+minLength]);
            }
        }
    }, [value, minlength, ref]);

    return <input type="text" value={value || ''} maxLength={maxLength} onChange={(e) => OnChange(e.target.value, schema.ref, schema.ref)} />;
};

export default TextField;