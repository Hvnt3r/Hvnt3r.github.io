/* Storeframe — local App Store screenshot compositor. */

const ASSET_BASE = "assets/";

const ASSETS = {
  "paper-quiet": {
    label: { "zh-CN": "纸张留白", "en-US": "Paper quiet" },
    file: "paper-quiet.png",
    fallback: "#eee8db",
    ink: "#202a38"
  },
  "ink-night": {
    label: { "zh-CN": "深夜光晕", "en-US": "Ink night" },
    file: "ink-night.png",
    fallback: "#080e1c",
    ink: "#f4f6ff"
  },
  "chromatic-cobalt": {
    label: { "zh-CN": "钴蓝色场", "en-US": "Chromatic cobalt" },
    file: "chromatic-cobalt.png",
    fallback: "#244de0",
    ink: "#ffffff"
  },
  "lime-ribbon": {
    label: { "zh-CN": "荧光丝带", "en-US": "Lime ribbon" },
    file: "lime-ribbon.png",
    fallback: "#0d1820",
    ink: "#f8ffdc"
  },
  "terracotta-paper": {
    label: { "zh-CN": "陶土暖色", "en-US": "Terracotta paper" },
    file: "terracotta-paper.png",
    fallback: "#d97962",
    ink: "#fff6ec"
  },
  "mac-studio": {
    label: { "zh-CN": "Mac 工作室", "en-US": "Mac studio" },
    file: "mac-studio.png",
    fallback: "#e7e4df",
    ink: "#1d2d43"
  }
};

const SPECS = {
  "iphone-69": {
    id: "iphone-69",
    kind: "iphone",
    short: "iPhone",
    label: { "zh-CN": "iPhone 6.9″", "en-US": "iPhone 6.9″" },
    note: { "zh-CN": "最高主规格 · 适用于 6.9″ Display", "en-US": "Highest master · 6.9″ display" },
    orientations: {
      portrait: { width: 1320, height: 2868 },
      landscape: { width: 2868, height: 1320 }
    }
  },
  "ipad-13": {
    id: "ipad-13",
    kind: "ipad",
    short: "iPad",
    label: { "zh-CN": "iPad 13″", "en-US": "iPad 13″" },
    note: { "zh-CN": "最高主规格 · 适用于 13″ Display", "en-US": "Highest master · 13″ display" },
    orientations: {
      portrait: { width: 2064, height: 2752 },
      landscape: { width: 2752, height: 2064 }
    }
  },
  mac: {
    id: "mac",
    kind: "mac",
    short: "Mac",
    label: { "zh-CN": "Mac 16:10", "en-US": "Mac 16:10" },
    note: { "zh-CN": "最高主规格 · 16:10 横向画布", "en-US": "Highest master · 16:10 landscape" },
    orientations: {
      landscape: { width: 2880, height: 1800 }
    }
  }
};

const TEMPLATES = [
  {
    id: "editorial-split",
    number: "01",
    asset: "paper-quiet",
    name: { "zh-CN": "编辑分栏", "en-US": "Editorial Split" },
    description: { "zh-CN": "留白 · 细线", "en-US": "Quiet · precise" }
  },
  {
    id: "quiet-mono",
    number: "02",
    asset: "paper-quiet",
    name: { "zh-CN": "静谧单色", "en-US": "Quiet Mono" },
    description: { "zh-CN": "克制 · 聚焦", "en-US": "Soft · focused" }
  },
  {
    id: "dark-focus",
    number: "03",
    asset: "ink-night",
    name: { "zh-CN": "深夜聚焦", "en-US": "Dark Focus" },
    description: { "zh-CN": "深色 · 光晕", "en-US": "Ink · glow" }
  },
  {
    id: "chromatic-field",
    number: "04",
    asset: "chromatic-cobalt",
    name: { "zh-CN": "彩色场域", "en-US": "Chromatic Field" },
    description: { "zh-CN": "鲜明 · 有力", "en-US": "Bold · vivid" }
  },
  {
    id: "gallery-pair",
    number: "05",
    asset: "lime-ribbon",
    name: { "zh-CN": "画廊双屏", "en-US": "Gallery Pair" },
    description: { "zh-CN": "并置 · 叙事", "en-US": "Pair · story" }
  },
  {
    id: "mac-window",
    number: "06",
    asset: "mac-studio",
    name: { "zh-CN": "桌面窗口", "en-US": "Mac Window" },
    description: { "zh-CN": "桌面 · 结构", "en-US": "Desktop · clear" }
  }
];

