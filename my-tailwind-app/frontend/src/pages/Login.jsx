import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form, Input, Typography, message, Alert } from 'antd';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    setError(null);
    try {
      const result = await login(values);
      if (result.requiresVerification || result.error === 'Email verification required before login.') {
        message.warning('Email verification is required. Please verify your account first.');
        navigate('/verify', { state: { token: result.verificationToken || '' } });
        return;
      }
      message.success('Login successful');
      navigate('/prompts');
    } catch (err) {
      const data = err.response?.data;
      if (data?.requiresVerification) {
        message.warning('Email verification is required. Please verify your account first.');
        navigate('/verify', { state: { token: data.verificationToken || '' } });
        return;
      }
      setError(data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={3}>Login to Prompt Lab</Typography.Title>
        {error && <Alert message={error} type="error" className="mb-4" />}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}> 
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph className="mt-4 text-center">
          New here? <Link to="/register">Create an account</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
