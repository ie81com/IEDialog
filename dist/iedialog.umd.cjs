(function(a,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(a=typeof globalThis<"u"?globalThis:a||self,o(a.IEDialog={}))})(this,function(a){"use strict";var p=Object.defineProperty;var m=(a,o,n)=>o in a?p(a,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[o]=n;var r=(a,o,n)=>m(a,typeof o!="symbol"?o+"":o,n);const n=class n{constructor(t){r(this,"element");r(this,"options");r(this,"closeTimer");r(this,"isClosing",!1);r(this,"isProcessing",!1);const s=t.type||"modal",e=t.style||"default",i=n.styles[e].title;this.options={...n.defaults,...n.presets[s],title:t.title===!1?!1:t.title||i,showIcon:e!=="default",...t},this.init()}init(){this.element=document.createElement("div"),this.element.className=this.getContainerClass(),this.element.style.zIndex=(n.zIndex++).toString();const t=this.options.type==="message"?this.getMessageHtml():this.getDialogHtml();this.element.innerHTML=t,this.bindEvents(),document.body.appendChild(this.element),this.handleAfterRender()}getDialogHtml(){return`
      ${this.getMaskHtml()}
      <div class="dialog-wrapper ${this.getWrapperClass()}"
           style="${this.getWrapperStyle()}">
        ${this.getHeaderHtml()}
        ${this.getContentHtml()}
        ${this.getFooterHtml()}
        ${this.getCloseButtonHtml()}
      </div>
    `}getMaskHtml(){return this.options.showMask?'<div class="dialog-mask"></div>':""}getWrapperClass(){return this.options.type==="media"?"dialog-media":""}getHeaderHtml(){const t=this.options.type==="media",s=this.options.type==="loading";if(t||s)return"";const e=this.options.title===!1?"":`
          <div class="dialog-header">
            <span class="dialog-title">${typeof this.options.title=="string"?this.options.title:""}</span>
          </div>
        `,i=this.options.showClose?'<span class="dialog-close"></span>':"";return`
          ${e}
          ${i}
        `}getFooterHtml(){const t=this.options.type==="media",s=this.options.type==="loading",e=this.options.type==="message";if(t||s||e)return"";const i=this.options.confirmText!==!1,l=this.options.cancelText!==!1;return!i&&!l?"":`
      <div class="dialog-footer">
        ${l?`
          <button class="dialog-btn dialog-cancel">
            ${this.options.cancelText||n.defaults.cancelText}
          </button>
        `:""}
        ${i?`
          <button class="dialog-btn dialog-confirm">
            ${this.options.confirmText||n.defaults.confirmText}
          </button>
        `:""}
      </div>
    `}getCloseButtonHtml(){return this.options.type==="media"&&this.options.showClose?'<span class="dialog-close media-close"></span>':""}getContentHtml(){return`<div class="dialog-content ${this.options.style?`dialog-${this.options.style}`:""}">${this.getContentBody()}</div>`}getContentBody(){var t,s,e;switch(this.options.type){case"loading":return`
                <div class="loading-spinner"></div>
                <div class="loading-text">${this.options.content}</div>
                `;case"media":if(!((t=this.options.mediaList)!=null&&t.length))return"";const i=this.options.mediaList[this.options.currentIndex||0],l=(((s=this.options.mediaList)==null?void 0:s.length)||0)>1;return`
                <div class="dialog-media-wrapper">
                    <div class="dialog-media-loading">
                        <div class="loading-icon"></div>
                        <div class="loading-text">
                            <span>加</span><span>载</span><span>中</span>
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                    ${i.type==="image"?`
                        <img
                            src="${i.url}"
                            alt="${i.title||""}"
                            onload="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>加载失败</text></svg>'"
                        >
                    `:`
                        <video
                            src="${i.url}"
                            controls
                            autoplay
                            controlsList="nodownload"
                            onloadeddata="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.innerHTML='加载失败'"
                        ></video>
                    `}
                    ${l?`
                        <div class="media-navigation">
                            <button class="media-prev" ${this.options.currentIndex===0?"disabled":""}></button>
                            <button class="media-next" ${(this.options.currentIndex||0)===(((e=this.options.mediaList)==null?void 0:e.length)||0)-1?"disabled":""}></button>
                        </div>
                    `:""}
                </div>`;default:return`${this.options.showIcon?'<div class="dialog-icon"></div>':""}<div class="dialog-message">${this.options.content}</div>`}}handleAfterRender(){if(this.options.type==="message"&&this.options.duration&&this.options.duration>0){const t=this.element.querySelector(".message-progress");t&&requestAnimationFrame(()=>{t.style.setProperty("--duration",`${this.options.duration}ms`),t.classList.add("active")}),this.closeTimer=window.setTimeout(()=>this.close(),this.options.duration),requestAnimationFrame(()=>this.element.classList.add("message-show"))}else this.options.type==="message"&&requestAnimationFrame(()=>this.element.classList.add("message-show"))}getContainerClass(){const t=["dialog-container"];return this.options.type==="message"&&t.push("dialog-message-container"),this.options.type==="loading"&&t.push("dialog-loading"),t.join(" ")}getWrapperStyle(){const t=[];return this.options.type==="media"?t.push(`width: ${this.options.width||"80%"}`):t.push(`width: ${this.options.width}`),t.join(";")}getMessageHtml(){return`
          <div class="message-wrapper message-${this.options.style||"info"}">
            ${this.options.showIcon?'<span class="message-icon"></span>':""}
            <span class="message-content">${this.options.content}</span>
            ${this.options.showClose?'<span class="message-close"></span>':""}
            ${this.options.duration&&this.options.duration>0?'<div class="message-progress"></div>':""}
          </div>
        `}setButtonLoading(t){const s=this.element.querySelector(".dialog-confirm"),e=this.element.querySelector(".dialog-cancel");s&&(s.disabled=t,t?s.innerHTML=`<span class="loading-dot"></span>${this.options.confirmText}`:s.textContent=this.options.confirmText||""),e&&(e.disabled=t)}bindEvents(){this.element.querySelectorAll(".dialog-close, .message-close").forEach(e=>{e.addEventListener("click",()=>this.close())});const t=this.element.querySelector(".dialog-confirm");t&&t.addEventListener("click",async()=>{if(!this.isProcessing)if(this.options.onConfirm)try{this.isProcessing=!0,this.setButtonLoading(!0),await this.options.onConfirm(),this.close()}catch(e){console.error("Dialog confirm error:",e),n.message(e instanceof Error?e.message:"操作失败","error")}finally{this.isProcessing=!1,this.setButtonLoading(!1)}else this.close()});const s=this.element.querySelector(".dialog-cancel");if(s&&s.addEventListener("click",()=>{var e,i;(i=(e=this.options).onCancel)==null||i.call(e),this.close()}),this.options.maskClosable){const e=this.element.querySelector(".dialog-mask");e&&e.addEventListener("click",()=>this.close())}if(this.options.type==="media"){const e=this.element.querySelector("img, video");e&&e.addEventListener("error",()=>{var i,l;return(l=(i=this.options).onMediaError)==null?void 0:l.call(i)})}if(this.options.type==="media"&&this.options.mediaList&&this.options.mediaList.length>1){const e=this.element.querySelector(".media-prev"),i=this.element.querySelector(".media-next");e==null||e.addEventListener("click",()=>{this.options.currentIndex===void 0||this.options.currentIndex<=0||(this.options.currentIndex--,this.updateMediaContent())}),i==null||i.addEventListener("click",()=>{!this.options.mediaList||this.options.currentIndex===void 0||this.options.currentIndex>=this.options.mediaList.length-1||(this.options.currentIndex++,this.updateMediaContent())})}if(this.options.type==="media"){const e=this.element.querySelector("video");e&&this.element.addEventListener("close",()=>{e.pause()})}}updateMediaContent(){if(!this.options.mediaList||this.options.currentIndex===void 0)return;const t=this.element.querySelector(".dialog-content");if(t){t.innerHTML=this.getContentBody();const e=t.querySelector("img, video");e&&e.addEventListener("error",()=>{var c,h;return(h=(c=this.options).onMediaError)==null?void 0:h.call(c)});const i=t.querySelector(".media-prev"),l=t.querySelector(".media-next");i==null||i.addEventListener("click",()=>{this.options.currentIndex===void 0||this.options.currentIndex<=0||(this.options.currentIndex--,this.updateMediaContent())}),l==null||l.addEventListener("click",()=>{!this.options.mediaList||this.options.currentIndex===void 0||this.options.currentIndex>=this.options.mediaList.length-1||(this.options.currentIndex++,this.updateMediaContent())});const d=t.querySelector("video");d&&d.addEventListener("loadedmetadata",()=>{d.play()})}const s=this.element.querySelector(".dialog-title");if(s){const e=this.options.mediaList[this.options.currentIndex];s.textContent=e.title||"媒体预览"}}close(){var t,s;this.isClosing||!document.body.contains(this.element)||(this.isClosing=!0,this.closeTimer&&clearTimeout(this.closeTimer),this.options.type==="message"?(this.element.classList.remove("message-show"),this.element.addEventListener("transitionend",()=>{var e,i;document.body.contains(this.element)&&((i=(e=this.options).onClose)==null||i.call(e),document.body.removeChild(this.element))})):document.body.contains(this.element)&&((s=(t=this.options).onClose)==null||s.call(t),document.body.removeChild(this.element)))}static open(t){return new n(t)}static modal(t,s){return typeof s=="string"?n.open({type:"modal",content:t,style:s}):n.open({type:"modal",content:t,...s})}static message(t,s){return typeof s=="string"?n.open({type:"message",content:t,style:s,duration:3e3,showIcon:!0}):n.open({type:"message",content:t,duration:3e3,showIcon:!0,...s})}static loading(t="加载中..."){return n.open({type:"loading",content:t})}static media(t,s){return n.open({type:"media",mediaList:t,content:"",...s})}static image(t,s){const e=typeof s=="string"?{title:s}:s,i=typeof(e==null?void 0:e.title)=="string"?e.title:void 0;return n.media([{type:"image",url:t,title:i}],e)}static video(t,s){const e=typeof s=="string"?{title:s}:s,i=typeof(e==null?void 0:e.title)=="string"?e.title:void 0;return n.media([{type:"video",url:t,title:i}],e)}};r(n,"zIndex",1e3),r(n,"defaults",{type:"modal",style:"info",title:"提示",showClose:!0,showIcon:!1,confirmText:"确定",cancelText:"取消",width:"300px",showMask:!0,maskClosable:!0,duration:3e3}),r(n,"presets",{modal:{showMask:!0,showClose:!0,maskClosable:!0},message:{showMask:!1,showClose:!0,maskClosable:!1},media:{title:"媒体预览",width:"40%",showClose:!0,maskClosable:!0,currentIndex:0},loading:{showMask:!0,showClose:!1,showIcon:!1}}),r(n,"styles",{default:{title:"提示"},info:{title:"提示"},success:{title:"成功"},warning:{title:"警告"},error:{title:"错误"}});let o=n;a.IEDialog=o,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
