import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

interface VercelRequest extends IncomingMessage {
  body: any;
  query: { [key: string]: string | string[] };
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => VercelResponse;
}

// In-memory / /tmp fallback store for serverless environments
let memoryConsultations: any[] = [
  {
    id: 'c-1790678001',
    name: '이수진 (판교)',
    phone: '010-3841-9281',
    planId: 'masterpiece',
    planName: '마스터피스 플랜 (월 7.9만원)',
    childAge: '5~6세',
    referral: '판교 맘카페 추천',
    memo: '판교 백현마을 거주 워킹맘입니다. 아이가 유치원에서 그린 크레파스 그림이 50장 넘게 쌓여있는데, 분기 1권 출판 시 전문가 선별 방식과 샘플 사전 확인 절차가 궁금합니다.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    status: '상담대기'
  },
  {
    id: 'c-1790678002',
    name: '김태희 (분당)',
    phone: '010-9283-1492',
    planId: 'curation',
    planName: '큐레이션 독서 플랜 (월 3.9만원)',
    childAge: '3~4세',
    referral: '인스타그램',
    memo: '칼데콧 수상작 큐레이션 독서 위주로 먼저 시작해보고 나중에 하드커버 출판으로 업그레이드하고 싶어요.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 22).toISOString(),
    status: '상담완료'
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, consultations: memoryConsultations });
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      }

      const { name, phone, planId, planName, childAge, referral, memo } = body || {};
      if (!name || !phone) {
        return res.status(400).json({ success: false, error: '성함과 연락처를 입력해 주세요.' });
      }

      const newEntry = {
        id: 'c-' + Date.now(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        planId: planId || 'masterpiece',
        planName: planName || '마스터피스 플랜 (월 7.9만원)',
        childAge: childAge || '5~6세',
        referral: referral || '인스타그램',
        memo: memo ? String(memo).trim() : '',
        createdAt: new Date().toISOString(),
        status: '상담대기'
      };

      memoryConsultations.unshift(newEntry);
      return res.status(200).json({ success: true, consultation: newEntry });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
