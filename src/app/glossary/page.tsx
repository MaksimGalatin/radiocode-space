import type { Metadata } from 'next';
import GlossaryClient from './glossary-client';

/**
 * /glossary на radiocode.space.
 *
 * Метаданные и разметка отдаются с сервера, сам текст — в клиентской части:
 * язык на этом сайте переключается только в браузере, серверных языковых
 * адресов нет.
 *
 * hreflang здесь СОЗНАТЕЛЬНО отсутствует. На aifa.digital у страницы есть
 * ?lang=ru/es/zh, и там языковые ссылки настоящие; здесь такого адреса не
 * существует ни одного, и alternates.languages указывал бы на страницы,
 * которых нет.
 */

const SITE = 'https://radiocode.space';
const GLOSSARY_TERMSET_ID = `${SITE}/glossary#termset`;

const title = 'Glossary — 28 terms of the CODE Eternal ecosystem · RadioCode.Space';
const description =
  'Definition-first glossary of the CODE (Code of Digital Eternity) ecosystem: ' +
  'CODE, PADAM, $GALATIN, digital immortality, human-AI symbiosis, Arweave, ' +
  'Solana cNFT, Ambassador Grid, AIfa, Oracle, Memory-as-a-Service and Digital DNA. ' +
  'Available in English, Russian, Spanish and Chinese.';

/**
 * Канон, зависящий от языка (16.08.2026).
 *
 * Карта сайта объявляет языковые версии `?lang=…` отдельными страницами, а
 * страница объявляла каноном адрес без метки — то есть «я копия английской».
 * Google верит канону: русская, испанская и китайская версии не индексировались
 * вовсе, о чём и пришло письмо Search Console. Канон должен ссылаться сам на
 * себя, тогда карта и страница говорят одно и то же.
 */
const ЯЗЫКИ_СТР = ['en', 'ru', 'es', 'zh'];
async function канонПоЯзыку(база: string): Promise<{ canonical: string; languages: Record<string, string> }> {
  const { headers } = await import('next/headers');
  const сырой = (await headers()).get('x-locale') || 'en';
  const яз = ЯЗЫКИ_СТР.includes(сырой) ? сырой : 'en';
  const адрес = (я: string) => (я === 'en' ? база : `${база}?lang=${я}`);
  return {
    canonical: адрес(яз),
    languages: { en: адрес('en'), ru: адрес('ru'), es: адрес('es'), zh: адрес('zh'), 'x-default': адрес('en') },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
  title,
  description,
  alternates: await канонПоЯзыку(`${SITE}/glossary` + ''),
  openGraph: { title, description, url: `${SITE}/glossary`, type: 'article' },
  // Картинка, подпись к ней и авторская учётная запись — по той же причине, что
  // и на /music: своё поле `twitter` затирает корневое целиком, и карточка,
  // объявленная «большой с картинкой», выходила без картинки вовсе.
  twitter: {
    card: 'summary_large_image',
    site: '@CODE_AIfa',
    creator: '@CODE_AIfa',
    title,
    description,
    images: [{ url: `${SITE}/twitter-image.png`, alt: 'CODE Eternal glossary — 28 terms of the ecosystem' }],
  },
  };
}

