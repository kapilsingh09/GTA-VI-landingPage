import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'remixicon/fonts/remixicon.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to('.vi-mask-group', {
      rotate: 10,
      ease: 'power2.inOut',
      transformOrigin: '50% 50%',
      duration: 2.1,
    }).to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.9,
      ease: 'power2.inOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector('.svg')?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, []);

  useEffect(() => {
    if (!showContent) return;

    // Entrance animations
    gsap.to('.main', { rotate: 0, duration: 2, scale: 1, delay: -1, ease: 'expo.inOut' });
    gsap.to('.sky', { rotate: 0, duration: 3, scale: 1, delay: -1, ease: 'expo.inOut' });
    gsap.to('.bg', { rotate: 0, duration: 3, scale: 1, delay: -1, ease: 'expo.inOut' });
    gsap.to('.charr', { rotate: 0, bottom: '-70%', duration: 3, x: '-50%', scale: 0.7, delay: -0.8, ease: 'expo.inOut' });

    gsap.from('.textt h2', {
  y: 100,
  opacity: 0,
  scale: 1.2,
  rotate: 10,
  stagger: 0.2,
  duration: 1,
  ease: 'power4.out'
});

    // ScrollTrigger animations
    gsap.from('.rg h1', {
      scrollTrigger: { trigger: '.rg', start: 'top 80%', toggleActions: 'play none none reverse' },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out',
    });

    gsap.from('.rg p', {
      scrollTrigger: { trigger: '.rg', start: 'top 75%', toggleActions: 'play none none reverse' },
      y: 30,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'power4.out',
    });

    gsap.from('.rg button', {
      scrollTrigger: { trigger: '.rg', start: 'top 70%', toggleActions: 'play none none reverse' },
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    // Mouse move parallax
    const main = document.querySelector('.main');
    main?.addEventListener('mousemove', (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to('.main .textt', { x: `${xMove * 0.4}%`, duration: 0.5, ease: 'power2.out' });
      gsap.to('.sky', { x: xMove * 0.5, duration: 0.5, ease: 'power2.out' });
      gsap.to('.bg', { x: xMove * 0.5, duration: 0.5, ease: 'power2.out' });
    });
  }, [showContent]);

  return (
    <>
      {/* SVG Intro Animation */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image href="/forpush/bg.png" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask="url(#viMask)" />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full scale-[1.7] overflow-hidden rotate-[30deg]">
          {/* Landing Section */}
          <div className="landing w-full flex h-screen overflow-hidden bg-black relative">
            <nav>
              <div className="w-full absolute top-0 left-0 z-[120] px-10 py-8">
                <div className="logo flex leading-none gap-[20px]">
                  <div className="lines flex flex-col gap-1.5">
                    <div className="bg-white w-11 h-1" />
                    <div className="bg-white w-8 h-1" />
                    <div className="bg-white w-5 h-1" />
                  </div>
                  <h3 className="text-3xl text-white -m-[8px]">ROCKSTAR</h3>
                </div>
              </div>
            </nav>

            <div className="imagesdiv relative w-full overflow-hidden h-screen">
              <img src="./public/forpush/sky.png" alt="" className="sky scale-[1.7] rotate-[-20deg] absolute left-0 top-0 w-full h-[100vh] object-cover" />
              <img src="./public/forpush/bg.png" alt="" className="bg absolute scale-[2] rotate-[-25deg] left-0 top-0 w-full h-[100vh] object-cover" />
            <div className="textt text-white absolute gap-1.5 leading-none top-0 left-1/2 flex flex-col -translate-x-1/2">
                   <h2 className="text-9xl -ml-[50px]">Grand</h2>
                   <h2 className="text-9xl ml-[70px]">Theft</h2>
                   <h2 className="text-9xl -ml-[40px]">Auto</h2>
             </div>

              <img src="./public/forpush/girlbg.png" alt="" className="charr absolute rotate-[-20deg] scale-[2] overflow-hidden -bottom-[190%] left-1/2 -translate-x-1/2 object-cover" />
            </div>

            {/* Scroll Down Indicator at Bottom */}
            <div className="bottombar absolute bottom-0 left-0 w-full px-10 py-6 bg-gradient-to-t from-black to-transparent z-50">
              <div className="flex items-center gap-1 text-white">
                <i className="ri-arrow-down-line text-2xl" />
                <h4 className="text-[17px] custom-font">Scroll down</h4>
                <img src="./public/forpush/ps5.png" className="h-[55px] absolute left-1/2 -translate-x-1/2" alt="" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full bg-black h-screen flex items-center justify-center">
            <div className="cntnr w-full flex h-[80%]">
              <div className="limg relative w-1/2 h-full">
                <img className="scale-[.7] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="./public/forpush/imag.png" alt="" />
              </div>

              <div className="rg text-white w-[40%] pl-30 pt-7">
                <h1 className="text-5xl text-white leading-relaxed">Still Running</h1>
                <h1 className="text-5xl text-white">Not Hunting</h1>
                <p className="mt-10 font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, temporibus! Sint minus beatae blanditiis odio temporibus libero ab repellat, excepturi natus officia quas dolorem cumque fugit, id accusantium harum, cum veniam. Nostrum, facilis voluptate?
                </p>
                <p className="font-[Helvetica_Now_Display] mt-10">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat modi facere atque nam possimus animi tempora quas molestias similique, non enim ex nemo autem inventore dolorum? Dolores architecto quasi mollitia.
                </p>
                <button className="px-6 py-4 rounded-md text-2xl text-black mt-7 bg-yellow-300">Download now</button>
              </div>
            </div>
          </div>

          
        </div>
      )}
    </>
  );
};

export default App;
