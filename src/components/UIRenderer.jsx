import React, { useEffect, useState, useCallback } from 'react';

import immutable from 'object-path-immutable';

import SchemaRenderer from './SchemaRenderer';

const UIRenderer = (props) => {
    const [data, setData] = useState(props.data);

    const OnChange = useCallback((value, ref) => {
        setData(immutable.set(data, ref, value));
    }, [data]);

    useEffect(()=> {
        if(props.OnChange){
            props.OnChange(data);
        }
    }, [data, props]);

    return (
        <div>
            <SchemaRenderer schema={props.schema} localData={data} data={data} OnChange={OnChange} />
        </div>
    );
}

export default UIRenderer;
