import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return React.createElement(
    'footer',
    { className: 'footer' },
    React.createElement(
      'div',
      { className: 'footer-content' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'footer-grid' },
          // Company Info Column
          React.createElement(
            'div',
            { className: 'footer-column' },
            React.createElement(
              'div',
              { className: 'footer-logo' },
              React.createElement('img', {
                src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=180&h=50&fit=crop&q=80',
                alt: 'Queensland Steel Frame Solutions',
                style: { objectFit: 'cover', borderRadius: '4px' }
              }),
              React.createElement('h3', null, 'Queensland Steel Frame'),
              React.createElement('p', null, 'Solutions Pty Ltd')
            ),
            React.createElement(
              'p',
              { className: 'footer-description' },
              'Building excellence with premium steel frame construction solutions. Your trusted partner in quality construction.'
            )
          ),
          // Quick Links Column
          React.createElement(
            'div',
            { className: 'footer-column' },
            React.createElement('h4', null, 'Quick Links'),
            React.createElement(
              'ul',
              { className: 'footer-links' },
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/' }, 'Home')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/about' }, 'About Us')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/services' }, 'Services')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/products' }, 'Products')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/projects' }, 'Projects')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/contact' }, 'Contact Us')
              )
            )
          ),
          // Contact Info Column
          React.createElement(
            'div',
            { className: 'footer-column' },
            React.createElement('h4', null, 'Contact Info'),
            React.createElement(
              'ul',
              { className: 'contact-info' },
              React.createElement(
                'li',
                null,
                React.createElement(LocationOnIcon, { className: 'contact-icon' }),
                React.createElement('span', null, 'Queensland, Australia')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(PhoneIcon, { className: 'contact-icon' }),
                React.createElement('span', null, '+61 XXX XXX XXX')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(EmailIcon, { className: 'contact-icon' }),
                React.createElement('span', null, 'info@queenslandsteel.com.au')
              )
            )
          ),
          // Social Media Column
          React.createElement(
            'div',
            { className: 'footer-column' },
            React.createElement('h4', null, 'Follow Us'),
            React.createElement(
              'div',
              { className: 'social-links' },
              React.createElement(
                'a',
                { href: '#', target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Facebook' },
                React.createElement(FacebookIcon)
              ),
              React.createElement(
                'a',
                { href: '#', target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'LinkedIn' },
                React.createElement(LinkedInIcon)
              ),
              React.createElement(
                'a',
                { href: '#', target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Instagram' },
                React.createElement(InstagramIcon)
              )
            ),
            React.createElement(
              'p',
              { className: 'footer-cta' },
              'Get in touch with us today for a consultation!'
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'footer-bottom' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'p',
          null,
          `© ${currentYear} Queensland Steel Frame Solutions Pty Ltd. All rights reserved.`
        )
      )
    )
  );
};

export default Footer;