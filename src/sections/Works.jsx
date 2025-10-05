import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// simple gradient selector for preview cards
const getGradient = (index) => {
  const gradients = [
    "linear-gradient(135deg,#0ea5a4 0%,#065f46 100%)",
    "linear-gradient(135deg,#7c3aed 0%,#4c1d95 100%)",
    "linear-gradient(135deg,#f97316 0%,#b45309 100%)",
    "linear-gradient(135deg,#06b6d4 0%,#0e7490 100%)",
    "linear-gradient(135deg,#ef4444 0%,#b91c1c 100%)",
    "linear-gradient(135deg,#f59e0b 0%,#7c2d12 100%)",
  ];
  return gradients[index % gradients.length];
};

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-light" onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-6 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title + meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-10 transition-all duration-500">
              <div>
                <h2 className="lg:text-[32px] text-[26px] leading-none text-black md:group-hover:text-white">
                  {project.name}
                </h2>
                <p className="mt-2 text-xs md:text-sm text-black/60 md:group-hover:text-white/60 max-w-2xl">
                  {project.description}
                </p>
              </div>
              <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5 mt-4 md:mt-0 text-black md:group-hover:text-white" />
            </div>

            {/* divider */}
            <div className="w-full h-px bg-black/80 my-4" />

            {/* framework chips */}
            <div className="flex flex-wrap gap-3 px-6 md:px-10">
              {project.frameworks.map((framework) => (
                <span
                  key={framework.id}
                  className="text-xs md:text-sm uppercase tracking-wider px-3 py-1 bg-black/5 rounded-full text-black md:group-hover:text-white"
                >
                  {framework.name}
                </span>
              ))}
            </div>

            {/* mobile preview card (no images) */}
            <div className="md:hidden px-6 mt-6">
              <div className="w-full h-64 rounded-md overflow-hidden shadow-lg" style={{ background: getGradient(index) }}>
                <div className="w-full h-full flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/40">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-sm mt-2 line-clamp-3">{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* desktop floating preview (no images) */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[520px] md:block hidden opacity-0 rounded-md"
        >
          {currentIndex !== null && (
            <div className="w-full h-full flex items-end" style={{ background: getGradient(currentIndex) }}>
              <div className="w-full p-8 text-white bg-gradient-to-t from-black/40">
                <h3 className="text-2xl font-semibold">{projects[currentIndex].name}</h3>
                <p className="mt-2 text-sm line-clamp-4">{projects[currentIndex].description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projects[currentIndex].frameworks.map((f) => (
                    <span key={f.id} className="text-xs px-2 py-1 bg-white/10 rounded">{f.name}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
