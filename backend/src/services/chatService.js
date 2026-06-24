import { chatbotKnowledgeBase, heritageSites } from '../models/heritage-sites.js';

const siteAliases = {
  site_1: ['charminar', 'char minar'],
  site_2: ['golconda', 'golkonda', 'golconda fort', 'golkonda fort'],
  site_3: ['chowmahalla', 'chowmahalla palace', 'chow mahalla'],
};

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function allSiteNames() {
  return heritageSites.map((site) => site.name).join(', ');
}

function findSite(message) {
  const normalizedMessage = normalize(message);
  return heritageSites.find((site) => {
    const aliases = [site.name, ...(siteAliases[site.id] ?? [])];
    return aliases.some((alias) => normalizedMessage.includes(normalize(alias)));
  });
}

function siteOverview(site) {
  return `${site.name}: ${site.description} Era: ${site.historicalEra}. Architecture: ${site.architectureStyle}. Location: ${site.location}. Entry fee: ${site.entryFee}. Timings: ${site.timings}. Current crowd: ${site.crowdLevel}, waiting time ${site.waitingTime}.`;
}

export function createChatReply(message = '') {
  const originalMessage = String(message || '');
  const userMessage = originalMessage.toLowerCase();
  const matchedSite = findSite(originalMessage);

  if (matchedSite) {
    if (/(entry|ticket|fee|cost)/.test(userMessage)) {
      return `${matchedSite.name} entry fee: ${matchedSite.entryFee}.`;
    }
    if (/(timing|open|time|hours)/.test(userMessage)) {
      return `${matchedSite.name} timings: ${matchedSite.timings}.`;
    }
    if (/(crowd|busy|peak|wait)/.test(userMessage)) {
      return `${matchedSite.name} crowd level is ${matchedSite.crowdLevel}. Waiting time: ${matchedSite.waitingTime}. Peak hours: ${matchedSite.peakHours}.`;
    }
    if (/(where|location|map)/.test(userMessage)) {
      return `${matchedSite.name} is located at ${matchedSite.location}.`;
    }
    return siteOverview(matchedSite);
  }

  const matchedKey = Object.keys(chatbotKnowledgeBase).find((key) =>
    userMessage.includes(key)
  );
  if (matchedKey) return chatbotKnowledgeBase[matchedKey];

  if (/(hello|hi|hey)/.test(userMessage)) {
    return `Namaste! I am your AI Heritage Guide. You can ask me about: ${allSiteNames()}.`;
  }

  return `I can help with history, timings, entry fees, crowd levels, location, and architecture for: ${allSiteNames()}.`;
}
