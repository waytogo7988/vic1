import React, { useState } from 'react';
import { Plan, PlanId } from '../types';
import { PLANS } from '../data/plans';
import { REVIEWS, PROCESS_STEPS, FAQS } from '../data/reviews';
import {
  Sparkles,
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Star,
  Quote,
  Layers,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  Heart,
  ChevronDown,
  Info,
} from 'lucide-react';

interface MainScreenProps {
  onSelectPlan: (planId: PlanId) => void;
  onRequestConsultation: (planId?: PlanId) => void;
  onOpenOnboardingStory: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  onSelectPlan,
  onRequestConsultation,
  onOpenOnboardingStory,
}) => {
  const [activePlanPreview, setActivePlanPreview] = useState<PlanId>('masterpiece');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Selected plan data for the interactive web preview tab
  const previewPlan = PLANS.find((p) => p.id === activePlanPreview) || PLANS[1];

  // Gallery images for the preview
  const galleryImages = [
    {
      url: previewPlan.coverImage,
      caption: `${previewPlan.name} 실물 하드커버 양장 표지`,
      desc: '친환경 수입 패브릭 지와 프리미엄 무광 코팅으로 수십 년간 변색 없이 보관됩니다.',
    },
    {
      url: '/src/assets/images/book_inside_spread_1790678238690.jpg',
      caption: '아이 그림 원화 복원 및 타이포그래피 내지 레이아웃',
      desc: '아이의 붓터치와 크레파스 질감을 100% 살린 정밀 스캔 & 전문 동화 작가 구성.',
    },
    {
      url: '/src/assets/images/archiving_kit_box_1790678250545.jpg',
      caption: '웰컴 기프트: 원화 수거 보관 키트 & 패브릭 케이스',
      desc: '가정으로 배송되는 방습·무산성 원화 보관 포트폴리오와 아카이빙 전용 장갑 세트.',
    },
    {
      url: '/src/assets/images/onboarding_art_warm_1790678215216.jpg',
      caption: '아동 미술 심리 기반 컬러 팔레트 & 성장 리포트',
      desc: '아이의 시기별 선호 색채 및 조형 발달을 기록한 전문 큐레이터의 분석 레터.',
    },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="w-full bg-[#F5EFE2] text-[#2B2620]">
      {/* 1. Hero Section (Web Editorial Split Layout) */}
      <section className="border-b border-[#2B2620]/10 bg-gradient-to-b from-[#FAF6EE] to-[#F5EFE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C97C5B] bg-[#C97C5B]/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#C97C5B] animate-pulse"></span>
                <span>판교·분당 워킹맘이 선택한 프리미엄 아카이빙</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#33473C] tracking-tight leading-[1.25]">
                  아이의 낙서가<br />
                  <span className="underline decoration-[#C97C5B]/40 decoration-wavy decoration-2">
                    소장가치 높은 하드커버 그림책
                  </span>
                  으로
                </h1>
                <p className="text-base sm:text-lg text-[#2B2620]/80 leading-relaxed font-normal pt-1">
                  잠든 아이 곁에서 늘 고민하던 스케치북, 버리기는 미안하고 보관은 막막하셨나요?
                  매달 도착하는 세계 명작 그림책의 예술적 영감과 함께, 우리 아이만의 첫 번째 예술 양장본을 출판해 드립니다.
                </p>
              </div>

              {/* 3 Value Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="bg-white/80 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#2B2620]/10 shadow-2xs">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-[#33473C]">100%</div>
                  <div className="text-xs text-[#2B2620]/70 mt-1 font-medium">인쇄 전 시안 검수</div>
                  <div className="text-[11px] text-[#2B2620]/50 hidden sm:block">무제한 수정 지원</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#2B2620]/10 shadow-2xs">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-[#33473C]">원화 반환</div>
                  <div className="text-xs text-[#2B2620]/70 mt-1 font-medium">무산성 보관 키트</div>
                  <div className="text-[11px] text-[#2B2620]/50 hidden sm:block">원작 손상 0% 보장</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#2B2620]/10 shadow-2xs">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-[#33473C]">분기 1권</div>
                  <div className="text-xs text-[#2B2620]/70 mt-1 font-medium">하드커버 양장 출판</div>
                  <div className="text-[11px] text-[#2B2620]/50 hidden sm:block">ISBN급 출판 퀄리티</div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onRequestConsultation('masterpiece')}
                  className="bg-[#33473C] text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md hover:bg-[#27382F] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C97C5B]" />
                  <span>1:1 맞춤 무료 상담 신청 (30초)</span>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('plans-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/80 hover:bg-white text-[#33473C] font-semibold text-sm px-5 py-3.5 rounded-xl border border-[#33473C]/20 shadow-2xs transition-colors text-center cursor-pointer"
                >
                  플랜 3종 비교하기
                </button>

                <button
                  onClick={onOpenOnboardingStory}
                  className="text-xs font-semibold text-[#2B2620]/70 hover:text-[#33473C] underline underline-offset-4 py-2 text-center"
                >
                  브랜드 온보딩 스토리 다시보기
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#2B2620]/60 pt-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#33473C]" /> 실제 결제 및 가입 불필요
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#33473C]" /> 3탭 간편 예약
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#33473C]" /> 첫 달 30% 웰컴 혜택
                </span>
              </div>
            </div>

            {/* Right Book Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 bg-[#2B2620]/5 group">
                <img
                  src="/src/assets/images/book_mockup_cover_1790678227817.jpg"
                  alt="키즈 북 아틀리에 하드커버 양장 동화책 실물"
                  className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[5/4] transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs font-bold text-[#C97C5B] uppercase tracking-wider mb-1">
                    Bespoke Archiving Edition
                  </div>
                  <h3 className="text-lg font-bold font-serif">
                    “아이의 그림이 예술이 되는 순간”
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    스칸디나비안 패브릭 양장제본 · 금박 타이포그래피 · 보존용 아카이빙 코팅
                  </p>
                </div>
              </div>

              {/* Floating Reassurance Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl border border-[#2B2620]/10 items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-[#33473C]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#33473C]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2B2620]">원화 훼손 걱정 ZERO</div>
                  <div className="text-[11px] text-[#2B2620]/70">전담 큐레이터 1:1 방문 수거 & 안전 반환</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Story / Onboarding 3 Pillars */}
      <section id="story-section" className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
            BRAND STORY & CORE VALUES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C] mt-2">
            잠든 아이 옆, 그림 앞에서 멈칫한 적 있나요?
          </h2>
          <p className="text-sm text-[#2B2620]/70 mt-3 leading-relaxed">
            퇴근 후 마주한 식탁 위 수북한 크레파스 스케치북. 버리기엔 아이의 소중한 순간이 담겨 죄책감이 들고,
            그대로 모아두자니 서랍 속에서 구겨지고 바래지기 십상이었죠.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2B2620]/10 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                <BookOpen className="w-6 h-6 text-[#33473C]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#C97C5B]">01. 하드커버 양장 출판</span>
                <h3 className="text-lg font-bold text-[#2B2620]">
                  아이 그림 그대로 살린 출판
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2620]/70 leading-relaxed">
                  크레파스와 물감의 질감을 선명하게 살리는 디지털 복원 스캔 기술로, 볼로냐 국제도서전 출품작 수준의 하드커버 동화책으로 완성합니다.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2B2620]/10 text-xs font-semibold text-[#33473C] flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#C97C5B]" />
              <span>전담 북 디자이너 1:1 편집 레이아웃</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#33473C] shadow-sm relative flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-[#33473C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              큐레이션 피로도 해소
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C97C5B]/15 flex items-center justify-center text-[#C97C5B]">
                <Sparkles className="w-6 h-6 text-[#C97C5B]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#C97C5B]">02. 매달 도착하는 영감</span>
                <h3 className="text-lg font-bold text-[#2B2620]">
                  세계 명작 그림책 정기 배송
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2620]/70 leading-relaxed">
                  퇴근 후 어떤 책을 읽어줘야 할지 검색하지 마세요. 아동문학 전문가가 엄선한 해외 수상작과 예술 그림책이 매달 집 앞으로 도착합니다.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2B2620]/10 text-xs font-semibold text-[#33473C] flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#C97C5B]" />
              <span>엄마의 퇴근 후 큐레이션 시간 100% 절약</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2B2620]/10 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                <Layers className="w-6 h-6 text-[#33473C]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#C97C5B]">03. 전문 색채 성장 기록</span>
                <h3 className="text-lg font-bold text-[#2B2620]">
                  색채 심리 기반 성장 아카이빙
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2620]/70 leading-relaxed">
                  아이가 자주 쓰는 컬러와 표현 기법을 아동 미술 심리 관점에서 분석하여, 성장의 결정적 순간을 한눈에 담는 컬러 리포트를 함께 증정합니다.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2B2620]/10 text-xs font-semibold text-[#33473C] flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#C97C5B]" />
              <span>우리 아이만의 퍼스널 컬러 스토리북</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3 Plans Comparison Grid */}
      <section id="plans-section" className="py-14 sm:py-20 bg-white/60 border-y border-[#2B2620]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
              PLANS & PRICING
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#33473C] mt-2">
              가장 소중한 순간에 맞는 플랜 3종
            </h2>
            <p className="text-sm text-[#2B2620]/70 mt-3">
              실제 결제 없이, 상담 신청(3탭)만으로 맞춤 샘플 북 프리뷰와 견적을 안내받으실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PLANS.map((plan: Plan) => {
              const isBest = plan.id === 'masterpiece';
              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                    isBest
                      ? 'border-2 border-[#33473C] shadow-xl ring-2 ring-[#33473C]/10 md:-translate-y-2'
                      : 'border border-[#2B2620]/15 shadow-sm hover:border-[#33473C]/40 hover:shadow-md'
                  }`}
                >
                  {/* Top Badge for Masterpiece */}
                  {isBest && (
                    <div className="bg-[#33473C] text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#C97C5B]" />
                        워킹맘 82% 선택 · 시그니처 플랜
                      </span>
                      <span className="text-[11px] text-[#F5EFE2]/90 font-medium">웰컴 키트 증정</span>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Header: Plan Name & Badge */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-[#2B2620]">{plan.name}</h3>
                          {!isBest && plan.badge && (
                            <span className="text-[11px] font-semibold text-[#33473C] bg-[#33473C]/8 px-2.5 py-0.5 rounded-full">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#2B2620]/70 mt-1.5 line-clamp-2">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="py-3 px-4 rounded-2xl bg-[#F5EFE2]/70 border border-[#2B2620]/8">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-serif font-extrabold text-[#33473C]">
                          {plan.priceText}
                        </span>
                        <span className="text-xs text-[#2B2620]/60 font-medium">
                          {plan.periodText}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#C97C5B] font-semibold mt-1">
                        {plan.id === 'masterpiece'
                          ? '첫 달 30% 특별 할인 (월 55,300원 적용)'
                          : plan.id === 'curation'
                          ? '정기 배송 무료 배송 혜택'
                          : '대표작 20편 대형 양장본 1회 출판'}
                      </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#2B2620]/70 uppercase tracking-wider">
                        기본 포함 혜택
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#2B2620]/80">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#33473C]/10 text-[#33473C] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-6 sm:p-8 pt-0 space-y-2.5">
                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      className="w-full bg-[#F5EFE2] hover:bg-[#EDE5D3] text-[#33473C] font-bold text-sm py-3 rounded-xl border border-[#33473C]/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>실물 견본 및 상세 보기</span>
                      <ChevronRight className="w-4 h-4 text-[#33473C]" />
                    </button>

                    <button
                      onClick={() => onRequestConsultation(plan.id)}
                      className="w-full font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs bg-[#33473C] hover:bg-[#28382F] text-white"
                    >
                      <Sparkles className="w-4 h-4 text-[#C97C5B]" />
                      <span>{plan.name} 무료 상담 신청</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="mt-8 text-center text-xs text-[#2B2620]/60">
            ※ 모든 플랜은 가입비가 없으며, 첫 달 이용 후 위약금 없이 언제든 일시정지 또는 해지가 가능합니다.
          </div>
        </div>
      </section>

      {/* 4. Interactive Live Book Spread & Gallery Showcase */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2B2620]/10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2B2620]/10">
            <div>
              <span className="text-xs font-bold text-[#C97C5B] uppercase tracking-wider">
                LIVE BOOK PREVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C] mt-1">
                실제 출판되는 하드커버 완성본 들여다보기
              </h2>
              <p className="text-xs sm:text-sm text-[#2B2620]/70 mt-1">
                아이의 거친 크레파스 터치도, 전문 편집자의 손길을 거쳐 갤러리 도록급 작품집이 됩니다.
              </p>
            </div>

            {/* Plan switcher tabs */}
            <div className="flex items-center gap-1.5 bg-[#F5EFE2] p-1.5 rounded-2xl border border-[#2B2620]/10 self-start">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePlanPreview(p.id);
                    setActiveImageIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activePlanPreview === p.id
                      ? 'bg-[#33473C] text-white shadow-2xs'
                      : 'text-[#2B2620]/70 hover:text-[#2B2620]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Picture Frame */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10] bg-[#2B2620]/5 border border-[#2B2620]/10">
                <img
                  src={galleryImages[activeImageIndex].url}
                  alt={galleryImages[activeImageIndex].caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2B2620]/80 via-[#2B2620]/40 to-transparent p-4 sm:p-6 text-white">
                  <div className="text-sm sm:text-base font-bold">
                    {galleryImages[activeImageIndex].caption}
                  </div>
                  <div className="text-xs text-white/80 mt-1">
                    {galleryImages[activeImageIndex].desc}
                  </div>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#33473C] shadow-sm ring-2 ring-[#33473C]/20'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Information & Action Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FAF6EE] p-6 rounded-2xl border border-[#2B2620]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#33473C] uppercase">
                    선택된 플랜 스펙
                  </span>
                  <span className="text-xs font-serif font-bold text-[#C97C5B]">
                    {previewPlan.priceText} {previewPlan.periodText}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-[#2B2620]">{previewPlan.name}</h4>
                <p className="text-xs text-[#2B2620]/75 leading-relaxed">
                  {previewPlan.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#2B2620]/10 text-xs">
                  {previewPlan.specs.map((sp, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-[#2B2620]/5 last:border-b-0">
                      <span className="text-[#2B2620]/60">{sp.label}</span>
                      <span className="font-semibold text-[#2B2620]">{sp.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => onRequestConsultation(previewPlan.id)}
                    className="w-full bg-[#33473C] text-white font-bold text-sm py-3.5 rounded-xl shadow-xs hover:bg-[#28382F] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C97C5B]" />
                    <span>이 플랜으로 무료 상담 신청</span>
                  </button>

                  <button
                    onClick={() => onSelectPlan(previewPlan.id)}
                    className="w-full bg-white hover:bg-[#F5EFE2] text-[#33473C] font-semibold text-xs py-2.5 rounded-xl border border-[#33473C]/20 transition-colors cursor-pointer"
                  >
                    전체 상세 스펙 페이지로 이동
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#2B2620]/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#33473C]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#33473C]" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#2B2620]">유선 전문 상담원 직통</div>
                  <a href="tel:01099999999" className="text-[#33473C] font-bold hover:underline">
                    010-9999-9999 (평일 09:00~19:00)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Archiving Process (4 Steps) */}
      <section id="process-section" className="py-14 sm:py-20 bg-white/70 border-y border-[#2B2620]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
              4-STEP ZERO-EFFORT PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#33473C] mt-2">
              바쁜 워킹맘을 위한 4단계 안심 제작
            </h2>
            <p className="text-sm text-[#2B2620]/70 mt-3">
              직접 스캔하거나 편집할 필요가 전혀 없습니다. 집 앞으로 찾아가는 안심 키트에 담아만 주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-3xl p-6 border border-[#2B2620]/10 shadow-xs relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-bold text-[#C97C5B]">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-semibold text-[#33473C] bg-[#33473C]/8 px-2 py-0.5 rounded-full">
                      STEP {step.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2B2620]">{step.title}</h3>
                  <p className="text-xs text-[#2B2620]/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2B2620]/10 text-[11px] font-medium text-[#33473C] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#33473C]" />
                  <span>원화 100% 보존 반환</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section id="reviews-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
            REAL WORKING MOM REVIEWS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#33473C] mt-2">
            판교·분당 워킹맘들의 생생한 후기
          </h2>
          <p className="text-sm text-[#2B2620]/70 mt-3">
            실제 하드커버 그림책을 받아본 부모님들의 감동적인 기록입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#2B2620]/10 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C97C5B]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#33473C] bg-[#33473C]/10 px-2 py-0.5 rounded-full">
                    {review.planName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#2B2620]/80 leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="text-xs text-[#2B2620]/60 leading-relaxed">
                  {review.detailedReview}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2B2620]/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#2B2620]">{review.author}</div>
                  <div className="text-[11px] text-[#2B2620]/50">{review.role} · {review.childInfo}</div>
                </div>
                <span className="text-[11px] text-[#2B2620]/40">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq-section" className="py-14 sm:py-20 bg-white/50 border-t border-[#2B2620]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#C97C5B] uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C] mt-2">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#2B2620]/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EE]/50 transition-colors"
                >
                  <span className="text-sm font-bold text-[#2B2620]">
                    Q. {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#33473C] shrink-0 transition-transform duration-200 ${
                      openFaqIdx === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#2B2620]/75 leading-relaxed border-t border-[#2B2620]/5 bg-[#FAF6EE]/30">
                    A. {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Web Direct Consultation Banner */}
      <section className="py-16 sm:py-20 bg-[#33473C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C97C5B] bg-white/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C97C5B]" />
            빠른 3탭 전환 · 상담 신청
          </span>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
            우리 아이의 찬란한 순간,<br />
            더 이상 서랍 속에 묻어두지 마세요.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            전문 큐레이터가 아이의 연령과 성향에 맞춘 샘플 구성안과 첫 달 30% 웰컴 혜택을 1:1로 친절히 안내해 드립니다.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onRequestConsultation('masterpiece')}
              className="w-full sm:w-auto bg-[#F5EFE2] text-[#33473C] hover:bg-white font-bold text-base px-8 py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C97C5B]" />
              <span>무료 1:1 상담 신청하기 (30초)</span>
              <ArrowRight className="w-4 h-4 text-[#33473C]" />
            </button>

            <a
              href="tel:01099999999"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-4 rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C97C5B]" />
              <span>전화 상담 010-9999-9999</span>
            </a>
          </div>

          <div className="text-xs text-white/60 pt-2">
            ※ 전문 상담원이 확인 후 1영업일 이내 카카오 알림톡 또는 유선으로 연락드립니다.
          </div>
        </div>
      </section>

      {/* 9. Comprehensive Web Footer */}
      <footer className="bg-[#2B2620] text-[#F5EFE2]/80 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="font-serif text-xl font-bold text-white">
                Kid&apos;s Book Atelier
              </div>
              <p className="text-xs text-[#F5EFE2]/60 mt-1">
                프리미엄 키즈 아트 아카이빙 구독 서비스 · 키즈 북 아틀리에
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#F5EFE2]/80">
              <a href="tel:01099999999" className="hover:text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C97C5B]" />
                <span>010-9999-9999</span>
              </a>
              <a href="mailto:kidsbookatelier@gmail.com" className="hover:text-white flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C97C5B]" />
                <span>kidsbookatelier@gmail.com</span>
              </a>
              <span className="text-[#F5EFE2]/40">평일 09:00 ~ 19:00</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#F5EFE2]/50">
            <div>
              상호명: 키즈 북 아틀리에 (Kid&apos;s Book Atelier) | 주소: 경기도 성남시 분당구 판교역로 146 | 대표: 이지원 | 사업자등록번호: 214-88-02451
            </div>
            <div>
              © 2026 Kid&apos;s Book Atelier. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
