import React, {Fragment} from 'react';

import {Button} from 'react-native-elements';
import TextCP from './CreateStudy/TextCP';
import CheckGroupCP from './CreateStudy/CheckGroupCP';
import PickerCP from './CreateStudy/PickerCP';
import ButtonGroupCP from './CreateStudy/ButtonGroupCP';
import PictureCP from './CreateStudy/PictureCP';
import * as yup from 'yup';
import {Formik, Field} from 'formik';
import {AsyncStorage} from 'react-native';

const createStudySchema = yup.object().shape({
  name: yup.string().required(), //텍스트
  userCount: yup.number().required(), //넘버숫자
  subject: yup.object({
    label: yup.string().required(),
    value: yup.string().required(),
  }), //콤보박스선택
  //area: yup.array().of(yup.object(yup.string())), //체크박스선택
  policy: yup.string().required(), //라디오버튼
  introduction: yup.string().max(200), //텍스트
  // mainPicture: yup.string(), //텍스트(추후그림추가)
});
const studyInitialValues = {
  name: '타이틀',
  userCount: '4',
  subject: {label: '자바', value: 'java'},
  area: [],
  policy: '',
  introduction: '설명',
  mainPicture: '',
};

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    data: photo.data,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export default class CreateStudy extends React.Component {
  // onClickCreate(values) {
  //   console.log(values);
  // }

  async onClickCreate(values) {
    let formData = new FormData();

    // console.log(values.mainPicture.data);
    // formData.append('title', values.name);
    // formData.append('intro', values.introduction);
    // formData.append('file', values.mainPicture.data);
    //let moim = {title: values.name, intro: values.introduction};

    await AsyncStorage.getItem('access_token')
      .then(value => {
        const token = value;
        // fetch('http://172.30.1.5:8080/rest/moimMake', {
        fetch('http://172.30.1.5:8080/rest/moimMake', {
          method: 'POST',
          headers: {
            dataType: 'json',
            Authorization: token,
          },
          body: createFormData(values.mainPicture, {
            title: values.name,
            intro: values.introduction,
          }),
        })
          .then(response => response.json())
          .then(response => {
            console.log('upload succes', response);
            this.props.navigation.navigate('Main');
          })
          .catch(error => {
            console.log('upload error', error);
          });
      })
      .done();

    // await axios({
    //   method: 'post',
    //   mode: 'no-cors',
    //   url: 'http://172.30.1.5:8080/rest/moimMake',
    //   headers: {'Content-Type': 'multipart/form-data'},
    //   data: formData,
    // })
    //   .then(res => {
    //     {
    //       console.log('pass');
    //       this.props.navigation.navigate('Main');
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e.message);
    //   });

    // axios
    //   .post(`http://172.30.1.43:8080/rest/moimMake`, {
    //     title: values.name,
    //     intro: values.introduction,
    //   })
    //   .then(res => {
    //     {
    //       console.log('pass');
    //       this.props.navigation.navigate('Main');
    //     }
    //   });
    //172.30.1.43:8080/rest/moimMake
    // @RequestPart(name = "file", required = false) MultipartFile file
    //title,intro
    //the request doesn't contain a multipart/form-data or multipart/mixed stream, content type header is application/json;charset=utf-8
  }
  render() {
    return (
      <Formik
        initialValues={studyInitialValues}
        // onSubmit={values => console.log(JSON.stringify(values))}
        // Alert.alert(JSON.stringify(values))}
        validationSchema={createStudySchema}>
        {props => (
          <Fragment>
            <Field
              name="name"
              placeholder="모임이름"
              component={TextCP}
              containerStyle={{width: '100%'}}
              autoCapitalize="none"
              {...props}
            />
            <Field
              name="userCount"
              placeholder="모임 인원수"
              component={TextCP}
              containerStyle={{width: '100%'}}
              keyboardType="numeric"
              {...props}
            />

            <Field
              name="subject"
              component={PickerCP}
              containerStyle={{width: '100%'}}
              items={[
                {label: '자바', value: 'java'},
                {label: '씨언어', value: 'clang'},
                {label: '파이썬', value: 'python'},
                {label: '프로그래밍', value: 'programing'},
              ]}
              {...props}
            />

            <Field
              name="area"
              options={['서울', '경기도']}
              component={CheckGroupCP}
              {...props}
            />

            <Field
              name="policy"
              placeholder="모임 정책"
              component={ButtonGroupCP}
              buttons={['everybody', '방장권한']}
              containerStyle={{width: '100%'}}
              autoCapitalize="none"
              {...props}
            />

            <Field
              name="introduction"
              placeholder="모임 설명"
              component={TextCP}
              containerStyle={{width: '100%'}}
              autoCapitalize="none"
              {...props}
            />
            <Field
              name="mainPicture"
              placeholder="모임 사진"
              component={PictureCP}
              containerStyle={{width: '100%'}}
              autoCapitalize="none"
              {...props}
            />

            <Button
              title="Sign In"
              //disabled={!props.isValid}
              //onPress={(props.handleSubmit)}
              onPress={() => {
                // console.log(JSON.stringify(props.values));
                this.onClickCreate(props.values);
              }}
            />
          </Fragment>
        )}
      </Formik>
    );
  }
}
