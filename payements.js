import { createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';
import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const LEMON_SQUEEZY_API_KEY = keys["lemonSqueezyApi"]
const MONTHLY_ID = 539584
const ANNUAL_ID = 539248
const LIFE_ID = 541239
const variantIds = [MONTHLY_ID, ANNUAL_ID, LIFE_ID];
const STORE_ID = keys["storeId"];
const FRONTEND_SERVER = keys["env"] ==="dev" ?"http://localhost:3000": "https://withar.co"

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
        testMode: true,
    };
    try {
        const checkoutLinks = await Promise.all(variantIds.map(async (variantId) => {
            const checkout = await createCheckout(
                STORE_ID,
                variantId, newCheckout
            );
            return checkout.data.data.attributes.url;
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


export { getThreeCheckoutLinks, FRONTEND_SERVER }
