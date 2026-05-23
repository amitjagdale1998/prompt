import { Row, Col, Card, Typography, Button, Tooltip } from 'antd';
import { ExternalLinkOutlined } from '@ant-design/icons';
import { aiTools } from '../data/aiTools';

const { Title, Text } = Typography;

export default function AIToolsShowcase({ category = null, limit = null, columns = { xs: 2, sm: 3, md: 4, lg: 6 } }) {
  // Get tools to display
  let toolsToDisplay = [];
  
  if (category && aiTools[category]) {
    toolsToDisplay = aiTools[category];
  } else if (category === 'all') {
    // Combine all categories
    Object.keys(aiTools).forEach(key => {
      if (Array.isArray(aiTools[key])) {
        toolsToDisplay = [...toolsToDisplay, ...aiTools[key]];
      }
    });
  } else {
    // Default: show LLM providers and coding tools
    toolsToDisplay = [...aiTools.llmProviders, ...aiTools.codingTools];
  }

  // Apply limit if specified
  if (limit) {
    toolsToDisplay = toolsToDisplay.slice(0, limit);
  }

  return (
    <div className="ai-tools-showcase space-y-6">
      <Row gutter={[16, 16]}>
        {toolsToDisplay.map((tool, index) => (
          <Col key={index} xs={columns.xs} sm={columns.sm} md={columns.md} lg={columns.lg}>
            <Tooltip title={`Open ${tool.name}`}>
              <a
                href={tool.site}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 h-full bg-white dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-700">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    width="40"
                    height="40"
                    className="mb-3 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Text className="text-center text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </Text>
                </div>
              </a>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// Category showcase component
export function AIToolsCategoryGrid() {
  const categories = [
    { key: 'llmProviders', title: '🤖 LLM & Chat Models', icon: '🔷' },
    { key: 'codingTools', title: '💻 Coding & Developer Tools', icon: '⚙️' },
    { key: 'imageTools', title: '🎨 Image & Design', icon: '🖼️' },
    { key: 'specializedAI', title: '🧠 Specialized AI', icon: '🔬' },
    { key: 'chatPlatforms', title: '💬 Chat & Community', icon: '👥' },
    { key: 'hosting', title: '🚀 Hosting & Deployment', icon: '☁️' },
    { key: 'cloudProviders', title: '🌐 Cloud Providers', icon: '🌍' },
    { key: 'techStack', title: '⚡ Tech Stack', icon: '🛠️' },
    { key: 'social', title: '📱 Social Media', icon: '📡' },
    { key: 'browsers', title: '🌐 Web Browsers', icon: '🔗' },
  ];

  return (
    <div className="space-y-12">
      {categories.map(({ key, title, icon }) => (
        <div key={key} className="space-y-4">
          <Title level={3} className="!mb-6 flex items-center gap-2">
            <span>{icon}</span>
            {title}
          </Title>
          <AIToolsShowcase category={key} />
        </div>
      ))}
    </div>
  );
}

// Inline tools component (for Home page or sidebars)
export function AIToolsInline({ category = 'llmProviders', showLabel = false }) {
  const tools = aiTools[category] || [];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {showLabel && <Text strong>Available on:</Text>}
      {tools.slice(0, 8).map((tool, index) => (
        <Tooltip key={index} title={tool.name}>
          <a
            href={tool.site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <img
              src={tool.logo}
              alt={tool.name}
              width="24"
              height="24"
              loading="lazy"
            />
          </a>
        </Tooltip>
      ))}
    </div>
  );
}

// Horizontal scrollable tools (for mobile)
export function AIToolsScroller({ category = 'llmProviders' }) {
  const tools = aiTools[category] || [];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-min">
        {tools.map((tool, index) => (
          <Tooltip key={index} title={tool.name}>
            <a
              href={tool.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all bg-white dark:bg-slate-800 w-20">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  width="32"
                  height="32"
                  className="mb-1"
                  loading="lazy"
                />
                <Text className="text-xs text-center">{tool.name}</Text>
              </div>
            </a>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
