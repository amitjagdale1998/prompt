import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function UploadPrompt() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      message.info('Please login to upload prompts.');
      navigate('/login');
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      await axios.post('/api/prompts/upload-text', values);
      message.success('Prompt uploaded successfully.');
      navigate('/prompts');
    } catch (error) {
      message.error(error.response?.data?.error || 'Unable to upload prompt.');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={3}>Upload a new prompt</Typography.Title>
        <Typography.Paragraph>
          Share a prompt from your account so others can open it in AI tools and copy it directly.
        </Typography.Paragraph>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Prompt text" name="promptText" rules={[{ required: true, message: 'Prompt text is required' }]}> 
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Category is required' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Upload Prompt
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
