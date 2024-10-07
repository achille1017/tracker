import React, { useState, useEffect } from 'react';
import useLemonSqueezy from './useLemonSqueezy';
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"


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
            console.log(data)
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
    console.log(link)
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
      <div id='pricingBox'>
        <p id='toStartP'>To start to work with Arco</p>
        {loaded ? <div id='offersBox'>
          <div className='offerDiv'>
            <p className='offerDivP1'>Monthly</p>
            <p className='offerDivP2'>3$/month</p>
            <p className='offerDivP3'>Try it just one month..</p>

            <button className='getStarted' onClick={() => loadInterfaceLS(checkoutMonthly)}>SUBSCRIBE NOW</button>
          </div>
          <div className='offerDiv'>
            <p className='offerDivP1'>Yearly</p>
            <p className='offerDivP2'>25$/year</p>
            <p className='offerDivP3'>30% cheaper than monthly bill</p>

            <button className='getStarted' onClick={() => loadInterfaceLS(checkoutAnnual)}>SUBSCRIBE NOW</button>
          </div>
          <div className='offerDiv'>
            <p className='offerDivP1'>Lifetime</p>
            <p className='offerDivP2'>60$</p>
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
              <p className='offerDivP2'>{offersBoxMobile === "monthly" ? "3$/month" : offersBoxMobile === "annual" ? "25$/year" : "60$"}</p>
              <p className='offerDivP3'>{offersBoxMobile === "monthly" ? "Try it just one month.." : offersBoxMobile === "annual" ? "30% cheaper than monthly bill" : "Work with Arco forever"}</p>
              <button className='getStarted' onClick={() => loadInterfaceLS(offersBoxMobile === "monthly" ? checkoutMonthly : offersBoxMobile === "annual" ? checkoutAnnual : checkoutLifetime)}>{offersBoxMobile === "lifetime" ? "BUY NOW" : "SUBSCRIBE NOW"}</button>
            </div>
          </div>
          : <div className="loaderAnimationMobile"></div>}
      </div>
    </div>
  );
}

export default SubscriptionManager;