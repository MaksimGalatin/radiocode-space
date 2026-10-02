'use client';

import React from 'react';
import { useLanguageOptional } from '../../lib/LanguageContext';
import { строкаРеквизитов, type Язык } from '../../lib/requisites';

/**
 * УСЛОВИЯ ОБСЛУЖИВАНИЯ RADIOCODE.SPACE — 02.10.2026.
 *
 * Слово Архитектора: «правила дополни, сделай максимально идеальную юридическую защиту». До этого /terms вёл на
 * пользовательское соглашение, а в нём строка «Условия обслуживания — этот сайт: правила именно aifa.works» —
 * у радио своих правил не было вовсе.
 *
 * Почему без «абсолютного освобождения от ответственности». Суды и законы о защите потребителей (ЕС, США, Эквадор)
 * такие оговорки отбрасывают целиком, и вместе с ними пропадает и разумная защита. Здесь каждое ограничение
 * сделано «в пределах, разрешённых законом», с исключениями, которые закон всё равно не даёт исключить, и с
 * оговоркой о делимости: недействительная часть не тянет за собой остальное. Так защита держится в суде.
 *
 * Что покрыто именно для радио: права на музыку и пределы использования сохранённых треков, запрет Content ID и
 * обучения ИИ, порядок жалоб на нарушение прав, предупреждение о светочувствительной эпилепсии (визуализаторы,
 * мигание) и громкости, сторонние сервисы (Vercel, Cloudflare R2). Применимое право — Республики Эквадор (страна
 * оператора по реквизитам), с сохранением обязательных прав потребителя его страны.
 */

interface Раздел { заголовок: string; абзацы: string[] }
interface Содержимое { title: string; updated: string; intro: string; разделы: Раздел[]; реквизиты: string }

const ПОЧТА = 'contact@codeofdigitaleternity.com';

