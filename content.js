const URL = 'https://bobba.pro/verification-nonce';
const ADDR_API = 'https://bobba.pro/api/publicAddress';
const DISCORD_URL = 'https://discord.gg/VPFXUhSZ3j';

const BTN_CONTAINER = document.createElement('div');
BTN_CONTAINER.style.position = 'fixed';
BTN_CONTAINER.style.bottom = '20px';
BTN_CONTAINER.style.right = '20px';
BTN_CONTAINER.style.zIndex = '9999';
BTN_CONTAINER.style.display = 'none';
BTN_CONTAINER.style.alignItems = 'center';

const BTN = document.createElement('button');
BTN.textContent = 'Get Avatar Perks';
BTN.style.padding = '12px 24px';
BTN.style.fontSize = '18px';
BTN.style.fontWeight = '600';
BTN.style.backgroundColor = '#2ecc71';
BTN.style.color = 'white';
BTN.style.border = 'none';
BTN.style.borderRadius = '30px';
BTN.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
BTN.style.cursor = 'pointer';
BTN.style.transition = 'transform 0.3s ease-in-out';
BTN.addEventListener('mouseenter', () => {
    BTN.style.transform = 'scale(1.05)';
});
BTN.addEventListener('mouseleave', () => {  
    BTN.style.transform = 'scale(1)';
});
BTN_CONTAINER.appendChild(BTN);

const DISCORD_BTN = document.createElement('a');
DISCORD_BTN.href = DISCORD_URL;
DISCORD_BTN.target = '_blank';
DISCORD_BTN.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';
DISCORD_BTN.style.marginLeft = '12px';
DISCORD_BTN.style.display = 'flex';
DISCORD_BTN.style.alignItems = 'center';
DISCORD_BTN.style.justifyContent = 'center';
DISCORD_BTN.style.width = '40px';
DISCORD_BTN.style.height = '40px';
DISCORD_BTN.style.borderRadius = '50%';
DISCORD_BTN.style.backgroundColor = '#7289da';
DISCORD_BTN.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
DISCORD_BTN.style.cursor = 'pointer';
DISCORD_BTN.style.transition = 'transform 0.3s ease-in-out';
DISCORD_BTN.addEventListener('mouseenter', () => {
    DISCORD_BTN.style.transform = 'scale(1.1)';
});
DISCORD_BTN.addEventListener('mouseleave', () => {
    DISCORD_BTN.style.transform = 'scale(1)';
});
BTN_CONTAINER.appendChild(DISCORD_BTN);

document.body.appendChild(BTN_CONTAINER);

const createNotification = (type, message) => {
    const NOTIFICATION = document.createElement('div');
    NOTIFICATION.textContent = message;
    NOTIFICATION.style.position = 'fixed';
    NOTIFICATION.style.bottom = '80px';
    NOTIFICATION.style.right = '20px'; 
    NOTIFICATION.style.padding = '16px';
    NOTIFICATION.style.backgroundColor = type === 'success' ? '#2ecc71' : '#e74c3c';
    NOTIFICATION.style.color = 'white';
    NOTIFICATION.style.borderRadius = '10px';
    NOTIFICATION.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    NOTIFICATION.style.zIndex = '10000';
    NOTIFICATION.style.opacity = '0';
    NOTIFICATION.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(NOTIFICATION);

    setTimeout(() => {
        NOTIFICATION.style.opacity = '1'; 
    }, 100);

    setTimeout(() => {
        NOTIFICATION.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(NOTIFICATION);
        }, 500);
    }, 5000);
};

const checkForUsername = () => {
    const usernameElement = document.querySelector('.user-menu__name');
    if (usernameElement) {
        BTN_CONTAINER.style.display = 'flex';
    } else {
        BTN_CONTAINER.style.display = 'none';
    }
};

const observer = new MutationObserver(checkForUsername);
observer.observe(document.body, { childList: true, subtree: true });

BTN.addEventListener('click', async () => {
    try {
        const DOMAIN = window.location.hostname;
        const API_URL = `https://${DOMAIN}/api/settings/wallet/verification/start`;

        const ADDR_RESP = await fetch(ADDR_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!ADDR_RESP.ok) {
            throw new Error('Failed to get public address');
        }

        const { publicAddress } = await ADDR_RESP.json();

        const usernameElement = document.querySelector('.user-menu__name');
        const currentDomain = window.location.hostname.split('.').slice(-2).join('.');

        if (usernameElement) {
            const username = usernameElement.textContent;
            console.log(`${username} ${currentDomain}`);
            startVerificationProcess(DOMAIN, API_URL, publicAddress, username, currentDomain);
        } else {
            throw new Error('Username not found');
        }
    } catch (err) {
        createNotification('error', err.message);
    }
});

async function startVerificationProcess(DOMAIN, API_URL, ADDR, username, currentDomain) {
    try {
        const RESP = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Origin': `https://${DOMAIN}`,
                'Referer': `https://${DOMAIN}/settings/wallet`,
            },
            body: JSON.stringify({ publicAddress: ADDR }),
        });

        const DATA = await RESP.json();

        if (DATA.message === "authentication-needed") {
            throw new Error("You're not logged in");
        }

        if (DATA.error === "ethereum.too_many_requests") {
            throw new Error("Too many requests, please try again later");
        }

        if (!RESP.ok) {
            throw new Error(`Failed to start verification: ${RESP.status}`);
        }

        const NONCE = DATA.nonce;

        const NONCE_RESP = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nonce: NONCE, username: username, domain: currentDomain }),
        });

        if (!NONCE_RESP.ok) {
            throw new Error('Invalid response from verification server');
        }

        const { signature: SIG } = await NONCE_RESP.json();

        const FINISH_URL = `https://${DOMAIN}/api/settings/wallet/verification/finish`;
        const FINISH_RESP = await fetch(FINISH_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Origin': `https://${DOMAIN}`,
                'Referer': `https://${DOMAIN}/settings/wallet`,
            },
            body: JSON.stringify({ signature: SIG, publicAddress: ADDR }),
        });

        const FINISH_DATA = await FINISH_RESP.json();

        if (JSON.stringify(FINISH_DATA).includes(ADDR)) {
            console.log(`${ADDR} = Worked`);
            createNotification('success', 'Avatar Perks successfully added');
        } else {
            console.log(`${ADDR} = Failed`);
            createNotification('error', 'Verification failed, try later again');
        }
    } catch (err) {
        createNotification('error', err.message);
    }
}