import { useEffect, useMemo, useState } from 'react';
import { Card, Col, Input, Row, Tag, Typography, Tooltip, message, Badge, Modal, Button, Divider, Rate, Empty, Spin, Select } from 'antd';
import { CopyOutlined, CameraOutlined, PictureOutlined, VideoCameraOutlined, SoundOutlined, ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { aiTools } from '../data/aiTools';

const demoPrompts = [
  // Code Editing (3 prompts)
  {
    id: 'demo-1',
    title: 'Professional Code Refactoring',
    category: 'code',
    description: 'Refactor messy code into clean, maintainable, and well-documented functions with best practices.',
    difficulty: 'intermediate',
    tags: ['code', 'refactoring', 'optimization'],
    copyCount: 4521,

    useCases: ['Online courses', 'Documentation', 'Knowledge sharing'],
    aiTools: ['Claude', 'ChatGPT']
  },
];

const MEDIA_CATEGORIES = ['image', 'audio', 'video'];

function PromptDetailModal({ prompt, visible, onClose }) {
  // Always render modal so open/close behavior is consistent.
  // Render prompt details conditionally when available.

  const copyToClipboard = () => {
    if (!prompt) return;
    const text = `Prompt: ${prompt.title}\n\nDescription: ${prompt.description}`;
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  return (
    <Modal
      title={prompt?.title || 'Prompt Details'}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="copy" type="primary" icon={<CopyOutlined />} onClick={copyToClipboard} disabled={!prompt}>
          Copy Prompt
        </Button>,
      ]}
      width={900}
      style={{ maxHeight: '90vh' }}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <div className="space-y-6">
        {/* Main Description */}
        {prompt?.description && (
          <div>
            <Typography.Paragraph className="text-base">
              {prompt.description}
            </Typography.Paragraph>
            <Divider />
          </div>
        )}

        {/* Before/After Gallery */}
        {prompt?.media && prompt.category === 'image' && prompt.media.beforeImage && prompt.media.afterImage && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <CameraOutlined style={{ fontSize: 18, color: '#1890ff' }} />
              <Typography.Text strong>Before & After Example</Typography.Text>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7">
                <div className="rounded-lg overflow-hidden border" style={{ height: 260 }}>
                  <img src={prompt.media.beforeImage} alt="Before" className="w-full h-full object-cover" />
                </div>
                <Typography.Text type="secondary" className="block mt-2 text-sm">Before</Typography.Text>
              </div>
              <div className="col-span-5 flex flex-col gap-4">
                <div className="flex-1 rounded-lg overflow-hidden border" style={{ height: 160 }}>
                  <img src={prompt.media.afterImage} alt="After" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <Typography.Text type="secondary" className="text-sm">After</Typography.Text>
                  <Tag color="green">Edited</Tag>
                </div>
                {prompt.media.description && (
                  <Typography.Paragraph type="secondary" className="!mt-1 text-sm italic">
                    {prompt.media.description}
                  </Typography.Paragraph>
                )}
              </div>
            </div>
          </div>
        )}

        {prompt && prompt.category === 'video' && prompt.media?.videoUrl && (
          <div>
            <div className="flex items-center gap-2 mb-3"><VideoCameraOutlined style={{ color: '#722ed1' }} /><Typography.Text strong>Example Video</Typography.Text></div>
            <video src={prompt.media.videoUrl} controls style={{ width: '100%', borderRadius: 8 }} />
            {prompt.media.description && (
              <Typography.Paragraph type="secondary" className="!mt-3 text-sm italic">
                {prompt.media.description}
              </Typography.Paragraph>
            )}
          </div>
        )}

        {prompt && prompt.category === 'audio' && prompt.media?.audioUrl && (
          <div>
            <div className="flex items-center gap-2 mb-3"><SoundOutlined style={{ color: '#fa8c16' }} /><Typography.Text strong>Example Audio</Typography.Text></div>
            <audio src={prompt.media.audioUrl} controls style={{ width: '100%' }} />
            {prompt.media.description && (
              <Typography.Paragraph type="secondary" className="!mt-3 text-sm italic">
                {prompt.media.description}
              </Typography.Paragraph>
            )}
          </div>
        )}

        <Divider />

        {/* Metadata */}
        <div className="space-y-2">
          <div>
            <Typography.Text strong>Category:</Typography.Text>
            <Tag className="ml-2">{prompt?.category}</Tag>
          </div>
          <div>
            <Typography.Text strong>Difficulty:</Typography.Text>
            <Tag className="ml-2" color={prompt?.difficulty === 'beginner' ? 'green' : prompt?.difficulty === 'intermediate' ? 'blue' : 'red'}>
              {prompt?.difficulty}
            </Tag>
          </div>
          {prompt?.rating > 0 && (
            <div>
              <Typography.Text strong>Rating:</Typography.Text>
              <div className="ml-2">
                <Rate disabled value={prompt.rating} />
                <Typography.Text className="ml-2 text-xs text-slate-500">
                  {prompt.rating} ({prompt.ratingCount} reviews)
                </Typography.Text>
              </div>
            </div>
          )}
        </div>

        <Divider />

        {/* Use Cases */}
        {prompt?.useCases && prompt.useCases.length > 0 && (
          <div className="space-y-2">
            <Typography.Text strong>Best for:</Typography.Text>
            <div className="flex flex-wrap gap-2">
              {prompt.useCases.map((useCase, i) => (
                <Tag key={i}>{useCase}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* AI Tools */}
        {prompt?.aiTools && prompt.aiTools.length > 0 && (
          <div className="space-y-2">
            <Typography.Text strong>Works great with:</Typography.Text>
            <div className="flex flex-wrap gap-2">
              {prompt.aiTools.map((tool, i) => {
                const toolData = aiTools.llmProviders.find(t => t.name === tool) || 
                                 aiTools.codingTools.find(t => t.name === tool) ||
                                 aiTools.imageTools.find(t => t.name === tool);
                return (
                  <Tooltip key={i} title={`Open ${tool}`}>
                    <Tag
                      style={{ cursor: 'pointer' }}
                      onClick={() => toolData?.site && window.open(toolData.site, '_blank')}
                    >
                      {tool}
                    </Tag>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        {prompt?.tags && prompt.tags.length > 0 && (
          <div className="space-y-2">
            <Typography.Text type="secondary" className="text-sm">Tags: {prompt.tags.join(', ')}</Typography.Text>
          </div>
        )}
      </div>
    </Modal>
  );
}

function PromptCard({ prompt, onViewDetails }) {
  const copyToClipboard = (e) => {
    e.stopPropagation();
    const text = `${prompt.title}\n${prompt.description}`;
    navigator.clipboard.writeText(text);
    message.success('Copied!');
  };

  return (
    <Card
      hoverable
      onClick={() => onViewDetails(prompt)}
      cover={
        prompt.category === 'image' && prompt.media?.beforeImage ? (
          <div className="relative overflow-hidden h-40 flex">
            <div className="w-2/3 h-full overflow-hidden">
              <img src={prompt.media.beforeImage} alt={prompt.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
            </div>
            <div className="w-1/3 h-full border-l relative">
              <img src={prompt.media.afterImage || prompt.media.beforeImage} alt={`${prompt.title} after`} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-white/80 rounded px-2 py-1 text-xs font-medium flex items-center gap-2">
                <ArrowRightOutlined style={{ color: '#1890ff' }} />
                <span>After</span>
              </div>
            </div>
            {prompt.difficulty && (
              <Tag color={prompt.difficulty === 'beginner' ? 'green' : 'blue'} className="absolute top-2 right-2">
                {prompt.difficulty}
              </Tag>
            )}
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <Typography.Title level={3} className="!text-white !m-0">
              {CATEGORIES.find(c => c.value === prompt.category)?.label?.charAt(0) || '📋'}
            </Typography.Title>
          </div>
        )
      }
    >
      <div className="space-y-3">
        <div>
          <Typography.Title level={4} className="!mb-1">
            {prompt.title}
          </Typography.Title>
          <Typography.Text type="secondary" className="text-xs">
            {prompt.category}
          </Typography.Text>
        </div>

        <Typography.Paragraph className="!mb-3 text-sm line-clamp-2">
          {prompt.description}
        </Typography.Paragraph>

        {/* Rating */}
        {prompt.rating > 0 && (
          <div className="flex items-center gap-2">
            <Rate disabled size="small" value={prompt.rating} />
            <Typography.Text type="secondary" className="text-xs">
              ({prompt.ratingCount})
            </Typography.Text>
          </div>
        )}

        {/* Copy Count & Copy Button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Typography.Text type="secondary" className="text-xs">
            <Badge count={prompt.copyCount} style={{ backgroundColor: '#52c41a' }} /> copies
          </Typography.Text>
          <Button
            type="primary"
            size="small"
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
          >
            Copy
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function PromptGallery() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPromptsFromDB = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/prompts', { params: { limit: 100 } });
      if (Array.isArray(response.data) && response.data.length > 0) {
        setPrompts(response.data);
      }
    } catch (err) {
      console.log('PromptGallery: falling back to demo prompts', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromptsFromDB();
    (async () => {
      try {
        const res = await axios.get('/api/site/categories');
        if (Array.isArray(res.data)) setCategories(res.data);
      } catch (err) {
        console.warn('Failed to load categories', err?.message || err);
      }
    })();
  }, []);

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags?.some(t => t.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [prompts, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <Typography.Title level={2} className="!mb-2">✨ Prompt Gallery</Typography.Title>
        <Typography.Paragraph type="secondary">
          Explore thousands of AI prompts organized by category. View before/after examples and copy prompts instantly.
        </Typography.Paragraph>
      </div>

      {/* Search */}
      <Input.Search
        placeholder="Search prompts by title, tags, or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        size="large"
        className="max-w-2xl"
      />

      {/* Category Dropdown */}
      <div className="max-w-xs">
        <Typography.Text strong className="block mb-2">
          Filter by Category
        </Typography.Text>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: '100%' }}
          size="large"
          options={categories.length ? [{ label: 'All Prompts', value: 'all' }, ...categories.map(cat => ({ label: cat.label, value: cat.value }))] : [{ label: 'All Prompts', value: 'all' }]}
        />
      </div>

      {/* Results info */}
      <div className="flex justify-between items-center">
        <Typography.Text type="secondary">
          {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found
        </Typography.Text>
      </div>

      {/* Prompts Grid */}
      <Spin spinning={loading}>
        {filteredPrompts.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredPrompts.map((prompt) => (
              <Col key={prompt.id} xs={24} sm={12} md={8} lg={6}>
                    <PromptCard 
                      prompt={prompt}
                      onViewDetails={(p) => {
                        console.log('Prompt card clicked', p && p.id);
                        setSelectedPrompt(p);
                        setModalVisible(true);
                      }}
                    />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty 
            description="No prompts found"
            style={{ marginTop: 50 }}
          />
        )}
      </Spin>

      {/* Detail Modal */}
      <PromptDetailModal 
        prompt={selectedPrompt}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
