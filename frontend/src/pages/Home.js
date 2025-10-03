import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import VerifiedIcon from '@mui/icons-material/Verified';
import '../styles/Home.css';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalImageRef = useRef(null);
  const isScrollingRef = useRef(false);

  const services = [
    {
      title: 'Steel Frame Construction',
      description: 'Premium quality steel frame construction for residential and commercial projects.',
      icon: React.createElement(BuildIcon),
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&fit=crop'
    },
    {
      title: 'Custom Design Solutions',
      description: 'Tailored steel frame designs to meet your specific project requirements.',
      icon: React.createElement(EngineeringIcon),
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&fit=crop'
    },
    {
      title: 'Quality Assurance',
      description: 'Certified quality standards and comprehensive project management.',
      icon: React.createElement(VerifiedIcon),
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&fit=crop'
    }
  ];

  const projects = [
    {
      title: 'Residential Complex',
      location: 'Brisbane, QLD',
      description: 'Modern residential complex featuring premium steel frame construction with sustainable design principles.',
      year: '2024',
      scope: '25 residential units, 3-story structure',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop'
      ]
    },
    {
      title: 'Commercial Building',
      location: 'Gold Coast, QLD',
      description: 'State-of-the-art commercial office complex with innovative steel framework and modern amenities.',
      year: '2024',
      scope: '5-story building, 6,000 sqm floor area',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&fit=crop'
      ]
    },
    {
      title: 'Industrial Warehouse',
      location: 'Townsville, QLD',
      description: 'Heavy-duty industrial warehouse facility designed for maximum efficiency and durability.',
      year: '2023',
      scope: '12,000 sqm warehouse, reinforced steel structure',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&fit=crop'
      ]
    }
  ];

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
    { className: 'home-page' },
    // Hero Section
    React.createElement(
      'section',
      { className: 'hero-section' },
      React.createElement(
        'div',
        { 
          className: 'hero-background',
          style: { backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80&fit=crop)' }
        }
      ),
      React.createElement(
        'div',
        { className: 'hero-overlay' },
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'div',
            { className: 'hero-content fade-in' },
            React.createElement('h1', { className: 'hero-title' }, 'Building Tomorrow with Steel Excellence'),
            React.createElement(
              'p',
              { className: 'hero-subtitle' },
              'Premium steel frame solutions for residential and commercial construction across Queensland'
            ),
            React.createElement(
              'div',
              { className: 'hero-buttons' },
              React.createElement(
                Link,
                { to: '/services', style: { textDecoration: 'none' } },
                React.createElement(
                  Button,
                  { variant: 'contained', size: 'large', className: 'btn btn-primary' },
                  'Our Services'
                )
              ),
              React.createElement(
                Link,
                { to: '/contact', style: { textDecoration: 'none' } },
                React.createElement(
                  Button,
                  { variant: 'outlined', size: 'large', className: 'btn btn-secondary hero-btn-secondary' },
                  'Get a Quote'
                )
              )
            )
          )
        )
      )
    ),
    // About Preview Section
    React.createElement(
      'section',
      { className: 'section about-preview' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          Grid,
          { container: true, spacing: 6, alignItems: 'center' },
          React.createElement(
            Grid,
            { item: true, xs: 12, md: 6 },
            React.createElement(
              'div',
              { className: 'about-content slide-in-left' },
              React.createElement('h2', null, 'About Queensland Steel Frame'),
              React.createElement(
                'p',
                null,
                'With years of excellence in steel frame construction, we deliver innovative and sustainable building solutions across Queensland. Our commitment to quality and precision has made us a trusted name in the industry.'
              ),
              React.createElement(
                'p',
                null,
                'We specialize in both residential and commercial projects, providing end-to-end solutions from design to installation.'
              ),
              React.createElement(
                Link,
                { to: '/about', style: { textDecoration: 'none' } },
                React.createElement(
                  Button,
                  { variant: 'contained', className: 'btn btn-primary' },
                  'Learn More About Us'
                )
              )
            )
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12, md: 6 },
            React.createElement(
              'div',
              { className: 'image-wrapper slide-in-right' },
              React.createElement('img', {
                src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop',
                alt: 'Steel Frame Construction',
                className: 'about-image'
              })
            )
          )
        )
      )
    ),
    // Services Preview Section
    React.createElement(
      'section',
      { className: 'section services-preview' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section-title' },
          React.createElement('h2', null, 'Our Services')
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 4 },
          services.map((service, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 4, key: index },
              React.createElement(
                Card,
                { className: 'service-card scale-up', style: { animationDelay: `${index * 0.2}s` } },
                React.createElement(CardMedia, {
                  component: 'img',
                  height: '200',
                  image: service.image,
                  alt: service.title
                }),
                React.createElement(
                  CardContent,
                  null,
                  React.createElement(
                    'div',
                    { className: 'service-icon' },
                    service.icon
                  ),
                  React.createElement('h3', null, service.title),
                  React.createElement('p', null, service.description)
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'section-cta' },
          React.createElement(
            Link,
            { to: '/services', style: { textDecoration: 'none' } },
            React.createElement(
              Button,
              { variant: 'contained', className: 'btn btn-primary' },
              'View All Services'
            )
          )
        )
      )
    ),
    // Projects Preview Section with Modal
    React.createElement(
      'section',
      { className: 'section projects-preview' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section-title' },
          React.createElement('h2', null, 'Featured Projects')
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 4 },
          projects.map((project, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 4, key: index },
              React.createElement(
                Card,
                { 
                  className: 'project-card fade-in', 
                  style: { 
                    animationDelay: `${index * 0.2}s`,
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
                    height: '250',
                    image: project.images[0],
                    alt: project.title,
                    style: {
                      transition: 'none'
                    }
                  })
                ),
                React.createElement(
                  CardContent,
                  null,
                  React.createElement('h3', null, project.title),
                  React.createElement('p', { className: 'project-location' }, project.location)
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'section-cta' },
          React.createElement(
            Link,
            { to: '/projects', style: { textDecoration: 'none' } },
            React.createElement(
              Button,
              { variant: 'contained', className: 'btn btn-primary' },
              'View All Projects'
            )
          )
        )
      )
    ),
    // CTA Section
    React.createElement(
      'section',
      { className: 'cta-section' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'cta-content' },
          React.createElement('h2', null, 'Ready to Start Your Project?'),
          React.createElement('p', null, 'Contact us today for a free consultation and quote'),
          React.createElement(
            Link,
            { to: '/contact', style: { textDecoration: 'none' } },
            React.createElement(
              Button,
              { variant: 'contained', size: 'large', className: 'btn btn-primary' },
              'Get in Touch'
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
            'p',
            { style: { color: '#666', fontSize: '0.95rem', marginBottom: '8px' } },
            React.createElement('strong', null, 'Location: '),
            selectedProject.location
          ),
          React.createElement(
            'p',
            { style: { color: '#666', fontSize: '0.95rem', marginBottom: '8px' } },
            React.createElement('strong', null, 'Year: '),
            selectedProject.year
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

export default Home;