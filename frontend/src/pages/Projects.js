import React, { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Parallax.css';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalImageRef = useRef(null);
  const isScrollingRef = useRef(false);

  const projects = [
    {
      title: 'Luxury Residential Estate',
      category: 'Residential',
      location: 'Brisbane, QLD',
      year: '2024',
      description: 'Premium steel frame construction for a luxury residential estate featuring 15 custom homes with modern architectural design and sustainable building practices.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop'
      ],
      scope: '15 homes, 2-story structures, custom designs'
    },
    {
      title: 'Corporate Office Complex',
      category: 'Commercial',
      location: 'Gold Coast, QLD',
      year: '2024',
      description: 'Modern 5-story office complex with state-of-the-art steel frame construction, featuring open floor plans and energy-efficient design.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&fit=crop'
      ],
      scope: '5-story building, 5,000 sqm floor area'
    },
    {
      title: 'Industrial Warehouse Facility',
      category: 'Industrial',
      location: 'Townsville, QLD',
      year: '2023',
      description: 'Large-scale warehouse facility with heavy-duty steel frame structure, designed for maximum storage capacity and operational efficiency.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&fit=crop'
      ],
      scope: '10,000 sqm warehouse, high ceiling clearance'
    },
    {
      title: 'Retail Shopping Center',
      category: 'Commercial',
      location: 'Cairns, QLD',
      year: '2023',
      description: 'Multi-tenant retail shopping center with innovative steel frame design, featuring modern aesthetics and customer-friendly layouts.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80&fit=crop'
      ],
      scope: '20 retail units, covered walkways'
    },
    {
      title: 'Modern Apartment Building',
      category: 'Residential',
      location: 'Sunshine Coast, QLD',
      year: '2023',
      description: '4-story apartment complex featuring 32 residential units with steel frame construction, balconies, and contemporary amenities.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop'
      ],
      scope: '32 apartments, 4-story structure'
    },
    {
      title: 'Manufacturing Plant',
      category: 'Industrial',
      location: 'Rockhampton, QLD',
      year: '2022',
      description: 'Heavy industrial manufacturing facility with specialized steel framework, designed for high-load capacity and durability.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80&fit=crop'
      ],
      scope: '8,000 sqm facility, reinforced structure'
    }
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getCategoryColor = (category) => {
    const colors = {
      'Residential': 'primary',
      'Commercial': 'secondary',
      'Industrial': 'error'
    };
    return colors[category] || 'default';
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handleModalWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isScrollingRef.current || !selectedProject) return;
    isScrollingRef.current = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.max(0, Math.min(selectedProject.images.length - 1, currentImageIndex + direction));
    
    setCurrentImageIndex(newIndex);

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  };

  useEffect(() => {
    const modalImage = modalImageRef.current;
    if (!modalImage || !openModal) return;

    const wheelHandler = (e) => {
      e.preventDefault();
    };

    modalImage.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      modalImage.removeEventListener('wheel', wheelHandler);
    };
  }, [openModal]);

  return React.createElement(
    'div',
    { className: 'projects-page' },
    // Hero Section
    React.createElement(
      'section',
      { className: 'page-hero' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'page-hero-content fade-in' },
          React.createElement('h1', null, 'Our Projects'),
          React.createElement('p', null, 'Showcasing Excellence in Steel Frame Construction')
        )
      )
    ),
    // Filter Section
    React.createElement(
      'section',
      { className: 'section', style: { paddingTop: '40px', paddingBottom: '20px' } },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { style: { textAlign: 'center', marginBottom: '40px' } },
          React.createElement(
            ButtonGroup,
            { variant: 'outlined', size: 'large' },
            categories.map(category =>
              React.createElement(
                Button,
                {
                  key: category,
                  onClick: () => setFilter(category),
                  sx: {
                    backgroundColor: filter === category ? 'var(--primary-color)' : 'transparent',
                    color: filter === category ? '#ffffff' : 'var(--text-primary)',
                    borderColor: 'var(--primary-color)',
                    '&:hover': {
                      backgroundColor: 'var(--primary-light)',
                      color: '#ffffff',
                      borderColor: 'var(--primary-color)'
                    }
                  }
                },
                category
              )
            )
          )
        )
      )
    ),
    // Projects Grid
    React.createElement(
      'section',
      { className: 'section', style: { paddingTop: '20px' } },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          Grid,
          { container: true, spacing: 4 },
          filteredProjects.map((project, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 4, key: index },
              React.createElement(
                Card,
                {
                  className: 'card scale-up',
                  style: {
                    animationDelay: `${index * 0.1}s`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.3s ease',
                    cursor: 'pointer'
                  },
                  onClick: () => handleOpenModal(project),
                  onMouseEnter: (e) => {
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.boxShadow = '';
                  }
                },
                React.createElement(
                  'div',
                  { className: 'image-wrapper' },
                  React.createElement(CardMedia, {
                    component: 'img',
                    height: '220',
                    image: project.images[0],
                    alt: project.title,
                    style: {
                      transition: 'none'
                    }
                  })
                ),
                React.createElement(
                  CardContent,
                  { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
                  React.createElement(
                    'div',
                    { style: { marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                    React.createElement(Chip, {
                      label: project.category,
                      color: getCategoryColor(project.category),
                      size: 'small'
                    }),
                    React.createElement(
                      'span',
                      { style: { color: 'var(--text-secondary)', fontSize: '0.85rem' } },
                      project.year
                    )
                  ),
                  React.createElement(
                    'h3',
                    { style: { color: 'var(--primary-color)', marginBottom: '8px', fontSize: '1.2rem' } },
                    project.title
                  ),
                  React.createElement(
                    'p',
                    { style: { color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' } },
                    project.location
                  ),
                  React.createElement(
                    'p',
                    { style: { color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px', fontSize: '0.95rem' } },
                    project.description.substring(0, 100) + '...'
                  ),
                  React.createElement(
                    'div',
                    { 
                      style: { 
                        marginTop: 'auto',
                        paddingTop: '15px',
                        borderTop: '1px solid var(--border-color)'
                      }
                    },
                    React.createElement(
                      'p',
                      { style: { color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, fontStyle: 'italic' } },
                      React.createElement('strong', null, 'Scope: '),
                      project.scope
                    )
                  )
                )
              )
            )
          )
        ),
        filteredProjects.length === 0 && React.createElement(
          'div',
          { style: { textAlign: 'center', padding: '60px 20px', width: '100%' } },
          React.createElement(
            'p',
            { style: { color: 'var(--text-secondary)', fontSize: '1.2rem' } },
            'No projects found in this category.'
          )
        )
      )
    ),
    // Stats Section
    React.createElement(
      'section',
      { className: 'section', style: { backgroundColor: 'var(--surface-color)' } },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section-title' },
          React.createElement('h2', null, 'Our Achievements')
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 4 },
          [
            { number: '500+', label: 'Projects Completed' },
            { number: '15+', label: 'Years Experience' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '50+', label: 'Skilled Team Members' }
          ].map((stat, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 6, sm: 3, key: index },
              React.createElement(
                'div',
                {
                  className: 'scale-up',
                  style: {
                    animationDelay: `${index * 0.15}s`,
                    textAlign: 'center',
                    padding: '30px 15px'
                  }
                },
                React.createElement(
                  'div',
                  { 
                    style: { 
                      fontSize: '3rem',
                      fontWeight: '700',
                      color: 'var(--primary-color)',
                      marginBottom: '10px'
                    }
                  },
                  stat.number
                ),
                React.createElement(
                  'p',
                  { style: { color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 } },
                  stat.label
                )
              )
            )
          )
        )
      )
    ),
    // Project Modal
    selectedProject && React.createElement(
      Dialog,
      {
        open: openModal,
        onClose: handleCloseModal,
        maxWidth: 'md',
        fullWidth: true,
        PaperProps: {
          style: {
            backgroundColor: '#fff',
            borderRadius: '12px'
          }
        }
      },
      React.createElement(
        DialogTitle,
        { style: { paddingRight: '60px' } },
        selectedProject.title,
        React.createElement(
          IconButton,
          {
            onClick: handleCloseModal,
            style: {
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#666'
            }
          },
          React.createElement(CloseIcon)
        )
      ),
      React.createElement(
        DialogContent,
        { dividers: true },
        React.createElement(
          'div',
          {
            ref: modalImageRef,
            onWheel: handleModalWheel,
            style: {
              position: 'relative',
              width: '100%',
              height: '400px',
              overflow: 'hidden',
              marginBottom: '20px',
              cursor: 'ns-resize',
              borderRadius: '8px'
            }
          },
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateY(-${currentImageIndex * 400}px)`
              }
            },
            selectedProject.images.map((image, idx) =>
              React.createElement('img', {
                key: idx,
                src: image,
                alt: `${selectedProject.title} - View ${idx + 1}`,
                style: {
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none'
                }
              })
            )
          ),
          React.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
                pointerEvents: 'none'
              }
            },
            selectedProject.images.map((_, idx) =>
              React.createElement(
                'div',
                {
                  key: idx,
                  style: {
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: idx === currentImageIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }
                }
              )
            )
          )
        ),
        React.createElement(
          'div',
          { style: { marginTop: '10px' } },
          React.createElement(
            'div',
            { style: { marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' } },
            React.createElement(Chip, {
              label: selectedProject.category,
              color: getCategoryColor(selectedProject.category),
              size: 'small'
            }),
            React.createElement(
              'span',
              { style: { color: '#666', fontSize: '0.9rem' } },
              selectedProject.year
            )
          ),
          React.createElement(
            'p',
            { style: { color: '#666', fontSize: '0.95rem', marginBottom: '8px' } },
            React.createElement('strong', null, 'Location: '),
            selectedProject.location
          ),
          React.createElement(
            'p',
            { style: { color: '#666', fontSize: '0.95rem', marginBottom: '15px' } },
            React.createElement('strong', null, 'Scope: '),
            selectedProject.scope
          ),
          React.createElement(
            'p',
            { style: { color: '#333', fontSize: '1rem', lineHeight: '1.6' } },
            selectedProject.description
          )
        )
      )
    )
  );
};

export default Projects;