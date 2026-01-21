import "./IEDialog.scss";

/** 弹窗类型 */
type DialogType = 'modal' | 'message' | 'media' | 'loading';

/** 弹窗风格 */
type DialogStyle = 'default' | 'info' | 'success' | 'warning' | 'error';

/** 媒体类型 */
type MediaType = 'image' | 'video';

/** 媒体项 */
interface MediaItem {
    /** 媒体类型 */
    type: MediaType;
    /** 媒体URL */
    url: string;
    /** 媒体标题 */
    title?: string;
}

/**
 * 弹窗配置选项接口
 */
interface DialogOptions {
    /** 弹窗类型 */
    type?: DialogType;
    /** 弹窗风格 */
    style?: DialogStyle;
    /** 弹窗标题，设置为 false 时不显示标题栏 */
    title?: string | false;
    /** 弹窗内容 */
    content: string;
    /** 是否显示关闭按钮 */
    showClose?: boolean;
    /** 确认按钮文本，设置为 false 时不显示按钮 */
    confirmText?: string | false;
    /** 取消按钮文本，设置为 false 时不显示按钮 */
    cancelText?: string | false;
    /** 弹窗宽度 */
    width?: string;
    /** 是否显示遮罩层 */
    showMask?: boolean;
    /** 点击遮罩层是否关闭 */
    maskClosable?: boolean;
    /** 确认回调 */
    onConfirm?: () => void | Promise<void>;
    /** 取消回调 */
    onCancel?: () => void;
    /** 关闭回调 */
    onClose?: () => void;
    /** 媒体列表 */
    mediaList?: MediaItem[];
    /** 当前媒体索引 */
    currentIndex?: number;
    /** 媒体加载错误回调 */
    onMediaError?: () => void;
    /** 消息框自动关闭时间（毫秒） */
    duration?: number;
    /** 是否显示图标 */
    showIcon?: boolean;
}

/**
 * Dialog 弹窗组件类
 * 提供模态框、消息提示、图片预览、视频播放等功能
 */
export class IEDialog {
    private element!: HTMLElement;
    private options: DialogOptions;
    private static zIndex: number = 1000;
    private closeTimer?: number;
    private isClosing: boolean = false;
    private isProcessing: boolean = false;

    // 默认配置
    private static readonly defaults: Partial<DialogOptions> = {
        type: "modal",
        style: "info",
        title: "提示",
        showClose: true,
        showIcon: false,
        confirmText: "确定",
        cancelText: "取消",
        width: "300px",
        showMask: true,
        maskClosable: true,
        duration: 3000,
    };

    // 预设配置
    private static readonly presets: Record<DialogType, Partial<DialogOptions>> = {
        modal: {
            showMask: true,
            showClose: true,
            maskClosable: true,
        },
        message: {
            showMask: false,
            showClose: true,
            maskClosable: false,
        },
        media: {
            title: "媒体预览",
            width: "40%",
            showClose: true,
            maskClosable: true,
            currentIndex: 0,
        },
        loading: {
            showMask: true,
            showClose: false,
            showIcon: false,
        },
    };

    // 风格配置
    private static readonly styles: Record<DialogStyle, { title: string }> = {
        default: { title: "提示" },
        info: { title: "提示" },
        success: { title: "成功" },
        warning: { title: "警告" },
        error: { title: "错误" },
    };

    constructor(options: DialogOptions) {
        const type = options.type || "modal";
        const style = options.style || "default";
        const defaultTitle = IEDialog.styles[style].title;

        this.options = {
            ...IEDialog.defaults,
            ...IEDialog.presets[type],
            title: options.title === false ? false : (options.title || defaultTitle),
            showIcon: style !== 'default',
            ...options,
        };
        this.init();
    }

