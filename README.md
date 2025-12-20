## 简历生成器（React + TypeScript + Vite）

这是一个用于快速编写、预览并导出 PDF 简历的 Web 应用。你可以在左侧实时编辑简历内容，右侧即时预览排版，并通过浏览器的打印功能保存为 PDF。

### 功能特性
- 支持编辑以下模块：
  - 个人信息（姓名、职位、联系方式、所在地、生日、自我评价）
  - 专业技能（分组、多段富文本）
  - 工作经历（可排序、支持富文本描述）
  - 项目经历（项目描述、技术架构、职责描述富文本）
  - 教育经历
- 右侧 A4 纸张比例预览，所见即所得
- 一键调用浏览器打印，导出 PDF 简历
- 使用 React + TypeScript + Vite + Tailwind CSS 构建

### 项目结构
- `src/App.tsx`：应用入口布局，左侧编辑器 + 右侧预览，包含「预览」和「保存 PDF」按钮。
- `src/components/ResumeEditor.tsx`：简历编辑器，负责所有表单与富文本编辑。
- `src/components/ResumePreview.tsx`：简历预览与打印排版逻辑（A4 纸大小、分页、字体大小等）。
- `src/components/RichTextEditor.tsx`：通用富文本编辑组件。
- `src/components/PageBreakController.tsx`：分页检测实验组件（目前未在界面中直接使用）。
- `src/types.ts`：简历数据结构定义。

### 本地运行

1. 安装依赖
```bash
cd resume-web
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

启动成功后，终端会输出类似：
```text
Local:   http://localhost:5173/  （或 5174 等端口）
```
在浏览器中打开该地址即可访问应用。

### 构建生产版本

```bash
npm run build
```

构建产物会输出到 `dist/` 目录，可部署到任意静态站点服务（如 Nginx、Vercel、GitHub Pages 等）。

如需本地预览构建后的版本：

```bash
npm run preview
```

### 导出 PDF 简历

1. 在编辑器中填好所有简历信息；
2. 点击右上角的「预览」按钮切换到单页预览模式；
3. 点击「保存 PDF」按钮，会调用浏览器的打印面板；
4. 在浏览器打印设置中选择：
   - 目标打印机：选择「保存为 PDF」；
   - 边距：建议选择「最小值」；
   - 取消页眉和页脚（如果浏览器支持对应选项）；
5. 确认预览效果合适后，点击「保存」导出 PDF 文件。

> 如果发现页面之间有较大空白，可以适当调整简历内容长度或条目数量，让内容更紧凑地填满 A4 纸张。

### 技术栈

- 框架：`React` + `TypeScript`
- 构建工具：`Vite`
- 样式：`Tailwind CSS`
- 图标：`lucide-react`

### 常用脚本

在 `resume-web` 目录下可执行以下脚本：

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产包
- `npm run preview`：预览构建结果
- `npm run lint`：运行 ESLint 进行代码检查

