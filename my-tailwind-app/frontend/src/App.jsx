import React from 'react';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Prompt Lab</h1>
      <p>Landing layout temporarily disabled while rebuilding.</p>
    </div>
  );
}
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

              export default App;

        className={isDark ? 'bg-[#0D2A36] border-r border-[#1F4654]' : 'bg-[#0f3a4b] border-r border-[#285567]'}
      >
        <div className="text-white text-2xl font-bold p-6 tracking-wide">Prompt Lab</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={navItems}
          style={{ background: 'transparent' }}
        />
      </Sider>
      <Layout>
        <Header
          className={`glass-nav sticky top-0 z-30 px-6 flex items-center justify-between border-b transition-colors duration-300 ${
            isDark ? 'border-[#1F4654]' : 'border-[#B4CAD7]'
          }`}
        >
          <Typography.Title level={3} className={`!mt-0 ${isDark ? '!text-slate-100' : ''}`}>
            Prompt Lab Web App
          </Typography.Title>
          <Button
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            className={
              isDark
                ? '!bg-[#112733] !text-white !border-[#1F4654] hover:!border-[#00ED64]'
                : '!bg-white !text-slate-900 !border-[#B4CAD7]'
            }
          >
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
        <Footer
          className={`text-center transition-colors duration-300 ${
            isDark ? 'bg-[#0D2A36] text-[#B8C4CE]' : 'bg-white text-[#607E8B]'
          }`}
        >
          Prompt Lab © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Routes>
        </Content>
        <Footer
          className={`text-center transition-colors duration-300 ${
            isDark ? 'bg-[#0D2A36] text-[#B8C4CE]' : 'bg-white text-[#607E8B]'
          }`}
        >
          Prompt Lab © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
