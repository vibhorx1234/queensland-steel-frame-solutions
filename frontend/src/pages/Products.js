import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import '../styles/Parallax.css';

const Products = () => {
  const products = [
    {
      name: 'Light Gauge Steel Frames',
      category: 'Residential',
      description: 'High-quality light gauge steel frames perfect for residential construction. Lightweight yet durable, offering excellent strength-to-weight ratio.',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80&fit=crop',
      specifications: [
        'Grade: G550',
        'Thickness: 0.55mm - 1.0mm',
        'Corrosion resistant',
        'AS/NZS 4600 compliant'
      ],
      features: ['Lightweight', 'Easy Installation', 'Cost-Effective']
    },
    {
      name: 'Heavy Gauge Steel Frames',
      category: 'Commercial',
      description: 'Robust heavy gauge steel frames designed for commercial and industrial applications requiring maximum structural integrity.',
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&fit=crop',
      specifications: [
        'Grade: G300-G550',
        'Thickness: 1.0mm - 6.0mm',
        'Hot-dip galvanized',
        'High load capacity'
      ],
      features: ['High Strength', 'Durable', 'Weather Resistant']
    },
    {
      name: 'Roof Trusses',
      category: 'Structural',
      description: 'Precision-engineered steel roof trusses providing superior support and allowing for versatile architectural designs.',
      image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&q=80&fit=crop',
      specifications: [
        'Custom span lengths',
        'Multiple pitch options',
        'Engineered designs',
        'Pre-fabricated'
      ],
      features: ['Custom Design', 'Quick Installation', 'Strong Support']
    },
    {
      name: 'Wall Frames',
      category: 'Structural',
      description: 'Comprehensive wall framing systems engineered for both load-bearing and non-load-bearing applications.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&fit=crop',
      specifications: [
        'Standard stud spacing',
        'Various heights',
        'Pre-cut to size',
        'Quality assured'
      ],
      features: ['Versatile', 'Precise', 'Reliable']
    },
    {
      name: 'Floor Joists',
      category: 'Structural',
      description: 'High-strength steel floor joists offering excellent load distribution and minimal deflection for stable flooring systems.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&fit=crop',
      specifications: [
        'Span up to 6m',
        'Load-rated',
        'Lightweight design',
        'Rust resistant'
      ],
      features: ['High Capacity', 'Long Spans', 'Stable']
    },
    {
      name: 'Steel Beams & Columns',
      category: 'Industrial',
      description: 'Industrial-grade steel beams and columns for large-scale construction projects requiring maximum structural support.',
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&q=80&fit=crop',
      specifications: [
        'Various sizes',
        'Universal beams',
        'Structural hollow sections',
        'Certified quality'
      ],
      features: ['Heavy Duty', 'Certified', 'Long Lasting']
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Residential': 'primary',
      'Commercial': 'secondary',
      'Structural': 'success',
      'Industrial': 'error'
    };
    return colors[category] || 'default';
  };

  return React.createElement(
    'div',
    { className: 'products-page' },
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
          React.createElement('h1', null, 'Our Products'),
          React.createElement('p', null, 'Premium Steel Frame Products for All Applications')
        )
      )
    ),
    // Products Grid
    React.createElement(
      'section',
      { className: 'section' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          Grid,
          { container: true, spacing: 4 },
          products.map((product, index) =>
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
                React.createElement(CardMedia, {
                  component: 'img',
                  height: '200',
                  image: product.image,
                  alt: product.name
                }),
                React.createElement(
                  CardContent,
                  { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
                  React.createElement(
                    'div',
                    { style: { marginBottom: '12px' } },
                    React.createElement(Chip, {
                      label: product.category,
                      color: getCategoryColor(product.category),
                      size: 'small'
                    })
                  ),
                  React.createElement(
                    'h3',
                    { style: { color: 'var(--primary-color)', marginBottom: '12px', fontSize: '1.2rem' } },
                    product.name
                  ),
                  React.createElement(
                    'p',
                    { style: { color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px', fontSize: '0.95rem' } },
                    product.description
                  ),
                  React.createElement(
                    'div',
                    { style: { marginBottom: '15px' } },
                    React.createElement(
                      'h4',
                      { style: { color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '8px' } },
                      'Specifications:'
                    ),
                    React.createElement(
                      'ul',
                      { style: { color: 'var(--text-secondary)', paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.8' } },
                      product.specifications.map((spec, i) =>
                        React.createElement('li', { key: i }, spec)
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { style: { marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                    product.features.map((feature, i) =>
                      React.createElement(Chip, {
                        key: i,
                        label: feature,
                        size: 'small',
                        variant: 'outlined',
                        sx: { borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }
                      })
                    )
                  )
                )
              )
            )
          )
        )
      )
    ),
    // Quality Standards Section
    React.createElement(
      'section',
      { className: 'section', style: { backgroundColor: 'var(--surface-color)' } },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section-title' },
          React.createElement('h2', null, 'Quality Standards & Certifications')
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 3 },
          [
            { title: 'AS/NZS 4600', desc: 'Australian/New Zealand Standard for Cold-Formed Steel Structures' },
            { title: 'ISO 9001', desc: 'Quality Management Systems Certification' },
            { title: 'BlueScope Steel', desc: 'Premium Australian Steel Products' },
            { title: 'Engineered Designs', desc: 'Certified by Licensed Structural Engineers' }
          ].map((item, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 3, key: index },
              React.createElement(
                'div',
                {
                  className: 'fade-in',
                  style: {
                    animationDelay: `${index * 0.1}s`,
                    padding: '25px',
                    backgroundColor: 'var(--background-color)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    height: '100%',
                    border: '2px solid var(--border-color)',
                    transition: 'all 0.3s ease'
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                },
                React.createElement(
                  'h4',
                  { style: { color: 'var(--primary-color)', marginBottom: '12px', fontSize: '1.1rem' } },
                  item.title
                ),
                React.createElement(
                  'p',
                  { style: { color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' } },
                  item.desc
                )
              )
            )
          )
        )
      )
    ),
    // Why Choose Our Products Section
    React.createElement(
      'section',
      { className: 'section' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section-title' },
          React.createElement('h2', null, 'Why Choose Our Products?')
        ),
        React.createElement(
          Grid,
          { container: true, spacing: 4, justifyContent: 'center' },
          [
            {
              title: 'Superior Quality',
              desc: 'Premium grade steel with rigorous quality control',
              icon: '✓'
            },
            {
              title: 'Cost Effective',
              desc: 'Competitive pricing with no compromise on quality',
              icon: '✓'
            },
            {
              title: 'Fast Delivery',
              desc: 'Efficient manufacturing and timely project delivery',
              icon: '✓'
            },
            {
              title: 'Custom Solutions',
              desc: 'Tailored products to meet specific requirements',
              icon: '✓'
            },
            {
              title: 'Eco-Friendly',
              desc: '100% recyclable materials and sustainable practices',
              icon: '✓'
            },
            {
              title: 'Expert Support',
              desc: 'Technical assistance throughout your project',
              icon: '✓'
            }
          ].map((item, index) =>
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 4, key: index },
              React.createElement(
                Card,
                {
                  className: 'card scale-up',
                  style: { animationDelay: `${index * 0.1}s`, textAlign: 'center' }
                },
                React.createElement(
                  CardContent,
                  null,
                  React.createElement(
                    'div',
                    {
                      style: {
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-color)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '1.8rem',
                        fontWeight: 'bold'
                      }
                    },
                    item.icon
                  ),
                  React.createElement(
                    'h4',
                    { style: { color: 'var(--primary-color)', marginBottom: '12px' } },
                    item.title
                  ),
                  React.createElement(
                    'p',
                    { style: { color: 'var(--text-secondary)', margin: 0 } },
                    item.desc
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

export default Products;