const UI = {
  "zh-CN": {
    brandTagline: "App Store 截图工作台",
    localOnly: "本地处理",
    backToSite: "返回站点",
    canvasKicker: "CANVAS / 01",
    pageTitle: "应用截图生成器",
    pageIntro: "上传你的产品画面，选择一套有秩序的视觉语言，快速导出可上架的截图。",
    targetLabel: "目标设备",
    orientationLabel: "画面方向",
    templateLabel: "视觉模板",
    surfaceLabel: "背景素材",
    surfaceOptional: "可选",
    surfaceHint: "原创素材只做背景，文字由 Canvas 绘制，方便精确适配多种语言。",
    previewKicker: "LIVE PREVIEW",
    canvasEmptyTitle: "先放入一张产品截图",
    canvasEmptyBody: "右侧支持拖拽上传，也可以点击选择文件",
    renderCaption: "Canvas 实时渲染",
    safeAreaCaption: "安全边距 7.5%",
    previous: "上一张",
    next: "下一张",
    stageFootnote: "预览会自动缩放；导出时按 Apple 目标规格重新渲染，保持像素级尺寸。",
    sourceLabel: "产品画面",
    dropzoneTitle: "拖入截图",
    dropzoneBody: "PNG / JPG / WebP · 最多 10 张",
    pasteHint: "也可以直接粘贴图片",
    copyLabel: "截图文案",
    headlineLabel: "主标题",
    subtitleLabel: "副标题",
    copyHint: "标题会根据模板自动换行与缩放",
    localeLabel: "本地化版本",
    addLocale: "添加语言",
    exportLabel: "批量导出",
    jpegLabel: "JPEG",
    exportButton: "导出截图 ZIP",
    resetButton: "清空当前项目",
    footerCopy: "为发布准备好每一个画面。",
    noUpload: "你的素材不会离开浏览器",
    portrait: "竖向",
    landscape: "横向",
    selected: "已选择",
    emptyScreens: "还没有截图，上传后会出现在这里。",
    noCopy: "尚未填写",
    currentSlide: "截图",
    imageFitContain: "完整显示",
    imageFitCover: "铺满裁切",
    imageFitToggle: "切换图片适配方式",
    exportCurrent: "当前目标",
    exportNoImages: "没有可导出的截图",
    exportPreparing: "正在准备画布…",
    exportRendering: "正在渲染",
    exportCompressing: "正在打包 ZIP…",
    exportDone: "导出完成，共 {count} 张截图",
    exportFailed: "导出失败，请尝试减少截图或单独下载。",
    exportFallback: "ZIP 失败，已尝试逐张下载",
    uploadAdded: "已添加 {count} 张截图",
    uploadLimit: "最多只能添加 10 张截图",
    invalidFile: "已跳过不支持的文件",
    localePrompt: "输入语言代码，例如 es-ES",
    localeExists: "这个语言已经存在",
    localeAdded: "已添加语言 {code}",
    localeRemoved: "已移除语言",
    resetConfirm: "确定要清空当前项目吗？所有已上传图片会被移除。",
    projectReset: "项目已清空",
    noSelectedTarget: "请至少选择一个导出设备",
    targetMissingImages: "{target} 没有截图，已跳过。",
    localFile: "本地文件",
    slide: "截图 {number}",
    addScreenshot: "添加截图",
    fitContainShort: "全",
    fitCoverShort: "裁",
    delete: "删除",
    moveUp: "上移",
    moveDown: "下移",
    current: "当前",
    ready: "已填写",
    blank: "空白"
  },
  "en-US": {
    brandTagline: "App Store screenshot studio",
    localOnly: "Local only",
    backToSite: "Back to site",
    canvasKicker: "CANVAS / 01",
    pageTitle: "Screenshot generator",
    pageIntro: "Drop in your product screens, choose a visual system, and export a release-ready set in minutes.",
    targetLabel: "Target device",
    orientationLabel: "Orientation",
    templateLabel: "Visual templates",
    surfaceLabel: "Background surface",
    surfaceOptional: "OPTIONAL",
    surfaceHint: "Original art stays in the background; Canvas draws all copy for precise localization.",
    previewKicker: "LIVE PREVIEW",
    canvasEmptyTitle: "Add a product screen",
    canvasEmptyBody: "Drop files here or choose them from the right panel",
    renderCaption: "Canvas live render",
    safeAreaCaption: "7.5% safe margin",
    previous: "Previous",
    next: "Next",
    stageFootnote: "Preview is scaled to fit. Export re-renders at the exact Apple target size.",
    sourceLabel: "Product screens",
    dropzoneTitle: "Drop screenshots",
    dropzoneBody: "PNG / JPG / WebP · up to 10",
    pasteHint: "You can also paste an image",
    copyLabel: "Screenshot copy",
    headlineLabel: "Headline",
    subtitleLabel: "Subtitle",
    copyHint: "Text wraps and scales to fit the selected template",
    localeLabel: "Localizations",
    addLocale: "Add language",
    exportLabel: "Batch export",
    jpegLabel: "JPEG",
    exportButton: "Export screenshot ZIP",
    resetButton: "Clear current project",
    footerCopy: "Every frame, ready to ship.",
    noUpload: "Your assets never leave this browser",
    portrait: "Portrait",
    landscape: "Landscape",
    selected: "Selected",
    emptyScreens: "No screenshots yet. Upload one to see it here.",
    noCopy: "Not filled",
    currentSlide: "Screenshot",
    imageFitContain: "Contain",
    imageFitCover: "Cover",
    imageFitToggle: "Toggle image fit",
    exportCurrent: "Current target",
    exportNoImages: "No screenshots to export",
    exportPreparing: "Preparing canvas…",
    exportRendering: "Rendering",
    exportCompressing: "Packing ZIP…",
    exportDone: "Export complete: {count} screenshots",
    exportFailed: "Export failed. Try fewer screenshots or download individually.",
    exportFallback: "ZIP failed; individual downloads were started",
    uploadAdded: "Added {count} screenshots",
    uploadLimit: "You can add up to 10 screenshots",
    invalidFile: "Unsupported files were skipped",
    localePrompt: "Enter a locale code, e.g. es-ES",
    localeExists: "That locale already exists",
    localeAdded: "Added {code}",
    localeRemoved: "Locale removed",
    resetConfirm: "Clear the current project? All uploaded images will be removed.",
    projectReset: "Project cleared",
    noSelectedTarget: "Select at least one export target",
    targetMissingImages: "{target} has no screenshots and was skipped.",
    localFile: "Local file",
    slide: "Screenshot {number}",
    addScreenshot: "Add screenshot",
    fitContainShort: "Fit",
    fitCoverShort: "Crop",
    delete: "Delete",
    moveUp: "Move up",
    moveDown: "Move down",
    current: "Current",
    ready: "Ready",
    blank: "Blank"
  }
};

const DEFAULT_COPIES = {
  "zh-CN": [
    { title: "让每一步，都更清晰", subtitle: "把重要的事情，留在你的视线里。" },
    { title: "专注，应该很自然", subtitle: "清晰的界面让每一次打开都刚刚好。" },
    { title: "把节奏留给自己", subtitle: "从灵感到完成，只需要一处空间。" }
  ],
  "en-US": [
    { title: "Make every step clearer", subtitle: "Keep what matters in view, without the noise." },
    { title: "Focus should feel natural", subtitle: "A clear interface makes every open feel right." },
    { title: "Keep your own rhythm", subtitle: "From first thought to done, all in one place." }
  ],
  "ja-JP": [
    { title: "一歩一歩を、もっと明快に", subtitle: "大切なことを、いつも視界の中へ。" },
    { title: "集中を、もっと自然に", subtitle: "ひらくたび、ちょうどいいインターフェース。" },
    { title: "自分のリズムで進もう", subtitle: "ひらめきから完成まで、ひとつの場所で。" }
  ],
  "ko-KR": [
    { title: "모든 순간을 더 선명하게", subtitle: "중요한 것만 눈앞에 남겨두세요." },
    { title: "집중은 자연스러워야 하니까", subtitle: "열 때마다 편안한 인터페이스를 만나보세요." },
    { title: "나만의 리듬을 지켜요", subtitle: "영감부터 완성까지, 한 곳에서 시작하세요." }
  ],
  "fr-FR": [
    { title: "Chaque étape, plus claire", subtitle: "Gardez l’essentiel sous les yeux, sans distraction." },
    { title: "La concentration, naturellement", subtitle: "Une interface claire à chaque ouverture." },
    { title: "À votre propre rythme", subtitle: "De l’idée à l’action, tout au même endroit." }
  ],
  "de-DE": [
    { title: "Jeden Schritt klarer", subtitle: "Das Wesentliche bleibt im Blick — ohne Ablenkung." },
    { title: "Fokus darf leicht sein", subtitle: "Eine klare Oberfläche bei jedem Öffnen." },
    { title: "In deinem eigenen Rhythmus", subtitle: "Von der Idee bis zum Ziel an einem Ort." }
  ]
};

const LOCALE_NAMES = {
  "zh-CN": "简体中文",
  "en-US": "English",
  "ja-JP": "日本語",
  "ko-KR": "한국어",
  "fr-FR": "Français",
  "de-DE": "Deutsch"
};

const FONT_STACK = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Noto Sans CJK SC', 'Noto Sans', 'Segoe UI', sans-serif";
const MAX_IMAGES = 10;
const SAFE = .075;
const PREVIEW_EDGE = 940;

let assetImages = {};
let renderToken = 0;
let toastTimer = 0;

