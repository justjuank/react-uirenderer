import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

import immutable from 'object-path-immutable';

import SchemaRenderer from './SchemaRenderer';

export const UIRendererContext = createContext();

const UIRenderer = (props) => {
    const [data, setData] = useState(props.data);
    const [touched, setTouched] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [fieldValidation, setFieldValidation] = useState({});

    const OnChange = useCallback((value, ref, absoluteRef, validationRules) => {
        let isFieldValid = Object.values(validationRules).findIndex( x => x!==true) === -1;
        let newFieldValidations = {
            ...fieldValidation,
            [absoluteRef]: isFieldValid ? true : validationRules[0]
        }
        setFieldValidation(newFieldValidations);

        let isFormValid = Object.values(newFieldValidations).findIndex( x => x!==true) === -1;
        setFormValid(isFormValid);

        setData(immutable.set(data, ref, value));

        setTouched(true);
    }, [data, fieldValidation]);

    useEffect(()=> {
        if(props.OnChange){
            props.OnChange(data, formValid);
        }
    }, [data, formValid, props]);

    let formState = {
        validations: fieldValidation,
        touched: touched,
    }

    return (
        <div>
            <UIRendererContext.Provider value={formState}>
                <SchemaRenderer schema={props.schema} localData={data} data={data} OnChange={OnChange} />
            </UIRendererContext.Provider>
        </div>
    );
}

export const useContextValue = () => useContext(UIRendererContext);
export default UIRenderer;
