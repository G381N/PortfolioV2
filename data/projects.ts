// Shared project data
export const featuredProjects = [
  {
    title: "BugBesty",
    description: "Created in my third semester to streamline bug bounty workflows: automated subdomain enumeration, screenshot capture, phishing checks, and AI-powered report generation using Gemini API. Built with Next.js, REST APIs (including Shodan), and Firebase as the backend.",
    story: "A comprehensive project born from the need to automate repetitive bug bounty tasks. This platform combines multiple security tools and APIs to create an efficient workflow for security researchers and penetration testers.",
    stack: ["Next.js", "Firebase Auth", "Firestore", "Gemini API", "Shodan API"],
    github: "https://github.com/G381N/BugBesty",
    live: "https://bugbesty.onrender.com/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/bugbesty-ui-1.png",
      "/images/bugbesty-ui-2.png",
      "/images/bugbesty-ui-3.png"
    ]
  },
  {
    title: "Elcita WhatsApp Bot",
    description: "Developed for the Electronic City Industrial Township Authority (ELCITA), this WhatsApp bot helps residents access services such as property tax and water bill payments. Built with Node.js, Express.js, and Meta's WhatsApp Cloud API, and deployed on AWS LightSail using PM2 and Nginx.",
    story: "A real-world solution for government services digitization, making civic services accessible through WhatsApp. This project is where I learnt to work with the meta whatsapp cloud api.",
    stack: ["Node.js", "WhatsApp API", "AWS LightSail", "PM2", "Nginx"],
    live: "#",
    whatsapp: "+91 8147148016",
    year: "2025",
    status: "Completed",
    images: [
      "/images/elcita-ui-1.png",
      "/images/elcita-ui-2.png",
      "/images/elcita-ui-3.png"
    ]
  }
];

