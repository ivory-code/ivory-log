import Wrapper from './Wrapper'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t">
      <Wrapper>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] tracking-tighter font-bold lg:text-center mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            ivory-code.&nbsp;&nbsp;Front-End Developer
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
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
    </footer>
  )
}

export default Footer
