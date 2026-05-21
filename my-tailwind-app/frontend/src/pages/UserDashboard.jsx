import { Alert, Card, Col, Row, Statistic, Typography } from 'antd';

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <Typography.Title level={2}>User Dashboard</Typography.Title>
      <Alert message="Explore prompt quality feedback and AI prompt recommendations." type="info" showIcon />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft">
            <Statistic title="Prompt Score" value={92} suffix="/100" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft">
            <Statistic title="Active Categories" value={3} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="rounded-3xl shadow-soft">
            <Statistic title="AI Tools Supported" value={4} />
          </Card>
        </Col>
      </Row>
      <Card className="rounded-3xl shadow-soft">
        <Typography.Title level={4}>Next steps</Typography.Title>
        <Typography.Paragraph>
          Choose a prompt workflow, test it with your AI tool, and review the generated output with quality and SEO guidance.
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
