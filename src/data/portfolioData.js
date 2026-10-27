// Portfolio projects shown on the About and Projects pages.
//
// Only add a `links` entry when the repository, demo or case study is real and
// approved for public access. Never include customer data, hostnames, IPs or
// infrastructure diagrams here.

export const projectStatuses = {
  development: { label: 'In Development', tone: 'blue' },
  expanding: { label: 'In Use · Expanding', tone: 'teal' },
  lab: { label: 'Learning Lab', tone: 'amber' },
  professional: { label: 'Professional Experience', tone: 'slate' }
};

export const portfolioProjects = [
  {
    id: 'serenova-tech-website',
    title: 'Serenova Tech Website',
    category: 'Business website & portfolio',
    status: 'development',
    description:
      'A modern technology services website to present IT services, showcase technical work, communicate with potential customers and establish a professional digital presence.',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS', 'Git', 'GitHub', 'GitHub Actions'],
    links: []
  },
  {
    id: 'poultry-farm-management',
    title: 'Poultry Farm Management Application',
    category: 'Domain-specific business application',
    status: 'expanding',
    description:
      'A poultry farm management application used by Madawwal Farm. The project is evolving toward a commercial web-based poultry ERP platform for flock monitoring, egg production, feeding, medical records, task management and inventory workflows.',
    plannedFeatures: [
      'Multi-organization management',
      'Hen age and flock monitoring',
      'Egg production reporting',
      'Feeding and medical schedules',
      'Weekly task management',
      'Inventory, warehouses and GRN workflows',
      'Subscription-based access'
    ],
    technologies: [],
    links: []
  },
  {
    id: 'freshmart-infrastructure-lab',
    title: 'FreshMart IT Infrastructure Assessment Lab',
    category: 'Technical learning & infrastructure lab',
    status: 'lab',
    description:
      'A hands-on infrastructure lab exploring Windows Server administration, Active Directory, DHCP, organizational units, security groups, Group Policy, shared folders and Ubuntu server integration.',
    note: 'A learning and assessment environment, not a production deployment for a commercial customer.',
    technologies: ['Windows Server', 'Active Directory', 'DHCP', 'Group Policy', 'Ubuntu Server', 'VMware'],
    links: []
  },
  {
    id: 'enterprise-network-renewal',
    title: 'Enterprise Network Renewal Experience',
    category: 'Infrastructure engineering experience',
    status: 'professional',
    description:
      'Experience gained through network renewal and infrastructure work involving Cisco and Juniper switching technologies, network architecture, switch configuration and enterprise connectivity.',
    technologies: ['Cisco', 'Juniper', 'Switching', 'VLANs', 'Network configuration', 'Troubleshooting'],
    links: []
  },
  {
    id: 'server-virtualization-management',
    title: 'Server Virtualization & Infrastructure Management',
    category: 'Professional infrastructure experience',
    status: 'professional',
    description:
      'Practical experience managing Windows Server environments, HPE ProLiant infrastructure, Hyper-V virtual machines, server maintenance and infrastructure troubleshooting.',
    technologies: ['Windows Server', 'HPE ProLiant', 'HPE iLO', 'Hyper-V', 'VMware', 'Linux'],
    links: []
  }
];
