import Label from './layout/Label';

import TextField from './fields/TextField';
import NumberField from './fields/NumberField';
import BooleanField from './fields/BooleanField';
import ObjectField from './fields/ObjectField';
import ArrayField from './fields/ArrayField';
import SelectField from './fields/SelectField';

var controls = {};

const RegisterControl = (type, component) => {
    controls[type] = component;
}

const GetComponentForType = (type) => {
    return controls[type];
};

RegisterControl('label', Label);
RegisterControl('text', TextField);
RegisterControl('number', NumberField);
RegisterControl('boolean', BooleanField);
RegisterControl('object', ObjectField);
RegisterControl('array', ArrayField);
RegisterControl('select', SelectField);

export { GetComponentForType, RegisterControl };