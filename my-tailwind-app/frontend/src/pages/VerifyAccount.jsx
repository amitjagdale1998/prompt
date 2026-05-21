import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Card, Form, Input, Typography, message, Alert } from 'antd';
import { useAuth } from '../context/AuthContext';

export default function VerifyAccount() {
  const location = useLocation();
  const { verifyAccount } = useAuth();
  const [token, setToken] = useState(location.state?.token || '');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.token) {
      verifyAccount(location.state.token)
        .then((result) => {
          if (result.success) {
            setStatus(result.message);
            message.success(result.message);
          }
        })
        .catch((err) => {
          setError(err.response?.data?.error || 'Verification failed.');
        });
    }
  }, [location.state, verifyAccount]);

  const onFinish = async () => {
    setError(null);
    try {
      const result = await verifyAccount(token);
      setStatus(result.message);
      message.success(result.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={3}>Verify your account</Typography.Title>
        {status && <Alert message={status} type="success" className="mb-4" />}
        {error && <Alert message={error} type="error" className="mb-4" />}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="OTP Code" name="token" rules={[{ required: true, message: 'OTP code is required' }]}> 
            <Input value={token} onChange={(e) => setToken(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Verify Account
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph className="mt-4 text-center">
          Back to <Link to="/login">Login</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
