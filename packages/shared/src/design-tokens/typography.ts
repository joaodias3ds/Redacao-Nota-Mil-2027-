export const typography = {
  fontDisplay: "'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontBody: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  fontMono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    display: 'clamp(34px, 5vw, 56px)',
    h1: 'clamp(28px, 3.4vw, 40px)',
    h2: 'clamp(24px, 2.6vw, 32px)',
    h3: 'clamp(20px, 2vw, 24px)',
    h4: '18px',
    title: '16px',
    bodyLg: '18px',
    body: '16px',
    bodySm: '14px',
    caption: '13px',
    label: '14px',
    overline: '12px',
    button: '15px',
    buttonSm: '14px',
  },
} as const;

