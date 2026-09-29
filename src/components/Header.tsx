import React from 'react';
import { Phone, Mail, FileText, ArrowLeft, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: 'onboarding' | 'main' | 'detail';
  planName?: string;
  onBack?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenConsultationsList: () => void;
  onRequestConsultation: () => void;
  consultationCount: number;
  onOpenOnboarding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  planName,
  onBack,
  onNavigateSection,
  onOpenConsultationsList,
  onRequestConsultation,
  consultationCount,
  onOpenOnboarding,
}) => {
  const handleNav = (sectionId: string) => {
    if (currentView !== 'main' && onBack) {
      onBack();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5EFE2]/95 backdrop-blur-md border-b border-[#2B2620]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          {currentView === 'detail' ? (
            <button
              onClick={onBack}
              aria-label="메인으로 돌아가기"
              className="flex items-center gap-1.5 py-1.5 pr-2 text-[#33473C] font-semibold text-sm hover:opacity-80 active:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5 text-[#33473C]" />
              <span className="hidden sm:inline font-bold">메인 목록으로</span>
            </button>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col"
            >
              <span className="font-serif text-lg sm:text-xl tracking-tight font-bold text-[#33473C]">
                Kid&apos;s Book Atelier
              </span>
              <span className="text-[10px] tracking-wider text-[#2B2620]/60 -mt-0.5 font-medium">
                PREMIUM ART ARCHIVE · 키즈 북 아틀리에
              </span>
            </a>
          )}

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#2B2620]/80">
            <button
              onClick={() => {
                if (onOpenOnboarding) onOpenOnboarding();
                else handleNav('story-section');
              }}
              className="hover:text-[#33473C] transition-colors py-1"
            >
              브랜드 스토리
            </button>
            <button
              onClick={() => handleNav('plans-section')}
              className="hover:text-[#33473C] transition-colors py-1"
            >
              플랜 3종 비교
            </button>
            <button
              onClick={() => handleNav('process-section')}
              className="hover:text-[#33473C] transition-colors py-1"
            >
              제작 프로세스
            </button>
            <button
              onClick={() => handleNav('reviews-section')}
              className="hover:text-[#33473C] transition-colors py-1"
            >
              워킹맘 후기
            </button>
            <button
              onClick={() => handleNav('faq-section')}
              className="hover:text-[#33473C] transition-colors py-1"
            >
              FAQ
            </button>
          </nav>
        </div>

        {/* Center slot (when in detail on mobile) */}
        {currentView === 'detail' && planName && (
          <div className="hidden xs:block md:hidden text-xs font-semibold text-[#2B2620] truncate max-w-[140px]">
            {planName}
          </div>
        )}

        {/* Right: Contact & Quick CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Contact links (Always Visible) */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#2B2620]/75 pr-2 border-r border-[#2B2620]/15">
            <a
              href="tel:01099999999"
              className="flex items-center gap-1.5 hover:text-[#33473C] font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#33473C]" />
              <span>010-9999-9999</span>
            </a>
            <a
              href="mailto:kidsbookatelier@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#33473C] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#33473C]" />
              <span>kidsbookatelier@gmail.com</span>
            </a>
          </div>

          {/* Quick contact icons on tablet/mobile */}
          <div className="flex lg:hidden items-center gap-1">
            <a
              href="tel:01099999999"
              title="전화 문의 (010-9999-9999)"
              className="w-8 h-8 rounded-full bg-[#33473C]/10 flex items-center justify-center text-[#33473C] hover:bg-[#33473C]/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:kidsbookatelier@gmail.com"
              title="이메일 문의"
              className="w-8 h-8 rounded-full bg-[#33473C]/10 flex items-center justify-center text-[#33473C] hover:bg-[#33473C]/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Inquiry records lookup button */}
          <button
            onClick={onOpenConsultationsList}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#33473C] bg-white/80 border border-[#33473C]/20 rounded-xl shadow-2xs hover:bg-white active:scale-95 transition-all"
            title="신청 내역 조회"
          >
            <FileText className="w-3.5 h-3.5 text-[#C97C5B]" />
            <span className="hidden sm:inline">신청조회</span>
            {consultationCount > 0 ? (
              <span className="w-4 h-4 rounded-full bg-[#C97C5B] text-white text-[10px] flex items-center justify-center font-bold ml-0.5">
                {consultationCount}
              </span>
            ) : null}
          </button>

          {/* Primary Quick CTA button in header */}
          <button
            onClick={onRequestConsultation}
            className="flex items-center gap-1.5 bg-[#33473C] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-[#28382F] active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C97C5B]" />
            <span>무료 상담 신청</span>
          </button>
        </div>
      </div>
    </header>
  );
};
