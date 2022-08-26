import Head from 'next/head'
import { NextPage } from 'next'
import styles from '../styles/IndexPage.module.css'

const IndexPage: NextPage = () => {
  return (
    <main className={styles.body}>
      <Head>
        <title>りくりくりーくねっ！</title>
      </Head>
      <h1>りくりくりーくねっ！</h1>
      <p>rikurikuri-kune</p>
    </main>
  )
}

export default IndexPage
