import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Form, Input, Typography, message } from 'antd';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [devOtp, setDevOtp] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const requestOtp = async () => {
    setError(null);
    setStatus(null);
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      const result = await forgotPassword(email);
      setShowResetForm(true);
      setStatus(result.message || 'OTP sent to your email address.');
      setDevOtp(result.resetToken || '');
      message.success('If the email exists, OTP has been sent.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request OTP. Please try again.');
    }
  };

  const onResetFinish = async (values) => {
    setError(null);
    setStatus(null);
    try {
      const result = await resetPassword({
        email,
        token: values.token,
        password: values.password,
      });
      message.success(result.message || 'Password reset successful.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Password reset failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={3}>Forgot Password</Typography.Title>

        {status && <Alert message={status} type="success" className="mb-4" />}
        {error && <Alert message={error} type="error" className="mb-4" />}
        {devOtp && (
          <Alert
            message={`Dev OTP: ${devOtp}`}
            type="info"
            className="mb-4"
            description="Development mode only. In production this OTP is sent to email only."
          />
        )}

        <Form layout="vertical" onFinish={requestOtp}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: 'email', required: true, message: 'Valid email is required' }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send OTP
            </Button>
          </Form.Item>
        </Form>

        {showResetForm && (
          <Form layout="vertical" onFinish={onResetFinish}>
            <Form.Item
              label="OTP Code"
              name="token"
              rules={[{ required: true, message: 'OTP code is required' }]}
            >
              <Input maxLength={6} />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: 'New password is required' },
                { min: 8, message: 'Password must be at least 8 characters.' },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your new password.' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match.'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        )}

        <Typography.Paragraph className="mt-4 text-center">
          Back to <Link to="/login">Login</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
