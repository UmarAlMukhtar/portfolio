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
    <section id="work" ref={sectionRef} className='app-showcase'>
        <div className='w-full'>
            <div className='showcaselayout'>
                {/* LEFT */}
                <div className="first-project-wrapper" ref={project1Ref}>
                    <div className='image-wrapper'>
                        <img src="/images/project1.png" alt="Movie Listing App" />
                    </div>
                    <div className='text-content'>
                        <h2>Kasaragod Cultural Heritage Platform</h2>
                        <p className='text-white-50'>A Kasaragod Cultural Heritage Platform is a web application designed to showcase the rich cultural heritage of Kasaragod, Kerala. The platform provides information about historical sites, cultural events, local cuisine, and experiences in Kasaragod. Users can explore various cultural locations, view upcoming events, and share their own experiences.</p>
                    </div>
                </div>
                {/* RIGHT */}
                <div className='project-list-wrapper overflow-hidden'>
                    <div className='project' ref={project2Ref}>
                        <div className='image-wrapper bg-[#ffefdb] p-5'>
                            <img src="/images/project2.png" alt="Movie Listing App" />
                            <h2>React based Movie App</h2>
                        </div>
                    </div>
                    <div className='project' ref={project3Ref}>
                        <div className='image-wrapper bg-[#ffe7db] p-5'>
                            <img src="/images/project3.png" alt="Color Palette generator" />
                            <h2>Color Palette Generator</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ShowcaseSection