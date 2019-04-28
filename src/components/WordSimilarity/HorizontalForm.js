
import React from 'react';
import { Form, Input, Button, Alert } from 'antd';

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

    const word1Error = isFieldTouched('word1') && getFieldError('word1');
    const word2Error = isFieldTouched('word2') && getFieldError('word2');
    
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={word1Error ? 'error' : ''}
          help={word1Error || ''}
        >
          {getFieldDecorator('word1', {
            rules: [{ required: true, message: 'Please input a word!' }],
          })(
            <Input placeholder="Finland" />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={word2Error ? 'error' : ''}
          help={word2Error || ''}
        >
          {getFieldDecorator('word2', {
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
            Get similarity
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