    /**
     * 初始化弹窗
     * 创建 DOM 元素，设置样式和内容，绑定事件
     */
    private init(): void {
        this.element = document.createElement("div");
        this.element.className = this.getContainerClass();
        this.element.style.zIndex = (IEDialog.zIndex++).toString();

        const html = this.options.type === "message" ? this.getMessageHtml() : this.getDialogHtml();

        this.element.innerHTML = html;
        this.bindEvents();
        document.body.appendChild(this.element);

        this.handleAfterRender();
    }

    /**
     * 获取弹窗的完整 HTML
     * 包括遮罩层、头部、内容区域、底部按钮等
     */
    private getDialogHtml(): string {
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
    private getMaskHtml(): string {
        return this.options.showMask ? '<div class="dialog-mask"></div>' : "";
    }

    /**
     * 获取弹窗包装器的类名
     * @returns 媒体类型弹窗返回 'dialog-media'，否则返回空字符串
     */
    private getWrapperClass(): string {
        const isMediaDialog = this.options.type === "media";
        return isMediaDialog ? "dialog-media" : "";
    }

    /**
     * 获取弹窗头部 HTML
     * 包含标题和关闭按钮（如果启用）
     * @returns 对于媒体类型、loading类型时返回空字符串，否则返回头部 HTML
     */
    private getHeaderHtml(): string {
        const isMediaDialog = this.options.type === "media";
        const isLoading = this.options.type === "loading";

        // 特殊类型不显示头部
        if (isMediaDialog || isLoading) return "";

        const titleHtml = this.options.title === false ? "" : `
          <div class="dialog-header">
            <span class="dialog-title">${typeof this.options.title === 'string' ? this.options.title : ''}</span>
          </div>
        `;

        const closeHtml = this.options.showClose ? '<span class="dialog-close"></span>' : "";

        return `
          ${titleHtml}
          ${closeHtml}
        `;
    }

    /**
     * 获取弹窗底部 HTML
     * 包含确认和取消按钮
     * @returns 如果是特殊类型或没有按钮需要显示则返回空字符串，否则返回底部按钮 HTML
     */
    private getFooterHtml(): string {
        const isMediaDialog = this.options.type === "media";
        const isLoading = this.options.type === "loading";
        const isMessage = this.options.type === "message";

        // 特殊类型的弹窗不显示底部按钮
        if (isMediaDialog || isLoading || isMessage) return "";

        const showConfirm = this.options.confirmText !== false;
        const showCancel = this.options.cancelText !== false;

        // 如果两个按钮都不显示，则不显示底部区域
        if (!showConfirm && !showCancel) return "";

        return `
      <div class="dialog-footer">
        ${showCancel ? `
          <button class="dialog-btn dialog-cancel">
            ${this.options.cancelText || IEDialog.defaults.cancelText}
          </button>
        ` : ''}
        ${showConfirm ? `
          <button class="dialog-btn dialog-confirm">
            ${this.options.confirmText || IEDialog.defaults.confirmText}
          </button>
        ` : ''}
      </div>
    `;
    }

    /**
     * 获取关闭按钮 HTML
     * @returns 媒体类型且启用关闭按钮时返回关闭按钮 HTML，否则返回空字符串
     */
    private getCloseButtonHtml(): string {
        const isMediaDialog = this.options.type === "media";
        return isMediaDialog && this.options.showClose ? '<span class="dialog-close media-close"></span>' : "";
    }

    /**
     * 获取内容区域 HTML
     * 根据弹窗类型和样式生成相应的内容
     */
    private getContentHtml(): string {
        const contentClass = this.options.style ? `dialog-${this.options.style}` : "";
        return `<div class="dialog-content ${contentClass}">${this.getContentBody()}</div>`;
    }

    /**
     * 获取具体内容的 HTML
     * 根据不同的弹窗类型返回相应的内容结构
     * - loading: 加载动画和文本
     * - image: 图片预览，包含加载状态
     * - video: 视频播放器
     * - 默认: 图标和文本消息
     */
    private getContentBody(): string {
        switch (this.options.type) {
            case "loading":
                return `
                <div class="loading-spinner"></div>
                <div class="loading-text">${this.options.content}</div>
                `;
            case "media":
                if (!this.options.mediaList?.length) return '';
                const currentMedia = this.options.mediaList[this.options.currentIndex || 0];
                const showNavigation = (this.options.mediaList?.length || 0) > 1;

                return `
                <div class="dialog-media-wrapper">
                    <div class="dialog-media-loading">
                        <div class="loading-icon"></div>
                        <div class="loading-text">
                            <span>加</span><span>载</span><span>中</span>
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                    ${currentMedia.type === 'image' ? `
                        <img
                            src="${currentMedia.url}"
                            alt="${currentMedia.title || ''}"
                            onload="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>加载失败</text></svg>'"
                        >
                    ` : `
                        <video
                            src="${currentMedia.url}"
                            controls
                            autoplay
                            controlsList="nodownload"
                            onloadeddata="this.parentElement.classList.add('loaded')"
                            onerror="this.onerror=null;this.parentElement.classList.add('error');this.innerHTML='加载失败'"
                        ></video>
                    `}
                    ${showNavigation ? `
                        <div class="media-navigation">
                            <button class="media-prev" ${this.options.currentIndex === 0 ? 'disabled' : ''}></button>
                            <button class="media-next" ${(this.options.currentIndex || 0) === (this.options.mediaList?.length || 0) - 1 ? 'disabled' : ''}></button>
                        </div>
                    ` : ''}
                </div>`;
            default:
                // 无论是HTML还是纯文本，都统一处理，让innerHTML自动解析HTML
                return `${this.options.showIcon ? `<div class="dialog-icon"></div>` : ""}<div class="dialog-message">${this.options.content}</div>`;
        }
    }

    /**
     * 处理弹窗渲染后的操作
     * - 消息类型：添加显示动画
     * - 自动关闭：设置定时器和进度条动画
     */
    private handleAfterRender(): void {
        if (this.options.type === "message" && this.options.duration && this.options.duration > 0) {
            // 添加进度条动画
            const progressBar = this.element.querySelector(".message-progress") as HTMLElement;
            if (progressBar) {
                requestAnimationFrame(() => {
                    progressBar.style.setProperty("--duration", `${this.options.duration}ms`);
                    progressBar.classList.add("active");
                });
            }
            this.closeTimer = window.setTimeout(() => this.close(), this.options.duration);
            requestAnimationFrame(() => this.element.classList.add("message-show"));
        } else if (this.options.type === "message") {
            requestAnimationFrame(() => this.element.classList.add("message-show"));
        }
    }

    private getContainerClass(): string {
        const classes = ["dialog-container"];
        if (this.options.type === "message") {
            classes.push("dialog-message-container");
        }
        if (this.options.type === "loading") {
            classes.push("dialog-loading");
        }
        return classes.join(" ");
    }

    private getWrapperStyle(): string {
        const styles: string[] = [];
        const isMediaDialog = this.options.type === "media";

        if (isMediaDialog) {
            styles.push(`width: ${this.options.width || "80%"}`);
        } else {
            styles.push(`width: ${this.options.width}`);
        }

        return styles.join(";");
    }

    private getMessageHtml(): string {
        const style = this.options.style || "info";
        return `
          <div class="message-wrapper message-${style}">
            ${this.options.showIcon ? `<span class="message-icon"></span>` : ""}
            <span class="message-content">${this.options.content}</span>
            ${this.options.showClose ? '<span class="message-close"></span>' : ""}
            ${this.options.duration && this.options.duration > 0 ? '<div class="message-progress"></div>' : ""}
          </div>
        `;
    }

    /**
     * 设置按钮加载状态
     */
    private setButtonLoading(loading: boolean): void {
        const confirmBtn = this.element.querySelector(".dialog-confirm") as HTMLButtonElement;
        const cancelBtn = this.element.querySelector(".dialog-cancel") as HTMLButtonElement;

        if (confirmBtn) {
            confirmBtn.disabled = loading;
            if (loading) {
                confirmBtn.innerHTML = `<span class="loading-dot"></span>${this.options.confirmText}`;
            } else {
                confirmBtn.textContent = this.options.confirmText || "";
            }
        }
        if (cancelBtn) {
            cancelBtn.disabled = loading;
        }
    }

    private bindEvents(): void {
        // 关闭按钮事件
        this.element.querySelectorAll(".dialog-close, .message-close").forEach((btn) => {
            btn.addEventListener("click", () => this.close());
        });

        // 确认按钮事件
        const confirmBtn = this.element.querySelector(".dialog-confirm");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", async () => {
                if (this.isProcessing) return;

                if (this.options.onConfirm) {
                    try {
                        this.isProcessing = true;
                        this.setButtonLoading(true);

                        await this.options.onConfirm();
                        this.close();
                    } catch (error) {
                        console.error('Dialog confirm error:', error);
                        IEDialog.message(error instanceof Error ? error.message : "操作失败", "error");
                    } finally {
                        this.isProcessing = false;
                        this.setButtonLoading(false);
                    }
                } else {
                    this.close();
                }
            });
        }

        // 取消按钮事件
        const cancelBtn = this.element.querySelector(".dialog-cancel");
        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => {
                this.options.onCancel?.();
                this.close();
            });
        }

        // 遮罩层点击事件
        if (this.options.maskClosable) {
            const mask = this.element.querySelector(".dialog-mask");
            if (mask) {
                mask.addEventListener("click", () => this.close());
            }
        }

        // 媒体加载错误事件
        if (this.options.type === "media") {
            const mediaElement = this.element.querySelector("img, video");
            if (mediaElement) {
                mediaElement.addEventListener("error", () => this.options.onMediaError?.());
            }
        }

        // 媒体导航事件
        if (this.options.type === "media" && this.options.mediaList && this.options.mediaList.length > 1) {
            const prevBtn = this.element.querySelector(".media-prev");
            const nextBtn = this.element.querySelector(".media-next");

            prevBtn?.addEventListener("click", () => {
                if (this.options.currentIndex === undefined || this.options.currentIndex <= 0) return;
                this.options.currentIndex--;
                this.updateMediaContent();
            });

            nextBtn?.addEventListener("click", () => {
                if (!this.options.mediaList || this.options.currentIndex === undefined ||
                    this.options.currentIndex >= this.options.mediaList.length - 1) return;
                this.options.currentIndex++;
                this.updateMediaContent();
            });
        }

        // 视频关闭时停止播放
        if (this.options.type === "media") {
            const video = this.element.querySelector("video");
            if (video) {
                this.element.addEventListener("close", () => {
                    video.pause();
                });
            }
        }
    }

    private updateMediaContent(): void {
        if (!this.options.mediaList || this.options.currentIndex === undefined) return;

        const contentElement = this.element.querySelector(".dialog-content");
        if (contentElement) {
            contentElement.innerHTML = this.getContentBody();

            // 重新绑定媒体相关事件
            const mediaElement = contentElement.querySelector("img, video");
            if (mediaElement) {
                mediaElement.addEventListener("error", () => this.options.onMediaError?.());
            }

            // 重新绑定导航按钮事件
            const prevBtn = contentElement.querySelector(".media-prev");
            const nextBtn = contentElement.querySelector(".media-next");

            prevBtn?.addEventListener("click", () => {
                if (this.options.currentIndex === undefined || this.options.currentIndex <= 0) return;
                this.options.currentIndex--;
                this.updateMediaContent();
            });

            nextBtn?.addEventListener("click", () => {
                if (!this.options.mediaList || this.options.currentIndex === undefined ||
                    this.options.currentIndex >= this.options.mediaList.length - 1) return;
                this.options.currentIndex++;
                this.updateMediaContent();
            });

            // 视频自动播放和暂停处理
            const video = contentElement.querySelector("video");
            if (video) {
                video.addEventListener("loadedmetadata", () => {
                    video.play();
                });
            }
        }

        // 更新标题
        const titleElement = this.element.querySelector(".dialog-title");
        if (titleElement) {
            const currentMedia = this.options.mediaList[this.options.currentIndex];
            titleElement.textContent = currentMedia.title || "媒体预览";
        }
    }

    /**
     * 关闭弹窗
     * - 清除定时器
     * - 移除 DOM 元素
     * - 触发关闭回调
     */
    public close(): void {
        if (this.isClosing || !document.body.contains(this.element)) {
            return;
        }

        this.isClosing = true;

        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }

        if (this.options.type === "message") {
            this.element.classList.remove("message-show");
            this.element.addEventListener("transitionend", () => {
                if (document.body.contains(this.element)) {
                    this.options.onClose?.();
                    document.body.removeChild(this.element);
                }
            });
        } else {
            if (document.body.contains(this.element)) {
                this.options.onClose?.();
                document.body.removeChild(this.element);
            }
        }
    }

    /**
     * 统一的弹窗创建方法
     * @param options 弹窗配置选项
     * @returns Dialog 实例
     */
    public static open(options: DialogOptions): IEDialog {
        return new IEDialog(options);
    }

    /**
     * 打开模态框
     * @param content 弹窗内容
     * @param options 配置选项或弹窗风格
     * @returns Dialog 实例
     */
    public static modal(content: string, options?: Partial<Omit<DialogOptions, 'type' | 'content'>> | DialogStyle): IEDialog {
        if (typeof options === "string") {
            return IEDialog.open({
                type: "modal",
                content,
                style: options,
            });
        }
        return IEDialog.open({
            type: "modal",
            content,
            ...options,
        });
    }

    /**
     * 打开消息提示
     * @param content 消息内容
     * @param options 配置选项或消息风格
     * @returns Dialog 实例
     */
    public static message(content: string, options?: Partial<Omit<DialogOptions, 'type' | 'content'>> | DialogStyle): IEDialog {
        if (typeof options === "string") {
            return IEDialog.open({
                type: "message",
                content,
                style: options,
                duration: 3000,
                showIcon: true,
            });
        }
        return IEDialog.open({
            type: "message",
            content,
            duration: 3000,
            showIcon: true,
            ...options,
        });
    }

    /**
     * 显示 loading
     * @param content loading 提示文本
     * @returns Dialog 实例
     */
    public static loading(content: string = '加载中...'): IEDialog {
        return IEDialog.open({
            type: "loading",
            content,
        });
    }

    /**
     * 打开媒体预览
     * @param mediaList 媒体列表
     * @param options 配置选项
     * @returns Dialog 实例
     */
    public static media(mediaList: MediaItem[], options?: Partial<Omit<DialogOptions, 'type' | 'mediaList' | 'content'>>): IEDialog {
        return IEDialog.open({
            type: "media",
            mediaList,
            content: "",
            ...options,
        });
    }

    /**
     * 打开图片预览
     * @param url 图片地址
     * @param options 配置选项或标题
     */
    public static image(url: string, options?: Partial<Omit<DialogOptions, 'type' | 'mediaList'>> | string): IEDialog {
        const opts = typeof options === 'string' ? { title: options } : options;
        const mediaTitle = typeof opts?.title === 'string' ? opts.title : undefined;
        return IEDialog.media([{ type: 'image', url, title: mediaTitle }], opts);
    }

    /**
     * 打开视频播放
     * @param url 视频地址
     * @param options 配置选项或标题
     */
    public static video(url: string, options?: Partial<Omit<DialogOptions, 'type' | 'mediaList'>> | string): IEDialog {
        const opts = typeof options === 'string' ? { title: options } : options;
        const mediaTitle = typeof opts?.title === 'string' ? opts.title : undefined;
        return IEDialog.media([{ type: 'video', url, title: mediaTitle }], opts);
    }
}
