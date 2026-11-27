/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Check, SquarePlay, X } from 'lucide-react';
import lp2Image from '../LP2-1.png';
import tokuten1Image from '../tokuten1.png';
import tokuten2Image from '../tokuten2.png';
import tokuten3Image from '../tokuten3.png';
import tokuten4Image from '../tokuten4.png';

type FooterLinkKey =
  | 'privacy'
  | 'tokushoho'
  | 'terms'
  | 'contact'
  | null;

const CURRICULUM_ITEMS = [
  '✔︎「今の技術のまま」で勝率を跳ね上げる方法',
  '✔︎パニックを防ぐ「大人のカンニングペーパー」の作り方',
  '✔︎テニスエリートを実力でねじ伏せる「戦術設計」',
  '✔︎相手のバック攻めから一球で抜け出す配球術',
  '✔︎軟式出身のメリットを最大に活かす攻撃パターン',
  '✔︎頭では分かっていても試合でできない理由',
  '✔︎相手が回り込んでフォアを打ってきた時、あなたがすること',
  '✔︎YouTubeでプロのレッスンを見ても勝てるようにならない一番の理由',
  '✔︎40代以上の方だからこそ、急激に勝てるようになる訳',
  '✔︎練習時間の短さをカバーするために今日からできる簡単な方法',
  '✔︎試合で勝つために知っておくべき、たった5つのショット',
] as const;

const BONUS_ITEMS = [
  {
    prefix: '特典1',
    body: '初対戦の相手から“無意識のクセ”を読み取る！『情報収集術』',
    image: tokuten1Image,
    imageWidthClass: 'w-40 sm:w-60 md:w-64 lg:w-[280px] ml-4 sm:ml-10 md:ml-14',
    iconType: 'book' as const,
    description:
      '試合前の「5分間のアップ」だけで、\n相手の最大の弱点や「困った時に\nどこに逃げるか」を見抜く3つの\nテクニックを公開。\n\n試合開始のコールが鳴る前から、\nあなたが相手をコントロー側に回れます。',
    highlight: '「困った時に\nどこに逃げるか」を見抜く3つの\nテクニック',
  },
  {
    prefix: '特典2',
    body: '【動画で解説】緊張の正体を知って試合に勝つメンタル攻略法',
    image: tokuten2Image,
    imageWidthClass: 'w-[52%] sm:w-[58%] md:w-[520px] lg:w-[600px]',
    iconType: 'video' as const,
    description:
      '試合になると、「チキり」や「パニック」を根結するための特別動画です。緊張のメカニズムを科学的に理解することで、プレッシャーのかかる場面でも練習通りにポイントを取り切る「ブレないメンタル」が手に入ります。',
    highlight: '練習通りにポイントを取り切る',
  },
  {
    prefix: '特典3',
    body: '【コピペでOK】あなた専用の『勝ち筋』をAIが自動作成！秘密のAI指示書',
    image: tokuten3Image,
    imageWidthClass: 'w-40 sm:w-60 md:w-64 lg:w-[280px] ml-4 sm:ml-10 md:ml-14',
  },
  {
    prefix: '特典4',
    body: '【迷いが消える】ダブルスで勝つための『試合前3分チェックリスト』',
    image: tokuten4Image,
    imageWidthClass: 'w-full sm:w-[82%] md:w-[520px] lg:w-[600px]',
  },
] as const;

const ACHIEVEMENTS = [
  { year: '2021年', title: '静岡県シングルス40歳以上優勝' },
  { year: '2022年', title: '浜松市スポーツ祭45歳以上優勝' },
  { year: '2022年', title: '中遠シングルス45歳以上優勝' },
  { year: '2023年', title: '静岡県シングルス45歳以上優勝' },
  { year: '2023年', title: 'ダンロップダブルス静岡県45歳以上優勝' },
  { year: '2023年', title: 'ダンロップダブルス静岡県代表' },
  { year: '2023年', title: 'ダンロップダブルス45歳以上東海大会3位' },
  { year: '2023年', title: '宮城県民体育大会シングルス45歳以上優勝' },
  { year: '2024年', title: '静岡県シングルス45歳以上優勝' },
  { year: '2024年', title: '静岡トーナメント45歳以上優勝' },
  { year: '2024年', title: '遠州シングルス45歳以上優勝' },
  { year: '2024年', title: '静岡県クラブ対抗中部大会45歳以上優勝' },
  { year: '2024年', title: '静岡県クラブ対抗45歳以上優勝' },
  { year: '2024年', title: '中遠ダブルス45歳以上優勝' },
  { year: '2024年', title: '宮城県民体育大会シングルス45歳以上優勝' },
  { year: '2025年', title: '静岡県シングルス45歳以上優勝' },
  { year: '2025年', title: 'NWTCダブルス45歳以上優勝' },
  { year: '2025年', title: '静岡県クラブ対抗中部大会45歳以上優勝' },
  { year: '2025年', title: '遠州ミックス40歳以上優勝' },
  { year: '2025年', title: '初生シングルス45歳以上優勝' },
  { year: '2025年', title: '新日本スポーツ連盟45歳以上静岡県代表' },
  { year: '2025年', title: '新日本スポーツ連盟45歳以上全国大会ベスト8' },
  { year: '2026年', title: '静岡県シングルス35歳以上優勝' },
  { year: '2026年', title: '新日本スポーツ連盟45歳以上静岡県代表' },
  { year: '2026年', title: '静岡県クラブ対抗中部大会45歳以上優勝' },
  { year: '2026年', title: '掛川市ダブルス45歳以上優勝' },
] as const;

