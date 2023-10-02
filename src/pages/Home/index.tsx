import Wrapper from '@/components/Wrapper'
import Head from 'next/head'
import HomeTitle from './HomeTitle'
import Footer from '@/components/Footer'

const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <Head>
          <title>ivory-code's log</title>
        </Head>
        <Wrapper>
          <HomeTitle />
        </Wrapper>
      </div>
      <Footer />
    </>
  )
}

export default Home
