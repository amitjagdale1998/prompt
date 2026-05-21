import { Card, Col, List, Row, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';

const examples = [
  {
    title: 'Trim a video for social media',
    prompt: 'Please help me edit this video into a short 30-second social media clip. Keep it upbeat, add a quick intro, and suggest a caption.'
  },
  {
    title: 'Improve audio clarity',
    prompt: 'I have a recorded video with a noisy background. Suggest a simple step-by-step prompt to make the voice sound cleaner and clearer.'
  },
  {
    title: 'Make a video script friendly',
    prompt: 'Rewrite this script in plain language so it feels natural and easy to speak on camera for a non-technical presenter.'
  }
];

export default function PromptGuide() {
  return (
    <div className="space-y-6">
      <Card className="rounded-3xl shadow-soft p-8 bg-white">
        <Typography.Title level={2}>Simple Prompt Guide for Gemini / ChatGPT</Typography.Title>
        <Typography.Paragraph className="text-slate-600">
          Use prompts like plain English instructions. This page shows how to ask Gemini or ChatGPT to help with video editing, captions, scripts, and next steps without technical jargon.
        </Typography.Paragraph>
        <Typography.Title level={4}>How to start</Typography.Title>
        <List
          dataSource={[
            'Think about the outcome you want: shorter video, better audio, captions, or a clear script.',
            'Write exactly what you want in one or two sentences.',
            'Ask for a step-by-step answer if you want a direct action plan.',
            'Copy the prompt into Gemini or ChatGPT and then paste the result into your video editor or script notes.'
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>

      <Row gutter={[24, 24]}>
        {examples.map((example) => (
          <Col key={example.title} xs={24} md={8}>
            <Card title={example.title} className="rounded-3xl shadow-soft" bordered={false}>
              <Typography.Paragraph className="text-slate-600 font-medium">Prompt</Typography.Paragraph>
              <Typography.Text code style={{ whiteSpace: 'pre-wrap' }}>
                {example.prompt}
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="rounded-3xl shadow-soft p-8 bg-white">
        <Typography.Title level={4}>Best way to use this guide</Typography.Title>
        <List
          dataSource={[
            'Copy one example prompt to Gemini or ChatGPT.',
            'Change the prompt to match your video topic or goal.',
            'Ask for captions, titles, scripts, or trimmed clips in simple language.',
            'Use the response as your editing checklist.'
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <Typography.Paragraph className="mt-4">
          Want a video walkthrough? Go to <Link to="/video-guide">Video Prompt Guide</Link> for a simple visual tutorial.
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
