!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var r=t("h6c0i");function i(e,n){return new Promise((function(o,t){setTimeout((function(){Math.random()>.3?o({position:e,delay:n}):t({position:e,delay:n})}),n)}))}formRef=document.querySelector(".form"),formRef.addEventListener("submit",(function(e){e.preventDefault();for(var n=e.currentTarget.elements,o=Number(n.delay.value),t=Number(n.step.value),a=Number(n.amount.value),u=o,f=1;f<=a;f+=1)i(f,u).then((function(e){var n=e.position,o=e.delay;r.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;r.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))})),formRef.reset(),u+=t}))}();
//# sourceMappingURL=03-promises.fe345bf8.js.map