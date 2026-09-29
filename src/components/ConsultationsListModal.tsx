import React, { useEffect, useState } from 'react';
import { ConsultationRequest } from '../types';
import {
  X,
  RefreshCw,
  Phone,
  User,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Trash2,
} from 'lucide-react';

interface ConsultationsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewConsultation: () => void;
}

export const ConsultationsListModal: React.FC<ConsultationsListModalProps> = ({
  isOpen,
  onClose,
  onNewConsultation,
}) => {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch from server API
      const res = await fetch('/api/consultations');
      if (res.ok) {
        const data = await res.json();
        if (data.consultations && Array.isArray(data.consultations)) {
          setConsultations(data.consultations);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend fetch failed, falling back to localStorage', e);
    } finally {
      setIsLoading(false);
    }

    // Fallback: localStorage
    try {
      const local = localStorage.getItem('kids_book_atelier_consultations');
      if (local) {
        setConsultations(JSON.parse(local));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchConsultations();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-[#F5EFE2] rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden border border-[#2B2620]/15">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#2B2620]/10 bg-white/70">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#C97C5B] uppercase tracking-wider">
                실시간 저장 데이터
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-[#33473C]">
              상담 신청 내역 ({consultations.length}건)
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchConsultations}
              disabled={isLoading}
              title="새로고침"
              className="w-8 h-8 rounded-full bg-white border border-[#2B2620]/10 flex items-center justify-center text-[#33473C] active:scale-95 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="w-8 h-8 rounded-full bg-[#2B2620]/5 hover:bg-[#2B2620]/10 flex items-center justify-center text-[#2B2620] active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List Body */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
          {consultations.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-[#2B2620]/60">
                아직 등록된 상담 신청 내역이 없습니다.
              </p>
              <p className="text-xs text-[#2B2620]/40">
                새로운 상담 신청을 등록해보세요!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewConsultation();
                }}
                className="mt-2 px-4 py-2 bg-[#33473C] text-white text-xs font-semibold rounded-xl"
              >
                상담 신청서 작성하기
              </button>
            </div>
          ) : (
            consultations.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-[#2B2620]/10 shadow-2xs space-y-2"
              >
                {/* Row 1: Name, Status, Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#33473C]" />
                    <span className="font-bold text-sm text-[#2B2620]">{item.name}</span>
                    <span className="text-[10px] font-semibold text-[#33473C] bg-[#33473C]/10 px-2 py-0.5 rounded-full">
                      {item.status || '상담대기'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#2B2620]/50 font-mono">
                    {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Row 2: Phone */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-1 text-[#33473C] font-semibold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C97C5B]" />
                    <span>{item.phone}</span>
                  </a>
                  <span className="text-[11px] text-[#2B2620]/65">
                    아이: <strong className="text-[#2B2620]">{item.childAge}</strong>
                  </span>
                </div>

                {/* Row 3: Plan & Referral */}
                <div className="p-2 rounded-lg bg-[#F5EFE2]/60 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-[#33473C] font-medium truncate max-w-[65%]">
                    <Layers className="w-3 h-3 text-[#33473C] shrink-0" />
                    <span className="truncate">{item.planName}</span>
                  </div>
                  <span className="text-[10px] text-[#2B2620]/60 shrink-0">
                    경로: {item.referral}
                  </span>
                </div>

                {/* Row 4: Memo if present */}
                {item.memo && (
                  <div className="text-[11px] text-[#2B2620]/75 bg-slate-50 p-2 rounded-md border border-slate-100 italic">
                    &ldquo;{item.memo}&rdquo;
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#2B2620]/10 bg-white/70 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNewConsultation();
            }}
            className="flex-1 h-11 rounded-xl bg-[#33473C] text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C97C5B]" />
            <span>새 상담 신청 등록하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
