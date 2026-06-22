const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Leadership",
    link: "#leadership",
  },
  {
    name: "Skills",
    link: "#skills",
  },
];

const words = [
  { text: "Products", imgPath: "/images/ideas.svg" },
  { text: "Tools", imgPath: "/images/concepts.svg" },
  { text: "Systems", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Products", imgPath: "/images/ideas.svg" },
  { text: "Tools", imgPath: "/images/concepts.svg" },
  { text: "Systems", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 20, suffix: "+", label: "Projects Built" },
  { value: 100, suffix: "+", label: "GitHub Repositories" },
  { value: 4, suffix: "+", label: "Leadership Roles" },
  { value: 5, suffix: "", label: "Hackathon Top 5 Winner" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Product-Focused Engineering",
    desc: "Building projects with real users, practical workflows, and clear outcomes in mind.",
  },
  {
    imgPath: "/images/chat.png",
    title: "AI-Assisted Development",
    desc: "Using AI tools for faster planning, debugging, architecture, and product iteration.",
  },
  {
    imgPath: "/images/time.png",
    title: "Technical Leadership",
    desc: "Leading student tech initiatives, mentoring peers, and shipping community projects.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Umar works on backend systems and practical software development at Mulearn Foundation, contributing to real-world technical workflows and product features.",
    imgPath: "/images/mulearn.png",
    logoPath: "/images/mulearn_logo.png",
    title: "Backend Intern - Mulearn Foundation",
    date: "January 2026 - Present",
    responsibilities: [
      "Contributed to backend development tasks for Mulearn Foundation projects.",
      "Worked with APIs, databases, debugging, and production-oriented development workflows.",
      "Improved understanding of scalable backend systems, collaboration, and real-world software delivery.",
    ],
  },
  {
    review:
      "Umar contributed to backend systems and AI integration for a Smart City littering detection and alert dashboard.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Backend Developer - Smart City Project",
    date: "December 2024 - Present",
    responsibilities: [
      "Developed backend APIs for a littering detection and alert dashboard.",
      "Worked with Node.js, MongoDB, YOLO, and OpenCV for real-time event detection.",
      "Collaborated with frontend developers to support city-administration workflows.",
    ],
  },
  {
    review:
      "Umar worked on Kasaroam, a tourism-focused web platform, contributing to frontend development and user-facing features.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Web Developer - Kasaroam",
    date: "January 2025 - Present",
    responsibilities: [
      "Built and improved user-facing sections of the Kasaroam tourism platform.",
      "Worked on responsive layouts, visual design, and frontend interactions.",
      "Collaborated with a student-led team to deliver a public-facing web project.",
    ],
  },
  {
    review:
      "Umar built FocusFlow during the Codex Community Hackathon Kochi 2026, turning an idea into an open-source desktop product.",
    imgPath: "/images/codex1.png",
    logoPath: "/images/codex.png",
    title: "Top 5 Winner - Codex Community Hackathon Kochi 2026",
    date: "2026",
    responsibilities: [
      "Built FocusFlow, an open-source desktop app for focused screen-recording edits.",
      "Implemented click tracking, automatic zoom/pan timelines, and FFmpeg-based export.",
      "Used Rust, Tauri, React, and AI-assisted development workflows to ship quickly.",
    ],
  },
];

const leadershipCards = [
  {
    title: "Technology Lead / CTO - IEDC LBSCEK",
    date: "January 2025 - December 2025",
    desc: "Leading technology initiatives, student developer workflows, and digital systems for IEDC LBSCEK.",
    points: [
      "Led web platforms, event systems, and internal technical initiatives.",
      "Mentored students on Git, debugging, full-stack development, and AI-assisted building.",
      "Supported student innovation activities, workshops, and product-building efforts.",
    ],
  },
  {
    title: "Chair - IEEE Sensors Council SBC LBSCEK",
    date: "November 2026 - Present",
    desc: "Leading a student branch chapter focused on Sensors, IoT, automation, and technical awareness.",
    points: [
      "Planning workshops, technical talks, quizzes, and awareness sessions.",
      "Coordinating documentation, speaker outreach, and event execution.",
      "Building participation around Sensors Council activities at LBSCEK.",
    ],
  },
  {
    title: "Webmaster - IEEE IA/IE/PELS JT Chapter Kerala",
    date: "February 2026 - Present",
    desc: "Managing web and digital presence for IEEE IA/IE/PELS Joint Chapter Kerala.",
    points: [
      "Supported website maintenance and technical updates.",
      "Worked on improving digital visibility and reliability.",
      "Handled web-related tasks for chapter activities and documentation.",
    ],
  },
  {
    title: "IEEE IAS SBC LBSCEK - Student Chapter Contributor",
    date: "July 2025 - March 2026",
    desc: "Contributed to IEEE IAS student branch activities, website work, and chapter initiatives.",
    points: [
      "Supported IEEE IAS SBC digital and event activities.",
      "Worked on documentation, website improvements, and award-related submissions.",
      "Contributed to student-led technical community building.",
    ],
  },
];

const expLogos = [
  {
    name: "Mulearn",
    imgPath: "/images/mulearn_logo.jpg",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
  {
    name: "logo4",
    imgPath: "/images/logo4.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "github",
    url: "https://github.com/UmarAlMukhtar",
    imgPath: "/images/github.png",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/umaralmukhtaribrahimkutty/",
    imgPath: "/images/linkedin.png",
  },
  {
    name: "x",
    url: "https://x.com/UmarAlMukhtar_",
    imgPath: "/images/x.png",
  },
  {
    name: "insta",
    url: "https://www.instagram.com/umaralmukhtar_/",
    imgPath: "/images/insta.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  leadershipCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
