// Content for the About Us page.
// Keep everything here factual: no invented dates, headcounts, clients or results.

export const founder = {
  name: 'Pasindu Weerakoon',
  role: 'Founder, Serenova Tech',
  education: 'BSc (Hons) in Information Technology',
  // Portrait in /public/assets: a WebP plus a JPEG fallback for older browsers.
  // Set both to null to show the initials monogram instead.
  photo: { webp: '/assets/founder-pasindu.webp', jpg: '/assets/founder-pasindu.jpg' },
  initials: 'PW',
  highlights: [
    { value: '3+ years', label: 'Hands-on IT experience' },
    { value: 'BSc (Hons)', label: 'Information Technology' },
    { value: 'OCI', label: 'Foundations Associate' }
  ],
  focusAreas: ['Windows & Linux servers', 'Networking', 'Virtualization', 'Web hosting', 'Web development']
};

export const mission =
  'To make reliable technology solutions more accessible to businesses through practical engineering, thoughtful design, and dependable technical support.';

export const vision =
  'To grow into a trusted technology partner for businesses in Sri Lanka and internationally, delivering modern digital solutions and reliable IT infrastructure.';

export const coreValues = [
  { icon: 'ShieldCheck', title: 'Reliability', text: 'Building and maintaining technology that businesses can depend on day to day.' },
  { icon: 'Lightbulb', title: 'Practical Innovation', text: 'Choosing solutions that solve real business problems, not technology for its own sake.' },
  { icon: 'Lock', title: 'Security First', text: 'Prioritising secure configurations and responsible handling of data and access.' },
  { icon: 'MessagesSquare', title: 'Transparency', text: 'Communicating clearly about scope, limitations, costs and progress.' },
  { icon: 'GraduationCap', title: 'Continuous Learning', text: 'Improving through hands-on projects and modern technologies.' },
  { icon: 'Users', title: 'Customer Focus', text: 'Designing solutions around your actual business needs and constraints.' }
];

export const differentiators = [
  { title: 'Infrastructure and web, together', text: 'One partner who understands both the website and the servers, network and hosting it runs on.' },
  { title: 'Hands-on operations experience', text: 'Practical understanding of servers, networks, hosting and deployment from day-to-day engineering work.' },
  { title: 'Built to be maintained', text: 'Solutions designed with maintainability and security in mind, so they keep working after hand-over.' },
  { title: 'Clear, realistic advice', text: 'Straightforward communication and recommendations that fit your budget and scale.' },
  { title: 'Focused on growing organisations', text: 'Services shaped around small businesses, startups and teams without a full-time IT department.' },
  { title: 'Cost-effective tooling', text: 'A preference for proven open-source tools and sensible, affordable technology choices.' }
];

// level: 'professional' = used in professional roles; 'developing' = labs, learning and fundamentals.
export const expertise = [
  {
    icon: 'Server',
    title: 'Windows Server & Infrastructure',
    level: 'professional',
    summary: 'Day-to-day administration of Windows Server environments.',
    tags: ['Windows Server', 'Active Directory', 'DNS & DHCP', 'Group Policy', 'Patching & hardening', 'HPE ProLiant / iLO']
  },
  {
    icon: 'Terminal',
    title: 'Linux & NGINX Administration',
    level: 'mixed',
    summary: 'Ubuntu Server administration and NGINX web server configuration.',
    tags: ['Ubuntu Server', 'NGINX', 'SSH', 'Server logs', 'Basic hardening', 'Troubleshooting']
  },
  {
    icon: 'Network',
    title: 'Network Engineering & Troubleshooting',
    level: 'professional',
    summary: 'Enterprise switching, wireless and network fault-finding.',
    tags: ['TCP/IP', 'VLANs & ACLs', 'LAN/WAN', 'Cisco', 'Juniper', 'Meraki & Ruckus']
  },
  {
    icon: 'Layers',
    title: 'Virtualization & Cloud Fundamentals',
    level: 'mixed',
    summary: 'Hyper-V and VMware in production; cloud platforms as a growing focus.',
    tags: ['Hyper-V', 'VMware', 'Azure (exposure)', 'Microsoft 365 (exposure)', 'OCI Foundations Associate']
  },
  {
    icon: 'Code2',
    title: 'Website Development',
    level: 'developing',
    summary: 'Modern frontend development with a working knowledge of the backend.',
    tags: ['React', 'Vite', 'JavaScript', 'Node.js & Express (fundamentals)', 'MySQL / MariaDB']
  },
  {
    icon: 'CloudUpload',
    title: 'Server Hosting & Deployment',
    level: 'mixed',
    summary: 'Getting websites and applications online and keeping them there.',
    tags: ['Website hosting', 'DNS', 'SSL/TLS with Certbot', 'PM2', 'Linux app hosting']
  },
  {
    icon: 'ShieldCheck',
    title: 'Security & Infrastructure Maintenance',
    level: 'professional',
    summary: 'Keeping systems patched, monitored and reviewed for weaknesses.',
    tags: ['Vulnerability assessment (Tenable)', 'Endpoint & MDM (exposure)', 'Cisco ISE (exposure)', 'Monitoring', 'Incident response']
  },
  {
    icon: 'GitBranch',
    title: 'GitHub & Deployment Automation',
    level: 'developing',
    summary: 'Version control and automated build-and-deploy pipelines.',
    tags: ['Git', 'GitHub', 'GitHub Actions', 'CI/CD workflows']
  }
];

export const expertiseLevels = {
  professional: 'Professional experience',
  mixed: 'Professional & developing',
  developing: 'Projects & ongoing development'
};

export const growthAreas = ['Cloud engineering', 'DevOps practices', 'Infrastructure automation', 'Modern infrastructure management'];
