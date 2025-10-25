import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    
    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

        projects.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: (index + 1) * 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=10",
                        toggleActions: "play none none reverse"
                    }
                })
        })

        gsap.fromTo(
            sectionRef.current, 
            { opacity: 0 }, 
            {opacity: 1, duration: 1.5, ease: "power2.inOut" });
    }, []);

  return (
    <section id="work" ref={sectionRef} className='app-showcase mb-7'>
        <div className='w-full'>
            <div className='showcaselayout'>
                {/* LEFT */}
                <div className="first-project-wrapper" ref={project1Ref}>
                    <a href="http://www.iedcsummit.in" target='_blank' rel='noreferrer' className='h-full flex flex-col'>
                        <div className='image-wrapper'>
                            <img src="/images/project1.png" alt="IEDC Summit 2025 Website" />
                        </div>
                        <div className='text-content'>
                            <h2>IEDC Summit 2025 Website</h2>
                            <p className='text-white-50'>Made a website for The IEDC Summit 2025, organised by Kerala Startup Mission and jointly hosted by L.B.S. College of Engineering, Kasaragod and Central University of Kerala.</p>
                        </div>
                    </a>
                </div>
                {/* RIGHT */}
                <div className='project-list-wrapper overflow-hidden'>
                    <div className='project' ref={project2Ref}>
                        <a href="http://www.beyondsyllabus.in" target='_blank' rel='noreferrer'>
                            <div className='image-wrapper bg-[#ffefdb] p-5'>
                                <img src="/images/project2.png" alt="Beyond Syllabus" />
                            </div>
                            <h2>Beyond Syllabus</h2>
                        </a>
                    </div>
                    <div className='project' ref={project3Ref}>
                        <a href="http://www.kasaroam.in" target='_blank' rel='noreferrer'>
                            <div className='image-wrapper bg-[#ffe7db] p-5'>
                                <img src="/images/project3.png" alt="Kasaroam" />
                            </div>
                            <h2>Kasaroam</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ShowcaseSection