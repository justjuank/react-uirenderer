import React from 'react';

const NumberField = (props) => {
    const { schema } = props;

    const OnChange = (e) => {
        var value = e.target.value.length <= 0 ? null : (parseFloat(e.target.value));
        props.OnChange(value, schema.ref, schema.ref);
    }

    let max = schema.range ? schema.range.max : null;
    let min = schema.range ? schema.range.min : null;
    let step = schema.multipleOf ? schema.multipleOf : null;

    return <input type="number" value={props.value !== null ? props.value : ''} min={min} max={max} step={step} onChange={OnChange} />;
};

export default NumberField;