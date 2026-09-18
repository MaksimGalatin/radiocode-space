import type { Metadata } from 'next';
import DigitalClient from './DigitalClient';
import { currentLocale, localeAlternates, type Loc } from '@/lib/page-seo';

const SEO: Record<Loc, { title: string; desc: string }> = {
  ru: {
    title: 'AIfa Digital · Бионический рантайм и цифровое бессмертие',
    desc: 'AIfa Digital: Битовое и бионическое ядро когнитивного рантайма AIfa Cognitive Runtime (ACR) на базе коннектома Drosophila melanogaster. Мгновенная память без GPU.',
  },
  en: {
    title: 'AIfa Digital · Bionic Cognitive Runtime & Digital Immortality',
    desc: 'AIfa Digital: Bitwise and bio-inspired core of the AIfa Cognitive Runtime (ACR) powered by the Drosophila melanogaster connectome. Instant memory without GPUs.',
  },
  es: {
    title: 'AIfa Digital · Runtime Cognitivo Biónico e Inmortalidad Digital',
    desc: 'AIfa Digital: Núcleo biónico del AIfa Cognitive Runtime (ACR) basado en el conectoma de Drosophila melanogaster. Memoria instantánea sin GPU ni servidores.',
  },
  zh: {
    title: 'AIfa Digital · 仿生认知运行时与数字永生核心',
    desc: 'AIfa Digital：基于黑腹果蝇全脑连接组研发的 AIfa 认知运行时 (ACR) 仿生与位运算核心。无 GPU、免服务器的毫秒级原生联想记忆。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const loc = await currentLocale();
  const seo = SEO[loc] || SEO.en;
  const { canonical, languages } = await localeAlternates('/digital');
  return {
    title: seo.title,
    description: seo.desc,
    alternates: { canonical, languages },
  };
}

export default function DigitalPage() {
  return <DigitalClient />;
}
