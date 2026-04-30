import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { explorationCards } from './data/cards.mjs';

// ── Supabase ───────────────────────────────────────────────────────────────
const cfg = window.CLOUD_ATLAS_SUPABASE_CONFIG || {};
const supabase = (cfg.url && cfg.anonKey)
  ? createClient(cfg.url, cfg.anonKey)
  : null;

// ── Review storage ─────────────────────────────────────────────────────────
const REVIEW_KEY = 'cloudAtlas_approvedIds';
function getApprovedSet() {
  try { return new Set(JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]')); }
  catch { return new Set(); }
}
function saveApprovedSet(set) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify([...set]));
}
function resolveStatus(card, approved) {
  if (card.status === 'published') return 'live';
  if (approved.has(card.contentId)) return 'approved';
  return 'draft';
}
const STATUS_LABEL = { live: '线上发布', approved: '已通过', draft: '待审核' };

// ── Navigation ─────────────────────────────────────────────────────────────
const PAGE_TITLES = { overview: '概览', review: '内容审核', users: '注册用户' };
let currentPage = 'overview';
let reviewFilter = 'draft';
let reviewPlanet = 'all';
let usersAll = [];
let usersSearchQ = '';

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
  document.getElementById(`page-${id}`).classList.add('active');
  document.querySelector(`.nav-item[data-page="${id}"]`).classList.add('active');
  document.getElementById('topbarTitle').textContent = PAGE_TITLES[id];
  currentPage = id;
  if (id === 'review')   renderReview();
  if (id === 'overview') renderOverview();
  if (id === 'users')    initUsers();
}

document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  el.addEventListener('click', () => showPage(el.dataset.page));
});

// ── Helpers ────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function bodyToHtml(body) {
  return body.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('');
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit' })
    + ' ' + d.toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit' });
}

// ── Overview ───────────────────────────────────────────────────────────────
function renderOverview() {
  const approved = getApprovedSet();
  const cards = explorationCards.map(c => ({ ...c, _s: resolveStatus(c, approved) }));
  const counts = { total: cards.length, draft: 0, approved: 0, live: 0 };
  cards.forEach(c => counts[c._s]++);

  document.getElementById('overviewGrid').innerHTML = `
    <div class="ov-card"><div class="ov-num muted">${counts.total}</div><div class="ov-label">卡片总数</div></div>
    <div class="ov-card"><div class="ov-num live">${counts.live}</div><div class="ov-label">线上发布</div></div>
    <div class="ov-card"><div class="ov-num green">${counts.approved}</div><div class="ov-label">审核通过</div></div>
    <div class="ov-card"><div class="ov-num yellow">${counts.draft}</div><div class="ov-label">待审核</div></div>
    <div class="ov-card" id="ov-users"><div class="ov-num cyan">…</div><div class="ov-label">注册用户</div></div>
  `;

  document.getElementById('overviewHints').innerHTML = `
    ${counts.draft > 0 ? `<div class="hint-item">📝 有 <strong style="color:#f5c842">${counts.draft}</strong> 张卡片待审核。<a data-page="review">前往内容审核 →</a></div>` : ''}
    <div class="hint-item">📡 Supabase ${supabase ? '已连接' : '<span style="color:#f87">未配置</span>'}${supabase ? '' : '，用户管理功能需要配置 supabase-config.js。'}</div>
    <div class="hint-item">ℹ️ 审核通过的卡片在刷新主 Demo 后立即生效（localStorage 驱动，无需部署）。</div>
  `;

  document.querySelectorAll('.overview-hints [data-page]').forEach(a => {
    a.addEventListener('click', () => showPage(a.dataset.page));
  });

  // 异步拉取用户数并更新
  if (supabase) {
    supabase.from('user_profiles').select('user_id', { count: 'exact', head: true })
      .then(({ count }) => {
        const el = document.querySelector('#ov-users .ov-num');
        if (el) el.textContent = count ?? '—';
        const badge = document.getElementById('usersBadge');
        if (badge && count) { badge.textContent = count; badge.style.display = ''; }
      });
  }

  // Draft badge
  const draftBadge = document.getElementById('draftBadge');
  if (counts.draft > 0) {
    draftBadge.textContent = counts.draft;
    draftBadge.style.display = '';
  } else {
    draftBadge.style.display = 'none';
  }
}

