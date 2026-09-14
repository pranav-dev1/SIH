const bcrypt = require('bcryptjs');

const defaultPasswordHash = bcrypt.hashSync('Demo@123', 10);

const seedUsers = [
  {
    _id: 'u_admin_1',
    name: 'Admin User',
    email: 'admin@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'admin',
    institution: 'National Capacity Building Commission',
    createdAt: new Date('2026-01-01')
  },
  {
    _id: 'u_trainer_1',
    name: 'Dr. Ananya Sharma',
    email: 'trainer@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainer',
    institution: 'National Institute of Disaster Management',
    createdAt: new Date('2026-01-05')
  },
  {
    _id: 'u_trainer_2',
    name: 'Prof. Rajesh Verma',
    email: 'trainer2@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainer',
    institution: 'Centre for Data Governance & Analytics',
    createdAt: new Date('2026-01-10')
  },
  {
    _id: 'u_trainee_1',
    name: 'Rahul Kumar',
    email: 'trainee@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainee',
    institution: 'State Skill Development Mission',
    createdAt: new Date('2026-01-15')
  },
  {
    _id: 'u_trainee_2',
    name: 'Priya Singh',
    email: 'priya@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainee',
    institution: 'IIT Delhi Extension',
    createdAt: new Date('2026-01-18')
  },
  {
    _id: 'u_trainee_3',
    name: 'Amit Patel',
    email: 'amit@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainee',
    institution: 'Gujarat Administrative Staff College',
    createdAt: new Date('2026-01-20')
  },
  {
    _id: 'u_trainee_4',
    name: 'Neha Sharma',
    email: 'neha@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainee',
    institution: 'Ministry of Environment Cell',
    createdAt: new Date('2026-01-22')
  },
  {
    _id: 'u_trainee_5',
    name: 'Suresh Reddy',
    email: 'suresh@capacityconnect.demo',
    password: defaultPasswordHash,
    role: 'trainee',
    institution: 'AP Urban Development Mission',
    createdAt: new Date('2026-01-25')
  }
];

