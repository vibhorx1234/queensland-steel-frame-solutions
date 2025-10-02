import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../styles/Parallax.css';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: 'Luxury Residential Estate',
      category: 'Residential',
      location: 'Brisbane, QLD',
      year: '2024',
      description: 'Premium steel frame construction for a luxury residential estate featuring 15 custom homes.',
      image: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?w=800&q=80&fit=crop',
      scope: '15 homes, 2-story structures, custom designs'
    },
    {
      title: 'Corporate Office Complex',
      category: 'Commercial',
      location: 'Gold Coast, QLD',
      year: '2024',
      description: 'Modern 5-story office complex with state-of-the-art steel frame construction.',
      image: 'https://images.unsplash.com/photo-1590496793907-1c2e5a04e63c?w=800&q=80&fit=crop',
      scope: '5-story building, 5,000 sqm floor area'
    },
    {
      title: 'Industrial Warehouse Facility',
      category: 'Industrial',
      location: 'Townsville, QLD',
      year: '2023',
      description: 'Large-scale warehouse facility with heavy-duty steel frame structure.',
      image: 'https://images.unsplash.com/photo-1597476368913-f93b0c1b9c19?w=800&q=80&fit=crop',
      scope: '10,000 sqm warehouse, high ceiling clearance'
    },
    {
      title: 'Retail Shopping Center',
      category: 'Commercial',
      location: 'Cairns, QLD',
      year: '2023',
      description: 'Multi-tenant retail shopping center with innovative steel frame design.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&fit=crop',
      scope: '20 retail units, covered walkways'
    },
    {
      title: 'Modern Apartment Building',
      category: 'Residential',
      location: 'Sunshine Coast, QLD',
      year: '2023',
      description: '4-story apartment complex featuring 32 residential units with steel frame construction.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop',
      scope: '32 apartments, 4-story structure'
    },
    {
      title: 'Manufacturing Plant',
      category: 'Industrial',
      location: 'Rockhampton, QLD',
      year: '2022',
      description: 'Heavy industrial manufacturing facility with specialized steel framework.',
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80&fit=crop',
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
                    flexDirection: 'column'
                  }
                },
                React.createElement(
                  'div',
                  { className: 'image-wrapper' },
                  React.createElement(CardMedia, {
                    component: 'img',
                    height: '220',
                    image: project.image,
                    alt: project.title
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
                    project.description
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
    )
  );
};

export default Projects;