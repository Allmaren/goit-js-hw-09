var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var r=n("iQIUW");const l={form:document.querySelector(".form")};let i=null;function a(e,t){const o=Math.random()>.3;return new Promise(((n,r)=>{i=setTimeout((()=>{o?n({position:e,delay:t}):r({position:e,delay:t})}),t)}))}l.form.addEventListener("submit",(function(e){e.preventDefault(),clearTimeout(i);const t=({delay:delay,step:step,amount:amount}=e.target.elements);let o=Number(t.delay.value);if(t.delay.value<1||t.step.value<1||t.amount.value<1)return void r.Notify.warning("All values must be greater than zero");for(let e=1;e<=t.amount.value;e+=1)a(e,o).then((({position:e,delay:t})=>{r.Notify.success(`✅ Fulfilled promise #${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{r.Notify.failure(`❌ Rejected promise #${e} in ${t}ms`)})),o+=Number(t.step.value);e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.14d53c3b.js.map
