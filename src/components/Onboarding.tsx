import React, { useState } from 'react';
import { BookOpen, Sparkles, Palette, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  onOpenConsultationsList: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({
  onComplete,
  onOpenConsultationsList,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE2] text-[#2B2620] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 select-none">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[#2B2620]/10">
        <div className="flex flex-col">
          <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-[#33473C]">
            Kid&apos;s Book Atelier
          </span>
          <span className="text-[10px] tracking-wider text-[#2B2620]/60">
            PREMIUM ART ARCHIVE · 온보딩 스토리
          </span>
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-semibold text-[#2B2620]/70 hover:text-[#33473C] py-2 px-3 rounded-lg min-h-[44px] flex items-center gap-1 active:opacity-70 transition-colors cursor-pointer"
        >
          <span>건너뛰고 바로 메인 보기</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Slide Card Area (Expansive Responsive Container) */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2B2620]/10 shadow-lg">
          {/* Slide 1: 질문형 공감 */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-6 space-y-5">
                <span className="inline-block text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
                  Story 01 · 엄마의 마음
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C] leading-snug tracking-tight">
                  잠든 아이 옆,<br />
                  그림 앞에서 멈칫한 적 있나요?
                </h2>
                <p className="text-sm text-[#2B2620]/80 leading-relaxed">
                  퇴근 후 아이 방에 흩어진 크레파스 그림들.
                  버리자니 아이의 소중한 한때를 버리는 것 같아 미안하고,
                  그대로 모아두자니 서랍 속에서 감당이 안 되었던 순간.
                  바쁜 일상 속에서도 우리 아이의 첫 영감과 표현력만큼은 온전히 지켜주고 싶습니다.
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#2B2620]/8 text-xs text-[#2B2620]/80 leading-relaxed">
                  <strong className="text-[#33473C] font-semibold">판교 36세 워킹맘의 목소리 : </strong>
                  &ldquo;매일 퇴근하고 마주하는 스케치북, 갤러리 도록처럼 남겨줄 수 있다면 얼마나 좋을까요?&rdquo;
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#2B2620]/10 bg-white aspect-[4/3]">
                  <img
                    src="/src/assets/images/onboarding_art_warm_1790678215216.jpg"
                    alt="따뜻한 크레파스 그림과 그림책"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium drop-shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C97C5B]" />
                    아이의 선과 색채는 단 한 번뿐인 유년기의 예술입니다
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: 3대 핵심 가치 */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-xl">
                <span className="inline-block text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
                  Story 02 · 아틀리에의 해답
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C] leading-snug tracking-tight mt-1">
                  버리기엔 아깝고 보관은 막막한 낙서,<br />
                  전 세계 소장가치 높은 하드커버 양장책으로 출판됩니다
                </h2>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#2B2620]/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2B2620]">
                    아이 그림 그대로 살린 출판
                  </h3>
                  <p className="text-xs text-[#2B2620]/75 leading-relaxed">
                    크레파스 질감과 붓터치를 살리는 디지털 복원 스캔 기술로, 볼로냐 국제도서전 출품작 수준의 양장 도록으로 제작합니다.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#33473C]/20 ring-1 ring-[#33473C]/15 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C97C5B]/15 flex items-center justify-center text-[#C97C5B]">
                    <Sparkles className="w-5 h-5 text-[#C97C5B]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2B2620]">
                    매달 도착하는 세계 명작 그림책
                  </h3>
                  <p className="text-xs text-[#2B2620]/75 leading-relaxed">
                    칼데콧·볼로냐 라가치상 등 세계적 권위의 수상작을 큐레이터가 엄선하여 매월 집 앞으로 배송해 드립니다.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#2B2620]/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#33473C]/10 flex items-center justify-center text-[#33473C]">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2B2620]">
                    전문 색채 분석 성장 기록
                  </h3>
                  <p className="text-xs text-[#2B2620]/75 leading-relaxed">
                    아동 미술 심리 기반의 컬러 팔레트 &amp; 성장 스토리 분석 리포트를 함께 수록하여 가치를 더합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: 혜택 문구 + 무료 시작 */}
          {currentSlide === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-6 space-y-5">
                <span className="inline-block text-xs font-bold text-[#C97C5B] tracking-wider uppercase">
                  Story 03 · 특별한 웰컴 혜택
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#33473C] leading-snug tracking-tight">
                  우리 아이 첫 번째 하드커버 동화책,<br />
                  지금 가장 특별하게 시작하세요
                </h2>

                <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#33473C]/15 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#33473C]">
                    <CheckCircle2 className="w-4 h-4 text-[#C97C5B]" />
                    <span>신규 신청 고객 한정 웰컴 혜택</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2B2620]/80 leading-relaxed">
                    지금 상담 신청 시 <strong>첫 달 30% 특별 할인</strong> 및 원화 보호 린넨 케이스가 포함된 <strong>프리미엄 아카이빙 키트(4만원 상당)</strong>를 무료로 증정합니다.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#2B2620]/70">
                  <div>✓ 실제 결제 및 가입 불필요 (3탭 상담 신청)</div>
                  <div>✓ 전문 큐레이터 1:1 샘플 북 프리뷰 제공</div>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#2B2620]/10 bg-white aspect-[4/3]">
                  <img
                    src="/src/assets/images/book_mockup_cover_1790678227817.jpg"
                    alt="마스터피스 하드커버 양장책"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/50 via-transparent to-transparent flex items-end p-4 text-white text-xs font-semibold">
                    스칸디나비안 패브릭 양장제본 &amp; 금박 레터링 실물
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card Bottom Controls */}
          <div className="mt-8 pt-6 border-t border-[#2B2620]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Indicators: Terracotta Dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`슬라이드 ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-8 bg-[#C97C5B]'
                      : 'w-2.5 bg-[#2B2620]/20 hover:bg-[#2B2620]/40'
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {currentSlide < 2 ? (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#33473C] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-[#26352D] active:scale-95 transition-all cursor-pointer"
                >
                  <span>다음으로 ({currentSlide + 1}/3)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onComplete}
                    className="w-full sm:w-auto h-13 px-8 rounded-xl bg-[#33473C] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md hover:bg-[#26352D] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>무료로 시작하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenConsultationsList}
                    className="text-xs text-[#2B2620]/70 hover:text-[#33473C] underline underline-offset-4 py-2 px-3"
                  >
                    이미 계정이 있어요 (신청 내역 조회)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Help text */}
      <div className="max-w-4xl w-full mx-auto text-center text-xs text-[#2B2620]/50 pt-4">
        Kid&apos;s Book Atelier · 문의전화 010-9999-9999 · kidsbookatelier@gmail.com
      </div>
    </div>
  );
};
