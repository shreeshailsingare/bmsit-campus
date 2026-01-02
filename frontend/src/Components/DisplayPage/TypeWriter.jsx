import { Typewriter } from 'react-simple-typewriter';

function HeroText() {
  return (
    <div className="container text-start mt-5">
      <h1 className="fw-semibold fs-4">
        Explore new - {' '}
        <span className="text-white">
          <Typewriter
            words={['Events', 'Hackthons', 'Webinars']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </span>
      </h1>
    </div>
  );
}

export default HeroText;
