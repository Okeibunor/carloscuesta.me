import { type Font } from 'satori'
import { ImageResponse } from 'next/server'

async function getFonts(): Promise<Font[]> {
  const [interLight, interSemiBold, interBold, robotoMono] = await Promise.all([
    fetch(`https://rsms.me/inter/font-files/Inter-Light.woff`).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(`https://rsms.me/inter/font-files/Inter-Bold.woff`).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(`https://rsms.me/inter/font-files/Inter-ExtraBold.woff`).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(`https://fonts.cdnfonts.com/s/16061/RobotoMono-Light.woff`).then(
      (res) => res.arrayBuffer(),
    ),
  ])

  return [
    {
      name: 'Inter',
      data: interLight,
      style: 'normal',
      weight: 300,
    },
    {
      name: 'Inter',
      data: interSemiBold,
      style: 'normal',
      weight: 600,
    },
    {
      name: 'Inter',
      data: interBold,
      style: 'normal',
      weight: 700,
    },
    {
      name: 'RobotoMono',
      data: robotoMono,
      style: 'normal',
      weight: 300,
    },
  ]
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '16px',
          background: '#ffffff',
          color: '#262626',
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'Inter',
          flexDirection: 'column',
          padding: '4em',
          gap: '1em',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <img
            src="https://carloscuesta.me/images/carloscuesta.jpg"
            width="300"
            height="300"
            style={{ borderRadius: '100%' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, fontSize: '3em' }}>
              Carlos Cuesta
            </span>
            <span style={{ fontWeight: 300, opacity: 0.7, fontSize: '1.5em' }}>
              @crloscuesta
            </span>
          </div>
        </div>

        <span style={{ fontWeight: 300, opacity: 0.7, fontSize: '1.5em' }}>
          carloscuesta.me
        </span>
      </div>
    ),
    {
      fonts: await getFonts(),
    },
  )
}
