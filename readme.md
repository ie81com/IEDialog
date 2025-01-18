# IEDialog 弹窗组件

一个轻量级、功能丰富的弹窗组件，支持模态框、消息提示、媒体预览等功能。

## 特性

- 🚀 轻量级，无外部依赖
- 💫 丰富的动画效果
- 🎨 多种内置样式（default、info、success、warning、error）
- 📱 响应式设计，自适应各种屏幕尺寸
- 🖼️ 支持图片和视频预览，支持多媒体轮播
- ⌨️ 完整的 TypeScript 类型支持
- 🎯 支持异步操作和加载状态
- 🎭 支持自定义 HTML 内容和表单
- 🔄 支持进度条倒计时

## 安装

```bash
npm install iedialog
```

## 使用方法

### 引入组件

```typescript
import { IEDialog } from 'iedialog';
import "iedialog/css";
```

### 基础用法

#### 基础弹窗
```typescript
// 基础弹窗
IEDialog.modal('这是一个基础弹窗示例');

// 自定义标题和宽度
IEDialog.modal('自定义弹窗内容', {
    title: '自定义标题',
    width: '500px'
});

// 不显示关闭按钮
IEDialog.modal('这个弹窗没有关闭按钮', {
    showClose: false
});

// 禁止点击遮罩层关闭
IEDialog.modal('这个弹窗禁止点击遮罩层关闭', {
    maskClosable: false
});
```

#### 不同风格的弹窗
```typescript
// 默认风格
IEDialog.modal('默认风格弹窗');

// 信息提示
IEDialog.modal('这是一条信息提示', 'info');

// 成功提示
IEDialog.modal('操作成功完成！', 'success');

// 警告提示
IEDialog.modal('请注意，这是一个警告信息', 'warning');

// 错误提示
IEDialog.modal('操作失败，请重试', 'error');
```

#### 消息提示
```typescript
// 基础消息
IEDialog.message('这是一条消息提示');

// 成功消息，3秒后自动关闭
IEDialog.message('操作成功！', 'success');

// 自定义显示时间
IEDialog.message('这条消息会显示5秒', {
    duration: 5000,
    style: 'info'
});

// 不自动关闭，显示关闭按钮
IEDialog.message('这条消息不会自动关闭', {
    duration: 0,
    showClose: true
});

// 不显示图标
IEDialog.message('这条消息不显示图标', {
    showIcon: false
});
```

#### 确认对话框
```typescript
// 基础确认框
IEDialog.modal('确定要删除这条记录吗？', {
    title: '删除确认',
    style: 'warning',
    maskClosable: false,
    showClose: false,
    onConfirm: () => console.log('确认删除'),
    onCancel: () => console.log('取消删除')
});

// 自定义按钮文本
IEDialog.modal('确定要执行此操作吗？', {
    confirmText: '立即执行',
    cancelText: '稍后再说'
});

// 异步操作
IEDialog.modal('确定要提交数据吗？', {
    async onConfirm() {
        try {
            await submitData();
            IEDialog.message('提交成功', 'success');
        } catch (error) {
            IEDialog.message('提交失败：' + error.message, 'error');
        }
    }
});
```

#### 加载提示
```typescript
// 基础加载
const loading = IEDialog.loading();

// 自定义加载文本
const loading = IEDialog.loading('正在提交数据...');

// 异步操作示例
async function handleSubmit() {
    const loading = IEDialog.loading('正在提交...');
    try {
        await submitData();
        loading.close();
        IEDialog.message('提交成功', 'success');
    } catch (error) {
        loading.close();
        IEDialog.message('提交失败', 'error');
    }
}
```

#### 媒体预览
```typescript
// 单张图片预览
IEDialog.image('https://example.com/image.jpg', '图片标题');

// 自定义图片预览
IEDialog.image('https://example.com/image.jpg', {
    title: '图片预览',
    width: '80%',
    maskClosable: true,
    onClose: () => console.log('图片预览已关闭')
});

// 单个视频预览
IEDialog.video('https://example.com/video.mp4', '视频标题');

// 自定义视频预览
IEDialog.video('https://example.com/video.mp4', {
    title: '视频预览',
    width: '70%',
    onMediaError: () => IEDialog.message('视频加载失败', 'error')
});

// 多媒体预览
IEDialog.media([
    { type: 'image', url: 'https://example.com/image1.jpg', title: '图片1' },
    { type: 'video', url: 'https://example.com/video.mp4', title: '视频' },
    { type: 'image', url: 'https://example.com/image2.jpg', title: '图片2' }
], {
    currentIndex: 0,  // 从第一个开始预览
    width: '80%',
    onMediaError: () => IEDialog.message('媒体加载失败', 'error')
});
```

#### 自定义 HTML 内容
```typescript
// 自定义 HTML 内容
IEDialog.modal(`
    <div class="custom-dialog-content">
        <h3>自定义 HTML 内容</h3>
        <p>支持自定义 HTML 内容，可以创建更丰富的交互界面</p>
        <div class="feature-list">
            <div class="feature-item">✨ 支持自定义样式</div>
            <div class="feature-item">📝 富文本内容</div>
        </div>
    </div>
