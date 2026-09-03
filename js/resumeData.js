// resumeData.js - Structured entity data for Tejas Bharambe's portfolio
const RESUME_DATA = {
  personal: {
    name: "Tejas Bharambe",
    role: "Backend Software Engineer",
    subRole: "Real-Time Systems & Distributed Voice AI",
    location: "Pune, Maharashtra, India",
    phone: "+91-9175784987",
    email: "bharambetejas1803@gmail.com",
    github: "https://github.com/TejassBharambe",
    githubHandle: "TejassBharambe",
    linkedin: "https://www.linkedin.com/in/tejas18/",
    linkedinHandle: "tejas18",
    tagline: "Building high-throughput, low-latency, event-driven streaming microservices and distributed voice AI architectures.",
    bio: "Backend Software Engineer at HSBC Technology India with production experience building real-time, event-driven microservices in Python. Built the PoC solo and scaled a greenfield voice AI platform at HSBC handling 1200+ concurrent audio streams with sub-second latency. Deep hands-on experience with FastAPI, WebSockets, async programming, Kafka, and event-driven real-time streaming architectures.",
    resumeDownloadUrl: "main.md"
  },
  metrics: [
    { value: "1,200+", label: "Concurrent Audio Streams", note: "Sustained sub-second latency at HSBC" },
    { value: "$5M+", label: "Annual Cost Savings", note: "Replacing legacy third-party vendor platform" },
    { value: "92%", label: "ASR Accuracy (Up from 45%)", note: "WebRTC VAD pipeline eliminating noise" },
    { value: "3x", label: "Real-Time Factor (RTF ~0.3)", note: "Sub-second benchmarked under sustained load" }
  ],
  skillsCategories: [
    {
      category: "Languages",
      skills: ["Python", "C++", "SQL"]
    },
    {
      category: "Backend & Streaming",
      skills: ["FastAPI", "WebSockets", "Asyncio", "Apache Kafka", "Microservices", "REST APIs", "Event-Driven Architecture", "Multiprocessing"]
    },
    {
      category: "Cloud & Infrastructure",
      skills: ["AWS (EC2, S3, ECS)", "Docker", "CI/CD Pipelines", "Linux / POSIX Systems", "Performance & Load Testing"]
    },
    {
      category: "Core Computer Science",
      skills: ["Data Structures & Algorithms", "System Design & Distributed Systems", "Operating Systems", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)"]
    },
    {
      category: "Code Quality & Tools",
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
      highlights: [
        "Built the **PoC solo** and engineered a greenfield real-time call transcription service in **Python** and **FastAPI**, replacing a third-party vendor tool with an estimated potential saving of **$5M+/year** for HSBC's contact centre operations.",
        "Designed a **WebRTC Voice Activity Detection (VAD) pipeline** that boosted ASR transcription accuracy from **45% to 92%** and slashed model hallucinations by **95%** by intelligently segmenting audio and eliminating redundant inference calls.",
        "Architected **event-driven real-time microservices pipeline**: connection lifecycle management (1:1 per entity), frame-order guarantees via WebSocket sequencing, and delta-based Kafka publishing, sustaining **1200+ concurrent streams** at **sub-second latency**.",
        "Collaborated cross-functionally to **define binary payload schemas** and implemented **Kafka-based transcript publishing**, enabling real-time downstream consumption by contact centre analytics systems.",
        "Developed **custom load testing scripts** to simulate sustained call traffic; benchmarked **sub-second latency** and an RTF of **~0.3 (3x faster than real-time)** under load.",
        "Enforced rigorous code quality via **SonarQube**, followed **CI/CD** deployment practices on **AWS**, conducted knowledge transfer sessions, and **mentored 2 interns**, accelerating team ramp-up."
      ],
      deepDive: {
        title: "HSBC Greenfield Real-Time Voice AI Pipeline Architecture",
        challenge: "Third-party enterprise transcription software cost HSBC over $5M annually while suffering from high latency, low accuracy on noisy contact-centre telephony audio (45%), and persistent model hallucinations caused by hold music and background static.",
        solution: "Engineered a custom FastAPI + WebSockets streaming engine paired with WebRTC Voice Activity Detection. The VAD layer strips dead-air and background noise frames before speech chunks are dispatched for transcription. Guaranteed frame ordering over duplex WebSockets and streamed structured delta payloads into Kafka for real-time contact centre analytics.",
        architectureHighlights: [
          "Stateful 1:1 WebSocket connection lifecycle per concurrent audio caller",
          "WebRTC VAD pre-filter eliminating 95% of hallucination-inducing background packets",
          "Delta-based Kafka publisher with partitioned topics ensuring strict in-order processing",
          "Engineered for sub-second roundtrip with benchmarked RTF ~0.3 at 1,200+ streams"
        ],
        tags: ["FastAPI", "WebRTC VAD", "Kafka", "WebSockets", "Asyncio", "AWS", "Python"]
      }
    }
  ],
  projects: [
    {
      id: "fractal-compression",
      title: "Fractal Image Compression",
      subtitle: "Parallelized CPU Image Compression Engine",
      period: "System Architecture",
      github: "https://github.com/TejassBharambe/Fractal-Image-compression-CPU",
      summary: "Implemented an affine transformation fractal image compression algorithm in Python for grayscale and RGB images, profiling bottlenecks and parallelizing the pipeline across CPU cores.",
      metrics: "50% Encoding Time Reduction",
      tags: ["Python", "Multiprocessing", "Parallel Computing", "Algorithms", "Performance Optimization"],
      bullets: [
        "Implemented a fractal image compression algorithm in Python for grayscale and RGB images.",
        "Profiled the encoding bottleneck using cProfile to locate compute-heavy domain-to-range affine mappings.",
        "Parallelized the pipeline across all CPU cores with Python's multiprocessing module, slashing encoding time by **50%**."
      ],
      deepDive: {
        problem: "Fractal compression produces compact, resolution-independent representations but suffers from notorious O(N^4) compute overhead during domain-range block correlation.",
        solution: "Partitioned images into domain and range blocks, vectorized color channel comparisons, and mapped search blocks onto shared-memory multiprocessing worker pools across all CPU threads.",
        results: ["50% reduction in end-to-end compression runtime", "Dual support for grayscale and full 24-bit RGB images"]
      }
    },
    {
      id: "retinal-disease",
      title: "Retinal Disease Classification",
      subtitle: "Deep Learning Medical Diagnostic Classifier",
      period: "Computer Vision",
      github: "https://github.com/TejassBharambe/Retinal-disease-classification",
      summary: "Trained a convolutional neural network (CNN) using PyTorch with ResNet-based transfer learning for automated retinal disease detection, boosting baseline accuracy by 31.9%.",
      metrics: "95.9% Test Accuracy (+31.9% over baseline)",
      tags: ["PyTorch", "CNN", "Transfer Learning", "ResNet", "Computer Vision", "Medical AI"],
      bullets: [
        "Trained a CNN using PyTorch with ResNet-based transfer learning for automated retinal disease detection.",
        "Achieved **95.9% accuracy**, marking a **31.9% improvement** over the untrained baseline.",
        "Rigorously evaluated model performance using confusion matrices and per-class classification reports."
      ],
      deepDive: {
        problem: "Ocular fundus imaging datasets exhibit subtle pathological micro-aneurysms, varying lighting conditions, and heavy class imbalance.",
        solution: "Utilized pre-trained deep ResNet architectures, tuned with adaptive learning rate schedulers, focal loss, and comprehensive image augmentations (rotation, shear, contrast normalization).",
        results: ["95.9% multi-class accuracy", "Significant reduction in false negatives across rare ocular pathologies"]
      }
    }
  ],
  education: [
    {
      degree: "B.Tech, Artificial Intelligence and Data Science",
      institution: "Vishwakarma Institute of Technology, Pune",
      period: "Graduated May 2025",
      score: "CGPA: 8.75 / 10.00",
      details: "Rigorous coursework across Distributed Systems, Machine Learning, Operating Systems, Computer Networks, and Database Management."
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
