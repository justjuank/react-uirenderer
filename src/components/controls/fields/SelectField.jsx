import React, { Fragment } from 'react';

const Options = (props) => {

    var options = props.options.map( item => {
        return <option key={item.value} value={item.value}>{item.label}</option>
    })
    return(
        <Fragment>
            {options}
        </Fragment>
    )
}

const SelectField = (props) => {
    const { schema } = props;

    const OnChange = (e) => {
        var value = e.target.value.length <= 0 ? null : (parseFloat(e.target.value));
        props.OnChange(value, schema.ref, schema.ref);
    }

    return (
        <select value={props.value !== null ? props.value : ''} onChange={OnChange}>
            <Options options={schema.items} />
        </select>
        );
};

export default SelectField;