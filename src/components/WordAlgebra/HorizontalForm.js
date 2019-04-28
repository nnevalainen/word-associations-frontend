
import React from 'react';
import { Form, Input, Button, Icon } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {err: null};
  }
  
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitForm(values);
      } else {
        console.log(err);
      }

    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const plusWord1Error = isFieldTouched('plusWord1') && getFieldError('plusWord1');
    const plusWord2Error = isFieldTouched('pluWord2') && getFieldError('plusWord2');
    const minusWordError = isFieldTouched('minusWord') && getFieldError('minusWord')
    
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={plusWord1Error ? 'error' : ''}
          help={plusWord1Error || ''}
        >
          {getFieldDecorator('plusWord1', {
            rules: [{ required: true, message: 'Please input a word!' }],
          })(
            <Input placeholder="Finland" />
          )}
        </Form.Item>
        <Icon type="plus" />
        <Form.Item
          validateStatus={plusWord2Error ? 'error' : ''}
          help={plusWord2Error || ''}
        >
          {getFieldDecorator('plusWord2', {
            rules: [{ required: true, message: 'Please input a word!' }],
          })(
            <Input placeholder="Helsinki" />
          )}
        </Form.Item>
        <Icon type="minus" />
        <Form.Item
          validateStatus={minusWordError ? 'error' : ''}
          help={minusWordError || ''}
        >
          {getFieldDecorator('minusWord', {
            rules: [{ required: true, message: 'Please input a word!' }],
          })(
            <Input placeholder="Sweden" />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Get best matches
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalForm);

export {
  WrappedHorizontalLoginForm
}