import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { CreateResponse } from './api/create'
const Home: NextPage = () => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false);

  const isInvalid = (() => {
    try {
      // eslint-disable-next-line no-new
      new URL(url);
      return false;
    } catch (e) {
      return true;
    }
  })();


  const submit = async () => {
    setUrl(``);
    setLoading(true);

    const data: CreateResponse = await fetch(`/api/create`, {
      method: `POST`,
      body: JSON.stringify({ url }),
      headers: {
        'Content-Type': `application/json`,
      },
    }).then((res) => res.json());

    setLoading(false);

    if (data.success) {
      await navigator.clipboard.writeText(`${window.location}${data.id}`);

      console.log("ok");

    } else {
      alert(data.error);
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>Create Your Short <span>URL</span>!</h1>
        <p>You can simplify your annoying long and complex links and make your job easier :)</p>
      </div>
      <div className={styles.url}>
        <input
          placeholder="Your Long URL..."
          value={url}
          type={url}
          onChange={(e) => setUrl(e.target.value)} />
        <button onClick={submit} >Shorten</button>
      </div>
    </div>
  )
}

export default Home
