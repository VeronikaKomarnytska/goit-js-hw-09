const t={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.startButton.addEventListener("click",(()=>{e.start()})),t.stopButton.addEventListener("click",(()=>{e.stop()}));const e={start(){t.startButton.setAttribute("disabled",!0),t.stopButton.removeAttribute("disabled");Date.now();this.timerId=setInterval((()=>{Date.now();t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)},stop(){clearInterval(this.timerId),this.isActive=!1,t.startButton.removeAttribute("disabled"),t.stopButton.setAttribute("disabled",!0)}};
//# sourceMappingURL=01-color-switcher.5cce6721.js.map
