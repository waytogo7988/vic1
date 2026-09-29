import React, { useState } from 'react';
import { Plan, PlanId } from '../types';
import { FAQS, REVIEWS, PROCESS_STEPS } from '../data/reviews';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Check,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Layers,
  FileCheck,
  HelpCircle,
  MessageSquareQuote,
  Star,
  Phone,
  Mail,
  BookOpen,
} from 'lucide-react';

interface PlanDetailProps {
  plan: Plan;
  onBack: () => void;
  onRequestConsultation: (planId: PlanId) => void;
}

export const PlanDetail: React.FC<PlanDetailProps> = ({
  plan,
  onBack,
  onRequestConsultation,
}) => {
  // Image gallery slides for this plan
  const galleryImages = [
    {
      url: plan.coverImage,
      caption: `${plan.name} 실물 하드커버 양장 표지`,
      desc: '북유럽 패브릭 양장제본 및 금박 레터링 마감',
    },
    {
      url: '/src/assets/images/book_inside_spread_1790678238690.jpg',
      caption: '아이 그림 원화 복원 및 타이포그래피 내지 레이아웃',
      desc: '아동 미술 전문 디자이너의 1:1 맞춤형 갤러리 도록 구성',
    },
    {
      url: '/src/assets/images/archiving_kit_box_1790678250545.jpg',
      caption: '웰컴 기프트: 원화 수거 보관 키트 & 패브릭 케이스',
      desc: '무산성 아카이빙 케이스 및 전용 보관 장갑',
    },
    {
      url: '/src/assets/images/onboarding_art_warm_1790678215216.jpg',
      caption: '아동 미술 심리 기반 컬러 팔레트 & 성장 리포트',
      desc: '선호 색채 및 조형 발달을 기록한 큐레이터 분석 레터',
    },
  ];

  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Accordion open states
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    process: true,
    reviews: true,
    faqs: false,
    guarantee: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isHighlighted = plan.id === 'masterpiece';

  return (
    <div className="w-full bg-[#F5EFE2] text-[#2B2620] pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-[#2B2620]/10 bg-white/70 backdrop-blur-xs sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#33473C] hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#33473C]" />
            <span>플랜 목록으로 돌아가기</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-[#2B2620]">
              {plan.name} 상세 안내
            </span>
            <span className="hidden sm:inline-block text-[11px] text-[#C97C5B] font-semibold bg-[#C97C5B]/10 px-2.5 py-0.5 rounded-full">
              3탭 빠른 상담 신청
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Sticky Gallery & Key Summary on Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-6">
            {/* Main Image Slider View */}
            <div className="relative rounded-3xl overflow-hidden bg-[#2B2620]/5 border border-[#2B2620]/10 shadow-lg aspect-[4/3] group">
              <img
                src={galleryImages[currentImgIdx].url}
                alt={galleryImages[currentImgIdx].caption}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Slide Navigation Arrows */}
              <button
                onClick={() => setCurrentImgIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs shadow-md flex items-center justify-center text-[#2B2620] hover:bg-white transition-colors cursor-pointer"
                aria-label="이전 이미지"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentImgIdx((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs shadow-md flex items-center justify-center text-[#2B2620] hover:bg-white transition-colors cursor-pointer"
                aria-label="다음 이미지"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2B2620]/80 via-[#2B2620]/30 to-transparent p-4 sm:p-5 text-white">
                <div className="text-xs sm:text-sm font-bold">
                  {galleryImages[currentImgIdx].caption}
                </div>
                <div className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                  {galleryImages[currentImgIdx].desc}
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIdx(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                    currentImgIdx === idx
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

            {/* Pricing Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#2B2620]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#2B2620]/60 font-semibold uppercase">
                    이용 요금 및 결제 주기
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-serif font-extrabold text-[#33473C]">
                      {plan.priceText}
                    </span>
                    <span className="text-xs text-[#2B2620]/70 font-medium">
                      {plan.periodText}
                    </span>
                  </div>
                </div>

                {isHighlighted && (
                  <span className="text-xs font-bold text-white bg-[#33473C] px-3 py-1.5 rounded-full">
                    BEST 시그니처
                  </span>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF6EE] text-xs text-[#C97C5B] font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-[#C97C5B]" />
                <span>
                  지금 신청 시 첫 달 30% 웰컴 할인 및 무산성 원화 보관함 무료 증정
                </span>
              </div>

              {/* Direct Desktop CTA in sticky column */}
              <button
                onClick={() => onRequestConsultation(plan.id)}
                className="w-full bg-[#33473C] hover:bg-[#28382F] text-white font-bold text-base py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C97C5B]" />
                <span>1:1 맞춤 무료 상담 신청 (30초)</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#2B2620]/60 px-1 pt-1">
                <span>✓ 실제 결제 없음</span>
                <span>✓ 100% 시안 검수</span>
                <span>✓ 원화 안전 반환</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Breakdown, Specs, Accordions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2B2620]/10 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#C97C5B] bg-[#C97C5B]/10 px-2.5 py-0.5 rounded-full">
                  {plan.badge || '맞춤 큐레이션'}
                </span>
                <span className="text-xs text-[#2B2620]/60">판교·분당 엄마들의 추천</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C]">
                {plan.name}
              </h1>

              <p className="text-sm sm:text-base text-[#2B2620]/80 leading-relaxed">
                {plan.description}
              </p>

              {/* Plan Specs Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#2B2620]/10">
                {plan.specs.map((sp, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF6EE] rounded-xl">
                    <div className="text-[11px] text-[#2B2620]/60">{sp.label}</div>
                    <div className="text-xs font-bold text-[#2B2620] mt-0.5">{sp.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Features Included */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2B2620]/10 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#2B2620]">기본 제공 혜택 총정리</h3>
              <ul className="space-y-3 text-sm text-[#2B2620]/80">
                {plan.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#33473C]/10 text-[#33473C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordion 1: 4-Step Process */}
            <div className="bg-white rounded-3xl border border-[#2B2620]/10 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleSection('process')}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EE]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                    <FileCheck className="w-4 h-4 text-[#33473C]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2B2620]">
                      안심 제작 과정 (4단계)
                    </h4>
                    <p className="text-xs text-[#2B2620]/60">
                      수거부터 인쇄 검수까지 집에서 편안하게
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#33473C] transition-transform duration-200 ${
                    openSections.process ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openSections.process && (
                <div className="px-6 pb-6 pt-2 border-t border-[#2B2620]/10 space-y-4">
                  {PROCESS_STEPS.map((step) => (
                    <div key={step.step} className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-[#FAF6EE] text-[#C97C5B] font-bold text-xs flex items-center justify-center shrink-0 border border-[#2B2620]/10">
                        {step.step}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#2B2620]">{step.title}</div>
                        <div className="text-xs text-[#2B2620]/70 leading-relaxed">{step.desc}</div>
                        <div className="text-[11px] text-[#33473C] font-semibold">원화 100% 보존 반환</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Real Reviews */}
            <div className="bg-white rounded-3xl border border-[#2B2620]/10 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleSection('reviews')}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EE]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                    <MessageSquareQuote className="w-4 h-4 text-[#33473C]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2B2620]">
                      판교·분당 워킹맘 리얼 후기
                    </h4>
                    <p className="text-xs text-[#2B2620]/60">
                      실제 구독 회원 4.9/5.0 만족도
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#33473C] transition-transform duration-200 ${
                    openSections.reviews ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openSections.reviews && (
                <div className="px-6 pb-6 pt-2 border-t border-[#2B2620]/10 space-y-4">
                  {REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-[#FAF6EE]/50 border border-[#2B2620]/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#C97C5B]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#2B2620]/50">{rev.location}</span>
                      </div>
                      <p className="text-xs text-[#2B2620]/80 leading-relaxed italic">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                      <p className="text-xs text-[#2B2620]/60 leading-relaxed">
                        {rev.detailedReview}
                      </p>
                      <div className="text-[11px] font-bold text-[#2B2620] pt-1">
                        {rev.author} ({rev.role} · {rev.childInfo})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 3: FAQ */}
            <div className="bg-white rounded-3xl border border-[#2B2620]/10 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EE]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                    <HelpCircle className="w-4 h-4 text-[#33473C]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2B2620]">
                      자주 묻는 질문 (FAQ)
                    </h4>
                    <p className="text-xs text-[#2B2620]/60">
                      신청 전 궁금한 점을 미리 확인하세요
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#33473C] transition-transform duration-200 ${
                    openSections.faqs ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openSections.faqs && (
                <div className="px-6 pb-6 pt-2 border-t border-[#2B2620]/10 space-y-3">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#FAF6EE]/60 space-y-1">
                      <div className="text-xs font-bold text-[#33473C]">Q. {faq.question}</div>
                      <div className="text-xs text-[#2B2620]/75 leading-relaxed">A. {faq.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 4: Guarantee */}
            <div className="bg-white rounded-3xl border border-[#2B2620]/10 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleSection('guarantee')}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EE]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                    <ShieldCheck className="w-4 h-4 text-[#33473C]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2B2620]">
                      품질 보증 및 안심 정책
                    </h4>
                    <p className="text-xs text-[#2B2620]/60">
                      원화 훼손 0% 보상 및 인쇄 재제작 보증
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#33473C] transition-transform duration-200 ${
                    openSections.guarantee ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openSections.guarantee && (
                <div className="px-6 pb-6 pt-2 border-t border-[#2B2620]/10 space-y-2 text-xs text-[#2B2620]/80 leading-relaxed">
                  <p>
                    • <strong>100% 사전 시안 검수:</strong> 인쇄 전 고객님이 모바일로 전체 페이지와 텍스트를 검수하며 만족하실 때까지 무료 수정을 지원합니다.
                  </p>
                  <p>
                    • <strong>원화 안심 반환:</strong> 스캔 작업 완료 즉시 방습·무산성 패키지에 원화를 담아 택배 또는 큐레이터 직배송으로 안전히 돌려드립니다.
                  </p>
                  <p>
                    • <strong>자유로운 해지:</strong> 구독 중 언제든 일시 정지 및 해지가 가능하며, 위약금이 전혀 발생하지 않습니다.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Consultation Request Banner */}
            <div className="p-6 rounded-3xl bg-[#33473C] text-white space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C97C5B]" />
                <span className="text-xs font-bold text-[#C97C5B]">3탭 완료 · 무료 상담</span>
              </div>
              <h4 className="text-lg font-bold font-serif">
                {plan.name}으로 우리 아이 첫 동화책 상담받기
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                아이의 성향과 원화 수량에 맞는 맞춤 견적과 시안 예시를 1:1로 보내드립니다.
              </p>
              <button
                onClick={() => onRequestConsultation(plan.id)}
                className="w-full bg-[#F5EFE2] hover:bg-white text-[#33473C] font-bold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>무료 상담 신청서 열기 (30초)</span>
                <ArrowRight className="w-4 h-4 text-[#33473C]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar for Mobile & Quick Sticky Desktop Action */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#2B2620]/10 p-3 sm:p-4 z-40 lg:hidden">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[11px] text-[#2B2620]/60 line-clamp-1">{plan.name}</div>
            <div className="text-base font-serif font-bold text-[#33473C]">
              {plan.priceText} <span className="text-xs font-normal text-[#2B2620]/60">{plan.periodText}</span>
            </div>
          </div>
          <button
            onClick={() => onRequestConsultation(plan.id)}
            className="flex-1 bg-[#33473C] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C97C5B]" />
            <span>상담 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
