import React from 'react';

import objectPath from 'object-path';

import immutable from 'object-path-immutable';

import SchemaField from '../../controls/fields/SchemaField';

const ArrayItem = (props) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row' }}>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: '9' }}>
                <SchemaField schema={props.newSchema} data={props.data} OnChange={props.OnChange} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flexFlow: 'column-reverse' }}>
                <button onClick={() => props.DeleteItem(props.index)}>Delete</button>
            </div>                
        </div>
    );
}

const ArrayField = (props) => {

    const { schema, data } = props;

    const OnEdit = (value, ref) => {
        let newData = immutable.set(data, ref, value);        
        OnChange(newData);
    };

    const OnChange = (newArrayValue) => {
        if(props.OnChange)
            props.OnChange(newArrayValue, props.schema.ref);
    };

    const AddItem = () => {
        var newArray = immutable.push(data, null, null);
        OnChange(newArray);
    };

    const DeleteItem = (itemIndex) => {
        var newArray = immutable.del(data, itemIndex);
        OnChange(newArray);
    };

    const arrayData = data;

    var items = !arrayData ? null : arrayData.map( (item, index) => {
        let itemRef = index;
        let newSchema = immutable.set(schema.items, 'ref', itemRef);
        return <ArrayItem key={index} index={index} newSchema={newSchema} data={item} OnChange={OnEdit} DeleteItem={DeleteItem} />;
    });

    return (
        <div style={{border: '1px solid #ccc', padding: '0.5rem'}}>
            <button onClick={AddItem}>Add Item</button>
            {items}
        </div>
    );
};

export default ArrayField;