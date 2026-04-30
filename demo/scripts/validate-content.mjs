import { systems } from "./data/systems.mjs";
import { explorationCards } from "./data/cards.mjs";

const allowedStatuses = new Set(["locked", "explored", "unlocked"]);
const allowedPriorities = new Set(["P1", "P2", "P3"]);
const allowedCardLevels = new Set(["L1", "L2", "L3"]);
const allowedCardStatuses = new Set(["draft", "reviewing", "published", "archived"]);
const requiredSystemFields = [
	"id",
	"name",
	"unknownName",
	"subtitle",
	"status",
	"progress",
	"exploredTimes",
	"tags",
	"signal",
	"x",
	"y",
	"color",
	"hook",
	"body",
	"fragments",
	"preview"
];
const requiredCardFields = [
	"contentId",
	"priority",
	"title",
	"hook",
	"body",
	"extraFragments",
	"planetId",
	"planetName",
	"civilization",
	"difficultyLevel",
	"topicTags",
	"formatTags",
	"moodTags",
	"eraTags",
	"regionTags",
	"characterTags",
	"artifactTags",
	"readingTime",
	"status",
	"createdAt",
	"updatedAt"
];

const recommendedInitialCardsPerPlanet = 6;

function isValidIsoDate(value) {
	return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function ensure(condition, message, errors) {
	if (!condition) {
		errors.push(message);
	}
}

function ensureNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}

function ensureArray(value) {
	return Array.isArray(value);
}

const errors = [];
const warnings = [];
const systemIdSet = new Set();
const cardIdSet = new Set();
const systemNameById = new Map();

systems.forEach((system, index) => {
	const prefix = `systems[${index}]`;

	requiredSystemFields.forEach((field) => {
		ensure(system[field] !== undefined, `${prefix} 缺少字段 ${field}`, errors);
	});

	ensure(ensureNonEmptyString(system.id), `${prefix}.id 必须是非空字符串`, errors);
	ensure(!systemIdSet.has(system.id), `${prefix}.id 重复：${system.id}`, errors);
	systemIdSet.add(system.id);
	systemNameById.set(system.id, system.name);

	ensure(ensureNonEmptyString(system.name), `${prefix}.name 必须是非空字符串`, errors);
	ensure(allowedStatuses.has(system.status), `${prefix}.status 不合法：${system.status}`, errors);
	ensure(Number.isFinite(system.progress) && system.progress >= 0 && system.progress <= 100, `${prefix}.progress 必须在 0-100 之间`, errors);
	ensure(Number.isInteger(system.exploredTimes) && system.exploredTimes >= 0, `${prefix}.exploredTimes 必须是非负整数`, errors);
	ensure(ensureArray(system.tags) && system.tags.length > 0, `${prefix}.tags 必须是非空数组`, errors);
	ensure(ensureArray(system.fragments) && system.fragments.length > 0, `${prefix}.fragments 必须是非空数组`, errors);
	ensure(Number.isFinite(system.x) && system.x >= 0 && system.x <= 100, `${prefix}.x 必须在 0-100 之间`, errors);
	ensure(Number.isFinite(system.y) && system.y >= 0 && system.y <= 100, `${prefix}.y 必须在 0-100 之间`, errors);
});

const cardsByPlanet = new Map();