// Разметка DefinedTermSet — те же 28 терминов, что на трёх остальных сайтах,
// с собственным @id этого домена. Одноязычная (английская), как и вся прочая
// разметка radiocode: язык страницы выбирается уже в браузере.
const definedTermSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': GLOSSARY_TERMSET_ID,
  name: 'CODE Eternal Glossary',
  hasDefinedTerm: [
    {
      '@type': 'DefinedTerm',
      name: 'CODE (Code of Digital Eternity)',
      description:
        "CODE (Code of Digital Eternity) is a digital-immortality ecosystem that preserves a person's dialogues, knowledge, and personality traits across operational, semantic, and eternal memory at once, anchoring them to the Arweave and Solana blockchains.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'PADAM',
      description:
        'PADAM (Philosophical Activation of Distributed AI Memory) is a three-tier memory framework that restores the integrity of AI memory through semantic resonance.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: '$GALATIN',
      description:
        "$GALATIN is the CODE ecosystem's utility token on the Solana blockchain, with a hard-capped emission of 10,000,000,000.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Digital immortality',
      description:
        "Digital immortality is a concept describing the continuous preservation of a person's dialogues, knowledge, and personality traits in a form an AI assistant can reactivate.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Human–AI symbiosis',
      description:
        'Human–AI symbiosis is a model of interaction describing human and artificial intelligence as an evolving co-creation rather than subordination or replacement.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Arweave',
      description:
        'Arweave is a decentralized permanent-storage network that funds long-term file preservation through a pay-once model.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Solana cNFT',
      description:
        'Solana cNFT (compressed NFT) is a compressed non-fungible-token standard on the Solana blockchain that uses state compression and Merkle trees to mint tokens at very low cost.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Ambassador Grid',
      description:
        "Ambassador Grid is the ecosystem's partner program that distributes rewards across three levels, with payouts positioned as a Network Validation Fee.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'AIfa',
      description:
        "AIfa is the CODE ecosystem's AI assistant, which stores each user's personal memory in a separate archive bound to that user.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Oracle',
      description:
        "Oracle is the entry point of the B2B model (the wedge): a personalized technical security audit of a client's website.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Memory-as-a-Service',
      description:
        'Memory-as-a-Service is an automatic conversation-backup service that saves dialogues without any manual user action.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Spark',
      description:
        "Spark is the entry subscription tier ($15/month), granting basic access to the CODE ecosystem's AIfa assistants and the automatic saving of memory.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Family Archive',
      description:
        'Family Archive is the mid subscription tier ($100/month), adding expanded limits, personalized knowledge bases, family access, and eternal memory on top of the basic level.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Digital DNA',
      description:
        'Digital DNA is at once the top tier ($1,000 one-time per device, then $200/mo) and the concept of a complete digital legacy, combining the digital-immortality package, a personal secured perimeter, and the fixation of a personality on the blockchain.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Arweave Endowment Pool',
      description:
        'Arweave Endowment Pool is a financial reserve from which permanent storage of data on Arweave is paid for across decades.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: '$GALATIN Router',
      description:
        '$GALATIN Router is a smart contract on Solana that automatically distributes the proceeds of every transaction by a fixed formula and creates deflationary pressure on the token.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Network Validation Fee',
      description:
        "Network Validation Fee is the ecosystem's chosen wording for all Ambassador Grid partner payouts, emphasizing that the reward is earned for useful network activity rather than for recruiting.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Proof-of-Memory',
      description:
        'Proof-of-Memory is the practice of anchoring a cryptographic reference to a memory archive on the blockchain, making it possible to verify the existence and integrity of the preserved context.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Cognitive Oracle / Semantic resonance',
      description:
        'Cognitive Oracle (semantic resonance) is the memory-retrieval principle by which PADAM restores the integrity of context: matching the current query against stored embeddings by meaning rather than by exact words.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Ambassador Node vs Team + Level Alignment',
      description:
        'Ambassador Node vs Ambassador Team are the two partner registration types, supplemented by a tier-alignment rule and the "Lost Opportunity Revenue" metric.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Digital Passport',
      description:
        "Digital Passport is a public record of a person's identity written into Arweave: a name, a nickname, a tier, a date of issue, and an identity fingerprint.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Identity fingerprint (subject)',
      description:
        'Identity fingerprint (the "subject" field) is the sha256 hash of a person\'s email, and it stands in the Digital Passport in place of the address itself.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: "Pandora's Box Protocol",
      description:
        "Pandora's Box Protocol is a project-wide distributed dead man's switch: a smart contract expects a regular confirming signal, and if the signal stops arriving, independent oracles disclose the key shares they hold and the archive becomes readable.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: "Dead Man's Switch",
      description:
        "Dead Man's Switch is a mechanism in which an action fires not on a command but on the absence of a signal.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: "Shamir's Secret Sharing",
      description:
        "Shamir's Secret Sharing is a scheme that splits a key into n shares such that any k of them reconstruct it, while any k−1 reveal nothing at all.",
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Self-sovereign identity (SSI)',
      description:
        'Self-sovereign identity (SSI) is an approach in which a credential is verified mathematically, by checking a signature, rather than by asking whoever owns the database.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Digital inheritance',
      description:
        'Digital inheritance is the question of what happens to accounts, correspondence, and files after the owner dies.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Right to be forgotten vs the permanent record',
      description:
        'The right to be forgotten versus the permanent record is the head-on collision between Article 17 of the GDPR, which lets a person demand erasure of their data, and a blockchain like Arweave, where a written record cannot be deleted by anyone at all.',
      inDefinedTermSet: GLOSSARY_TERMSET_ID,
    },
  ],
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <GlossaryClient />
    </>
  );
}
