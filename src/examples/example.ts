import { IEDialog } from "../components/Dialog/IEDialog";

/**
 * 基础弹窗示例
 */
document.getElementById("basic-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这是一个基础弹窗示例");
});

document.getElementById("no-close-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这个弹窗没有关闭按钮", {
        showClose: false,
    });
});

document.getElementById("with-icon-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这个弹窗显示图标", {
        showIcon: true,
    });
});

document.getElementById("custom-width-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这个弹窗使用自定义宽度", {
        width: "600px",
    });
});

document.getElementById("long-text-dialog")?.addEventListener("click", () => {
    IEDialog.modal(
        `这是一个超长文本示例，用于测试弹窗组件对长文本的自动换行和滚动效果。

在软件开发中，弹窗（Dialog）是一种常见的用户界面元素，用于显示重要信息、警告或需要用户确认的操作。一个好的弹窗组件应该具备以下特点：

1. 灵活的内容展示：能够适应不同长度的文本内容，自动换行和滚动。
2. 响应式布局：在不同屏幕尺寸下都能保持良好的显示效果。
3. 交互体验：提供清晰的操作按钮和反馈。
4. 可访问性：支持键盘操作和屏幕阅读器。

这段文本主要用于演示弹窗组件处理长文本的能力，包括：
- 文本自动换行
- 内容区域可滚动
- 布局结构稳定
- 阅读体验良好

您可以尝试滚动查看更多内容...这是一个超长文本示例，用于测试弹窗组件对长文本的自动换行和滚动效果。

在软件开发中，弹窗（Dialog）是一种常见的用户界面元素，用于显示重要信息、警告或需要用户确认的操作。一个好的弹窗组件应该具备以下特点：

1. 灵活的内容展示：能够适应不同长度的文本内容，自动换行和滚动。
2. 响应式布局：在不同屏幕尺寸下都能保持良好的显示效果。
3. 交互体验：提供清晰的操作按钮和反馈。
4. 可访问性：支持键盘操作和屏幕阅读器。

这段文本主要用于演示弹窗组件处理长文本的能力，包括：
- 文本自动换行
- 内容区域可滚动
- 布局结构稳定
- 阅读体验良好

您可以尝试滚动查看更多内容...这是一个超长文本示例，用于测试弹窗组件对长文本的自动换行和滚动效果。

在软件开发中，弹窗（Dialog）是一种常见的用户界面元素，用于显示重要信息、警告或需要用户确认的操作。一个好的弹窗组件应该具备以下特点：

1. 灵活的内容展示：能够适应不同长度的文本内容，自动换行和滚动。
2. 响应式布局：在不同屏幕尺寸下都能保持良好的显示效果。
3. 交互体验：提供清晰的操作按钮和反馈。
4. 可访问性：支持键盘操作和屏幕阅读器。

这段文本主要用于演示弹窗组件处理长文本的能力，包括：
- 文本自动换行
- 内容区域可滚动
- 布局结构稳定
- 阅读体验良好

您可以尝试滚动查看更多内容..这是一个超长文本示例，用于测试弹窗组件对长文本的自动换行和滚动效果。

在软件开发中，弹窗（Dialog）是一种常见的用户界面元素，用于显示重要信息、警告或需要用户确认的操作。一个好的弹窗组件应该具备以下特点：

1. 灵活的内容展示：能够适应不同长度的文本内容，自动换行和滚动。
2. 响应式布局：在不同屏幕尺寸下都能保持良好的显示效果。
3. 交互体验：提供清晰的操作按钮和反馈。
4. 可访问性：支持键盘操作和屏幕阅读器。

这段文本主要用于演示弹窗组件处理长文本的能力，包括：
- 文本自动换行
- 内容区域可滚动
- 布局结构稳定
- 阅读体验良好

您可以尝试滚动查看更多内容...这是一个超长文本示例，用于测试弹窗组件对长文本的自动换行和滚动效果。

在软件开发中，弹窗（Dialog）是一种常见的用户界面元素，用于显示重要信息、警告或需要用户确认的操作。一个好的弹窗组件应该具备以下特点：

1. 灵活的内容展示：能够适应不同长度的文本内容，自动换行和滚动。
2. 响应式布局：在不同屏幕尺寸下都能保持良好的显示效果。
3. 交互体验：提供清晰的操作按钮和反馈。
4. 可访问性：支持键盘操作和屏幕阅读器。

这段文本主要用于演示弹窗组件处理长文本的能力，包括：
- 文本自动换行
- 内容区域可滚动
- 布局结构稳定
- 阅读体验良好

您可以尝试滚动查看更多内容....`,
        {
            title: "超长文本示例",
            width: "500px",
        }
    );
});
/**
 * 不同风格的弹窗示例
 */
document.getElementById("info-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这是一条信息提示", "info");
});

document.getElementById("success-dialog")?.addEventListener("click", () => {
    IEDialog.modal("操作成功完成！", "success");
});

document.getElementById("warning-dialog")?.addEventListener("click", () => {
    IEDialog.modal("请注意，这是一个警告信息。", "warning");
});

document.getElementById("error-dialog")?.addEventListener("click", () => {
    IEDialog.modal("操作失败，请重试。", "error");
});

/**
 * 交互功能示例
 */
document.getElementById("confirm-dialog")?.addEventListener("click", () => {
    IEDialog.modal("确定要删除这条记录吗？", {
        title: "删除确认",
        style: "warning",
        maskClosable: false,
        showClose: false,
        onConfirm: () => console.log("确认删除"),
    });
});

document.getElementById("custom-btn-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这是一个自定义按钮的弹窗", {
        title: "自定义按钮",
        confirmText: "知道了",
        cancelText: "关闭",
        onConfirm: () => console.log("点击知道了"),
        onCancel: () => console.log("点击关闭"),
    });
});

document.getElementById("no-mask-close-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这个弹窗禁止点击遮罩层关闭", {
        maskClosable: false,
        showClose: true,
    });
});

document.getElementById("no-footer-dialog")?.addEventListener("click", () => {
    IEDialog.modal("这个弹窗没有底部按钮", {
        showFooter: false,
    });
});

/**
 * 消息提示示例
 */
document.getElementById("message-info")?.addEventListener("click", () => {
    IEDialog.message("这是一条信息提示");
});

document.getElementById("message-success")?.addEventListener("click", () => {
    IEDialog.message("操作成功完成！", "success");
});

document.getElementById("message-warning")?.addEventListener("click", () => {
    IEDialog.message("请注意这个警告信息", "warning");
});

document.getElementById("message-error")?.addEventListener("click", () => {
    IEDialog.message("操作发生错误！", "error");
});

document.getElementById("message-long")?.addEventListener("click", () => {
    IEDialog.message("这条消息会显示较长时间", {
        duration: 5000,
    });
});

document.getElementById("message-no-auto")?.addEventListener("click", () => {
    IEDialog.message("这条消息不会自动关闭", {
        duration: 0,
        showClose: true,
    });
});

document.getElementById("message-no-close")?.addEventListener("click", () => {
    IEDialog.message("这条消息没有关闭按钮", {
        showClose: false,
    });
});

document.getElementById("message-with-icon")?.addEventListener("click", () => {
    IEDialog.message("这条消息不显示图标", {
        showIcon: false,
        style: "info",
    });
});

/**
 * 媒体弹窗示例
 */
document.getElementById("image-dialog")?.addEventListener("click", () => {
    IEDialog.media(
        [
            {
                type: "image",
                url: "https://picsum.photos/id/1/800/600",
                title: "随机图片 1",
            },
            {
                type: "image",
                url: "https://picsum.photos/id/2/800/600",
                title: "随机图片 2",
            },
            {
                type: "image",
                url: "https://picsum.photos/id/3/800/500",
                title: "随机图片 3",
            },
        ],
        {
            onMediaError: () => IEDialog.message("图片加载失败", "error"),
        }
    );
});

document.getElementById("image-custom-size")?.addEventListener("click", () => {
    IEDialog.image("https://picsum.photos/1200/800", {
        title: "自定义尺寸的图片",
        width: "60%",
        maskClosable: false,
        onClose: () => console.log("图片预览已关闭"),
    });
});

document.getElementById("video-dialog")?.addEventListener("click", () => {
    IEDialog.media(
        [
            {
                type: "video",
                url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
                title: "示例视频 1",
            },
            {
                type: "video",
                url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
                title: "示例视频 2",
            },
        ],
        {
            onMediaError: () => IEDialog.message("视频加载失败", "error"),
        }
    );
});

document.getElementById("video-custom-size")?.addEventListener("click", () => {
    IEDialog.video("//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4", {
        title: "自定义尺寸的视频",
        width: "60%",
        maskClosable: false,
        onMediaError: () => IEDialog.message("视频加载失败", "error"),
    });
});

