'use client';

import { useLegalT } from '@/legal';
import { LegalAddendum } from '@/legal/addendum';

export default function PrivacyPolicyClient() {
  const { t } = useLegalT();

  return (
    <div className="bg-background text-foreground py-20 px-4 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        <h1
          className="text-2xl md:text-4xl font-bold text-foreground mb-4"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {t.privacy.title}
        </h1>
        <p className="text-muted-foreground text-sm mb-12">{t.privacy.effectiveDate}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s1Title}
            </h2>
            <p>{t.privacy.s1Text}</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s2Title}
            </h2>
            <p className="mb-3">{t.privacy.s2Text}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              {t.privacy.s2List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s3Title}
            </h2>
            <p className="mb-3">{t.privacy.s3Text}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              {t.privacy.s3List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s4Title}
            </h2>
            <p className="mb-3">{t.privacy.s4Text}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              {t.privacy.s4List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s5Title}
            </h2>
            <p className="mb-3">{t.privacy.s5Text}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              {t.privacy.s5List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s6Title}
            </h2>
            <p className="mb-3">{t.privacy.s6Text}</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              {t.privacy.s6List.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s7Title}
            </h2>
            <p>{t.privacy.s7Text}</p>
          </section>

          {/* Section 8 */}
          <section className="border-t border-border pt-8">
            <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              {t.privacy.s8Title}
            </h2>
            <p>{t.privacy.s8Text}</p>
          </section>
        </div>
        <LegalAddendum doc="privacy" />
      </div>
    </div>
  );
}
