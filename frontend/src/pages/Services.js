import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import '../styles/Parallax.css';

const Services = () => {
  const services = [
    {
      icon: React.createElement(HomeWorkIcon),
      title: 'Residential Construction',
      description: 'Premium steel frame solutions for homes, extensions, and renovations. We deliver durable and energy-efficient residential structures tailored to your needs.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&fit=crop',
      features: [
        'Custom home designs',
        'House extensions',
        'Second-story additions',
        'Granny flats'
      ]
    },
    {
      icon: React.createElement(ApartmentIcon),
      title: 'Commercial Projects',
      description: 'Robust steel frame construction for commercial buildings, office complexes, and retail spaces designed for longevity and efficiency.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&fit=crop',
      features: [
        'Office buildings',
        'Retail complexes',
        'Multi-story structures',
        'Commercial fit-outs'
      ]
    },
    {
      icon: React.createElement(WarehouseIcon),
      title: 'Industrial Solutions',
      description: 'Heavy-duty steel frame systems for warehouses, factories, and industrial facilities built to withstand demanding environments.',
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&q=80&fit=crop',
      features: [
        'Warehouse construction',
        'Factory buildings',
        'Storage facilities',
        'Industrial sheds'
      ]
    },
    {
      icon: React.createElement(DesignServicesIcon),
      title: 'Custom Design Services',
      description: 'Collaborative design solutions that bring your vision to life with precision engineering and innovative architectural approaches.',
      image: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?w=600&q=80&fit=crop',
      features: [
        'Architectural design',
        '3D modeling',
        'Structural engineering',
        'Design consultation'
      ]
    },
    {
      icon: React.createElement(BuildIcon),
      title: 'Installation & Erection',
      description: 'Professional installation services ensuring precise assembly and structural integrity for every project we undertake.',
      image: 'https://images.unsplash.com/photo-1590496793907-1c2e5a04e63c?w=600&q=80&fit=crop',
      features: [
        'On-site installation',
        'Crane services',
        'Quality inspections',
        'Project management'
      ]
    },
    {
      icon: React.createElement(SupportAgentIcon),
      title: 'Ongoing Support',
      description: 'Comprehensive after-sales support, maintenance services, and consultation to ensure long-term satisfaction and performance.',
      image: 'https://images.unsplash.com/photo-1597476368913-f93b0c1b9c19?w=600&q=80&fit=crop',
      features: [
        'Maintenance services',
        'Warranty support',
        'Technical consultation',
        '24/7 customer service'
      ]
    }
  ];

  return React.createElement(
    'div',
    { className: 'services-page' },
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
          React.createElement('h1', null, 'Our Services'),
          React.createElement('p', null, 'Comprehensive Steel Frame Solutions for Every Need')
        )
      )
    ),
    // Services Grid
    React.createElement(
      'section',
      { className: 'section' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          Grid,
          { container: true, spacing: 5 },
          services.map((service, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, md: 6, key: index },
              React.createElement(
                Card,
                { 
                  className: 'card scale-up',
                  style: { 
                    animationDelay: `${index * 0.15}s`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }
                },
                React.createElement(CardMedia, {
                  component: 'img',
                  height: '250',
                  image: service.image,
                  alt: service.title
                }),
                React.createElement(
                  CardContent,
                  { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
                  React.createElement(
                    'div',
                    { style: { marginBottom: '15px' } },
                    React.cloneElement(service.icon, {
                      style: { fontSize: '2.5rem', color: 'var(--primary-color)' }
                    })
                  ),
                  React.createElement(
                    'h3',
                    { style: { color: 'var(--primary-color)', marginBottom: '15px' } },
                    service.title
                  ),
                  React.createElement(
                    'p',
                    { style: { color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', flex: 1 } },
                    service.description
                  ),
                  React.createElement(
                    'div',
                    { style: { marginTop: 'auto' } },
                    React.createElement('h4', { style: { color: 'var(--primary-color)', fontSize: '1rem', marginBottom: '12px' } }, 'Key Features:'),
                    React.createElement(
                      'ul',
                      { style: { color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '2' } },
                      service.features.map((feature, i) =>
                        React.createElement('li', { key: i }, feature)
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    ),
    // Process Section
    React.createElement(
      'section',
      { className: 'section', style: { backgroundColor: 'var(--surface-color)' } },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section-title' },
          React.createElement('h2', null, 'Our Process')
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 3 },
          [
            { step: '01', title: 'Consultation', desc: 'Initial meeting to understand your requirements' },
            { step: '02', title: 'Design', desc: 'Custom design and engineering solutions' },
            { step: '03', title: 'Manufacturing', desc: 'Precision fabrication in our facilities' },
            { step: '04', title: 'Installation', desc: 'Professional on-site installation' },
            { step: '05', title: 'Quality Check', desc: 'Thorough inspection and testing' },
            { step: '06', title: 'Handover', desc: 'Complete project documentation and support' }
          ].map((item, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 4, key: index },
              React.createElement(
                'div',
                { 
                  className: 'fade-in card',
                  style: { 
                    animationDelay: `${index * 0.1}s`,
                    padding: '30px',
                    backgroundColor: 'var(--background-color)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    height: '100%'
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                },
                React.createElement(
                  'div',
                  { 
                    style: { 
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: 'var(--primary-color)',
                      marginBottom: '15px'
                    }
                  },
                  item.step
                ),
                React.createElement('h4', { style: { color: 'var(--primary-color)', marginBottom: '10px' } }, item.title),
                React.createElement('p', { style: { color: 'var(--text-secondary)', margin: 0 } }, item.desc)
              )
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
          React.createElement('h2', null, 'Ready to Get Started?'),
          React.createElement('p', null, 'Contact us today to discuss your steel frame construction needs'),
          React.createElement(
            Link,
            { to: '/contact', style: { textDecoration: 'none' } },
            React.createElement(
              Button,
              { variant: 'contained', size: 'large', className: 'btn btn-primary cta-button' },
              'Request a Quote'
            )
          )
        )
      )
    )
  );
};

export default Services;