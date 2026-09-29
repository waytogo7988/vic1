import React, { useState } from 'react';
import { PlanId, ConsultationRequest } from '../types';
import { PLANS } from '../data/plans';
import {
  X,
  CheckCircle2,
  Phone,
  Mail,
  Shield,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface ConsultationModalProps {
  initialPlanId?: PlanId;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newConsultation: ConsultationRequest) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  initialPlanId = 'masterpiece',
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlanId);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [childAge, setChildAge] = useState('5~6세');
  const [referral, setReferral] = useState('판교·분당 맘카페');
  const [memo, setMemo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<ConsultationRequest | null>(null);

  if (!isOpen) return null;

  const ageOptions = ['3~4세', '5~6세', '7~8세', '9세 이상'];
  const referralOptions = [
    '판교·분당 맘카페',
    '인스타그램',
    '지인 추천',
    '네이버 검색/블로그',
    '오프라인 전시/원화전',
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 7) {
      val = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
    } else if (val.length > 3) {
      val = `${val.slice(0, 3)}-${val.slice(3)}`;
    }
    setPhone(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('신청자 성함을 입력해 주세요.');
      return;
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMessage('연락처(휴대폰 번호)를 정확히 입력해 주세요.');
      return;
    }

    const currentPlan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      planId: selectedPlan,
      planName: `${currentPlan.name} (${currentPlan.priceText})`,
      childAge,
      referral,
      memo: memo.trim(),
    };

    try {
      // 1. Try sending to backend API
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let savedRecord: ConsultationRequest;
      if (res.ok) {
        const json = await res.json();
        savedRecord = json.consultation;
      } else {
        // Fallback local creation
        savedRecord = {
          id: 'c-' + Date.now(),
          ...payload,
          createdAt: new Date().toISOString(),
          status: '상담대기',
        };
      }

      // 2. Also save to localStorage as instant sync
      try {
        const localData = localStorage.getItem('kids_book_atelier_consultations');
        const list = localData ? JSON.parse(localData) : [];
        list.unshift(savedRecord);
        localStorage.setItem('kids_book_atelier_consultations', JSON.stringify(list));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }

      setSubmittedData(savedRecord);
      onSuccess(savedRecord);
    } catch (err) {
      console.error('Consultation submit error:', err);
      // Client-side fallback if server fails
      const fallbackRecord: ConsultationRequest = {
        id: 'c-' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
        status: '상담대기',
      };
      try {
        const localData = localStorage.getItem('kids_book_atelier_consultations');
        const list = localData ? JSON.parse(localData) : [];
        list.unshift(fallbackRecord);
        localStorage.setItem('kids_book_atelier_consultations', JSON.stringify(list));
      } catch (e) {
        // ignore
      }
      setSubmittedData(fallbackRecord);
      onSuccess(fallbackRecord);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-[#F5EFE2] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden border border-[#2B2620]/15">
        {/* Modal Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#2B2620]/10 bg-white/70">
          <div>
            <span className="text-[11px] font-bold text-[#C97C5B] uppercase tracking-wider">
              {submittedData ? '신청 완료' : '1:1 맞춤 상담 신청'}
            </span>
            <h3 className="text-base font-bold text-[#33473C]">
              {submittedData ? '상담 신청이 접수되었습니다' : '아이의 유년기를 책으로 기록하세요'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 rounded-full bg-[#2B2620]/5 hover:bg-[#2B2620]/10 flex items-center justify-center text-[#2B2620] active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {submittedData ? (
            /* Success State */
            <div className="space-y-4 py-2 text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#33473C]/10 text-[#33473C] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#33473C]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#33473C]">
                  {submittedData.name} 님, 접수가 완료되었습니다
                </h4>
                <p className="text-xs text-[#2B2620]/75 leading-relaxed">
                  담당 전문 북디자이너가 <strong>2시간 이내</strong>에 입력해주신 연락처(<strong>{submittedData.phone}</strong>)로 친절히 안내드립니다.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-white border border-[#2B2620]/10 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#2B2620]/8 pb-1.5">
                  <span className="text-[#2B2620]/60">관심 플랜</span>
                  <span className="font-bold text-[#33473C]">{submittedData.planName}</span>
                </div>
                <div className="flex justify-between border-b border-[#2B2620]/8 pb-1.5">
                  <span className="text-[#2B2620]/60">아이 나이대</span>
                  <span className="font-semibold text-[#2B2620]">{submittedData.childAge}</span>
                </div>
                <div className="flex justify-between border-b border-[#2B2620]/8 pb-1.5">
                  <span className="text-[#2B2620]/60">신청 경로</span>
                  <span className="font-medium text-[#2B2620]">{submittedData.referral}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2B2620]/60">접수 일시</span>
                  <span className="tabular-nums font-mono text-[11px] text-[#2B2620]/75">
                    {new Date(submittedData.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#E8DEC9] text-[#33473C] text-[11px] flex items-center gap-2 text-left">
                <Clock className="w-4 h-4 text-[#C97C5B] shrink-0" />
                <span>
                  지금 신청 고객님께는 <strong>첫 달 30% 웰컴 할인권</strong>과 <strong>아카이빙 키트</strong>가 예약 확정됩니다.
                </span>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href="tel:01099999999"
                  className="w-full h-12 rounded-xl bg-[#33473C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-[#26352D] active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4 text-[#C97C5B]" />
                  <span>급하신 경우 전화 즉시 상담 (010-9999-9999)</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full h-11 rounded-xl bg-white border border-[#2B2620]/15 text-[#2B2620] font-semibold text-xs active:bg-[#F5EFE2] transition-colors"
                >
                  확인 완료 (창 닫기)
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan Selector Radios */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33473C]">
                  1. 관심 플랜 선택
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#33473C] text-white border-[#33473C] shadow-xs'
                            : 'bg-white text-[#2B2620] border-[#2B2620]/12 hover:border-[#33473C]/40'
                        }`}
                      >
                        <div className="text-[11px] font-bold truncate">
                          {plan.name.replace(' 플랜', '')}
                        </div>
                        <div className={`text-[10px] mt-0.5 tabular-nums ${isSelected ? 'text-white/80' : 'text-[#33473C]'}`}>
                          {plan.priceText}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="space-y-3 pt-1">
                <div>
                  <label htmlFor="applicant-name" className="block text-xs font-bold text-[#33473C] mb-1">
                    2. 신청자 성함 <span className="text-[#C97C5B]">*</span>
                  </label>
                  <input
                    id="applicant-name"
                    type="text"
                    required
                    placeholder="예: 김민지 팀장"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#2B2620]/15 focus:outline-none focus:border-[#33473C] text-xs text-[#2B2620] shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="applicant-phone" className="block text-xs font-bold text-[#33473C] mb-1">
                    3. 연락처 (휴대폰 번호) <span className="text-[#C97C5B]">*</span>
                  </label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#2B2620]/15 focus:outline-none focus:border-[#33473C] text-xs text-[#2B2620] tabular-nums shadow-2xs"
                  />
                </div>
              </div>

              {/* Child Age Group Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-[#33473C]">
                  4. 아이 나이대
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {ageOptions.map((age) => (
                    <button
                      type="button"
                      key={age}
                      onClick={() => setChildAge(age)}
                      className={`h-9 rounded-lg text-xs font-semibold border transition-all ${
                        childAge === age
                          ? 'bg-[#33473C] text-white border-[#33473C]'
                          : 'bg-white text-[#2B2620] border-[#2B2620]/12 hover:border-[#33473C]/40'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* Referral Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-[#33473C]">
                  5. 알게 되신 경로
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {referralOptions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setReferral(item)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        referral === item
                          ? 'bg-[#33473C] text-white border-[#33473C]'
                          : 'bg-white text-[#2B2620]/80 border-[#2B2620]/12'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Memo */}
              <div className="space-y-1 pt-1">
                <label htmlFor="applicant-memo" className="block text-xs font-bold text-[#33473C]">
                  궁금하신 점 (선택)
                </label>
                <textarea
                  id="applicant-memo"
                  rows={2}
                  placeholder="예: 판교 지역 방문 상담 가능한지, 그림 보관 키트 수령 시점 등"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#2B2620]/15 focus:outline-none focus:border-[#33473C] text-xs text-[#2B2620] shadow-2xs resize-none"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Trust Badge */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#2B2620]/65 pt-1">
                <Shield className="w-3.5 h-3.5 text-[#33473C]" />
                <span>개인정보는 상담 안내 목적으로만 안전하게 보관됩니다.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 rounded-xl bg-[#33473C] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:bg-[#26352D] active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
              >
                {isSubmitting ? (
                  <span>상담 접수 저장 중...</span>
                ) : (
                  <>
                    <span>1:1 무료 상담 신청 완료하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
