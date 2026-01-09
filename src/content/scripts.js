const BUTTON_ID = 'tubedice-custom-btn';
const STYLE_ID = 'tubedice-custom-style';

function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
        #${BUTTON_ID} {
            background-color: #f2f2f2 !important;
            color: #0f0f0f !important;
        }

        html[dark] #${BUTTON_ID}, 
        html[theme="dark"] #${BUTTON_ID},
        body[dark] #${BUTTON_ID} {
            background-color: #272727 !important;
            color: #ffffff !important;
        }
    `;
    document.head.appendChild(style);
}

function injectShuffleButton() {
    injectStyles();
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('list');
    const existingBtn = document.getElementById(BUTTON_ID);

    if (!listId) {
        if (existingBtn) existingBtn.remove();
        return;
    }
    if (existingBtn) return;

    const container = document.querySelector('ytd-watch-metadata #top-level-buttons-computed');
    if (!container) return;

    const myBtn = document.createElement('button');
    myBtn.id = BUTTON_ID;
    myBtn.innerHTML = '🎲 <span style="margin-left: 6px;">Tubedice</span>';

    Object.assign(myBtn.style, {
        marginRight: '8px',
        padding: '0 16px',
        height: '36px',
        borderRadius: '18px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        flexShrink: '0'
    });

    myBtn.onclick = (e) => {
        e.preventDefault();
        window.open(`https://playlistshuffle.online/?ids=${listId}`, '_blank');
    };

    container.prepend(myBtn);
}

const observer = new MutationObserver(injectShuffleButton);
observer.observe(document.body, { childList: true, subtree: true });
injectShuffleButton();