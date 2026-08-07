const appState = {
  archive: null,
  episode: null,
  show: "all",
  transcriptMode: "all",
};

const dom = {
  count: document.querySelector("#episodeCount"),
  showFilters: document.querySelector("#showFilters"),
  episodeList: document.querySelector("#episodeList"),
  episodePane: document.querySelector("#episodePane"),
};

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTime(seconds = 0) {
  const whole = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const secs = whole % 60;
  return hours
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function currentMeta() {
  return appState.archive?.episodes.find((episode) => episode.id === appState.episode?.id);
}

function updateURL(id, { push = true } = {}) {
  const url = new URL(window.location.href);
  url.searchParams.set("episode", id);
  window.history[push ? "pushState" : "replaceState"]({}, "", url);
}

function selectedEpisodeId() {
  const candidate = new URLSearchParams(window.location.search).get("episode");
  return appState.archive.episodes.some((episode) => episode.id === candidate)
    ? candidate
    : appState.archive.episodes[0]?.id;
}

function renderShowFilters() {
  const shows = [
    { id: "all", label: "全部" },
    { id: "mianji", label: "面基" },
    { id: "shifenxiyin", label: "十分吸引" },
  ];
  dom.showFilters.innerHTML = shows.map(({ id, label }) => `
    <button class="filter-button ${appState.show === id ? "is-active" : ""}" type="button" data-show="${id}" aria-pressed="${appState.show === id}">
      ${label}
    </button>
  `).join("");
  dom.showFilters.querySelectorAll("[data-show]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.show = button.dataset.show;
      renderShowFilters();
      renderEpisodeList();
    });
  });
}

function renderEpisodeList() {
  const episodes = appState.archive.episodes.filter((episode) => appState.show === "all" || episode.showId === appState.show);
  dom.count.textContent = `${episodes.length} / ${appState.archive.episodes.length}`;
  dom.episodeList.innerHTML = episodes.map((episode) => `
    <button class="episode-card ${episode.id === appState.episode?.id ? "is-active" : ""}" type="button" data-episode-id="${escapeHTML(episode.id)}" aria-pressed="${episode.id === appState.episode?.id}">
      <img class="card-cover" src="${escapeHTML(episode.cover)}" alt="" loading="lazy">
      <span>
        <span class="card-show">${escapeHTML(episode.show)}</span>
        <strong class="card-title">${escapeHTML(episode.title)}</strong>
        <span class="card-meta">${escapeHTML(episode.dateLabel)} · ${escapeHTML(episode.durationLabel)} · ${escapeHTML(episode.transcriptShortLabel)}</span>
      </span>
    </button>
  `).join("");
  dom.episodeList.querySelectorAll("[data-episode-id]").forEach((button) => {
    button.addEventListener("click", () => selectEpisode(button.dataset.episodeId));
  });
}

function transcriptStatus(episode) {
  const labels = {
    full: "完整自动转录",
    partial: "转录节选",
    preview: "公开试听稿",
    none: "暂无转录",
  };
  return labels[episode.transcriptStatus] || "转录状态未知";
}

function renderTranscript() {
  const episode = appState.episode;
  const transcript = episode.transcript || [];
  const hasTranscript = transcript.length > 0;
  const visibleSegments = appState.transcriptMode === "quotes"
    ? transcript.filter((segment) => segment.isQuote)
    : transcript;
  const quotes = transcript.filter((segment) => segment.isQuote);
  const showQuotes = appState.transcriptMode === "all" && quotes.length > 0;

  return `
    <section class="transcript-section" aria-labelledby="transcript-title">
      <div class="transcript-topline">
        <div>
          <p class="section-label">TRANSCRIPT ARCHIVE</p>
          <h2 id="transcript-title">${escapeHTML(transcriptStatus(episode))}</h2>
        </div>
        <div class="mode-switcher" role="group" aria-label="逐字稿显示模式">
          ${[
            ["all", "全部"],
            ["quotes", "金句"],
            ["transcript", "已转录片段"],
          ].map(([id, label]) => `<button class="mode-button ${appState.transcriptMode === id ? "is-active" : ""}" type="button" data-mode="${id}" aria-pressed="${appState.transcriptMode === id}">${label}</button>`).join("")}
        </div>
      </div>
      <p class="transcript-status"><strong>${escapeHTML(episode.transcriptNotice || "")}</strong> ${escapeHTML(episode.transcriptDetail || "")} ${episode.transcriptSourceUrl ? `<a class="text-link" href="${escapeHTML(episode.transcriptSourceUrl)}" target="_blank" rel="noreferrer">查看文字来源 ↗</a>` : ""}</p>
      ${showQuotes ? `
        <div class="quote-rack" aria-label="金句摘录">
          ${quotes.map((segment) => `
            <article class="quote-button">
              <span class="quote-time">${formatTime(segment.start)} · 金句</span>
              <span class="quote-text">${escapeHTML(segment.text)}</span>
            </article>
          `).join("")}
        </div>
      ` : ""}
      ${hasTranscript ? `
        <div id="transcriptList" class="transcript-list" aria-label="逐字稿">
          ${visibleSegments.map((segment) => `
            <article id="${escapeHTML(segment.id)}" class="transcript-segment ${segment.isQuote ? "is-quote" : ""}">
              <span class="segment-time">${formatTime(segment.start)}</span>
              <span class="segment-speaker">${escapeHTML(segment.speaker)}</span>
              <span class="segment-text">${segment.isQuote ? `<mark>${escapeHTML(segment.text)}</mark>` : escapeHTML(segment.text)}</span>
            </article>
          `).join("")}
        </div>
      ` : `
        <div class="empty-state">
          这期尚未归档可公开展示的逐字稿。你仍可通过原节目入口继续收听；本站不会用摘要补造对话内容。
        </div>
      `}
    </section>
  `;
}

