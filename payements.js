import { createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';
import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const LEMON_SQUEEZY_API_KEY_TEST = keys["lemonSqueezyApi"]
const LEMON_SQUEEZY_API_KEY = keys["lemonSqueezyApiLive"]

const LIFE_ID = 579860
const MONTHLY_ID = 579876
const ANNUAL_ID = 579877
const LIFE_ID_TEST = 541239
const MONTHLY_ID_TEST = 539584
const ANNUAL_ID_TEST = 539248
const variantIds = [MONTHLY_ID, ANNUAL_ID, LIFE_ID];
const STORE_ID = keys["storeId"];
const FRONTEND_SERVER = keys["env"] ==="dev" ?"http://192.168.1.67:3000": "https://withar.co"
const BACKEND_SERVER = keys["env"] ==="dev" ?"http://192.168.1.67:4000": "https://withar.co"
lemonSqueezySetup({
    apiKey: LEMON_SQUEEZY_API_KEY,
});

async function getThreeCheckoutLinks(mail) {
    const newCheckout = {
        productOptions: {
            redirect_url: FRONTEND_SERVER + '/payement'
        },
        checkoutOptions: {
            embed: true,
        },
        checkoutData: {
            email: mail,
            custom: { "mail": mail }
        },
        expiresAt: null,
        preview: true,
        testMode: false,
    };
    try {
        const checkoutLinks = await Promise.all(variantIds.map(async (variantId) => {
            try{
            const checkout = await createCheckout(
                STORE_ID,
                variantId, newCheckout
            );
            console.log(checkout.data)
            return checkout.data.data.attributes.url;}catch(e){console.log(e)}
        }));

        return {
            "monthly": checkoutLinks[0],
            "annual": checkoutLinks[1],
            "lifetime": checkoutLinks[2],
        };
    } catch (error) {
        console.error('Error creating checkouts:', error);
        throw error;
    }
}


export { getThreeCheckoutLinks, FRONTEND_SERVER, BACKEND_SERVER }
