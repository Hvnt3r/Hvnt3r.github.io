const UI = {
  "zh-CN": {
    brandTagline: "Apple 图标批量工作台",
    localOnly: "本地处理",
    backToSite: "返回站点",
    sourceKicker: "SOURCE / 01",
    pageTitle: "应用图标生成器",
    pageIntro: "上传 Icon Composer 导出的 PNG，中心缩放并生成完整的 Xcode AppIcon 资源。",
    sourceLabel: "源图标",
    dropzoneTitle: "拖入 1024 × 1024 PNG",
    dropzoneBody: "透明 PNG · 推荐至少 1024 px",
    pasteHint: "也可以直接粘贴 PNG",
    platformLabel: "目标平台",
    macSpec: "10 个 macOS 图标槽位 · 16–1024 px · @1x / @2x",
    iosSpec: "18 个 iPhone / iPad / App Store 图标槽位 · 20–1024 px",
    scaleLabel: "图标比例",
    centerScale: "中心等比缩放",
    scaleHint: "画布尺寸不会改变；缩小时新增的四周区域保持透明。",
    previewKicker: "LIVE PREVIEW",
    previewMeta: "1024 × 1024 · 透明 PNG",
    alphaKey: "透明区域",
    canvasEmptyTitle: "先放入一枚图标",
    canvasEmptyBody: "预览会显示缩放后的透明边缘",
    renderCaption: "Canvas 实时渲染",
    paddingCaption: "边缘留白 {px} px",
    stageFootnote: "缩放以画布中心为锚点；导出时会为每个规格重新绘制，避免二次缩放累积。",
    outputsLabel: "输出规格",
    xcodeReady: "Xcode AppIcon.appiconset",
    files: "FILES",
    exportLabel: "批量导出",
    formatLabel: "格式",
    layoutLabel: "结构",
    exportButton: "导出 AppIcon ZIP",
    exportHelp: "解压后，把 AppIcon.appiconset 拖入 Xcode 的 Assets.xcassets 即可。",
    checkLabel: "导出检查",
    checkImageLabel: "已读取正方形 PNG",
    checkResolutionLabel: "源图达到最大导出尺寸",
    checkAlphaLabel: "透明画布已启用",
    footerCopy: "一枚源图，完整交付。",
    noUpload: "你的图标不会离开浏览器",
    invalidType: "请选择 PNG 图片。",
    invalidImage: "无法读取这张图片，请换一张 PNG。",
    nonSquare: "源图不是正方形，已居中完整显示。",
    lowResolution: "源图小于 1024 px，最大规格可能不够清晰。",
    loaded: "已读取 {width} × {height} PNG",
    exportPreparing: "正在准备透明画布…",
    exportRendering: "正在生成 {current} / {total}",
    exportPacking: "正在打包 AppIcon.appiconset…",
    exportDone: "导出完成，共 {count} 个 PNG",
    exportFailed: "导出失败，请重新载入图片后再试。",
    sourceReady: "READY",
    sourcePng: "PNG"
  },
  "en-US": {
    brandTagline: "Apple icon batch studio",
    localOnly: "Local only",
    backToSite: "Back to site",
    sourceKicker: "SOURCE / 01",
    pageTitle: "App icon generator",
    pageIntro: "Upload an Icon Composer PNG, scale it from the center, and build a complete Xcode AppIcon set.",
    sourceLabel: "Source icon",
    dropzoneTitle: "Drop a 1024 × 1024 PNG",
    dropzoneBody: "Transparent PNG · 1024 px or larger recommended",
    pasteHint: "You can also paste a PNG",
    platformLabel: "Target platform",
    macSpec: "10 macOS icon slots · 16–1024 px · @1x / @2x",
    iosSpec: "18 iPhone / iPad / App Store slots · 20–1024 px",
    scaleLabel: "Icon scale",
    centerScale: "Centered proportional scale",
    scaleHint: "Canvas size stays fixed; new space around a scaled-down icon remains transparent.",
    previewKicker: "LIVE PREVIEW",
    previewMeta: "1024 × 1024 · transparent PNG",
    alphaKey: "Transparent area",
    canvasEmptyTitle: "Add a source icon",
    canvasEmptyBody: "Preview reveals the transparent padding",
    renderCaption: "Canvas live render",
    paddingCaption: "Edge padding {px} px",
    stageFootnote: "Scaling is anchored to the canvas center. Every size is rendered from the source to avoid cumulative resampling.",
    outputsLabel: "Output sizes",
    xcodeReady: "Xcode AppIcon.appiconset",
    files: "FILES",
    exportLabel: "Batch export",
    formatLabel: "Format",
    layoutLabel: "Layout",
    exportButton: "Export AppIcon ZIP",
    exportHelp: "Unzip, then drag AppIcon.appiconset into Xcode's Assets.xcassets.",
    checkLabel: "Export checks",
    checkImageLabel: "Square PNG loaded",
    checkResolutionLabel: "Source meets largest output size",
    checkAlphaLabel: "Transparent canvas enabled",
    footerCopy: "One source, a complete delivery.",
    noUpload: "Your icon never leaves this browser",
    invalidType: "Please choose a PNG image.",
    invalidImage: "This image could not be read. Try another PNG.",
    nonSquare: "The source is not square and will be centered with contain fit.",
    lowResolution: "The source is under 1024 px; the largest output may look soft.",
    loaded: "Loaded {width} × {height} PNG",
    exportPreparing: "Preparing transparent canvases…",
    exportRendering: "Rendering {current} / {total}",
    exportPacking: "Packing AppIcon.appiconset…",
    exportDone: "Export complete: {count} PNG files",
    exportFailed: "Export failed. Reload the image and try again.",
    sourceReady: "READY",
    sourcePng: "PNG"
  }
};

