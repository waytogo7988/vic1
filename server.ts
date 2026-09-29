import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'consultations.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial realistic seed consultations
if (!fs.existsSync(DATA_FILE)) {
  const initialConsultations = [
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
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialConsultations, null, 2), 'utf-8');
}

// Helper to read consultations
function getConsultations() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading consultations:', e);
    return [];
  }
}

// Helper to write consultations
function saveConsultations(data: unknown[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving consultations:', e);
  }
}

// GET: All consultations
app.get('/api/consultations', (_req, res) => {
  const consultations = getConsultations();
  res.json({ success: true, consultations });
});

// POST: Save new consultation
app.post('/api/consultations', (req, res) => {
  const { name, phone, planId, planName, childAge, referral, memo } = req.body;
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

  const list = getConsultations();
  list.unshift(newEntry);
  saveConsultations(list);

  res.json({ success: true, consultation: newEntry });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Kid's Book Atelier] App running at http://0.0.0.0:${port}`);
  });
}

startServer();
