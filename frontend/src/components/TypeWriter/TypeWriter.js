import React, { useState, useEffect } from 'react';
import "./TypeWriter.css"
import useNavigateAndScroll from '../functions';
const Typewriter = ({ text, delay, id, className,link,textLink }) => {
  const goRoute = useNavigateAndScroll()
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);
  return <p id={id} className={className}>{currentText} {link && <button onClick={()=>{goRoute(link)}} className='buttonTypeWriter' >{textLink}</button>}</p>;
};

export default Typewriter;