`, {
    title: '自定义内容示例',
    width: '600px'
});

// 表单示例
IEDialog.modal(`
    <div class="custom-form-content">
        <form id="customForm">
            <div class="form-group">
                <label>用户名</label>
                <input type="text" name="username" required>
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" name="password" required>
            </div>
        </form>
    </div>
`, {
    title: '表单示例',
    width: '500px',
    confirmText: '提交',
    async onConfirm() {
        const form = document.getElementById('customForm') as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // 表单验证
        if (!data.username) throw new Error('请输入用户名');
        if (!data.password) throw new Error('请输入密码');

        // 提交数据
        await submitForm(data);
    }
});
```

### 配置选项

```typescript
interface DialogOptions {
    /** 弹窗类型：模态框、消息提示、媒体预览、加载中 */
    type?: 'modal' | 'message' | 'media' | 'loading';

    /** 弹窗风格：默认、信息、成功、警告、错误 */
    style?: 'default' | 'info' | 'success' | 'warning' | 'error';

    /** 弹窗标题 */
    title?: string;

    /** 弹窗内容 */
    content: string;

    /** 是否显示关闭按钮 */
    showClose?: boolean;

    /** 确认按钮文本 */
    confirmText?: string;

    /** 取消按钮文本 */
    cancelText?: string;

    /** 弹窗宽度，支持像素值或百分比 */
    width?: string;

    /** 是否显示遮罩层 */
    showMask?: boolean;

    /** 点击遮罩层是否关闭 */
    maskClosable?: boolean;

    /** 确认回调，支持异步函数 */
    onConfirm?: () => void | Promise<void>;

    /** 取消回调 */
    onCancel?: () => void;

    /** 关闭回调 */
    onClose?: () => void;

    /** 媒体列表配置 */
    mediaList?: MediaItem[];

    /** 当前媒体索引 */
    currentIndex?: number;

    /** 是否显示底部按钮 */
    showFooter?: boolean;

    /** 媒体加载错误回调 */
    onMediaError?: () => void;

    /** 消息框自动关闭时间（毫秒），设置为 0 则不自动关闭 */
    duration?: number;

    /** 是否显示图标 */
    showIcon?: boolean;
}

/** 媒体项配置 */
interface MediaItem {
    /** 媒体类型：图片或视频 */
    type: 'image' | 'video';

    /** 媒体URL */
    url: string;

    /** 媒体标题 */
    title?: string;
}
```

### 默认配置

组件内置了一些默认配置，可以通过传入选项来覆盖：

```typescript
const defaults = {
    type: "modal",           // 默认类型：模态框
    style: "default",        // 默认风格：default
    title: "提示",           // 默认标题
    showClose: true,        // 默认显示关闭按钮
    showIcon: false,        // 默认不显示图标
    confirmText: "确定",     // 默认确认按钮文本
    cancelText: "取消",      // 默认取消按钮文本
    width: "300px",         // 默认宽度
    showMask: true,         // 默认显示遮罩层
    maskClosable: true,     // 默认点击遮罩层可关闭
    showFooter: true,       // 默认显示底部按钮
    duration: 3000,         // 默认消息显示时间：3秒
};
```

## API 文档

### 静态方法

#### modal(content, options)
打开模态框
- `content`: string - 弹窗内容，支持普通文本或 HTML
- `options`: DialogOptions | DialogStyle - 配置选项或弹窗风格
- 返回值：Dialog 实例

#### message(content, options)
显示消息提示
- `content`: string - 消息内容
- `options`: DialogOptions | DialogStyle - 配置选项或消息风格
- 返回值：Dialog 实例

#### loading(content?)
显示加载提示
- `content`: string - 加载提示文本，默认为"加载中..."
- 返回值：Dialog 实例

#### image(url, options)
打开图片预览
- `url`: string - 图片地址
- `options`: DialogOptions | string - 配置选项或标题
- 返回值：Dialog 实例

#### video(url, options)
打开视频预览
- `url`: string - 视频地址
- `options`: DialogOptions | string - 配置选项或标题
- 返回值：Dialog 实例

#### media(mediaList, options)
打开媒体预览
- `mediaList`: MediaItem[] - 媒体列表
- `options`: DialogOptions - 配置选项
- 返回值：Dialog 实例

### 实例方法

#### close()
关闭弹窗
- 返回值：void

## 注意事项

1. 消息框宽度会根据内容自动调整，但有最小宽度（300px）和最大宽度（90vw）的限制
2. 当 `duration` 设置为 0 时，消息框不会自动关闭
3. 媒体预览支持加载失败的错误处理和加载动画
4. 所有的回调函数都是可选的，支持异步函数
5. 图片和视频预览时会自动调整尺寸，确保不超出视窗

## 许可证

MIT