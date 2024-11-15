import React, { useState, useEffect } from 'react';
import useLemonSqueezy from './useLemonSqueezy';
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"
import { Helmet } from 'react-helmet';


import "./SubscriptionManager.css"
function SubscriptionManager(props) {

  const [checkoutMonthly, setCheckoutMonthly] = useState("")
  const [checkoutAnnual, setCheckoutAnnual] = useState("")
  const [checkoutLifetime, setCheckoutLifetime] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [offersBoxMobile, setOffersBoxMobile] = useState("monthly")

  const goRoute = useNavigateAndScroll()

  useEffect(() => {
    if (!props.logged) {
      goRoute('/login')
    }
    fetch(SERVER_NAME + "/checkout", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // Indicate that you're sending JSON
      },
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setCheckoutMonthly(data.monthly)
            setCheckoutAnnual(data.annual)
            setCheckoutLifetime(data.lifetime)
            setLoaded(true)
          })
        }
      })
  }, [])
  const isLemonSqueezyLoaded = useLemonSqueezy();
  function loadInterfaceLS(link) {
    if (isLemonSqueezyLoaded && window.LemonSqueezy) {
      window.LemonSqueezy.Setup({
        checkoutOptions: {
          closeButton: true
        }
      });
      window.LemonSqueezy.Url.Open(link);
    } else {
      console.error('Lemon Squeezy is not loaded yet');
    }



  }

  return (
    <div id='subscriptionManager'>
      <Helmet>
        <title>With Arco | Get productive today</title>
        <meta name="description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
        <meta property="og:title" content="With Arco | Get productive today" />
        <meta property="og:description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
        <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
      </Helmet>
      <div id='pricingBox2'>
        <p className='text2'>To start to work with Arco</p>
        <p id='promoP'>-50 % on all offers with code LAUNCH50</p>
        {loaded ? <div id='offersBox'>
          <div className='offerDiv'>
            <p className='offerDivP1'>Monthly</p>
            <p className='offerDivP2'><span className='lineTrough'>6.99€</span> 3.49€/month</p>
            <p className='offerDivP3'>Try it just one month..</p>

            <button className='getStarted' onClick={() => loadInterfaceLS(checkoutMonthly)}>SUBSCRIBE NOW</button>
          </div>
          <div className='offerDiv'>
            <p className='offerDivP1'>Yearly</p>
            <p className='offerDivP2'><span className='lineTrough'>49.99€</span> 24.99€/year</p>
            <p className='offerDivP3'>40% cheaper than monthly bill</p>

            <button className='getStarted' onClick={() => loadInterfaceLS(checkoutAnnual)}>SUBSCRIBE NOW</button>
          </div>
          <div className='offerDiv'>
            <p className='offerDivP1'>Lifetime</p>
            <p className='offerDivP2'><span className='lineTrough'>59.99€</span> 29.99€</p>
            <p className='offerDivP3'>Work with Arco forever</p>

            <button className='getStarted' onClick={() => loadInterfaceLS(checkoutLifetime)}>BUY NOW</button>
          </div>
        </div> : <div className="loaderAnimation"></div>}
        {loaded ?
          <div id='offersBoxMobile'>
            <div id="selectorOffersMobile">
              <button className={offersBoxMobile === "monthly" ? "selectorOffersMobileActive" : "selectorOffersMobileInactive"} onClick={() => { setOffersBoxMobile("monthly") }}>Monthly</button>
              <button className={offersBoxMobile === "annual" ? "selectorOffersMobileActive" : "selectorOffersMobileInactive"} onClick={() => { setOffersBoxMobile("annual") }}>Annual</button>
              <button className={offersBoxMobile === "lifetime" ? "selectorOffersMobileActive" : "selectorOffersMobileInactive"} onClick={() => { setOffersBoxMobile("lifetime") }}>Lifetime</button>
            </div>
            <div className='offerDiv'>
              <p className='offerDivP1'>{offersBoxMobile === "monthly" ? "Monthly" : offersBoxMobile === "annual" ? "Annual" : "Lifetime"}</p>
              {offersBoxMobile === "monthly" ? <p className='offerDivP2'><span className='lineTrough'>6.99€</span> 3.49€/month</p>
                : offersBoxMobile === "annual" ? <p className='offerDivP2'><span className='lineTrough'>49.99€</span> 24.99€/year</p>
                  : <p className='offerDivP2'><span className='lineTrough'>59.99€</span> 29.99€</p>
              }
              <p className='offerDivP3'>{offersBoxMobile === "monthly" ? "Try it just one month.." : offersBoxMobile === "annual" ? "40% cheaper than monthly bill" : "Work with Arco forever"}</p>
              <button className='getStarted' onClick={() => loadInterfaceLS(offersBoxMobile === "monthly" ? checkoutMonthly : offersBoxMobile === "annual" ? checkoutAnnual : checkoutLifetime)}>{offersBoxMobile === "lifetime" ? "BUY NOW" : "SUBSCRIBE NOW"}</button>
            </div>
          </div>
          : <div className="loaderAnimationMobile"></div>}
      </div>
    </div>
  );
}

export default SubscriptionManager;