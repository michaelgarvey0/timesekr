import dayjs from 'dayjs';

export const DUMMY_EVENTS = [
  {
    event_name: 'InnovateTech',
    description: 'A conference focused on the latest technology innovations.',
    image_url:
      'https://images.unsplash.com/photo-1696766984569-a33d52748dba?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 150,
    total_capacity: 300,
    address: '123 Innovation Way, Tech City, TC 12345',
    cost_per_ticket: 99.99,
    event_date: '2024-05-15',
    schedule: [
      {
        title: 'Opening Keynote',
        description: 'Kickoff the conference with insights into the latest tech trends.',
        speaker_name: 'Dr. John Doe',
        time: '09:00 AM',
      },
      {
        title: 'AI in 2024',
        description: 'Exploring the advancements in artificial intelligence.',
        speaker_name: 'Jane Smith',
        time: '11:00 AM',
      },
    ],
  },
  {
    event_name: 'Visionary Symposium',
    description: 'A symposium for visionaries to share their ideas and insights.',
    image_url:
      'https://images.unsplash.com/photo-1709521440400-bf38b562b194?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 367,
    total_capacity: 400,
    address: '456 Visionary Rd, Future Town, FT 67890',
    cost_per_ticket: 120.0,
    event_date: dayjs().format('YYYY-MM-DD'),
    schedule: [
      {
        title: 'Future of Healthcare',
        description: 'Innovations that will shape the healthcare industry.',
        speaker_name: 'Dr. Alice Johnson',
        time: '10:00 AM',
      },
      {
        title: 'Sustainable Energy Solutions',
        description: 'Discussing sustainable energy initiatives.',
        speaker_name: 'Bob Brown',
        time: '01:00 PM',
      },
    ],
  },
  {
    event_name: 'Code Conf',
    description: 'A coding conference for developers and programmers.',
    image_url:
      'https://images.unsplash.com/photo-1613033722455-b0c60fc50d8f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 300,
    total_capacity: 500,
    address: '789 Code Lane, Dev City, DC 11223',
    cost_per_ticket: 150.0,
    event_date: '2024-13-05',
    schedule: [
      {
        title: 'Modern Web Development',
        description: 'Best practices for web development in 2024.',
        speaker_name: 'Chris Green',
        time: '09:30 AM',
      },
      {
        title: 'Cybersecurity Essentials',
        description: 'Protecting your applications and data.',
        speaker_name: 'Pat White',
        time: '11:30 AM',
      },
    ],
  },
  {
    event_name: 'Global Trends Conference',
    description: 'A conference to discuss the latest global trends and insights.',
    image_url:
      'https://images.unsplash.com/photo-1461782296610-c552d61b149a?q=80&w=2476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 250,
    total_capacity: 600,
    address: '101 Trends Blvd, World City, WC 33445',
    cost_per_ticket: 175.0,
    event_date: '2024-12-10',
    schedule: [
      {
        title: 'Economic Outlook',
        description: 'Analyzing global economic trends.',
        speaker_name: 'Dr. Emily Brown',
        time: '10:00 AM',
      },
      {
        title: 'Global Marketing Strategies',
        description: 'Effective marketing in a global market.',
        speaker_name: 'Michael Davis',
        time: '02:00 PM',
      },
    ],
  },
  {
    event_name: 'HealthTech Summit',
    description: 'A summit focusing on the intersection of health and technology',
    image_url:
      'https://images.unsplash.com/photo-1578681038576-38d56deadfb5?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 180,
    total_capacity: 350,
    address: '202 Health St, Med City, MC 55667',
    cost_per_ticket: 140.0,
    event_date: dayjs().format('YYYY-MM-DD'),
    schedule: [
      {
        title: 'Digital Health Innovations',
        description: 'Latest trends in digital health technologies.',
        speaker_name: 'Dr. Anna Lee',
        time: '09:00 AM',
      },
      {
        title: 'Telemedicine and the Future',
        description: 'The evolving landscape of telemedicine.',
        speaker_name: 'James Wilson',
        time: '11:30 AM',
      },
    ],
  },
  {
    event_name: 'Blockchain Expo',
    description: 'An expo showcasing the latest developments in blockchain technology.',
    image_url:
      'https://images.unsplash.com/photo-1560523160-c4ef2f0c61a9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 320,
    total_capacity: 600,
    address: '303 Crypto Way, Blockchain City, BC 77889',
    cost_per_ticket: 180.0,
    event_date: '2024-09-30',
    schedule: [
      {
        title: 'Introduction to Blockchain',
        description: 'Understanding the basics of blockchain technology.',
        speaker_name: 'Laura Kim',
        time: '10:00 AM',
      },
      {
        title: 'Smart Contracts and DApps',
        description: 'Building decentralized applications with smart contracts.',
        speaker_name: 'Mark Taylor',
        time: '01:00 PM',
      },
    ],
  },
  {
    event_name: 'Green Energy Forum',
    description: 'A forum to discuss the latest developments in green energy solutions',
    image_url:
      'https://images.unsplash.com/photo-1576436978289-3bcb91a03710?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count_signed_up: 120,
    total_capacity: 500,
    address: '404 Eco Dr, Green City, GC 99000',
    cost_per_ticket: 130.0,
    event_date: '2024-11-15',
    schedule: [
      {
        title: 'Renewable Energy Innovations',
        description: 'Exploring new technologies in renewable energy.',
        speaker_name: 'Dr. Olivia Martin',
        time: '09:30 AM',
      },
      {
        title: 'Carbon Footprint Reduction',
        description: 'Strategies for reducing carbon emissions.',
        speaker_name: 'Daniel Anderson',
        time: '01:00 PM',
      },
    ],
  },
];
