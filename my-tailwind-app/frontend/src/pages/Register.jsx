import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form, Input, Typography, message, Alert } from 'antd';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    setError(null);
    try {
      const result = await register(values);
      setFeedback(`Account created. Verify your account with OTP: ${result.verificationToken}`);
      message.success('Account created successfully. Verify your account.');
      navigate('/verify', { state: { token: result.verificationToken } });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={3}>Create an account</Typography.Title>
        {feedback && <Alert message={feedback} type="success" className="mb-4" />}
        {error && <Alert message={error} type="error" className="mb-4" />}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Valid email is required' }]}> 
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required' },
              { min: 6, message: 'Password must be at least 6 characters.' }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match.'));
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Account
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph className="mt-4 text-center">
          Already registered? <Link to="/login">Login</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
