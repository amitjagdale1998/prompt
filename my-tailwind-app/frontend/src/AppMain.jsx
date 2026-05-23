import { useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
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
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { useThemeMode } from './context/ThemeContext';

const { Header, Content, Footer, Sider } = Layout;

const navItems = [
  { key: '/', label: 'Home' },
  { key: '/prompts', label: 'Prompt Gallery' },
  { key: '/user', label: 'User Dashboard' },
  { key: '/prompt-guide', label: 'Prompt Guide' },
  { key: '/video-guide', label: 'Video Guide' },
];

export default function AppMain() {
  const { isDark, toggleTheme } = useThemeMode();
  const { pathname } = useLocation();

  const selectedKey = useMemo(() => {
    const match = navItems.find((item) => item.key !== '/' && pathname.startsWith(item.key));
    return match ? match.key : '/';
  }, [pathname]);

  const landingPaths = ['/', '/prompts'];
  const isLanding = landingPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (isLanding) {
    return (
      <Layout className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#001E2B] text-white' : 'bg-[#EAF2F7] text-slate-900'}`}>
        <Header className={`sticky top-0 z-30 py-6 px-4 border-b transition-colors duration-300 ${isDark ? 'border-[#1F4654] bg-transparent' : 'border-[#B4CAD7] bg-transparent'}`}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold">Prompt Lab</div>
            <div className="flex items-center gap-4">
              <nav className="hidden sm:flex gap-4">
                {navItems.map((n) => (
                  <Link key={n.key} to={n.key} className={`text-sm ${selectedKey === n.key ? 'font-semibold underline' : ''}`}>
                    {n.label}
                  </Link>
                ))}
              </nav>
              <Button icon={isDark ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} className={isDark ? '!bg-[#112733] !text-white' : '!bg-white !text-slate-900'}>
                {isDark ? 'Light' : 'Dark'}
              </Button>
            </div>
          </div>
        </Header>

        <Content className={`py-12 transition-colors duration-300 ${isDark ? 'bg-[#001E2B]' : 'bg-[#EAF2F7]'}`}>
          <div className="max-w-5xl mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prompts" element={<PromptGallery />} />
              <Route path="/prompt-guide" element={<PromptGuide />} />
              <Route path="/video-guide" element={<VideoPromptGuide />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<VerifyAccount />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
            </Routes>
          </div>
        </Content>

        <Footer className={`text-center transition-colors duration-300 ${isDark ? 'bg-[#0D2A36] text-[#B8C4CE]' : 'bg-white text-[#607E8B]'}`}>
          Prompt Lab © {new Date().getFullYear()}
        </Footer>
      </Layout>
    );
  }

  return (
    <Layout className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#001E2B] text-white' : 'bg-[#EAF2F7] text-slate-900'}`}>
      <Sider breakpoint="lg" collapsedWidth="0" className={isDark ? 'bg-[#0D2A36] border-r border-[#1F4654]' : 'bg-[#0f3a4b] border-r border-[#285567]'}>
        <div className="text-white text-2xl font-bold p-6 tracking-wide">Prompt Lab</div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={navItems.map(i => ({ key: i.key, label: <Link to={i.key}>{i.label}</Link> }))} style={{ background: 'transparent' }} />
      </Sider>
      <Layout>
        <Header className={`glass-nav sticky top-0 z-30 px-6 flex items-center justify-between border-b transition-colors duration-300 ${isDark ? 'border-[#1F4654]' : 'border-[#B4CAD7]'}`}>
          <Typography.Title level={3} className={`!mt-0 ${isDark ? '!text-slate-100' : ''}`}>Prompt Lab Web App</Typography.Title>
          <Button icon={isDark ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} className={isDark ? '!bg-[#112733] !text-white !border-[#1F4654] hover:!border-[#00ED64]' : '!bg-white !text-slate-900 !border-[#B4CAD7]'}>
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </Header>

        <Content className={`p-6 transition-colors duration-300 ${isDark ? 'bg-[#001E2B]' : 'bg-[#EAF2F7]'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prompts" element={<PromptGallery />} />
            <Route path="/prompt-guide" element={<PromptGuide />} />
            <Route path="/video-guide" element={<VideoPromptGuide />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Routes>
        </Content>

        <Footer className={`text-center transition-colors duration-300 ${isDark ? 'bg-[#0D2A36] text-[#B8C4CE]' : 'bg-white text-[#607E8B]'}`}>
          Prompt Lab © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
