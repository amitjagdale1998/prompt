import { useEffect, useMemo, useState } from 'react';
import { Card, Col, Input, Row, Tag, Typography, Tooltip, message } from 'antd';
import axios from 'axios';
import aiTools from '../data/aiTools';

const fallbackPrompts = [
  {
    title: 'Audio Cleanup Prompt',
    category: 'Audio Editing',
    highlight: 'Improve clarity and remove background noise for voiceover tracks.',
    tags: ['audio', 'noise reduction', 'workflow']
  },
  {
    title: 'Document Rewrite Prompt',
    category: 'Document Editing',
    highlight: 'Convert technical notes into clear, user-friendly documentation.',
    tags: ['documentation', 'clarity', 'seo']
  },
  {
    title: 'AI Image Brief Prompt',
    category: 'Image Generation',
    highlight: 'Generate a structured prompt for modern product mockups or landing page visuals.',
    tags: ['image', 'design', 'marketing']
  }
];

export default function PromptGallery() {
  const [promptItems, setPromptItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPrompts() {
      setLoading(true);
      try {
        const response = await axios.get('/api/prompts');
        setPromptItems(response.data);
      } catch (error) {
        message.error('Unable to load prompts from the server. Showing sample prompts.');
        setPromptItems(fallbackPrompts);
      } finally {
        setLoading(false);
      }
    }

    loadPrompts();
  }, []);

  const filterPrompts = (prompts, query) => {
    if (!query) return prompts;
    const term = query.toLowerCase().trim();
    return prompts.filter((item) => {
      const text = `${item.title || ''} ${item.category || ''} ${item.description || item.highlight || ''} ${(item.tags || []).join(' ')}`.toLowerCase();
      return text.includes(term);
    });
  };

  const displayPrompts = loading || promptItems.length === 0 ? fallbackPrompts : promptItems;
  const visiblePrompts = useMemo(() => filterPrompts(displayPrompts, searchTerm), [displayPrompts, searchTerm]);

  const copyPromptText = async (promptText, id, showNotification = true) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promptText);
      } else {
        const ta = document.createElement('textarea');
        ta.value = promptText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      if (id && !id.toString().startsWith('fallback')) {
        await axios.post(`/api/prompts/${id}/copy`);
      }

      if (showNotification) {
        message.success('Prompt copied to clipboard.');
      }
    } catch (err) {
      console.error(err);
      message.error('Unable to copy prompt automatically.');
    }
  };

  const handleCopyAndOpen = async (toolUrl, promptText, id) => {
    try {
      await copyPromptText(promptText, id, false);
      window.open(toolUrl, '_blank');
      message.success('Prompt copied to clipboard and tool opened. Paste it there.');
    } catch (err) {
      console.error(err);
      message.error('Unable to open tool automatically.');
      window.open(toolUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Typography.Title level={2}>Prompt Gallery</Typography.Title>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search prompts by title, category, or keyword"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          allowClear
          className="max-w-xl"
        />
        <Typography.Text type="secondary">
          {visiblePrompts.length} result{visiblePrompts.length === 1 ? '' : 's'} found
        </Typography.Text>
      </div>
      <div className="card mb-4">
        <h3 className="text-base font-semibold mb-2">Try with an AI tool</h3>
        <div className="flex gap-3 flex-wrap">
          {aiTools.slice(0, 4).map((tool) => (
            <Tooltip key={tool.name} title={`Open ${tool.name} and paste prompt`}>
              <button
                onClick={() => {
                  const promptText = displayPrompts[0] ? `${displayPrompts[0].title}\n\n${displayPrompts[0].description || displayPrompts[0].highlight}` : '';
                  handleCopyAndOpen(tool.site, promptText, displayPrompts[0]?.id);
                }}
                className="p-2 bg-white rounded shadow-sm border"
                aria-label={`Open ${tool.name}`}
              >
                <img src={tool.logo} alt={tool.name} style={{ height: 32, objectFit: 'contain' }} />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
      <Row gutter={[24, 24]}>
        {visiblePrompts.length ? visiblePrompts.map((item) => (
          <Col key={item.id || item.title} xs={24} md={12} xl={8}>
            <Card title={item.title} className="rounded-3xl shadow-soft" bordered={false} loading={loading}>
              <div className="mb-4 text-slate-500">{item.category}</div>
              <Typography.Paragraph>{item.description || item.highlight}</Typography.Paragraph>
              <div className="flex flex-wrap gap-2 mt-4">
                {(item.tags || []).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                  onClick={() => {
                    const promptText = `${item.title}\n\n${item.description || item.highlight}`;
                    copyPromptText(promptText, item.id);
                  }}
                >
                  Copy Prompt
                </button>
                <div className="flex gap-2 flex-wrap">
                  {aiTools.slice(0, 4).map((tool) => (
                    <Tooltip key={tool.name} title={`Open ${tool.name} and paste prompt`}>
                      <button
                        onClick={() => handleCopyAndOpen(tool.site, `${item.title}\n\n${item.description || item.highlight}`, item.id)}
                        className="p-2 bg-white rounded border"
                      >
                        <img src={tool.logo} alt={tool.name} style={{ height: 22, objectFit: 'contain' }} />
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        )) : null}
      </Row>
      {!visiblePrompts.length && !loading && (
        <div className="rounded-3xl bg-white p-8 shadow-soft text-center text-slate-500">
          No related prompts found. Try a different keyword or category.
        </div>
      )}
    </div>
  );
}
