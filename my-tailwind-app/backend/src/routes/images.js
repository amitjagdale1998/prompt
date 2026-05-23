import express from 'express';

const router = express.Router();

/**
 * Generate demo images on-the-fly
 * GET /api/images/demo/:name
 * Returns SVG image data
 */
router.get('/demo/:name', (req, res) => {
  const { name } = req.params;
  const { width = 300, height = 200 } = req.query;

  try {
    // Decode the name (it may be URL encoded)
    const decodedName = decodeURIComponent(name);
    
    // Generate a gradient background based on the name
    const colors = {
      'code-before': { bg: '#1a1a2e', text: '#ffffff' },
      'code-after': { bg: '#16c784', text: '#ffffff' },
      'image-before': { bg: '#9b5de5', text: '#ffffff' },
      'image-after': { bg: '#f72585', text: '#ffffff' },
      'document-before': { bg: '#4cc9f0', text: '#ffffff' },
      'document-after': { bg: '#00b4d8', text: '#ffffff' },
      'audio-before': { bg: '#fbbf24', text: '#000000' },
      'audio-after': { bg: '#f59e0b', text: '#000000' },
      'marketing-before': { bg: '#ec4899', text: '#ffffff' },
      'marketing-after': { bg: '#db2777', text: '#ffffff' },
      'design-before': { bg: '#a855f7', text: '#ffffff' },
      'design-after': { bg: '#7c3aed', text: '#ffffff' },
      'analysis-before': { bg: '#06b6d4', text: '#ffffff' },
      'analysis-after': { bg: '#0891b2', text: '#ffffff' },
      'business-before': { bg: '#10b981', text: '#ffffff' },
      'business-after': { bg: '#059669', text: '#ffffff' },
      'learning-before': { bg: '#f97316', text: '#ffffff' },
      'learning-after': { bg: '#ea580c', text: '#ffffff' },
    };

    const color = colors[decodedName] || { bg: '#6366f1', text: '#ffffff' };

    // Create SVG image with text
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)"/>
        <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
              fill="${color.text}" text-anchor="middle" dominant-baseline="middle">
          ${decodedName.replace(/-/g, ' ')}
        </text>
      </svg>
    `;

    res.set('Content-Type', 'image/svg+xml');
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.send(svg);
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export default router;
