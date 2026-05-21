import { Card, Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function VideoPromptGuide() {
  return (
    <div className="space-y-6">
      <Card className="rounded-3xl shadow-soft p-8 bg-white">
        <Typography.Title level={2}>Video Prompt Guide for Gemini / ChatGPT</Typography.Title>
        <Typography.Paragraph className="text-slate-600">
          Watch a short video guide and learn how to write easy prompts for video editing, captions, and content ideas. This guide is made for non-technical creators who want fast results.
        </Typography.Paragraph>
      </Card>

      <div className="rounded-3xl overflow-hidden bg-black shadow-soft" style={{ minHeight: 360 }}>
        <iframe
          title="Gemini ChatGPT Video Editing Prompt Guide"
          className="w-full h-[420px]"
          src="https://www.youtube.com/embed?listType=search&list=Gemini+ChatGPT+video+editing+prompts"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card className="rounded-3xl shadow-soft" bordered={false}>
            <Typography.Title level={4}>What to watch for</Typography.Title>
            <Typography.Paragraph>
              In the video, look for examples of prompts that say what you want in plain words. Try these ideas:
            </Typography.Paragraph>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>“Help me make this 2-minute video shorter and more interesting.”</li>
              <li>“Suggest a clear script for a friendly product demo.”</li>
              <li>“Create captions and a title that fit a travel video.”</li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft" bordered={false}>
            <Typography.Title level={4}>Next step</Typography.Title>
            <Typography.Paragraph className="text-slate-600">
              After you watch, go to <Link to="/prompt-guide">Prompt Guide</Link> and use the example prompts directly in Gemini or ChatGPT.
            </Typography.Paragraph>
            <Button type="primary" block>
              Try the Prompt Guide
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