function renderEpisode() {
  const episode = appState.episode;
  const meta = currentMeta();
  if (!episode || !meta) return;

  dom.episodePane.setAttribute("aria-busy", "false");
  dom.episodePane.innerHTML = `
    <article>
      <header class="episode-head">
        <div class="cover-frame"><img class="episode-cover" src="${escapeHTML(meta.cover)}" alt="${escapeHTML(meta.show)}节目封面" fetchpriority="high"></div>
        <div>
          <p class="episode-label">${escapeHTML(meta.show.toUpperCase())} / ${escapeHTML(meta.dateLabel)}</p>
          <h1 class="episode-title">${escapeHTML(meta.title)}</h1>
          <div class="episode-meta">
            <span>${escapeHTML(meta.durationLabel)}</span>
            <span>${escapeHTML(meta.transcriptShortLabel)}</span>
            <span>TEXT ARCHIVE</span>
          </div>
          <p class="episode-summary">${escapeHTML(episode.summary)}</p>
          <a class="source-link" href="${escapeHTML(meta.sourceUrl)}" target="_blank" rel="noreferrer">打开 ${escapeHTML(meta.sourceName || "原节目")}</a>
        </div>
      </header>

      <section class="overview-grid" aria-label="本期速览">
        <div>
          <p class="section-label">FAST PREVIEW</p>
          <ul class="insight-list">${episode.takeaways.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <p class="section-label">KEY MOMENTS</p>
          <div class="moment-list">
            ${episode.keyMoments.map((moment) => `
              <article class="moment-item">
                <span class="moment-time">${formatTime(moment.start)}</span>
                <span class="moment-title">${escapeHTML(moment.title)}</span>
              </article>
            `).join("")}
          </div>
        </div>
      </section>

      ${renderTranscript()}
      <p class="source-note">来源边界：${escapeHTML(episode.sourceNote || "文本与节目资料为原节目公开内容的个人整理。")}</p>
    </article>
  `;
  bindEpisodeInteractions();
}

function bindEpisodeInteractions() {
  dom.episodePane.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.transcriptMode = button.dataset.mode;
      renderEpisode();
    });
  });
}

async function selectEpisode(id, { updateHistory = true } = {}) {
  const meta = appState.archive.episodes.find((episode) => episode.id === id);
  if (!meta) return;
  dom.episodePane.setAttribute("aria-busy", "true");
  dom.episodePane.innerHTML = `<div class="loading-state"><span class="status-led" aria-hidden="true"></span><p>正在调谐 ${escapeHTML(meta.title)}…</p></div>`;
  try {
    const response = await fetch(meta.data, { cache: "no-cache" });
    if (!response.ok) throw new Error(`无法读取选集数据 (${response.status})`);
    appState.episode = await response.json();
    appState.transcriptMode = "all";
    renderShowFilters();
    renderEpisodeList();
    renderEpisode();
    if (updateHistory) updateURL(id);
  } catch (error) {
    dom.episodePane.setAttribute("aria-busy", "false");
    dom.episodePane.innerHTML = `<div class="empty-state"><strong>信号读取失败。</strong><br>${escapeHTML(error.message)}，请刷新后重试。</div>`;
  }
}

async function bootstrap() {
  try {
    const response = await fetch("./data/index.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`索引读取失败 (${response.status})`);
    appState.archive = await response.json();
    renderShowFilters();
    const initialEpisodeId = selectedEpisodeId();
    if (!new URLSearchParams(window.location.search).has("episode")) updateURL(initialEpisodeId, { push: false });
    await selectEpisode(initialEpisodeId, { updateHistory: false });
  } catch (error) {
    dom.episodePane.setAttribute("aria-busy", "false");
    dom.episodePane.innerHTML = `<div class="empty-state"><strong>声档馆暂时无法启动。</strong><br>${escapeHTML(error.message)}</div>`;
  }
}

window.addEventListener("popstate", () => {
  if (!appState.archive) return;
  selectEpisode(selectedEpisodeId(), { updateHistory: false });
});

bootstrap();