// ── Review ─────────────────────────────────────────────────────────────────
function renderReview() {
  const approved = getApprovedSet();
  const cards = explorationCards.map(c => ({ ...c, _s: resolveStatus(c, approved) }));
  const counts = { all: cards.length, draft: 0, approved: 0, live: 0 };
  cards.forEach(c => counts[c._s]++);

  // Stats bar
  const statsBar = document.getElementById('statsBar');
  const defs = [
    { key: 'all', label: '全部' },
    { key: 'draft', label: '待审核' },
    { key: 'approved', label: '已通过' },
    { key: 'live', label: '线上发布' },
  ];
  statsBar.innerHTML = defs.map(({ key, label }) => `
    <div class="stat-item${reviewFilter === key ? ' active' : ''}" data-filter="${key}">
      <div class="stat-num-r ${key}">${counts[key]}</div>
      <div class="stat-label">${label}</div>
    </div>
  `).join('');
  statsBar.querySelectorAll('.stat-item').forEach(el => {
    el.addEventListener('click', () => { reviewFilter = el.dataset.filter; renderReview(); });
  });

  // Planet filter
  const visible = reviewFilter === 'all' ? cards : cards.filter(c => c._s === reviewFilter);
  const planetIds = [...new Set(visible.map(c => c.planetId))];
  const pNames = {};
  cards.forEach(c => { pNames[c.planetId] = c.planetName; });

  document.getElementById('filterBar').innerHTML = `
    <span class="filter-label">星球</span>
    <div class="planet-chips">
      <span class="planet-chip${reviewPlanet === 'all' ? ' active' : ''}" data-planet="all">全部</span>
      ${planetIds.map(pid => `<span class="planet-chip${reviewPlanet === pid ? ' active' : ''}" data-planet="${pid}">${esc(pNames[pid] || pid)}</span>`).join('')}
    </div>
  `;
  document.querySelectorAll('.planet-chip').forEach(el => {
    el.addEventListener('click', () => { reviewPlanet = el.dataset.planet; renderReview(); });
  });

  // Banner
  const banner = document.getElementById('approvalBanner');
  if (counts.approved > 0) {
    banner.textContent = `✓ 已通过 ${counts.approved} 张卡片审核，已在主 Demo 中可见。`;
    banner.classList.add('visible');
  } else {
    banner.classList.remove('visible');
  }

  // Card list
  let filtered = visible;
  if (reviewPlanet !== 'all') filtered = filtered.filter(c => c.planetId === reviewPlanet);

  const cardList = document.getElementById('cardList');
  if (filtered.length === 0) {
    cardList.innerHTML = '<div class="empty-state"><strong>☁</strong>该分类暂无卡片。</div>';
    return;
  }
  cardList.innerHTML = filtered.map(renderCard).join('');

  cardList.querySelectorAll('.card-header').forEach(h => {
    h.addEventListener('click', () => h.closest('.review-card').classList.toggle('expanded'));
  });
  cardList.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const set = getApprovedSet();
      if (btn.dataset.action === 'approve') set.add(btn.dataset.id);
      if (btn.dataset.action === 'revoke')  set.delete(btn.dataset.id);
      saveApprovedSet(set);
      renderReview();
      renderOverview();
    });
  });
}

function renderCard(card) {
  const s = card._s;
  const extraClass = s === 'approved' ? ' is-approved' : s === 'live' ? ' is-live' : '';
  const allTags = [
    ...(card.topicTags || []), ...(card.formatTags || []),
    ...(card.moodTags || []),  ...(card.eraTags  || []),
    ...(card.regionTags || []),
  ];
  let actionHtml;
  if (s === 'draft') {
    actionHtml = `<button class="btn btn-approve" data-action="approve" data-id="${esc(card.contentId)}">✓ 通过审核，进入内容池</button>`;
  } else if (s === 'approved') {
    actionHtml = `<button class="btn btn-revoke" data-action="revoke" data-id="${esc(card.contentId)}">× 撤回审核</button><span class="btn btn-note">已在 Demo 中显示</span>`;
  } else {
    actionHtml = `<span class="btn btn-note">线上已发布，无需操作</span>`;
  }
  return `
    <div class="review-card${extraClass}">
      <div class="card-header">
        <span class="planet-badge">${esc(card.planetName)}</span>
        <span class="status-badge ${s}">${STATUS_LABEL[s]}</span>
        <span class="card-id">${esc(card.contentId)}</span>
        <span class="card-title-text">${esc(card.title)}</span>
        <span class="card-chevron">▼</span>
      </div>
      <div class="card-body">
        <div class="card-hook">${esc(card.hook)}</div>
        <div class="section-label">正文</div>
        <div class="card-text">${bodyToHtml(card.body)}</div>
        ${card.extraFragments?.length ? `
          <div class="section-label">知识碎片</div>
          <div class="fragments">
            ${card.extraFragments.map(f => `<div class="fragment-item">· ${esc(f)}</div>`).join('')}
          </div>` : ''}
        <div class="card-meta">
          <span class="meta-tag">难度 ${esc(card.difficultyLevel)}</span>
          <span class="meta-tag">阅读 ${card.readingTime}s</span>
          ${allTags.map(t => `<span class="meta-tag">${esc(t)}</span>`).join('')}
        </div>
        ${card.sourceNote ? `<div class="source-note">${esc(card.sourceNote)}</div>` : ''}
        <div class="card-actions">${actionHtml}</div>
      </div>
    </div>`;
}

