import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
  Upload,
  message,
} from 'antd';
import { DeleteOutlined, EditOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useThemeMode } from '../context/ThemeContext';

const { Dragger } = Upload;

export default function AdminDashboard() {
  const { isDark } = useThemeMode();
  const [dashboard, setDashboard] = useState({ prompts: 0, mediaAssets: 0, tags: 0 });
  const [prompts, setPrompts] = useState([]);
  const [users, setUsers] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [promptSearch, setPromptSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const [promptForm] = Form.useForm();
  const [userForm] = Form.useForm();

  const loadDashboard = async () => {
    const response = await axios.get('/api/admin');
    setDashboard(response.data.dashboard);
  };

  const loadPrompts = async (q = '') => {
    const response = await axios.get('/api/admin/prompts', { params: { q } });
    setPrompts(response.data);
  };

  const loadUsers = async () => {
    const response = await axios.get('/api/admin/users');
    setUsers(response.data);
  };

  const loadMedia = async () => {
    const response = await axios.get('/api/admin/media');
    setMediaItems(response.data);
  };

  const refreshAll = async () => {
    try {
      setLoading(true);
      await Promise.all([loadDashboard(), loadPrompts(promptSearch), loadUsers(), loadMedia()]);
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

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
      await refreshAll();
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.error || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const openPromptEdit = (prompt) => {
    setEditingPrompt(prompt);
    promptForm.setFieldsValue({
      title: prompt.title,
      category: prompt.category,
      description: prompt.description,
      status: prompt.status,
      copyCount: prompt.copyCount,
      tags: (prompt.tags || []).join(', '),
    });
  };

  const savePrompt = async () => {
    try {
      const values = await promptForm.validateFields();
      setSaving(true);
      await axios.patch(`/api/admin/prompts/${editingPrompt.id || editingPrompt._id}`, {
        ...values,
        tags: values.tags
          ? values.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      });
      message.success('Prompt updated');
      setEditingPrompt(null);
      await refreshAll();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(error.response?.data?.error || 'Failed to update prompt');
    } finally {
      setSaving(false);
    }
  };

  const deletePrompt = async (id) => {
    try {
      await axios.delete(`/api/admin/prompts/${id}`);
      message.success('Prompt deleted');
      await refreshAll();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to delete prompt');
    }
  };

  const openUserEdit = (user) => {
    setEditingUser(user);
    userForm.setFieldsValue({
      name: user.name,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
    });
  };

  const saveUser = async () => {
    try {
      const values = await userForm.validateFields();
      setSaving(true);
      await axios.patch(`/api/admin/users/${editingUser.id || editingUser._id}`, values);
      message.success('User updated');
      setEditingUser(null);
      await refreshAll();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(error.response?.data?.error || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      message.success('User deleted');
      await refreshAll();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to delete user');
    }
  };

  const deleteMedia = async (id) => {
    try {
      await axios.delete(`/api/admin/media/${id}`);
      message.success('Media deleted');
      await refreshAll();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to delete media');
    }
  };

  const promptColumns = useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (value) => <span className="font-semibold text-slate-800">{value}</span>,
      },
      { title: 'Category', dataIndex: 'category', key: 'category' },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value) => (
          <Tag color={value === 'published' ? 'green' : value === 'archived' ? 'red' : 'gold'}>{value}</Tag>
        ),
      },
      { title: 'Copies', dataIndex: 'copyCount', key: 'copyCount', width: 110 },
      {
        title: 'Actions',
        key: 'actions',
        width: 160,
        render: (_, row) => (
          <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => openPromptEdit(row)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete this prompt?"
              description="This also deletes linked media records."
              onConfirm={() => deletePrompt(row.id || row._id)}
            >
              <Button danger size="small" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  const userColumns = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (value) => <Tag color={value === 'admin' ? 'purple' : 'blue'}>{value}</Tag>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value) => <Tag color={value === 'active' ? 'green' : 'red'}>{value}</Tag>,
      },
      {
        title: 'Verified',
        dataIndex: 'isVerified',
        key: 'isVerified',
        render: (value) => (value ? <Tag color="green">Yes</Tag> : <Tag color="orange">No</Tag>),
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 170,
        render: (_, row) => (
          <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => openUserEdit(row)}>
              Edit
            </Button>
            <Popconfirm title="Delete user?" onConfirm={() => deleteUser(row.id || row._id)}>
              <Button danger size="small" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  const mediaColumns = useMemo(
    () => [
      {
        title: 'Preview',
        key: 'preview',
        width: 140,
        render: (_, row) => (
          <Image
            src={row.url}
            width={92}
            height={56}
            style={{ objectFit: 'cover', borderRadius: 8 }}
            fallback="https://placehold.co/92x56?text=Media"
          />
        ),
      },
      { title: 'Type', dataIndex: 'type', key: 'type', width: 150 },
      { title: 'URL', dataIndex: 'url', key: 'url', ellipsis: true },
      {
        title: 'Actions',
        key: 'actions',
        width: 120,
        render: (_, row) => (
          <Popconfirm title="Delete media item?" onConfirm={() => deleteMedia(row.id || row._id)}>
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Typography.Title level={2} className={`!mb-0 ${isDark ? '!text-slate-100' : '!text-slate-900'}`}>
            Admin Control Center
          </Typography.Title>
          <Typography.Text className={isDark ? '!text-slate-300' : ''}>
            Manage prompts, users, and media from one place. Changes are applied directly to the database.
          </Typography.Text>
        </div>
        <Button
          icon={<ReloadOutlined />}
          onClick={refreshAll}
          loading={loading}
          className={isDark ? '!bg-slate-800 !text-slate-100 !border-slate-700' : ''}
        >
          Refresh
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            className={
              isDark
                ? 'rounded-2xl border border-slate-700 bg-slate-900/60'
                : 'rounded-2xl border border-slate-200 bg-white'
            }
          >
            <Statistic title="Prompts" value={dashboard.prompts} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            className={
              isDark
                ? 'rounded-2xl border border-slate-700 bg-slate-900/60'
                : 'rounded-2xl border border-slate-200 bg-white'
            }
          >
            <Statistic title="Media Assets" value={dashboard.mediaAssets} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            className={
              isDark
                ? 'rounded-2xl border border-slate-700 bg-slate-900/60'
                : 'rounded-2xl border border-slate-200 bg-white'
            }
          >
            <Statistic title="Tags Managed" value={dashboard.tags} />
          </Card>
        </Col>
      </Row>

      <Card
        className={
          isDark
            ? 'rounded-2xl border border-slate-700 bg-slate-900/70'
            : 'rounded-2xl border border-slate-200 bg-white'
        }
        bodyStyle={{ paddingTop: 8 }}
      >
        <Tabs
          items={[
            {
              key: 'prompts',
              label: 'Prompts',
              children: (
                <Space direction="vertical" size="middle" className="w-full">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search title/category/tags"
                      value={promptSearch}
                      onChange={(e) => setPromptSearch(e.target.value)}
                      onPressEnter={() => loadPrompts(promptSearch)}
                    />
                    <Button onClick={() => loadPrompts(promptSearch)}>Search</Button>
                  </div>
                  <Table
                    rowKey={(row) => row.id || row._id}
                    dataSource={prompts}
                    columns={promptColumns}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 920 }}
                  />
                </Space>
              ),
            },
            {
              key: 'users',
              label: 'Users',
              children: (
                <Table
                  rowKey={(row) => row.id || row._id}
                  dataSource={users}
                  columns={userColumns}
                  loading={loading}
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 980 }}
                />
              ),
            },
            {
              key: 'media',
              label: 'Media',
              children: (
                <Table
                  rowKey={(row) => row.id || row._id}
                  dataSource={mediaItems}
                  columns={mediaColumns}
                  loading={loading}
                  pagination={{ pageSize: 8 }}
                  scroll={{ x: 880 }}
                />
              ),
            },
            {
              key: 'upload',
              label: 'Upload',
              children: (
                <>
                  <Typography.Title level={4}>Rapid Prompt Upload</Typography.Title>
                  <Typography.Paragraph>
                    Upload prompt text, multiple images, and an optional PDF. This flow creates records directly in
                    the DB and links uploaded media.
                  </Typography.Paragraph>
                  <Form layout="vertical" onFinish={handleUpload}>
                    <Form.Item label="Prompt title" name="title">
                      <Input placeholder="Optional title for this prompt upload" />
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                      <Input placeholder="E.g. Image Editing, Audio Editing, Coding" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                      <Input.TextArea rows={3} placeholder="Optional prompt description" />
                    </Form.Item>
                    <Form.Item label="Prompt text" name="promptText">
                      <Input.TextArea rows={5} placeholder="Enter prompt text or upload a PDF instead" />
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
                        <p className="ant-upload-text">Upload multiple image references for this prompt.</p>
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
                        <p className="ant-upload-text">Optional: extract text from PDF if prompt text is empty.</p>
                      </Dragger>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" loading={uploading} block>
                        Upload Prompt and Media
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="Edit Prompt"
        open={!!editingPrompt}
        onCancel={() => setEditingPrompt(null)}
        onOk={savePrompt}
        confirmLoading={saving}
        okText="Save"
        okButtonProps={{ icon: <SaveOutlined /> }}
      >
        <Form form={promptForm} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true, min: 3 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, min: 2 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
                { label: 'Archived', value: 'archived' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Tags (comma separated)" name="tags">
            <Input />
          </Form.Item>
          <Form.Item label="Copy Count" name="copyCount" rules={[{ required: true }]}>
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit User"
        open={!!editingUser}
        onCancel={() => setEditingUser(null)}
        onOk={saveUser}
        confirmLoading={saving}
        okText="Save"
      >
        <Form form={userForm} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, min: 2 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select options={[{ label: 'User', value: 'user' }, { label: 'Admin', value: 'admin' }]} />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select options={[{ label: 'Active', value: 'active' }, { label: 'Suspended', value: 'suspended' }]} />
          </Form.Item>
          <Form.Item label="Verified" name="isVerified" rules={[{ required: true }]}>
            <Select options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
