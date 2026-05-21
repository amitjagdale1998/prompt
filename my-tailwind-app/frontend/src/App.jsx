import { Routes, Route, Link } from 'react-router-dom';
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

function App() {
  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="0" className="bg-slate-900">
        <div className="text-white text-2xl font-bold p-6">Prompt Lab</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="prompts">
            <Link to="/prompts">Prompt Gallery</Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link to="/user">User Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="admin">
            <Link to="/admin">Admin Panel</Link>
          </Menu.Item>
          <Menu.Item key="prompt-guide">
            <Link to="/prompt-guide">Prompt Guide</Link>
          </Menu.Item>
          <Menu.Item key="video-guide">
            <Link to="/video-guide">Video Guide</Link>
          </Menu.Item>
        </Menu>
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
        <Footer className="text-center">Prompt Lab © 2026</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
