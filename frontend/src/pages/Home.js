import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import VerifiedIcon from '@mui/icons-material/Verified';
import '../styles/Home.css';

const Home = () => {
  const services = [
    {
      title: 'Steel Frame Construction',
      description: 'Premium quality steel frame construction for residential and commercial projects.',
      icon: React.createElement(BuildIcon),
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&fit=crop'
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
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&q=80&fit=crop'
    }
  ];

  const projects = [
    {
      title: 'Residential Complex',
      location: 'Brisbane, QLD',
      image: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?w=800&q=80&fit=crop'
    },
    {
      title: 'Commercial Building',
      location: 'Gold Coast, QLD',
      image: 'https://images.unsplash.com/photo-1590496793907-1c2e5a04e63c?w=800&q=80&fit=crop'
    },
    {
      title: 'Industrial Warehouse',
      location: 'Townsville, QLD',
      image: 'https://images.unsplash.com/photo-1597476368913-f93b0c1b9c19?w=800&q=80&fit=crop'
    }
  ];

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
    // Projects Preview Section
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
                { className: 'project-card fade-in', style: { animationDelay: `${index * 0.2}s` } },
                React.createElement(
                  'div',
                  { className: 'image-wrapper' },
                  React.createElement(CardMedia, {
                    component: 'img',
                    height: '250',
                    image: project.image,
                    alt: project.title
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
              { variant: 'contained', size: 'large', className: 'btn btn-primary cta-button' },
              'Get in Touch'
            )
          )
        )
      )
    )
  );
};

export default Home;