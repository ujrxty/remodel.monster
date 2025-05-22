# Offermage Theming System

This document describes the theming system implemented in Offermage, which allows for:
1. Light and dark mode switching
2. Dynamic theme loading from external sources
3. Integration with [shadcn/ui](https://ui.shadcn.com/) themes and [TweakCN](https://tweakcn.com/)

## Overview

The theming system consists of several components:

- **ThemeProvider**: Context provider for theme state management
- **ThemeSwitcher**: UI component for switching between themes
- **theme-loader.js**: Utility for loading and applying themes
- **install-theme.js**: Script for installing themes from TweakCN

## How It Works

### CSS Variables

All styling is based on CSS variables defined in `globals.css`. These variables follow the shadcn/ui convention:

```css
:root {
  /* Light theme variables */
  --background: 0 0% 100%;    /* white */
  --foreground: 222 47% 11%;   /* very dark gray */
  --primary: 46 100% 55%;     /* orange/yellow */
  /* ... and so on */
}

.dark {
  /* Dark theme variables */
  --background: 0 0% 3.9%;    /* very dark gray */
  --foreground: 0 0% 98%;     /* white */
  --primary: 46 91% 55%;      /* orange/yellow */
  /* ... and so on */
}
```

**Important**: CSS variables are now embedded directly in `globals.css` to avoid module resolution issues. Do not use `@import` statements for theme variables.

### Theme Provider

The `ThemeProvider` component (`components/theme-provider.js`) manages the theme state using React Context. It:

1. Initializes from localStorage or defaults to "light" theme
2. Handles toggling between "light" and "dark" modes
3. Updates the document classes and persists preferences
4. Provides a context API for theme management

### Theme Switching UI

Two UI components are available:

1. **ModeToggle**: Simple toggle button for switching between light and dark mode
2. **ThemeSwitcher**: Advanced component for both mode switching and theme selection

### Theme Installation

Themes can be installed in two ways:

1. **Server-side installation**:
   ```
   npm run theme:install https://tweakcn.com/r/themes/my-theme.json
   ```
   This fetches the theme, generates CSS, and saves it to `public/themes/`.

2. **Client-side selection**:
   The ThemeSwitcher UI allows users to select from predefined themes, which are fetched and applied at runtime.

## Available Scripts

- `npm run theme:install [url]`: Install a theme from a URL
- `npm run theme:kodama`: Install the Kodama Grove theme
- `npm run theme:neutral`: Install the Neutral theme
- `npm run theme:zinc`: Install the Zinc theme
- `npm run theme:sunset`: Install the Sunset Blaze theme

## Theme Format

Themes follow the shadcn/ui theme format with light and dark variants:

```json
{
  "name": "Theme Name",
  "cssVars": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "222.2 84% 4.9%",
      "primary": "221.2 83.2% 53.3%",
      ...
    },
    "dark": {
      "background": "240 10% 3.9%",
      "foreground": "0 0% 98%",
      ...
    }
  }
}
```

## Implementation Details

### Theme System Updates

The theme system has been updated to:

1. Embed CSS variables directly in `globals.css` to avoid module resolution issues
2. Use HSL color values instead of OKLCH for better compatibility with Tailwind CSS
3. Implement infinite loop prevention in theme state management
4. Separate theme initialization and application effects

### Loading a Theme

Themes are now primarily managed through the shadcn CLI and Tailwind configuration. The theme-loader.js functions have been updated to return no-ops instead of throwing errors to maintain backward compatibility.

### Applying a Theme

Theme application happens through direct DOM manipulation:

```javascript
Object.entries(variables).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--${key}`, value);
});
```

### Automatic Theme Loading

The ThemeScript component injects a script that automatically loads the user's preferred theme on page load, before any React hydration occurs.

## Adding New Themes

To add a new theme:

1. Create a new theme JSON file following the format above
2. Add it to the `getAvailableThemes()` function in theme-loader.js
3. Optionally, add a convenience script to package.json

## Best Practices

1. Always use theme CSS variables instead of hardcoded colors
2. Test both light and dark modes with multiple themes
3. Ensure sufficient contrast ratios for accessibility
4. Use utility classes like `bg-primary` rather than specific colors

## Resources

- [shadcn/ui Theming Documentation](https://ui.shadcn.com/docs/theming)
- [TweakCN Themes](https://tweakcn.com/themes)