// 混合媒体预览
document.getElementById("mixed-media")?.addEventListener("click", () => {
    IEDialog.media(
        [
            {
                type: "image",
                url: "https://picsum.photos/id/1/800/600",
                title: "图片预览",
            },
            {
                type: "video",
                url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
                title: "视频预览",
            },
            {
                type: "image",
                url: "https://picsum.photos/id/2/800/600",
                title: "图片预览",
            },
        ],
        {
            width: "60%",
            onMediaError: () => IEDialog.message("媒体加载失败", "error"),
            onClose: () => console.log("媒体预览已关闭"),
        }
    );
});

// 从指定索引开始预览
document.getElementById("start-from-index")?.addEventListener("click", () => {
    IEDialog.media(
        [
            {
                type: "image",
                url: "https://picsum.photos/id/10/800/600",
                title: "图片 1",
            },
            {
                type: "image",
                url: "https://picsum.photos/id/11/800/600",
                title: "图片 2",
            },
            {
                type: "image",
                url: "https://picsum.photos/id/12/800/600",
                title: "图片 3",
            },
        ],
        {
            currentIndex: 1, // 从第二张图片开始预览
            width: "80%",
        }
    );
});

// 单张图片预览
document.getElementById("single-image")?.addEventListener("click", () => {
    IEDialog.image("https://picsum.photos/id/20/1200/800", {
        title: "高清图片预览",
        width: "40%",
        onMediaError: () => IEDialog.message("图片加载失败", "error"),
    });
});

// 错误处理示例
document.getElementById("media-error")?.addEventListener("click", () => {
    IEDialog.media(
        [
            {
                type: "image",
                url: "https://invalid-url/image.jpg",
                title: "加载失败的图片",
            },
            {
                type: "video",
                url: "https://invalid-url/video.mp4",
                title: "加载失败的视频",
            },
        ],
        {
            onMediaError: () => IEDialog.message("媒体加载失败", "error"),
        }
    );
});

/**
 * Loading 示例
 */
document.getElementById("loading-dialog")?.addEventListener("click", () => {
    const loading = IEDialog.loading();
    // 3秒后关闭
    setTimeout(() => loading.close(), 3000);
});

document.getElementById("loading-text-dialog")?.addEventListener("click", () => {
    const loading = IEDialog.loading("正在提交数据...");
    // 3秒后关闭
    setTimeout(() => loading.close(), 3000);
});

// 自定义HTML内容示例
document.getElementById("custom-html-dialog")?.addEventListener("click", () => {
    IEDialog.modal(
        `
        <div class="custom-dialog-content">
            <h3>自定义 HTML 内容示例</h3>
            <div class="section">
                <p>这是一个展示自定义 HTML 内容的示例，你可以在弹窗中使用丰富的 HTML 元素和样式。</p>
                <div class="code-block">
                    <code>IEDialog.modal(customHTML, options);</code>
                </div>
            </div>
            <div class="section">
                <p>主要特点：</p>
                <div class="feature-list">
                    <div class="feature-item">✨ 支持自定义样式</div>
                    <div class="feature-item">📝 富文本内容</div>
                    <div class="feature-item">🎨 灵活的布局</div>
                    <div class="feature-item">🔧 可交互元素</div>
                </div>
            </div>
        </div>
    `,
        {
            title: "自定义HTML示例",
            width: "600px",
        }
    );
});

// 表单示例
document.getElementById("form-dialog")?.addEventListener("click", () => {
    IEDialog.modal(
        `
        <div class="custom-form-content">
            <form id="customForm">
                <div class="form-group">
                    <label>用户名</label>
                    <input type="text" name="username" placeholder="请输入用户名">
                    <div class="form-tip">用户名长度为 4-20 个字符</div>
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" name="password" placeholder="请输入密码">
                    <div class="form-tip">密码至少包含 6 个字符</div>
                </div>
                <div class="form-group">
                    <label>备注</label>
                    <textarea name="remark" placeholder="请输入备注信息"></textarea>
                </div>
            </form>
        </div>
    `,
        {
            title: "表单示例",
            width: "500px",
            confirmText: "提交",
            onConfirm: async () => {
                const form = document.getElementById("customForm") as HTMLFormElement;
                if (form) {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);

                    // 模拟异步请求
                    await new Promise((resolve) => setTimeout(resolve, 3000));

                    // 表单验证
                    if (!data.username) {
                        throw new Error("请输入用户名");
                    }
                    if (!data.password) {
                        throw new Error("请输入密码");
                    }

                    console.log("表单数据：", data);
                    IEDialog.message("表单提交成功，数据:" + JSON.stringify(data), "success");
                }
            },
        }
    );
});
