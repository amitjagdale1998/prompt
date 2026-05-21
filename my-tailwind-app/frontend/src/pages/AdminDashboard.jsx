import { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Statistic, Typography, Upload, message } from 'antd';
import axios from 'axios';

const { Dragger } = Upload;

export default function AdminDashboard() {
  const [imageFiles, setImageFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const beforeImageUpload = (file) => {
    setImageFiles((prev) => [...prev, file]);
    return false;
  };

  const beforePdfUpload = (file) => {
    setPdfFiles([file]);
    return false;
  };

  const removeImage = (file) => {
    setImageFiles((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const removePdf = () => {
    setPdfFiles([]);
  };

  const handleUpload = async (values) => {
    if (!values.promptText && !pdfFiles.length) {
      message.error('Please provide prompt text or upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title || values.promptText?.slice(0, 100));
    formData.append('category', values.category || 'General');
    formData.append('description', values.description || 'Uploaded by admin');

    if (values.promptText) {
      formData.append('promptText', values.promptText);
    }

    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    if (pdfFiles[0]) {
      formData.append('promptPdf', pdfFiles[0]);
    }

    try {
      setUploading(true);
      await axios.post('/api/admin/upload-files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Prompt and media uploaded successfully.');
      setImageFiles([]);
      setPdfFiles([]);
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.error || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Typography.Title level={2}>Admin Panel</Typography.Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft">
            <Statistic title="Prompts" value={42} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft">
            <Statistic title="Media Assets" value={18} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft">
            <Statistic title="Tags Managed" value={12} />
          </Card>
        </Col>
      </Row>
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={4}>Rapid prompt upload</Typography.Title>
        <Typography.Paragraph>
          Upload prompt text, multiple images, and a PDF containing prompt instructions. The system will store media and create prompt entries automatically.
        </Typography.Paragraph>
        <Form layout="vertical" onFinish={handleUpload}>
          <Form.Item label="Prompt title" name="title">
            <Input placeholder="Optional title for this prompt upload" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input placeholder="E.g. Image Editing, Audio Editing, Document Editing" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Optional prompt description or metadata" />
          </Form.Item>
          <Form.Item label="Prompt text" name="promptText">
            <Input.TextArea rows={5} placeholder="Enter prompt text or upload a PDF file instead" />
          </Form.Item>

          <Form.Item label="Upload images">
            <Dragger
              multiple
              beforeUpload={beforeImageUpload}
              fileList={imageFiles}
              onRemove={removeImage}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">Drag images here or click to select</p>
              <p className="ant-upload-text">You can upload multiple images for this prompt.</p>
            </Dragger>
          </Form.Item>

          <Form.Item label="Upload prompt PDF">
            <Dragger
              multiple={false}
              beforeUpload={beforePdfUpload}
              fileList={pdfFiles}
              onRemove={removePdf}
              accept="application/pdf"
            >
              <p className="ant-upload-drag-icon">Drag a PDF here or click to select</p>
              <p className="ant-upload-text">Upload a PDF containing prompt text or prompt definitions.</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={uploading} block>
              Upload Prompt and Media
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
