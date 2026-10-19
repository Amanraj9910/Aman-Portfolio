import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NexusSection from './components/NexusSection';
import FollowArtSection from './components/FollowArtSection';
import NexusCardSection from './components/NexusCardSection';
import ConnectorySection from './components/ConnectorySection';
import ArtistCarousel from './components/ArtistCarousel';
import TestimonialsSection from './components/TestimonialsSection';
import JoinSection from './components/JoinSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Reveal animations for each section
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        }
      );
    });

    // Parallax on hero photo
    gsap.to('.hero-photo-block', {
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
      y: -60, ease: 'none',
    });

    // Counter animation for stats — the target comes from data attributes, not the
    // rendered text, so re-running this effect (e.g. StrictMode) can't read back "0"
    const statNums = document.querySelectorAll('.about-stat-number[data-value]');
    statNums.forEach((el) => {
      const target = Number(el.dataset.value);
      const suffix = el.dataset.suffix || '';
      const counter = { value: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(counter, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        value: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    });


    // Project cards stagger
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <NexusSection />
      <FollowArtSection />
      <NexusCardSection />
      <ConnectorySection />
      <ArtistCarousel />
      <TestimonialsSection />
      <JoinSection />

      {/* Floating Resume button */}
      <a className="floating-join" href="mailto:rajaman78167@gmail.com">
        <div className="floating-join-top">
          <span className="floating-join-icon">↗</span>
        </div>
        <span className="floating-join-text">Hire Me</span>
      </a>
    </>
  );
}

export default App;
