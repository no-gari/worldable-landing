import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Worldable — Build World Mini Apps from a sentence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoPath = join(process.cwd(), 'public', 'worldable-logo.png')
  const logoBuffer = readFileSync(logoPath)
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <img
            src={logoBase64}
            width={80}
            height={80}
            style={{
              objectFit: 'contain',
            }}
          />
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
            }}
          >
            Worldable
          </span>
        </div>
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 700,
              color: '#0a0a0a',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            Build a World Mini App
          </h1>
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 700,
              color: '#6b6b6b',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            from a sentence.
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
