(function(a,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(a=typeof globalThis<"u"?globalThis:a||self,n(a.IEDialog={}))})(this,function(a){"use strict";var p=Object.defineProperty;var m=(a,n,i)=>n in a?p(a,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[n]=i;var l=(a,n,i)=>m(a,typeof n!="symbol"?n+"":n,i);const i=class i{constructor(t){l(this,"element");l(this,"options");l(this,"closeTimer");l(this,"isClosing",!1);l(this,"isProcessing",!1);const s=t.type||"modal",e=t.style||"default";this.options={...i.defaults,...i.presets[s],title:t.title||i.styles[e].title,showIcon:e!=="default",...t},this.init()}init(){this.element=document.createElement("div"),this.element.className=this.getContainerClass(),this.element.style.zIndex=(i.zIndex++).toString();const t=this.options.type==="message"?this.getMessageHtml():this.getDialogHtml();this.element.innerHTML=t,this.bindEvents(),document.body.appendChild(this.element),this.handleAfterRender()}getDialogHtml(){return`
      ${this.getMaskHtml()}
      <div class="dialog-wrapper ${this.getWrapperClass()}"
           style="${this.getWrapperStyle()}">
        ${this.getHeaderHtml()}
        ${this.getContentHtml()}
        ${this.getFooterHtml()}
        ${this.getCloseButtonHtml()}
      </div>
    `}getMaskHtml(){return this.options.showMask?'<div class="dialog-mask"></div>':""}getWrapperClass(){return this.options.type==="media"?"dialog-media":""}getHeaderHtml(){const t=this.options.type==="media",s=this.options.type==="loading";return t||s?"":`
      <div class="dialog-header">
        <span class="dialog-title">${this.options.title}</span>
        ${this.options.showClose?'<span class="dialog-close"></span>':""}
      </div>
    `}getFooterHtml(){const t=this.options.type==="media",s=this.options.type==="loading";return!this.options.showFooter||t||s?"":`
      <div class="dialog-footer">
        <button class="dialog-btn dialog-cancel">
          ${this.options.cancelText}
        </button>
        <button class="dialog-btn dialog-confirm">
          ${this.options.confirmText}
        </button>
      </div>
    `}getCloseButtonHtml(){return this.options.type==="media"&&this.options.showClose?'<span class="dialog-close media-close"></span>':""}getContentHtml(){return`<div class="dialog-content ${this.options.style?`dialog-${this.options.style}`:""}">${this.getContentBody()}</div>`}getContentBody(){var t,s,e;switch(this.options.type){case"loading":return`
                <div class="loading-spinner"></div>
                <div class="loading-text">${this.options.content}</div>
                `;case"media":if(!((t=this.options.mediaList)!=null&&t.length))return"";const o=this.options.mediaList[this.options.currentIndex||0],r=(((s=this.options.mediaList)==null?void 0:s.length)||0)>1;return`
                <div class="dialog-media-wrapper">
                    <div class="dialog-media-loading">
                        <div class="loading-icon"></div>
                        <div class="loading-text">
                            <span>加</span><span>载</span><span>中</span>
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                    ${o.type==="image"?`
                        <img
                            src="${o.url}"
                            alt="${o.title||""}"
                            onload="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>加载失败</text></svg>'"
                        >
                    `:`
                        <video
                            src="${o.url}"
                            controls
                            autoplay
                            controlsList="nodownload"
                            onloadeddata="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.innerHTML='加载失败'"
                        ></video>
                    `}
                    ${r?`
                        <div class="media-navigation">
                            <button class="media-prev" ${this.options.currentIndex===0?"disabled":""}></button>
                            <button class="media-next" ${(this.options.currentIndex||0)===(((e=this.options.mediaList)==null?void 0:e.length)||0)-1?"disabled":""}></button>
                        </div>
                    `:""}
                </div>`;default:return/<[a-z][\s\S]*>/i.test(this.options.content)?this.options.content:`${this.options.showIcon?'<div class="dialog-icon"></div>':""}<div class="dialog-message">${this.options.content}</div>`}}handleAfterRender(){if(this.options.type==="message"&&this.options.duration&&this.options.duration>0){const t=this.element.querySelector(".message-progress");t&&requestAnimationFrame(()=>{t.style.setProperty("--duration",`${this.options.duration}ms`),t.classList.add("active")}),this.closeTimer=window.setTimeout(()=>this.close(),this.options.duration),requestAnimationFrame(()=>this.element.classList.add("message-show"))}else this.options.type==="message"&&requestAnimationFrame(()=>this.element.classList.add("message-show"))}getContainerClass(){const t=["dialog-container"];return this.options.type==="message"&&t.push("dialog-message-container"),this.options.type==="loading"&&t.push("dialog-loading"),t.join(" ")}getWrapperStyle(){const t=[];return this.options.type==="media"?t.push(`width: ${this.options.width||"80%"}`):t.push(`width: ${this.options.width}`),t.join(";")}getMessageHtml(){return`
          <div class="message-wrapper message-${this.options.style||"info"}">
            ${this.options.showIcon?'<span class="message-icon"></span>':""}
            <span class="message-content">${this.options.content}</span>
            ${this.options.showClose?'<span class="message-close"></span>':""}
            ${this.options.duration&&this.options.duration>0?'<div class="message-progress"></div>':""}
          </div>
        `}setButtonLoading(t){const s=this.element.querySelector(".dialog-confirm"),e=this.element.querySelector(".dialog-cancel");s&&(s.disabled=t,t?s.innerHTML=`<span class="loading-dot"></span>${this.options.confirmText}`:s.textContent=this.options.confirmText||""),e&&(e.disabled=t)}bindEvents(){this.element.querySelectorAll(".dialog-close, .message-close").forEach(e=>{e.addEventListener("click",()=>this.close())});const t=this.element.querySelector(".dialog-confirm");t&&t.addEventListener("click",async()=>{if(!this.isProcessing)if(this.options.onConfirm)try{this.isProcessing=!0,this.setButtonLoading(!0),await this.options.onConfirm(),this.close()}catch(e){console.error("Dialog confirm error:",e),i.message(e instanceof Error?e.message:"操作失败","error")}finally{this.isProcessing=!1,this.setButtonLoading(!1)}else this.close()});const s=this.element.querySelector(".dialog-cancel");if(s&&s.addEventListener("click",()=>{var e,o;(o=(e=this.options).onCancel)==null||o.call(e),this.close()}),this.options.maskClosable){const e=this.element.querySelector(".dialog-mask");e&&e.addEventListener("click",()=>this.close())}if(this.options.type==="media"){const e=this.element.querySelector("img, video");e&&e.addEventListener("error",()=>{var o,r;return(r=(o=this.options).onMediaError)==null?void 0:r.call(o)})}if(this.options.type==="media"&&this.options.mediaList&&this.options.mediaList.length>1){const e=this.element.querySelector(".media-prev"),o=this.element.querySelector(".media-next");e==null||e.addEventListener("click",()=>{this.options.currentIndex===void 0||this.options.currentIndex<=0||(this.options.currentIndex--,this.updateMediaContent())}),o==null||o.addEventListener("click",()=>{!this.options.mediaList||this.options.currentIndex===void 0||this.options.currentIndex>=this.options.mediaList.length-1||(this.options.currentIndex++,this.updateMediaContent())})}if(this.options.type==="media"){const e=this.element.querySelector("video");e&&this.element.addEventListener("close",()=>{e.pause()})}}updateMediaContent(){if(!this.options.mediaList||this.options.currentIndex===void 0)return;const t=this.element.querySelector(".dialog-content");if(t){t.innerHTML=this.getContentBody();const e=t.querySelector("img, video");e&&e.addEventListener("error",()=>{var c,h;return(h=(c=this.options).onMediaError)==null?void 0:h.call(c)});const o=t.querySelector(".media-prev"),r=t.querySelector(".media-next");o==null||o.addEventListener("click",()=>{this.options.currentIndex===void 0||this.options.currentIndex<=0||(this.options.currentIndex--,this.updateMediaContent())}),r==null||r.addEventListener("click",()=>{!this.options.mediaList||this.options.currentIndex===void 0||this.options.currentIndex>=this.options.mediaList.length-1||(this.options.currentIndex++,this.updateMediaContent())});const d=t.querySelector("video");d&&d.addEventListener("loadedmetadata",()=>{d.play()})}const s=this.element.querySelector(".dialog-title");if(s){const e=this.options.mediaList[this.options.currentIndex];s.textContent=e.title||"媒体预览"}}close(){var t,s;this.isClosing||!document.body.contains(this.element)||(this.isClosing=!0,this.closeTimer&&clearTimeout(this.closeTimer),this.options.type==="message"?(this.element.classList.remove("message-show"),this.element.addEventListener("transitionend",()=>{var e,o;document.body.contains(this.element)&&((o=(e=this.options).onClose)==null||o.call(e),document.body.removeChild(this.element))})):document.body.contains(this.element)&&((s=(t=this.options).onClose)==null||s.call(t),document.body.removeChild(this.element)))}static open(t){return new i(t)}static modal(t,s){return typeof s=="string"?i.open({type:"modal",content:t,style:s}):i.open({type:"modal",content:t,...s})}static message(t,s){return typeof s=="string"?i.open({type:"message",content:t,style:s,duration:3e3,showIcon:!0}):i.open({type:"message",content:t,duration:3e3,showIcon:!0,...s})}static loading(t="加载中..."){return i.open({type:"loading",content:t})}static media(t,s){return i.open({type:"media",mediaList:t,content:"",...s})}static image(t,s){const e=typeof s=="string"?{title:s}:s;return i.media([{type:"image",url:t,title:e==null?void 0:e.title}],e)}static video(t,s){const e=typeof s=="string"?{title:s}:s;return i.media([{type:"video",url:t,title:e==null?void 0:e.title}],e)}};l(i,"zIndex",1e3),l(i,"defaults",{type:"modal",style:"info",title:"提示",showClose:!0,showIcon:!1,confirmText:"确定",cancelText:"取消",width:"300px",showMask:!0,maskClosable:!0,showFooter:!0,duration:3e3}),l(i,"presets",{modal:{showMask:!0,showClose:!0,showFooter:!0,maskClosable:!0},message:{showMask:!1,showClose:!0,showFooter:!1,maskClosable:!1},media:{title:"媒体预览",showFooter:!1,width:"40%",showClose:!0,maskClosable:!0,currentIndex:0},loading:{showMask:!0,showClose:!1,showFooter:!1,maskClosable:!1,showIcon:!1}}),l(i,"styles",{default:{title:"提示"},info:{title:"提示"},success:{title:"成功"},warning:{title:"警告"},error:{title:"错误"}});let n=i;a.IEDialog=n,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
