import React, {useState} from 'react';
import {Picker} from 'react-native';
export default function PickerCP(props) {
  const {
    field,
    items,
    form: {setFieldValue},
  } = props;
  const [pickerValue, setPickerValue] = useState('');
  return (
    <React.Fragment>
      <Picker
        selectedValue={pickerValue}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) => {
          field.value = items[itemIndex];
          setFieldValue(field.name, field.value);
          setPickerValue(itemValue);
        }}>
        {items.map(item => {
          return <Picker.Item label={item.label} value={item.value} />;
        })}
      </Picker>
    </React.Fragment>
  );
}
