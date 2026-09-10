import { ImageResponse } from 'next/og';

export const alt = 'Catching UI regressions before they ship | Bernardo Bechtold';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f8fafc',
          color: '#171717',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '64px',
          width: '100%',
        }}
      >
        <div style={{ color: '#737373', display: 'flex', fontSize: 22, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Axonify · Case study
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.02, marginTop: '42px', maxWidth: '900px' }}>
          Catching UI regressions before they ship
        </div>
        <div style={{ color: '#525252', display: 'flex', fontSize: 27, lineHeight: 1.35, marginTop: '28px', maxWidth: '850px' }}>
          Playwright + Storybook · automated visual review in pull requests
        </div>
        <div style={{ display: 'flex', gap: '18px', marginTop: 'auto' }}>
          {['Story discovery', 'Deterministic renders', 'Reviewable diffs'].map((label) => (
            <div key={label} style={{ background: '#e5e5e5', borderRadius: '999px', display: 'flex', fontSize: 20, padding: '12px 18px' }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