const MAC_SLOTS = [
  { idiom: "mac", size: "16x16", scale: "1x", pixels: 16, filename: "icon_16x16.png" },
  { idiom: "mac", size: "16x16", scale: "2x", pixels: 32, filename: "icon_16x16@2x.png" },
  { idiom: "mac", size: "32x32", scale: "1x", pixels: 32, filename: "icon_32x32.png" },
  { idiom: "mac", size: "32x32", scale: "2x", pixels: 64, filename: "icon_32x32@2x.png" },
  { idiom: "mac", size: "128x128", scale: "1x", pixels: 128, filename: "icon_128x128.png" },
  { idiom: "mac", size: "128x128", scale: "2x", pixels: 256, filename: "icon_128x128@2x.png" },
  { idiom: "mac", size: "256x256", scale: "1x", pixels: 256, filename: "icon_256x256.png" },
  { idiom: "mac", size: "256x256", scale: "2x", pixels: 512, filename: "icon_256x256@2x.png" },
  { idiom: "mac", size: "512x512", scale: "1x", pixels: 512, filename: "icon_512x512.png" },
  { idiom: "mac", size: "512x512", scale: "2x", pixels: 1024, filename: "icon_512x512@2x.png" }
];

const IOS_SLOTS = [
  { idiom: "iphone", size: "20x20", scale: "2x", pixels: 40, filename: "icon_20x20@2x.png" },
  { idiom: "iphone", size: "20x20", scale: "3x", pixels: 60, filename: "icon_20x20@3x.png" },
  { idiom: "iphone", size: "29x29", scale: "2x", pixels: 58, filename: "icon_29x29@2x.png" },
  { idiom: "iphone", size: "29x29", scale: "3x", pixels: 87, filename: "icon_29x29@3x.png" },
  { idiom: "iphone", size: "40x40", scale: "2x", pixels: 80, filename: "icon_40x40@2x.png" },
  { idiom: "iphone", size: "40x40", scale: "3x", pixels: 120, filename: "icon_40x40@3x.png" },
  { idiom: "iphone", size: "60x60", scale: "2x", pixels: 120, filename: "icon_60x60@2x.png" },
  { idiom: "iphone", size: "60x60", scale: "3x", pixels: 180, filename: "icon_60x60@3x.png" },
  { idiom: "ipad", size: "20x20", scale: "1x", pixels: 20, filename: "icon_ipad_20x20.png" },
  { idiom: "ipad", size: "20x20", scale: "2x", pixels: 40, filename: "icon_ipad_20x20@2x.png" },
  { idiom: "ipad", size: "29x29", scale: "1x", pixels: 29, filename: "icon_ipad_29x29.png" },
  { idiom: "ipad", size: "29x29", scale: "2x", pixels: 58, filename: "icon_ipad_29x29@2x.png" },
  { idiom: "ipad", size: "40x40", scale: "1x", pixels: 40, filename: "icon_ipad_40x40.png" },
  { idiom: "ipad", size: "40x40", scale: "2x", pixels: 80, filename: "icon_ipad_40x40@2x.png" },
  { idiom: "ipad", size: "76x76", scale: "1x", pixels: 76, filename: "icon_ipad_76x76.png" },
  { idiom: "ipad", size: "76x76", scale: "2x", pixels: 152, filename: "icon_ipad_76x76@2x.png" },
  { idiom: "ipad", size: "83.5x83.5", scale: "2x", pixels: 167, filename: "icon_ipad_83.5x83.5@2x.png" },
  { idiom: "ios-marketing", size: "1024x1024", scale: "1x", pixels: 1024, filename: "icon_1024x1024.png" }
];

const state = {
  uiLocale: "zh-CN",
  platform: "macos",
  scale: 100,
  source: null
};

