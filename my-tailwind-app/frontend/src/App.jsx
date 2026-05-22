import { useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PromptGallery from './pages/PromptGallery';
import PromptGuide from './pages/PromptGuide';
import VideoPromptGuide from './pages/VideoPromptGuide';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyAccount from './pages/VerifyAccount';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

const { Header, Content, Footer, Sider } = Layout;

const navItems = [
  { key: '/', label: <Link to="/">Home</Link> },
  { key: '/prompts', label: <Link to="/prompts">Prompt Gallery</Link> },
  { key: '/user', label: <Link to="/user">User Dashboard</Link> },
  { key: '/admin', label: <Link to="/admin">Admin Panel</Link> },
  { key: '/prompt-guide', label: <Link to="/prompt-guide">Prompt Guide</Link> },
  { key: '/video-guide', label: <Link to="/video-guide">Video Guide</Link> },
];

function App() {
  const { pathname } = useLocation();
  const selectedKey = useMemo(() => {
    const match = navItems.find((item) => item.key !== '/' && pathname.startsWith(item.key));
    return match ? match.key : '/';
  }, [pathname]);

  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="0" className="bg-slate-900">
        <div className="text-white text-2xl font-bold p-6">Prompt Lab</div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={navItems} />
      </Sider>
      <Layout>
        <Header className="bg-white px-6 shadow-sm">
          <Typography.Title level={3} className="!mt-0">
            Prompt Lab Web App
          </Typography.Title>
        </Header>
        <Content className="p-6 bg-slate-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prompts" element={<PromptGallery />} />
            <Route path="/prompt-guide" element={<PromptGuide />} />
            <Route path="/video-guide" element={<VideoPromptGuide />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Routes>
        </Content>
        <Footer className="text-center">Prompt Lab © {new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
