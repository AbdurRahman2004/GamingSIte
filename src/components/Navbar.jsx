import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const Navbar = () => {
    const navContainerRef = useRef(null);
    const navItems = ['Nexus' , 'Vault', 'prolog', 'About']
    const audioElementRef = useRef(null)
    const [isAudioPlaying , setAudioPlaying] = useState(false);
    const [isIndicatorActive , setIndicatorActive] = useState(false);
    const [lastScrollY , setLastScrollY] = useState(0);
    const [ isNavVisible,setNavVisible] = useState(true)

    const { y : currenScrollY} = useWindowScroll();

    useEffect(()=>{
      if(currenScrollY === 0){
        setNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav');
      } else if(currenScrollY > lastScrollY){
        setNavVisible(false);
        navContainerRef.current.classList.remove('floating-nav')
      } else if(currenScrollY < lastScrollY){
        setNavVisible(true);
        navContainerRef.current.classList.add('floating-nav')
      }

      setLastScrollY(currenScrollY);
    },[currenScrollY , lastScrollY])

    useEffect(()=>{
       gsap.to(navContainerRef.current,{
        y: isNavVisible? 0 : -100,
        opacity: isNavVisible? 1: 0,
        duration: 0.2
       })
    },[])


    const  toggleAudioIndicator = () => {
       setAudioPlaying(prev => !prev)
       setIndicatorActive(prev => !prev)
    }

    useEffect(()=>{
         if(isAudioPlaying){
            audioElementRef.current.play()
         }
         else{
            audioElementRef.current.pause();
         }
    },[isAudioPlaying])
  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
            <div className='flex items-center gap-7'>
                <img src="/img/logo.png" alt="logo" className='w-10'/>
                <Button 
                title="Products"
                rightIcon={<TiLocationArrow />}
                id="product-button"
                containerClass= "bg-blue-50 md:flex hidden items-center justify-center gap-1"
                 />
            </div>
             <div className='flex h-full items-center'>
                <div className='hidden md:block'> 
                 {navItems.map(item => (
                    <a key={item}
                    className='nav-hover-btn'
                    href={`#${item.toLocaleLowerCase()}`}
                    > 
                        {item}
                    </a> 
                 ))}
                </div>
                <button className='ml-10 flex flex-center space-x-0.5' onClick={toggleAudioIndicator}> 
                    <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />

                    {[1,2,3,4].map((bar)=> (
                        <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar* 0.1}s`}}>

                        </div>
                    ))}

                </button>
             </div>

        </nav>

        </header>
    </div>
  )
}

export default Navbar