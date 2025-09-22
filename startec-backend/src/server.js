const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve arquivos estáticos do frontend
// Coloque seu HTML/CSS/JS em /public (pode copiar do repositório)
app.use(express.static(path.join(__dirname, 'public')));

// --- Dados em memória (pode trocar por DB) ---
const users = [
  { id: 'u1', name: 'Usuário Demo', email: 'demo@startec.com', password: '123123', coins: 100 }
];

const simulados = [
  { id: 's1', title: 'Simulado Matemática 1', questions: 40, duration: 60 },
  { id: 's2', title: 'Simulado Português 1', questions: 35, duration: 50 }
];

const trilhas = [
  { id: 't1', title: 'Trilha Frontend', lessons: 12 },
  { id: 't2', title: 'Trilha Backend', lessons: 10 }
];

const videoaulas = [
  { id: 'v1', title: 'Aula 1 - Introdução', url: '/videoaulas/aula1.mp4' },
  { id: 'v2', title: 'Aula 2 - Conceitos', url: '/videoaulas/aula2.mp4' }
];

const lojaItems = [
  { id: 'p1', name: 'Caneca Startec', price: 50, stock: 10 },
  { id: 'p2', name: 'Camiseta Startec', price: 120, stock: 5 }
];

const recompensas = [
  { id: 'r1', title: 'Badge Concluidor', cost: 0 },
  { id: 'r2', title: 'Cupom 10%', cost: 100 }
];

const radar = {
  metrics: { activeUsers: 1234, averageScore: 78.6 }
};

const incentivo = {
  description: 'Complete 3 trilhas e ganhe 50 coins',
  progressExamples: [{ userId: 'u1', progress: 0.3 }]
};

// --- Rotas API ---

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// --- Auth simples (demo) ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  // Em ambiente real use JWT ou sessions
  const token = uuidv4();
  // para demo retornamos token simples e user id
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, coins: user.coins } });
});

// Signup demo
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password || !name) return res.status(400).json({ error: 'Campos obrigatórios' });
  if (users.some(u => u.email === email)) return res.status(409).json({ error: 'Email já cadastrado' });

  const newUser = { id: uuidv4(), name, email, password, coins: 0 };
  users.push(newUser);
  res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

// --- Conteúdos ---
app.get('/api/simulados', (req, res) => res.json(simulados));
app.get('/api/simulados/:id', (req, res) => {
  const s = simulados.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Simulado não encontrado' });
  res.json(s);
});

app.get('/api/trilhas', (req, res) => res.json(trilhas));
app.get('/api/videoaulas', (req, res) => res.json(videoaulas));

app.get('/api/loja', (req, res) => res.json(lojaItems));
app.post('/api/loja/compra', (req, res) => {
  const { userId, productId } = req.body || {};
  const user = users.find(u => u.id === userId);
  const product = lojaItems.find(p => p.id === productId);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  if (product.stock <= 0) return res.status(400).json({ error: 'Produto sem estoque' });
  if (user.coins < product.price) return res.status(400).json({ error: 'Moedas insuficientes' });

  product.stock -= 1;
  user.coins -= product.price;
  return res.json({ ok: true, product, user: { id: user.id, coins: user.coins } });
});

app.get('/api/recompensas', (req, res) => res.json(recompensas));
app.post('/api/recompensas/resgatar', (req, res) => {
  const { userId, rewardId } = req.body || {};
  const user = users.find(u => u.id === userId);
  const reward = recompensas.find(r => r.id === rewardId);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  if (!reward) return res.status(404).json({ error: 'Recompensa não encontrada' });
  if (user.coins < (reward.cost || 0)) return res.status(400).json({ error: 'Moedas insuficientes' });

  user.coins -= (reward.cost || 0);
  return res.json({ ok: true, user: { id: user.id, coins: user.coins }, reward });
});

app.get('/api/radar', (req, res) => res.json(radar));
app.get('/api/incentivo', (req, res) => res.json(incentivo));

// Fallback para SPA / arquivos estáticos: serve index.html se rota não bate
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next(); // deixa o express tratar 404 de API
  res.sendFile(path.join(__dirname, 'public', 'index.html'), err => {
    if (err) next(err);
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno' });
});

// Start
app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));
