import React, {useState} from 'react';
import {ButtonGroup, Text} from 'react-native-elements';
export default function ButtonGroupCP(props) {
  const {
    field,
    buttons,
    form: {setFieldValue},
  } = props;
  const [bGIndex, setBGIndex] = useState(0);

  return (
    <React.Fragment>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>구성원 모임 정책</Text>
      <ButtonGroup
        onPress={selectedIndex => {
          field.value = selectedIndex;
          setFieldValue(field.name, field.value);
          setBGIndex(selectedIndex);
        }}
        selectedIndex={bGIndex}
        buttons={buttons}
      />
    </React.Fragment>
  );
}
