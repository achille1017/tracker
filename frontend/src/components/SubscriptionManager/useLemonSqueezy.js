import { useEffect, useState } from 'react';

function useLemonSqueezy() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src="https://assets.lemonsqueezy.com/lemon.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.lemonsqueezy.com/lemon.js';
      script.async = true;
      script.onload = () => {
        if (window.createLemonSqueezy) {
          window.createLemonSqueezy();
          setIsLoaded(true);
        }
      };
      document.body.appendChild(script);
    } else if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
      setIsLoaded(true);
    }
  }, []);

  return isLoaded;
}

export default useLemonSqueezy;
