import React from 'react';

import immutable from 'object-path-immutable';

import SchemaField from '../../controls/fields/SchemaField';

const ArrayItem = (props) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row' }}>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: '9' }}>
                <SchemaField schema={props.newSchema} localData={props.localData} data={props.data} parentRef={props.parentRef} OnChange={props.OnChange} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flexFlow: 'column-reverse' }}>
                <button onClick={() => props.DeleteItem(props.index)}>Delete</button>
            </div>
        </div>
    );
}

const ArrayField = (props) => {

    const { schema, localData, data } = props;
    
    const OnChange = (newArrayValue, absoluteRef, validations) => {
        let itemFullRef = absoluteRef===undefined ? props.schema.ref : [props.schema.ref, absoluteRef].join('.')

        console.log(itemFullRef);
        if(props.OnChange)
            props.OnChange(newArrayValue, props.schema.ref, itemFullRef, validations);
    };

    const OnEdit = (value, ref, absoluteRef, validations) => {
        let newData = immutable.set(localData, ref, value);

        OnChange(newData, absoluteRef, validations);
    };

    const AddItem = () => {
        var newArray = immutable.push(localData, null, null);
        OnChange(newArray, newArray.length-1);
    };

    const DeleteItem = (itemIndex) => {
        var newArray = immutable.del(localData, itemIndex);
        OnChange(newArray, itemIndex);
    };

    var items = !localData ? null : localData.map( (item, index) => {
        let itemRef = index;
        let newSchema = immutable.set(schema.items, 'ref', itemRef);
        return <ArrayItem key={index} index={index} newSchema={newSchema} parentRef={props.parentRef} localData={item} data={data} OnChange={OnEdit} DeleteItem={DeleteItem} />;
    });

    return (
        <div style={{border: '1px solid #ccc', padding: '0.5rem'}}>
            <button onClick={AddItem}>Add Item</button>
            {items}
        </div>
    );
};

export default ArrayField;