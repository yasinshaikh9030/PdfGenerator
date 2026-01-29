function About() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          About Quick PDF Generator
        </h1>
        <div className="space-y-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
          <p>
            Quick PDF Generator is a simple online tool that helps users convert JPG and
            PNG images into PDF files instantly.
          </p>
          <p>
            Our goal is to make document conversion fast, secure, and accessible for
            everyone without requiring any software installation.
          </p>
          <p>
            All processing happens directly in the browser, ensuring user privacy and full
            control over files.
          </p>
          <p>
            This platform is designed for students, professionals, and everyday users who
            need a quick and reliable PDF solution.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
