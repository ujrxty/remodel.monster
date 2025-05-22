/**
 * Color conversion utilities for shadcn/ui theming
 */

/**
 * Converts a hex color string to HSL components (hue, saturation, lightness)
 * @param {string} hex - Color in hex format (e.g., "#3366cc" or "#36c")
 * @returns {Object} HSL components with h in [0,360), s and l in [0,100]
 */
function hexToHsl(hex) {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find min and max RGB components
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Initialize HSL values
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    // Achromatic (gray)
    h = s = 0;
  } else {
    // Calculate saturation
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    // Calculate hue
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h = h / 6;
  }
  
  // Convert to standard range
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
}

/**
 * Converts a hex color to an HSL string for CSS variables (e.g., "220 13.4% 18.43%")
 * @param {string} hex - Color in hex format
 * @returns {string} HSL values as space-separated string
 */
function hexToHslString(hex) {
  if (!hex || typeof hex !== 'string') {
    return '221.2 83.2% 53.3%'; // Default to blue if invalid
  }
  
  try {
    const { h, s, l } = hexToHsl(hex);
    return `${h} ${s}% ${l}%`;
  } catch (err) {
    console.error('Invalid color format:', hex);
    return '221.2 83.2% 53.3%'; // Default to blue on error
  }
}

module.exports = {
  hexToHsl,
  hexToHslString
};