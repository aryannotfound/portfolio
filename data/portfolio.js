'use strict';

window.portfolioContent = (() => {
  const b = (de, en) => ({ de, en });

  const profile = {
    name: 'Aryan Desai',
    initials: 'AD',
    headline: b('Wirtschaftsinformatik', 'Business Informatics'),
    focus: b('Technologie, Daten & Geschäftsprozesse', 'Technology, Data & Business Processes'),
    location: b('Saarbrücken, Deutschland', 'Saarbrücken, Germany'),
    university: 'Universität des Saarlandes',
    email: 'aryandesai8108@gmail.com',
    availability: { start: '2027-01-01', hours: b('16–20 Std./Woche im Semester', '16–20 hours/week during the semester') },
    links: { linkedin: '', github: '', website: '' },
    cv: './assets/documents/Aryan_Desai_CV.pdf',
    portrait: null,
    intro: b(
      'Ich studiere an der Universität des Saarlandes und interessiere mich dafür, wie Unternehmen mit guten Daten und passender Software ihre Abläufe verbessern.',
      'I study at Saarland University and am interested in how companies use reliable data and well-designed software to improve the way they work.'
    ),
    about: [
      b('An der Universität des Saarlandes studiere ich Wirtschaftsinformatik. Mich interessiert, wie aus fachlichen Anforderungen technische Lösungen werden, die im Arbeitsalltag helfen.',
        'I study Business Informatics at Saarland University. I’m interested in turning business requirements into technical solutions that help people in their everyday work.'),
      b('Bei EIA betreue ich digitale Lernangebote und Nutzerzugänge. Bei ZF habe ich Produktions- und Qualitätsdaten gepflegt und geprüft. Diese Erfahrungen möchte ich in Beratung, Datenanalyse und Prozessoptimierung vertiefen. Besonders interessiert mich, wie digitale Systeme auch nachhaltigeres Wirtschaften unterstützen können.',
        'At EIA, I support digital learning and manage user access. At ZF, I maintained and checked production and quality data. I want to build on that experience in consulting, data analysis and process improvement. I’m particularly interested in how digital systems can support more sustainable business practices.')
    ],
    interests: [
      b('IT- und Technologieberatung', 'IT and Technology Consulting'),
      b('Business Analysis und Datenanalyse', 'Business Analysis and Data Analytics'),
      b('Digitale Transformation und Informationssysteme', 'Digital Transformation and Information Systems'),
      b('Softwareentwicklung und IT-Management', 'Software Development and IT Management'),
      b('Projektmanagement und Prozessoptimierung', 'Project Management and Process Improvement'),
      b('Finanzwesen und Banking', 'Finance and Banking'),
      b('ESG und Nachhaltigkeit', 'ESG and Sustainability')
    ]
  };

  const experience = [
    {
      id: 'eia', company: 'EIA', location: 'Saarbrücken', start: '2026-02', end: '',
      role: b('Werkstudent – IT-Support und digitale Administration', 'Working Student – IT Support and Digital Administration'),
      summary: b('Technischer Support, digitale Lernangebote und Nutzerverwaltung.', 'Technical support, digital learning and user administration.'),
      duties: [
        b('Serverdienste und Online-Meetings starten und überwachen sowie Störungen bei Audio-, Portal- und Präsentationstechnik beheben.', 'Start and monitor server services and online meetings and troubleshoot audio, portal and presentation technology.'),
        b('Nutzerzugänge verwalten, Lernmaterialien aktualisieren und Lehrende sowie Teilnehmende bei technischen Fragen unterstützen.', 'Manage user access, update learning materials and provide technical support to instructors and participants.'),
        b('An der Digitalisierung von Anwesenheitslisten mitwirken sowie Teilnehmerdaten, Akten und Dokumentenstrukturen pflegen.', 'Help digitize attendance records and maintain participant data, files and document structures.'),
        b('Prüfungsunterlagen organisieren, kontrollieren und weiterleiten sowie bei Recherchen und der Kursorganisation unterstützen.', 'Organize, check and forward exam documents and assist with research and course coordination.')
      ],
      skills: [b('IT-Support', 'IT Support'), b('Nutzerverwaltung', 'User Administration'), b('Digitale Dokumentation', 'Digital Documentation')]
    },
    {
      id: 'zf', company: 'ZF Friedrichshafen AG', location: 'Saarbrücken', start: '2024-07', end: '2024-09',
      role: b('Werkstudent / Praktikant – Produktionsdaten und IT-Support', 'Working Student / Intern – Production Data and IT Support'),
      summary: b('Produktionsdaten, Qualitätsdokumentation und betrieblicher IT-Support.', 'Production data, quality documentation and operational IT support.'),
      duties: [
        b('Bauteildaten und Produktionsprotokolle erfassen und pflegen sowie Fehler- und Ausschusslisten abgleichen.', 'Record and maintain component data and production logs, and cross-check defect and scrap lists.'),
        b('Bei Qualitätskontrollen an Maschinen mitwirken und den betrieblichen IT-Support unterstützen.', 'Assist with machine-side quality checks and operational IT support.')
      ],
      skills: [b('Datenpflege', 'Data Management'), b('Datenprüfung', 'Data Validation'), b('Qualitätsdokumentation', 'Quality Documentation')]
    },
    {
      id: 'mcd', company: 'McDonald’s', location: 'Saarbrücken', start: '2023-03', end: '2026-01',
      role: b('Mitarbeiter – IT-Support und kaufmännische Administration', 'Team Member – IT Support and Business Administration'),
      summary: b('IT-Support im Betriebsalltag, Rechnungen und Bestandsdaten.', 'Day-to-day IT support, invoice processing and inventory data.'),
      duties: [
        b('Bei IT-Fragen im Betriebsalltag unterstützen, Rechnungen bearbeiten sowie Waren- und Bestandsdaten erfassen.', 'Help with day-to-day IT issues, process invoices and record product and inventory data.'),
        b('Administrative Vorgänge strukturiert dokumentieren. Zuletzt auf Minijob-Basis tätig.', 'Document administrative procedures. Most recently employed on a marginal part-time basis (Minijob).')
      ],
      skills: [b('Rechnungsbearbeitung', 'Invoice Processing'), b('Bestandsdaten', 'Inventory Data'), b('IT-Support', 'IT Support')]
    }
  ];

  const areas = {
    graphics: b('Computergrafik', 'Computer Graphics'),
    oop: b('Objektorientierung', 'Object-Oriented Design'),
    testing: b('Softwaretests', 'Software Testing')
  };

  const categories = {
    engineering: b('Softwareentwicklung', 'Software Engineering'),
    university: b('Hochschulprojekte', 'University Projects'),
    personal: b('Persönliche Projekte', 'Personal Projects'),
    data: b('Datenanalyse', 'Data Analytics'),
    bi: 'Business Intelligence',
    ai: b('Künstliche Intelligenz', 'Artificial Intelligence'),
    mining: 'Process Mining',
    security: b('Cybersicherheit', 'Cybersecurity'),
    finance: b('Finanzwesen', 'Finance'),
    esg: b('ESG und Nachhaltigkeit', 'ESG and Sustainability')
  };

  const projects = [
    {
      id: 'raycaster', title: 'RayCaster', published: true, illustration: 'raycaster',
      languages: ['C'], areas: ['graphics'], categories: ['engineering', 'university'],
      summary: b('Perspektivische Ansichten aus textbasierten 2D-Karten.', 'Perspective views generated from text-based 2D maps.'),
      details: b('Das C-Projekt liest textbasierte Karten ein und berechnet durch Raycasting eine perspektivische Ansicht. Zum Projekt gehören die Bildausgabe und ein Texturkonzept.', 'This C project reads text-based maps and uses raycasting to calculate a perspective view. It covers image output and texture concepts.'),
      concepts: [ 'Raycasting', b('Algorithmen', 'Algorithms'), b('Datenstrukturen', 'Data Structures'), b('Dateiverarbeitung', 'File Processing') ],
      challenge: b('Eine textbasierte Karte einlesen und ihre Geometrie in eine perspektivische Ansicht übertragen.', 'Parsing a text-based map and projecting its geometry into a perspective view.'),
      lessons: null, improvements: null, status: null, media: [], repository: '', demo: ''
    },
    {
      id: 'tic-tac-toe', title: 'Ultimate Tic-Tac-Toe', published: true, illustration: 'grid',
      languages: ['Java'], areas: ['oop', 'testing'], categories: ['engineering', 'university'],
      summary: b('Verschachtelte Spielfelder, objektorientierte Architektur und testbare Schnittstellen.', 'Nested boards, object-oriented architecture and testable interfaces.'),
      details: b('Das Java-Projekt modelliert die Regeln für verschachtelte Spielfelder. Die Architektur nutzt das Factory Pattern, und die Spiellogik lässt sich über testbare Schnittstellen mit JUnit prüfen.', 'This Java project models the rules for nested boards. It uses the Factory Pattern and exposes testable interfaces for verifying game logic with JUnit.'),
      concepts: ['Factory Pattern', 'JUnit', b('Objektorientierte Programmierung', 'Object-Oriented Programming'), b('Softwaretests', 'Software Testing')],
      challenge: b('Die Regeln zweier ineinandergreifender Spielfeldebenen in testbaren Komponenten abbilden.', 'Modeling the rules of two interdependent board levels in testable components.'),
      lessons: null, improvements: null, status: null, media: [], repository: '', demo: ''
    },
    {
      id: 'raytracer', title: 'RayTracer', published: true, illustration: 'raytracer',
      languages: ['Java'], areas: ['graphics', 'oop', 'testing'], categories: ['engineering', 'university'],
      summary: b('3D-Rendering mit geometrischen Schnittpunkten, Schattierung und BVH.', '3D rendering with geometric intersections, shading and BVH.'),
      details: b('Das Java-Projekt behandelt geometrische Schnittpunkte, Schattierungsverfahren und OBJ-Modelle. Eine Bounding Volume Hierarchy (BVH) dient als Beschleunigungsstruktur. JUnit gehört zum Projektumfang.', 'This Java project covers geometric intersections, shading techniques and OBJ models. A bounding volume hierarchy (BVH) is used for acceleration, and the project includes JUnit testing.'),
      concepts: ['3D Rendering', 'OBJ', 'BVH', 'JUnit', b('Lineare Algebra', 'Linear Algebra'), b('Algorithmen', 'Algorithms'), b('Objektorientierter Entwurf', 'Object-Oriented Design')],
      challenge: b('Geometrische Schnittpunkte für 3D-Szenen berechnen und die Suche mit einer BVH strukturieren.', 'Calculating geometric intersections in 3D scenes and structuring the search with a BVH.'),
      lessons: null, improvements: null, status: null, media: [], repository: '', demo: ''
    }
  ];

  const item = (name, evidence = [], learning = false) => ({ name, evidence, learning });
  const skills = [
    { id: 'programming', title: b('Programmierung', 'Programming'), icon: 'code', items: [
      item('Java', ['tic-tac-toe', 'raytracer']), item('C', ['raycaster']), item('Python'), item('OCaml'), item('MIPS'), item('RISC-V')
    ] },
    { id: 'engineering', title: 'Software Engineering', icon: 'layers', items: [
      item(b('Objektorientierte Programmierung', 'Object-Oriented Programming'), ['tic-tac-toe']),
      item(b('Objektorientierter Entwurf', 'Object-Oriented Design'), ['tic-tac-toe', 'raytracer']),
      item(b('Softwaretests', 'Software Testing'), ['tic-tac-toe', 'raytracer']),
      item(b('Algorithmen', 'Algorithms'), ['raycaster', 'raytracer']),
      item(b('Datenstrukturen', 'Data Structures'), ['raycaster'])
    ] },
    { id: 'processes', title: b('Daten & Geschäftsprozesse', 'Data & Business Processes'), icon: 'data', items: [
      item('Microsoft Excel'), item('Microsoft Word'), item('Microsoft PowerPoint'),
      item(b('Datenerfassung und -pflege', 'Data Entry and Management'), ['zf', 'eia', 'mcd']),
      item(b('Datenprüfung', 'Data Validation'), ['zf']), item(b('Digitale Dokumentation', 'Digital Documentation'), ['eia', 'mcd']),
      item(b('Pivot-Tabellen', 'PivotTables'), [], true), item('Power Query', [], true), item('Fluxicon DISCO', [], true)
    ] },
    { id: 'tools', title: b('Entwicklungswerkzeuge', 'Development Tools'), icon: 'tool', items: [
      ...['VS Code', 'GitHub', 'IntelliJ IDEA', 'Docker', 'Jupyter Notebook', 'Terminal', 'LaTeX', 'Maple'].map(name => item(name))
    ] },
    { id: 'systems', title: b('Betriebssysteme', 'Operating Systems'), icon: 'screen', items: ['macOS', 'Linux', 'Windows'].map(name => item(name)) },
    { id: 'competencies', title: b('Arbeitsweise', 'Professional Competencies'), icon: 'people', items: [
      item(b('Analytisches Denken', 'Analytical Thinking')), item(b('Problemlösung', 'Problem Solving')),
      item(b('Kommunikation', 'Communication')), item(b('Teamarbeit', 'Teamwork')), item(b('Eigenorganisation', 'Self-Organization'))
    ] }
  ];

  const education = [
    { institution: profile.university, program: b('B.Sc. Wirtschaftsinformatik', 'B.Sc. Business Informatics'), start: '2026-10', end: '' },
    { institution: profile.university, program: b('Vorbereitungsstudium International MINT · Probestudium (BSE MINT)', 'International STEM Preparatory Programme · Trial Studies (BSE MINT)'), start: '2024-10', end: '2026-07' },
    { institution: profile.university, program: b('Vorbereitungsstudium International MINT · Vorbereitungsphase (VSI MINT)', 'International STEM Preparatory Programme · Preparatory Phase (VSI MINT)'), start: '2023-03', end: '2024-07' }
  ];

  const modules = {
    completed: [b('Höhere Mathematik für Ingenieure I', 'Advanced Mathematics for Engineers I'), b('Programmierung 2', 'Programming 2')],
    current: [],
    planned: ['Process Mining', 'Sustainable Finance', b('Informationssysteme', 'Information Systems'), b('Datenanalyse', 'Data Analytics')],
    achievements: []
  };

  const certificates = ['Java Programming', 'C Programming', 'Maple'].map(title => ({ title, issuer: '', image: '', verification: '' }));
  const languages = [
    { name: b('Deutsch', 'German'), level: b('C1 · C2-Kurs laufend', 'C1 · currently attending a C2 course') },
    { name: b('Englisch', 'English'), level: 'C2' },
    { name: 'Hindi', level: b('Muttersprache', 'Native') },
    { name: b('Marathi', 'Marathi'), level: b('Muttersprache', 'Native') }
  ];
  const volunteering = [];

  const copy = {
    home: b('Start', 'Home'), about: b('Über mich', 'About'), experience: b('Erfahrung', 'Experience'),
    projects: b('Projekte', 'Projects'), skills: b('Kenntnisse', 'Skills'), education: b('Studium', 'Education'), contact: b('Kontakt', 'Contact'),
    nav: b('Hauptnavigation', 'Main navigation'), skip: b('Zum Inhalt springen', 'Skip to content'),
    menu: b('Menü', 'Menu'), light: b('Helles Design aktivieren', 'Switch to light mode'), dark: b('Dunkles Design aktivieren', 'Switch to dark mode'),
    portfolio: b('Portfolio', 'Portfolio'), student: b('Werkstudent', 'Working student'),
    available: b('Verfügbar ab', 'Available from'), viewProjects: b('Projekte ansehen', 'View projects'),
    download: b('Lebenslauf herunterladen', 'Download CV'), contactMe: b('Kontakt aufnehmen', 'Contact me'),
    aboutTitle: b('Technik im betrieblichen Alltag', 'Technology in everyday operations'),
    interests: b('Berufliche Interessen', 'Career interests'),
    experienceTitle: b('Berufserfahrung', 'Professional experience'), present: b('Heute', 'Present'),
    projectsTitle: b('Programmierprojekte', 'Programming projects'),
    projectsIntro: b('Ausgewählte Arbeiten aus dem Studium.', 'Selected work from my studies.'),
    language: b('Programmiersprache', 'Programming language'), area: b('Fachgebiet', 'Technical area'), category: b('Kategorie', 'Category'),
    all: b('Alle', 'All'), reset: b('Filter zurücksetzen', 'Reset filters'),
    empty: b('Für diese Filterkombination gibt es keine Projekte.', 'No projects match these filters.'),
    projectCount: b('Projekte gefunden', 'projects found'), projectSingle: b('Projekt gefunden', 'project found'),
    details: b('Details ansehen', 'View details'), close: b('Schließen', 'Close'),
    status: b('Entwicklungsstand', 'Development status'), challenge: b('Technische Herausforderung', 'Technical challenge'),
    lessons: b('Erkenntnisse', 'Lessons learned'), improvements: b('Mögliche Erweiterungen', 'Future improvements'), demo: b('Live-Demo', 'Live demo'),
    skillsTitle: b('Technische Kenntnisse', 'Technical skills'), skillsIntro: b('Werkzeuge, Methoden und ausgewählte Praxisbeispiele.', 'Tools, methods and selected examples of where I’ve used them.'),
    learning: b('In Einarbeitung', 'Currently learning'), evidence: b('Praxisbeispiele', 'Examples'),
    educationTitle: b('Studium & Qualifikationen', 'Education & qualifications'),
    completed: b('Abgeschlossene Module', 'Completed modules'), current: b('Laufende Module', 'Current modules'),
    planned: b('Fachliche Interessen & geplante Kurse', 'Academic interests & planned courses'), achievements: b('Studienleistungen', 'Academic achievements'),
    certs: b('Zertifikate', 'Certifications'), verify: b('Zertifikat prüfen', 'Verify certificate'), spoken: b('Sprachen', 'Languages'),
    volunteering: b('Engagement', 'Volunteering'),
    contactTitle: b('Lassen Sie uns sprechen.', 'Let’s talk.'),
    contactIntro: b('Ich freue mich über Nachrichten zu Werkstudentenstellen und zum fachlichen Austausch.', 'I welcome messages about working student roles and opportunities to connect.'),
    emailMe: b('E-Mail schreiben', 'Send an email'), top: b('Nach oben', 'Back to top'),
    meta: b('Aryan Desai, Student der Wirtschaftsinformatik in Saarbrücken. Berufserfahrung in IT-Support und Datenpflege sowie Projekte in C und Java.', 'Aryan Desai, Business Informatics student in Saarbrücken. Experience in IT support and data management, with projects in C and Java.')
  };

  return { profile, experience, areas, categories, projects, skills, education, modules, certificates, languages, volunteering, copy };
})();
