// resumeData.js - Structured entity data mapping Tejas Bharambe's resume & skills
const RESUME_DATA = {
  personal: {
    name: "Tejas Bharambe",
    role: "Backend & Real-Time Systems Engineer",
    subRole: "Distributed Systems & Voice AI",
    location: "Pune, Maharashtra, India",
    phone: "+91-9175784987",
    email: "bharambetejas1803@gmail.com",
    github: "https://github.com/TejassBharambe",
    githubHandle: "TejassBharambe",
    linkedin: "https://www.linkedin.com/in/tejas18/",
    linkedinHandle: "tejas18",
    tagline: "Building high-throughput, low-latency, event-driven streaming microservices and distributed voice AI architectures.",
    valueProp: "Built HSBC's greenfield Voice AI transcription pipeline solo, scaling to 1,200+ concurrent streams with sub-second latency and $5M+/yr estimated savings.",
    bio: "Backend Software Engineer at HSBC Technology India with production experience building real-time, event-driven microservices in Python. Built the PoC solo and scaled a greenfield voice AI platform at HSBC handling 1200+ concurrent audio streams with sub-second latency. Deep hands-on experience with FastAPI, WebSockets, async programming, Kafka, and event-driven real-time streaming architectures.",
    resumeDownloadUrl: "Tejas_Bharambe_Resume.pdf"
  },
  metrics: [
    { value: "1,200+", label: "Concurrent Audio Streams", note: "Sustained sub-second latency under peak load", badge: "Live Traffic" },
    { value: "$5M+", label: "Annual Cost Savings", note: "Replaced third-party vendor with internal engine", badge: "Business ROI" },
    { value: "92%", label: "ASR Transcription Accuracy", note: "Boosted from 45% baseline via WebRTC VAD", badge: "Accuracy Leap" },
    { value: "0.3x", label: "Real-Time Factor (RTF)", note: "3x faster than real-time audio playback", badge: "Speed Benchmark" }
  ],
  skillsCategories: [
    {
      category: "Languages",
      colorClass: "badge-sky",
      skills: ["Python", "C++", "SQL"]
    },
    {
      category: "Backend & Distributed Systems",
      colorClass: "badge-emerald",
      skills: ["FastAPI", "WebSockets", "Asyncio", "Apache Kafka", "Microservices", "REST APIs", "Event-Driven Architecture", "Multiprocessing"]
    },
    {
      category: "Cloud & DevOps",
      colorClass: "badge-lavender",
      skills: ["AWS (EC2, S3, ECS)", "Docker", "CI/CD Pipelines", "Linux / POSIX Systems", "Performance & Load Testing"]
    },
    {
      category: "Core Computer Science",
      colorClass: "badge-amber",
      skills: ["Data Structures & Algorithms", "System Design & Distributed Systems", "Operating Systems", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)"]
    },
    {
      category: "Tools & AI-Assisted",
      colorClass: "badge-rose",
      skills: ["SonarQube", "Git", "GitHub", "Jira", "GitHub Copilot", "Claude Code"]
    }
  ],
  experience: [
    {
      id: "hsbc",
      role: "Software Engineer",
      company: "HSBC Technology India",
      location: "Pune, Maharashtra",
      period: "Jul 2025 – Present",
      isCurrent: true,
      summary: "Spearheaded greenfield voice AI and high-throughput real-time streaming microservices for global contact centre operations.",
      skillsApplied: ["Python", "FastAPI", "WebSockets", "Apache Kafka", "Asyncio", "Microservices", "WebRTC VAD", "AWS", "Docker", "CI/CD", "SonarQube"],
      highlights: [
        {
          text: "Built the **PoC solo** and worked on a greenfield real-time call transcription service in **Python** and **FastAPI**, replacing a third-party vendor tool with an estimated potential saving of **$5M+/year** for HSBC's contact centre operations.",
          tags: ["Python", "FastAPI", "Microservices"]
        },
        {
          text: "Designed a **WebRTC Voice Activity Detection (VAD) pipeline** that improved ASR transcription accuracy from **45% to 92%** and reduced model hallucinations by **95%** by intelligently segmenting audio and eliminating redundant inference calls.",
          tags: ["WebRTC VAD", "Python", "Asyncio"]
        },
        {
          text: "Built **event-driven real-time microservices pipeline**: connection lifecycle management (1:1 per entity), frame-order guarantees via **WebSocket** sequencing, and delta-based **Kafka** publishing, sustaining **1200+ concurrent streams** at **sub-second latency**.",
          tags: ["WebSockets", "Apache Kafka", "Event-Driven Architecture", "Asyncio"]
        },
        {
          text: "Collaborated with a sister team to **define binary payload schemas** and implemented **Kafka-based transcript publishing**, enabling real-time downstream consumption by contact centre analytics systems.",
          tags: ["Apache Kafka", "Microservices", "REST APIs"]
        },
        {
          text: "Developed **custom load testing scripts** to simulate sustained call traffic; benchmarked **sub-second latency** and a Real-Time Factor (RTF) of **~0.3 (3x faster than real-time)** under load.",
          tags: ["Performance & Load Testing", "Python", "Asyncio"]
        },
        {
          text: "Enforced code quality using **SonarQube**, followed **CI/CD** deployment practices on **AWS**, conducted knowledge transfer sessions, and **mentored 2 interns**, accelerating team ramp-up.",
          tags: ["SonarQube", "AWS (EC2, S3, ECS)", "Docker", "CI/CD Pipelines", "Git"]
        }
      ]
    }
  ],
  projects: [
    {
      id: "hsbc-voice-ai",
      title: "Enterprise Voice AI Real-Time Streaming Pipeline",
      category: "Production System @ HSBC",
      badgeColor: "emerald",
      period: "HSBC Technology India (2025)",
      metrics: "1,200+ Streams | Sub-second Latency | 92% Accuracy | $5M+/yr Saved",
      skillsApplied: ["Python", "FastAPI", "WebSockets", "Apache Kafka", "Asyncio", "Microservices"],
      summary: "Greenfield real-time transcription engine built solo to process live telephony streams via WebRTC VAD filtering and event-driven Kafka publishing.",
      bullets: [
        "Architected duplex WebSocket streaming state machine with frame-order guarantees under 1,200+ simultaneous connections.",
        "Engineered WebRTC Voice Activity Detection filter slashing model hallucinations by 95% and lifting ASR accuracy from 45% to 92%.",
        "Streamed delta binary payloads into partitioned Kafka topics for real-time contact centre analytics and CRM ingestion."
      ]
    },
    {
      id: "fractal-compression",
      title: "Parallelized Fractal Image Compression Engine",
      category: "High-Performance Systems",
      badgeColor: "lavender",
      period: "System Architecture",
      github: "https://github.com/TejassBharambe/Fractal-Image-compression-CPU",
      metrics: "50% Encoding Time Reduction | Parallel Multiprocessing",
      skillsApplied: ["Python", "Multiprocessing", "Data Structures & Algorithms", "Operating Systems", "Performance & Load Testing"],
      summary: "Implemented an affine transformation fractal image compression engine in Python, distributing domain-range block searches across all CPU cores.",
      bullets: [
        "Implemented fractal block partitioning and affine mapping algorithm in Python for grayscale and RGB images.",
        "Profiled the encoding bottleneck using cProfile to locate compute-heavy domain-to-range affine comparisons.",
        "Parallelized the pipeline across all CPU cores with Python's multiprocessing module, slashing encoding time by **50%**."
      ]
    },
    {
      id: "retinal-disease",
      title: "Automated Retinal Disease Detection System",
      category: "Computer Vision & Medical AI",
      badgeColor: "sky",
      period: "Deep Learning Research",
      github: "https://github.com/TejassBharambe/Retinal-disease-classification",
      metrics: "95.9% Test Accuracy (+31.9% Gain Over Baseline)",
      skillsApplied: ["Python", "PyTorch", "Data Structures & Algorithms"],
      summary: "Trained a convolutional neural network (CNN) using PyTorch with ResNet-based transfer learning for automated retinal disease detection.",
      bullets: [
        "Engineered end-to-end deep learning pipeline in PyTorch utilizing ResNet transfer learning for multi-class ocular pathology detection.",
        "Achieved **95.9% accuracy**, marking a **31.9% performance leap** over baseline models.",
        "Rigorously evaluated model performance using confusion matrices and per-class classification reports."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech, Artificial Intelligence and Data Science",
      institution: "Vishwakarma Institute of Technology (VIT), Pune",
      period: "Graduated May 2025",
      score: "CGPA: 8.75 / 10.00",
      details: "Comprehensive coursework across Distributed Systems, Machine Learning, Operating Systems, Computer Networks, and Database Management."
    }
  ],
  leadership: [
    {
      role: "Technical Executive Member",
      organization: "IEEE Student Branch, VIT Pune",
      details: "Led data-driven PR strategy and stakeholder engagement for flagship technical events with **500+ attendees**; managed corporate sponsorship acquisition across industry partners."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RESUME_DATA;
}
