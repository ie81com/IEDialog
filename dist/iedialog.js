var p = Object.defineProperty;
var m = (l, t, s) => t in l ? p(l, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[t] = s;
var n = (l, t, s) => m(l, typeof t != "symbol" ? t + "" : t, s);
const o = class o {
  constructor(t) {
    n(this, "element");
    n(this, "options");
    n(this, "closeTimer");
    n(this, "isClosing", !1);
    n(this, "isProcessing", !1);
    const s = t.type || "modal", e = t.style || "default";
    this.options = {
      ...o.defaults,
      ...o.presets[s],
      title: t.title || o.styles[e].title,
      showIcon: e !== "default",
      ...t
    }, this.init();
  }
  /**
   * 初始化弹窗
   * 创建 DOM 元素，设置样式和内容，绑定事件
   */
  init() {
    this.element = document.createElement("div"), this.element.className = this.getContainerClass(), this.element.style.zIndex = (o.zIndex++).toString();
    const t = this.options.type === "message" ? this.getMessageHtml() : this.getDialogHtml();
    this.element.innerHTML = t, this.bindEvents(), document.body.appendChild(this.element), this.handleAfterRender();
  }
  /**
   * 获取弹窗的完整 HTML
   * 包括遮罩层、头部、内容区域、底部按钮等
   */
  getDialogHtml() {
    return `
      ${this.getMaskHtml()}
      <div class="dialog-wrapper ${this.getWrapperClass()}"
           style="${this.getWrapperStyle()}">
        ${this.getHeaderHtml()}
        ${this.getContentHtml()}
        ${this.getFooterHtml()}
        ${this.getCloseButtonHtml()}
      </div>
    `;
  }
  /**
   * 获取遮罩层 HTML
   * @returns 启用遮罩层时返回遮罩层 HTML，否则返回空字符串
   */
  getMaskHtml() {
    return this.options.showMask ? '<div class="dialog-mask"></div>' : "";
  }
  /**
   * 获取弹窗包装器的类名
   * @returns 媒体类型弹窗返回 'dialog-media'，否则返回空字符串
   */
  getWrapperClass() {
    return this.options.type === "media" ? "dialog-media" : "";
  }
  /**
   * 获取弹窗头部 HTML
   * 包含标题和关闭按钮（如果启用）
   * @returns 对于媒体类型和 loading 类型返回空字符串，否则返回头部 HTML
   */
  getHeaderHtml() {
    const t = this.options.type === "media", s = this.options.type === "loading";
    return t || s ? "" : `
      <div class="dialog-header">
        <span class="dialog-title">${this.options.title}</span>
        ${this.options.showClose ? '<span class="dialog-close"></span>' : ""}
      </div>
    `;
  }
  /**
   * 获取弹窗底部 HTML
   * 包含确认和取消按钮
   * @returns 如果禁用底部按钮或是特殊类型则返回空字符串，否则返回底部按钮 HTML
   */
  getFooterHtml() {
    const t = this.options.type === "media", s = this.options.type === "loading";
    return !this.options.showFooter || t || s ? "" : `
      <div class="dialog-footer">
        <button class="dialog-btn dialog-cancel">
          ${this.options.cancelText}
        </button>
        <button class="dialog-btn dialog-confirm">
          ${this.options.confirmText}
        </button>
      </div>
    `;
  }
  /**
   * 获取关闭按钮 HTML
   * @returns 媒体类型且启用关闭按钮时返回关闭按钮 HTML，否则返回空字符串
   */
  getCloseButtonHtml() {
    return this.options.type === "media" && this.options.showClose ? '<span class="dialog-close media-close"></span>' : "";
  }
  /**
   * 获取内容区域 HTML
   * 根据弹窗类型和样式生成相应的内容
   */
  getContentHtml() {
    return `<div class="dialog-content ${this.options.style ? `dialog-${this.options.style}` : ""}">${this.getContentBody()}</div>`;
  }
  /**
   * 获取具体内容的 HTML
   * 根据不同的弹窗类型返回相应的内容结构
   * - loading: 加载动画和文本
   * - image: 图片预览，包含加载状态
   * - video: 视频播放器
   * - 默认: 图标和文本消息
   */
  getContentBody() {
    var t, s, e;
    switch (this.options.type) {
      case "loading":
        return `
                <div class="loading-spinner"></div>
                <div class="loading-text">${this.options.content}</div>
                `;
      case "media":
        if (!((t = this.options.mediaList) != null && t.length)) return "";
        const i = this.options.mediaList[this.options.currentIndex || 0], a = (((s = this.options.mediaList) == null ? void 0 : s.length) || 0) > 1;
        return `
                <div class="dialog-media-wrapper">
                    <div class="dialog-media-loading">
                        <div class="loading-icon"></div>
                        <div class="loading-text">
                            <span>加</span><span>载</span><span>中</span>
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                    ${i.type === "image" ? `
                        <img
                            src="${i.url}"
                            alt="${i.title || ""}"
                            onload="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>加载失败</text></svg>'"
                        >
                    ` : `
                        <video
                            src="${i.url}"
                            controls
                            autoplay
                            controlsList="nodownload"
                            onloadeddata="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.innerHTML='加载失败'"
                        ></video>
                    `}
                    ${a ? `
                        <div class="media-navigation">
                            <button class="media-prev" ${this.options.currentIndex === 0 ? "disabled" : ""}></button>
                            <button class="media-next" ${(this.options.currentIndex || 0) === (((e = this.options.mediaList) == null ? void 0 : e.length) || 0) - 1 ? "disabled" : ""}></button>
                        </div>
                    ` : ""}
                </div>`;
      default:
        return /<[a-z][\s\S]*>/i.test(this.options.content) ? this.options.content : `${this.options.showIcon ? '<div class="dialog-icon"></div>' : ""}<div class="dialog-message">${this.options.content}</div>`;
    }
  }
  /**
   * 处理弹窗渲染后的操作
   * - 消息类型：添加显示动画
   * - 自动关闭：设置定时器和进度条动画
   */
  handleAfterRender() {
    if (this.options.type === "message" && this.options.duration && this.options.duration > 0) {
      const t = this.element.querySelector(".message-progress");
      t && requestAnimationFrame(() => {
        t.style.setProperty("--duration", `${this.options.duration}ms`), t.classList.add("active");
      }), this.closeTimer = window.setTimeout(() => this.close(), this.options.duration), requestAnimationFrame(() => this.element.classList.add("message-show"));
    } else this.options.type === "message" && requestAnimationFrame(() => this.element.classList.add("message-show"));
  }
  getContainerClass() {
    const t = ["dialog-container"];
    return this.options.type === "message" && t.push("dialog-message-container"), this.options.type === "loading" && t.push("dialog-loading"), t.join(" ");
  }
  getWrapperStyle() {
    const t = [];
    return this.options.type === "media" ? t.push(`width: ${this.options.width || "80%"}`) : t.push(`width: ${this.options.width}`), t.join(";");
  }
  getMessageHtml() {
    return `
          <div class="message-wrapper message-${this.options.style || "info"}">
            ${this.options.showIcon ? '<span class="message-icon"></span>' : ""}
            <span class="message-content">${this.options.content}</span>
            ${this.options.showClose ? '<span class="message-close"></span>' : ""}
            ${this.options.duration && this.options.duration > 0 ? '<div class="message-progress"></div>' : ""}
          </div>
        `;
  }
  /**
   * 设置按钮加载状态
   */
  setButtonLoading(t) {
    const s = this.element.querySelector(".dialog-confirm"), e = this.element.querySelector(".dialog-cancel");
    s && (s.disabled = t, t ? s.innerHTML = `<span class="loading-dot"></span>${this.options.confirmText}` : s.textContent = this.options.confirmText || ""), e && (e.disabled = t);
  }
  bindEvents() {
    this.element.querySelectorAll(".dialog-close, .message-close").forEach((e) => {
      e.addEventListener("click", () => this.close());
    });
    const t = this.element.querySelector(".dialog-confirm");
    t && t.addEventListener("click", async () => {
      if (!this.isProcessing)
        if (this.options.onConfirm)
          try {
            this.isProcessing = !0, this.setButtonLoading(!0), await this.options.onConfirm(), this.close();
          } catch (e) {
            console.error("Dialog confirm error:", e), o.message(e instanceof Error ? e.message : "操作失败", "error");
          } finally {
            this.isProcessing = !1, this.setButtonLoading(!1);
          }
        else
          this.close();
    });
    const s = this.element.querySelector(".dialog-cancel");
    if (s && s.addEventListener("click", () => {
      var e, i;
      (i = (e = this.options).onCancel) == null || i.call(e), this.close();
    }), this.options.maskClosable) {
      const e = this.element.querySelector(".dialog-mask");
      e && e.addEventListener("click", () => this.close());
    }
    if (this.options.type === "media") {
      const e = this.element.querySelector("img, video");
      e && e.addEventListener("error", () => {
        var i, a;
        return (a = (i = this.options).onMediaError) == null ? void 0 : a.call(i);
      });
    }
    if (this.options.type === "media" && this.options.mediaList && this.options.mediaList.length > 1) {
      const e = this.element.querySelector(".media-prev"), i = this.element.querySelector(".media-next");
      e == null || e.addEventListener("click", () => {
        this.options.currentIndex === void 0 || this.options.currentIndex <= 0 || (this.options.currentIndex--, this.updateMediaContent());
      }), i == null || i.addEventListener("click", () => {
        !this.options.mediaList || this.options.currentIndex === void 0 || this.options.currentIndex >= this.options.mediaList.length - 1 || (this.options.currentIndex++, this.updateMediaContent());
      });
    }
    if (this.options.type === "media") {
      const e = this.element.querySelector("video");
      e && this.element.addEventListener("close", () => {
        e.pause();
      });
    }
  }
  updateMediaContent() {
    if (!this.options.mediaList || this.options.currentIndex === void 0) return;
    const t = this.element.querySelector(".dialog-content");
    if (t) {
      t.innerHTML = this.getContentBody();
      const e = t.querySelector("img, video");
      e && e.addEventListener("error", () => {
        var d, c;
        return (c = (d = this.options).onMediaError) == null ? void 0 : c.call(d);
      });
      const i = t.querySelector(".media-prev"), a = t.querySelector(".media-next");
      i == null || i.addEventListener("click", () => {
        this.options.currentIndex === void 0 || this.options.currentIndex <= 0 || (this.options.currentIndex--, this.updateMediaContent());
      }), a == null || a.addEventListener("click", () => {
        !this.options.mediaList || this.options.currentIndex === void 0 || this.options.currentIndex >= this.options.mediaList.length - 1 || (this.options.currentIndex++, this.updateMediaContent());
      });
      const r = t.querySelector("video");
      r && r.addEventListener("loadedmetadata", () => {
        r.play();
      });
    }
    const s = this.element.querySelector(".dialog-title");
    if (s) {
      const e = this.options.mediaList[this.options.currentIndex];
      s.textContent = e.title || "媒体预览";
    }
  }
  /**
   * 关闭弹窗
   * - 清除定时器
   * - 移除 DOM 元素
   * - 触发关闭回调
   */
  close() {
    var t, s;
    this.isClosing || !document.body.contains(this.element) || (this.isClosing = !0, this.closeTimer && clearTimeout(this.closeTimer), this.options.type === "message" ? (this.element.classList.remove("message-show"), this.element.addEventListener("transitionend", () => {
      var e, i;
      document.body.contains(this.element) && ((i = (e = this.options).onClose) == null || i.call(e), document.body.removeChild(this.element));
    })) : document.body.contains(this.element) && ((s = (t = this.options).onClose) == null || s.call(t), document.body.removeChild(this.element)));
  }
  /**
   * 统一的弹窗创建方法
   * @param options 弹窗配置选项
   * @returns Dialog 实例
   */
  static open(t) {
    return new o(t);
  }
  /**
   * 打开模态框
   * @param content 弹窗内容
   * @param options 配置选项或弹窗风格
   * @returns Dialog 实例
   */
  static modal(t, s) {
    return typeof s == "string" ? o.open({
      type: "modal",
      content: t,
      style: s
    }) : o.open({
      type: "modal",
      content: t,
      ...s
    });
  }
  /**
   * 打开消息提示
   * @param content 消息内容
   * @param options 配置选项或消息风格
   * @returns Dialog 实例
   */
  static message(t, s) {
    return typeof s == "string" ? o.open({
      type: "message",
      content: t,
      style: s,
      duration: 3e3,
      showIcon: !0
    }) : o.open({
      type: "message",
      content: t,
      duration: 3e3,
      showIcon: !0,
      ...s
    });
  }
  /**
   * 显示 loading
   * @param content loading 提示文本
   * @returns Dialog 实例
   */
  static loading(t = "加载中...") {
    return o.open({
      type: "loading",
      content: t
    });
  }
  /**
   * 打开媒体预览
   * @param mediaList 媒体列表
   * @param options 配置选项
   * @returns Dialog 实例
   */
  static media(t, s) {
    return o.open({
      type: "media",
      mediaList: t,
      content: "",
      ...s
    });
  }
  /**
   * 打开图片预览
   * @param url 图片地址
   * @param options 配置选项或标题
   */
  static image(t, s) {
    const e = typeof s == "string" ? { title: s } : s;
    return o.media([{ type: "image", url: t, title: e == null ? void 0 : e.title }], e);
  }
  /**
   * 打开视频播放
   * @param url 视频地址
   * @param options 配置选项或标题
   */
  static video(t, s) {
    const e = typeof s == "string" ? { title: s } : s;
    return o.media([{ type: "video", url: t, title: e == null ? void 0 : e.title }], e);
  }
};
n(o, "zIndex", 1e3), // 默认配置
n(o, "defaults", {
  type: "modal",
  style: "info",
  title: "提示",
  showClose: !0,
  showIcon: !1,
  confirmText: "确定",
  cancelText: "取消",
  width: "300px",
  showMask: !0,
  maskClosable: !0,
  showFooter: !0,
  duration: 3e3
}), // 预设配置
n(o, "presets", {
  modal: {
    showMask: !0,
    showClose: !0,
    showFooter: !0,
    maskClosable: !0
  },
  message: {
    showMask: !1,
    showClose: !0,
    showFooter: !1,
    maskClosable: !1
  },
  media: {
    title: "媒体预览",
    showFooter: !1,
    width: "40%",
    showClose: !0,
    maskClosable: !0,
    currentIndex: 0
  },
  loading: {
    showMask: !0,
    showClose: !1,
    showFooter: !1,
    maskClosable: !1,
    showIcon: !1
  }
}), // 风格配置
n(o, "styles", {
  default: { title: "提示" },
  info: { title: "提示" },
  success: { title: "成功" },
  warning: { title: "警告" },
  error: { title: "错误" }
});
let h = o;
export {
  h as IEDialog
};
