import Wrapper from '@/components/Wrapper'

const HomeTitle = () => {
  return (
    <div className="flex-col md:flex-row flex items-center md:justify-start mt-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter md:pr-8">ivory-code.</h1>
      <div className="flex-row">
        <h4 className="text-right mt-10 md:pl-8">조금 느려도 올곧은 방향으로.</h4>
        <h4 className="text-right md:pl-8">그게 무엇이라도 항상 쉬운 일이다.</h4>
      </div>
      <Wrapper style="md:mr-0">
        <div className="md:flex-row md:justify-end md:text-left text-lg mt-5 md:pl-8">
          <div>
            <a
              href="https://github.com/ivory-code"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/hansung-kwon-194aa0220/" className="mx-3 font-bold hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default HomeTitle
