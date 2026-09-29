import React from 'react';
import { Phone, Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const ContactBar: React.FC = () => {
  return (
    <section className="w-full bg-[#EAE2D1] border-t border-[#2B2620]/10 py-6 px-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#33473C] tracking-wider uppercase">
              Atelier Concierge
            </h4>
            <p className="text-sm font-semibold text-[#2B2620] mt-0.5">
              1:1 맞춤 상담 채널 상시 운영
            </p>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#33473C] bg-white/70 px-2.5 py-1 rounded-full border border-[#33473C]/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C97C5B]" />
            안심 보증 상담
          </span>
        </div>

        {/* Action button grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <a
            href="tel:01099999999"
            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white border border-[#2B2620]/10 text-[#33473C] font-semibold text-xs shadow-xs hover:border-[#33473C] active:bg-[#F5EFE2] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C97C5B]" />
            <div className="text-left leading-tight">
              <div className="text-[10px] text-[#2B2620]/60">전화 즉시 상담</div>
              <div className="font-bold">010-9999-9999</div>
            </div>
          </a>

          <a
            href="mailto:kidsbookatelier@gmail.com"
            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white border border-[#2B2620]/10 text-[#33473C] font-semibold text-xs shadow-xs hover:border-[#33473C] active:bg-[#F5EFE2] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#C97C5B]" />
            <div className="text-left leading-tight truncate">
              <div className="text-[10px] text-[#2B2620]/60">이메일 문의</div>
              <div className="font-bold truncate text-[11px]">이메일 바로보내기</div>
            </div>
          </a>
        </div>

        {/* Operating hours & trust */}
        <div className="pt-2 text-[12px] text-[#2B2620]/75 space-y-1 border-t border-[#2B2620]/8">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#33473C] shrink-0" />
            <span>상담 가능 시간: 평일 09:30 - 18:30 (주말 및 공휴일 접수 가능)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#33473C] shrink-0" />
            <span>판교 테크노밸리 & 분당구 전 지역 방문 아카이빙 컨시어지</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 text-center text-[11px] text-[#2B2620]/50 space-y-0.5">
          <p>Kid&apos;s Book Atelier · 프리미엄 홈아트 아카이빙 구독 서비스</p>
          <p>이메일: kidsbookatelier@gmail.com · 직통: 010-9999-9999</p>
          <p>© 2026 Kid&apos;s Book Atelier. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};
