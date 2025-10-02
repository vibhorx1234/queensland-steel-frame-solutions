import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const drawer = React.createElement(
    'div',
    { className: 'mobile-drawer' },
    React.createElement(
      'div',
      { className: 'drawer-header' },
      React.createElement(
        IconButton,
        { onClick: handleDrawerToggle, sx: { color: 'var(--text-primary)' } },
        React.createElement(CloseIcon)
      )
    ),
    React.createElement(
      List,
      null,
      navItems.map((item) =>
        React.createElement(
          ListItem,
          { key: item.name, onClick: handleDrawerToggle },
          React.createElement(
            Link,
            { 
              to: item.path, 
              className: location.pathname === item.path ? 'nav-link active' : 'nav-link',
              style: { textDecoration: 'none', width: '100%' }
            },
            React.createElement(
              ListItemText,
              { 
                primary: item.name,
                sx: { color: 'var(--text-primary)' }
              }
            )
          )
        )
      )
    )
  );

  return React.createElement(
    AppBar,
    { 
      position: 'fixed',
      className: scrolled ? 'header scrolled' : 'header',
      elevation: scrolled ? 4 : 0,
      sx: { backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)' }
    },
    React.createElement(
      Toolbar,
      { className: 'toolbar' },
      React.createElement(
        'div',
        { className: 'container header-container' },
        // Logo on extreme left
        React.createElement(
          Link,
          { to: '/', className: 'logo-link' },
          React.createElement(
            'div',
            { className: 'logo' },
            React.createElement('img', {
              src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=60&fit=crop&q=80&auto=format',
              alt: 'Queensland Steel Frame Solutions',
              className: 'logo-image',
              style: { 
                display: 'block',
                height: '50px',
                width: 'auto',
                objectFit: 'cover',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              },
              onError: (e) => {
                console.error('Primary logo failed, using fallback');
                e.target.src = 'https://via.placeholder.com/200x60/1a2b4a/ffffff?text=QLD+Steel+Frame';
              },
              onLoad: () => {
                console.log('Logo loaded successfully');
              }
            })
          )
        ),
        // Desktop Navigation (center)
        React.createElement(
          'nav',
          { className: 'nav-desktop' },
          navItems.map((item) =>
            React.createElement(
              Link,
              {
                key: item.name,
                to: item.path,
                className: location.pathname === item.path ? 'nav-link active' : 'nav-link'
              },
              item.name
            )
          )
        ),
        // Theme toggle on extreme right
        React.createElement(
          'div',
          { className: 'nav-actions' },
          React.createElement(ThemeToggle)
        ),
        // Mobile menu button
        React.createElement(
          'div',
          { className: 'nav-mobile' },
          React.createElement(
            IconButton,
            {
              onClick: handleDrawerToggle,
              sx: { color: 'var(--text-primary)' }
            },
            React.createElement(MenuIcon)
          )
        )
      )
    ),
    React.createElement(
      Drawer,
      {
        anchor: 'right',
        open: mobileOpen,
        onClose: handleDrawerToggle,
        sx: {
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: 'var(--surface-color)'
          }
        }
      },
      drawer
    )
  );
};

export default Header;