interface OptInFormProps {
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function OptInForm({ id, inputRef }: OptInFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setError(true);
      return;
    }
    setError(false);
    setSubmittedEmail(trimmed);
    setEmail('');
  };

  if (submittedEmail) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full bg-[#F5F5F7] rounded-[24px] px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="w-9 h-9 rounded-full bg-[#0071E3] text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </span>
          <p className="text-sm sm:text-base font-medium text-[#1D1D1F] truncate">
            {submittedEmail}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmittedEmail(null)}
          aria-label="閉じる"
          className="w-9 h-9 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div
        className={`flex items-center bg-[#F5F5F7] rounded-full p-2 pl-6 sm:pl-7 transition-shadow duration-150 focus-within:ring-2 ${
          error ? 'ring-2 ring-[#FF3B30] focus-within:ring-[#FF3B30]' : 'focus-within:ring-[#0071E3]'
        }`}
      >
        <label htmlFor={id} className="sr-only">
          メールアドレス
        </label>
        <input
          ref={inputRef}
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(false);
          }}
          placeholder="メールアドレス"
          className="w-full bg-transparent text-base sm:text-[17px] text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none min-w-0 py-2.5"
        />
        <button
          type="submit"
          aria-label="メールアドレス"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.25]" />
        </button>
      </div>
    </form>
  );
}

const MODAL_TITLES: Record<Exclude<FooterLinkKey, null>, string> = {
  privacy: 'プライバシーポリシー',
  tokushoho: '特定商取引法に基づく表記',
  terms: '利用規約',
  contact: 'お問い合わせ',
};

