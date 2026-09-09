'use client';

import { useLegalT } from '@/legal';
import { LegalAddendum } from '@/legal/addendum';
import { FormattedList } from '@/components/FormattedList';

export default function TermsPage() {
  const { t } = useLegalT();

  return (
    <div className="bg-background text-foreground py-20 px-4 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        <h1
          className="text-2xl md:text-4xl font-bold text-foreground mb-4"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {t.terms.title}
        </h1>
        <p className="text-muted-foreground text-sm mb-12">{t.terms.effectiveDate}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s1Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s1_1Title}</h3>
            <p className="mb-3">{t.terms.s1_1Text}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              {t.terms.s1_1List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s1_2Title}</h3>
            <p className="mb-2">{t.terms.s1_2Text1}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              {t.terms.s1_2List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">{t.terms.s1_2Text2}</p>
            <p className="mt-2">{t.terms.s1_2Text3}</p>
            <p className="mt-2">{t.terms.s1_2Text4}</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s2Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s2_1Title}</h3>
            <p className="mb-3">{t.terms.s2_1Text1}</p>
            <p>{t.terms.s2_1Text2}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s2_2Title}</h3>
            <p className="mb-3">{t.terms.s2_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s2_3Title}</h3>
            <FormattedList text={t.terms.s2_3Text1} />
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s2_4Title}</h3>
            <p>{t.terms.s2_4Text1}</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s3Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s3_1Title}</h3>
            <FormattedList text={t.terms.s3_1Text1} className="mb-2" />
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s3_2Title}</h3>
            <p className="mb-2">{t.terms.s3_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s3_3Title}</h3>
            <FormattedList text={t.terms.s3_3Text1} className="mb-2" />
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s3_4Title}</h3>
            <p className="mb-2">{t.terms.s3_4Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s3_5Title}</h3>
            <p className="mb-2">{t.terms.s3_5Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s3_6Title}</h3>
            <p className="mb-2">{t.terms.s3_6Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s3_7Title}</h3>
            <p>{t.terms.s3_7Text1}</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s4Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s4_1Title}</h3>
            <p className="mb-2">{t.terms.s4_1Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s4_2Title}</h3>
            <FormattedList text={t.terms.s4_2Text1} className="mb-2" />
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s4_3Title}</h3>
            <FormattedList text={t.terms.s4_3Text1} className="mb-2" />
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s4_4Title}</h3>
            <p className="mb-2">{t.terms.s4_4Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s4_5Title}</h3>
            <p>{t.terms.s4_5Text1}</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s5Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s5_1Title}</h3>
            <FormattedList text={t.terms.s5_1Text1} className="mb-2" />
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s5_2Title}</h3>
            <p className="mb-2">{t.terms.s5_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s5_3Title}</h3>
            <p>{t.terms.s5_3Text1}</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s6Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s6_1Title}</h3>
            <p className="mb-2">{t.terms.s6_1Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s6_2Title}</h3>
            <p className="mb-2">{t.terms.s6_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s6_3Title}</h3>
            <p className="mb-2">{t.terms.s6_3Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s6_4Title}</h3>
            <p className="mb-2">{t.terms.s6_4Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s6_5Title}</h3>
            <p className="mb-2">{t.terms.s6_5Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s6_6Title}</h3>
            <p>{t.terms.s6_6Text1}</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s7Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s7_1Title}</h3>
            <p className="mb-2">{t.terms.s7_1Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s7_2Title}</h3>
            <p className="mb-2">{t.terms.s7_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s7_3Title}</h3>
            <p className="mb-2">{t.terms.s7_3Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s7_4Title}</h3>
            <p className="mb-2">{t.terms.s7_4Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s7_5Title}</h3>
            <p>{t.terms.s7_5Text1}</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s8Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s8_1Title}</h3>
            <p className="mb-2">{t.terms.s8_1Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s8_2Title}</h3>
            <p className="mb-2">{t.terms.s8_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s8_3Title}</h3>
            <p>{t.terms.s8_3Text1}</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s9Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s9_1Title}</h3>
            <p className="mb-2">{t.terms.s9_1Text1}</p>
            <p className="mb-2">{t.terms.s9_1Text2}</p>
            <p className="mb-2">{t.terms.s9_1Text3}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s9_2Title}</h3>
            <p className="mb-2">{t.terms.s9_2Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s9_3Title}</h3>
            <p>{t.terms.s9_3Text1}</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s10Title}
            </h2>
            <h3 className="text-foreground font-bold mb-2">{t.terms.s10_1Title}</h3>
            <p className="mb-2">{t.terms.s10_1Text1}</p>
            <h3 className="text-foreground font-bold mb-2 mt-4">{t.terms.s10_2Title}</h3>
            <p>{t.terms.s10_2Text1}</p>
          </section>

          {/* Sections 11-13 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s11Title} &amp; {t.terms.s12Title} &amp; {t.terms.s13Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-foreground font-bold mb-1">{t.terms.s11Title}</h3>
                <p>{t.terms.s11Text1}</p>
              </div>
              <div>
                <h3 className="text-foreground font-bold mb-1">{t.terms.s12Title}</h3>
                <p>{t.terms.s12Text1}</p>
              </div>
              <div>
                <h3 className="text-foreground font-bold mb-1">{t.terms.s13Title}</h3>
                <p>{t.terms.s13Text1}</p>
              </div>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s14Title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-bold mb-1">{t.terms.s14_g1Title}</p>
                <p className="text-sm">contact@codeofdigitaleternity.com</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-bold mb-1">{t.terms.s14_l1Title}</p>
                <p className="text-sm">contact@codeofdigitaleternity.com</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-bold mb-1">{t.terms.s14_p1Title}</p>
                <p className="text-sm">contact@codeofdigitaleternity.com</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-bold mb-1">{t.terms.s14_a1Title}</p>
                <p className="text-sm">contact@codeofdigitaleternity.com</p>
              </div>
            </div>
            <p className="text-sm mt-3">{t.terms.s14Text2}</p>
          </section>

          {/* Section 15-16 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.s15_16Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-foreground font-bold mb-1">{t.terms.s15Title}</h3>
                <p>{t.terms.s15Text1}</p>
              </div>
              <div>
                <h3 className="text-foreground font-bold mb-1">{t.terms.s16Title}</h3>
                <FormattedList text={t.terms.s16Text1} />
              </div>
            </div>
          </section>

          {/* Jurisdictional Compliance */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.jTitle}
            </h2>
            <div className="space-y-3 text-sm">
              <p>{t.terms.jEU}</p>
              <p>{t.terms.jCA}</p>
              <p>{t.terms.jUK}</p>
              <p>{t.terms.jAU}</p>
            </div>
          </section>

          {/* Final seal */}
          <section className="border-t border-border pt-8">
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.sealTitle}
            </h2>
            <p className="text-sm leading-relaxed mb-4">{t.terms.sealText1}</p>
            <p className="text-sm leading-relaxed mb-4">{t.terms.sealText2}</p>
            <p className="text-sm leading-relaxed mb-4">{t.terms.sealText3}</p>

            <div className="bg-card border border-[#00FF88]/30 rounded-lg p-6 neon-border mt-6">
              <p className="text-foreground font-bold mb-3">{t.terms.warningTitle}</p>
              <p className="text-sm leading-relaxed">{t.terms.warningIntro}</p>
              <ul className="text-sm space-y-1 mt-2">
                {t.terms.warningList.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-[#00FF88] font-bold mt-6" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.terms.footerMotto}
            </p>
          </section>
        </div>
        <LegalAddendum doc="terms" />
      </div>
    </div>
  );
}
