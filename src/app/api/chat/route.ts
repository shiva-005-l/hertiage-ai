import { NextResponse } from 'next/server';
import { chatbotKnowledgeBase, heritageSites } from '@/lib/mock-data';

const siteAliases: Record<string, string[]> = {
  site_1: ['charminar', 'char minar'],
  site_2: ['golconda', 'golkonda', 'golconda fort', 'golkonda fort'],
  site_3: ['chowmahalla', 'chowmahalla palace', 'chow mahalla'],
  site_4: ['qutb shahi tombs', 'qutub shahi tombs', 'qutb tombs', 'qutub tombs'],
  site_5: ['salar jung', 'salar jung museum'],
  site_6: ['mecca masjid', 'makkah masjid', 'mecca mosque'],
  site_7: ['falaknuma', 'falaknuma palace'],
  site_8: ['birla mandir', 'birla temple'],
  site_9: ['taramati baradari', 'taramati'],
  site_10: ['paigah tombs', 'paigah', 'paigah tomb'],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function findSite(message: string) {
  const normalizedMessage = normalize(message);

  return heritageSites.find((site) => {
    const aliases = [site.name, ...(siteAliases[site.id] ?? [])];
    return aliases.some((alias) => normalizedMessage.includes(normalize(alias)));
  });
}

function allSiteNames() {
  return heritageSites.map((site) => site.name).join(', ');
}

function siteOverview(site: (typeof heritageSites)[number]) {
  return `${site.name}: ${site.description} Era: ${site.historicalEra}. Architecture: ${site.architectureStyle}. Location: ${site.location}. Entry fee: ${site.entryFee}. Timings: ${site.timings}. Current crowd: ${site.crowdLevel}, waiting time ${site.waitingTime}.`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const originalMessage = String(body.message || '');
    const userMessage = originalMessage.toLowerCase();
    const matchedSite = findSite(originalMessage);

    const matchedKey = Object.keys(chatbotKnowledgeBase).find((key) =>
      userMessage.includes(key)
    );

    let reply = '';

    if (matchedSite) {
      if (userMessage.includes('entry') || userMessage.includes('ticket') || userMessage.includes('fee') || userMessage.includes('cost')) {
        reply = `${matchedSite.name} entry fee: ${matchedSite.entryFee}.`;
      } else if (userMessage.includes('timing') || userMessage.includes('open') || userMessage.includes('time') || userMessage.includes('hours')) {
        reply = `${matchedSite.name} timings: ${matchedSite.timings}.`;
      } else if (userMessage.includes('crowd') || userMessage.includes('busy') || userMessage.includes('peak') || userMessage.includes('wait')) {
        reply = `${matchedSite.name} crowd level is ${matchedSite.crowdLevel}. Waiting time: ${matchedSite.waitingTime}. Peak hours: ${matchedSite.peakHours}.`;
      } else if (userMessage.includes('where') || userMessage.includes('location') || userMessage.includes('map')) {
        reply = `${matchedSite.name} is located at ${matchedSite.location}.`;
      } else if (userMessage.includes('architecture') || userMessage.includes('style')) {
        reply = `${matchedSite.name} architecture style: ${matchedSite.architectureStyle}. Historical era: ${matchedSite.historicalEra}.`;
      } else {
        reply = siteOverview(matchedSite);
      }
    } else if (matchedKey) {
      reply = chatbotKnowledgeBase[matchedKey];
    } else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      reply = `Namaste! I am your AI Heritage Guide. You can ask me about any monument in the app: ${allSiteNames()}.`;
    } else if (userMessage.includes('monument') || userMessage.includes('sites') || userMessage.includes('places') || userMessage.includes('list')) {
      reply = `The app currently covers these monuments: ${allSiteNames()}.`;
    } else if (userMessage.includes('visit') || userMessage.includes('entry') || userMessage.includes('ticket') || userMessage.includes('fee')) {
      reply = heritageSites.map((site) => `${site.name}: ${site.entryFee}`).join(' | ');
    } else if (userMessage.includes('timing') || userMessage.includes('open') || userMessage.includes('time') || userMessage.includes('hours')) {
      reply = heritageSites.map((site) => `${site.name}: ${site.timings}`).join(' | ');
    } else if (userMessage.includes('crowd') || userMessage.includes('busy') || userMessage.includes('peak')) {
      reply = heritageSites.map((site) => `${site.name}: ${site.crowdLevel}, wait ${site.waitingTime}`).join(' | ');
    } else if (userMessage.includes('diamond') || userMessage.includes('koh') || userMessage.includes('kohinoor')) {
      reply = chatbotKnowledgeBase.diamond;
    } else if (userMessage.includes('language') || userMessage.includes('translate') || userMessage.includes('hindi') || userMessage.includes('telugu')) {
      reply = 'The app supports multilingual content. The audio guide is now focused on Telugu, with remote audio first and browser speech as a fallback.';
    } else if (userMessage.includes('badge') || userMessage.includes('stamp') || userMessage.includes('point') || userMessage.includes('reward')) {
      reply = "The Digital Passport system lets you collect stamps for every site you visit. Earn badges like First Step, History Buff, Explorer, and AI Pioneer.";
    } else {
      reply = `I can help with history, timings, entry fees, crowd levels, location, and architecture for: ${allSiteNames()}. Ask me about any one of them.`;
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: 'Sorry, I am having trouble connecting to my historical database right now. Please try again.' },
      { status: 500 }
    );
  }
}