export const regularProjects = [
   {
    title: "LinkedIn Free Premium Claim – Phishing Simulation (Educational)",
    description: "A simulated phishing page mimicking a LinkedIn Premium offer, built for educational purposes. Demonstrates how attackers use urgency, trust, and AI tools to create convincing baits and harvest credentials. Hosted on Firebase Studio and integrated with Zphisher for credential capture. Strictly for academic awareness—no real malicious activity.",
    stack: ["Firebase Studio", "Zphisher", "AI Tools", "Social Engineering"],
    medium: "https://medium.com/@gebin.official/phishing-in-the-ai-era-how-easy-is-it-to-steal-your-data-df724ad96134",
    year: "2025",
    status: "Completed",
    images: [
      "/images/Linkedin1.png",
      "/images/Linkedin2.png",
      "/images/Linkedin3.png"
    ],
    flipOnly: true
  },
  {
  title: "QuizWiz",
  description: "An AI-powered quiz platform where you can test your knowledge on any topic. Features a competitive leaderboard system where solving quizzes earns points, and you can use those points to buy power-ups for strategic advantages. Built just for fun during free time with Firebase Google Auth and simple collections.",
  stack: ["Next.js", "Firebase", "Google Auth", "AI/LLM", "Firestore"],
  live: "https://quizwiz.gebin.net/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/quizwiz-ui-1.png",
      "/images/quizwiz-ui-2.png", 
      "/images/quizwiz-ui-3.png"
    ]
  },
  {
  title: "38 Week Club",
  description: "A personal gym tracking app I made mainly for myself and a few friends. It follows my fixed 4-day split workout routine and lets me track sets using voice — just say what you did, and it logs it. The AI analyses my past workouts to figure out my actual strength levels and suggests how much weight I should be pushing to hit failure properly.",
  stack: ["Next.js", "Firebase", "Gemini API", "Voice Recognition", "AI Analytics"],
  github: "https://github.com/G381N/38weekClub",
  live: "https://38weekclub.gebin.net/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/38-week-club-ui-1.png",
      "/images/38-week-club-ui-2.png",
      "/images/38-week-club-ui-3.png"
    ]
  },
  {
    title: "LockZero",
    description: "A simple, clean app I built to manage passwords and files securely. You can generate strong passwords, save them, organize your stuff, and even store files safely. Nothing fancy — just a personal vault where your digital keys and documents stay protected.",
    stack: ["Next.js", "Firebase", "Security", "File Storage", "Password Generator"],
    github: "https://github.com/G381N/password-world",
    live: "#",
    year: "2025",
    comingSoon: true,
    status: "Completed",
    images: [
      "/images/password-world-ui-1.png",
      "/images/password-world-ui-2.png"
    ]
  },
  {
  title: "Christ Wellness",
  description: "A dual-module platform for Christ University students. The web app offers a social feed, events, and activities, while the WhatsApp bot enables anonymous complaints, counselor session bookings, and department-based communication. Built with Next.js, Firebase, and WhatsApp Cloud API.",
  stack: ["Firebase Auth", "Next.js", "WhatsApp API", "Firestore"],
  github: "https://github.com/G381N/student-wellness",
  live: "https://christwellness.gebin.net/",
    whatsapp: "+91 9380213122",
    year: "2025",
    status: "Completed",
    images: [
      "/images/christ-wellness-ui-1.png",
      "/images/christ-wellness-ui-2.png",
      "/images/christ-wellness-ui-3.png"
    ]
  },
  {
    title: "GoMovies",
    description: "Created within 90 minutes for a lab exam, I built a movie ticket booking platform entirely in Golang. I used AI to speed up the UI, but all concurrency, session management, and backend logic were coded manually. A solid exercise in fast-paced development.",
    stack: ["Golang","HTML", "CSS", "JavaScript"],
    github: "https://github.com/G381N/GoMAKE",
    live: "https://gomovies.gebin.net/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/gomovies-ui-1.png",
      "/images/gomovies-ui-2.png",
      "/images/gomovies-ui-3.png"
    ]
  },
  {
    title: "Christ Cravings",
    description: "A GUI-based Golang assignment, this food-ordering app was my first hands-on Go GUI project. It includes bill generation and PDF download features—showing what's possible in Golang beyond terminal-based programs. Also its the first time I used Render to host a webservice.",
    stack: ["HTML", "CSS", "JavaScript", "Golang", "Render"],
    github: "https://github.com/G381N/christ-class-delivery",
    live: "https://christcravings.gebin.net/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/christ-cravings-ui-1.png",
      "/images/christ-cravings-ui-2.png",
      "/images/christ-cravings-ui-3.png"
    ]
  },
  {
    title: "Phishing Awareness Demo",
    description: "Built as a college assignment, this interactive project simulates a real phishing attack to raise awareness. It replaces a static poster with a fake login demo and a URL scanner using VirusTotal — showing how urgency can trick even cautious users.",
    stack: ["React", "Next.js", "Tailwind CSS", "Cybersecurity"],
    github: "https://github.com/G381N/Poster",
    live: "https://phishing.gebin.net/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/phishing-demo-ui-1.png",
      "/images/phishing-demo-ui-2.png",
      "/images/phishing-demo-ui-3.png"
    ]
  },
  {
    title: "Code Breaker",
    description: "A spontaneous two-hour lab project from my third semester. Built with Next.js, it showcases basic encryption and decryption operations, along with a playful (and imperfect) steganography attempt. It was a fun deep-dive into crypto fundamentals during a quiet lab session to kill some time.",
    stack: ["Next.js", "Tailwind CSS", "Cryptography","Vercel"],
    github: "https://github.com/G381N/CodeBreaker",
    live: "https://codebreaker.gebin.net/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/codebreaker-ui-1.png",
      "/images/codebreaker-ui-2.png",
      "/images/codebreaker-ui-3.png"
    ]
  },
  {
    title: "Gadi Doctor",
    description: "A vehicle-service portal built from a web dev assignment. Starting from an HTML template, I integrated Google Maps API, created custom REST APIs, added form validations, and structured the frontend—laying the groundwork for future React-based projects.",
    stack: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    github: "https://github.com/G381N/CarService",
    live: "https://gadidoctor.gebin.net/",
    year: "2024",
    status: "Completed",
    images: [
      "/images/gadi-doctor-ui-1.png",
      "/images/gadi-doctor-ui-2.png",
      "/images/gadi-doctor-ui-3.png"
    ]
  },
  {
    title: "One Minute Grace",
    description: "Designed for my father's social media initiative, this Next.js app pulls in daily motivational messages via Facebook and Instagram APIs. It's a simple, inspiring tool to learn social media integration and API consumption.",
    stack: ["Next.js", "Tailwind CSS", "Facebook API", "Instagram API"],
    github: "https://github.com/valianayil/Omg",
    live: "https://www.oneminutegrace.com/",
    year: "2025",
    status: "Completed",
    images: [
      "/images/omg-ui-1.png",
      "/images/omg-ui-2.png",
      "/images/omg-ui-3.png"
    ]
  },
  {
    title: "The Atlas Game",
    description: "A geography-based learning game inspired by GeoGuessr and the Indian 'Atlas' classroom game. Built using Next.js and Firebase (Realtime DB, Auth, Storage), it verifies user entries via Gemini API, dynamically grows the dataset of recognized places, and helps students learn geography interactively.",
    stack: ["Next.js", "Tailwind CSS", "Firebase", "Gemini API"],
    github: "https://github.com/G381N/Atlas",
    live: "#",
    comingSoon: true,
    year: "2025",
    status: "Completed",
    images: [
      "/images/atlas-ui-1.png",
      "/images/atlas-ui-2.png",
      "/images/atlas-ui-3.png"
    ]
  },
  {
    title: "IoT Gas Leakage Sensor",
    description: "This lab project was my introduction to IoT. I built a sensor that detects gas leaks and sends real-time alerts, learning how hardware, firmware, and software intersect. Through this, I explored embedded systems, data transmission, and alert-trigger logic.",
    stack: ["Arduino", "IoT Sensors", "C++", "ESP32", "Real-time Monitoring"],
    github: "https://github.com/G381N/IoT-Gas-Leakage-Sensor",
    live: "https://wokwi.com/projects/435153305648727041",
    year: "2025",
    status: "Completed",
    images: [
      "/images/iot-gas-1.png",
      "/images/iot-gas-2.png",
      "/images/iot-gas-3.png"
    ]
  },
  {
    title: "MyGuardian",
    description: "A spiritual AI companion that provides personalized biblical guidance. Users can share their issues and receive relevant Bible verses from the King James dataset, along with AI-powered insights. Built with privacy-first approach - no user data is stored, ensuring complete confidentiality.",
    stack: ["AI/ML", "Gemini API", "Next.js", "Bible API", "Privacy-First Design"],
    live: "https://myguardian.gebin.net",
    year: "2025",
    status: "Completed",
    images: [
      "/images/guardian-ui-1.png",
      "/images/guardian-ui-2.png",
      "/images/guardian-ui-3.png"
    ]
  },
  {
    title: "Smart Bicycle Sensor System",
    description: "An IoT-based bicycle enhancement system featuring blind spot detection, speedometer, trip meter for maintenance tracking, ambient light sensor for automatic LED indicators, and GPS location tracking. Designed to improve cycling safety and provide comprehensive ride analytics.",
    stack: ["IoT", "Arduino", "GPS Module", "Light Sensors", "Bluetooth", "Mobile App"],
    year: "2025",
    status: "In Development",
    comingSoon: true,
    images: [
      "/images/bike-sensor-1.png",
      "/images/bike-sensor-2.png",
      "/images/bike-sensor-3.png"
    ]
  }
];

// Export total count for easy access
export const getTotalProjectCount = () => featuredProjects.length + regularProjects.length;
