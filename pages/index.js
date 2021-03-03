import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { useState } from 'react'

export default function Home() {
  const [color1, setColor1] = useState('#000000');
  const [color2, setColor2] = useState('#000000');

  return (
    <div className={styles.container}>
      <Head>
        <title>I miss hue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1>I miss hue</h1>
          <p>Donec rutrum congue leo eget malesuada. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.</p>
        </div>

        <div className={styles.colors}>
          <div className={styles.buttonsWrapper}>
            <div className={styles.color}>
              <input type="color" onChange={e=>setColor1(e.target.value)}/>
              <label className={styles.description}>
                {color1}
              </label>
            </div>
            <div className={styles.color}>
              <input type="color" onChange={e=>setColor2(e.target.value)}/>
              <label className={styles.description}>
                {color2}
              </label>
            </div>
          </div>
          <Link
            href={{
              pathname: '/game',
              query: { firstColor: color1, secondColor: color2 },
            }}
          >
            <a>Play</a>
          </Link>
        </div>

      </main>

      <footer className={styles.footer}>
        <p>Developed with ❤️ by Pierre Cormier</p>
      </footer>
    </div>
  )
}