const CONTENT: Record<Язык, Содержимое> = {
  en: {
    title: 'Terms of Service — RadioCode.Space',
    updated: 'Effective from 2 October 2026',
    intro:
      'These Terms govern your use of radiocode.space (the “Site”), an internet radio that streams original music created by CODE Eternal. By listening, saving or sharing a track, or otherwise using the Site, you accept these Terms. If you do not agree, please do not use the Site.',
    разделы: [
      { заголовок: '1. Who we are', абзацы: [
        'The Site is operated by the person named at the end of these Terms (“we”, “us”). Write to us at ' + ПОЧТА + '. The Site is intended for adults (18+).',
      ] },
      { заголовок: '2. How these Terms relate to our other documents', абзацы: [
        'Your account in the shared CODE Eternal cabinet, the eternal memory, GALATIN points, subscription tiers and the ambassador programme are governed by the User Agreement, which is the same on all four of our sites. Personal data is governed by the Privacy Policy and the Sub-processor Register. Paid professional services are governed by the Public Offer.',
        'These Terms cover what is specific to this Site: listening to, saving and sharing music. If these Terms and the User Agreement differ on a matter specific to the radio, these Terms prevail; on everything else the User Agreement prevails.',
      ] },
      { заголовок: '3. The service', абзацы: [
        'The Site streams stations of original music free of charge and without registration. Signing in is optional and adds features of the shared cabinet. We may add, change or remove stations, tracks and features at any time. We do not promise that any track will stay available or that streaming will be uninterrupted.',
      ] },
      { заголовок: '4. Who owns the music', абзацы: [
        'All tracks, lyrics, cover art, station names, texts, visual design and the software of the Site (the “Content”) were created by or for CODE Eternal, including with generative tools used under paid plans whose terms give the subscriber rights in the output. To the extent intellectual-property rights subsist in the Content, they belong to the operator named below.',
        'Where the law of a country does not recognise copyright in some part of AI-assisted Content, your use of that Content through the Site is still governed by these Terms as a contract. All rights not expressly granted to you are reserved.',
      ] },
      { заголовок: '5. What you may do', абзацы: [
        'We grant you a personal, non-exclusive, non-transferable, revocable, royalty-free licence to: (a) listen to the stations on the Site; (b) save a track with the “Save” button and keep it on your own devices for personal, non-commercial listening; (c) share links to the Site and its tracks, including through the Share menu.',
        'A saved file contains tags with the track title, the attribution “CODE Eternal” and a link to the Site, which may include your referral code. Please keep these tags intact.',
      ] },
      { заголовок: '6. What needs our written permission', абзацы: [
        'Without our prior written permission — write to ' + ПОЧТА + ', we often say yes — you may not: (a) use any Content commercially, including in a shop, café, gym, event, advertisement or any monetised video, stream, podcast or game; (b) broadcast, publicly perform or retransmit the stations or tracks, or make them available on other websites, apps or streaming services; (c) synchronise tracks with video or images for distribution, or distribute remixes, edits or samples; (d) register any Content in Content ID or any similar fingerprinting or rights-management system, or present it as your own; (e) sell, rent, sublicense or otherwise distribute copies of the Content; (f) use the Content to train, fine-tune or evaluate artificial-intelligence models, or include it in datasets.',
      ] },
      { заголовок: '7. Acceptable use', абзацы: [
        'You agree not to: download Content in bulk or with automated tools beyond the Save button; scrape the Site; circumvent, disable or interfere with security features, rate limits or the player; reverse-engineer the Site except where the law expressly allows it; overload the Site or its storage; or use the Site in breach of any law or anyone’s rights. We may block access that breaks this section.',
      ] },
      { заголовок: '8. Health and safety', абзацы: [
        'The Site contains animated visualisers, flashing and glitch effects. If you or anyone watching has photosensitive epilepsy or has ever had seizures, talk to a doctor before use and stop at once if you feel unwell. Keep the volume at a safe level, especially with headphones. Do not let the Site distract you while driving or operating machinery.',
      ] },
      { заголовок: '9. Third-party services', абзацы: [
        'The Site is hosted by Vercel and its music files are delivered from Cloudflare R2. Links may lead to third-party websites such as social networks, Telegram or app stores. We do not control third-party services and are not responsible for their content, availability or practices; their own terms apply to your use of them.',
      ] },
      { заголовок: '10. Copyright complaints', абзацы: [
        'If you believe material on the Site infringes your rights, send a notice to ' + ПОЧТА + ' with: your contact details; identification of your work and of the material, with its address on the Site; a statement that you act in good faith; a statement, under penalty of perjury where the law provides for it, that the information is accurate and that you are the rights holder or authorised to act for them; and your physical or electronic signature.',
        'We review notices promptly and may remove or disable the material. If your material was removed and you believe this was a mistake, you may send a counter-notice with the same details. We may restrict access for repeat infringers.',
      ] },
      { заголовок: '11. No warranties', абзацы: [
        'To the maximum extent permitted by applicable law, the Site and the Content are provided “as is” and “as available”, without warranties of any kind, whether express, implied or statutory, including warranties of merchantability, fitness for a particular purpose, title, non-infringement and uninterrupted or error-free operation. Where the law does not allow some of these exclusions, they apply only to the extent the law allows.',
      ] },
      { заголовок: '12. Limitation of liability', абзацы: [
        'To the maximum extent permitted by applicable law: (a) we are not liable for indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, data or goodwill, arising out of or relating to the Site; (b) our total liability for all claims relating to the Site is limited to the greater of the amount you paid us for access to the Site in the twelve months before the claim (free listening means zero) and 50 US dollars.',
        'Nothing in these Terms excludes or limits liability that the law does not allow to be excluded or limited, including liability for death or personal injury caused by negligence, for fraud, or for wilful misconduct or gross negligence.',
      ] },
      { заголовок: '13. Your responsibility', абзацы: [
        'If you use the Site or the Content in breach of these Terms or the law, you will compensate us, to the extent permitted by law, for reasonable losses and costs, including reasonable legal fees, arising from third-party claims caused by that breach.',
      ] },
      { заголовок: '14. Governing law and disputes', абзацы: [
        'These Terms are governed by the laws of the Republic of Ecuador, without regard to conflict-of-law rules. Before going to court or arbitration, please write to us: most questions are resolved within 30 days. A dispute that is not resolved in that time is settled under the dispute-resolution section of the User Agreement.',
        'If you are a consumer, you keep the protection of the mandatory laws of the country where you live and may bring proceedings in its courts where that law allows. Nothing in these Terms takes those rights away.',
      ] },
      { заголовок: '15. Changes and termination', абзацы: [
        'We may update these Terms; the date at the top shows the current version. We will announce material changes on the Site at least 14 days before they take effect, except changes required by law. Using the Site after that date means you accept the updated Terms. We may suspend or end access for anyone who breaches these Terms. Sections 4, 6 and 10–16 survive the end of your use of the Site.',
      ] },
      { заголовок: '16. General', абзацы: [
        'If any provision of these Terms is held invalid or unenforceable, it is applied to the maximum extent permitted and the other provisions remain in full force. A failure to enforce a provision is not a waiver of it. You may not transfer your rights under these Terms without our consent; we may transfer them to a successor of the Site. These Terms are published in English, Russian, Spanish and Chinese; if the versions differ, the English version prevails unless the law of the consumer’s country requires otherwise.',
      ] },
    ],
    реквизиты: 'Operator',
  },
  ru: {
    title: 'Условия обслуживания — RadioCode.Space',
    updated: 'Действуют с 2 октября 2026 года',
    intro:
      'Эти Условия регулируют пользование сайтом radiocode.space («Сайт») — интернет-радио, на котором звучит оригинальная музыка CODE Eternal. Слушая, сохраняя или передавая трек либо иным образом пользуясь Сайтом, вы принимаете эти Условия. Если вы с ними не согласны, пожалуйста, не пользуйтесь Сайтом.',
    разделы: [
      { заголовок: '1. Кто мы', абзацы: [
        'Сайт ведёт лицо, указанное в конце этих Условий («мы»). Связаться с нами: ' + ПОЧТА + '. Сайт предназначен для совершеннолетних (18+).',
      ] },
      { заголовок: '2. Как эти Условия связаны с другими нашими документами', абзацы: [
        'Учётная запись в общем кабинете CODE Eternal, вечная память, баллы GALATIN, тарифы подписки и амбассадорская программа регулируются Пользовательским соглашением — оно одно на всех четырёх наших сайтах. Персональные данные — Политикой конфиденциальности и Реестром субобработчиков. Платные профессиональные услуги — Публичной офертой.',
        'Эти Условия охватывают то, что относится именно к этому Сайту: прослушивание, сохранение и распространение ссылок на музыку. Если эти Условия и Пользовательское соглашение по вопросу, касающемуся именно радио, расходятся, применяются эти Условия; во всём остальном — Пользовательское соглашение.',
      ] },
      { заголовок: '3. Что делает Сайт', абзацы: [
        'Сайт бесплатно и без регистрации транслирует станции оригинальной музыки. Вход необязателен и добавляет возможности общего кабинета. Мы вправе в любое время добавлять, менять и убирать станции, треки и функции. Мы не обещаем, что какой-либо трек останется доступным или что трансляция будет непрерывной.',
      ] },
      { заголовок: '4. Кому принадлежит музыка', абзацы: [
        'Все треки, тексты песен, обложки, названия станций, тексты, оформление и программное обеспечение Сайта («Материалы») созданы CODE Eternal или для CODE Eternal, в том числе с помощью генеративных инструментов на платных тарифах, условия которых предоставляют подписчику права на результат. В той мере, в какой на Материалы существуют права интеллектуальной собственности, они принадлежат оператору, указанному ниже.',
        'Если закон какой-либо страны не признаёт авторского права на часть Материалов, созданных с участием ИИ, пользование этими Материалами через Сайт всё равно регулируется этими Условиями как договором. Все права, прямо не предоставленные вам, сохраняются за нами.',
      ] },
      { заголовок: '5. Что вам можно', абзацы: [
        'Мы предоставляем вам личную, неисключительную, непередаваемую, отзывную и безвозмездную лицензию: (а) слушать станции на Сайте; (б) сохранять трек кнопкой «Сохранить» и держать его на своих устройствах для личного некоммерческого прослушивания; (в) делиться ссылками на Сайт и его треки, в том числе через меню «Поделиться».',
        'В сохранённом файле записаны метки с названием трека, указанием «CODE Eternal» и ссылкой на Сайт, которая может содержать ваш реферальный код. Пожалуйста, не удаляйте эти метки.',
      ] },
      { заголовок: '6. Что требует нашего письменного разрешения', абзацы: [
        'Без нашего предварительного письменного разрешения — пишите на ' + ПОЧТА + ', мы часто соглашаемся — нельзя: (а) использовать Материалы в коммерческих целях, в том числе в магазине, кафе, спортзале, на мероприятии, в рекламе, в монетизируемом ролике, трансляции, подкасте или игре; (б) транслировать, публично исполнять или ретранслировать станции и треки, размещать их на других сайтах, в приложениях или стриминговых сервисах; (в) соединять треки с видео или изображениями для распространения, распространять ремиксы, нарезки или семплы; (г) регистрировать Материалы в Content ID или аналогичных системах отпечатков и управления правами либо выдавать их за свои; (д) продавать, сдавать в аренду, сублицензировать или иначе распространять копии Материалов; (е) использовать Материалы для обучения, дообучения или оценки моделей искусственного интеллекта либо включать их в наборы данных.',
      ] },
      { заголовок: '7. Допустимое использование', абзацы: [
        'Вы обязуетесь не скачивать Материалы массово или автоматическими средствами помимо кнопки «Сохранить»; не собирать содержимое Сайта роботами; не обходить, не отключать и не нарушать средства защиты, ограничения частоты и работу плеера; не исследовать устройство Сайта путём обратной разработки, кроме случаев, прямо разрешённых законом; не перегружать Сайт и его хранилище; не пользоваться Сайтом в нарушение закона или чужих прав. Доступ, нарушающий этот раздел, мы вправе закрыть.',
      ] },
      { заголовок: '8. Здоровье и безопасность', абзацы: [
        'На Сайте есть анимированные визуализаторы, мигание и эффекты помех. Если у вас или у того, кто смотрит, светочувствительная эпилепсия или когда-либо были судороги, посоветуйтесь с врачом до использования и сразу прекратите, если почувствуете недомогание. Держите громкость на безопасном уровне, особенно в наушниках. Не отвлекайтесь на Сайт за рулём или при работе с механизмами.',
      ] },
      { заголовок: '9. Сторонние сервисы', абзацы: [
        'Сайт размещён на Vercel, музыкальные файлы доставляются из Cloudflare R2. Ссылки могут вести на сторонние сайты: социальные сети, Telegram, магазины приложений. Мы не управляем сторонними сервисами и не отвечаем за их содержимое, доступность и порядки; пользование ими регулируется их собственными условиями.',
      ] },
      { заголовок: '10. Жалобы на нарушение прав', абзацы: [
        'Если вы считаете, что материал на Сайте нарушает ваши права, направьте уведомление на ' + ПОЧТА + ' и укажите: свои контактные данные; ваше произведение и спорный материал с его адресом на Сайте; заявление о том, что вы действуете добросовестно; заявление — под ответственностью за ложные показания, если её предусматривает закон, — что сведения верны и вы правообладатель или уполномочены действовать от его имени; вашу собственноручную или электронную подпись.',
        'Мы рассматриваем уведомления без задержки и можем удалить материал или закрыть к нему доступ. Если ваш материал удалён и вы считаете это ошибкой, вы можете направить встречное уведомление с теми же сведениями. Для повторных нарушителей мы вправе ограничить доступ.',
      ] },
      { заголовок: '11. Отказ от гарантий', абзацы: [
        'В максимальной степени, допускаемой применимым правом, Сайт и Материалы предоставляются «как есть» и «по мере доступности», без каких-либо гарантий — прямых, подразумеваемых или установленных законом, включая гарантии товарной пригодности, пригодности для определённой цели, правового титула, ненарушения прав и бесперебойной или безошибочной работы. Если закон не допускает части этих исключений, они применяются лишь в допускаемой законом мере.',
      ] },
      { заголовок: '12. Ограничение ответственности', абзацы: [
        'В максимальной степени, допускаемой применимым правом: (а) мы не несём ответственности за косвенные, случайные, особые, последующие и штрафные убытки, а также за упущенную выгоду, потерю дохода, данных или деловой репутации, возникшие в связи с Сайтом; (б) наша совокупная ответственность по всем требованиям, связанным с Сайтом, ограничена большей из двух сумм: суммой, уплаченной вами нам за доступ к Сайту за двенадцать месяцев до требования (при бесплатном прослушивании — ноль), и 50 долларами США.',
        'Ничто в этих Условиях не исключает и не ограничивает ответственность, которую закон не позволяет исключать или ограничивать, в том числе за причинение смерти или вреда здоровью по неосторожности, за мошенничество, за умышленное нарушение или грубую неосторожность.',
      ] },
      { заголовок: '13. Ваша ответственность', абзацы: [
        'Если вы используете Сайт или Материалы в нарушение этих Условий или закона, вы возмещаете нам в допускаемой законом мере разумные убытки и расходы, включая разумные расходы на юристов, возникшие из требований третьих лиц, вызванных этим нарушением.',
      ] },
      { заголовок: '14. Применимое право и споры', абзацы: [
        'Эти Условия регулируются правом Республики Эквадор без учёта коллизионных норм. Прежде чем обращаться в суд или арбитраж, пожалуйста, напишите нам: большинство вопросов решается за 30 дней. Спор, не решённый за этот срок, разрешается по разделу о разрешении споров Пользовательского соглашения.',
        'Если вы потребитель, за вами сохраняется защита императивных норм страны вашего проживания и право обращаться в её суды, если этот закон это допускает. Ничто в этих Условиях не лишает вас этих прав.',
      ] },
      { заголовок: '15. Изменения и прекращение', абзацы: [
        'Мы вправе обновлять эти Условия; дата вверху показывает действующую редакцию. О существенных изменениях мы сообщаем на Сайте не менее чем за 14 дней до их вступления в силу, кроме изменений, которых требует закон. Пользование Сайтом после этой даты означает согласие с обновлёнными Условиями. Мы вправе приостановить или прекратить доступ тому, кто нарушает эти Условия. Разделы 4, 6 и 10–16 продолжают действовать и после того, как вы перестали пользоваться Сайтом.',
      ] },
      { заголовок: '16. Общие положения', абзацы: [
        'Если какое-либо положение этих Условий признано недействительным или неисполнимым, оно применяется в максимально допустимой мере, а остальные положения сохраняют полную силу. Неприменение нами какого-либо положения не означает отказа от него. Вы не вправе передавать свои права по этим Условиям без нашего согласия; мы вправе передать их правопреемнику Сайта. Условия опубликованы на английском, русском, испанском и китайском языках; при расхождении редакций преимущество имеет английская, если закон страны потребителя не требует иного.',
      ] },
    ],
    реквизиты: 'Оператор',
  },
  es: {
    title: 'Condiciones del servicio — RadioCode.Space',
    updated: 'Vigentes desde el 2 de octubre de 2026',
    intro:
      'Estas Condiciones regulan el uso de radiocode.space (el «Sitio»), una radio por internet que emite música original creada por CODE Eternal. Al escuchar, guardar o compartir una pista, o al usar el Sitio de cualquier otra forma, usted acepta estas Condiciones. Si no está de acuerdo, le rogamos que no use el Sitio.',
    разделы: [
      { заголовок: '1. Quiénes somos', абзацы: [
        'El Sitio lo gestiona la persona indicada al final de estas Condiciones («nosotros»). Escríbanos a ' + ПОЧТА + '. El Sitio está destinado a personas mayores de edad (18+).',
      ] },
      { заголовок: '2. Relación con nuestros demás documentos', абзацы: [
        'Su cuenta en el panel común de CODE Eternal, la memoria eterna, los puntos GALATIN, los planes de suscripción y el programa de embajadores se rigen por el Acuerdo de usuario, que es el mismo en nuestros cuatro sitios. Los datos personales se rigen por la Política de privacidad y el Registro de subencargados. Los servicios profesionales de pago se rigen por la Oferta pública.',
        'Estas Condiciones cubren lo propio de este Sitio: escuchar, guardar y compartir música. Si estas Condiciones y el Acuerdo de usuario difieren en un asunto propio de la radio, prevalecen estas Condiciones; en todo lo demás prevalece el Acuerdo de usuario.',
      ] },
      { заголовок: '3. El servicio', абзацы: [
        'El Sitio emite emisoras de música original de forma gratuita y sin registro. Iniciar sesión es opcional y añade funciones del panel común. Podemos añadir, cambiar o retirar emisoras, pistas y funciones en cualquier momento. No prometemos que una pista concreta siga disponible ni que la emisión sea ininterrumpida.',
      ] },
      { заголовок: '4. A quién pertenece la música', абзацы: [
        'Todas las pistas, letras, portadas, nombres de emisoras, textos, el diseño visual y el software del Sitio (el «Contenido») fueron creados por CODE Eternal o para CODE Eternal, incluso con herramientas generativas usadas en planes de pago cuyas condiciones otorgan al suscriptor derechos sobre el resultado. En la medida en que existan derechos de propiedad intelectual sobre el Contenido, pertenecen al operador indicado más abajo.',
        'Cuando la ley de un país no reconozca derechos de autor sobre alguna parte del Contenido creado con ayuda de IA, el uso de ese Contenido a través del Sitio sigue rigiéndose por estas Condiciones como contrato. Nos reservamos todos los derechos que no se le concedan expresamente.',
      ] },
      { заголовок: '5. Lo que usted puede hacer', абзацы: [
        'Le concedemos una licencia personal, no exclusiva, intransferible, revocable y gratuita para: (a) escuchar las emisoras en el Sitio; (b) guardar una pista con el botón «Guardar» y conservarla en sus propios dispositivos para escucharla de forma personal y no comercial; (c) compartir enlaces al Sitio y a sus pistas, también mediante el menú «Compartir».',
        'El archivo guardado contiene etiquetas con el título de la pista, la atribución «CODE Eternal» y un enlace al Sitio, que puede incluir su código de referido. Le rogamos que no elimine estas etiquetas.',
      ] },
      { заголовок: '6. Lo que requiere nuestro permiso por escrito', абзацы: [
        'Sin nuestro permiso previo por escrito —escriba a ' + ПОЧТА + ', a menudo decimos que sí— no puede: (a) usar el Contenido con fines comerciales, incluso en una tienda, cafetería, gimnasio, evento, anuncio o en cualquier vídeo, emisión, pódcast o juego monetizado; (b) emitir, ejecutar públicamente o retransmitir las emisoras o pistas, ni ponerlas a disposición en otros sitios web, aplicaciones o servicios de streaming; (c) sincronizar pistas con vídeo o imágenes para su distribución, ni distribuir remezclas, cortes o samples; (d) registrar el Contenido en Content ID o en sistemas similares de huellas o gestión de derechos, ni presentarlo como propio; (e) vender, alquilar, sublicenciar o distribuir de otro modo copias del Contenido; (f) usar el Contenido para entrenar, ajustar o evaluar modelos de inteligencia artificial, ni incluirlo en conjuntos de datos.',
      ] },
      { заголовок: '7. Uso aceptable', абзацы: [
        'Usted se compromete a no descargar el Contenido de forma masiva o con herramientas automáticas más allá del botón «Guardar»; no extraer contenido del Sitio con robots; no eludir, desactivar ni interferir con las medidas de seguridad, los límites de frecuencia o el reproductor; no aplicar ingeniería inversa al Sitio salvo cuando la ley lo permita expresamente; no sobrecargar el Sitio ni su almacenamiento; y no usar el Sitio infringiendo la ley o derechos ajenos. Podemos bloquear el acceso que incumpla esta sección.',
      ] },
      { заголовок: '8. Salud y seguridad', абзацы: [
        'El Sitio contiene visualizadores animados, destellos y efectos de interferencia. Si usted o quien mire padece epilepsia fotosensible o ha tenido convulsiones, consulte a un médico antes de usarlo y deténgase de inmediato si se siente mal. Mantenga el volumen a un nivel seguro, sobre todo con auriculares. No deje que el Sitio le distraiga mientras conduce o maneja maquinaria.',
      ] },
      { заголовок: '9. Servicios de terceros', абзацы: [
        'El Sitio está alojado en Vercel y sus archivos de música se entregan desde Cloudflare R2. Los enlaces pueden llevar a sitios de terceros, como redes sociales, Telegram o tiendas de aplicaciones. No controlamos los servicios de terceros ni respondemos de su contenido, disponibilidad o prácticas; su uso se rige por sus propias condiciones.',
      ] },
      { заголовок: '10. Reclamaciones por derechos de autor', абзацы: [
        'Si considera que algún material del Sitio infringe sus derechos, envíe una notificación a ' + ПОЧТА + ' con: sus datos de contacto; la identificación de su obra y del material, con su dirección en el Sitio; una declaración de que actúa de buena fe; una declaración, bajo pena de perjurio cuando la ley lo prevea, de que la información es exacta y de que es usted el titular de los derechos o está autorizado a actuar en su nombre; y su firma física o electrónica.',
        'Revisamos las notificaciones sin demora y podemos retirar el material o desactivar el acceso a él. Si su material fue retirado y cree que fue un error, puede enviar una contranotificación con los mismos datos. Podemos restringir el acceso a los infractores reincidentes.',
      ] },
      { заголовок: '11. Ausencia de garantías', абзацы: [
        'En la máxima medida permitida por la ley aplicable, el Sitio y el Contenido se ofrecen «tal cual» y «según disponibilidad», sin garantías de ningún tipo, expresas, implícitas o legales, incluidas las de comerciabilidad, idoneidad para un fin concreto, titularidad, no infracción y funcionamiento ininterrumpido o sin errores. Cuando la ley no permita alguna de estas exclusiones, se aplicarán solo en la medida en que la ley lo permita.',
      ] },
      { заголовок: '12. Limitación de responsabilidad', абзацы: [
        'En la máxima medida permitida por la ley aplicable: (a) no respondemos de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni del lucro cesante, la pérdida de ingresos, datos o reputación derivados del Sitio o relacionados con él; (b) nuestra responsabilidad total por todas las reclamaciones relacionadas con el Sitio se limita a la mayor de estas dos cantidades: lo que usted nos haya pagado por el acceso al Sitio en los doce meses anteriores a la reclamación (escuchar gratis equivale a cero) o 50 dólares estadounidenses.',
        'Nada en estas Condiciones excluye ni limita la responsabilidad que la ley no permite excluir ni limitar, incluida la responsabilidad por muerte o lesiones personales causadas por negligencia, por fraude, por dolo o por negligencia grave.',
      ] },
      { заголовок: '13. Su responsabilidad', абзацы: [
        'Si usa el Sitio o el Contenido infringiendo estas Condiciones o la ley, nos compensará, en la medida permitida por la ley, por las pérdidas y costes razonables, incluidos honorarios jurídicos razonables, derivados de reclamaciones de terceros causadas por esa infracción.',
      ] },
      { заголовок: '14. Ley aplicable y controversias', абзацы: [
        'Estas Condiciones se rigen por las leyes de la República del Ecuador, sin tener en cuenta sus normas de conflicto. Antes de acudir a los tribunales o al arbitraje, le rogamos que nos escriba: la mayoría de las cuestiones se resuelven en 30 días. Una controversia no resuelta en ese plazo se resuelve conforme a la sección de resolución de controversias del Acuerdo de usuario.',
        'Si usted es consumidor, conserva la protección de las normas imperativas del país donde reside y puede acudir a sus tribunales cuando esa ley lo permita. Nada en estas Condiciones le priva de esos derechos.',
      ] },
      { заголовок: '15. Cambios y terminación', абзацы: [
        'Podemos actualizar estas Condiciones; la fecha de arriba indica la versión vigente. Anunciaremos los cambios sustanciales en el Sitio al menos 14 días antes de su entrada en vigor, salvo los cambios que exija la ley. Usar el Sitio después de esa fecha supone aceptar las Condiciones actualizadas. Podemos suspender o terminar el acceso de quien incumpla estas Condiciones. Las secciones 4, 6 y 10–16 siguen vigentes después de que deje de usar el Sitio.',
      ] },
      { заголовок: '16. Disposiciones generales', абзацы: [
        'Si alguna disposición de estas Condiciones se declara inválida o inaplicable, se aplicará en la máxima medida permitida y las demás disposiciones conservarán plena vigencia. No hacer valer una disposición no supone renunciar a ella. Usted no puede ceder sus derechos derivados de estas Condiciones sin nuestro consentimiento; nosotros podemos cederlos a un sucesor del Sitio. Estas Condiciones se publican en inglés, ruso, español y chino; si las versiones difieren, prevalece la inglesa salvo que la ley del país del consumidor exija otra cosa.',
      ] },
    ],
    реквизиты: 'Operador',
  },
  zh: {
    title: '服务条款 —— RadioCode.Space',
    updated: '自 2026 年 10 月 2 日起生效',
    intro:
      '本条款适用于您对 radiocode.space（下称“本网站”）的使用。本网站是一家网络电台，播放 CODE Eternal 创作的原创音乐。您收听、保存或分享曲目，或以其他方式使用本网站，即表示接受本条款。如您不同意，请勿使用本网站。',
    разделы: [
      { заголовок: '1. 我们是谁', абзацы: [
        '本网站由本条款末尾列明的人士运营（下称“我们”）。联系邮箱：' + ПОЧТА + '。本网站面向成年人（18 岁以上）。',
      ] },
      { заголовок: '2. 本条款与我们其他文件的关系', абзацы: [
        '您在 CODE Eternal 共享个人面板中的账户、永久记忆、GALATIN 积分、订阅套餐和大使计划适用《用户协议》，该协议在我们的四个网站上完全相同。个人数据适用《隐私政策》和《分处理者登记册》。付费专业服务适用《公开要约》。',
        '本条款涵盖本网站特有的事项：收听、保存和分享音乐。如本条款与《用户协议》在电台特有事项上存在差异，以本条款为准；其他事项以《用户协议》为准。',
      ] },
      { заголовок: '3. 服务内容', абзацы: [
        '本网站免费播放原创音乐电台，无需注册。登录为可选项，可使用共享个人面板的功能。我们可随时增加、更改或移除电台、曲目和功能。我们不保证任何曲目持续可用，也不保证播放不中断。',
      ] },
      { заголовок: '4. 音乐的权利归属', абзацы: [
        '本网站的全部曲目、歌词、封面、电台名称、文字、视觉设计和软件（下称“内容”）均由 CODE Eternal 或为 CODE Eternal 创作，其中包括借助付费套餐下的生成式工具创作，相关套餐条款授予订阅者对生成结果的权利。在内容存在知识产权的范围内，该等权利归下文所列运营者所有。',
        '如某一国家的法律不承认借助人工智能创作的部分内容享有著作权，您通过本网站使用该等内容仍须作为合同遵守本条款。未明确授予您的一切权利均予保留。',
      ] },
      { заголовок: '5. 您可以做什么', абзацы: [
        '我们授予您一项个人的、非独占的、不可转让的、可撤销的免费许可，允许您：(a) 在本网站收听各电台；(b) 通过“保存”按钮保存曲目，并保存在您自己的设备上，仅供个人非商业收听；(c) 分享本网站及其曲目的链接，包括通过“分享”菜单分享。',
        '保存的文件中带有标签，包含曲目名称、署名“CODE Eternal”以及指向本网站的链接（可能包含您的推荐码）。请保留这些标签。',
      ] },
      { заголовок: '6. 需要我们书面许可的事项', абзацы: [
        '未经我们事先书面许可（请发邮件至 ' + ПОЧТА + '，我们通常会同意），您不得：(a) 将任何内容用于商业用途，包括在商店、咖啡馆、健身房、活动、广告或任何获利的视频、直播、播客或游戏中使用；(b) 广播、公开表演或转播电台或曲目，或在其他网站、应用或流媒体服务上提供；(c) 将曲目与视频或图像同步后发布，或发布混音、剪辑或采样；(d) 在 Content ID 或任何类似的指纹识别或版权管理系统中登记任何内容，或将其冒充为您自己的作品；(e) 出售、出租、再许可或以其他方式分发内容的副本；(f) 将内容用于训练、微调或评估人工智能模型，或将其纳入数据集。',
      ] },
      { заголовок: '7. 可接受的使用方式', абзацы: [
        '您同意不：在“保存”按钮之外批量或以自动化工具下载内容；以爬虫抓取本网站；规避、禁用或干扰安全功能、频率限制或播放器；对本网站进行逆向工程（法律明确允许的情形除外）；使本网站或其存储过载；或违反法律或侵犯他人权利使用本网站。对于违反本条的访问，我们可予以封禁。',
      ] },
      { заголовок: '8. 健康与安全', абзацы: [
        '本网站包含动态可视化效果、闪烁和故障特效。如您或观看者患有光敏性癫痫或曾有癫痫发作史，请在使用前咨询医生；如感到不适，请立即停止。请将音量保持在安全水平，佩戴耳机时尤其如此。驾驶或操作机械时，请勿因本网站分心。',
      ] },
      { заголовок: '9. 第三方服务', абзацы: [
        '本网站托管于 Vercel，音乐文件由 Cloudflare R2 提供。链接可能指向第三方网站，例如社交网络、Telegram 或应用商店。我们不控制第三方服务，也不对其内容、可用性或做法负责；您对其的使用适用其自身条款。',
      ] },
      { заголовок: '10. 版权投诉', абзацы: [
        '如您认为本网站上的材料侵犯了您的权利，请发送通知至 ' + ПОЧТА + '，并写明：您的联系方式；您的作品以及涉嫌侵权材料（附其在本网站上的地址）；声明您出于善意；在法律有规定时承担伪证责任的声明，确认所述信息准确，且您是权利人或获授权代表权利人行事；以及您的亲笔签名或电子签名。',
        '我们会及时审查通知，并可删除相关材料或禁止访问。如您的材料被删除而您认为属于错误，您可提交载有相同信息的反通知。对于反复侵权者，我们可限制其访问。',
      ] },
      { заголовок: '11. 免责声明', абзацы: [
        '在适用法律允许的最大范围内，本网站和内容按“现状”及“现有”基础提供，不附带任何明示、默示或法定的保证，包括适销性、特定用途适用性、所有权、不侵权以及不间断或无错误运行的保证。如法律不允许排除其中部分保证，则相关排除仅在法律允许的范围内适用。',
      ] },
      { заголовок: '12. 责任限制', абзацы: [
        '在适用法律允许的最大范围内：(a) 对于因本网站引起或与之相关的间接、附带、特殊、后果性或惩罚性损害，以及利润、收入、数据或商誉的损失，我们不承担责任；(b) 我们对与本网站相关的全部索赔的累计责任，以以下两者中的较高者为限：您在索赔前十二个月内为访问本网站向我们支付的金额（免费收听即为零），或 50 美元。',
        '本条款中的任何内容均不排除或限制法律不允许排除或限制的责任，包括因过失造成死亡或人身伤害的责任、欺诈责任、故意不当行为或重大过失的责任。',
      ] },
      { заголовок: '13. 您的责任', абзацы: [
        '如您违反本条款或法律使用本网站或内容，您应在法律允许的范围内，赔偿我们因该违约行为引起的第三方索赔所产生的合理损失和费用，包括合理的律师费。',
      ] },
      { заголовок: '14. 适用法律与争议解决', абзацы: [
        '本条款受厄瓜多尔共和国法律管辖，不适用其冲突法规则。在诉诸法院或仲裁之前，请先写信给我们：大多数问题可在 30 天内解决。在此期限内未能解决的争议，依照《用户协议》的争议解决条款处理。',
        '如您是消费者，您仍享有居住国强制性法律的保护，并可在该法律允许的情况下向其法院提起诉讼。本条款的任何内容均不剥夺您的这些权利。',
      ] },
      { заголовок: '15. 变更与终止', абзацы: [
        '我们可更新本条款；页面顶部的日期即为现行版本。对于实质性变更，我们将在生效前至少 14 天在本网站公布，法律要求的变更除外。在该日期之后继续使用本网站，即表示您接受更新后的条款。对于违反本条款者，我们可暂停或终止其访问。第 4、6 条及第 10 至 16 条在您停止使用本网站后继续有效。',
      ] },
      { заголовок: '16. 一般条款', абзацы: [
        '如本条款的任何规定被认定无效或不可执行，该规定将在允许的最大范围内适用，其余规定继续完全有效。我们未执行某项规定不构成放弃该规定。未经我们同意，您不得转让您在本条款下的权利；我们可将其转让给本网站的继受者。本条款以英文、俄文、西班牙文和中文发布；如各版本不一致，以英文版本为准，但消费者所在国法律另有规定的除外。',
      ] },
    ],
    реквизиты: '运营者',
  },
};

