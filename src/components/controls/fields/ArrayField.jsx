import React from 'react';

import objectPath from 'object-path';

import immutable from 'object-path-immutable';

import SchemaField from '../../controls/fields/SchemaField';

const ArrayField = (props) => {

    const { schema, data } = props;

    const AddItem = (item) => {
        var newArray = immutable.push(data, schema.ref, null);
        if(props.OnChange){
            props.OnChange(newArray);
        }
    };

    const DeleteItem = (itemIndex) => {
        var newArray = immutable.del(data, schema.ref + '.' +itemIndex);
        if(props.OnChange){
            props.OnChange(newArray);
        }
    };

    const arrayData = objectPath.get(data, schema.ref);

    var items = !arrayData ? null : arrayData.map( (item, index) => {
        let itemRef = schema.ref + '.' +index
        let newSchema = immutable.set(schema.items, 'ref', itemRef);
        return (
            <div style={{display: 'flex', flexDirection: 'row' }}>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '9' }}>
                    <SchemaField key={index} schema={newSchema} data={data} OnChange={props.OnChange} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flexFlow: 'column-reverse' }}>
                    <button onClick={() => DeleteItem(index)}>Delete</button>
                </div>                
            </div>
        );
    });

    return (
        <div style={{border: '1px solid #ccc', padding: '0.5rem'}}>
            <button onClick={AddItem}>Add Item</button>
            {items}
        </div>
    );
};

export default ArrayField;