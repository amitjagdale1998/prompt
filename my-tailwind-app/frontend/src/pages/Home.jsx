import { Collapse, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const features = [
  {
    title: 'Prompt Intelligence Engine',
    description: 'Curated templates, AI prompt grading, and contextual recommendations for developers and creators.',
    badge: 'Core',
  },
  {
    title: 'Admin Command Center',
    description: 'Manage prompts, users, and media with secure CRUD controls, role checks, and bulk workflows.',
    badge: 'Admin',
  },
  {
    title: 'Generator + Collections',
    description: 'Create role-goal-tone prompts instantly and save reusable collections across projects.',
    badge: 'Productivity',
  },
];

const pricing = [
  {
    title: 'Starter',
    price: 'Free',
    details: ['Public prompt library', 'Basic search and copy', 'Community updates'],
  },
  {
    title: 'Pro',
    price: '₹199/mo',
    details: ['Premium prompt packs', 'Saved collections', 'Advanced generator'],
    highlight: true,
  },
  {
    title: 'Team',
    price: '₹499/mo',
    details: ['Everything in Pro', 'Team workspaces', 'Priority support'],
  },
];

// Testimonials and stats are fetched from the backend so they are editable via admin.

const faqItems = [
  {
    key: '1',
    label: 'Can I manage all database records from admin?',
    children: 'Yes. Admin can view, update, and delete prompts, users, and media directly from the control center.',
  },
  {
    key: '2',
    label: 'Is this platform mobile responsive?',
    children: 'Yes. The layout is mobile-first with responsive grids and spacing for phones, tablets, and desktop.',
  },
  {
    key: '3',
    label: 'Can I run dark and light mode?',
    children: 'Yes. Dark mode is default for a premium feel, and users can switch to light mode anytime.',
  },
];

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [tRes, sRes] = await Promise.all([
          axios.get('/api/site/testimonials'),
          axios.get('/api/site/stats'),
        ]);
        if (!mounted) return;
        setTestimonials(Array.isArray(tRes.data) ? tRes.data : []);
        setStats(sRes.data || {});
      } catch (err) {
        // ignore and leave defaults
        console.warn('Failed to load site content', err?.message || err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="fade-in">
      <section className="saas-section">
        <div className="saas-container">
          <div className="saas-card">
            <Tag color="green" className="!rounded-full !px-3 !py-1 !mb-4">
              Premium Prompt SaaS
            </Tag>
            <Typography.Title level={1} className="!text-4xl md:!text-6xl !mb-4">
              Build, Manage, and Scale AI Prompts with Confidence
            </Typography.Title>
            <Typography.Paragraph className="saas-subtitle max-w-3xl text-base md:text-lg">
              Developer-focused prompt platform with secure admin controls, clean workflows, and modern Mongo-inspired
              dark UI built for growth.
            </Typography.Paragraph>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link className="btn-primary" to="/prompts">
                Explore Prompts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="saas-section">
        <div className="saas-container">
          <Typography.Title level={2} className="!mb-6">
            Features
          </Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((item) => (
              <article key={item.title} className="saas-card">
                <Tag color="green" className="!rounded-full !mb-3">
                  {item.badge}
                </Tag>
                <Typography.Title level={4} className="!mb-2">
                  {item.title}
                </Typography.Title>
                <Typography.Paragraph className="saas-subtitle !mb-0">{item.description}</Typography.Paragraph>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="saas-section">
        <div className="saas-container">
          <div className="saas-card">
            <Typography.Title level={2}>Dashboard Preview</Typography.Title>
            <Typography.Paragraph className="saas-subtitle">
              Monitor prompt performance, media assets, and user actions in one control center with role-based access.
            </Typography.Paragraph>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="saas-card !p-4">
                <p className="text-sm text-[var(--color-text-muted)] mb-1">Total Prompts</p>
                <p className="text-2xl font-bold">{stats.totalPrompts?.value ?? '—'}</p>
              </div>
              <div className="saas-card !p-4">
                <p className="text-sm text-[var(--color-text-muted)] mb-1">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers?.value ?? '—'}</p>
              </div>
              <div className="saas-card !p-4">
                <p className="text-sm text-[var(--color-text-muted)] mb-1">Copy Actions</p>
                <p className="text-2xl font-bold">{stats.copyActions?.value ?? '—'}</p>
              </div>
              <div className="saas-card !p-4">
                <p className="text-sm text-[var(--color-text-muted)] mb-1">MRR</p>
                <p className="text-2xl font-bold">{stats.mrr?.value ?? '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="saas-section">
        <div className="saas-container">
          <Typography.Title level={2} className="!mb-6">
            Testimonials
          </Typography.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {testimonials.length ? (
                testimonials.map((item) => (
                  <article key={item._id || item.author} className="saas-card">
                    <Typography.Paragraph className="saas-subtitle !text-base">"{item.quote}"</Typography.Paragraph>
                    <p className="font-semibold mt-5">{item.author}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.role}</p>
                  </article>
                ))
              ) : (
                <div className="saas-card">No testimonials yet.</div>
              )}
            </div>
        </div>
      </section>

      <section className="saas-section">
        <div className="saas-container">
          <Typography.Title level={2} className="!mb-6">
            Pricing
          </Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.map((plan) => (
              <article
                key={plan.title}
                className={`saas-card ${plan.highlight ? 'ring-2 ring-[var(--color-primary)]' : ''}`}
              >
                <Typography.Title level={4} className="!mb-1">
                  {plan.title}
                </Typography.Title>
                <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.details.map((line) => (
                    <li key={line} className="text-[var(--color-text-secondary)]">
                      • {line}
                    </li>
                  ))}
                </ul>
                <button className={plan.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  Choose {plan.title}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="saas-section">
        <div className="saas-container">
          <div className="saas-card">
            <Typography.Title level={2}>FAQ</Typography.Title>
            <Collapse
              className="!bg-transparent"
              bordered={false}
              items={faqItems}
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </section>

      <section className="saas-section pt-0">
        <div className="saas-container">
          <div className="saas-card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Typography.Title level={4} className="!mb-1">
                Prompt Lab Platform
              </Typography.Title>
              <p className="text-[var(--color-text-muted)] !mb-0">Built for developers, teams, and creators</p>
            </div>
            <div className="flex gap-4 text-sm text-[var(--color-text-secondary)]">
              <Link to="/prompt-guide">Guide</Link>
              <Link to="/video-guide">Videos</Link>
              <Link to="/prompts">Prompt Library</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
