// Constants for configuration
const MAX_ITEMS = 100;
const DEFAULT_TIMEOUT = 3000;
const API_BASE_URL = 'https://www.canvace.com/';

// Web development services
const services = [
  { id: 1, name: 'Custom web solutions', available: true },
  { id: 2, name: 'Front-end development', available: true },
  { id: 3, name: 'Back-end development', available: true },
  { id: 4, name: 'Full-stack development', available: true },
  { id: 5, name: 'Website design', available: true },
  { id: 6, name: 'Web application development', available: true },
  { id: 7, name: 'E-commerce solutions', available: true },
  { id: 8, name: 'Landing page development', available: true },
  { id: 9, name: 'UI/UX design', available: true },
  { id: 10, name: 'CMS integration', available: true },
  { id: 11, name: 'Website maintenance', available: true },
  { id: 12, name: 'Responsive design', available: true },
  { id: 13, name: 'SEO optimization', available: true },
  { id: 14, name: 'API integration', available: true }
];

// Utility functions
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function generateRandomId() {
  return Math.floor(Math.random() * 1000000);
}

function debounce(func, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// DOM manipulation helpers
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
}

// API interaction functions
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Post error:', error);
    return null;
  }
}

// Local storage helpers
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
}

function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Retrieval error:', error);
    return null;
  }
}

// Event handling
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
  
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }
}

// Web development project management class
class WebDevProject extends EventEmitter {
  constructor() {
    super();
    this.projects = [];
    this.loading = false;
  }
  
  async initialize() {
    this.loading = true;
    this.emit('loading', true);
    
    // Try to load from local storage first
    const savedProjects = getFromLocalStorage('projects');
    if (savedProjects) {
      this.projects = savedProjects;
      this.emit('projectsLoaded', this.projects);
    } else {
      // Fall back to API
      const fetchedProjects = await fetchData('projects');
      if (fetchedProjects) {
        this.projects = fetchedProjects;
        saveToLocalStorage('projects', this.projects);
        this.emit('projectsLoaded', this.projects);
      }
    }
    
    this.loading = false;
    this.emit('loading', false);
  }
  
  addProject(title, description) {
    const newProject = {
      id: generateRandomId(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      services: ['Website design', 'Responsive design', 'SEO optimization']
    };
    
    this.projects.push(newProject);
    saveToLocalStorage('projects', this.projects);
    this.emit('projectAdded', newProject);
    
    return newProject;
  }
  
  updateProjectStatus(id) {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      project.completed = !project.completed;
      saveToLocalStorage('projects', this.projects);
      this.emit('projectUpdated', project);
    }
  }
}

// Initialize the application
const webDevApp = new WebDevProject();
document.addEventListener('DOMContentLoaded', () => {
  webDevApp.initialize();
});