export default function App() {
  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const middleInputRef = useRef<HTMLInputElement | null>(null);
  const bottomInputRef = useRef<HTMLInputElement | null>(null);
  const [activeModal, setActiveModal] = useState<FooterLinkKey>(null);

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal]);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      <main>
        {/* 1. Hero Section */}
        <section className="pt-20 pb-24 sm:pt-28 sm:pb-36 md:pt-36 md:pb-44 px-6">
          <div className="max-w-[980px] mx-auto text-center">
            <p className="text-base sm:text-xl font-semibold text-black tracking-tight">
              本気で試合に勝ちたい40代以上のあなたへ
            </p>

            <p className="mt-8 sm:mt-10 text-sm sm:text-base font-medium text-black tracking-tight">
              ✔︎ 実績なし　✔︎ キャリアなし　✔︎ 練習時間なし
            </p>

            <p className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-[-0.025em] leading-[1.2] text-balance">
              「今の技術のまま」テニスエリートに勝つ
            </p>

            <div className="mt-16 sm:mt-24 space-y-3 sm:space-y-4">
              <p className="text-lg sm:text-2xl font-semibold text-black tracking-tight">
                県大会1回戦負け
              </p>
              <p className="text-xl sm:text-2xl font-medium text-black" aria-hidden="true">
                ↓
              </p>
              <p className="text-3xl sm:text-5xl md:text-[56px] font-black text-black tracking-[-0.03em] leading-[1.12] tabular-nums text-balance">
                5年で優勝19回を実現した
              </p>
            </div>

            <div className="mt-12 sm:mt-16">
              <h1 className="text-4xl sm:text-7xl md:text-[84px] font-black text-black tracking-[-0.04em] leading-[1.06] text-balance">
                大人のテニスIQ戦略
              </h1>
              <p className="mt-5 sm:mt-7 text-xl sm:text-3xl md:text-[34px] font-bold text-black tracking-[-0.02em]">
                【無料】動画プログラム
              </p>
            </div>

            <div className="mt-12 sm:mt-16 space-y-2 text-sm sm:text-base font-semibold text-black">
              <p>期間限定公開</p>
              <p>
                〇月〇日（〇）まで
                <br />
                4大特典プレゼント中
              </p>
            </div>

            <div className="mt-14 sm:mt-20 max-w-[560px] mx-auto">
              <button
                type="button"
                onClick={() => heroInputRef.current?.focus()}
                className="text-base sm:text-lg font-bold text-black hover:text-[#0071E3] transition-colors mb-5 inline-block cursor-pointer"
              >
                ＼今すぐ無料動画プログラムと4大特典を受け取る／
              </button>
              <OptInForm id="email-hero" inputRef={heroInputRef} />
            </div>
          </div>
        </section>

        {/* 2. Curriculum Section */}
        <section className="py-24 sm:py-36 md:py-44 px-6">
          <div className="max-w-[980px] mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-[64px] font-black text-black tracking-[-0.035em] leading-[1.1]">
              無料動画プログラムで
              <br />
              手に入るもの
            </h2>

            <div className="mt-12 sm:mt-16 max-w-[780px] mx-auto">
              <img
                src={lp2Image}
                alt="無料動画プログラムで手に入るもの"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
            </div>

            <div className="mt-14 sm:mt-20 grid grid-cols-1 gap-4 sm:gap-5">
              {CURRICULUM_ITEMS.map((item) => (
                <div
                  key={item}
                  className="bg-[#F5F5F7] rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 md:px-11 md:py-8 flex items-center"
                >
                  <p className="text-base sm:text-lg md:text-xl font-bold text-[#1D1D1F] tracking-[-0.015em] leading-[1.5]">
                    <span className="text-[#D70015]">✔︎</span>{' '}
                    {item.slice('✔︎'.length)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Bonuses & Middle CTA Section */}
        <section className="py-24 sm:py-36 md:py-44 px-6">
          <div className="max-w-[980px] mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-[56px] font-black text-black tracking-[-0.035em] leading-[1.14]">
              〇月〇日（〇）まで
              <br />
              4大特典プレゼント中
            </h2>

            <div className="mt-14 sm:mt-20 bg-white space-y-16 sm:space-y-24 md:space-y-28">
              {BONUS_ITEMS.map((bonus) => (
                <div
                  key={bonus.prefix}
                  className="bg-white py-2 sm:py-3 flex flex-col items-start gap-6 sm:gap-8"
                >
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-3xl sm:text-4xl md:text-[42px] font-black leading-[1.15] tracking-[-0.03em] text-[#0071E3]">
                      {bonus.prefix}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-[28px] font-bold leading-[1.45] tracking-[-0.02em] text-[#1D1D1F]">
                      {bonus.body}
                    </p>
                  </div>
                  {'image' in bonus && bonus.image && (
                    <div className="w-full flex flex-row items-center gap-4 sm:gap-8 md:gap-10">
                      <div className={`${bonus.imageWidthClass} shrink-0`}>
                        <img
                          src={bonus.image}
                          alt={`${bonus.prefix}${bonus.body}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block"
                        />
                      </div>
                      {'description' in bonus && bonus.description && (
                        <div className="space-y-3 sm:space-y-4">
                          {'iconType' in bonus && bonus.iconType === 'book' && (
                            <BookOpen
                              aria-hidden="true"
                              className="w-9 h-9 sm:w-11 sm:h-11 text-[#248A3D] stroke-[1.75]"
                            />
                          )}
                          {'iconType' in bonus && bonus.iconType === 'video' && (
                            <SquarePlay
                              aria-hidden="true"
                              className="w-9 h-9 sm:w-11 sm:h-11 text-[#D70015] stroke-[1.75]"
                            />
                          )}
                          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-[15px] font-normal text-[#6E6E73] leading-[1.8]">
                            {bonus.description.split('\n\n').map((paragraph, index) => {
                              const highlight = 'highlight' in bonus ? bonus.highlight : undefined;
                              if (highlight && paragraph.includes(highlight)) {
                                const [before, after] = paragraph.split(highlight);
                                return (
                                  <p key={index} className="whitespace-pre-line">
                                    {before}
                                    <strong className="font-bold text-black">{highlight}</strong>
                                    {after}
                                  </p>
                                );
                              }
                              return (
                                <p key={index} className="whitespace-pre-line">
                                  {paragraph}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-24 sm:mt-36 max-w-[680px] mx-auto text-center">
              <p className="text-base sm:text-xl font-semibold text-black tracking-tight tabular-nums">
                県大会1回戦負け→5年で優勝19回を実現した
              </p>
              <button
                type="button"
                onClick={() => middleInputRef.current?.focus()}
                className="mt-4 text-3xl sm:text-5xl font-black text-black tracking-[-0.03em] leading-[1.15] hover:text-[#0071E3] transition-colors cursor-pointer text-balance"
              >
                動画プログラムを“無料で”受け取る
              </button>
              <div className="mt-10 sm:mt-12 max-w-[540px] mx-auto">
                <OptInForm id="email-middle" inputRef={middleInputRef} />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Instructor Profile Section */}
        <section className="py-24 sm:py-36 md:py-44 px-6">
          <div className="max-w-[980px] mx-auto">
            <p className="text-sm sm:text-base font-bold text-black tracking-wide">
              講師プロフィール
            </p>
            <h2 className="mt-4 text-3xl sm:text-5xl md:text-[64px] font-black text-black tracking-[-0.035em] leading-[1.1]">
              長谷川 誠（49歳）
            </h2>

            <div className="mt-12 sm:mt-16 bg-[#F5F5F7] rounded-[28px] sm:rounded-[32px] p-8 sm:p-14 md:p-16 space-y-7 sm:space-y-8">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#1D1D1F] leading-[1.65] tracking-[-0.015em]">
                軟式上がり・片手バックハンド・社会人になってからは「週1練習」の、どこにでもいる普通のおじさんプレーヤー。
              </p>
              <p className="text-base sm:text-lg text-[#424245] leading-[1.85]">
                2019年の県シングルス1回戦、前年チャンピオンのテニスコーチ相手に、ギャラリーの前で惨めなボロ負けをしたことをきっかけに、見栄やプライドを捨てて【テニスIQ】を徹底的に磨く。
              </p>
              <p className="text-base sm:text-lg text-[#424245] leading-[1.85]">
                その結果、プレースタイルを変えたり、新しい技術を身につけたりすることなく、相手のミスを引き出す「大人のズルい戦い方」だけで、44歳を過ぎてから急にベテランの県チャンピオンに。
              </p>
            </div>
          </div>
        </section>

        {/* 5. Track Record Section */}
        <section className="py-24 sm:py-36 md:py-44 px-6">
          <div className="max-w-[980px] mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-[64px] font-black text-black tracking-[-0.035em] leading-[1.1]">
              これまでの実績
            </h2>

            <div className="mt-12 sm:mt-16 space-y-3">
              <p className="text-base sm:text-xl font-bold text-[#6E6E73] tabular-nums">
                2019年静岡県シングルス40歳以上1回戦負け
              </p>
              <p className="text-lg sm:text-xl font-medium text-[#86868B] pl-2" aria-hidden="true">
                ↓
              </p>
            </div>

            <ul className="mt-8 sm:mt-10 border-t border-b border-[#E5E5EA] divide-y divide-[#E5E5EA]">
              {ACHIEVEMENTS.map((item, idx) => (
                <li
                  key={`${item.year}-${item.title}-${idx}`}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#6E6E73] tabular-nums shrink-0">
                    {item.year}
                  </span>
                  <span className="sr-only"> </span>
                  <span className="text-base sm:text-lg font-bold text-[#1D1D1F] tracking-[-0.01em]">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Final CTA Section */}
        <section className="py-24 sm:py-36 md:py-44 px-6">
          <div className="max-w-[680px] mx-auto text-center">
            <p className="text-base sm:text-xl font-semibold text-black tracking-tight tabular-nums">
              県大会1回戦負け→5年で優勝19回を実現した
            </p>
            <button
              type="button"
              onClick={() => bottomInputRef.current?.focus()}
              className="mt-4 text-3xl sm:text-5xl font-black text-black tracking-[-0.03em] leading-[1.15] hover:text-[#0071E3] transition-colors cursor-pointer text-balance"
            >
              動画プログラムを“無料で”受け取る
            </button>
            <div className="mt-10 sm:mt-12 max-w-[540px] mx-auto">
              <OptInForm id="email-bottom" inputRef={bottomInputRef} />
            </div>
          </div>
        </section>
      </main>

      {/* 7. Quiet Footer */}
      <footer className="bg-[#F5F5F7] py-3 px-6">
        <div className="max-w-[980px] mx-auto flex flex-col items-center gap-1.5">
          <nav
            aria-label="法的情報およびお問い合わせ"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] font-medium text-[#6E6E73]"
          >
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-0.5"
            >
              プライバシーポリシー
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('tokushoho')}
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-0.5"
            >
              特定商取引法に基づく表記
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-0.5"
            >
              利用規約
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('contact')}
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-0.5"
            >
              お問い合わせ
            </button>
          </nav>
          <p className="text-center text-[11px] text-[#86868B] whitespace-nowrap">
            © 大人のテニスIQ戦略 All Rights Reserved.
          </p>
        </div>
      </footer>

      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-[28px] max-w-lg w-full p-8 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="modal-title" className="text-xl font-bold text-[#1D1D1F]">
                {MODAL_TITLES[activeModal]}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="閉じる"
                className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-6 text-sm text-[#6E6E73] leading-relaxed">
              <p>
                {MODAL_TITLES[activeModal]}については、各種お手続きおよびご案内メールに記載の窓口にてご確認いただけます。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
