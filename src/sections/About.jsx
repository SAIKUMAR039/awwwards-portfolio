import React, { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `The Visionaries Behind SKIZEN\nMeet the dynamic duo driving innovation and excellence at SKIZEN Creative Lab`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-lg font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src="images/founders.png"
          alt="team"
          className="w-md rounded-3xl"
        />
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card: Syed Imran */}
            <article className="p-6 bg-white/3 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold">Syed Imran</h3>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/60">
                FOUNDER — Company & Marketing Head
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                Manages all marketing strategies and financial operations of the
                company. With expertise in Business development, Syed leads our
                creative vision and ensures sustainable growth with
                overpowered solutions that ensures success of our company.
              </p>

              <h4 className="mt-6 text-base font-medium">Specialties</h4>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-white/70">
                <li>Full Stack</li>
                <li>Data analyst</li>
                <li>Machine Learning</li>
                <li>Marketing Strategy</li>
                <li>Financial Management</li>
                <li>Brand Development</li>
              </ul>
            </article>

            {/* Card: Sai Kumar Thota */}
            <article className="p-6 bg-white/3 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold">Sai Kumar Thota</h3>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/60">
                CO-FOUNDER — Web Developer & Tech Lead
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                Handles all web development and technology operations with an
                impressive portfolio in modern web technologies. Sai manages
                every aspect of our online presence and technical
                infrastructure.
              </p>

              <h4 className="mt-6 text-base font-medium">Specialties</h4>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-white/70">
                <li>Web Development</li>
                <li>Full-Stack Development</li>
                <li>Tech Management</li>
                <li>Digital Solutions</li>
                <li>Meta Ads</li>
                <li>Google Ads</li>
                <li>Social Media Management</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
