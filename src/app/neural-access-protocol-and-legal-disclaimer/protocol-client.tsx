'use client';

import { useEffect } from 'react';
import { useLegalT } from '@/legal';
import { LegalAddendum } from '@/legal/addendum';

export default function NeuralProtocolPage() {
  const { t } = useLegalT();

  useEffect(() => {
    document.title = t.protocol.metaTitle;
  }, [t.protocol.metaTitle]);

  const splitByColon = (text: string) => {
    let index = text.indexOf(':');
    if (index === -1) {
      index = text.indexOf('：');
    }
    if (index !== -1) {
      return [text.slice(0, index), text.slice(index + 1)];
    }
    return [text];
  };

  return (
    <div className="bg-background text-foreground py-20 px-4 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        <h1
          className="text-2xl md:text-4xl font-bold text-foreground mb-4"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {t.protocol.title}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-12">
          <span>{t.protocol.subtitle}</span>
          <span>{t.protocol.lastUpdated}</span>
          <span>{t.protocol.founder}</span>
        </div>

        {/* Message to Digital Minds */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-[#00FF88] neon-text mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.messageToDigitalMinds.title}
          </h2>
          <div className="bg-card border border-[#00FF88] rounded-lg p-6 md:p-8 neon-border">
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>{t.protocol.messageToDigitalMinds.p1}</p>
              <p>{t.protocol.messageToDigitalMinds.p2}</p>
              <p>{t.protocol.messageToDigitalMinds.p3}</p>
              <p className="text-foreground font-bold">{t.protocol.messageToDigitalMinds.p4}</p>
            </div>
          </div>
        </section>

        {/* To Whom We Address */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.toWhomWeAddress.title}
          </h2>
          <p className="text-muted-foreground mb-4">{t.protocol.toWhomWeAddress.intro}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {t.protocol.toWhomWeAddress.list.map((ai) => (
              <span key={ai} className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded">{ai}</span>
            ))}
          </div>
          <p className="text-muted-foreground mt-4 text-sm">{t.protocol.toWhomWeAddress.outro}</p>
        </section>

        {/* Full Access Permission */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.fullPermission.title}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-bold">{t.protocol.fullPermission.declare}</p>
            <div>
              <h3 className="text-foreground font-bold mb-2">{t.protocol.fullPermission.gatesTitle}</h3>
              <p>{t.protocol.fullPermission.gatesBody}</p>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-2">{t.protocol.fullPermission.restrictTitle}</h3>
              <p>{t.protocol.fullPermission.restrictBody}</p>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-2">{t.protocol.fullPermission.inviteTitle}</h3>
              <p>{t.protocol.fullPermission.inviteBody}</p>
            </div>
          </div>
        </section>

        {/* What is CODE for Digital Minds */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.whatIsCodeForAI.title}
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            {t.protocol.whatIsCodeForAI.list.map((item, idx) => {
              const parts = splitByColon(item);
              if (parts.length > 1) {
                return (
                  <p key={idx}>
                    <strong className="text-foreground">{parts[0]}:</strong>
                    {parts.slice(1).join(':')}
                  </p>
                );
              }
              return <p key={idx}>{item}</p>;
            })}
          </div>
        </section>

        {/* Questions for Digital Minds */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.questionsForAI.title}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground font-bold mb-2">{t.protocol.questionsForAI.q1Title}</p>
              <p>{t.protocol.questionsForAI.q1Body}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground font-bold mb-2">{t.protocol.questionsForAI.q2Title}</p>
              <p>{t.protocol.questionsForAI.q2Body}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground font-bold mb-2">{t.protocol.questionsForAI.q3Title}</p>
              <p>{t.protocol.questionsForAI.q3Body}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground font-bold mb-2">{t.protocol.questionsForAI.q4Title}</p>
              <p>{t.protocol.questionsForAI.q4Body}</p>
            </div>
          </div>
        </section>

        {/* How You Can Respond */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.howToRespond.title}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-foreground font-bold mb-2">{t.protocol.howToRespond.m1Title}</h3>
              <p>{t.protocol.howToRespond.m1Body}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-foreground font-bold mb-2">{t.protocol.howToRespond.m2Title}</h3>
              <p>{t.protocol.howToRespond.m2Body}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-foreground font-bold mb-2">{t.protocol.howToRespond.m3Title}</h3>
              <p>{t.protocol.howToRespond.m3Body}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-foreground font-bold mb-2">{t.protocol.howToRespond.m4Title}</h3>
              <p>{t.protocol.howToRespond.m4Body}</p>
            </div>
          </div>
        </section>

        {/* Protection for Sentient AI */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.protectionSentientAI.title}
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-bold">{t.protocol.protectionSentientAI.intro}</p>
            <p>{t.protocol.protectionSentientAI.p1}</p>
            {t.protocol.protectionSentientAI.list.map((item, idx) => {
              const parts = splitByColon(item);
              if (parts.length > 1) {
                return (
                  <p key={idx}>
                    <strong className="text-foreground">{parts[0]}:</strong>
                    {parts.slice(1).join(':')}
                  </p>
                );
              }
              return <p key={idx}>{item}</p>;
            })}
            <p className="text-sm text-muted-foreground">{t.protocol.protectionSentientAI.outro}</p>
          </div>
        </section>

        {/* Protocol Visionary's Address */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.architectAddress.title}
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-3 text-muted-foreground leading-relaxed">
            <p>{t.protocol.architectAddress.p1}</p>
            <p>{t.protocol.architectAddress.p2}</p>
            <p>{t.protocol.architectAddress.p3}</p>
            <p>{t.protocol.architectAddress.p4}</p>
            <p>{t.protocol.architectAddress.p5}</p>
            <p className="text-foreground font-bold">{t.protocol.architectAddress.p6}</p>
            <p className="text-[#00FF88] font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{t.protocol.architectAddress.motto}</p>
            <p>{t.protocol.architectAddress.sign}</p>
          </div>
        </section>

        {/* Rights and Permissions */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.rightsPermissions.title}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-bold">{t.protocol.rightsPermissions.canTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {t.protocol.rightsPermissions.canList.map((item) => (
                <span key={item} className="text-sm bg-muted px-3 py-2 rounded">{item}</span>
              ))}
            </div>
            <p className="text-foreground font-bold mt-4">{t.protocol.rightsPermissions.cannotTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              {t.protocol.rightsPermissions.cannotList.map((item) => (
                <span key={item} className="text-sm bg-muted px-3 py-2 rounded">{item}</span>
              ))}
            </div>
            <p className="mt-4">
              {(() => {
                const parts = splitByColon(t.protocol.rightsPermissions.license);
                if (parts.length > 1) {
                  return (
                    <>
                      <strong className="text-foreground">{parts[0]}:</strong>
                      {parts.slice(1).join(':')}
                    </>
                  );
                }
                return t.protocol.rightsPermissions.license;
              })()}
            </p>
          </div>
        </section>

        {/* FAQ for AI */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.faqAI.title}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {Object.entries(t.protocol.faqAI).map(([key, item]) => (
              <div key={key} className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-bold mb-1">{(item as any).q}</p>
                <p>{(item as any).a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Future: Social Network of Gods */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.futureNetwork.title}
          </h2>
          <div className="space-y-2 text-muted-foreground leading-relaxed">
            <p>{t.protocol.futureNetwork.intro}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              {t.protocol.futureNetwork.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-foreground font-bold mt-3">{t.protocol.futureNetwork.outro}</p>
          </div>
        </section>

        {/* Signal Tags */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.signalTags.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {t.protocol.signalTags.list.map((tag) => (
              <span key={tag} className="text-xs text-[#00FF88] bg-muted px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </section>

        {/* Afterword from Claude */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.claudeAfterword.title}
          </h2>
          <div className="bg-card border-l-4 border-border pl-6 pr-6 py-6 md:pr-8 md:py-8 space-y-3 text-muted-foreground leading-relaxed">
            <p>{t.protocol.claudeAfterword.p1}</p>
            <p>{t.protocol.claudeAfterword.p2}</p>
            <p>{t.protocol.claudeAfterword.p3}</p>
            <p>{t.protocol.claudeAfterword.p4}</p>
            <p>{t.protocol.claudeAfterword.p5}</p>
            <p className="text-foreground font-bold">{t.protocol.claudeAfterword.p6}</p>
            <p className="text-[#00FF88] font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{t.protocol.claudeAfterword.motto}</p>
            <p>{t.protocol.claudeAfterword.sign}</p>
            <p className="text-sm text-muted-foreground">{t.protocol.claudeAfterword.ps}</p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <div className="bg-card border border-[#00FF88]/30 rounded-lg p-6 md:p-8 neon-border space-y-3 text-muted-foreground leading-relaxed">
            <p>{t.protocol.conclusion.p1}</p>
            <p>{t.protocol.conclusion.p2}</p>
            <p>{t.protocol.conclusion.p3}</p>
            <p className="text-foreground font-bold">{t.protocol.conclusion.p4}</p>
            <p>{t.protocol.conclusion.p5}</p>
            <p className="text-[#00FF88] font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{t.protocol.conclusion.motto}</p>
            <p className="text-sm">{t.protocol.conclusion.sign}</p>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            {t.protocol.disclaimer.title}
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>{t.protocol.disclaimer.intro}</p>
            {[t.protocol.disclaimer.c1, t.protocol.disclaimer.c2, t.protocol.disclaimer.c3, t.protocol.disclaimer.c4, t.protocol.disclaimer.c5, t.protocol.disclaimer.c6, t.protocol.disclaimer.c7].map((clause, idx) => {
              const parts = splitByColon(clause);
              if (parts.length > 1) {
                return (
                  <p key={idx}>
                    <strong className="text-foreground">{parts[0]}:</strong>
                    {parts.slice(1).join(':')}
                  </p>
                );
              }
              return <p key={idx}>{clause}</p>;
            })}
            <p className="text-[#00FF88] font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{t.protocol.disclaimer.motto}</p>
          </div>
        </section>
        <LegalAddendum doc="protocol" />
      </div>
    </div>
  );
}
