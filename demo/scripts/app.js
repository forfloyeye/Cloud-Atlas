  import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
  import { systems } from "./data/systems.mjs";
  import { explorationCards } from "./data/cards.mjs";

  const defaultThemeId = "deep-ice";
  const themes = [
    {
      id: "deep-ice",
      name: "极夜冰海",
      tag: "冷冽通透",
      description: "更像深海上方的极夜极光，理性、清透、带一点高维感。",
      swatches: ["#7ee4ff", "#d5f7ff", "#7db8ff", "#ffd69a"],
      variables: {
        "--bg-0": "#07111f",
        "--bg-1": "#0b1730",
        "--bg-2": "#142449",
        "--bg-end": "#050b18",
        "--bg-glow-a": "rgba(50, 96, 182, 0.28)",
        "--bg-glow-b": "rgba(255, 176, 112, 0.15)",
        "--bg-glow-c": "rgba(107, 195, 255, 0.18)",
        "--text": "#eef4ff",
        "--muted": "rgba(219, 233, 255, 0.68)",
        "--line": "rgba(170, 196, 255, 0.14)",
        "--panel-top": "rgba(11, 20, 41, 0.7)",
        "--panel-bottom": "rgba(7, 13, 27, 0.48)",
        "--panel-sheen": "rgba(255, 255, 255, 0.05)",
        "--cyan": "#86e7ff",
        "--gold": "#ffd17d",
        "--rose": "#ff9dcc",
        "--mint": "#9ce7cb",
        "--orange": "#ffb48a",
        "--grid-line": "rgba(255, 255, 255, 0.02)",
        "--vignette": "rgba(0, 0, 0, 0.54)",
        "--mist-core": "rgba(255, 248, 223, 0.16)",
        "--mist-cyan": "rgba(141, 221, 255, 0.17)",
        "--mist-violet": "rgba(143, 112, 255, 0.13)",
        "--mist-gold": "rgba(255, 190, 117, 0.13)",
        "--mist-mint": "rgba(138, 239, 218, 0.1)",
        "--brand-core": "rgba(137, 224, 255, 0.86)",
        "--brand-ring": "rgba(35, 120, 255, 0.12)",
        "--brand-warm": "rgba(255, 204, 138, 0.42)",
        "--brand-shell": "#09172c",
        "--button-a": "rgba(110, 230, 255, 0.22)",
        "--button-b": "rgba(115, 136, 255, 0.22)",
        "--eyebrow-border": "rgba(161, 209, 255, 0.18)",
        "--eyebrow-bg": "rgba(125, 180, 255, 0.08)",
        "--eyebrow-text": "#d7ecff",
        "--stage-core": "rgba(255, 247, 216, 0.14)",
        "--stage-cyan": "rgba(161, 224, 255, 0.14)",
        "--stage-violet": "rgba(168, 132, 255, 0.12)",
        "--stage-gold": "rgba(255, 190, 117, 0.12)",
        "--stage-shell": "rgba(11, 18, 37, 0.52)",
        "--stage-floor": "rgba(3, 7, 16, 0.3)",
        "--stage-before-core": "rgba(255, 252, 240, 0.16)",
        "--stage-before-cyan": "rgba(137, 199, 255, 0.14)",
        "--stage-before-violet": "rgba(150, 114, 255, 0.12)",
        "--stage-before-gold": "rgba(255, 181, 109, 0.12)",
        "--stage-after-cyan": "rgba(118, 211, 255, 0.08)",
        "--stage-after-core": "rgba(255, 255, 255, 0.09)",
        "--stage-after-gold": "rgba(255, 208, 142, 0.08)",
        "--stage-after-blue": "rgba(124, 167, 255, 0.08)"
      }
    },
    {
      id: "amber-dust",
      name: "琥珀星尘",
      tag: "暖金沉浸",
      description: "把首页往遗迹、黄昏、收藏感拉，整体更有内容产品和陈列感。",
      swatches: ["#ffc774", "#ffdcb4", "#ff9f68", "#7ecbff"],
      variables: {
        "--bg-0": "#160f0a",
        "--bg-1": "#2d1b12",
        "--bg-2": "#4d2c1b",
        "--bg-end": "#0c0908",
        "--bg-glow-a": "rgba(255, 161, 91, 0.24)",
        "--bg-glow-b": "rgba(255, 216, 152, 0.16)",
        "--bg-glow-c": "rgba(122, 191, 255, 0.14)",
        "--text": "#fff4e7",
        "--muted": "rgba(255, 229, 198, 0.68)",
        "--line": "rgba(255, 211, 156, 0.16)",
        "--panel-top": "rgba(44, 27, 18, 0.76)",
        "--panel-bottom": "rgba(20, 12, 10, 0.56)",
        "--panel-sheen": "rgba(255, 236, 214, 0.06)",
        "--cyan": "#7ecbff",
        "--gold": "#ffc774",
        "--rose": "#ffba8d",
        "--mint": "#efd6a4",
        "--orange": "#ff9f68",
        "--grid-line": "rgba(255, 241, 220, 0.024)",
        "--vignette": "rgba(7, 4, 3, 0.6)",
        "--mist-core": "rgba(255, 233, 186, 0.18)",
        "--mist-cyan": "rgba(126, 203, 255, 0.11)",
        "--mist-violet": "rgba(177, 135, 110, 0.1)",
        "--mist-gold": "rgba(255, 177, 92, 0.18)",
        "--mist-mint": "rgba(255, 218, 154, 0.1)",
        "--brand-core": "rgba(255, 212, 138, 0.88)",
        "--brand-ring": "rgba(255, 143, 66, 0.18)",
        "--brand-warm": "rgba(126, 203, 255, 0.24)",
        "--brand-shell": "#1c120d",
        "--button-a": "rgba(255, 199, 116, 0.24)",
        "--button-b": "rgba(255, 128, 78, 0.18)",
        "--eyebrow-border": "rgba(255, 211, 156, 0.2)",
        "--eyebrow-bg": "rgba(255, 192, 108, 0.08)",
        "--eyebrow-text": "#ffe9cc",
        "--stage-core": "rgba(255, 234, 187, 0.16)",
        "--stage-cyan": "rgba(125, 202, 255, 0.11)",
        "--stage-violet": "rgba(190, 120, 85, 0.1)",
        "--stage-gold": "rgba(255, 176, 96, 0.16)",
        "--stage-shell": "rgba(34, 22, 15, 0.6)",
        "--stage-floor": "rgba(14, 10, 8, 0.34)",
        "--stage-before-core": "rgba(255, 245, 223, 0.16)",
        "--stage-before-cyan": "rgba(126, 203, 255, 0.1)",
        "--stage-before-violet": "rgba(192, 126, 89, 0.12)",
        "--stage-before-gold": "rgba(255, 186, 105, 0.14)",
        "--stage-after-cyan": "rgba(126, 203, 255, 0.06)",
        "--stage-after-core": "rgba(255, 245, 225, 0.1)",
        "--stage-after-gold": "rgba(255, 187, 105, 0.1)",
        "--stage-after-blue": "rgba(255, 134, 90, 0.08)"
      }
    },
    {
      id: "violet-fog",
      name: "紫雾禁区",
      tag: "神秘偏锋",
      description: "更偏幻想和危险感，页面会有明显的禁区气质，适合做更强个性的方向测试。",
      swatches: ["#c998ff", "#ff8ac2", "#8ce7ff", "#ffd5f2"],
      variables: {
        "--bg-0": "#120919",
        "--bg-1": "#1c1031",
        "--bg-2": "#30194d",
        "--bg-end": "#09040f",
        "--bg-glow-a": "rgba(150, 86, 255, 0.28)",
        "--bg-glow-b": "rgba(255, 113, 179, 0.15)",
        "--bg-glow-c": "rgba(124, 231, 255, 0.14)",
        "--text": "#f7efff",
        "--muted": "rgba(231, 213, 255, 0.7)",
        "--line": "rgba(211, 175, 255, 0.16)",
        "--panel-top": "rgba(31, 18, 52, 0.74)",
        "--panel-bottom": "rgba(16, 9, 25, 0.56)",
        "--panel-sheen": "rgba(255, 255, 255, 0.055)",
        "--cyan": "#8ce7ff",
        "--gold": "#ffd1eb",
        "--rose": "#ff8ac2",
        "--mint": "#c998ff",
        "--orange": "#ffb0e1",
        "--grid-line": "rgba(255, 234, 255, 0.022)",
        "--vignette": "rgba(2, 0, 7, 0.62)",
        "--mist-core": "rgba(255, 235, 255, 0.14)",
        "--mist-cyan": "rgba(140, 231, 255, 0.15)",
        "--mist-violet": "rgba(182, 112, 255, 0.18)",
        "--mist-gold": "rgba(255, 154, 210, 0.12)",
        "--mist-mint": "rgba(215, 153, 255, 0.12)",
        "--brand-core": "rgba(206, 153, 255, 0.9)",
        "--brand-ring": "rgba(121, 71, 255, 0.18)",
        "--brand-warm": "rgba(255, 138, 194, 0.3)",
        "--brand-shell": "#140b21",
        "--button-a": "rgba(201, 152, 255, 0.24)",
        "--button-b": "rgba(255, 138, 194, 0.18)",
        "--eyebrow-border": "rgba(211, 175, 255, 0.2)",
        "--eyebrow-bg": "rgba(174, 122, 255, 0.08)",
        "--eyebrow-text": "#f1deff",
        "--stage-core": "rgba(255, 236, 253, 0.12)",
        "--stage-cyan": "rgba(140, 231, 255, 0.12)",
        "--stage-violet": "rgba(193, 132, 255, 0.18)",
        "--stage-gold": "rgba(255, 138, 194, 0.12)",
        "--stage-shell": "rgba(24, 13, 40, 0.58)",
        "--stage-floor": "rgba(10, 5, 18, 0.34)",
        "--stage-before-core": "rgba(255, 246, 255, 0.14)",
        "--stage-before-cyan": "rgba(140, 231, 255, 0.12)",
        "--stage-before-violet": "rgba(193, 132, 255, 0.16)",
        "--stage-before-gold": "rgba(255, 145, 202, 0.12)",
        "--stage-after-cyan": "rgba(140, 231, 255, 0.07)",
        "--stage-after-core": "rgba(255, 247, 255, 0.09)",
        "--stage-after-gold": "rgba(255, 160, 212, 0.08)",
        "--stage-after-blue": "rgba(186, 130, 255, 0.09)"
      }
    },
    {
      id: "turquoise-ruins",
      name: "绿松石遗迹",
      tag: "考古奇观",
      description: "更接近古文明遗址和科技遗物混在一起的气质，神秘但不阴冷。",
      swatches: ["#62ead6", "#9de9ff", "#d7c77a", "#64b7ff"],
      variables: {
        "--bg-0": "#051515",
        "--bg-1": "#0a2626",
        "--bg-2": "#113b39",
        "--bg-end": "#041010",
        "--bg-glow-a": "rgba(80, 215, 201, 0.24)",
        "--bg-glow-b": "rgba(215, 199, 122, 0.14)",
        "--bg-glow-c": "rgba(100, 183, 255, 0.15)",
        "--text": "#ecfff9",
        "--muted": "rgba(204, 239, 232, 0.68)",
        "--line": "rgba(138, 226, 212, 0.16)",
        "--panel-top": "rgba(10, 37, 36, 0.76)",
        "--panel-bottom": "rgba(6, 21, 21, 0.56)",
        "--panel-sheen": "rgba(255, 255, 255, 0.055)",
        "--cyan": "#9de9ff",
        "--gold": "#d7c77a",
        "--rose": "#7ce4d7",
        "--mint": "#62ead6",
        "--orange": "#a8f2d0",
        "--grid-line": "rgba(234, 255, 249, 0.02)",
        "--vignette": "rgba(0, 8, 8, 0.58)",
        "--mist-core": "rgba(230, 255, 246, 0.14)",
        "--mist-cyan": "rgba(100, 183, 255, 0.11)",
        "--mist-violet": "rgba(98, 234, 214, 0.14)",
        "--mist-gold": "rgba(215, 199, 122, 0.12)",
        "--mist-mint": "rgba(116, 245, 228, 0.11)",
        "--brand-core": "rgba(98, 234, 214, 0.88)",
        "--brand-ring": "rgba(45, 140, 129, 0.16)",
        "--brand-warm": "rgba(215, 199, 122, 0.22)",
        "--brand-shell": "#071a1a",
        "--button-a": "rgba(98, 234, 214, 0.24)",
        "--button-b": "rgba(100, 183, 255, 0.18)",
        "--eyebrow-border": "rgba(138, 226, 212, 0.2)",
        "--eyebrow-bg": "rgba(90, 224, 207, 0.08)",
        "--eyebrow-text": "#d8fff5",
        "--stage-core": "rgba(223, 255, 244, 0.14)",
        "--stage-cyan": "rgba(120, 232, 255, 0.12)",
        "--stage-violet": "rgba(96, 232, 213, 0.14)",
        "--stage-gold": "rgba(215, 199, 122, 0.11)",
        "--stage-shell": "rgba(9, 31, 29, 0.6)",
        "--stage-floor": "rgba(4, 14, 14, 0.34)",
        "--stage-before-core": "rgba(241, 255, 248, 0.14)",
        "--stage-before-cyan": "rgba(120, 232, 255, 0.12)",
        "--stage-before-violet": "rgba(96, 232, 213, 0.12)",
        "--stage-before-gold": "rgba(215, 199, 122, 0.1)",
        "--stage-after-cyan": "rgba(120, 232, 255, 0.07)",
        "--stage-after-core": "rgba(247, 255, 251, 0.08)",
        "--stage-after-gold": "rgba(215, 199, 122, 0.08)",
        "--stage-after-blue": "rgba(98, 234, 214, 0.08)"
      }
    },
    {
      id: "rose-harbor",
      name: "玫瑰星港",
      tag: "情绪更强",
      description: "偏内容消费产品的吸引力方向，柔和但不甜，适合验证更有记忆点的首页印象。",
      swatches: ["#ff8ea8", "#ffd8df", "#8bdfff", "#ffc686"],
      variables: {
        "--bg-0": "#130b16",
        "--bg-1": "#22111f",
        "--bg-2": "#3b1c2e",
        "--bg-end": "#08060a",
        "--bg-glow-a": "rgba(255, 142, 168, 0.22)",
        "--bg-glow-b": "rgba(255, 198, 134, 0.14)",
        "--bg-glow-c": "rgba(139, 223, 255, 0.16)",
        "--text": "#fff2f5",
        "--muted": "rgba(243, 218, 226, 0.7)",
        "--line": "rgba(255, 180, 200, 0.16)",
        "--panel-top": "rgba(35, 18, 31, 0.76)",
        "--panel-bottom": "rgba(18, 10, 15, 0.56)",
        "--panel-sheen": "rgba(255, 255, 255, 0.06)",
        "--cyan": "#8bdfff",
        "--gold": "#ffc686",
        "--rose": "#ff8ea8",
        "--mint": "#ffd8df",
        "--orange": "#ffb69e",
        "--grid-line": "rgba(255, 240, 244, 0.022)",
        "--vignette": "rgba(7, 3, 6, 0.62)",
        "--mist-core": "rgba(255, 236, 240, 0.15)",
        "--mist-cyan": "rgba(139, 223, 255, 0.13)",
        "--mist-violet": "rgba(255, 142, 168, 0.16)",
        "--mist-gold": "rgba(255, 198, 134, 0.12)",
        "--mist-mint": "rgba(255, 216, 223, 0.12)",
        "--brand-core": "rgba(255, 142, 168, 0.86)",
        "--brand-ring": "rgba(255, 95, 150, 0.16)",
        "--brand-warm": "rgba(139, 223, 255, 0.24)",
        "--brand-shell": "#180d15",
        "--button-a": "rgba(255, 142, 168, 0.22)",
        "--button-b": "rgba(139, 223, 255, 0.18)",
        "--eyebrow-border": "rgba(255, 180, 200, 0.2)",
        "--eyebrow-bg": "rgba(255, 142, 168, 0.08)",
        "--eyebrow-text": "#ffe7ee",
        "--stage-core": "rgba(255, 238, 242, 0.13)",
        "--stage-cyan": "rgba(139, 223, 255, 0.12)",
        "--stage-violet": "rgba(255, 142, 168, 0.14)",
        "--stage-gold": "rgba(255, 198, 134, 0.11)",
        "--stage-shell": "rgba(31, 16, 27, 0.58)",
        "--stage-floor": "rgba(12, 7, 11, 0.34)",
        "--stage-before-core": "rgba(255, 247, 249, 0.14)",
        "--stage-before-cyan": "rgba(139, 223, 255, 0.12)",
        "--stage-before-violet": "rgba(255, 142, 168, 0.13)",
        "--stage-before-gold": "rgba(255, 198, 134, 0.1)",
        "--stage-after-cyan": "rgba(139, 223, 255, 0.07)",
        "--stage-after-core": "rgba(255, 247, 249, 0.09)",
        "--stage-after-gold": "rgba(255, 198, 134, 0.08)",
        "--stage-after-blue": "rgba(255, 142, 168, 0.08)"
      }
    }
  ];

  const clusterGrid = document.getElementById("clusterGrid");
  const clusterStage = document.querySelector(".cluster-stage");
  const clusterCanvas = document.getElementById("clusterCanvas");
  const clusterContext = clusterCanvas.getContext("2d");
  const tooltip = document.getElementById("tooltip");
  const modal = document.getElementById("modal");
  const paletteModal = document.getElementById("paletteModal");
  const toast = document.getElementById("toast");
  const themeGrid = document.getElementById("themeGrid");
  const themeStatus = document.getElementById("themeStatus");
  const shardModal = document.getElementById("shardModal");
  const routeModal = document.getElementById("routeModal");
  const authModal = document.getElementById("authModal");
  const guideCard = document.getElementById("guideCard");
  const guideTitle = document.getElementById("guideTitle");
  const guideCopy = document.getElementById("guideCopy");
  const guideSteps = document.getElementById("guideSteps");
  const enterButton = document.getElementById("enterButton");
  const resetButton = document.getElementById("resetButton");

  const selectedTitle = document.getElementById("selectedTitle");
  const selectedSubtitle = document.getElementById("selectedSubtitle");
  const statusBadge = document.getElementById("statusBadge");
  const metricTimes = document.getElementById("metricTimes");
  const metricUnlock = document.getElementById("metricUnlock");
  const metricSignal = document.getElementById("metricSignal");
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");
  const tagList = document.getElementById("tagList");
  const snapshotText = document.getElementById("snapshotText");
  const quickList = document.getElementById("quickList");

  const modalTitle = document.getElementById("modalTitle");
  const modalHook = document.getElementById("modalHook");
  const modalBody = document.getElementById("modalBody");
  const modalFragments = document.getElementById("modalFragments");
  const modalMeta = document.getElementById("modalMeta");
  const modalTags = document.getElementById("modalTags");

  const authButton = document.getElementById("authButton");
  const recommendedTitle = document.getElementById("recommendedTitle");
  const recommendedCopy = document.getElementById("recommendedCopy");
  const recommendedAction = document.getElementById("recommendedAction");
  const preferenceBadge = document.getElementById("preferenceBadge");
  const preferenceHeadline = document.getElementById("preferenceHeadline");
  const preferenceSummary = document.getElementById("preferenceSummary");
  const preferenceTags = document.getElementById("preferenceTags");
  const recentShardsList = document.getElementById("recentShardsList");

  const shardCountMeta = document.getElementById("shardCountMeta");
  const shardLibraryList = document.getElementById("shardLibraryList");
  const shardDetailTitle = document.getElementById("shardDetailTitle");
  const shardDetailMeta = document.getElementById("shardDetailMeta");
  const shardDetailHook = document.getElementById("shardDetailHook");
  const shardDetailBody = document.getElementById("shardDetailBody");
  const shardDetailFragments = document.getElementById("shardDetailFragments");
  const shardDetailTags = document.getElementById("shardDetailTags");
  const shardReopenButton = document.getElementById("shardReopenButton");
  const shardSourceButton = document.getElementById("shardSourceButton");

  const routeStatusMeta = document.getElementById("routeStatusMeta");
  const routeExploreTotal = document.getElementById("routeExploreTotal");
  const routePlanetTotal = document.getElementById("routePlanetTotal");
  const routeShardTotal = document.getElementById("routeShardTotal");
  const routeLastExplore = document.getElementById("routeLastExplore");
  const routePreferenceSummary = document.getElementById("routePreferenceSummary");
  const routeTopTags = document.getElementById("routeTopTags");
  const routeTopPlanets = document.getElementById("routeTopPlanets");
  const routeRecentList = document.getElementById("routeRecentList");

  const authStateMeta = document.getElementById("authStateMeta");
  const authLead = document.getElementById("authLead");
  const authBodyCopy = document.getElementById("authBodyCopy");
  const authDisplayName = document.getElementById("authDisplayName");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authHelperNote = document.getElementById("authHelperNote");
  const authStatus = document.getElementById("authStatus");
  const loginActionButton = document.getElementById("loginActionButton");
  const registerActionButton = document.getElementById("registerActionButton");
  const logoutActionButton = document.getElementById("logoutActionButton");

  let activeSystemId = systems[0].id;
  let currentThemeId = defaultThemeId;
  let currentExploration = null;
  let selectedShardId = null;

  const cardsByPlanet = explorationCards.reduce((accumulator, card) => {
    if (!accumulator[card.planetId]) {
      accumulator[card.planetId] = [];
    }
    accumulator[card.planetId].push(card);
    return accumulator;
  }, {});

  const storageKey = "cloud-atlas-demo-profile-v1";
  const stateVersion = 3;
  const supabaseConfig = window.CLOUD_ATLAS_SUPABASE_CONFIG || {};
  const supabaseEnabled = Boolean(supabaseConfig.url && supabaseConfig.anonKey);
  const supabase = supabaseEnabled
    ? createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
    : null;
  let authSyncInFlight = false;
  let remoteSyncTimer = null;
  let authSubscription = null;
  const systemSeedState = systems.reduce((accumulator, system) => {
    accumulator[system.id] = {
      progress: system.progress,
      exploredTimes: system.exploredTimes,
      status: system.status
    };
    return accumulator;
  }, {});

  function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createDefaultAppState() {
    return {
      auth: {
        loggedIn: false,
        userName: "游客",
        userId: null,
        email: null
      },
      systems: cloneData(systemSeedState),
      shards: [],
      interactions: {
        clickedSystems: {},
        openedCards: {},
        confirmedCards: {},
        savedCards: {},
        tagScores: {},
        planetScores: {},
        recentExplores: [],
        lastExploredAt: null,
        confirmCount: 0,
        saveCount: 0
      },
      meta: {
        stateVersion,
        onboardingCompletedAt: null,
        onboardingDismissedAt: null,
        loginPromptSeen: false
      }
    };
  }

  function mergeCountRecord(...records) {
    return records.reduce((accumulator, record) => {
      Object.entries(record || {}).forEach(([key, value]) => {
        accumulator[key] = Math.max(accumulator[key] || 0, Number(value) || 0);
      });
      return accumulator;
    }, {});
  }

  function mergeUniqueBy(items, key, limit) {
    const sorted = (items || [])
      .filter(Boolean)
      .sort((left, right) => new Date(right.savedAt || 0) - new Date(left.savedAt || 0));
    const unique = [];
    const seen = new Set();
    sorted.forEach((item) => {
      const identity = item[key];
      if (!identity || seen.has(identity)) {
        return;
      }
      seen.add(identity);
      unique.push(item);
    });
    return typeof limit === "number" ? unique.slice(0, limit) : unique;
  }

  function getStatusRank(status) {
    if (status === "unlocked") {
      return 2;
    }
    if (status === "explored") {
      return 1;
    }
    return 0;
  }

  function mergeSystemStateRecords(primary = {}, secondary = {}) {
    const merged = cloneData(systemSeedState);
    Object.keys(merged).forEach((systemId) => {
      const first = primary[systemId] || {};
      const second = secondary[systemId] || {};
      const mergedProgress = Math.max(merged[systemId].progress, first.progress || 0, second.progress || 0);
      const mergedExploredTimes = Math.max(merged[systemId].exploredTimes, first.exploredTimes || 0, second.exploredTimes || 0);
      const statuses = [merged[systemId].status, first.status, second.status].filter(Boolean);
      const mergedStatus = statuses.sort((left, right) => getStatusRank(right) - getStatusRank(left))[0] || merged[systemId].status;

      merged[systemId] = {
        progress: mergedProgress,
        exploredTimes: mergedExploredTimes,
        status: mergedStatus
      };
    });
    return merged;
  }

  function mergePersistedState(primary = {}, secondary = {}) {
    const primaryInteractions = primary.interactions || {};
    const secondaryInteractions = secondary.interactions || {};

    return {
      systems: mergeSystemStateRecords(primary.systems || {}, secondary.systems || {}),
      shards: mergeUniqueBy([...(primary.shards || []), ...(secondary.shards || [])], "contentId"),
      interactions: {
        clickedSystems: mergeCountRecord(primaryInteractions.clickedSystems, secondaryInteractions.clickedSystems),
        openedCards: mergeCountRecord(primaryInteractions.openedCards, secondaryInteractions.openedCards),
        confirmedCards: mergeCountRecord(primaryInteractions.confirmedCards, secondaryInteractions.confirmedCards),
        savedCards: mergeCountRecord(primaryInteractions.savedCards, secondaryInteractions.savedCards),
        tagScores: mergeCountRecord(primaryInteractions.tagScores, secondaryInteractions.tagScores),
        planetScores: mergeCountRecord(primaryInteractions.planetScores, secondaryInteractions.planetScores),
        recentExplores: mergeUniqueBy([...(primaryInteractions.recentExplores || []), ...(secondaryInteractions.recentExplores || [])], "contentId", 8),
        lastExploredAt: [primaryInteractions.lastExploredAt, secondaryInteractions.lastExploredAt]
          .filter(Boolean)
          .sort((left, right) => new Date(right) - new Date(left))[0] || null,
        confirmCount: Math.max(primaryInteractions.confirmCount || 0, secondaryInteractions.confirmCount || 0),
        saveCount: Math.max(primaryInteractions.saveCount || 0, secondaryInteractions.saveCount || 0)
      },
      meta: {
        stateVersion: Math.max(primary.meta && primary.meta.stateVersion || 0, secondary.meta && secondary.meta.stateVersion || 0, stateVersion),
        onboardingCompletedAt: primary.meta && primary.meta.onboardingCompletedAt || secondary.meta && secondary.meta.onboardingCompletedAt || null,
        onboardingDismissedAt: primary.meta && primary.meta.onboardingDismissedAt || secondary.meta && secondary.meta.onboardingDismissedAt || null,
        loginPromptSeen: Boolean(primary.meta && primary.meta.loginPromptSeen) || Boolean(secondary.meta && secondary.meta.loginPromptSeen)
      }
    };
  }

  function buildMergedState(saved, authOverride = null) {
    const defaults = createDefaultAppState();
    const mergedSystems = cloneData(systemSeedState);
    Object.keys(mergedSystems).forEach((systemId) => {
      if (saved.systems && saved.systems[systemId]) {
        mergedSystems[systemId] = {
          ...mergedSystems[systemId],
          ...saved.systems[systemId]
        };
      }
    });

    return {
      auth: authOverride || {
        ...defaults.auth,
        ...(saved.auth || {})
      },
      systems: mergedSystems,
      shards: Array.isArray(saved.shards) ? saved.shards : [],
      interactions: {
        ...defaults.interactions,
        ...(saved.interactions || {}),
        clickedSystems: {
          ...defaults.interactions.clickedSystems,
          ...((saved.interactions && saved.interactions.clickedSystems) || {})
        },
        openedCards: {
          ...defaults.interactions.openedCards,
          ...((saved.interactions && saved.interactions.openedCards) || {})
        },
        confirmedCards: {
          ...defaults.interactions.confirmedCards,
          ...((saved.interactions && saved.interactions.confirmedCards) || {})
        },
        savedCards: {
          ...defaults.interactions.savedCards,
          ...((saved.interactions && saved.interactions.savedCards) || {})
        },
        tagScores: {
          ...defaults.interactions.tagScores,
          ...((saved.interactions && saved.interactions.tagScores) || {})
        },
        planetScores: {
          ...defaults.interactions.planetScores,
          ...((saved.interactions && saved.interactions.planetScores) || {})
        },
        recentExplores: Array.isArray(saved.interactions && saved.interactions.recentExplores) ? saved.interactions.recentExplores : [],
        lastExploredAt: saved.interactions && saved.interactions.lastExploredAt ? saved.interactions.lastExploredAt : null
      },
      meta: {
        ...defaults.meta,
        ...(saved.meta || {})
      }
    };
  }

  function loadAppState() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return createDefaultAppState();
      }
      return buildMergedState(JSON.parse(raw));
    } catch (error) {
      return createDefaultAppState();
    }
  }

  let appState = loadAppState();

  function persistLocalState() {
    window.localStorage.setItem(storageKey, JSON.stringify(appState));
  }

  function getRemoteStatePayload() {
    return {
      systems: appState.systems,
      shards: appState.shards,
      interactions: appState.interactions,
      meta: {
        stateVersion
      }
    };
  }

  function setAuthStatus(message = "", tone = "") {
    authStatus.textContent = message;
    authStatus.className = tone ? `auth-status ${tone}` : "auth-status";
  }

  async function saveRemoteState() {
    if (!supabase || !appState.auth.loggedIn || !appState.auth.userId) {
      return;
    }

    const payload = {
      user_id: appState.auth.userId,
      email: appState.auth.email,
      display_name: appState.auth.userName,
      app_state: getRemoteStatePayload()
    };

    const { error } = await supabase
      .from("user_profiles")
      .upsert(payload, { onConflict: "user_id" });

    if (error) {
      throw error;
    }
  }

  function persistAppState() {
    persistLocalState();
    if (!supabase || !appState.auth.loggedIn || !appState.auth.userId) {
      return;
    }

    window.clearTimeout(remoteSyncTimer);
    remoteSyncTimer = window.setTimeout(() => {
      saveRemoteState().catch((error) => {
        console.error(error);
        pulseToast("远端数据同步失败，请稍后重试");
      });
    }, 180);
  }

  async function loadRemoteStateForUser(user) {
    if (!supabase) {
      return null;
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .select("display_name, app_state")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      const bootstrapped = getRemoteStatePayload();
      const { error: insertError } = await supabase
        .from("user_profiles")
        .upsert({
          user_id: user.id,
          email: user.email || null,
          display_name: user.user_metadata && user.user_metadata.display_name ? user.user_metadata.display_name : appState.auth.userName,
          app_state: bootstrapped
        }, { onConflict: "user_id" });

      if (insertError) {
        throw insertError;
      }

      return bootstrapped;
    }

    return data.app_state || null;
  }

  async function applySession(session) {
    if (authSyncInFlight) {
      return;
    }

    authSyncInFlight = true;

    try {
      if (!session || !session.user) {
          appState = buildMergedState(getRemoteStatePayload(), {
          loggedIn: false,
          userName: "游客",
          userId: null,
          email: null
        });
        syncSystemsFromState();
        persistLocalState();
        renderSystems();
        renderSelectedPanel();
        renderInsightPanels();
        return;
      }

      const user = session.user;
      const authModel = {
        loggedIn: true,
        userName: user.user_metadata && user.user_metadata.display_name ? user.user_metadata.display_name : (user.email ? user.email.split("@")[0] : "观测员"),
        userId: user.id,
        email: user.email || null
      };

      const remoteState = await loadRemoteStateForUser(user);
        const mergedState = mergePersistedState(remoteState || {}, getRemoteStatePayload());
        appState = buildMergedState(mergedState, authModel);
      syncSystemsFromState();
        persistAppState();
      renderSystems();
      renderSelectedPanel();
      renderInsightPanels();
    } catch (error) {
      console.error(error);
      setAuthStatus(`账号同步失败：${error.message}`, "error");
    } finally {
      authSyncInFlight = false;
    }
  }

  async function initializeSupabaseAuth() {
    if (!supabase) {
      setAuthStatus("尚未配置 Supabase。请先填写 demo/supabase-config.js。", "error");
      return;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setAuthStatus(`读取会话失败：${error.message}`, "error");
    }

    await applySession(data ? data.session : null);
    if (!authSubscription) {
      const result = supabase.auth.onAuthStateChange((_event, session) => {
        applySession(session);
      });
      authSubscription = result.data.subscription;
    }
  }

  function syncSystemsFromState() {
    systems.forEach((system) => {
      const systemState = appState.systems[system.id];
      if (!systemState) {
        return;
      }
      system.progress = systemState.progress;
      system.exploredTimes = systemState.exploredTimes;
      system.status = systemState.status;
    });
  }

  function updateStoredSystem(system) {
    appState.systems[system.id] = {
      progress: system.progress,
      exploredTimes: system.exploredTimes,
      status: system.status
    };
  }

  function incrementCounter(record, key, amount = 1) {
    record[key] = (record[key] || 0) + amount;
  }

  function formatTimeLabel(isoString) {
    if (!isoString) {
      return "--";
    }
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  function releaseModalFocus(container) {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && container.contains(activeElement)) {
      activeElement.blur();
    }
  }

  function getSystemById(systemId) {
    return systems.find((system) => system.id === systemId) || systems[0];
  }

  function getCardById(contentId) {
    return explorationCards.find((card) => card.contentId === contentId) || null;
  }

  function getCardPriority(card) {
    if (card.priority === "P1") {
      return 3;
    }
    if (card.priority === "P2") {
      return 2;
    }
    if (card.priority === "P3") {
      return 1;
    }
    if (card.difficultyLevel === "L1") {
      return 3;
    }
    if (card.difficultyLevel === "L2") {
      return 2;
    }
    return 1;
  }

  function getSystemAffinityTags(system) {
    const cards = cardsByPlanet[system.id] || [];
    return new Set([
      ...system.tags,
      ...cards.flatMap((card) => [
        ...(card.topicTags || []),
        ...(card.moodTags || []),
        ...(card.formatTags || [])
      ])
    ]);
  }

  function getRecommendationReason(system) {
    const topTags = getTopEntries(appState.interactions.tagScores, 3).map(([tag]) => tag);
    const matchingTags = topTags.filter((tag) => getSystemAffinityTags(system).has(tag));
    const planetScore = appState.interactions.planetScores[system.id] || 0;
    const unseenCards = (cardsByPlanet[system.id] || []).filter((card) => !(appState.interactions.confirmedCards[card.contentId] || 0)).length;

    if (topTags.length === 0) {
      return `${system.subtitle} 这颗星球更适合作为第一次探索入口，信息门槛适中，也更容易形成第一次收藏。`;
    }

    if (matchingTags.length >= 2) {
      return `你最近连续对「${matchingTags[0]}」和「${matchingTags[1]}」有反应，这颗星球的题材气质和你的偏好轨迹最接近。`;
    }

    if (planetScore > 0.8 && unseenCards > 0) {
      return `你已经多次靠近这个星球，系统优先把这里还没完全看完的内容继续推给你，避免兴趣被中途打断。`;
    }

    if (matchingTags.length === 1) {
      return `你最近对「${matchingTags[0]}」这类题材更敏感，这颗星球会把这条兴趣线继续往下展开。`;
    }

    return unseenCards > 0
      ? `这个方向还有 ${unseenCards} 张未确认的探索卡，适合继续往深处挖，而不是重复停留在已经看过的内容上。`
      : `${system.subtitle} 虽然你已经来过这里，但它和你最近的兴趣轨迹仍然最接近。`;
  }

  function getCardForSystem(system, preferredContentId) {
    const cards = cardsByPlanet[system.id] || [];
    if (preferredContentId) {
      return cards.find((card) => card.contentId === preferredContentId) || cards[0] || null;
    }
    if (cards.length === 0) {
      return null;
    }

    const recentContentIds = new Set(appState.interactions.recentExplores.slice(0, 4).map((entry) => entry.contentId));
    const ranked = cards
      .map((card) => {
        const openedCount = appState.interactions.openedCards[card.contentId] || 0;
        const confirmedCount = appState.interactions.confirmedCards[card.contentId] || 0;
        const savedCount = appState.interactions.savedCards[card.contentId] || 0;
        let score = getCardPriority(card) * 12;

        if (system.exploredTimes === 0) {
          score += card.difficultyLevel === "L1" ? 16 : card.difficultyLevel === "L2" ? 12 : -8;
        } else if (system.progress >= 50) {
          score += card.difficultyLevel === "L3" ? 8 : 3;
        } else {
          score += card.difficultyLevel === "L3" ? -4 : 4;
        }

        if (openedCount === 0) {
          score += 8;
        } else {
          score -= openedCount * 2;
        }

        if (confirmedCount === 0) {
          score += 28;
        } else {
          score -= confirmedCount * 18;
        }

        if (savedCount > 0 || isSavedShard(card.contentId)) {
          score -= 24;
        }

        if (recentContentIds.has(card.contentId)) {
          score -= 20;
        }

        return { card, score };
      })
      .sort((left, right) => right.score - left.score || left.card.title.localeCompare(right.card.title, "zh-CN"));

    return ranked[0].card;
  }

  function isSavedShard(contentId) {
    return appState.shards.some((shard) => shard.contentId === contentId);
  }

  function maybePromptLogin(actionLabel) {
    if (appState.auth.loggedIn || appState.meta.loginPromptSeen) {
      return;
    }
    appState.meta.loginPromptSeen = true;
    persistAppState();
    authHelperNote.textContent = `${actionLabel}已经保存在当前设备。登录账号后，当前设备上的探索进度、碎片收藏和偏好轨迹可以继续同步到云端。`;
  }

  function registerPreference(card, weight) {
    card.topicTags.forEach((tag) => {
      incrementCounter(appState.interactions.tagScores, tag, weight);
    });
    card.moodTags.forEach((tag) => {
      incrementCounter(appState.interactions.tagScores, tag, weight * 0.8);
    });
    incrementCounter(appState.interactions.planetScores, card.planetId, weight + 0.4);
  }

  function getTopEntries(record, limit = 3) {
    return Object.entries(record)
      .sort((left, right) => right[1] - left[1])
      .slice(0, limit);
  }

  function buildPreferenceSummary() {
    const topTags = getTopEntries(appState.interactions.tagScores, 3);
    const topPlanets = getTopEntries(appState.interactions.planetScores, 3);

    if (topTags.length === 0 && topPlanets.length === 0) {
      return {
        headline: "偏好轨迹正在形成",
        summary: "当前更像在广泛观察各个文明，系统会继续根据你的探索与收藏行为归纳兴趣方向。",
        tags: []
      };
    }

    const primaryPlanet = topPlanets.length > 0 ? getSystemById(topPlanets[0][0]).name : "银河边界";
    const primaryTag = topTags.length > 0 ? topTags[0][0] : "探索行为";
    const secondaryTag = topTags.length > 1 ? topTags[1][0] : "未知感";

    return {
      headline: `你正在向「${primaryPlanet}」这类文明靠拢`,
      summary: `最近的探索更容易被「${primaryTag}」和「${secondaryTag}」这类题材吸引，系统会优先把相邻气质的星球推到你面前。`,
      tags: topTags.map(([tag]) => tag)
    };
  }

  function shouldShowOnboarding() {
    return !appState.meta.onboardingCompletedAt && !appState.meta.onboardingDismissedAt && appState.interactions.confirmCount === 0;
  }

  function completeOnboarding(mode) {
    if (mode === "dismissed") {
      appState.meta.onboardingDismissedAt = appState.meta.onboardingDismissedAt || new Date().toISOString();
    } else {
      appState.meta.onboardingCompletedAt = appState.meta.onboardingCompletedAt || new Date().toISOString();
    }
    persistAppState();
  }

  function renderGuideCard() {
    if (!shouldShowOnboarding()) {
      guideCard.hidden = true;
      return;
    }

    const system = getRecommendedSystem();
    const targetName = system.status === "locked" ? system.unknownName : system.name;
    guideCard.hidden = false;
    guideTitle.textContent = "先完成一次探索，看看这张云图会不会让你想回来";
    guideCopy.textContent = appState.auth.loggedIn
      ? "你现在已经登录，第一次探索会直接写入云端档案。建议先读完一张卡，再决定要不要把它收进碎片库。"
      : "你现在可以先以游客身份完成第一次探索。确认探索和收藏碎片都会保存在当前设备，登录后再同步到云端。";
    guideSteps.innerHTML = [
      {
        title: `先从「${targetName}」开始`,
        description: "点开一颗星球或直接使用下方入口，先读完一张探索卡。"
      },
      {
        title: "确认探索，留下第一次航迹",
        description: "确认后会累计探索值和探索次数，下次回来也能看见变化。"
      },
      {
        title: "喜欢就存入碎片库",
        description: "之后你可以从碎片库再次打开这条内容，或者直接回到来源星球继续探索。"
      }
    ].map((step, index) => `
      <article class="guide-step">
        <span class="guide-step-index">${index + 1}</span>
        <div>
          <strong>${step.title}</strong>
          <p>${step.description}</p>
        </div>
      </article>
    `).join("");
    enterButton.textContent = `开始探索 ${targetName}`;
    resetButton.textContent = "我先随便看看";
    enterButton.dataset.systemId = system.id;
  }

  function trackRecentExplore(system, card) {
    const item = {
      systemId: system.id,
      contentId: card.contentId,
      title: card.title,
      savedAt: new Date().toISOString(),
      hook: card.hook
    };
    appState.interactions.recentExplores = [item, ...appState.interactions.recentExplores.filter((entry) => entry.contentId !== item.contentId)].slice(0, 8);
    appState.interactions.lastExploredAt = item.savedAt;
  }

  const statusText = {
    locked: "未探索",
    explored: "已探索",
    unlocked: "已命名"
  };

  const systemThemeProfiles = {
    craft: {
      themeId: "turquoise-ruins",
      label: "手工材料与自然质感"
    },
    intangible: {
      themeId: "amber-dust",
      label: "活态传承与人间温度"
    },
    myth: {
      themeId: "violet-fog",
      label: "边界神话与未知感"
    },
    dunhuang: {
      themeId: "amber-dust",
      label: "壁光、流沙与丝路华彩"
    },
    cthulhu: {
      themeId: "deep-ice",
      label: "深海恐惧与宇宙寒意"
    },
    qin: {
      themeId: "deep-ice",
      label: "冷峻秩序与帝国骨架"
    },
    tang: {
      themeId: "rose-harbor",
      label: "开放盛世与明亮港口"
    },
    fungi: {
      themeId: "turquoise-ruins",
      label: "潮湿秘林与地下网络"
    },
    invention: {
      themeId: "amber-dust",
      label: "遗迹机械与古怪装置"
    },
    otherworld: {
      themeId: "violet-fog",
      label: "异界门扉与规则切换"
    }
  };

  const visualProfiles = {
    craft: { variant: "forest", size: 10, depth: 70 },
    intangible: { variant: "heritage", size: 10, depth: 42 },
    myth: { variant: "myth", size: 11, depth: 96 },
    dunhuang: { variant: "desert", size: 12, depth: 122 },
    cthulhu: { variant: "abyss", size: 10, depth: 86 },
    qin: { variant: "imperial", size: 10, depth: 28 },
    tang: { variant: "heritage", size: 11, depth: 58 },
    fungi: { variant: "forest", size: 9, depth: -18 },
    invention: { variant: "desert", size: 9, depth: 6 },
    otherworld: { variant: "gateway", size: 11, depth: 112 }
  };

  const sceneState = {
    targetYaw: 0.42,
    targetPitch: -0.18,
    currentYaw: 0.42,
    currentPitch: -0.18,
    idleYawSpeed: 0.0000012,
    orbitDriftFactor: 0.018,
    currentZoom: 1,
    targetZoom: 1.12,
    cameraOffsetX: 0,
    cameraOffsetY: 0,
    cameraOffsetZ: 0,
    targetOffsetX: 0,
    targetOffsetY: 0,
    targetOffsetZ: 0,
    frame: 0,
    lastFrame: 0,
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    lastMoveTime: 0,
    velocityYaw: 0,
    velocityPitch: 0
  };

  const clusterParticles = [];
  const orbitalBands = [];
  const sceneSystems = [];
  const sceneMetrics = {
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    depth: 980,
    radiusX: 320,
    radiusY: 182
  };

  function getVisualProfile(system) {
    return visualProfiles[system.id] || { variant: "myth", size: 10, depth: 40 };
  }

  function gaussian() {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function updateSceneMetrics() {
    const rect = clusterStage.getBoundingClientRect();
    sceneMetrics.width = rect.width;
    sceneMetrics.height = rect.height;
    sceneMetrics.centerX = rect.width / 2;
    sceneMetrics.centerY = rect.height / 2;
    sceneMetrics.radiusX = rect.width * 0.34;
    sceneMetrics.radiusY = rect.height * 0.23;
    const ratio = window.devicePixelRatio || 1;
    clusterCanvas.width = Math.max(1, Math.round(rect.width * ratio));
    clusterCanvas.height = Math.max(1, Math.round(rect.height * ratio));
    clusterCanvas.style.width = rect.width + "px";
    clusterCanvas.style.height = rect.height + "px";
    clusterContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createParticlePoint(kind, armIndex) {
    if (kind === "core") {
      const radius = Math.pow(Math.random(), 0.58) * 82;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius * 0.95,
        y: gaussian() * 18,
        z: Math.sin(angle) * radius * 0.72 + gaussian() * 42,
        sway: Math.random() * Math.PI * 2,
        orbit: 0.0014 + Math.random() * 0.0024,
        lift: 0.08 + Math.random() * 0.16,
        roll: Math.random() * Math.PI * 2
      };
    }

    if (kind === "arm") {
      const radius = Math.pow(Math.random(), 0.72) * 270 + 42;
      const spiral = radius * 0.028 + armIndex * ((Math.PI * 2) / 3) - 0.9 + gaussian() * 0.18;
      return {
        x: Math.cos(spiral) * radius * 1.06 + gaussian() * 18,
        y: gaussian() * (10 + radius * 0.018),
        z: Math.sin(spiral) * radius * 0.84 + gaussian() * 54,
        sway: Math.random() * Math.PI * 2,
        orbit: 0.0005 + Math.random() * 0.0012,
        lift: 0.05 + Math.random() * 0.12,
        roll: spiral
      };
    }

    return {
      x: gaussian() * 340,
      y: gaussian() * 160,
      z: -260 - Math.random() * 340,
      sway: Math.random() * Math.PI * 2,
      orbit: 0.00015 + Math.random() * 0.00035,
      lift: 0.02 + Math.random() * 0.08,
      roll: Math.random() * Math.PI * 2
    };
  }

  function createOrbitalBand(index) {
    return {
      radiusX: sceneMetrics.radiusX * (0.46 + index * 0.18),
      radiusZ: sceneMetrics.radiusX * (0.24 + index * 0.14),
      y: (index - 1) * 22,
      tilt: -0.48 + index * 0.36,
      rotation: Math.random() * Math.PI * 2,
      speed: 0.00008 + index * 0.00003,
      color: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.07)", "rgba(255, 255, 255, 0.05)"][index]
    };
  }

  function systemToWorldPoint(system, profile) {
    const x = ((system.x - 50) / 50) * sceneMetrics.radiusX;
    const y = ((system.y - 50) / 50) * sceneMetrics.radiusY;
    const z = profile.depth * 2.4 + Math.sin((system.x + system.y) * 0.08) * 26;
    return {
      x,
      y,
      z,
      orbit: 0.0006 + (profile.depth + 40) / 180000,
      lift: 0.04 + (profile.size - 9) * 0.015,
      phase: (system.x + system.y) * 0.08
    };
  }

  function projectPoint(point, yaw, pitch, zoom, time) {
    const orbitAngle = point.orbit ? point.orbit * time * sceneState.orbitDriftFactor + (point.phase || 0) : 0;
    const orbitX = point.x * Math.cos(orbitAngle) - point.z * Math.sin(orbitAngle);
    const orbitZ = point.z * Math.cos(orbitAngle) + point.x * Math.sin(orbitAngle);
    const orbitY = point.y + Math.sin(time * 0.0012 + (point.sway || point.phase || 0)) * (point.lift || 0) * 28;

    const shiftedX = orbitX + sceneState.cameraOffsetX;
    const shiftedY = orbitY + sceneState.cameraOffsetY;
    const shiftedZ = orbitZ + sceneState.cameraOffsetZ;

    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    const x1 = shiftedX * cosYaw - shiftedZ * sinYaw;
    const z1 = shiftedZ * cosYaw + shiftedX * sinYaw;

    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const y2 = shiftedY * cosPitch - z1 * sinPitch;
    const z2 = z1 * cosPitch + shiftedY * sinPitch;

    const perspective = sceneMetrics.depth / (sceneMetrics.depth - z2);
    return {
      x: sceneMetrics.centerX + x1 * perspective * zoom,
      y: sceneMetrics.centerY + y2 * perspective * zoom,
      scale: perspective * zoom,
      depth: z2
    };
  }

  function createClusterParticle(className, color, size, opacity, point) {
    clusterParticles.push({
      point,
      baseSize: size,
      baseOpacity: opacity,
      twinkle: Math.random() * Math.PI * 2,
      tint: color,
      kind: className,
      streak: 0.8 + Math.random() * 2.4,
      luminanceBias: Math.random() * 0.32,
      softness: 0.42 + Math.random() * 0.22
    });
  }

  function createClusterParticles() {
    clusterParticles.length = 0;
    orbitalBands.length = 0;

    const coreCount = 230;
    const armCount = 900;
    const farCount = 290;
    const colors = ["rgba(255, 255, 255, 0.68)", "rgba(255, 255, 255, 0.54)", "rgba(255, 255, 255, 0.42)"];

    for (let index = 0; index < coreCount; index += 1) {
      const size = Math.random() * 2.1 + 0.9;
      const opacity = 0.22 + Math.random() * 0.36;
      createClusterParticle("core", colors[index % colors.length], size, opacity, createParticlePoint("core", index % 3));
    }

    for (let index = 0; index < armCount; index += 1) {
      const armIndex = index % 3;
      const size = Math.random() * 1.65 + 0.55;
      const opacity = 0.1 + Math.random() * 0.24;
      createClusterParticle("arm", colors[armIndex], size, opacity, createParticlePoint("arm", armIndex));
    }

    for (let index = 0; index < farCount; index += 1) {
      const size = Math.random() * 1.1 + 0.35;
      const opacity = 0.04 + Math.random() * 0.08;
      createClusterParticle("far", "rgba(255, 255, 255, 0.18)", size, opacity, createParticlePoint("far", 0));
    }

    for (let index = 0; index < 3; index += 1) {
      orbitalBands.push(createOrbitalBand(index));
    }
  }

  function getSignalForSystem(system) {
    const score = appState.interactions.planetScores[system.id] || 0;
    if (score >= 5) {
      return "强";
    }
    if (score >= 2) {
      return "中";
    }
    return system.signal;
  }

  function getRecommendedSystem() {
    const scored = systems
      .map((system) => {
        let score = system.progress * 0.04 + system.exploredTimes * 0.3;
        system.tags.forEach((tag) => {
          score += (appState.interactions.tagScores[tag] || 0) * 2.2;
        });
        score += (appState.interactions.planetScores[system.id] || 0) * 1.6;
        if (system.id === activeSystemId) {
          score -= 99;
        }
        return { system, score };
      })
      .sort((left, right) => right.score - left.score);

    return (scored[0] && scored[0].system) || systems[0];
  }

  function renderQuickList() {
    const list = [...systems]
      .sort((left, right) => right.exploredTimes - left.exploredTimes)
      .slice(0, 3);

    quickList.innerHTML = list.map((item) => `
      <article class="quick-item">
        <span class="quick-dot" style="color:${item.color}; background:${item.color};"></span>
        <div class="quick-copy">
          <strong>${item.status === "locked" ? item.unknownName : item.name}</strong>
          <span>${item.subtitle}</span>
        </div>
        <em>${item.exploredTimes} 次</em>
      </article>
    `).join("");
  }

  function renderRecommendedPanel() {
    const system = getRecommendedSystem();
    recommendedTitle.textContent = system.status === "locked" ? system.unknownName : system.name;
    recommendedCopy.textContent = getRecommendationReason(system);
    recommendedAction.dataset.systemId = system.id;
    recommendedAction.textContent = appState.interactions.confirmCount > 0 ? "沿推荐航线继续探索" : "从这颗星开始第一次探索";
  }

  function renderPreferencePanel() {
    const model = buildPreferenceSummary();
    preferenceHeadline.textContent = model.headline;
    preferenceSummary.textContent = model.summary;
    preferenceTags.innerHTML = model.tags.length > 0
      ? model.tags.map((tag) => `<span class="preference-tag">${tag}</span>`).join("")
      : '<span class="preference-tag">继续探索以生成偏好</span>';
    preferenceBadge.textContent = appState.auth.loggedIn ? "云端档案" : "当前设备";
  }

  function renderRecentShardsPanel() {
    const shards = [...appState.shards]
      .sort((left, right) => new Date(right.savedAt) - new Date(left.savedAt))
      .slice(0, 3);

    if (shards.length === 0) {
      recentShardsList.innerHTML = '<div class="shard-empty">还没有收藏任何碎片。完成一次探索后点击“收藏为星际碎片”，这里会开始沉淀你的个人知识资产。</div>';
      return;
    }

    recentShardsList.innerHTML = shards.map((shard) => `
      <article class="shard-item" data-shard-id="${shard.shardId}">
        <strong>${shard.title}</strong>
        <span>${shard.planetName} · ${formatTimeLabel(shard.savedAt)}</span>
        <p>${shard.hook}</p>
      </article>
    `).join("");

    recentShardsList.querySelectorAll(".shard-item").forEach((node) => {
      node.addEventListener("click", () => {
        openShardModal(node.dataset.shardId);
      });
    });
  }

  function renderAuthUI() {
    authButton.textContent = appState.auth.loggedIn ? `${appState.auth.userName} · 已登录` : "游客体验";
    authStateMeta.textContent = appState.auth.loggedIn ? "Supabase 账号已连接" : "当前为游客体验";
    authLead.textContent = appState.auth.loggedIn
      ? "当前探索进度、碎片收藏和偏好轨迹会同步到 Supabase 数据库。"
      : "你可以先以游客方式探索银河。确认探索、收藏碎片和偏好沉淀会保存在当前设备，登录后再同步到云端。";
    authBodyCopy.textContent = appState.auth.loggedIn
      ? `你已经以「${appState.auth.userName}」身份登录，后续探索会写入真实用户数据。`
      : "你现在处于游客状态，可以正常确认探索和收藏碎片；登录账号后，这些记录会继续同步到 Supabase。";
    loginActionButton.textContent = appState.auth.loggedIn ? "已登录" : "登录";
    registerActionButton.textContent = appState.auth.loggedIn ? "已注册" : "注册";
    logoutActionButton.textContent = appState.auth.loggedIn ? "退出登录" : "继续游客浏览";
    loginActionButton.disabled = appState.auth.loggedIn || !supabaseEnabled;
    registerActionButton.disabled = appState.auth.loggedIn || !supabaseEnabled;
    routeStatusMeta.textContent = appState.auth.loggedIn ? "云端观测档案" : "游客观察模式";
    authDisplayName.disabled = appState.auth.loggedIn || !supabaseEnabled;
    authEmail.disabled = appState.auth.loggedIn || !supabaseEnabled;
    authPassword.disabled = appState.auth.loggedIn || !supabaseEnabled;
    authDisplayName.value = appState.auth.loggedIn ? appState.auth.userName || "" : authDisplayName.value;
    authEmail.value = appState.auth.loggedIn ? appState.auth.email || "" : authEmail.value;
    authPassword.value = "";
    authHelperNote.textContent = supabaseEnabled
      ? "使用 Supabase Auth 的邮箱密码登录。注册成功后，探索进度与碎片会同步到数据库。"
      : "尚未配置 Supabase，请先填写 demo/supabase-config.js 里的 url 和 anonKey。";
  }

  function readAuthForm() {
    return {
      displayName: authDisplayName.value.trim(),
      email: authEmail.value.trim(),
      password: authPassword.value
    };
  }

  function renderShardDetail(shard) {
    if (!shard) {
      shardDetailTitle.textContent = "还没有收藏任何碎片";
      shardDetailMeta.textContent = "等待收藏";
      shardDetailHook.textContent = "当你在探索弹层里点击“收藏为星际碎片”后，这里会开始记录来源星球、摘要和标签。";
      shardDetailBody.innerHTML = "";
      shardDetailFragments.innerHTML = "";
      shardDetailTags.innerHTML = "";
      shardReopenButton.disabled = true;
      shardSourceButton.disabled = true;
      return;
    }

    shardDetailTitle.textContent = shard.title;
    shardDetailMeta.textContent = `${shard.planetName} · ${formatTimeLabel(shard.savedAt)}`;
    shardDetailHook.textContent = shard.hook;
    shardDetailBody.innerHTML = shard.body.split("\n\n").map(function(p) { return "<p>" + p.replace(/\n/g, "<br>") + "</p>"; }).join("");
    shardDetailFragments.innerHTML = shard.extraFragments.map((fragment) => `<li>${fragment}</li>`).join("");
    shardDetailTags.innerHTML = shard.tags.map((tag) => `<span class="meta-tag">${tag}</span>`).join("");
    shardReopenButton.disabled = false;
    shardSourceButton.disabled = false;
    shardReopenButton.dataset.contentId = shard.contentId;
    shardSourceButton.dataset.systemId = shard.planetId;
    shardSourceButton.textContent = `回到 ${shard.planetName} 继续探索`;
  }

  function renderShardLibrary(selectedId = selectedShardId) {
    const shards = [...appState.shards].sort((left, right) => new Date(right.savedAt) - new Date(left.savedAt));
    shardCountMeta.textContent = `${shards.length} 条碎片`;
    selectedShardId = selectedId || (shards[0] && shards[0].shardId) || null;

    if (shards.length === 0) {
      shardLibraryList.innerHTML = '<div class="shard-empty">碎片库还是空的。先去完成一次探索，再把真正想留下的那张卡收进来。</div>';
      renderShardDetail(null);
      return;
    }

    shardLibraryList.innerHTML = shards.map((shard) => `
      <article class="library-item ${shard.shardId === selectedShardId ? "active" : ""}" data-shard-id="${shard.shardId}">
        <strong>${shard.title}</strong>
        <span>${shard.planetName} · ${formatTimeLabel(shard.savedAt)}</span>
        <p>${shard.hook}</p>
      </article>
    `).join("");

    shardLibraryList.querySelectorAll(".library-item").forEach((node) => {
      node.addEventListener("click", () => {
        selectedShardId = node.dataset.shardId;
        renderShardLibrary(selectedShardId);
      });
    });

    renderShardDetail(shards.find((shard) => shard.shardId === selectedShardId) || shards[0]);
  }

  function renderRouteSummary() {
    const exploredPlanets = systems.filter((system) => system.exploredTimes > 0).length;
    const topPlanets = getTopEntries(appState.interactions.planetScores, 3);
    const topTags = getTopEntries(appState.interactions.tagScores, 3);
    const preference = buildPreferenceSummary();

    routeExploreTotal.textContent = String(appState.interactions.confirmCount);
    routePlanetTotal.textContent = String(exploredPlanets);
    routeShardTotal.textContent = String(appState.shards.length);
    routeLastExplore.textContent = formatTimeLabel(appState.interactions.lastExploredAt);
    routePreferenceSummary.textContent = preference.summary;
    routeTopTags.innerHTML = topTags.length > 0
      ? topTags.map(([tag]) => `<span class="preference-tag">${tag}</span>`).join("")
      : '<span class="preference-tag">暂无稳定标签</span>';
    routeTopPlanets.innerHTML = topPlanets.length > 0
      ? topPlanets.map(([planetId, value]) => {
        const system = getSystemById(planetId);
        return `
          <article class="route-item">
            <strong>${system.name}</strong>
            <span>偏好权重 ${value.toFixed(1)} · 探索 ${system.exploredTimes} 次</span>
            <p>${system.subtitle}</p>
          </article>
        `;
      }).join("")
      : '<div class="shard-empty">继续探索后，这里会显示你最常靠近的星球。</div>';
    routeRecentList.innerHTML = appState.interactions.recentExplores.length > 0
      ? appState.interactions.recentExplores.map((entry) => {
        const system = getSystemById(entry.systemId);
        return `
          <article class="library-item" data-content-id="${entry.contentId}">
            <strong>${entry.title}</strong>
            <span>${system.name} · ${formatTimeLabel(entry.savedAt)}</span>
            <p>${entry.hook}</p>
          </article>
        `;
      }).join("")
      : '<div class="shard-empty">你最近的航迹还没有生成。先完成一次探索，航迹就会开始留下来。</div>';

    routeRecentList.querySelectorAll(".library-item").forEach((node) => {
      node.addEventListener("click", () => {
        const card = getCardById(node.dataset.contentId);
        if (!card) {
          return;
        }
        const system = getSystemById(card.planetId);
        setActive(system.id, true);
        openModal(system, card.contentId);
      });
    });
  }

  function renderInsightPanels() {
    renderGuideCard();
    renderQuickList();
    renderRecommendedPanel();
    renderPreferencePanel();
    renderRecentShardsPanel();
    renderShardLibrary(selectedShardId);
    renderRouteSummary();
    renderAuthUI();
  }

  function renderSystems() {
    clusterGrid.innerHTML = "";
    sceneSystems.length = 0;
    systems.forEach((system) => {
      const profile = getVisualProfile(system);
      const button = document.createElement("button");
      button.className = `system ${system.status} planet-${profile.variant}`;
      button.dataset.id = system.id;
      button.setAttribute("aria-label", system.name);
      button.style.color = system.color;
      button.style.setProperty("--planet-main", system.color);
      button.style.setProperty("--planet-shadow", `color-mix(in srgb, ${system.color} 58%, transparent)`);
      button.style.setProperty("--planet-size", profile.size + "px");
      button.innerHTML = "<span class=\"planet-aura\"></span><span class=\"planet-ring\"></span><span class=\"planet-core\"></span>";

      button.addEventListener("mouseenter", (event) => {
        setActive(system.id, false);
        showTooltip(system, event.currentTarget);
      });

      button.addEventListener("mousemove", (event) => {
        positionTooltip(event.clientX, event.clientY);
      });

      button.addEventListener("mouseleave", () => {
        hideTooltip();
      });

      button.addEventListener("focus", (event) => {
        setActive(system.id, false);
        showTooltip(system, event.currentTarget);
      });

      button.addEventListener("blur", hideTooltip);
      button.addEventListener("click", () => {
        setActive(system.id, true);
        openModal(system);
      });

      clusterGrid.appendChild(button);
      sceneSystems.push({
        node: button,
        system,
        profile,
        point: systemToWorldPoint(system, profile)
      });
    });
    syncActiveButton();
  }

  function getThemePreviewStyle(theme) {
    const previewVariables = {
      "--preview-bg-0": theme.variables["--bg-0"],
      "--preview-bg-1": theme.variables["--bg-1"],
      "--preview-bg-end": theme.variables["--bg-end"],
      "--preview-glow-a": theme.variables["--bg-glow-a"],
      "--preview-glow-b": theme.variables["--bg-glow-b"],
      "--preview-glow-c": theme.variables["--bg-glow-c"],
      "--preview-grid": theme.variables["--grid-line"],
      "--preview-panel-top": theme.variables["--panel-top"],
      "--preview-panel-bottom": theme.variables["--panel-bottom"],
      "--preview-stage-core": theme.variables["--stage-core"],
      "--preview-stage-cyan": theme.variables["--stage-cyan"],
      "--preview-stage-violet": theme.variables["--stage-violet"],
      "--preview-stage-gold": theme.variables["--stage-gold"],
      "--preview-brand-core": theme.variables["--brand-core"]
    };

    return Object.entries(previewVariables).map(([name, value]) => `${name}: ${value};`).join(" ");
  }

  function syncThemeCards() {
    themeGrid.querySelectorAll(".theme-card").forEach((node) => {
      const isActive = node.dataset.themeId === currentThemeId;
      node.classList.toggle("active", isActive);
      node.setAttribute("aria-pressed", isActive ? "true" : "false");
      const label = node.querySelector(".theme-active-label");
      if (label) {
        label.textContent = isActive ? "当前应用" : "点击试用";
      }
    });
  }

  function applyTheme(themeId, announce = true) {
    const theme = themes.find((item) => item.id === themeId) || themes[0];
    currentThemeId = theme.id;
    Object.entries(theme.variables).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
    themeStatus.textContent = `当前方案：${theme.name}`;
    syncThemeCards();
    if (announce) {
      pulseToast("已切换到「" + theme.name + "」");
    }
    return theme;
  }

  function getThemeProfileForSystem(system) {
    return systemThemeProfiles[system.id] || {
      themeId: defaultThemeId,
      label: "默认主视觉"
    };
  }

  function applySystemTheme(system, announce = true) {
    const profile = getThemeProfileForSystem(system);
    const theme = applyTheme(profile.themeId, false);
    themeStatus.textContent = `当前方案：${theme.name} · ${system.name}`;
    if (announce) {
      pulseToast("已靠近「" + system.name + "」，场域切换为「" + theme.name + "」");
    }
    return { theme, profile };
  }

  function renderThemeCards() {
    themeGrid.innerHTML = themes.map((theme) => `
      <button class="theme-card" type="button" data-theme-id="${theme.id}" aria-pressed="false">
        <div class="theme-card-preview" style="${getThemePreviewStyle(theme)}">
          <span class="theme-card-orbit"></span>
          <span class="theme-card-core"></span>
          <span class="theme-card-panel"></span>
        </div>
        <div class="theme-card-meta">
          <h4 class="theme-card-title">${theme.name}</h4>
          <span class="theme-card-tag">${theme.tag}</span>
        </div>
        <p class="theme-card-copy">${theme.description}</p>
        <div class="theme-card-meta">
          <div class="theme-card-swatches">
            ${theme.swatches.map((color) => `<span style="background:${color}"></span>`).join("")}
          </div>
          <span class="theme-active-label">点击试用</span>
        </div>
      </button>
    `).join("");

    themeGrid.querySelectorAll(".theme-card").forEach((node) => {
      node.addEventListener("click", () => {
        applyTheme(node.dataset.themeId);
      });
    });

    syncThemeCards();
  }

  function showTooltip(system, target) {
    tooltip.innerHTML = `
      <strong>${system.status === "locked" ? system.unknownName : system.name}</strong>
      <span>${system.status === "locked" ? "未探索区域，先靠近看看。" : system.subtitle}</span>
    `;
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const topY = rect.top;
    positionTooltip(centerX, topY);
    tooltip.classList.add("visible");
  }

  function positionTooltip(x, y) {
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }

  function hideTooltip() {
    tooltip.classList.remove("visible");
  }

  function setActive(id, emphasize) {
    activeSystemId = id;
    const system = getActiveSystem();
    syncActiveButton();
    renderSelectedPanel();
    if (emphasize) {
      incrementCounter(appState.interactions.clickedSystems, system.id, 1);
      applySystemTheme(system, true);
      runApproachAnimation(system);
      persistAppState();
      renderInsightPanels();
    }
  }

  function runApproachAnimation(system) {
    const activeSceneSystem = sceneSystems.find((item) => item.system.id === system.id);
    sceneState.targetZoom = system.status === "locked" ? 1.16 : 1.32;
    if (activeSceneSystem) {
      sceneState.targetOffsetX = -activeSceneSystem.point.x * 0.18;
      sceneState.targetOffsetY = -activeSceneSystem.point.y * 0.1;
      sceneState.targetOffsetZ = -activeSceneSystem.point.z * 0.08;
    }
    clusterStage.classList.add("zooming");
    window.clearTimeout(runApproachAnimation.timer);
    runApproachAnimation.timer = window.setTimeout(() => {
      clusterStage.classList.remove("zooming");
    }, 820);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function bindSceneRotation() {
    clusterStage.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".system")) {
        return;
      }
      sceneState.dragging = true;
      sceneState.pointerId = event.pointerId;
      sceneState.lastX = event.clientX;
      sceneState.lastY = event.clientY;
      sceneState.lastMoveTime = event.timeStamp;
      sceneState.velocityYaw = 0;
      sceneState.velocityPitch = 0;
      clusterStage.classList.add("dragging");
      clusterStage.setPointerCapture(event.pointerId);
    });

    clusterStage.addEventListener("pointermove", (event) => {
      if (sceneState.dragging && event.pointerId === sceneState.pointerId) {
        const deltaX = event.clientX - sceneState.lastX;
        const deltaY = event.clientY - sceneState.lastY;
        const elapsed = Math.max(16, event.timeStamp - sceneState.lastMoveTime);
        sceneState.velocityYaw = deltaX * 0.00016 * (16 / elapsed);
        sceneState.velocityPitch = -deltaY * 0.00012 * (16 / elapsed);
        sceneState.targetYaw = clamp(sceneState.targetYaw + deltaX * 0.0056, -1.25, 1.25);
        sceneState.targetPitch = clamp(sceneState.targetPitch - deltaY * 0.0042, -0.72, 0.68);
        sceneState.lastX = event.clientX;
        sceneState.lastY = event.clientY;
        sceneState.lastMoveTime = event.timeStamp;
        return;
      }
    });

    clusterStage.addEventListener("pointerup", (event) => {
      if (sceneState.pointerId !== event.pointerId) {
        return;
      }
      sceneState.dragging = false;
      sceneState.pointerId = null;
      clusterStage.classList.remove("dragging");
    });

    clusterStage.addEventListener("pointercancel", () => {
      sceneState.dragging = false;
      sceneState.pointerId = null;
      clusterStage.classList.remove("dragging");
    });
  }

  function drawProjectedGlow(x, y, radius, color, alpha) {
    const gradient = clusterContext.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color.replace(/0\.[0-9]+\)/, `${Math.min(alpha * 0.26, 0.18).toFixed(3)})`));
    gradient.addColorStop(0.24, color.replace(/0\.[0-9]+\)/, `${(alpha * 0.035).toFixed(3)})`));
    gradient.addColorStop(1, color.replace(/0\.[0-9]+\)/, "0)"));
    clusterContext.fillStyle = gradient;
    clusterContext.beginPath();
    clusterContext.arc(x, y, radius, 0, Math.PI * 2);
    clusterContext.fill();
  }

  function alphaColor(alpha) {
    return `rgba(255, 255, 255, ${clamp(alpha, 0, 0.95).toFixed(3)})`;
  }

  function drawOrbitalBands(time) {
    orbitalBands.forEach((band) => {
      const points = [];
      for (let step = 0; step <= 72; step += 1) {
        const angle = (step / 72) * Math.PI * 2 + band.rotation + time * band.speed * sceneState.orbitDriftFactor;
        const localX = Math.cos(angle) * band.radiusX;
        const localZ = Math.sin(angle) * band.radiusZ;
        const localY = Math.sin(angle + band.tilt) * 18 + band.y;
        points.push(projectPoint({ x: localX, y: localY, z: localZ, orbit: 0, lift: 0 }, sceneState.currentYaw, sceneState.currentPitch, sceneState.currentZoom, time));
      }

      clusterContext.strokeStyle = band.color;
      clusterContext.lineWidth = 0.8;
      clusterContext.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          clusterContext.moveTo(point.x, point.y);
        } else {
          clusterContext.lineTo(point.x, point.y);
        }
      });
      clusterContext.stroke();
    });
  }

  function drawClusterCore(time) {
    const projected = projectPoint({ x: 0, y: 0, z: 0, orbit: 0, lift: 0 }, sceneState.currentYaw, sceneState.currentPitch, sceneState.currentZoom, time);
    const coreRadius = 54 * projected.scale;
    const gradient = clusterContext.createRadialGradient(projected.x, projected.y, 0, projected.x, projected.y, coreRadius * 2.6);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.44)");
    gradient.addColorStop(0.12, "rgba(255, 255, 255, 0.24)");
    gradient.addColorStop(0.34, "rgba(255, 255, 255, 0.11)");
    gradient.addColorStop(0.58, "rgba(255, 255, 255, 0.045)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    clusterContext.fillStyle = gradient;
    clusterContext.beginPath();
    clusterContext.arc(projected.x, projected.y, coreRadius * 2.6, 0, Math.PI * 2);
    clusterContext.fill();
  }

  function animateScene(time) {
    sceneState.frame = time;
    const delta = sceneState.lastFrame ? Math.min(32, time - sceneState.lastFrame) : 16;
    sceneState.lastFrame = time;

    if (!sceneState.dragging) {
      sceneState.targetYaw += sceneState.idleYawSpeed * delta;
      sceneState.targetYaw = clamp(sceneState.targetYaw + sceneState.velocityYaw * delta, -1.25, 1.25);
      sceneState.targetPitch = clamp(sceneState.targetPitch + sceneState.velocityPitch * delta, -0.72, 0.68);
      sceneState.velocityYaw *= 0.96;
      sceneState.velocityPitch *= 0.92;
    }

    const desiredYaw = sceneState.targetYaw;
    const desiredPitch = sceneState.targetPitch;
    sceneState.currentYaw += (desiredYaw - sceneState.currentYaw) * 0.08;
    sceneState.currentPitch += (desiredPitch - sceneState.currentPitch) * 0.08;
    sceneState.currentZoom += (sceneState.targetZoom - sceneState.currentZoom) * 0.07;
    sceneState.cameraOffsetX += (sceneState.targetOffsetX - sceneState.cameraOffsetX) * 0.08;
    sceneState.cameraOffsetY += (sceneState.targetOffsetY - sceneState.cameraOffsetY) * 0.08;
    sceneState.cameraOffsetZ += (sceneState.targetOffsetZ - sceneState.cameraOffsetZ) * 0.08;

    clusterContext.clearRect(0, 0, sceneMetrics.width, sceneMetrics.height);
    drawClusterCore(time);
    drawOrbitalBands(time);

    const projectedParticles = clusterParticles.map((particle) => {
      const projected = projectPoint(particle.point, sceneState.currentYaw, sceneState.currentPitch, sceneState.currentZoom, time);
      return { particle, projected };
    });

    projectedParticles.sort((left, right) => left.projected.depth - right.projected.depth);
    projectedParticles.forEach(({ particle, projected }) => {
      const twinkle = 0.78 + Math.sin(time * 0.0022 + particle.twinkle) * 0.22;
      const normalizedDepth = clamp((projected.depth + 420) / 1040, 0, 1);
      const depthLight = 0.34 + normalizedDepth * 1.02;
      const distanceToCore = Math.hypot(projected.x - sceneMetrics.centerX, projected.y - sceneMetrics.centerY);
      const coreLight = clamp(1 - distanceToCore / (sceneMetrics.width * 0.42), 0, 1);
      const kindLight = particle.kind === "core" ? 0.26 : particle.kind === "arm" ? 0.02 : -0.22;
      const luminance = clamp(depthLight + coreLight * 0.38 + kindLight + particle.luminanceBias * 0.88, 0.16, 1.46);
      const opacity = clamp(particle.baseOpacity * twinkle * (0.46 + projected.scale * 0.088) * luminance, 0.014, 0.78);
      const radius = clamp(projected.scale * particle.baseSize, 0.16, particle.kind === "core" ? 3.6 : particle.kind === "arm" ? 2.15 : 1.2);
      const trailX = projected.x - Math.cos(time * 0.0005 + particle.point.roll) * particle.streak * projected.scale * 0.42;
      const trailY = projected.y - Math.sin(time * 0.0007 + particle.point.sway) * particle.streak * projected.scale * 0.18;

      clusterContext.strokeStyle = alphaColor(opacity * (0.024 + normalizedDepth * 0.042));
      clusterContext.lineWidth = Math.max(0.1, radius * 0.09);
      clusterContext.beginPath();
      clusterContext.moveTo(trailX, trailY);
      clusterContext.lineTo(projected.x, projected.y);
      clusterContext.stroke();

      const fillRadius = radius * (0.82 + particle.softness * 0.22);
      const fill = clusterContext.createRadialGradient(projected.x, projected.y, 0, projected.x, projected.y, fillRadius);
      fill.addColorStop(0, alphaColor(opacity * (1.4 + coreLight * 0.18 + normalizedDepth * 0.18)));
      fill.addColorStop(0.16, alphaColor(opacity * 0.92));
      fill.addColorStop(0.34, alphaColor(opacity * 0.34));
      fill.addColorStop(1, alphaColor(0));
      clusterContext.fillStyle = fill;
      clusterContext.beginPath();
      clusterContext.arc(projected.x, projected.y, fillRadius, 0, Math.PI * 2);
      clusterContext.fill();

      drawProjectedGlow(projected.x, projected.y, radius * (0.34 + normalizedDepth * 0.11), particle.tint, opacity * 0.24);
    });

    sceneSystems.forEach((entry) => {
      const projected = projectPoint(entry.point, sceneState.currentYaw, sceneState.currentPitch, sceneState.currentZoom, time);
      const scale = clamp(projected.scale * (0.74 + entry.profile.size * 0.042), 0.55, 2.8);
      const alpha = clamp(0.42 + projected.scale * 0.52, 0.26, 1);
      const clampedX = clamp(projected.x - 17, 8, sceneMetrics.width - 42);
      const clampedY = clamp(projected.y - 17, 8, sceneMetrics.height - 42);
      entry.node.style.setProperty("--screen-x", clampedX.toFixed(2) + "px");
      entry.node.style.setProperty("--screen-y", clampedY.toFixed(2) + "px");
      entry.node.style.setProperty("--planet-scale", scale.toFixed(3));
      entry.node.style.opacity = alpha.toFixed(3);
      entry.node.style.zIndex = String(200 + Math.round(projected.depth));
    });

    requestAnimationFrame(animateScene);
  }

  function getActiveSystem() {
    return systems.find((system) => system.id === activeSystemId) || systems[0];
  }

  function syncActiveButton() {
    document.querySelectorAll(".system").forEach((node) => {
      node.classList.toggle("active", node.dataset.id === activeSystemId);
    });
  }

  function renderSelectedPanel() {
    const system = getActiveSystem();
    selectedTitle.textContent = system.status === "locked" ? system.unknownName : system.name;
    selectedSubtitle.textContent = system.subtitle;
    statusBadge.textContent = statusText[system.status];
    metricTimes.textContent = String(system.exploredTimes);
    metricUnlock.textContent = system.progress >= 50 ? "已解锁" : "未解锁";
    metricSignal.textContent = getSignalForSystem(system);
    progressText.textContent = system.progress + "%";
    progressFill.style.width = system.progress + "%";
    snapshotText.textContent = system.preview;
    tagList.innerHTML = system.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  }

  function openModal(system, preferredContentId) {
    closePaletteModal(false);
    closeShardModal(false);
    closeRouteModal(false);
    closeAuthModal(false);
    const card = getCardForSystem(system, preferredContentId);
    if (!card) {
      return;
    }
    currentExploration = {
      systemId: system.id,
      contentId: card.contentId
    };
    incrementCounter(appState.interactions.openedCards, card.contentId, 1);
    persistAppState();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalTitle.textContent = card.title;
    (function fitTitle() {
      modalTitle.style.fontSize = "";
      const maxW = modalTitle.clientWidth;
      let size = parseFloat(getComputedStyle(modalTitle).fontSize);
      while (modalTitle.scrollWidth > maxW && size > 16) {
        size -= 1;
        modalTitle.style.fontSize = size + "px";
      }
    })();
    modalHook.textContent = card.hook;
    modalBody.innerHTML = card.body.split("\n\n").map(function(p) { return "<p>" + p.replace(/\n/g, "<br>") + "</p>"; }).join("");
    modalMeta.innerHTML = [
      `<span>${statusText[system.status]}</span>`,
      `<span>${system.status === "locked" ? system.unknownName : system.name}</span>`,
      `<span>${card.civilization}</span>`,
      `<span>${card.difficultyLevel} · ${Math.max(1, Math.round(card.readingTime / 60))} 分钟</span>`,
      `<span>探索值 ${system.progress}%</span>`,
      `<span>探索 ${system.exploredTimes} 次</span>`
    ].join("");
    modalFragments.innerHTML = card.extraFragments.map((fragment) => `<li>${fragment}</li>`).join("");
    const allModalTags = [
      ...card.topicTags.map(t => ({ tag: t, type: "topic" })),
      ...card.moodTags.map(t => ({ tag: t, type: "mood" })),
      ...(card.eraTags || []).map(t => ({ tag: t, type: "era" })).slice(0, 2),
      ...(card.regionTags || []).map(t => ({ tag: t, type: "region" })).slice(0, 1)
    ].slice(0, 8);
    modalTags.innerHTML = allModalTags.map(({ tag, type }) => `<span class="explore-tag" data-type="${type}"><span class="explore-tag-dot"></span>${tag}</span>`).join("");
    const saveBtnLabel = document.querySelector("#saveShard .explore-btn-label");
    if (saveBtnLabel) saveBtnLabel.textContent = isSavedShard(card.contentId) ? "已存入碎片库" : "存入碎片库";
    renderInsightPanels();
  }

  function closeModal() {
    releaseModalFocus(modal);
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function openPaletteModal() {
    closeShardModal(false);
    closeRouteModal(false);
    closeAuthModal(false);
    closeModal();
    paletteModal.classList.add("open");
    paletteModal.setAttribute("aria-hidden", "false");
    syncThemeCards();
  }

  function closePaletteModal(restoreFocus = true) {
    releaseModalFocus(paletteModal);
    paletteModal.classList.remove("open");
    paletteModal.setAttribute("aria-hidden", "true");
    if (restoreFocus) {
      document.getElementById("paletteButton").blur();
    }
  }

  function openShardModal(shardId) {
    closeModal();
    closePaletteModal(false);
    closeRouteModal(false);
    closeAuthModal(false);
    selectedShardId = shardId || selectedShardId;
    renderShardLibrary(selectedShardId);
    shardModal.classList.add("open");
    shardModal.setAttribute("aria-hidden", "false");
  }

  function closeShardModal(restoreFocus = true) {
    releaseModalFocus(shardModal);
    shardModal.classList.remove("open");
    shardModal.setAttribute("aria-hidden", "true");
    if (restoreFocus) {
      document.getElementById("shardsButton").blur();
    }
  }

  function openRouteModal() {
    closeModal();
    closePaletteModal(false);
    closeShardModal(false);
    closeAuthModal(false);
    renderRouteSummary();
    routeModal.classList.add("open");
    routeModal.setAttribute("aria-hidden", "false");
  }

  function closeRouteModal(restoreFocus = true) {
    releaseModalFocus(routeModal);
    routeModal.classList.remove("open");
    routeModal.setAttribute("aria-hidden", "true");
    if (restoreFocus) {
      document.getElementById("routeButton").blur();
    }
  }

  function openAuthModal(reasonText) {
    closeModal();
    closePaletteModal(false);
    closeShardModal(false);
    closeRouteModal(false);
    renderAuthUI();
    setAuthStatus("");
    if (reasonText) {
      authLead.textContent = reasonText;
    }
    authModal.classList.add("open");
    authModal.setAttribute("aria-hidden", "false");
  }

  function closeAuthModal(restoreFocus = true) {
    releaseModalFocus(authModal);
    authModal.classList.remove("open");
    authModal.setAttribute("aria-hidden", "true");
    renderAuthUI();
    if (restoreFocus) {
      authButton.blur();
    }
  }

  function createShardRecord(system, card) {
    return {
      shardId: card.contentId,
      contentId: card.contentId,
      planetId: system.id,
      planetName: system.name,
      title: card.title,
      hook: card.hook,
      body: card.body,
      extraFragments: card.extraFragments,
      tags: [...card.topicTags, ...card.moodTags, ...(card.formatTags || []).slice(0, 1), ...(card.eraTags || []).slice(0, 1)],
      savedAt: new Date().toISOString()
    };
  }

  function pulseToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    window.clearTimeout(pulseToast.timer);
    pulseToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }

  function randomSystem(preferLocked = false) {
    const pool = preferLocked ? systems.filter((item) => item.status === "locked") : systems;
    return pool[Math.floor(Math.random() * pool.length)] || systems[0];
  }

  document.getElementById("closeModal").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  authButton.addEventListener("click", () => {
    openAuthModal();
  });
  document.getElementById("shardsButton").addEventListener("click", () => {
    openShardModal();
  });
  document.getElementById("routeButton").addEventListener("click", () => {
    openRouteModal();
  });
  document.getElementById("paletteButton").addEventListener("click", openPaletteModal);
  document.getElementById("closePaletteModal").addEventListener("click", () => {
    closePaletteModal();
  });
  paletteModal.addEventListener("click", (event) => {
    if (event.target === paletteModal) {
      closePaletteModal();
    }
  });
  document.getElementById("themeResetButton").addEventListener("click", () => {
    applyTheme(defaultThemeId, false);
    themeStatus.textContent = "当前方案：极夜冰海 · 默认主视觉";
    pulseToast("已恢复默认主视觉「极夜冰海」");
  });

  document.getElementById("closeShardModal").addEventListener("click", () => {
    closeShardModal();
  });
  shardModal.addEventListener("click", (event) => {
    if (event.target === shardModal) {
      closeShardModal();
    }
  });

  document.getElementById("closeRouteModal").addEventListener("click", () => {
    closeRouteModal();
  });
  routeModal.addEventListener("click", (event) => {
    if (event.target === routeModal) {
      closeRouteModal();
    }
  });

  document.getElementById("closeAuthModal").addEventListener("click", () => {
    closeAuthModal();
  });
  authModal.addEventListener("click", (event) => {
    if (event.target === authModal) {
      closeAuthModal();
    }
  });

  loginActionButton.addEventListener("click", async () => {
    if (!supabaseEnabled) {
      setAuthStatus("请先配置 Supabase 连接信息。", "error");
      return;
    }
    const { email, password } = readAuthForm();
    if (!email || !password) {
      setAuthStatus("请输入邮箱和密码。", "error");
      return;
    }

    setAuthStatus("正在登录并同步云端档案...", "");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setAuthStatus(`登录失败：${error.message}`, "error");
      return;
    }

    await applySession(data.session);
    renderInsightPanels();
    closeAuthModal();
    pulseToast("已登录并同步云端档案");
  });

  registerActionButton.addEventListener("click", async () => {
    if (!supabaseEnabled) {
      setAuthStatus("请先配置 Supabase 连接信息。", "error");
      return;
    }

    const { displayName, email, password } = readAuthForm();
    if (!displayName || !email || !password) {
      setAuthStatus("注册需要填写名称、邮箱和密码。", "error");
      return;
    }
    if (password.length < 6) {
      setAuthStatus("密码至少需要 6 位。", "error");
      return;
    }

    setAuthStatus("正在创建账号...", "");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });

    if (error) {
      setAuthStatus(`注册失败：${error.message}`, "error");
      return;
    }

    if (!data.session) {
      setAuthStatus("注册成功，请先到邮箱完成确认后再登录。", "success");
      return;
    }

    await applySession(data.session);
    renderInsightPanels();
    closeAuthModal();
    pulseToast("注册成功，云端档案已创建");
  });

  logoutActionButton.addEventListener("click", async () => {
    if (!appState.auth.loggedIn) {
      closeAuthModal();
      return;
    }

    if (!supabaseEnabled) {
      appState = buildMergedState({}, {
        loggedIn: false,
        userName: "游客",
        userId: null,
        email: null
      });
      syncSystemsFromState();
      persistLocalState();
      renderSystems();
      renderSelectedPanel();
      renderInsightPanels();
      closeAuthModal();
      pulseToast("已切换到游客体验");
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthStatus(`退出失败：${error.message}`, "error");
      return;
    }

    closeAuthModal();
    pulseToast("已退出登录");
  });

  recommendedAction.addEventListener("click", () => {
    const system = getSystemById(recommendedAction.dataset.systemId);
    setActive(system.id, true);
    openModal(system);
  });

  shardReopenButton.addEventListener("click", () => {
    const card = getCardById(shardReopenButton.dataset.contentId);
    if (!card) {
      return;
    }
    const system = getSystemById(card.planetId);
    setActive(system.id, true);
    openModal(system, card.contentId);
  });

  shardSourceButton.addEventListener("click", () => {
    const system = getSystemById(shardSourceButton.dataset.systemId);
    if (!system) {
      return;
    }
    closeShardModal(false);
    setActive(system.id, true);
    openModal(system);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (paletteModal.classList.contains("open")) {
      closePaletteModal();
    }
    if (shardModal.classList.contains("open")) {
      closeShardModal();
    }
    if (routeModal.classList.contains("open")) {
      closeRouteModal();
    }
    if (authModal.classList.contains("open")) {
      closeAuthModal();
    }
    if (modal.classList.contains("open")) {
      closeModal();
    }
  });

  document.getElementById("confirmExplore").addEventListener("click", () => {
    const system = getActiveSystem();
    const card = currentExploration ? getCardById(currentExploration.contentId) : getCardForSystem(system);
    if (!card) {
      return;
    }
    system.exploredTimes += 1;
    system.progress = Math.min(system.progress + (card.difficultyLevel === "L3" ? 12 : card.difficultyLevel === "L2" ? 8 : 6), 100);
    if (system.progress >= 50) {
      system.status = "unlocked";
    } else if (system.exploredTimes > 0) {
      system.status = "explored";
    }
    incrementCounter(appState.interactions.confirmedCards, card.contentId, 1);
    incrementCounter(appState.interactions.planetScores, system.id, 1.2);
    registerPreference(card, 1.1);
    trackRecentExplore(system, card);
    appState.interactions.confirmCount += 1;
    updateStoredSystem(system);
    completeOnboarding("completed");
    persistAppState();
    renderSystems();
    renderSelectedPanel();
    renderInsightPanels();
    openModal(system, card.contentId);
    if (!appState.auth.loggedIn) {
      pulseToast(`探索值已提升到 ${system.progress}% · 已保存在当前设备`);
      maybePromptLogin("这次探索结果");
      return;
    }
    pulseToast(`探索值已提升到 ${system.progress}% · ${card.title}`);
  });

  document.getElementById("saveShard").addEventListener("click", () => {
    const system = getActiveSystem();
    const card = currentExploration ? getCardById(currentExploration.contentId) : getCardForSystem(system);
    if (!card) {
      return;
    }
    if (isSavedShard(card.contentId)) {
      pulseToast("这条碎片已经在你的碎片库里");
      openShardModal(card.contentId);
      return;
    }
    const shard = createShardRecord(system, card);
    appState.shards.unshift(shard);
    incrementCounter(appState.interactions.savedCards, card.contentId, 1);
    registerPreference(card, 2.4);
    appState.interactions.saveCount += 1;
    selectedShardId = shard.shardId;
    persistAppState();
    renderInsightPanels();
    document.getElementById("saveShard").textContent = "已收藏到碎片库";
    if (!appState.auth.loggedIn) {
      pulseToast("已收藏为星际碎片，并保存在当前设备");
      maybePromptLogin("这条碎片收藏");
      return;
    }
    pulseToast("已收藏为星际碎片");
  });

  document.getElementById("nextExplore").addEventListener("click", () => {
    const next = randomSystem(true);
    setActive(next.id, true);
    openModal(next);
  });

  document.getElementById("focusButton").addEventListener("click", () => {
    const next = randomSystem();
    setActive(next.id, true);
    openModal(next);
  });

  document.getElementById("shuffleButton").addEventListener("click", () => {
    systems.forEach((system) => {
      const dx = (Math.random() - 0.5) * 6;
      const dy = (Math.random() - 0.5) * 6;
      system.x = Math.max(10, Math.min(90, system.x + dx));
      system.y = Math.max(14, Math.min(84, system.y + dy));
    });
    renderSystems();
    renderInsightPanels();
    pulseToast("已切换一条新的银河航线");
  });

  document.getElementById("enterButton").addEventListener("click", () => {
    const system = getSystemById(enterButton.dataset.systemId || activeSystemId);
    setActive(system.id, true);
    applySystemTheme(system, true);
    openModal(system);
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    completeOnboarding("dismissed");
    renderInsightPanels();
    pulseToast("已关闭首次引导，你可以先自由观察这张云图");
  });

  const canvas = document.getElementById("starfield");
  const context = canvas.getContext("2d");
  const stars = [];
  const bandStars = [];
  const nebulaClouds = [];

  function createStars(width, height) {
    stars.length = 0;
    bandStars.length = 0;
    nebulaClouds.length = 0;
    const total = Math.max(180, Math.floor((width * height) / 9000));
    for (let index = 0; index < total; index += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.7 + 0.3,
        alpha: Math.random() * 0.5 + 0.15,
        speed: Math.random() * 0.16 + 0.03
      });
    }

    const clusterTotal = Math.max(260, Math.floor((width * height) / 5200));
    for (let index = 0; index < clusterTotal; index += 1) {
      const t = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.7) * Math.min(width, height) * 0.22;
      const arm = index % 3;
      const angle = radius * 0.014 + arm * ((Math.PI * 2) / 3) + gaussian() * 0.18;
      bandStars.push({
        x: width * 0.5 + Math.cos(angle) * radius * 1.25 + gaussian() * 14,
        y: height * 0.52 + Math.sin(angle) * radius * 0.44 + gaussian() * 8,
        size: Math.random() * 2.1 + 0.4,
        alpha: Math.random() * 0.48 + 0.12,
        color: ["rgba(139, 227, 255, 0.9)", "rgba(255, 223, 161, 0.82)", "rgba(214, 192, 255, 0.8)"][arm]
      });
    }

    for (let index = 0; index < 4; index += 1) {
      nebulaClouds.push({
        x: width * (0.18 + index * 0.22),
        y: height * (0.22 + (index % 2) * 0.24),
        radius: Math.min(width, height) * (0.16 + Math.random() * 0.08),
        alpha: 0.05 + Math.random() * 0.035,
        driftX: (Math.random() - 0.5) * 42,
        driftY: (Math.random() - 0.5) * 8,
        phase: Math.random() * Math.PI * 2,
        color: ["rgba(115, 202, 255, 0.18)", "rgba(255, 211, 148, 0.12)", "rgba(173, 153, 255, 0.12)", "rgba(144, 233, 215, 0.12)"][index]
      });
    }
  }

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createStars(width, height);
  }

  function drawStarfield(time = 0) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    context.clearRect(0, 0, width, height);

    nebulaClouds.forEach((cloud) => {
      const offsetX = Math.cos(time * 0.00008 + cloud.phase) * cloud.driftX;
      const offsetY = Math.sin(time * 0.00006 + cloud.phase * 1.2) * cloud.driftY;
      const radius = cloud.radius * (0.94 + Math.sin(time * 0.00012 + cloud.phase) * 0.06);
      const glow = context.createRadialGradient(cloud.x + offsetX, cloud.y + offsetY, 0, cloud.x + offsetX, cloud.y + offsetY, radius);
      glow.addColorStop(0, cloud.color.replace(/0\.[0-9]+\)/, `${cloud.alpha.toFixed(3)})`));
      glow.addColorStop(0.45, cloud.color.replace(/0\.[0-9]+\)/, `${(cloud.alpha * 0.55).toFixed(3)})`));
      glow.addColorStop(1, cloud.color.replace(/0\.[0-9]+\)/, "0)"));
      context.fillStyle = glow;
      context.beginPath();
      context.arc(cloud.x + offsetX, cloud.y + offsetY, radius, 0, Math.PI * 2);
      context.fill();
    });

    const gradient = context.createRadialGradient(width * 0.48, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.44);
    gradient.addColorStop(0, "rgba(148, 220, 255, 0.11)");
    gradient.addColorStop(0.28, "rgba(161, 133, 255, 0.08)");
    gradient.addColorStop(0.52, "rgba(255, 203, 132, 0.06)");
    gradient.addColorStop(1, "rgba(3, 6, 14, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width * 0.5, height * 0.52);
    context.rotate(-0.18);
    context.scale(1.55, 0.48);
    const core = context.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height) * 0.18);
    core.addColorStop(0, "rgba(255, 247, 220, 0.19)");
    core.addColorStop(0.18, "rgba(162, 223, 255, 0.14)");
    core.addColorStop(0.42, "rgba(143, 118, 255, 0.07)");
    core.addColorStop(0.68, "rgba(255, 191, 126, 0.05)");
    core.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = core;
    context.beginPath();
    context.ellipse(0, 0, Math.min(width, height) * 0.18, Math.min(width, height) * 0.18, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();

    bandStars.forEach((star) => {
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fillStyle = star.color.replace(/0\.[0-9]+\)/, `${star.alpha})`);
      context.fill();
    });

    stars.forEach((star) => {
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(255,255,255,${star.alpha})`;
      context.fill();
      star.alpha += (Math.random() - 0.5) * 0.008;
      star.alpha = Math.max(0.1, Math.min(0.72, star.alpha));
      star.y += star.speed;
      if (star.y > height + 2) {
        star.y = -2;
        star.x = Math.random() * width;
      }
    });

    requestAnimationFrame(drawStarfield);
  }

  async function initializeApp() {
    syncSystemsFromState();
    updateSceneMetrics();
    resizeCanvas();
    renderThemeCards();
    applyTheme(defaultThemeId, false);
    createClusterParticles();
    await initializeSupabaseAuth();
    renderSystems();
    renderSelectedPanel();
    renderInsightPanels();
    bindSceneRotation();
    runApproachAnimation(getActiveSystem());
    animateScene(0);
    drawStarfield();
  }

  initializeApp();

  window.addEventListener("resize", () => {
    updateSceneMetrics();
    resizeCanvas();
    createClusterParticles();
    renderSystems();
    runApproachAnimation(getActiveSystem());
  });
