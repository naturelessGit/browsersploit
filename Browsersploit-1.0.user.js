// ==UserScript==
// @name         Browsersploit
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Simple exploit for your browser
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // === Create GUI Container ===
    const popup = document.createElement('div');
    popup.id = 'injector-popup';
    popup.innerHTML = `
    <div id="injector-header">
            <span>Browsersploit</span>
            <button id="injector-close">&times;</button>
        </div>
  <div id="injector-buttons">
      <button id="btn-html">Inject HTML</button>
      <button id="btn-js">Inject JavaScript</button>
      <button id="btn-replace-html">Replace HTML</button>
      <button id="btn-css">Replace CSS</button>

      <!-- ✨ New Buttons Start -->
      <button id="btn-text-chaos">Text Chaos</button>
      <button id="btn-css-destroyer">CSS Destroyer</button>
      <button id="btn-cowify">Cowify Images</button>
      <button id="btn-crash">Crash Browser</button>
      <button id="btn-rainbowify">Rainbowify</button>
      <button id="btn-remove-css">Remove CSS</button>
      <button id="btn-fuck-html">F*ck HTML</button>
      <button id="btn-remove-js">Remove JavaScript</button>
      <button id="btn-rotate-page">Rotate Page</button>
      <button id="btn-replace-images">Replace Images</button>
      <!-- ✨ New Buttons End -->
  </div>
`;

    document.body.appendChild(popup);

    // === Inject Styles ===
    const style = document.createElement('style');
    style.textContent = `
    #injector-popup {
    position: fixed;
    top: 100px;
    left: 100px;
    background: #1e1e1e;
    color: #eee;
    font-family: system-ui, sans-serif;
    border-radius: 10px;
    width: 260px;
    max-height: 400px;        /* 🆕 Set a max height */
    overflow-y: auto;         /* 🆕 Enable vertical scroll */
    z-index: 999999;
    box-shadow: 0 0 12px rgba(0,0,0,0.5);
    user-select: none;
}



        #injector-header {
            background: #333;
            padding: 10px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            cursor: move;
        }

        #injector-header button {
            background: transparent;
            border: none;
            color: #eee;
            font-size: 18px;
            cursor: pointer;
        }

        #injector-buttons {
            display: flex;
            flex-direction: column;
            padding: 10px;
            gap: 10px;
        }

        #injector-buttons button {
            padding: 8px 10px;
            border: none;
            border-radius: 5px;
            background: #444;
            color: #eee;
            cursor: pointer;
            font-size: 14px;
        }

        #injector-buttons button:hover {
            background: #555;
        }
    `;
    document.head.appendChild(style);

    // === Close Functionality ===
    document.getElementById('injector-close').onclick = () => popup.remove();

    // === Drag Logic ===
    let isDragging = false, offsetX = 0, offsetY = 0;
    const header = document.getElementById('injector-header');

    header.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
        document.addEventListener('mousemove', movePopup);
        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mouseup', onMouseUp);

    });

    function movePopup(e) {
        if (!isDragging) return;
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
    }

    // === Button Functions ===

    // Inject HTML
    document.getElementById('btn-html').onclick = () => {
        const html = prompt("Paste the HTML code you want to inject: ");
        if (html) {
            const el = document.createElement('div');
            el.innerHTML = html;
            document.body.appendChild(el);
        }
    };

    // Inject JavaScript
    document.getElementById('btn-js').onclick = () => {
        const js = prompt("Paste the JavaScript code you want to inject: ");
        if (js) {
            const script = document.createElement('script');
            script.textContent = js;
            document.body.appendChild(script);
        }
    };

    // Replace HTML
    document.getElementById('btn-replace-html').onclick = () => {
        const choice = prompt("Replace entire page or specific element? (Type 'page' or 'element')").toLowerCase();
        if (choice === 'page') {
            const newHTML = prompt("Paste the new full HTML content:");
            if (newHTML) {
                document.documentElement.innerHTML = newHTML;
            }
        } else if (choice === 'element') {
            const selector = prompt("What CSS selector do you want to replace?");
            const replacement = prompt("Paste the new HTML to replace it with:");
            if (selector && replacement) {
                const el = document.querySelector(selector);
                if (el) {
                    el.outerHTML = replacement;
                } else {
                    alert("No element matched that selector.");
                }
            }
        }
    };

    // Replace CSS
    document.getElementById('btn-css').onclick = () => {
        const css = prompt("Paste your CSS code to replace with:");
        if (css) {
            // Remove existing stylesheets
            document.querySelectorAll('link[rel="stylesheet"], style').forEach(e => e.remove());
            // Add new CSS
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }
    };

    // Text Chaos Button
    document.getElementById('btn-text-chaos').onclick = () => {
        document.querySelectorAll('*').forEach(el => {
            if (el.style) {
                el.style.fontFamily = 'Comic Sans MS';
                el.style.fontSize = `${Math.floor(Math.random() * 40 + 12)}px`;
            }
        });
    };

    // CSS Destroyer Button
    document.getElementById('btn-css-destroyer').onclick = () => {
        document.querySelectorAll('*').forEach(el => {
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            el.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
            el.style.color = 'black';
        });
    };

    // Cowify Images Button
    document.getElementById('btn-cowify').onclick = () => {
        document.querySelectorAll('img').forEach(img => {
            img.src = 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg';
        });
    };

    // Crash Browser Button
    document.getElementById('btn-crash').onclick = () => {
        if (confirm("This will likely freeze your tab. Continue?")) {
            while (true) {
                console.log("💥 Browsersploit CRASH 💥");
            }
        }
    };
    // Rainbowify Button
    document.getElementById('btn-rainbowify').onclick = () => {
        function getRandomColor() {
            return `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`;
        }

        document.querySelectorAll('*').forEach(el => {
            el.style.backgroundColor = getRandomColor();
            el.style.color = getRandomColor();
            el.style.borderColor = getRandomColor();
        });
    };

    document.getElementById('btn-remove-css').onclick = () => {
        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => el.remove());
        document.querySelectorAll('*').forEach(el => {
            el.removeAttribute('style');
            el.className = '';
        });
    };

    document.getElementById('btn-fuck-html').onclick = () => {
        [...document.body.children].forEach(el => {
            if (!el.id.includes('injector')) el.remove(); // keep Browsersploit GUI
        });
        document.body.style.background = '#ff0066';
        document.body.innerHTML += '<h1 style="color:white;text-align:center;">HTML FUCKED LOLL</h1>';
    };

    document.getElementById('btn-remove-js').onclick = () => {
        document.querySelectorAll('script').forEach(el => el.remove());
        alert("All JavaScript removed. The page may break!");
    };

    document.getElementById('btn-rotate-page').onclick = () => {
        document.body.style.transition = 'transform 2s linear';
        document.body.style.transform = 'rotate(360deg)';
    };

    document.getElementById('btn-replace-images').onclick = () => {
        const newImgUrl = prompt("Enter image URL");
        if (!newImgUrl) return; // handle cancel or empty input

        document.querySelectorAll('img').forEach(image => {
            image.src = newImgUrl;
        });
    };

})();