let toastTimer = 0;

function t(key, values = {}) {
  let value = (UI[state.uiLocale] || UI["zh-CN"])[key] || UI["en-US"][key] || key;
  Object.entries(values).forEach(([name, replacement]) => { value = value.replace(`{${name}}`, String(replacement)); });
  return value;
}

function slots() {
  return state.platform === "macos" ? MAC_SLOTS : IOS_SLOTS;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function applyLanguage() {
  document.documentElement.lang = state.uiLocale;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const value = t(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-ui-lang]").forEach(button => button.classList.toggle("is-active", button.dataset.uiLang === state.uiLocale));
}

function renderOutputs() {
  const currentSlots = slots();
  setText("#outputCount", `${currentSlots.length} ${t("files")}`);
  setText("#summaryPlatform", state.platform === "macos" ? "macOS" : "iOS");
  document.querySelector("#outputList").innerHTML = currentSlots.map(slot => `
    <div class="output-row">
      <span class="output-name"><strong>${slot.filename}</strong><span>${slot.idiom} · ${slot.size} @${slot.scale}</span></span>
      <span class="output-size">${slot.pixels} × ${slot.pixels}</span>
    </div>
  `).join("");
}

function renderSourceStatus() {
  const source = state.source;
  document.querySelector("#sourceCard").hidden = !source;
  document.querySelector("#dropzone").hidden = Boolean(source);
  document.querySelector("#exportButton").disabled = !source;
  setText("#sourceStatus", source ? t("sourceReady") : t("sourcePng"));
  const imageCheck = document.querySelector("#checkImage");
  const resolutionCheck = document.querySelector("#checkResolution");
  imageCheck.className = `check-dot${source && source.width === source.height ? " is-ready" : source ? " is-warning" : ""}`;
  resolutionCheck.className = `check-dot${source && Math.min(source.width, source.height) >= 1024 ? " is-ready" : source ? " is-warning" : ""}`;
  if (source) {
    document.querySelector("#sourceThumb").src = source.url;
    document.querySelector("#sourceThumb").alt = source.name;
    setText("#sourceName", source.name);
    setText("#sourceMeta", `${source.width} × ${source.height} · PNG`);
  }
}

function drawScaledIcon(canvas, pixels = 1024) {
  canvas.width = pixels;
  canvas.height = pixels;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, pixels, pixels);
  if (!state.source?.image) return;
  const image = state.source.image;
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const box = pixels * (state.scale / 100);
  const fit = Math.min(box / sourceWidth, box / sourceHeight);
  const width = sourceWidth * fit;
  const height = sourceHeight * fit;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, (pixels - width) / 2, (pixels - height) / 2, width, height);
}

function renderPreview() {
  const preview = document.querySelector("#previewCanvas");
  drawScaledIcon(preview, 1024);
  const paddingPercent = (100 - state.scale) / 2;
  document.querySelector("#iconBoundary").style.inset = `${paddingPercent}%`;
  document.querySelector("#iconBoundary").hidden = !state.source;
  document.querySelector("#canvasEmpty").classList.toggle("is-hidden", Boolean(state.source));
  setText("#scaleValue", `${state.scale}%`);
  document.querySelector("#scaleRange").value = state.scale;
  setText("#paddingCaption", t("paddingCaption", { px: Math.round(1024 * paddingPercent / 100) }));
}

function renderPlatform() {
  document.querySelectorAll("[data-platform]").forEach(button => button.classList.toggle("is-active", button.dataset.platform === state.platform));
  setText("#specNote", t(state.platform === "macos" ? "macSpec" : "iosSpec"));
  setText("#previewTitle", `${state.platform === "macos" ? "macOS" : "iOS"} AppIcon`);
  renderOutputs();
}

function renderUI() {
  applyLanguage();
  renderPlatform();
  renderSourceStatus();
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
  const status = document.querySelector("#exportProgress");
  status.textContent = message;
  status.classList.toggle("is-error", error);
}

function disposeSource() {
  if (state.source?.url) URL.revokeObjectURL(state.source.url);
  state.source = null;
  setExportStatus("");
  renderSourceStatus();
  renderPreview();
}

async function loadFile(file) {
  if (!file || file.type !== "image/png") {
    showToast(t("invalidType"));
    return;
  }
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = url;
    });
    if (state.source?.url) URL.revokeObjectURL(state.source.url);
    state.source = { file, url, image, name: file.name || "AppIcon.png", width: image.naturalWidth, height: image.naturalHeight };
    renderSourceStatus();
    renderPreview();
    showToast(t("loaded", { width: image.naturalWidth, height: image.naturalHeight }));
    if (image.naturalWidth !== image.naturalHeight) window.setTimeout(() => showToast(t("nonSquare")), 1000);
    else if (image.naturalWidth < 1024) window.setTimeout(() => showToast(t("lowResolution")), 1000);
  } catch (error) {
    URL.revokeObjectURL(url);
    showToast(t("invalidImage"));
  }
}