function uid(prefix = "id") {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return `${prefix}-${window.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneCopies(code) {
  const source = DEFAULT_COPIES[code] || DEFAULT_COPIES["en-US"];
  return source.map(item => ({ title: item.title, subtitle: item.subtitle }));
}

function makeLocale(code, custom = false) {
  return {
    code,
    name: LOCALE_NAMES[code] || code,
    direction: "ltr",
    custom,
    slides: cloneCopies(code)
  };
}

function makeTarget(id) {
  return {
    orientation: id === "mac" ? "landscape" : "portrait",
    templateId: id === "mac" ? "mac-window" : "editorial-split",
    assetId: id === "mac" ? "mac-studio" : "paper-quiet",
    images: []
  };
}

function createInitialState() {
  return {
    uiLocale: "zh-CN",
    activeTarget: "iphone-69",
    activeSlide: 0,
    activeLocale: "zh-CN",
    previewZoom: 1,
    exportTargets: ["iphone-69"],
    targets: {
      "iphone-69": makeTarget("iphone-69"),
      "ipad-13": makeTarget("ipad-13"),
      mac: makeTarget("mac")
    },
    locales: ["zh-CN", "en-US", "ja-JP", "ko-KR", "fr-FR", "de-DE"].map(code => makeLocale(code))
  };
}

let state = createInitialState();

function t(key, values = {}) {
  const dictionary = UI[state.uiLocale] || UI["zh-CN"];
  let value = dictionary[key] || UI["en-US"][key] || key;
  Object.keys(values).forEach(name => { value = value.replace(`{${name}}`, String(values[name])); });
  return value;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function activeTargetData() { return state.targets[state.activeTarget]; }
function activeSpec() { return getSpec(state.activeTarget); }
function getTemplate(id) { return TEMPLATES.find(item => item.id === id) || TEMPLATES[0]; }
function getAsset(id) { return ASSETS[id] || ASSETS["paper-quiet"]; }

function getSpec(targetId, orientation = state.targets[targetId]?.orientation) {
  const base = SPECS[targetId] || SPECS["iphone-69"];
  const selectedOrientation = base.orientations[orientation] ? orientation : Object.keys(base.orientations)[0];
  return { ...base, orientation: selectedOrientation, ...base.orientations[selectedOrientation] };
}

function currentLocale() {
  return state.locales.find(locale => locale.code === state.activeLocale) || state.locales[0];
}

function ensureCopyLength(length) {
  state.locales.forEach(locale => {
    const fallback = DEFAULT_COPIES[locale.code] || DEFAULT_COPIES["en-US"];
    while (locale.slides.length < length) {
      const index = locale.slides.length;
      const item = fallback[index % fallback.length] || { title: "", subtitle: "" };
      locale.slides.push({ title: item.title, subtitle: item.subtitle });
    }
  });
}

function getCopy(localeCode = state.activeLocale, index = state.activeSlide) {
  const locale = state.locales.find(item => item.code === localeCode) || state.locales[0];
  ensureCopyLength(Math.max(index + 1, activeTargetData().images.length || 1));
  return locale.slides[index] || { title: "", subtitle: "" };
}

function setTextContent(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function applyUiLanguage() {
  document.documentElement.lang = state.uiLocale;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-ui-lang]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.uiLang === state.uiLocale);
  });
  const titleInput = document.querySelector("#titleInput");
  const subtitleInput = document.querySelector("#subtitleInput");
  if (titleInput) titleInput.placeholder = state.uiLocale === "zh-CN" ? "让每一步，都更清晰" : "Make every step clearer";
  if (subtitleInput) subtitleInput.placeholder = state.uiLocale === "zh-CN" ? "把重要的事情，留在你的视线里。" : "Keep what matters in view, without the noise.";
  document.title = state.uiLocale === "zh-CN" ? "Storeframe · App Store 截图" : "Storeframe · App Store screenshots";
}

function renderTargetSwitch() {
  const targetSwitch = document.querySelector("#targetSwitch");
  targetSwitch.innerHTML = Object.values(SPECS).map(spec => `
    <button type="button" class="target-button ${spec.id === state.activeTarget ? "is-active" : ""}" data-target-id="${spec.id}">
      <span>${esc(spec.short)}</span>${esc(spec.label[state.uiLocale] || spec.label["en-US"])}
    </button>`).join("");
  setTextContent("#targetCount", String(Object.keys(SPECS).indexOf(state.activeTarget) + 1).padStart(2, "0"));
}

function renderOrientation() {
  const target = activeTargetData();
  const spec = SPECS[state.activeTarget];
  const select = document.querySelector("#orientationSelect");
  const options = Object.keys(spec.orientations).map(orientation => `
    <option value="${orientation}" ${target.orientation === orientation ? "selected" : ""}>${esc(t(orientation))}</option>`).join("");
  select.innerHTML = options;
  select.disabled = Object.keys(spec.orientations).length < 2;
  const current = getSpec(state.activeTarget);
  const orientationLabel = t(current.orientation);
  setTextContent("#specNote", `${orientationLabel} · ${current.width} × ${current.height} px`);
}

function renderTemplates() {
  const target = activeTargetData();
  const grid = document.querySelector("#templateGrid");
  grid.innerHTML = TEMPLATES.map(template => {
    const asset = getAsset(template.asset);
    return `<button type="button" class="template-card ${target.templateId === template.id ? "is-active" : ""}" data-template-id="${template.id}" style="background-image:url('${ASSET_BASE}${asset.file}')">
      <span class="template-number">${template.number}</span>
      <span class="template-name">${esc(template.name[state.uiLocale] || template.name["en-US"])}</span>
      <span class="template-description">${esc(template.description[state.uiLocale] || template.description["en-US"])}</span>
    </button>`;
  }).join("");
  setTextContent("#templateCount", String(TEMPLATES.length).padStart(2, "0"));
}

function renderAssetSelect() {
  const select = document.querySelector("#assetSelect");
  select.innerHTML = Object.entries(ASSETS).map(([id, asset]) => `<option value="${id}" ${id === activeTargetData().assetId ? "selected" : ""}>${esc(asset.label[state.uiLocale] || asset.label["en-US"])}</option>`).join("");
}

function renderStageHeader() {
  const spec = activeSpec();
  const orientationName = t(spec.orientation);
  setTextContent("#previewTitle", spec.label[state.uiLocale] || spec.label["en-US"]);
  setTextContent("#previewMeta", `${spec.width} × ${spec.height} · ${orientationName}`);
  setTextContent("#rulerTopLabel", `${spec.width} px`);
  setTextContent("#rulerSideLabel", `${spec.height} px`);
  setTextContent("#zoomValue", state.previewZoom === 1 ? "Fit" : `${Math.round(state.previewZoom * 100)}%`);
  document.querySelector("#previewCanvas").style.transform = `scale(${state.previewZoom})`;
}

function renderSlideStrip() {
  const images = activeTargetData().images;
  const count = Math.max(images.length, 1);
  const strip = document.querySelector("#slideStrip");
  strip.innerHTML = Array.from({ length: count }, (_, index) => `
    <button type="button" class="slide-thumb ${index === state.activeSlide ? "is-active" : ""} ${images[index] ? "has-image" : ""}" data-slide-index="${index}" aria-label="${esc(t("slide", { number: index + 1 }))}">${String(index + 1).padStart(2, "0")}</button>`).join("");
}

function renderCanvasEmpty() {
  document.querySelector("#canvasEmpty").classList.toggle("is-hidden", activeTargetData().images.length > 0);
}

function renderScreenList() {
  const images = activeTargetData().images;
  const list = document.querySelector("#screenList");
  setTextContent("#sourceCount", `${String(images.length).padStart(2, "0")} / ${MAX_IMAGES}`);
  if (!images.length) {
    list.innerHTML = `<div class="empty-list">${esc(t("emptyScreens"))}</div>`;
    return;
  }
  list.innerHTML = images.map((item, index) => `
    <div class="screen-row" data-image-id="${item.id}">
      <img class="screen-preview" src="${item.url}" alt="">
      <div class="screen-name-wrap">
        <span class="screen-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="screen-name" title="${esc(item.name)}">${esc(item.name)}</span>
      </div>
      <div class="screen-actions">
        <button type="button" class="mini-button" data-action="move-up" data-index="${index}" title="${esc(t("moveUp"))}" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" class="mini-button" data-action="move-down" data-index="${index}" title="${esc(t("moveDown"))}" ${index === images.length - 1 ? "disabled" : ""}>↓</button>
        <button type="button" class="mini-button" data-action="fit" data-index="${index}" title="${esc(t("imageFitToggle"))}">${item.fit === "cover" ? t("fitCoverShort") : t("fitContainShort")}</button>
        <button type="button" class="mini-button delete" data-action="delete" data-index="${index}" title="${esc(t("delete"))}">×</button>
      </div>
    </div>`).join("");
}

function renderCopyPanel() {
  const locale = currentLocale();
  const copy = getCopy(locale.code, state.activeSlide);
  const images = activeTargetData().images;
  const count = Math.max(images.length, 1);
  setTextContent("#copyCount", `${String(state.locales.indexOf(locale) + 1).padStart(2, "0")} / ${String(state.locales.length).padStart(2, "0")}`);
  setTextContent("#currentSlideLabel", `${t("currentSlide")} ${String(state.activeSlide + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")} · ${locale.code}`);
  setTextContent("#characterCount", `${(copy.title.length + copy.subtitle.length)} / 240`);
  document.querySelector("#titleInput").value = copy.title;
  document.querySelector("#subtitleInput").value = copy.subtitle;
  const pills = document.querySelector("#localePills");
  pills.innerHTML = state.locales.map(item => `<button type="button" class="locale-pill ${item.code === state.activeLocale ? "is-active" : ""}" data-locale-code="${esc(item.code)}">${esc(item.code.split("-")[0].toUpperCase())}</button>`).join("");
}

function renderLocaleList() {
  const list = document.querySelector("#localeList");
  setTextContent("#localeCount", String(state.locales.length).padStart(2, "0"));
  list.innerHTML = state.locales.map(locale => {
    const ready = locale.slides.some(item => item.title.trim() || item.subtitle.trim());
    return `<div class="locale-row ${locale.code === state.activeLocale ? "is-active" : ""} ${locale.custom ? "custom" : ""}" data-locale-code="${esc(locale.code)}">
      <div class="locale-info"><span class="locale-code">${esc(locale.code.split("-")[0].toUpperCase())}</span><span class="locale-name">${esc(locale.name)}</span></div>
      <span class="locale-ready" title="${esc(ready ? t("ready") : t("blank"))}"></span>
      ${locale.custom ? `<button type="button" class="mini-button locale-delete" data-action="delete-locale" data-locale-code="${esc(locale.code)}" title="${esc(t("delete"))}">×</button>` : ""}
    </div>`;
  }).join("");
}

function renderExportTargets() {
  const list = document.querySelector("#exportTargets");
  list.innerHTML = Object.values(SPECS).map(spec => {
    const target = state.targets[spec.id];
    const dimensions = getSpec(spec.id, target.orientation);
    return `<label class="export-target">
      <input type="checkbox" data-export-target="${spec.id}" ${state.exportTargets.includes(spec.id) ? "checked" : ""}>
      <span class="export-target-info"><span>${esc(spec.label[state.uiLocale] || spec.label["en-US"])}</span><small>${dimensions.width} × ${dimensions.height} · ${target.images.length} ${state.uiLocale === "zh-CN" ? "张" : "screens"}</small></span>
    </label>`;
  }).join("");
}

async function renderPreview() {
  const token = ++renderToken;
  const spec = activeSpec();
  const target = activeTargetData();
  const image = target.images[state.activeSlide] || null;
  const previewScale = Math.min(1, PREVIEW_EDGE / Math.max(spec.width, spec.height));
  const canvas = await renderSlide({
    targetId: state.activeTarget,
    spec,
    target,
    template: getTemplate(target.templateId),
    sourceImage: image,
    secondaryImage: target.images[(state.activeSlide + 1) % Math.max(target.images.length, 1)] || null,
    localeCopy: getCopy(state.activeLocale, state.activeSlide),
    locale: currentLocale(),
    scale: previewScale
  });
  if (token !== renderToken) return;
  const preview = document.querySelector("#previewCanvas");
  preview.width = canvas.width;
  preview.height = canvas.height;
  preview.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
  preview.getContext("2d").drawImage(canvas, 0, 0);
  renderCanvasEmpty();
}

function renderUI() {
  applyUiLanguage();
  renderTargetSwitch();
  renderOrientation();
  renderTemplates();
  renderAssetSelect();
  renderStageHeader();
  renderSlideStrip();
  renderScreenList();
  renderCopyPanel();
  renderLocaleList();
  renderExportTargets();
  renderPreview();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setExportStatus(message, error = false) {
  const element = document.querySelector("#exportProgress");
  element.textContent = message;
  element.classList.toggle("is-error", error);
}

function setActiveTarget(targetId) {
  if (!SPECS[targetId]) return;
  state.activeTarget = targetId;
  state.activeSlide = 0;
  state.previewZoom = 1;
  if (!state.exportTargets.length) state.exportTargets = [targetId];
  renderUI();
}

function selectSlide(index) {
  const count = Math.max(activeTargetData().images.length, 1);
  state.activeSlide = Math.max(0, Math.min(index, count - 1));
  renderSlideStrip();
  renderCopyPanel();
  renderPreview();
}

function swapImages(from, to) {
  const images = activeTargetData().images;
  if (!images[from] || !images[to]) return;
  [images[from], images[to]] = [images[to], images[from]];
  if (state.activeSlide === from) state.activeSlide = to;
  else if (state.activeSlide === to) state.activeSlide = from;
  renderUI();
}

async function fileToImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Unable to read image"));
      element.src = url;
    });
    return { id: uid("image"), name: file.name || t("localFile"), url, image, fit: "contain" };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function addFiles(fileList) {
  const files = Array.from(fileList || []);
  const images = activeTargetData().images;
  const available = MAX_IMAGES - images.length;
  const accepted = files.filter(file => /^image\/(png|jpeg|webp)$/i.test(file.type)).slice(0, Math.max(available, 0));
  const skipped = files.length - accepted.length;
  if (!accepted.length) {
    if (skipped) showToast(t("invalidFile"));
    else showToast(t("uploadLimit"));
    return;
  }
  const loaded = [];
  for (const file of accepted) {
    try { loaded.push(await fileToImage(file)); } catch (error) { /* ignore unreadable image */ }
  }
  images.push(...loaded);
  ensureCopyLength(images.length);
  state.activeSlide = Math.min(state.activeSlide, images.length - 1);
  renderUI();
  showToast(t("uploadAdded", { count: loaded.length }));
  if (skipped) window.setTimeout(() => showToast(t("uploadLimit")), 3300);
}

function removeImage(index) {
  const images = activeTargetData().images;
  const item = images[index];
  if (!item) return;
  URL.revokeObjectURL(item.url);
  images.splice(index, 1);
  state.activeSlide = Math.min(state.activeSlide, Math.max(images.length - 1, 0));
  renderUI();
}

function updateCopy(field, value) {
  const copy = getCopy(state.activeLocale, state.activeSlide);
  copy[field] = value;
  renderCopyPanel();
  renderLocaleList();
  renderPreview();
}

function addLocale() {
  const raw = window.prompt(t("localePrompt"));
  if (!raw) return;
  const code = raw.trim();
  if (!/^[a-z]{2,3}(?:-[A-Z][a-z]{1,4})?$/.test(code)) {
    showToast(t("localePrompt"));
    return;
  }
  if (state.locales.some(locale => locale.code.toLowerCase() === code.toLowerCase())) {
    showToast(t("localeExists"));
    return;
  }
  const locale = makeLocale(code, true);
  locale.name = code;
  state.locales.push(locale);
  state.activeLocale = code;
  ensureCopyLength(Math.max(activeTargetData().images.length, 1));
  renderUI();
  showToast(t("localeAdded", { code }));
}

function deleteLocale(code) {
  if (!state.locales.find(locale => locale.code === code)?.custom) return;
  state.locales = state.locales.filter(locale => locale.code !== code);
  if (state.activeLocale === code) state.activeLocale = state.locales[0].code;
  renderUI();
  showToast(t("localeRemoved"));
}

function drawRoundedPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRounded(ctx, x, y, width, height, radius, color) {
  drawRoundedPath(ctx, x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRounded(ctx, x, y, width, height, radius, color, lineWidth = 1) {
  drawRoundedPath(ctx, x, y, width, height, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawImageCover(ctx, image, x, y, width, height) {
  if (!image) return;
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  if (!sourceWidth || !sourceHeight) return;
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawImageInBox(ctx, item, x, y, width, height, background = "#121721") {
  fillRounded(ctx, x, y, width, height, Math.min(width, height) * .04, background);
  if (!item?.image) {
    drawPlaceholder(ctx, x, y, width, height);
    return;
  }
  const image = item.image;
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const fit = item.fit || "contain";
  ctx.save();
  drawRoundedPath(ctx, x, y, width, height, Math.min(width, height) * .04);
  ctx.clip();
  if (fit === "cover") {
    drawImageCover(ctx, image, x, y, width, height);
  } else {
    const scale = Math.min(width / sourceWidth, height / sourceHeight);
    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;
    ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  }
  ctx.restore();
}

function drawPlaceholder(ctx, x, y, width, height) {
  ctx.save();
  ctx.globalAlpha = .7;
  ctx.setLineDash([8, 8]);
  strokeRounded(ctx, x + width * .12, y + height * .12, width * .76, height * .76, Math.min(width, height) * .04, "rgba(200, 213, 238, .35)", 2);
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(220, 228, 244, .65)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${Math.max(12, Math.min(width, height) * .045)}px ${FONT_STACK}`;
  ctx.fillText("ADD SCREENSHOT", x + width / 2, y + height / 2);
  ctx.restore();
}

function drawBackground(ctx, width, height, assetId, overlay = null) {
  const asset = getAsset(assetId);
  ctx.fillStyle = asset.fallback;
  ctx.fillRect(0, 0, width, height);
  const image = assetImages[assetId];
  if (image) {
    ctx.save();
    ctx.globalAlpha = .96;
    drawImageCover(ctx, image, 0, 0, width, height);
    ctx.restore();
  }
  if (overlay) {
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, width, height);
  }
}

function drawSafeGrid(ctx, width, height, color = "rgba(255,255,255,.18)") {
  const left = width * SAFE;
  const top = height * SAFE;
  const right = width - left;
  const bottom = height - top;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, width / 1800);
  ctx.setLineDash([5, 9]);
  ctx.strokeRect(left, top, right - left, bottom - top);
  ctx.setLineDash([]);
  ctx.restore();
}

function drawRule(ctx, x, y, width, color, lineWidth = 1) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.stroke();
  ctx.restore();
}

function drawSmallLabel(ctx, text, x, y, color, align = "left") {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  ctx.font = `700 11px ${FONT_STACK}`;
  ctx.letterSpacing = "2px";
  ctx.fillText(text.toUpperCase(), x, y);
  ctx.restore();
}

function wrapLines(ctx, text, maxWidth) {
  const value = String(text || "").trim();
  if (!value) return [];
  const lines = [];
  let line = "";
  for (const character of Array.from(value)) {
    const test = line + character;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = character;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fitText(ctx, text, maxWidth, startSize, maxLines = 3, weight = 700) {
  let size = startSize;
  let lines = [];
  while (size >= 14) {
    ctx.font = `${weight} ${size}px ${FONT_STACK}`;
    lines = wrapLines(ctx, text, maxWidth);
    if (lines.length <= maxLines) break;
    size -= 2;
  }
  return { size, lines: lines.slice(0, maxLines), lineHeight: size * 1.08 };
}

function drawTextBlock(ctx, text, x, y, width, startSize, color, options = {}) {
  const maxLines = options.maxLines || 3;
  const weight = options.weight || 700;
  const align = options.align || "left";
  const baseline = options.baseline || "top";
  const block = fitText(ctx, text, width, startSize, maxLines, weight);
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.font = `${weight} ${block.size}px ${FONT_STACK}`;
  block.lines.forEach((line, index) => ctx.fillText(line, x, y + index * block.lineHeight));
  ctx.restore();
  return block;
}

function drawSubtitle(ctx, text, x, y, width, color, align = "left") {
  const block = fitText(ctx, text, width, Math.max(18, width * .032), 3, 450);
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  ctx.font = `450 ${block.size}px ${FONT_STACK}`;
  block.lines.forEach((line, index) => ctx.fillText(line, x, y + index * block.lineHeight));
  ctx.restore();
  return block;
}

function shadowed(ctx, draw) {
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, .34)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 18;
  draw();
  ctx.restore();
}

function drawPhone(ctx, item, x, y, width, height) {
  const radius = Math.min(width, height) * .14;
  const bezel = Math.max(8, Math.min(width, height) * .026);
  shadowed(ctx, () => fillRounded(ctx, x, y, width, height, radius, "#101217"));
  fillRounded(ctx, x + 2, y + 2, width - 4, height - 4, radius - 2, "#1b1c21");
  const screenX = x + bezel;
  const screenY = y + bezel;
  const screenWidth = width - bezel * 2;
  const screenHeight = height - bezel * 2;
  drawImageInBox(ctx, item, screenX, screenY, screenWidth, screenHeight, "#090b10");
  strokeRounded(ctx, x + 2, y + 2, width - 4, height - 4, radius - 2, "rgba(255,255,255,.19)", Math.max(1, width / 370));
  const notchWidth = Math.min(width * .34, 145);
  const notchHeight = Math.max(11, height * .025);
  fillRounded(ctx, x + (width - notchWidth) / 2, y + bezel * .45, notchWidth, notchHeight, notchHeight / 2, "#050609");
  if (width > height) {
    fillRounded(ctx, x + width * .012, y + height * .37, Math.max(3, width * .008), height * .24, 3, "#090a0e");
  }
}

function drawPad(ctx, item, x, y, width, height) {
  const radius = Math.min(width, height) * .075;
  const bezel = Math.max(10, Math.min(width, height) * .028);
  shadowed(ctx, () => fillRounded(ctx, x, y, width, height, radius, "#22252a"));
  drawImageInBox(ctx, item, x + bezel, y + bezel, width - bezel * 2, height - bezel * 2, "#11151d");
  strokeRounded(ctx, x + 2, y + 2, width - 4, height - 4, radius - 2, "rgba(255,255,255,.2)", Math.max(1, width / 420));
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.beginPath();
  ctx.arc(x + width / 2, y + bezel * .5, Math.max(2, bezel * .12), 0, Math.PI * 2);
  ctx.fill();
}

function drawMac(ctx, item, x, y, width, height) {
  const radius = Math.min(width, height) * .045;
  const barHeight = Math.max(22, height * .075);
  shadowed(ctx, () => fillRounded(ctx, x, y, width, height * .86, radius, "#20242d"));
  fillRounded(ctx, x + 2, y + 2, width - 4, height * .86 - 4, radius - 2, "#313741");
  fillRounded(ctx, x + 3, y + 3, width - 6, barHeight, radius - 2, "#e9edf2");
  ["#ff6e63", "#ffca57", "#57c95a"].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 19 + index * 16, y + barHeight / 2 + 1, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  drawImageInBox(ctx, item, x + 5, y + barHeight + 3, width - 10, height * .86 - barHeight - 8, "#f4f5f7");
  ctx.fillStyle = "#8b919c";
  ctx.beginPath();
  ctx.moveTo(x + width * .42, y + height * .86);
  ctx.lineTo(x + width * .58, y + height * .86);
  ctx.lineTo(x + width * .66, y + height * .98);
  ctx.lineTo(x + width * .34, y + height * .98);
  ctx.closePath();
  ctx.fill();
  fillRounded(ctx, x + width * .27, y + height * .975, width * .46, Math.max(5, height * .025), 5, "#a5aab3");
}

function drawDevice(ctx, kind, item, x, y, width, height) {
  if (kind === "mac") drawMac(ctx, item, x, y, width, height);
  else if (kind === "ipad") drawPad(ctx, item, x, y, width, height);
  else drawPhone(ctx, item, x, y, width, height);
}

function deviceBox(spec, width, height, x, y) {
  const ratio = spec.kind === "mac"
    ? 1.6
    : spec.orientation === "landscape"
      ? (spec.kind === "ipad" ? 1.5 : 2.17)
      : (spec.kind === "ipad" ? 1.35 : .46);
  const deviceHeight = height;
  return { x, y, width: Math.min(width, deviceHeight * ratio), height: deviceHeight };
}

function renderEditorial(ctx, layout) {
  const { width, height, spec, sourceImage, copy, assetId, slideNumber } = layout;
  const isLandscape = width > height;
  const asset = getAsset(assetId);
  drawBackground(ctx, width, height, assetId, "rgba(244, 239, 229, .08)");
  drawSafeGrid(ctx, width, height, "rgba(39, 55, 75, .18)");
  drawSmallLabel(ctx, `STORE / ${String(slideNumber).padStart(2, "0")}`, width * SAFE, height * SAFE, "rgba(39, 55, 75, .66)");
  if (isLandscape) {
    const textX = width * .095;
    drawTextBlock(ctx, copy.title || "Your app, clearly framed", textX, height * .27, width * .35, height * .078, "#172131", { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "A clear story for every screen.", textX, height * .58, width * .29, "rgba(23, 33, 49, .68)");
    drawRule(ctx, textX, height * .78, width * .13, "rgba(23, 33, 49, .4)", 2);
    const box = deviceBox(spec, width * .53, height * .72, width * .43, height * .18);
    drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  } else {
    drawTextBlock(ctx, copy.title || "Your app, clearly framed", width * SAFE, height * .14, width * .8, width * .071, "#172131", { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "A clear story for every screen.", width * SAFE, height * .29, width * .72, "rgba(23, 33, 49, .68)");
    const box = deviceBox(spec, width * .65, height * .57, width * .175, height * .38);
    drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
    drawRule(ctx, width * SAFE, height * .92, width * .17, "rgba(23, 33, 49, .36)", 2);
    drawSmallLabel(ctx, asset.label[state.uiLocale] || asset.label["en-US"], width * SAFE, height * .94, "rgba(23, 33, 49, .52)");
  }
}

function renderQuiet(ctx, layout) {
  const { width, height, spec, sourceImage, copy, slideNumber } = layout;
  drawBackground(ctx, width, height, "paper-quiet", "rgba(248, 246, 239, .1)");
  const ink = "#1d2a3c";
  drawSmallLabel(ctx, `SCREEN ${String(slideNumber).padStart(2, "0")} / PRODUCT`, width / 2, height * .075, "rgba(29, 42, 60, .5)", "center");
  const title = drawTextBlock(ctx, copy.title || "Your app, clearly framed", width / 2, height * .13, width * .75, width * .072, ink, { maxLines: 3, align: "center" });
  drawSubtitle(ctx, copy.subtitle || "A little more room for what matters.", width / 2, height * (.13 + title.lineHeight * title.lines.length / height + .035), width * .62, "rgba(29, 42, 60, .62)", "center");
  const isLandscape = width > height;
  const box = isLandscape ? deviceBox(spec, width * .69, height * .61, width * .155, height * .29) : deviceBox(spec, width * .58, height * .57, width * .21, height * .34);
  drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  ctx.save();
  ctx.strokeStyle = "rgba(29, 42, 60, .28)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(width * .13, height * .88, width * .045, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  drawSmallLabel(ctx, "STOREFRAME", width * .19, height * .868, "rgba(29, 42, 60, .44)");
}

function renderDark(ctx, layout) {
  const { width, height, spec, sourceImage, copy, slideNumber } = layout;
  drawBackground(ctx, width, height, "ink-night", "rgba(4, 7, 16, .08)");
  const ink = "#f4f6ff";
  drawSmallLabel(ctx, `DARK MODE / ${String(slideNumber).padStart(2, "0")}`, width * SAFE, height * SAFE, "rgba(193, 211, 255, .62)");
  if (width > height) {
    drawTextBlock(ctx, copy.title || "Focus, without the noise", width * SAFE, height * .26, width * .35, height * .085, ink, { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "A quiet place for the next important thing.", width * SAFE, height * .62, width * .31, "rgba(234, 240, 255, .68)");
    const box = deviceBox(spec, width * .5, height * .75, width * .45, height * .13);
    drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  } else {
    drawTextBlock(ctx, copy.title || "Focus, without the noise", width * SAFE, height * .16, width * .81, width * .075, ink, { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "A quiet place for the next important thing.", width * SAFE, height * .3, width * .72, "rgba(234, 240, 255, .68)");
    const box = deviceBox(spec, width * .62, height * .58, width * .19, height * .38);
    drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  }
  drawRule(ctx, width * SAFE, height * .91, width * .18, "rgba(139, 168, 255, .6)", 2);
}

function renderChromatic(ctx, layout) {
  const { width, height, spec, sourceImage, copy, slideNumber } = layout;
  drawBackground(ctx, width, height, "chromatic-cobalt", "rgba(23, 47, 191, .03)");
  drawSafeGrid(ctx, width, height, "rgba(255,255,255,.22)");
  drawSmallLabel(ctx, `FEATURE / ${String(slideNumber).padStart(2, "0")}`, width * SAFE, height * SAFE, "rgba(255,255,255,.75)");
  if (width > height) {
    drawTextBlock(ctx, copy.title || "A brighter way to work", width * SAFE, height * .2, width * .37, height * .08, "#fff", { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "Designed to keep the good things moving.", width * SAFE, height * .63, width * .3, "rgba(255,255,255,.78)");
    const box = deviceBox(spec, width * .53, height * .75, width * .41, height * .14);
    drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  } else {
    drawTextBlock(ctx, copy.title || "A brighter way to work", width * SAFE, height * .13, width * .82, width * .074, "#fff", { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "Designed to keep the good things moving.", width * SAFE, height * .29, width * .7, "rgba(255,255,255,.78)");
    const box = deviceBox(spec, width * .62, height * .59, width * .19, height * .35);
    drawDevice(ctx, spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  }
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, .7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * .76, height * .11);
  ctx.lineTo(width * .87, height * .11);
  ctx.stroke();
  ctx.restore();
}

function renderGallery(ctx, layout) {
  const { width, height, spec, sourceImage, secondaryImage, copy, slideNumber } = layout;
  drawBackground(ctx, width, height, "lime-ribbon", "rgba(7, 12, 18, .06)");
  const ink = "#f2f8e3";
  drawSmallLabel(ctx, `PAIR / ${String(slideNumber).padStart(2, "0")}`, width * SAFE, height * SAFE, "rgba(242,248,227,.72)");
  if (width > height) {
    drawTextBlock(ctx, copy.title || "Two views, one rhythm", width * SAFE, height * .15, width * .42, height * .08, ink, { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "Let the details tell the story.", width * SAFE, height * .58, width * .32, "rgba(242,248,227,.74)");
    const first = deviceBox(spec, width * .34, height * .68, width * .48, height * .25);
    const second = deviceBox(spec, width * .29, height * .57, width * .68, height * .37);
    drawDevice(ctx, spec.kind, secondaryImage || sourceImage, second.x, second.y, second.width, second.height);
    drawDevice(ctx, spec.kind, sourceImage, first.x, first.y, first.width, first.height);
  } else {
    drawTextBlock(ctx, copy.title || "Two views, one rhythm", width * SAFE, height * .12, width * .79, width * .07, ink, { maxLines: 3 });
    drawSubtitle(ctx, copy.subtitle || "Let the details tell the story.", width * SAFE, height * .27, width * .72, "rgba(242,248,227,.74)");
    const first = deviceBox(spec, width * .52, height * .45, width * .12, height * .43);
    const second = deviceBox(spec, width * .42, height * .37, width * .38, height * .54);
    drawDevice(ctx, spec.kind, secondaryImage || sourceImage, second.x, second.y, second.width, second.height);
    drawDevice(ctx, spec.kind, sourceImage, first.x, first.y, first.width, first.height);
  }
}

function renderMacWindow(ctx, layout) {
  const { width, height, spec, sourceImage, copy, slideNumber } = layout;
  drawBackground(ctx, width, height, "mac-studio", "rgba(243, 242, 237, .08)");
  const ink = "#1c2c40";
  drawSmallLabel(ctx, `DESKTOP / ${String(slideNumber).padStart(2, "0")}`, width * SAFE, height * SAFE, "rgba(28,44,64,.58)");
  drawTextBlock(ctx, copy.title || "More room for the work that matters", width * SAFE, height * .17, width * .78, width * .075, ink, { maxLines: 2 });
  drawSubtitle(ctx, copy.subtitle || "A calm desktop for focused work.", width * SAFE, height * .4, width * .52, "rgba(28,44,64,.66)");
  const box = { x: width * .11, y: height * .52, width: width * .78, height: height * .4 };
  drawDevice(ctx, spec.kind === "mac" ? "mac" : spec.kind, sourceImage, box.x, box.y, box.width, box.height);
  drawRule(ctx, width * .82, height * .19, width * .09, "rgba(28,44,64,.4)", 2);
}

function renderLayout(ctx, layout) {
  switch (layout.template.id) {
    case "quiet-mono": return renderQuiet(ctx, layout);
    case "dark-focus": return renderDark(ctx, layout);
    case "chromatic-field": return renderChromatic(ctx, layout);
    case "gallery-pair": return renderGallery(ctx, layout);
    case "mac-window": return renderMacWindow(ctx, layout);
    case "editorial-split":
    default: return renderEditorial(ctx, layout);
  }
}

async function renderSlide({ targetId, spec, target, template, sourceImage, secondaryImage, localeCopy, locale, slideNumber = state.activeSlide + 1, scale = 1 }) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(spec.width * scale));
  canvas.height = Math.max(1, Math.round(spec.height * scale));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  renderLayout(ctx, {
    width: spec.width,
    height: spec.height,
    spec,
    targetId,
    target,
    template,
    sourceImage,
    secondaryImage,
    copy: localeCopy,
    locale,
    assetId: target.assetId || template.asset,
    slideNumber
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return canvas;
}

function canvasToJpeg(canvas, quality = .95) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("JPEG export unavailable")), "image/jpeg", quality);
  });
}

function crc32(data) {
  let crc = 0xffffffff;
  for (let index = 0; index < data.length; index += 1) {
    crc ^= data[index];
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

function createZip(entries) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const { time, date } = dosDateTime();
  return Promise.all(entries.map(async entry => ({ ...entry, data: new Uint8Array(await entry.blob.arrayBuffer()) }))).then(items => {
    items.forEach(entry => {
      const name = encoder.encode(entry.name);
      const data = entry.data;
      const crc = crc32(data);
      const local = new Uint8Array(30);
      const localView = new DataView(local.buffer);
      localView.setUint32(0, 0x04034b50, true);
      localView.setUint16(4, 20, true);
      localView.setUint16(6, 0, true);
      localView.setUint16(8, 0, true);
      localView.setUint16(10, time, true);
      localView.setUint16(12, date, true);
      localView.setUint32(14, crc, true);
      localView.setUint32(18, data.length, true);
      localView.setUint32(22, data.length, true);
      localView.setUint16(26, name.length, true);
      localView.setUint16(28, 0, true);
      localParts.push(local, name, data);

      const central = new Uint8Array(46);
      const centralView = new DataView(central.buffer);
      centralView.setUint32(0, 0x02014b50, true);
      centralView.setUint16(4, 20, true);
      centralView.setUint16(6, 20, true);
      centralView.setUint16(8, 0, true);
      centralView.setUint16(10, 0, true);
      centralView.setUint16(12, time, true);
      centralView.setUint16(14, date, true);
      centralView.setUint32(16, crc, true);
      centralView.setUint32(20, data.length, true);
      centralView.setUint32(24, data.length, true);
      centralView.setUint16(28, name.length, true);
      centralView.setUint16(30, 0, true);
      centralView.setUint16(32, 0, true);
      centralView.setUint16(34, 0, true);
      centralView.setUint16(36, 0, true);
      centralView.setUint32(38, 0, true);
      centralView.setUint32(42, offset, true);
      centralParts.push(central, name);
      offset += local.byteLength + name.length + data.length;
    });
    const centralSize = centralParts.reduce((sum, part) => sum + part.byteLength, 0);
    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(8, items.length, true);
    endView.setUint16(10, items.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);
    return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 12000);
}

function safeFilePart(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "screen";
}

async function exportBatch() {
  const selectedTargets = Array.from(document.querySelectorAll("[data-export-target]:checked")).map(input => input.dataset.exportTarget);
  state.exportTargets = selectedTargets;
  if (!selectedTargets.length) {
    setExportStatus(t("noSelectedTarget"), true);
    showToast(t("noSelectedTarget"));
    return;
  }
  const validTargets = selectedTargets.filter(targetId => state.targets[targetId].images.length);
  const skippedTargets = selectedTargets.filter(targetId => !state.targets[targetId].images.length);
  if (!validTargets.length) {
    setExportStatus(t("exportNoImages"), true);
    showToast(t("exportNoImages"));
    return;
  }
  const button = document.querySelector("#exportButton");
  button.disabled = true;
  setExportStatus(t("exportPreparing"));
  const entries = [];
  try {
    for (const targetId of validTargets) {
      const target = state.targets[targetId];
      const spec = getSpec(targetId);
      const template = getTemplate(target.templateId);
      for (const locale of state.locales) {
        for (let index = 0; index < target.images.length; index += 1) {
          setExportStatus(`${t("exportRendering")} ${spec.short} · ${locale.code} · ${index + 1}/${target.images.length}`);
          const canvas = await renderSlide({
            targetId,
            spec,
            target,
            template,
            sourceImage: target.images[index],
            secondaryImage: target.images[(index + 1) % target.images.length],
            localeCopy: getCopy(locale.code, index),
            locale,
            slideNumber: index + 1,
            scale: 1
          });
          const blob = await canvasToJpeg(canvas);
          entries.push({
            name: `${safeFilePart(targetId)}_${safeFilePart(locale.code)}_${String(index + 1).padStart(2, "0")}.jpg`,
            blob
          });
        }
      }
    }
    if (!entries.length) throw new Error("No entries");
    setExportStatus(t("exportCompressing"));
    const zip = await createZip(entries);
    downloadBlob(zip, `storeframe-${new Date().toISOString().slice(0, 10)}.zip`);
    setExportStatus(t("exportDone", { count: entries.length }));
    showToast(t("exportDone", { count: entries.length }));
  } catch (error) {
    console.error(error);
    if (entries.length) {
      entries.forEach((entry, index) => window.setTimeout(() => downloadBlob(entry.blob, entry.name), index * 120));
      setExportStatus(t("exportFallback"), true);
      showToast(t("exportFallback"));
    } else {
      setExportStatus(t("exportFailed"), true);
      showToast(t("exportFailed"));
    }
  } finally {
    button.disabled = false;
  }
  if (skippedTargets.length) {
    const names = skippedTargets.map(targetId => SPECS[targetId].short).join(", ");
    window.setTimeout(() => showToast(t("targetMissingImages", { target: names })), 3500);
  }
}

function resetProject() {
  if (!window.confirm(t("resetConfirm"))) return;
  Object.values(state.targets).forEach(target => target.images.forEach(item => URL.revokeObjectURL(item.url)));
  state = createInitialState();
  renderUI();
  showToast(t("projectReset"));
}

function handleScreenAction(action, index) {
  if (action === "delete") removeImage(index);
  if (action === "move-up") swapImages(index, index - 1);
  if (action === "move-down") swapImages(index, index + 1);
  if (action === "fit") {
    const item = activeTargetData().images[index];
    if (item) item.fit = item.fit === "cover" ? "contain" : "cover";
    renderUI();
  }
}

function bindEvents() {
  document.querySelectorAll("[data-ui-lang]").forEach(button => {
    button.addEventListener("click", () => {
      state.uiLocale = button.dataset.uiLang;
      renderUI();
    });
  });
  document.querySelector("#targetSwitch").addEventListener("click", event => {
    const button = event.target.closest("[data-target-id]");
    if (button) setActiveTarget(button.dataset.targetId);
  });
  document.querySelector("#orientationSelect").addEventListener("change", event => {
    activeTargetData().orientation = event.target.value;
    renderUI();
  });
  document.querySelector("#templateGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-template-id]");
    if (!button) return;
    activeTargetData().templateId = button.dataset.templateId;
    if (activeTargetData().assetId === getTemplate(button.dataset.templateId).asset) activeTargetData().assetId = getTemplate(button.dataset.templateId).asset;
    renderUI();
  });
  document.querySelector("#assetSelect").addEventListener("change", event => {
    activeTargetData().assetId = event.target.value;
    renderPreview();
  });
  document.querySelector("#fileInput").addEventListener("change", event => {
    addFiles(event.target.files);
    event.target.value = "";
  });
  const dropzone = document.querySelector("#dropzone");
  ["dragenter", "dragover"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.add("is-dragging"); }));
  ["dragleave", "drop"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.remove("is-dragging"); }));
  dropzone.addEventListener("drop", event => addFiles(event.dataTransfer.files));
  window.addEventListener("paste", event => {
    const files = Array.from(event.clipboardData?.items || []).filter(item => item.type.startsWith("image/")).map(item => item.getAsFile()).filter(Boolean);
    if (files.length) addFiles(files);
  });
  document.querySelector("#screenList").addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (button) handleScreenAction(button.dataset.action, Number(button.dataset.index));
  });
  document.querySelector("#slideStrip").addEventListener("click", event => {
    const button = event.target.closest("[data-slide-index]");
    if (button) selectSlide(Number(button.dataset.slideIndex));
  });
  document.querySelector("#previousSlide").addEventListener("click", () => selectSlide(state.activeSlide - 1));
  document.querySelector("#nextSlide").addEventListener("click", () => selectSlide(state.activeSlide + 1));
  document.querySelector("#titleInput").addEventListener("input", event => updateCopy("title", event.target.value));
  document.querySelector("#subtitleInput").addEventListener("input", event => updateCopy("subtitle", event.target.value));
  document.querySelector("#localePills").addEventListener("click", event => {
    const button = event.target.closest("[data-locale-code]");
    if (!button) return;
    state.activeLocale = button.dataset.localeCode;
    renderCopyPanel();
    renderLocaleList();
    renderPreview();
  });
  document.querySelector("#localeList").addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-action='delete-locale']");
    if (deleteButton) {
      event.stopPropagation();
      deleteLocale(deleteButton.dataset.localeCode);
      return;
    }
    const row = event.target.closest("[data-locale-code]");
    if (row) {
      state.activeLocale = row.dataset.localeCode;
      renderCopyPanel();
      renderLocaleList();
      renderPreview();
    }
  });
  document.querySelector("#addLocaleButton").addEventListener("click", addLocale);
  document.querySelector("#exportTargets").addEventListener("change", event => {
    if (!event.target.matches("[data-export-target]")) return;
    state.exportTargets = Array.from(document.querySelectorAll("[data-export-target]:checked")).map(input => input.dataset.exportTarget);
  });
  document.querySelector("#exportButton").addEventListener("click", exportBatch);
  document.querySelector("#resetButton").addEventListener("click", resetProject);
  document.querySelector("#zoomOutButton").addEventListener("click", () => { state.previewZoom = Math.max(.82, +(state.previewZoom - .08).toFixed(2)); renderStageHeader(); });
  document.querySelector("#zoomInButton").addEventListener("click", () => { state.previewZoom = Math.min(1.18, +(state.previewZoom + .08).toFixed(2)); renderStageHeader(); });
}

async function loadAssets() {
  await Promise.all(Object.entries(ASSETS).map(([id, asset]) => new Promise(resolve => {
    const image = new Image();
    image.onload = () => { assetImages[id] = image; resolve(); };
    image.onerror = () => resolve();
    image.src = `${ASSET_BASE}${asset.file}`;
  })));
}

async function init() {
  bindEvents();
  renderUI();
  await loadAssets();
  renderPreview();
}

window.Storeframe = {
  SPECS,
  TEMPLATES,
  getState: () => state,
  renderSlide,
  exportBatch
};

init();