export default function TermsClient({ языкИзПути }: { языкИзПути?: string }) {
  // Язык из пути передаётся пропом с сервера: клиентский контекст на этом сайте стартует с английского,
  // и без пропа ru/es/zh-версии отдавали бы английский текст (та же правка, что у реестра субобработчиков).
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  const изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  const язык = ((изПути || locale) in CONTENT ? (изПути || locale) : 'en') as Язык;
  const c = CONTENT[язык];

  return (
    <div className="keep-dark min-h-screen bg-[#050505] text-gray-200">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{c.title}</h1>
        <p className="mt-2 text-sm text-gray-400">{c.updated}</p>
        <p className="mt-6 text-base leading-relaxed text-gray-300">{c.intro}</p>
        {c.разделы.map((р) => (
          <section key={р.заголовок} className="mt-10">
            <h2 className="text-xl font-semibold text-white">{р.заголовок}</h2>
            {р.абзацы.map((а, i) => (
              <p key={i} className="mt-3 text-base leading-relaxed text-gray-300">{а}</p>
            ))}
          </section>
        ))}
        <section className="mt-12 border-t border-white/10 pt-6">
          <h2 className="text-base font-semibold text-white">{c.реквизиты}</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{строкаРеквизитов(язык)}</p>
        </section>
      </div>
    </div>
  );
}