function canvasToPng(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG export unavailable")), "image/png");
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
  const year = Math.max(date.getFullYear(), 1980);
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

async function createZip(entries) {
  const encoder = new TextEncoder();
  const items = await Promise.all(entries.map(async entry => ({ name: encoder.encode(entry.name), data: new Uint8Array(await entry.blob.arrayBuffer()) })));
  const { time, date } = dosDateTime();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  items.forEach(({ name, data }) => {
    const crc = crc32(data);
    const local = new Uint8Array(30);
    const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(10, time, true);
    localView.setUint16(12, date, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, data.length, true);
    localView.setUint32(22, data.length, true);
    localView.setUint16(26, name.length, true);
    localParts.push(local, name, data);

    const central = new Uint8Array(46);
    const centralView = new DataView(central.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(12, time, true);
    centralView.setUint16(14, date, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, data.length, true);
    centralView.setUint32(24, data.length, true);
    centralView.setUint16(28, name.length, true);
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
}

function contentsJson(currentSlots) {
  return JSON.stringify({
    images: currentSlots.map(({ idiom, size, scale, filename }) => ({ idiom, size, scale, filename })),
    info: { author: "iconforge", version: 1 }
  }, null, 2);
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

async function exportIcons() {
  if (!state.source) return;
  const button = document.querySelector("#exportButton");
  const currentSlots = slots();
  const prefix = "AppIcon.appiconset/";
  const entries = [];
  button.disabled = true;
  setExportStatus(t("exportPreparing"));
  try {
    for (let index = 0; index < currentSlots.length; index += 1) {
      const slot = currentSlots[index];
      setExportStatus(t("exportRendering", { current: index + 1, total: currentSlots.length }));
      const canvas = document.createElement("canvas");
      drawScaledIcon(canvas, slot.pixels);
      entries.push({ name: `${prefix}${slot.filename}`, blob: await canvasToPng(canvas) });
      await new Promise(resolve => window.setTimeout(resolve, 0));
    }
    entries.push({ name: `${prefix}Contents.json`, blob: new Blob([contentsJson(currentSlots)], { type: "application/json" }) });
    setExportStatus(t("exportPacking"));
    const archive = await createZip(entries);
    downloadBlob(archive, `iconforge-${state.platform}-${state.scale}pct.zip`);
    setExportStatus(t("exportDone", { count: currentSlots.length }));
    showToast(t("exportDone", { count: currentSlots.length }));
  } catch (error) {
    console.error(error);
    setExportStatus(t("exportFailed"), true);
    showToast(t("exportFailed"));
  } finally {
    button.disabled = !state.source;
  }
}

function changeScale(value) {
  state.scale = Math.max(20, Math.min(100, Number(value) || 100));
  renderPreview();
}

function bindEvents() {
  document.querySelectorAll("[data-ui-lang]").forEach(button => button.addEventListener("click", () => {
    state.uiLocale = button.dataset.uiLang;
    renderUI();
  }));
  document.querySelector("#platformSwitch").addEventListener("click", event => {
    const button = event.target.closest("[data-platform]");
    if (!button) return;
    state.platform = button.dataset.platform;
    renderPlatform();
  });
  document.querySelector("#scaleRange").addEventListener("input", event => changeScale(event.target.value));
  document.querySelector("#scaleDown").addEventListener("click", () => changeScale(state.scale - 5));
  document.querySelector("#scaleUp").addEventListener("click", () => changeScale(state.scale + 5));
  document.querySelector("#fileInput").addEventListener("change", event => {
    loadFile(event.target.files?.[0]);
    event.target.value = "";
  });
  const dropzone = document.querySelector("#dropzone");
  ["dragenter", "dragover"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.add("is-dragging"); }));
  ["dragleave", "drop"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.remove("is-dragging"); }));
  dropzone.addEventListener("drop", event => loadFile(Array.from(event.dataTransfer?.files || []).find(file => file.type === "image/png") || event.dataTransfer?.files?.[0]));
  window.addEventListener("paste", event => {
    const file = Array.from(event.clipboardData?.items || []).find(item => item.type === "image/png")?.getAsFile();
    if (file) loadFile(file);
  });
  document.querySelector("#removeButton").addEventListener("click", disposeSource);
  document.querySelector("#exportButton").addEventListener("click", exportIcons);
}

window.Iconforge = {
  MAC_SLOTS,
  IOS_SLOTS,
  getState: () => state,
  drawScaledIcon,
  exportIcons
};

bindEvents();
renderUI();
