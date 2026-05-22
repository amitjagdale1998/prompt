import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form, Input, Typography, message, Alert } from 'antd';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    setError(null);
    try {
      const result = await login(values);
      if (result.requiresVerification) {
        message.warning('Email verification is required. Please verify your account first.');
        navigate('/verify', { state: { token: result.verificationToken || '' } });
        return;
      }
      if (result.user?.role !== 'admin') {
        logout();
        setError('Admin login required. Please use an admin account.');
        return;
      }
      message.success('Admin login successful');
      navigate('/admin');
    } catch (err) {
      const data = err.response?.data;
      if (data?.requiresVerification) {
        message.warning('Email verification is required. Please verify your account first.');
        navigate('/verify', { state: { token: data.verificationToken || '' } });
        return;
      }
      setError(data?.error || 'Admin login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={3}>Admin Login</Typography.Title>
        {error && <Alert message={error} type="error" className="mb-4" />}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Valid email is required' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Admin Login
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph className="mt-4 text-center">
          Need an admin account? <Link to="/admin/register">Register here</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
