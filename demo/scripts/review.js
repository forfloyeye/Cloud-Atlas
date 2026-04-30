import { explorationCards } from './data/cards.mjs';

// ── Storage ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'cloudAtlas_approvedIds';

function getApprovedSet() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
  catch { return new Set(); }
}

function saveApprovedSet(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

// ── Status logic ───────────────────────────────────────────────────────────
// live     = status:"published" in cards.mjs (已上线，无需操作)
// approved = status:"draft" + 审核台已通过 (已通过，Demo 中可见)
// draft    = status:"draft" + 未审核

function resolveStatus(card, approvedSet) {
  if (card.status === 'published') return 'live';
  if (approvedSet.has(card.contentId)) return 'approved';
  return 'draft';
}

const STATUS_LABEL = {
  live:     '线上发布',
  approved: '已通过',
  draft:    '待审核',
};

// ── State ──────────────────────────────────────────────────────────────────
let activeFilter = 'draft';   // default：打开就看待审核
let activePlanet = 'all';

// ── HTML helpers ───────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function bodyToHtml(body) {
  return body
    .split('\n\n')
    .map(p => `<p>${esc(p)}</p>`)
    .join('');
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const approvedSet = getApprovedSet();

  const cards = explorationCards.map(c => ({ ...c, _status: resolveStatus(c, approvedSet) }));

  const counts = { all: cards.length, draft: 0, approved: 0, live: 0 };
  cards.forEach(c => counts[c._status]++);

  // ── Stats bar ──
  const statsBar = document.getElementById('statsBar');
  const statDefs = [
    { key: 'all',      label: '全部卡片' },
    { key: 'draft',    label: '待审核' },
    { key: 'approved', label: '已通过' },
    { key: 'live',     label: '线上发布' },
  ];
  statsBar.innerHTML = statDefs.map(({ key, label }) => `
    <div class="stat-item${activeFilter === key ? ' active' : ''}" data-filter="${key}">
      <div class="stat-num ${key}">${counts[key]}</div>
      <div class="stat-label">${label}</div>
    </div>
  `).join('');
  statsBar.querySelectorAll('.stat-item').forEach(el => {
    el.addEventListener('click', () => {
      activeFilter = el.dataset.filter;
      render();
    });
  });

  // ── Filter bar — planet chips ──
  const filterBar = document.getElementById('filterBar');

  const visibleCards = activeFilter === 'all' ? cards : cards.filter(c => c._status === activeFilter);
  const planetIds = [...new Set(visibleCards.map(c => c.planetId))];
  const planetNames = {};
  cards.forEach(c => { planetNames[c.planetId] = c.planetName; });

  filterBar.innerHTML = `
    <span class="filter-label">星球</span>
    <div class="planet-chips">
      <span class="planet-chip${activePlanet === 'all' ? ' active' : ''}" data-planet="all">全部</span>
      ${planetIds.map(pid => `
        <span class="planet-chip${activePlanet === pid ? ' active' : ''}" data-planet="${pid}">
          ${esc(planetNames[pid] || pid)}
        </span>
      `).join('')}
    </div>
  `;
  filterBar.querySelectorAll('.planet-chip').forEach(el => {
    el.addEventListener('click', () => {
      activePlanet = el.dataset.planet;
      render();
    });
  });

  // ── Approval banner ──
  const banner = document.getElementById('approvalBanner');
  if (counts.approved > 0) {
    banner.textContent = `✓ 已通过 ${counts.approved} 张卡片审核，已在主 Demo 中展示。`;
    banner.classList.add('visible');
  } else {
    banner.classList.remove('visible');
  }

  // ── Card list ──
  let filtered = visibleCards;
  if (activePlanet !== 'all') filtered = filtered.filter(c => c.planetId === activePlanet);

  const cardList = document.getElementById('cardList');

  if (filtered.length === 0) {
    const emptyMsg = activeFilter === 'draft' ? '暂无待审核卡片，所有内容均已处理。' : '该分类下暂无卡片。';
    cardList.innerHTML = `<div class="empty-state"><strong>☁</strong>${emptyMsg}</div>`;
    return;
  }

  cardList.innerHTML = filtered.map(c => renderCard(c)).join('');

  // Expand/collapse
  cardList.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.review-card').classList.toggle('expanded');
    });
  });

  // Action buttons
  cardList.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const { action, id } = btn.dataset;
      const set = getApprovedSet();
      if (action === 'approve') set.add(id);
      if (action === 'revoke')  set.delete(id);
      saveApprovedSet(set);
      render();
    });
  });
}

function renderCard(card) {
  const status = card._status;
  const extraClass = status === 'approved' ? ' is-approved' : status === 'live' ? ' is-live' : '';

  const allTags = [
    ...(card.topicTags  || []),
    ...(card.formatTags || []),
    ...(card.moodTags   || []),
    ...(card.eraTags    || []),
    ...(card.regionTags || []),
  ];

  let actionHtml;
  if (status === 'draft') {
    actionHtml = `<button class="btn btn-approve" data-action="approve" data-id="${esc(card.contentId)}">✓ 通过审核，进入内容池</button>`;
  } else if (status === 'approved') {
    actionHtml = `
      <button class="btn btn-revoke" data-action="revoke" data-id="${esc(card.contentId)}">× 撤回审核</button>
      <span class="btn btn-note">已在 Demo 中显示</span>
    `;
  } else {
    actionHtml = `<span class="btn btn-note">线上已发布，无需操作</span>`;
  }

  return `
    <div class="review-card${extraClass}" data-id="${esc(card.contentId)}">
      <div class="card-header">
        <span class="planet-badge">${esc(card.planetName)}</span>
        <span class="status-badge ${status}">${STATUS_LABEL[status]}</span>
        <span class="card-id">${esc(card.contentId)}</span>
        <span class="card-title-text">${esc(card.title)}</span>
        <span class="card-chevron">▼</span>
      </div>
      <div class="card-body">
        <div class="card-hook">${esc(card.hook)}</div>

        <div class="section-label">正文</div>
        <div class="card-text">${bodyToHtml(card.body)}</div>

        ${card.extraFragments && card.extraFragments.length ? `
          <div class="section-label">知识碎片</div>
          <div class="fragments">
            ${card.extraFragments.map(f => `<div class="fragment-item">· ${esc(f)}</div>`).join('')}
          </div>
        ` : ''}

        <div class="card-meta">
          <span class="meta-tag">难度 ${esc(card.difficultyLevel)}</span>
          <span class="meta-tag">阅读 ${card.readingTime}s</span>
          ${allTags.map(t => `<span class="meta-tag">${esc(t)}</span>`).join('')}
        </div>

        ${card.sourceNote ? `<div class="source-note">${esc(card.sourceNote)}</div>` : ''}

        <div class="card-actions">${actionHtml}</div>
      </div>
    </div>
  `;
}

// ── Init ───────────────────────────────────────────────────────────────────
render();
