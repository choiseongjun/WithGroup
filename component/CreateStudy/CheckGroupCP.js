import * as React from 'react';
import {CheckBox} from 'react-native-elements';
export default function CheckGroupCP(props) {
  const {
    field,
    options,
    form: {setFieldValue},
  } = props;
  const onPress = (optionName, checked) => {
    if (checked) {
      setFieldValue(
        field.name,
        field.value.filter(x => x !== optionName),
      );
    } else {
      // [...["pool", "asd"], "aasjdfklas"]
      // ["asdfa", "dafs", "addsfs"]
      setFieldValue(field.name, [...field.value, optionName]);
    }
  };
  return (
    <React.Fragment>
      {options.map(option => {
        if (!field.value) field.value = [];
        const checked = field.value.includes(option);
        return (
          <CheckBox
            key={option}
            title={option}
            checked={checked}
            onPress={() => onPress(option, checked)}
          />
        );
      })}
    </React.Fragment>
  );
}
