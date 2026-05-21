import { Card, Col, Row, Tag, Typography } from 'antd';

const offers = [
  { title: 'Audio Prompt Studio', description: 'Generate audio editing prompts, tweak transcripts, and optimize clip quality.', tag: 'Audio' },
  { title: 'Document Prompt Assistant', description: 'Create copy-editing and summarization prompts for documents and reports.', tag: 'Document' },
  { title: 'Image Prompt Generator', description: 'Build image prompts for AI art, brand assets, and visual storytelling.', tag: 'Image' }
];

const guides = [
  { title: 'Prompt Guide', description: 'Learn how to write simple Gemini and ChatGPT prompts for video editing and story ideas.', link: '/prompt-guide' },
  { title: 'Video Guide', description: 'Watch a video walkthrough for easy prompt writing and quick editing tips.', link: '/video-guide' }
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <Typography.Title level={2}>Welcome to Prompt Lab</Typography.Title>
        <Typography.Paragraph className="max-w-3xl">
          A modern prompt marketplace for AI workflows. Discover high-quality prompts for audio editing, document editing, image generation and SEO-ready content.
        </Typography.Paragraph>
      </div>
      <Row gutter={[24, 24]}>
        {offers.map((item) => (
          <Col key={item.title} xs={24} md={8}>
            <Card title={item.title} bordered={false} className="rounded-3xl">
              <Tag color="blue">{item.tag}</Tag>
              <p className="mt-4 text-slate-600">{item.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[24, 24]}>
        {guides.map((item) => (
          <Col key={item.title} xs={24} md={12}>
            <Card title={item.title} bordered={false} className="rounded-3xl hover:shadow-lg transition-shadow duration-200">
              <p className="text-slate-600">{item.description}</p>
              <Typography.Link href={item.link}>Open guide →</Typography.Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
