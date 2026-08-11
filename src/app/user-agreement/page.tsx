'use client';

// ЕДИНОЕ ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ. Один и тот же файл на четырёх сайтах.
//
// Раньше документ был доступен по разным адресам на двух сайтах из четырёх, а
// на radiocode.space отсутствовал вовсе, хотя кабинет, тарифы, токены и память
// там общие с остальными. Теперь адрес один: /user-agreement.
//
// Страница ничего не берёт из словарей конкретного сайта — весь текст лежит в
// legal/terms-text.ts, поэтому она одинаково работает везде.

import { useLanguage } from '../../lib/LanguageContext';
import { текстСоглашения } from '../../legal/terms-text';
import { LegalAddendum } from '../../legal/addendum';
import { FormattedList } from '../../components/FormattedList';
import { строкаРеквизитов, type Язык } from '../../lib/requisites';

const ЗАГОЛОВОК_РЕКВИЗИТОВ: Record<string, string> = {
  en: 'Requisites of the operator',
  ru: 'Реквизиты оператора',
  es: 'Datos del operador',
  zh: '运营方登记信息',
};

export default function UserAgreementPage() {
  const { locale } = useLanguage();
  const t = текстСоглашения(String(locale || 'en'));

  const Раздел = ({ children }: { children: React.ReactNode }) => (
    <section className="space-y-2">{children}</section>
  );
  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-[#00FF88] mb-4">{children}</h2>
  );
  const H3 = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-bold mb-2 mt-4">{children}</h3>
  );

  return (
    <div className="bg-background text-foreground py-20 px-4 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-muted-foreground text-sm mb-12">{t.effectiveDate}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <Раздел>
            <H2>{t.s1Title}</H2>
            <H3>{t.s1_1Title}</H3>
            <p className="mb-3">{t.s1_1Text}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              {t.s1_1List.map((x: string, i: number) => <li key={i}>{x}</li>)}
            </ul>
            <H3>{t.s1_2Title}</H3>
            <p className="mb-2">{t.s1_2Text1}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              {t.s1_2List.map((x: string, i: number) => <li key={i}>{x}</li>)}
            </ul>
            <p className="mt-2">{t.s1_2Text2}</p>
            <p className="mt-2">{t.s1_2Text3}</p>
            <p className="mt-2">{t.s1_2Text4}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s2Title}</H2>
            <H3>{t.s2_1Title}</H3>
            <p className="mb-3">{t.s2_1Text1}</p>
            <p>{t.s2_1Text2}</p>
            <H3>{t.s2_2Title}</H3>
            <p className="mb-3">{t.s2_2Text1}</p>
            <H3>{t.s2_3Title}</H3>
            <FormattedList text={t.s2_3Text1} />
            <H3>{t.s2_4Title}</H3>
            <p>{t.s2_4Text1}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s3Title}</H2>
            <H3>{t.s3_1Title}</H3>
            <FormattedList text={t.s3_1Text1} className="mb-2" />
            <H3>{t.s3_2Title}</H3>
            <p className="mb-2">{t.s3_2Text1}</p>
            <H3>{t.s3_3Title}</H3>
            <FormattedList text={t.s3_3Text1} className="mb-2" />
            <H3>{t.s3_4Title}</H3>
            <p className="mb-2">{t.s3_4Text1}</p>
            <H3>{t.s3_5Title}</H3>
            <p className="mb-2">{t.s3_5Text1}</p>
            <H3>{t.s3_6Title}</H3>
            <p className="mb-2">{t.s3_6Text1}</p>
            <H3>{t.s3_7Title}</H3>
            <p>{t.s3_7Text1}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s4Title}</H2>
            <H3>{t.s4_1Title}</H3>
            <p className="mb-2">{t.s4_1Text1}</p>
            <H3>{t.s4_2Title}</H3>
            <FormattedList text={t.s4_2Text1} className="mb-2" />
            <H3>{t.s4_3Title}</H3>
            <FormattedList text={t.s4_3Text1} className="mb-2" />
            <H3>{t.s4_4Title}</H3>
            <p className="mb-2">{t.s4_4Text1}</p>
            <H3>{t.s4_5Title}</H3>
            <p>{t.s4_5Text1}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s5Title}</H2>
            <H3>{t.s5_1Title}</H3>
            <FormattedList text={t.s5_1Text1} className="mb-2" />
            <H3>{t.s5_2Title}</H3>
            <p className="mb-2">{t.s5_2Text1}</p>
            <H3>{t.s5_3Title}</H3>
            <p>{t.s5_3Text1}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s6Title}</H2>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n}>
                <H3>{t[`s6_${n}Title`]}</H3>
                <p className="mb-2">{t[`s6_${n}Text1`]}</p>
              </div>
            ))}
          </Раздел>

          <Раздел>
            <H2>{t.s7Title}</H2>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <H3>{t[`s7_${n}Title`]}</H3>
                <p className="mb-2">{t[`s7_${n}Text1`]}</p>
              </div>
            ))}
          </Раздел>

          <Раздел>
            <H2>{t.s8Title}</H2>
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <H3>{t[`s8_${n}Title`]}</H3>
                <p className="mb-2">{t[`s8_${n}Text1`]}</p>
              </div>
            ))}
          </Раздел>

          <Раздел>
            <H2>{t.s9Title}</H2>
            <H3>{t.s9_1Title}</H3>
            <p className="mb-2">{t.s9_1Text1}</p>
            <p className="mb-2">{t.s9_1Text2}</p>
            <p className="mb-2">{t.s9_1Text3}</p>
            <H3>{t.s9_2Title}</H3>
            <p className="mb-2">{t.s9_2Text1}</p>
            <H3>{t.s9_3Title}</H3>
            <p>{t.s9_3Text1}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s10Title}</H2>
            <H3>{t.s10_1Title}</H3>
            <p className="mb-2">{t.s10_1Text1}</p>
            <H3>{t.s10_2Title}</H3>
            <p>{t.s10_2Text1}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s11Title} &amp; {t.s12Title} &amp; {t.s13Title}</H2>
            <div className="space-y-4">
              <div><H3>{t.s11Title}</H3><p>{t.s11Text1}</p></div>
              <div><H3>{t.s12Title}</H3><p>{t.s12Text1}</p></div>
              <div><H3>{t.s13Title}</H3><p>{t.s13Text1}</p></div>
            </div>
          </Раздел>

          <Раздел>
            <H2>{t.s14Title}</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[t.s14_g1Title, t.s14_l1Title, t.s14_p1Title, t.s14_a1Title].map((з: string, i: number) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <p className="font-bold mb-1">{з}</p>
                  <p className="text-sm">contact@codeofdigitaleternity.com</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-3">{t.s14Text2}</p>
          </Раздел>

          <Раздел>
            <H2>{t.s15_16Title}</H2>
            <div className="space-y-4">
              <div><H3>{t.s15Title}</H3><p>{t.s15Text1}</p></div>
              <div><H3>{t.s16Title}</H3><FormattedList text={t.s16Text1} /></div>
            </div>
          </Раздел>

          <Раздел>
            <H2>{t.jTitle}</H2>
            <div className="space-y-3 text-sm">
              <p>{t.jEU}</p>
              <p>{t.jCA}</p>
              <p>{t.jUK}</p>
              <p>{t.jAU}</p>
            </div>
          </Раздел>

          <section className="border-t border-border pt-8">
            <H2>{t.sealTitle}</H2>
            <p className="text-sm leading-relaxed mb-4">{t.sealText1}</p>
            <p className="text-sm leading-relaxed mb-4">{t.sealText2}</p>
            <p className="text-sm leading-relaxed mb-4">{t.sealText3}</p>
            <div className="bg-card border border-[#00FF88]/30 rounded-lg p-6 mt-6">
              <p className="font-bold mb-3">{t.warningTitle}</p>
              <p className="text-sm leading-relaxed">{t.warningIntro}</p>
              <ul className="text-sm space-y-1 mt-2">
                {t.warningList.map((x: string, i: number) => <li key={i}>• {x}</li>)}
              </ul>
            </div>
            <p className="text-[#00FF88] font-bold mt-6">{t.footerMotto}</p>
          </section>
        </div>

        <LegalAddendum doc="terms" />

        {/* Реквизиты оператора. Ст. 5 Директивы 2000/31/EC требует, чтобы имя,
            правовая форма, адрес и регистрационные номера были доступны на
            коммерческом сайте постоянно и напрямую. Незаполненные поля не
            выводятся — источник один на четыре сайта: lib/requisites.ts. */}
        <div className="mt-10 rounded-2xl border border-[#00FF88]/25 p-6">
          <h2 className="text-lg font-bold text-[#00FF88] mb-3">
            {ЗАГОЛОВОК_РЕКВИЗИТОВ[String(locale)] ?? ЗАГОЛОВОК_РЕКВИЗИТОВ.en}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed break-words">
            {строкаРеквизитов((String(locale) as Язык) || 'en')}
          </p>
        </div>
      </div>
    </div>
  );
}