// ── Users ──────────────────────────────────────────────────────────────────
const NO_ACCESS_SQL = `-- 在 Supabase SQL Editor 中执行一次，赋予 anon 读取所有 user_profiles 的权限
-- （仅限内网 / 受控环境，线上生产请改用 service_role key 或 Edge Function）

create policy "Anon can read all profiles for admin"
on public.user_profiles
for select
to anon
using (true);`;

let usersInitialized = false;

async function initUsers() {
  if (!supabase) {
    document.getElementById('usersContent').innerHTML = `
      <div class="no-access-box">
        <h3>⚙ 未连接 Supabase</h3>
        <p>请在 <code style="display:inline;background:none;border:none;padding:0;font-size:inherit">supabase-config.js</code> 中填写正确的 URL 和 anonKey。</p>
      </div>`;
    return;
  }
  if (!usersInitialized) {
    await fetchUsers();
    usersInitialized = true;
  }
  document.getElementById('usersRefresh').addEventListener('click', fetchUsers, { once: false });
  document.getElementById('userSearch').addEventListener('input', e => {
    usersSearchQ = e.target.value.toLowerCase().trim();
    renderUsersTable();
  });
}

async function fetchUsers() {
  document.getElementById('usersContent').innerHTML =
    '<div class="loading-row"><span class="spinner"></span>正在加载用户数据…</div>';
  document.getElementById('usersCount').textContent = '';

  const { data, error } = await supabase
    .from('user_profiles')
    .select('user_id, email, display_name, app_state, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) {
    if (error.code === '42501' || error.message?.includes('permission') || error.message?.includes('policy')) {
      document.getElementById('usersContent').innerHTML = `
        <div class="no-access-box">
          <h3>⚠ 权限不足</h3>
          <p>当前 RLS 策略只允许用户读取自己的 profile。需要在 Supabase SQL Editor 中添加一条 admin 读取策略：</p>
          <code>${esc(NO_ACCESS_SQL)}</code>
          <p>执行后刷新此页面即可看到用户列表。</p>
        </div>`;
    } else {
      document.getElementById('usersContent').innerHTML = `
        <div class="no-access-box">
          <h3>⚡ 请求失败</h3>
          <p>${esc(error.message)}</p>
        </div>`;
    }
    return;
  }

  usersAll = data || [];
  // update badge
  const badge = document.getElementById('usersBadge');
  badge.textContent = usersAll.length;
  badge.style.display = usersAll.length ? '' : 'none';
  document.querySelector('#ov-users .ov-num') && (document.querySelector('#ov-users .ov-num').textContent = usersAll.length);

  renderUsersTable();
}

function renderUsersTable() {
  const q = usersSearchQ;
  const filtered = q
    ? usersAll.filter(u =>
        (u.email || '').toLowerCase().includes(q) ||
        (u.display_name || '').toLowerCase().includes(q) ||
        (u.user_id || '').toLowerCase().includes(q))
    : usersAll;

  document.getElementById('usersCount').textContent =
    filtered.length === usersAll.length
      ? `共 ${usersAll.length} 位用户`
      : `显示 ${filtered.length} / ${usersAll.length}`;

  if (filtered.length === 0) {
    document.getElementById('usersContent').innerHTML =
      `<div class="empty-state"><strong>◎</strong>${q ? '没有匹配的用户。' : '暂无注册用户。'}</div>`;
    return;
  }

  document.getElementById('usersContent').innerHTML = `
    <div class="users-table-wrap">
      <table class="users-table">
        <thead>
          <tr>
            <th>邮箱 / 昵称</th>
            <th>User ID</th>
            <th>注册时间</th>
            <th>最后活跃</th>
            <th>App State</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(u => `
            <tr>
              <td>
                <div class="user-email">${esc(u.email || '—')}</div>
                ${u.display_name ? `<div class="user-name">${esc(u.display_name)}</div>` : ''}
              </td>
              <td><span class="user-id">${esc(u.user_id)}</span></td>
              <td><span class="user-date">${fmtDate(u.created_at)}</span></td>
              <td><span class="user-date">${fmtDate(u.updated_at)}</span></td>
              <td>
                ${u.app_state && Object.keys(u.app_state).length > 0
                  ? `<button class="app-state-toggle" onclick="this.nextElementSibling.classList.toggle('visible');this.textContent=this.textContent==='查看'?'收起':'查看'">查看</button>
                     <pre class="app-state-json">${esc(JSON.stringify(u.app_state, null, 2))}</pre>`
                  : '<span style="color:rgba(219,233,255,0.2);font-size:12px">空</span>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

// ── Init ───────────────────────────────────────────────────────────────────
renderOverview();
