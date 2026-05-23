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
import { DeleteOutlined, EditOutlined, ReloadOutlined, SaveOutlined, CameraOutlined, PictureOutlined, UploadOutlined, PlusOutlined, ImportOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useThemeMode } from '../context/ThemeContext';
import axios from 'axios';

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
  const [imageBeforeFile, setImageBeforeFile] = useState(null);
  const [imageAfterFile, setImageAfterFile] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  // Bulk upload state
  const [bulkJsonInput, setBulkJsonInput] = useState('');
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  const [bulkResults, setBulkResults] = useState([]);

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
    (async () => {
      try {
        const res = await axios.get('/api/site/categories');
        if (Array.isArray(res.data)) setCategories(res.data);
      } catch (err) {
        console.warn('Failed to load categories', err?.message || err);
      }
    })();
  }, []);

  const beforeImageUpload = (file) => {
    // legacy: keep list if multiple images provided
    setImageFiles((prev) => [...prev, file]);
    return false;
  };

  const beforeImageBeforeUpload = (file) => {
    setImageBeforeFile(file);
    return false;
  };

  const beforeImageAfterUpload = (file) => {
    setImageAfterFile(file);
    return false;
  };

  const beforePdfUpload = (file) => {
    setPdfFiles([file]);
    return false;
  };

  const beforeVideoUpload = (file) => {
    setVideoFiles([file]);
    return false;
  };

  const beforeAudioUpload = (file) => {
    setAudioFiles([file]);
    return false;
  };

  const removeImage = (file) => {
    setImageFiles((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const removeImageBefore = () => setImageBeforeFile(null);
  const removeImageAfter = () => setImageAfterFile(null);

  const removePdf = () => {
    setPdfFiles([]);
  };

  const removeVideo = () => setVideoFiles([]);
  const removeAudio = () => setAudioFiles([]);

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

    if (uploadCategory === 'image') {
      // support dedicated before/after slots
      if (imageBeforeFile) formData.append('beforeImage', imageBeforeFile);
      if (imageAfterFile) formData.append('afterImage', imageAfterFile);
      // legacy: allow multiple images as well
      imageFiles.forEach((file) => formData.append('images', file));
    }

    if (uploadCategory === 'video' && videoFiles[0]) {
      formData.append('video', videoFiles[0]);
    }

    if (uploadCategory === 'audio' && audioFiles[0]) {
      formData.append('audio', audioFiles[0]);
    }

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
      setVideoFiles([]);
      setAudioFiles([]);
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

  // Bulk upload handler for multiple prompts from JSON
  const handleBulkUpload = async () => {
    try {
      if (!bulkJsonInput.trim()) {
        message.error('Please paste JSON data');
        return;
      }
      const data = JSON.parse(bulkJsonInput);
      const prompts = Array.isArray(data) ? data : [data];
      
      if (!prompts.length) {
        message.error('No valid prompts found in JSON');
        return;
      }

      setBulkUploading(true);
      setBulkProgress({ current: 0, total: prompts.length });
      setBulkResults([]);

      const results = [];
      for (let i = 0; i < prompts.length; i++) {
        try {
          const prompt = prompts[i];
          const payload = {
            title: prompt.title || prompt.promptText?.slice(0, 100) || `Prompt ${i + 1}`,
            category: prompt.category || 'code',
            description: prompt.description || prompt.promptText || '',
            promptText: prompt.promptText || '',
            tags: Array.isArray(prompt.tags) ? prompt.tags : [],
            status: prompt.status || 'published',
            difficulty: prompt.difficulty || 'beginner',
            useCases: Array.isArray(prompt.useCases) ? prompt.useCases : [],
            aiTools: Array.isArray(prompt.aiTools) ? prompt.aiTools : [],
            rating: prompt.rating || 0,
            ratingCount: prompt.ratingCount || 0,
            copyCount: prompt.copyCount || 0,
          };

          const res = await axios.post('/api/prompts/upload-text', payload, {
            headers: { 'Content-Type': 'application/json' },
          });
          
          results.push({ success: true, title: payload.title, id: res.data.prompt?._id });
          setBulkProgress((prev) => ({ ...prev, current: i + 1 }));
        } catch (err) {
          results.push({ success: false, title: prompts[i].title || `Prompt ${i + 1}`, error: err.response?.data?.error || err.message });
          setBulkProgress((prev) => ({ ...prev, current: i + 1 }));
        }
      }

      setBulkResults(results);
      const successCount = results.filter((r) => r.success).length;
      message.success(`Uploaded ${successCount}/${prompts.length} prompts`);
      await refreshAll();
    } catch (err) {
      message.error('Invalid JSON format. Please provide an array of prompt objects.');
    } finally {
      setBulkUploading(false);
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
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
                      <Select placeholder="Select a category" options={categories} onChange={(val) => setUploadCategory(val)} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                      <Input.TextArea rows={3} placeholder="Optional prompt description" />
                    </Form.Item>
                    <Form.Item label="Prompt text" name="promptText">
                      <Input.TextArea rows={5} placeholder="Enter prompt text or upload a PDF instead" />
                    </Form.Item>

                    {uploadCategory === 'image' && (
                      <>
                        <Form.Item label="Before image (original)">
                          <Dragger
                            multiple={false}
                            beforeUpload={beforeImageBeforeUpload}
                            fileList={imageBeforeFile ? [imageBeforeFile] : []}
                            onRemove={removeImageBefore}
                            accept="image/*"
                          >
                            <div className="flex items-center gap-3">
                              <CameraOutlined style={{ fontSize: 22, color: '#1890ff' }} />
                              <div>
                                <p className="ant-upload-text">Upload the original (before) image</p>
                                <p className="ant-upload-hint text-sm">Single image representing the original state.</p>
                              </div>
                            </div>
                          </Dragger>
                        </Form.Item>

                        <Form.Item label="After image (edited)">
                          <Dragger
                            multiple={false}
                            beforeUpload={beforeImageAfterUpload}
                            fileList={imageAfterFile ? [imageAfterFile] : []}
                            onRemove={removeImageAfter}
                            accept="image/*"
                          >
                            <div className="flex items-center gap-3">
                              <PictureOutlined style={{ fontSize: 22, color: '#13c2c2' }} />
                              <div>
                                <p className="ant-upload-text">Upload the edited (after) image</p>
                                <p className="ant-upload-hint text-sm">Single image showing the edited result.</p>
                              </div>
                            </div>
                          </Dragger>
                        </Form.Item>
                      </>
                    )}

                    {uploadCategory === 'video' && (
                      <Form.Item label="Upload video">
                        <Dragger
                          multiple={false}
                          beforeUpload={beforeVideoUpload}
                          fileList={videoFiles}
                          onRemove={removeVideo}
                          accept="video/*"
                        >
                          <p className="ant-upload-drag-icon">Drag a video here or click to select</p>
                          <p className="ant-upload-text">Upload a single video file for this prompt.</p>
                        </Dragger>
                      </Form.Item>
                    )}

                    {uploadCategory === 'audio' && (
                      <Form.Item label="Upload audio">
                        <Dragger
                          multiple={false}
                          beforeUpload={beforeAudioUpload}
                          fileList={audioFiles}
                          onRemove={removeAudio}
                          accept="audio/*"
                        >
                          <p className="ant-upload-drag-icon">Drag an audio file here or click to select</p>
                          <p className="ant-upload-text">Upload a single audio file for this prompt.</p>
                        </Dragger>
                      </Form.Item>
                    )}

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
            {
              key: 'bulk-upload',
              label: '🚀 Bulk Upload',
              children: (
                <div className="space-y-6">
                  <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}>
                    <Typography.Title level={4} className="!mb-4">
                      <ImportOutlined className="mr-2" />
                      Import Multiple Prompts
                    </Typography.Title>
                    <Typography.Paragraph>
                      Paste JSON data with multiple prompt objects. Each prompt will be uploaded to the database.
                    </Typography.Paragraph>
                    <Typography.Paragraph type="secondary" className="text-sm">
                      <strong>JSON Format Example:</strong>
                      <pre className={`mt-2 p-3 rounded text-xs overflow-auto ${isDark ? 'bg-slate-900' : 'bg-white border'}`}>
{`[
  {
    "title": "Prompt Title",
    "category": "code",
    "description": "Description",
    "promptText": "Your prompt text...",
    "tags": ["tag1", "tag2"],
    "difficulty": "beginner",
    "useCases": ["use case 1"],
    "aiTools": ["ChatGPT"],
    "copyCount": 100,
    "rating": 4.5,
    "ratingCount": 50
  }
]`}
                      </pre>
                    </Typography.Paragraph>
                  </Card>

                  <Form layout="vertical">
                    <Form.Item label="Paste JSON Data">
                      <Input.TextArea
                        rows={12}
                        placeholder="Paste JSON array of prompts here..."
                        value={bulkJsonInput}
                        onChange={(e) => setBulkJsonInput(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        size="large"
                        icon={<ImportOutlined />}
                        onClick={handleBulkUpload}
                        loading={bulkUploading}
                        block
                      >
                        Upload {bulkProgress.total > 0 ? `(${bulkProgress.current}/${bulkProgress.total})` : 'Prompts'}
                      </Button>
                    </Form.Item>
                  </Form>

                  {bulkProgress.total > 0 && (
                    <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}>
                      <Typography.Title level={5} className="!mb-4">Upload Results</Typography.Title>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {bulkResults.map((result, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 rounded border">
                            {result.success ? (
                              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 18 }} />
                            ) : (
                              <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{result.title}</p>
                              {result.error && <p className="text-xs text-red-500">{result.error}</p>}
                              {result.id && <p className="text-xs text-green-600">ID: {result.id}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
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
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
            <Select placeholder="Select a category" options={categories} />
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
