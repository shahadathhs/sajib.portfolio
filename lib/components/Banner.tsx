export default function Banner() {
  return (
    <div className="hero bg-base-200 min-h-screen -mt-20">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Hi there! I&apos;m <span className="text-primary">Sajib</span>
          </h1>
          <p className="py-6">
            I&apos;m a passionate MERN stack developer with a strong focus on
            backend development. I have a strong foundation in backend
            development, including Node.js, Express.js, and MongoDB.
          </p>
          <a
            href="https://drive.google.com/uc?export=download&id=1W-zqL_skTthSrsRyP5-t0RfcDWnrgLVX"
            className="btn btn-primary"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
