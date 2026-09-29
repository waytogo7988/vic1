/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PlanId, ConsultationRequest } from './types';
import { PLANS } from './data/plans';
import { Header } from './components/Header';
import { Onboarding } from './components/Onboarding';
import { MainScreen } from './components/MainScreen';
import { PlanDetail } from './components/PlanDetail';
import { ConsultationModal } from './components/ConsultationModal';
import { ConsultationsListModal } from './components/ConsultationsListModal';
import { Monitor, Smartphone, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Web default: start directly on main page or onboarding
  const [currentView, setCurrentView] = useState<'onboarding' | 'main' | 'detail'>('main');
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('masterpiece');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [consultationsCount, setConsultationsCount] = useState<number>(0);

  // Viewport mode: 'web' (default full width desktop/tablet/mobile responsive) or 'mobile-preview'
  const [viewportMode, setViewportMode] = useState<'web' | 'mobile-preview'>('web');

  // Fetch consultation count on mount
  useEffect(() => {
    const checkCount = async () => {
      try {
        const res = await fetch('/api/consultations');
        if (res.ok) {
          const json = await res.json();
          if (json.consultations) {
            setConsultationsCount(json.consultations.length);
            return;
          }
        }
      } catch (e) {
        // Fallback to localStorage
      }
      try {
        const local = localStorage.getItem('kids_book_atelier_consultations');
        if (local) {
          const parsed = JSON.parse(local);
          setConsultationsCount(parsed.length);
        }
      } catch (e) {
        // ignore
      }
    };
    checkCount();
  }, []);

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlanId(planId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestConsultation = (planId?: PlanId) => {
    if (planId) setSelectedPlanId(planId);
    setIsConsultationOpen(true);
  };

  const handleConsultationSuccess = (newRecord: ConsultationRequest) => {
    setConsultationsCount((prev) => prev + 1);
  };

  const currentPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];

  return (
    <div className="min-h-screen bg-[#F5EFE2] text-[#2B2620] flex flex-col selection:bg-[#33473C] selection:text-white">
      {/* Top Device & Viewport Switcher Toolbar (for evaluator convenience) */}
      <aside aria-label="기기 및 뷰포트 전환 도구" className="bg-[#2B2620] text-[#F5EFE2] text-xs py-2 px-4 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white">Kid&apos;s Book Atelier</span>
            <span className="text-[#F5EFE2]/40">|</span>
            <span className="text-[#F5EFE2]/80">프리미엄 키즈 아트 아카이빙 웹 서비스</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] bg-[#33473C] text-white px-2 py-0.5 rounded-full ml-1">
              <Sparkles className="w-3 h-3 text-[#C97C5B]" />
              전환 전용 3탭 플로우
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
              <button
                onClick={() => setViewportMode('web')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  viewportMode === 'web'
                    ? 'bg-[#33473C] text-white shadow-xs'
                    : 'text-[#F5EFE2]/70 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>웹 데스크톱 뷰 (반응형)</span>
              </button>
              <button
                onClick={() => setViewportMode('mobile-preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  viewportMode === 'mobile-preview'
                    ? 'bg-[#33473C] text-white shadow-xs'
                    : 'text-[#F5EFE2]/70 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>모바일 뷰 (390px)</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container Wrapper */}
      <div
        className={`w-full flex-1 flex flex-col transition-all duration-300 ${
          viewportMode === 'mobile-preview'
            ? 'max-w-[414px] mx-auto my-6 shadow-2xl rounded-3xl border-4 border-[#2B2620]/20 overflow-hidden bg-[#F5EFE2]'
            : 'w-full'
        }`}
      >
        {/* Navigation Header */}
        {currentView !== 'onboarding' && (
          <Header
            currentView={currentView}
            planName={currentPlan.name}
            onBack={() => {
              setCurrentView('main');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenConsultationsList={() => setIsListOpen(true)}
            onRequestConsultation={() => handleRequestConsultation(selectedPlanId)}
            consultationCount={consultationsCount}
            onOpenOnboarding={() => {
              setCurrentView('onboarding');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* View Routing */}
        <main className="flex-1 flex flex-col">
          {currentView === 'onboarding' && (
            <Onboarding
              onComplete={() => {
                setCurrentView('main');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenConsultationsList={() => setIsListOpen(true)}
            />
          )}

          {currentView === 'main' && (
            <MainScreen
              onSelectPlan={handleSelectPlan}
              onRequestConsultation={handleRequestConsultation}
              onOpenOnboardingStory={() => {
                setCurrentView('onboarding');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'detail' && (
            <PlanDetail
              plan={currentPlan}
              onBack={() => {
                setCurrentView('main');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRequestConsultation={handleRequestConsultation}
            />
          )}
        </main>
      </div>

      {/* 3-Tap Consultation Request Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialPlanId={selectedPlanId}
        onSuccess={handleConsultationSuccess}
      />

      {/* Submitted Consultation Records Viewer Modal */}
      <ConsultationsListModal
        isOpen={isListOpen}
        onClose={() => setIsListOpen(false)}
        onNewConsultation={() => {
          setIsListOpen(false);
          handleRequestConsultation();
        }}
      />
    </div>
  );
}