const seedCourses = [
  {
    _id: 'c_disaster_101',
    title: 'Disaster Preparedness & Response',
    description: 'Comprehensive training on early warning systems, emergency evacuation protocols, risk mitigation strategies, and community resilience building during natural hazards.',
    category: 'Disaster Management',
    difficulty: 'Intermediate',
    duration: '4 Weeks (12 Hours)',
    trainerId: 'u_trainer_1',
    trainerName: 'Dr. Ananya Sharma',
    published: true,
    learningObjectives: [
      'Understand natural hazard classification and risk maps',
      'Master rapid emergency evacuation planning & incident response',
      'Deploy community early warning notifications effectively',
      'Evaluate post-disaster rehabilitation requirements'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction to Hazard Risk Reduction',
        description: 'Basics of hazards, vulnerability, capacity, and risk assessment concepts.',
        lessons: [
          {
            id: 'l1',
            title: '1.1 Fundamental Disaster Management Concepts',
            content: 'Disasters occur when hazards interact with vulnerable human populations and insufficient coping capacities. Disaster risk management aims to reduce hazard exposure, lessen vulnerability, and enhance community resilience.',
            videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
            videoTitle: 'Hazard Risk Reduction Briefing',
            resources: ['https://example.com/docs/hazard_primer.pdf']
          },
          {
            id: 'l2',
            title: '1.2 Early Warning Systems and Communication Protocols',
            content: 'Modern early warning systems integrate satellite monitoring, weather radars, and automated warning broadcasts via SMS, radio, and mobile emergency alerts to minimize loss of life.',
            videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
            videoTitle: 'Early Warning Systems Walkthrough',
            resources: ['https://example.com/docs/warning_sop.pdf']
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Practical Emergency Evacuation Procedures',
        description: 'Steps for drafting evacuation plans, shelter logistics, and relief distribution.',
        lessons: [
          {
            id: 'l3',
            title: '2.1 Evacuation Routing & Zone Mapping',
            content: 'Creating safe evacuation routes requires identifying flood zones, seismic fault lines, high-risk structures, and establishing clear signage and designated muster stations.',
            videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            videoTitle: 'Evacuation Routing Demonstration',
            resources: ['https://example.com/docs/evacuation_guidelines.pdf']
          },
          {
            id: 'l3b',
            title: '2.2 Shelter Logistics and Relief Distribution',
            content: 'Relief operations depend on pre-identified shelters, stocked emergency kits, transport corridors, and coordinated food and medical distribution teams.',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            videoTitle: 'Shelter and Relief Logistics',
            resources: []
          }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Rapid Assessment and Post-Disaster Relief',
        description: 'Conducting damage assessments, managing relief camps, and public health control.',
        lessons: [
          {
            id: 'l4',
            title: '3.1 Post-Event Damage Audit Protocol',
            content: 'Standardized assessment tools enable disaster recovery teams to quantify structural damage, assess medical emergency needs, and coordinate international and national relief supplies.',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
            videoTitle: 'Post-Disaster Damage Audit',
            resources: ['https://example.com/docs/audit_checklist.pdf']
          },
          {
            id: 'l4b',
            title: '3.2 Relief Camp Public Health Control',
            content: 'Camps require water, sanitation, vaccination, crowding control, and clear referral pathways to prevent disease outbreaks after a disaster.',
            videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
            videoTitle: 'Public Health in Relief Camps',
            resources: []
          }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Certification Assessment',
        description: 'Comprehensive multiple-choice evaluation testing knowledge across all 3 modules.',
        lessons: [
          {
            id: 'l5',
            title: '4.1 Pre-Quiz Review & Guidelines',
            content: 'Ensure you have reviewed all prior modules before attempting the 5-question final assessment. A score of 70% or higher is required to pass and earn your digital certificate.',
            videoUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
            videoTitle: 'Certification Review Session',
            resources: []
          }
        ]
      }
    ],
    createdAt: new Date('2026-01-10')
  },
  {
    _id: 'c_weather_102',
    title: 'Weather & Climate Awareness',
    description: 'Learn meteorology fundamentals, climate change projections, extreme weather monitoring, and adaptation strategies for civic planners and public safety officers.',
    category: 'Environmental Science',
    difficulty: 'Beginner',
    duration: '3 Weeks (9 Hours)',
    trainerId: 'u_trainer_1',
    trainerName: 'Dr. Ananya Sharma',
    published: true,
    learningObjectives: [
      'Decode meteorological reports and weather radar maps',
      'Understand monsoonal patterns and cyclone genesis',
      'Formulate urban heat island and flood mitigation strategies'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Weather Systems & Monsoonal Dynamics',
        description: 'Understanding atmospheric pressure, monsoons, and extreme precipitation.',
        lessons: [
          {
            id: 'l1',
            title: '1.1 Principles of Meteorology',
            content: 'Atmospheric circulation drives regional weather patterns. Pressure gradients, moisture transport, and temperature differentials dictate monsoon timing and intensity.',
            videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
            videoTitle: 'Meteorology Fundamentals',
            resources: []
          },
          {
            id: 'l1b',
            title: '1.2 Monsoon and Cyclone Tracking',
            content: 'Satellite imagery, pressure drops, and sea-surface temperatures help civic teams anticipate cyclone landfall and monsoon flood peaks.',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
            videoTitle: 'Monsoon and Cyclone Tracking',
            resources: []
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Climate Change & Local Adaptation',
        description: 'Analyzing global warming trends and local resilience actions.',
        lessons: [
          {
            id: 'l2',
            title: '2.1 Urban Climate Action Plans',
            content: 'Cities must adopt green infrastructure, permeable pavements, and rooftop rain harvesting to combat flash floods and urban heat island effects.',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
            videoTitle: 'Urban Climate Action Plans',
            resources: []
          }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Assessment',
        description: 'Final weather and climate evaluation.',
        lessons: [
          {
            id: 'l3',
            title: '3.1 Evaluation Instructions',
            content: 'Complete the assessment to verify your grasp of weather indicators and climate adaptation strategies.',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
            videoTitle: 'Climate Adaptation Recap',
            resources: []
          }
        ]
      }
    ],
    createdAt: new Date('2026-01-12')
  },
  {
    _id: 'c_data_103',
    title: 'Data Literacy for Public Governance',
    description: 'Empower public officials and analysts to utilize data dashboards, statistical summaries, data privacy laws, and evidence-based decision making in public administration.',
    category: 'Digital Skills',
    difficulty: 'Beginner',
    duration: '2 Weeks (6 Hours)',
    trainerId: 'u_trainer_2',
    trainerName: 'Prof. Rajesh Verma',
    published: true,
    learningObjectives: [
      'Interpret public sector KPIs and analytical dashboards',
      'Apply basic statistical sampling and data cleaning techniques',
      'Ensure data governance and compliance with DPDP act'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Data Fundamentals & Governance',
        description: 'Introduction to data types, sources, and data protection policies.',
        lessons: [
          {
            id: 'l1',
            title: '1.1 Data Driven Decision Making',
            content: 'Evidence-based policy formulation relies on timely, structured data collection from IoT sensors, administrative records, and public feedback portals.',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
            videoTitle: 'Data-Driven Decision Making',
            resources: []
          },
          {
            id: 'l1b',
            title: '1.2 Data Privacy and DPDP Compliance',
            content: 'Public datasets must be anonymized, purpose-limited, and stored with access controls that comply with the Digital Personal Data Protection Act.',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
            videoTitle: 'Data Privacy and DPDP Basics',
            resources: []
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Final Assessment',
        description: 'Data literacy evaluation test.',
        lessons: [
          {
            id: 'l2',
            title: '2.1 Test Guidelines',
            content: 'Answer the data literacy questions to finalize your course progress.',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
            videoTitle: 'Governance Data Evaluation',
            resources: []
          }
        ]
      }
    ],
    createdAt: new Date('2026-01-15')
  },
  {
    _id: 'c_digital_104',
    title: 'Digital Skills & Cybersecurity Essentials',
    description: 'Essential digital tools, cloud collaboration workflows, cybersecurity best practices, phishing prevention, and data safety guidelines for capacity builders.',
    category: 'Digital Skills',
    difficulty: 'Intermediate',
    duration: '3 Weeks (10 Hours)',
    trainerId: 'u_trainer_2',
    trainerName: 'Prof. Rajesh Verma',
    published: true,
    learningObjectives: [
      'Implement multi-factor authentication & password governance',
      'Identify phishing attempts, malware, and social engineering attacks',
      'Utilize secure cloud collaboration and document signing'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Cybersecurity Awareness',
        description: 'Protecting personal and organizational digital assets.',
        lessons: [
          {
            id: 'l1',
            title: '1.1 Threat Landscapes and Protection Strategies',
            content: 'Cyber hygiene involves strong unique passphrases, encrypted backups, vigilance against unknown links, and reporting suspicious security anomalies immediately.',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_1280x720.mp4',
            videoTitle: 'Cybersecurity Threat Landscape',
            resources: []
          },
          {
            id: 'l1b',
            title: '1.2 Secure Cloud Collaboration',
            content: 'Use verified cloud workspaces, role-based sharing, multi-factor authentication, and encrypted document signing for official correspondence.',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_1920x1080.mp4',
            videoTitle: 'Secure Cloud Collaboration',
            resources: []
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Assessment',
        description: 'Digital security knowledge check.',
        lessons: [
          {
            id: 'l2',
            title: '2.1 Final Quiz',
            content: 'Take the cybersecurity quiz to earn your security badge.',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4',
            videoTitle: 'Phishing Prevention Drill',
            resources: []
          }
        ]
      }
    ],
    createdAt: new Date('2026-01-20')
  },
  {
    _id: 'c_env_105',
    title: 'Environmental Awareness & Sustainability',
    description: 'Explore renewable energy integration, waste management practices, carbon footprint reduction, and environmental compliance frameworks.',
    category: 'Environmental Science',
    difficulty: 'Beginner',
    duration: '2 Weeks (6 Hours)',
    trainerId: 'u_trainer_1',
    trainerName: 'Dr. Ananya Sharma',
    published: true,
    learningObjectives: [
      'Understand zero-waste circular economy models',
      'Assess municipal waste treatment and segregation principles',
      'Promote community renewable energy adoption'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Sustainable Resource Management',
        description: 'Circular economy and waste reduction techniques.',
        lessons: [
          {
            id: 'l1',
            title: '1.1 Principles of Circular Economy',
            content: 'Designing out waste, circulating products and materials at high value, and regenerating natural systems form the pillars of modern environmental policy.',
            videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
            videoTitle: 'Circular Economy Principles',
            resources: []
          },
          {
            id: 'l1b',
            title: '1.2 Waste Segregation and Renewable Energy',
            content: 'Source segregation, composting, and community solar or biogas units reduce landfill load and municipal carbon intensity.',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
            videoTitle: 'Waste Segregation Field Guide',
            resources: []
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Assessment',
        description: 'Environmental awareness quiz.',
        lessons: [
          {
            id: 'l2',
            title: '2.1 Environmental Quiz',
            content: 'Complete the evaluation to verify your sustainability knowledge.',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
            videoTitle: 'Sustainability Knowledge Check',
            resources: []
          }
        ]
      }
    ],
    createdAt: new Date('2026-01-22')
  }
];

const seedAssessments = [
  {
    _id: 'a_disaster_101',
    courseId: 'c_disaster_101',
    title: 'Disaster Preparedness & Response Certification Exam',
    passingScorePercentage: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the primary objective of a Community-Based Early Warning System (CBEWS)?',
        options: [
          'To generate scientific weather research papers',
          'To deliver timely, actionable warning messages to at-risk populations to save lives',
          'To replace national meteorological agencies completely',
          'To calculate insurance payouts post-disaster'
        ],
        correctAnswer: 1,
        explanation: 'CBEWS focuses on reaching the end-mile vulnerable populations with timely and clear instructions so communities can evacuate safely.'
      },
      {
        id: 'q2',
        question: 'Which element is NOT part of a standard hazard risk equation?',
        options: [
          'Hazard Severity',
          'Vulnerability level',
          'Coping Capacity',
          'Stock Market Indices'
        ],
        correctAnswer: 3,
        explanation: 'Disaster Risk = (Hazard x Vulnerability) / Capacity. Stock market indices are unrelated to physical disaster risk modeling.'
      },
      {
        id: 'q3',
        question: 'During a cyclone warning, what is the safest immediate evacuation shelter requirement?',
        options: [
          'Underneath high-voltage electrical towers',
          'In a reinforced concrete building located away from coastal storm surge lines',
          'In temporary canvas tents placed near river banks',
          'In underground basements vulnerable to tidal flooding'
        ],
        correctAnswer: 1,
        explanation: 'Reinforced concrete structures above flood levels provide wind protection and prevent drowning during coastal surges.'
      },
      {
        id: 'q4',
        question: 'What does the term "Incident Response System (IRS)" specify in disaster management?',
        options: [
          'A standardized management structure for command, control, and coordination of emergency response operations',
          'An automated software for posting emergency updates on social media',
          'A medical diagnosis tool used in hospitals',
          'A weather forecasting satellite system'
        ],
        correctAnswer: 0,
        explanation: 'IRS establishes a clear chain of command and role allocation among emergency services during relief efforts.'
      },
      {
        id: 'q5',
        question: 'What is the primary purpose of a post-disaster rapid damage assessment?',
        options: [
          'To assign blame to local government officials',
          'To immediately identify urgent relief priorities, safety hazards, and resource allocation requirements',
          'To delay financial assistance until full rebuilding is completed',
          'To archive historical records only'
        ],
        correctAnswer: 1,
        explanation: 'Rapid damage assessments help emergency managers allocate food, water, medical supplies, and shelter kits effectively.'
      }
    ]
  },
  {
    _id: 'a_weather_102',
    courseId: 'c_weather_102',
    title: 'Weather & Climate Assessment',
    passingScorePercentage: 70,
    questions: [
      {
        id: 'q1',
        question: 'Which meteorological instrument measures atmospheric pressure?',
        options: ['Thermometer', 'Barometer', 'Anemometer', 'Hygrometer'],
        correctAnswer: 1,
        explanation: 'Barometers measure atmospheric pressure changes, which signal approaching storm fronts or clear weather.'
      },
      {
        id: 'q2',
        question: 'What causes the Urban Heat Island (UHI) effect in major cities?',
        options: [
          'High density of heat-retaining concrete/asphalt and reduced vegetation cover',
          'Excessive rainfall in urban zones',
          'High altitude of city buildings',
          'Geothermal energy release'
        ],
        correctAnswer: 0,
        explanation: 'Concrete and dark paved surfaces absorb and radiate heat, causing urban areas to stay significantly warmer than surrounding rural areas.'
      },
      {
        id: 'q3',
        question: 'What is rain harvesting designed to mitigate?',
        options: ['Earthquake damage', 'Urban flooding and groundwater depletion', 'Air pollution spikes', 'Soil salinity'],
        correctAnswer: 1,
        explanation: 'Rainwater harvesting captures storm runoff to recharge aquifers and prevent sudden urban surface water flooding.'
      }
    ]
  },
  {
    _id: 'a_data_103',
    courseId: 'c_data_103',
    title: 'Data Literacy Assessment',
    passingScorePercentage: 70,
    questions: [
      {
        id: 'q1',
        question: 'What does "Data Integrity" ensure in public sector analytics?',
        options: [
          'Data is secret and hidden from all stakeholders',
          'Data remains accurate, complete, reliable, and unaltered across its lifecycle',
          'Data is stored exclusively on local paper files',
          'Data is automatically deleted every 24 hours'
        ],
        correctAnswer: 1,
        explanation: 'Data integrity guarantees that decisions are based on accurate and tamper-free operational records.'
      },
      {
        id: 'q2',
        question: 'Which chart type is best suited to show progress of a metric over time?',
        options: ['Pie chart', 'Line chart', 'Scatter plot without lines', 'Treemap'],
        correctAnswer: 1,
        explanation: 'Line charts effectively demonstrate trends, trajectories, and temporal changes.'
      }
    ]
  },
  {
    _id: 'a_digital_104',
    courseId: 'c_digital_104',
    title: 'Cybersecurity Essentials Quiz',
    passingScorePercentage: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is Phishing?',
        options: [
          'A method to speed up internet bandwidth',
          'A cyberattack using deceptive communications (emails/SMS) to trick individuals into revealing sensitive credentials',
          'Installing antivirus software on official laptops',
          'Backing up databases to cloud storage'
        ],
        correctAnswer: 1,
        explanation: 'Phishing tricks users into disclosing passwords or clicking malicious links via realistic-looking messages.'
      },
      {
        id: 'q2',
        question: 'What does Multi-Factor Authentication (MFA) require?',
        options: [
          'Using the same password across 5 different websites',
          'Providing two or more verification factors to gain access to an account',
          'Entering a password twice in a row',
          'Sharing your login PIN with team members'
        ],
        correctAnswer: 1,
        explanation: 'MFA adds security by requiring a combination of password, phone OTP, security key, or biometric verification.'
      }
    ]
  },
  {
    _id: 'a_env_105',
    courseId: 'c_env_105',
    title: 'Environmental Science Quiz',
    passingScorePercentage: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the core principle of a Circular Economy?',
        options: [
          'Extract resources, manufacture, and dispose in landfills',
          'Eliminate waste and pollution, circulate products and materials, and regenerate nature',
          'Export all industrial waste to other nations',
          'Stop all manufacturing activity indefinitely'
        ],
        correctAnswer: 1,
        explanation: 'Circular economic models focus on recycling, refurbishing, and reusing materials to minimize landfill impact.'
      }
    ]
  }
];

const seedEnrollments = [
  {
    _id: 'e_1',
    traineeId: 'u_trainee_1',
    courseId: 'c_disaster_101',
    progressPercentage: 75,
    completedModuleIds: ['m1', 'm2', 'm3'],
    status: 'enrolled',
    enrolledAt: new Date('2026-01-20'),
    completedAt: null
  },
  {
    _id: 'e_2',
    traineeId: 'u_trainee_1',
    courseId: 'c_weather_102',
    progressPercentage: 100,
    completedModuleIds: ['m1', 'm2', 'm3'],
    status: 'completed',
    enrolledAt: new Date('2026-01-16'),
    completedAt: new Date('2026-01-28')
  },
  {
    _id: 'e_3',
    traineeId: 'u_trainee_2',
    courseId: 'c_disaster_101',
    progressPercentage: 100,
    completedModuleIds: ['m1', 'm2', 'm3', 'm4'],
    status: 'completed',
    enrolledAt: new Date('2026-01-18'),
    completedAt: new Date('2026-02-02')
  },
  {
    _id: 'e_4',
    traineeId: 'u_trainee_3',
    courseId: 'c_data_103',
    progressPercentage: 50,
    completedModuleIds: ['m1'],
    status: 'enrolled',
    enrolledAt: new Date('2026-02-01'),
    completedAt: null
  }
];

const seedCertificates = [
  {
    _id: 'cert_1001',
    certificateId: 'CAP-2026-88491',
    traineeId: 'u_trainee_1',
    traineeName: 'Rahul Kumar',
    courseId: 'c_weather_102',
    courseName: 'Weather & Climate Awareness',
    issueDate: new Date('2026-01-28'),
    verificationCode: 'VER-WCA-9921'
  },
  {
    _id: 'cert_1002',
    certificateId: 'CAP-2026-99120',
    traineeId: 'u_trainee_2',
    traineeName: 'Priya Singh',
    courseId: 'c_disaster_101',
    courseName: 'Disaster Preparedness & Response',
    issueDate: new Date('2026-02-02'),
    verificationCode: 'VER-DPR-4412'
  }
];

const seedFeedback = [
  {
    _id: 'f_1',
    courseId: 'c_weather_102',
    traineeId: 'u_trainee_1',
    traineeName: 'Rahul Kumar',
    rating: 5,
    courseQuality: 5,
    trainerQuality: 5,
    difficultyRating: 3,
    comments: 'Excellent insights on urban climate action plans and rainfall management!',
    createdAt: new Date('2026-01-29')
  },
  {
    _id: 'f_2',
    courseId: 'c_disaster_101',
    traineeId: 'u_trainee_2',
    traineeName: 'Priya Singh',
    rating: 5,
    courseQuality: 5,
    trainerQuality: 5,
    difficultyRating: 4,
    comments: 'The incident response system lessons were extremely clear and practical for field workers.',
    createdAt: new Date('2026-02-03')
  }
];

const seedNotifications = [
  {
    _id: 'n_1',
    userId: 'u_trainee_1',
    title: 'Assessment Available',
    message: 'You have completed all modules for Disaster Preparedness & Response. You can now take the final assessment!',
    type: 'assessment',
    read: false,
    createdAt: new Date('2026-02-10')
  },
  {
    _id: 'n_2',
    userId: 'u_trainee_1',
    title: 'Certificate Issued',
    message: 'Your certificate for Weather & Climate Awareness is ready for download.',
    type: 'certificate',
    read: true,
    createdAt: new Date('2026-01-28')
  },
  {
    _id: 'n_3',
    userId: 'u_trainee_1',
    title: 'New Course Announcement',
    message: 'Dr. Ananya Sharma uploaded "Environmental Awareness & Sustainability". Check it out!',
    type: 'course',
    read: false,
    createdAt: new Date('2026-02-05')
  }
];

module.exports = {
  seedUsers,
  seedCourses,
  seedAssessments,
  seedEnrollments,
  seedCertificates,
  seedFeedback,
  seedNotifications
};
