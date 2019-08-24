import React, { useRef, useEffect, useState } from 'react';

const JSONEditor = (props) => {
    const [editedSchema, setEditedSchema] = useState(JSON.stringify(props.json, null, 4));
    const [modifiedSchema, setModifiedSchema] = useState(JSON.stringify(props.json, null, 4));
    const [editError, setEditError] = useState(null);

    const schemaInputRef = useRef(null);

    useEffect( () => {
        ResizeSchemaInput();
    }, []);

    const ResizeSchemaInput = () => {
        if (schemaInputRef && schemaInputRef.current) {
            schemaInputRef.current.style.height = 'auto';
            schemaInputRef.current.style.height = (schemaInputRef.current.scrollHeight + 5) + 'px';
        }
    }

    const SetSchemaFromString = (str) => {
        let modSchema = null;

        try {
            modSchema = JSON.parse(str);
            setEditedSchema(str);
            setEditError(null);
        } catch (e) {
            console.log(e.toString());
            setEditedSchema(str);
            setEditError(e.toString());
            return;
        }

        setModifiedSchema(modSchema);

        if (props.OnChange)
            props.OnChange(modSchema);
    };

    const OnSchemaChanged = (e) => {
        SetSchemaFromString(e.target.value);
    };

    const OnEditBlur = (e) => {
        FormatEditedJson();
    };

    const FormatEditedJson = () => {
        if (editError == null) {
            try {
                var modSchema = JSON.parse(editedSchema);
                
                setEditedSchema(JSON.stringify(modSchema, null, 4));
            }
            catch (e) {
                console.log(e.toString());
            }            
        }
    };

    return (
        <div>
            {(editError && <p style={{color: 'red'}}>Invalid JSON: {editError}</p>)}
            <textarea style={{width: '100%'}} ref={schemaInputRef} value={editedSchema} onChange={OnSchemaChanged} onBlur={OnEditBlur} />
        </div>
    );
}

export default JSONEditor;