explorationCards.forEach((card, index) => {
	const prefix = `explorationCards[${index}]`;

	requiredCardFields.forEach((field) => {
		ensure(card[field] !== undefined, `${prefix} 缺少字段 ${field}`, errors);
	});

	ensure(ensureNonEmptyString(card.contentId), `${prefix}.contentId 必须是非空字符串`, errors);
	ensure(!cardIdSet.has(card.contentId), `${prefix}.contentId 重复：${card.contentId}`, errors);
	cardIdSet.add(card.contentId);
	ensure(allowedPriorities.has(card.priority), `${prefix}.priority 不合法：${card.priority}`, errors);

	ensure(systemIdSet.has(card.planetId), `${prefix}.planetId 未在 systems 中定义：${card.planetId}`, errors);
	if (systemIdSet.has(card.planetId)) {
		ensure(card.planetName === systemNameById.get(card.planetId), `${prefix}.planetName 与 systems 中名称不一致：${card.planetId}`, errors);
		ensure(card.contentId.startsWith(`${card.planetId}-`), `${prefix}.contentId 应以 planetId 开头：${card.contentId}`, errors);
	}

	ensure(allowedCardLevels.has(card.difficultyLevel), `${prefix}.difficultyLevel 不合法：${card.difficultyLevel}`, errors);
	ensure(allowedCardStatuses.has(card.status), `${prefix}.status 不合法：${card.status}`, errors);
	ensure(Number.isFinite(card.readingTime) && card.readingTime > 0, `${prefix}.readingTime 必须是正数`, errors);
	ensure(ensureArray(card.topicTags) && card.topicTags.length > 0, `${prefix}.topicTags 必须是非空数组`, errors);
	ensure(ensureArray(card.formatTags) && card.formatTags.length > 0, `${prefix}.formatTags 必须是非空数组`, errors);
	ensure(ensureArray(card.moodTags) && card.moodTags.length > 0, `${prefix}.moodTags 必须是非空数组`, errors);
	ensure(ensureArray(card.extraFragments) && card.extraFragments.length > 0, `${prefix}.extraFragments 必须是非空数组`, errors);
	ensure(isValidIsoDate(card.createdAt), `${prefix}.createdAt 必须是合法时间`, errors);
	ensure(isValidIsoDate(card.updatedAt), `${prefix}.updatedAt 必须是合法时间`, errors);

	if (card.isFeatured !== undefined && typeof card.isFeatured !== "boolean") {
		errors.push(`${prefix}.isFeatured 必须是布尔值`);
	}

	if (!cardsByPlanet.has(card.planetId)) {
		cardsByPlanet.set(card.planetId, 0);
	}
	cardsByPlanet.set(card.planetId, cardsByPlanet.get(card.planetId) + 1);

	if (!ensureNonEmptyString(card.sourceNote)) {
		warnings.push(`${prefix}.sourceNote 为空，正式扩内容时建议补来源备注`);
	}

	if (card.title.trim().length < 12 || card.title.trim().length > 28) {
		warnings.push(`${prefix}.title 当前长度为 ${card.title.trim().length}，建议控制在 12-28 字`);
	}

	if (card.hook.trim().length < 20 || card.hook.trim().length > 40) {
		warnings.push(`${prefix}.hook 当前长度为 ${card.hook.trim().length}，建议控制在 20-40 字`);
	}

	if (card.extraFragments.length > 3) {
		warnings.push(`${prefix}.extraFragments 当前为 ${card.extraFragments.length} 条，建议控制在 1-3 条`);
	}

	const bodyLength = card.body.trim().length;
	if (card.difficultyLevel === "L1" && (bodyLength < 80 || bodyLength > 180)) {
		warnings.push(`${prefix}.body 长度为 ${bodyLength}，L1 建议控制在 80-180 字`);
	}
	if (card.difficultyLevel === "L2" && (bodyLength < 180 || bodyLength > 400)) {
		warnings.push(`${prefix}.body 长度为 ${bodyLength}，L2 建议控制在 180-400 字`);
	}
	if (card.difficultyLevel === "L3" && (bodyLength < 400 || bodyLength > 900)) {
		warnings.push(`${prefix}.body 长度为 ${bodyLength}，L3 建议控制在 400-900 字`);
	}
});

systems.forEach((system) => {
	if (!cardsByPlanet.has(system.id)) {
		warnings.push(`星球 ${system.id} (${system.name}) 还没有对应探索卡`);
		return;
	}

	const count = cardsByPlanet.get(system.id);
	if (count < recommendedInitialCardsPerPlanet) {
		warnings.push(`星球 ${system.id} (${system.name}) 当前仅有 ${count} 张探索卡，低于首批起稿池建议的 ${recommendedInitialCardsPerPlanet} 张`);
	}
});

if (errors.length > 0) {
	console.error("内容校验失败：");
	errors.forEach((message) => {
		console.error(`- ${message}`);
	});
	if (warnings.length > 0) {
		console.error("附加提示：");
		warnings.forEach((message) => {
			console.error(`- ${message}`);
		});
	}
	process.exit(1);
}

console.log(`内容校验通过：${systems.length} 个星球，${explorationCards.length} 张探索卡。`);
console.log("各星球卡片数：");
systems.forEach((system) => {
	console.log(`- ${system.id}: ${cardsByPlanet.get(system.id) || 0}`);
});
if (warnings.length > 0) {
	console.log("附加提示：");
	warnings.forEach((message) => {
		console.log(`- ${message}`);
	});
}
