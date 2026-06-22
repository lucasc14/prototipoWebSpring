// ===== Configuração =====
const LIMITE_SCROLL = 10;

// ===== ENTIDADES SEPARADAS =====

// Turmas / laboratórios independentes
const turmas = {
  "2024.1.A": { nome: "Turma 2024.1.A", cozinha: "Padaria Lab 01" },
  "2024.1.C": { nome: "Turma 2024.1.C", cozinha: "Cozinha Pedagógica 02" },
  "2024.2.N": { nome: "Turma 2024.2.N", cozinha: "Cozinha Pedagógica 04" }
};

// RECEITAS
const receitas = {
  confeitaria_bolo: {
    nome: "Bolo de Cenoura com Cobertura",
    local: "08:00 • Cozinha Pedagógica 02",
    itens: [
      { id: "cenoura", nome: "Cenoura Fresca",      necessario: 500,  unidade: "g" },
      { id: "farinha", nome: "Farinha de Trigo",    necessario: 2000, unidade: "g" },
      { id: "acucar",  nome: "Açúcar Refinado",     necessario: 1000, unidade: "g" },
      { id: "ovos",    nome: "Ovos",                necessario: 12,   unidade: "un" },
      { id: "choco",   nome: "Chocolate em Pó 50%", necessario: 300,  unidade: "g" },
      { id: "formas",  nome: "Formas de Bolo",      necessario: 6,    unidade: "un" }
    ]
  },
  confeitaria_torta: {
    nome: "Torta de Maçã Caramelada",
    local: "10:00 • Cozinha Pedagógica 02",
    itens: [
      { id: "farinha",  nome: "Farinha de Trigo", necessario: 1500, unidade: "g" },
      { id: "manteiga", nome: "Manteiga",         necessario: 500,  unidade: "g" },
      { id: "acucar",   nome: "Açúcar Refinado",  necessario: 600,  unidade: "g" },
      { id: "ovos",     nome: "Ovos",             necessario: 4,    unidade: "un" },
      { id: "maca",     nome: "Maçã Verde",       necessario: 1500, unidade: "g" }
    ]
  },
  panificacao_pao: {
    nome: "Pão Francês & Baguete",
    local: "13:30 • Padaria Lab 01",
    itens: [
      { id: "farinha_t1", nome: "Farinha de Trigo Tipo 1",   necessario: 5000, unidade: "g" },
      { id: "fermento",   nome: "Fermento Biológico Fresco", necessario: 250,  unidade: "g" },
      { id: "sal",        nome: "Sal Refinado",              necessario: 100,  unidade: "g" },
      { id: "melhorador", nome: "Melhorador de Farinha",     necessario: 50,   unidade: "g" },
      { id: "agua",       nome: "Água Filtrada",             necessario: 3000, unidade: "ml" },
      { id: "assadeiras", nome: "Formas / Assadeiras",       necessario: 6,    unidade: "un" }
    ]
  },
  panificacao_brioche: {
    nome: "Brioche Amanteigado",
    local: "15:30 • Padaria Lab 01",
    itens: [
      { id: "farinha_t1", nome: "Farinha de Trigo Tipo 1",   necessario: 2000, unidade: "g" },
      { id: "fermento",   nome: "Fermento Biológico Fresco", necessario: 100,  unidade: "g" },
      { id: "manteiga_p", nome: "Manteiga Premium",          necessario: 800,  unidade: "g" },
      { id: "ovos_p",     nome: "Ovos",                      necessario: 10,   unidade: "un" },
      { id: "acucar_p",   nome: "Açúcar Refinado",           necessario: 400,  unidade: "g" }
    ]
  },
  asia_yakisoba: {
    nome: "Yakisoba & Tempurá de Legumes",
    local: "19:00 • Cozinha Pedagógica 04",
    itens: [
      { id: "macarrao", nome: "Macarrão para Yakisoba", necessario: 2000, unidade: "g" },
      { id: "shoyu",    nome: "Molho Shoyu",            necessario: 1000, unidade: "ml" },
      { id: "gengibre", nome: "Gengibre Fresco",        necessario: 200,  unidade: "g" },
      { id: "legumes",  nome: "Legumes Variados",       necessario: 3000, unidade: "g" },
      { id: "oleo",     nome: "Óleo para Fritura",      necessario: 5000, unidade: "ml" },
      { id: "tempura",  nome: "Farinha Tempurá",        necessario: 1000, unidade: "g" }
    ]
  },
  asia_sushi: {
    nome: "Sushi & Sashimi Tradicional",
    local: "20:30 • Cozinha Pedagógica 04",
    itens: [
      { id: "arroz",    nome: "Arroz para Sushi", necessario: 1500, unidade: "g" },
      { id: "shoyu",    nome: "Molho Shoyu",      necessario: 500,  unidade: "ml" },
      { id: "gengibre", nome: "Gengibre Fresco",  necessario: 150,  unidade: "g" },
      { id: "salmao",   nome: "Salmão Fresco",    necessario: 1000, unidade: "g" },
      { id: "alga",     nome: "Alga Nori",        necessario: 100,  unidade: "un" }
    ]
  }
};

const receitasPorTurma = {
  "2024.1.A": ["panificacao_pao", "panificacao_brioche"],
  "2024.1.C": ["confeitaria_bolo", "confeitaria_torta"],
  "2024.2.N": ["asia_yakisoba", "asia_sushi"]
};

// Utensílios por ficha
const utensiliosFicha = {
  confeitaria_bolo: [
    { id: "batedeira", nome: "Batedeira Planetária", necessario: 1, unidade: "un" },
    { id: "tigelas",   nome: "Tigelas Inox",         necessario: 4, unidade: "un" },
    { id: "espatula",  nome: "Espátula de Silicone", necessario: 3, unidade: "un" },
    { id: "balanca",   nome: "Balança Digital",      necessario: 1, unidade: "un" }
  ],
  confeitaria_torta: [
    { id: "rolo",     nome: "Rolo de Massa",        necessario: 2, unidade: "un" },
    { id: "formas_t", nome: "Formas de Torta",      necessario: 4, unidade: "un" },
    { id: "balanca",  nome: "Balança Digital",      necessario: 1, unidade: "un" }
  ],
  panificacao_pao: [
    { id: "masseira", nome: "Masseira / Amassadeira",   necessario: 1, unidade: "un" },
    { id: "forno",    nome: "Forno de Lastro",          necessario: 1, unidade: "un" },
    { id: "cestas",   nome: "Cestas de Fermentação",    necessario: 8, unidade: "un" },
    { id: "lamina",   nome: "Lâmina de Corte (grigne)", necessario: 2, unidade: "un" }
  ],
  panificacao_brioche: [
    { id: "masseira", nome: "Masseira / Amassadeira", necessario: 1, unidade: "un" },
    { id: "forno",    nome: "Forno de Lastro",        necessario: 1, unidade: "un" },
    { id: "formas_b", nome: "Formas de Brioche",      necessario: 6, unidade: "un" }
  ],
  asia_yakisoba: [
    { id: "wok",        nome: "Wok",             necessario: 2, unidade: "un" },
    { id: "fritadeira", nome: "Fritadeira",      necessario: 1, unidade: "un" },
    { id: "escumadeira",nome: "Escumadeira",     necessario: 2, unidade: "un" },
    { id: "tabuas",     nome: "Tábuas de Corte", necessario: 4, unidade: "un" }
  ],
  asia_sushi: [
    { id: "esteira",  nome: "Esteira de Bambu",  necessario: 4, unidade: "un" },
    { id: "faca_s",   nome: "Faca Yanagiba",     necessario: 2, unidade: "un" },
    { id: "tabuas",   nome: "Tábuas de Corte",   necessario: 4, unidade: "un" }
  ]
};

// Estoque Isolado por Turma
const estoquePorTurma = {
  "2024.1.A": {
    insumos: { farinha_t1: 8000, fermento: 400, sal: 200, melhorador: 80, agua: 6000, assadeiras: 6, manteiga_p: 1000, ovos_p: 24, acucar_p: 600 },
    utensilios: { masseira: 1, forno: 1, cestas: 8, lamina: 2, formas_b: 6 }
  },
  "2024.1.C": {
    insumos: { cenoura: 800, farinha: 4000, acucar: 2000, ovos: 24, choco: 500, formas: 6, manteiga: 700, maca: 2000 },
    utensilios: { batedeira: 1, tigelas: 4, espatula: 3, balanca: 1, rolo: 2, formas_t: 4 }
  },
  "2024.2.N": {
    insumos: { macarrao: 3000, shoyu: 2000, gengibre: 500, legumes: 4000, oleo: 8000, tempura: 1500, arroz: 2500, salmao: 1500, alga: 200 },
    utensilios: { wok: 2, fritadeira: 1, escumadeira: 2, tabuas: 4, esteira: 4, faca_s: 2 }
  }
};

const observacoes = {}; 

let receitaAtual;
let turmaAtual;

const $ = id => document.getElementById(id);

function estoqueDisponivel(tipo, id) {
  const e = estoquePorTurma[turmaAtual];
  if (!e) return 0;
  return (tipo === 'util' ? e.utensilios : e.insumos)?.[id] ?? 0;
}

function statusItem(tipo, item) {
  const disp = estoqueDisponivel(tipo, item.id);
  if (disp >= item.necessario) return { st: 'ok',    label: 'OK',     ok: true  };
  if (disp === 0)              return { st: 'falta', label: 'Falta',  ok: false };
  return { st: 'baixo', label: `Falta ${item.necessario - disp}${item.unidade}`, ok: false };
}

function obsKey(tipo, id) { return `${turmaAtual}|${receitaAtual}|${tipo}|${id}`; }

// ===== Configuração Unificada dos Painéis =====
const painels = {
  main: {
    tipo: 'insumo', 
    getItens: () => receitas[receitaAtual].itens,
    lista: $('checklist-main'), 
    name: $('recipe-name'), 
    loc: $('recipe-loc'), 
    badge: $('turma-badge'),
    pText: $('main-progress-text'), 
    pPct: $('main-progress-pct'), 
    pBar: $('main-progress-bar'),
    rotulo: 'Checklist da Aula'
  },
  util: {
    tipo: 'util', 
    getItens: () => utensiliosFicha[receitaAtual] || [],
    lista: $('util-checklist'), 
    name: $('util-recipe-name'), 
    loc: $('util-recipe-loc'), 
    badge: $('util-turma-badge'),
    pText: $('util-progress-text'), 
    pPct: $('util-progress-pct'), 
    pBar: $('util-progress-bar'),
    rotulo: 'Lista de utensílios'
  }
};

const select = $('recipe-select');
const turmaSelect = $('turma-select');

function aplicarScrollAdaptativo(container, qtd, rotulo) {
  const ativar = qtd > LIMITE_SCROLL;
  container.classList.toggle('is-scrollable', ativar);
  if (ativar) {
    container.setAttribute('role', 'region');
    container.setAttribute('tabindex', '0');
    container.setAttribute('aria-label', `${rotulo}: ${qtd} itens.`);
  } else {
    container.removeAttribute('role');
    container.removeAttribute('tabindex');
    container.removeAttribute('aria-label');
  }
}

function updateProgress(p) {
  const itens = p.getItens();
  const total = itens.length;
  const done  = itens.filter(i => statusItem(p.tipo, i).ok).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  if(p.pText) p.pText.textContent = `${done} de ${total} itens em estoque`;
  if(p.pPct)  p.pPct.textContent  = pct;
  if(p.pBar)  p.pBar.style.width  = pct + '%';
}

function renderPainel(p) {
  const receita = receitas[receitaAtual];
  const turma = turmas[turmaAtual];

  if (!receita || !turma) return;

  if (p.name) p.name.textContent = receita.nome;
  if (p.loc) p.loc.textContent  = receita.local;
  if (p.badge) p.badge.textContent = `${turma.nome} • ${turma.cozinha}`;

  const itens = p.getItens();
  p.lista.innerHTML = itens.map((it) => {
    const disp = estoqueDisponivel(p.tipo, it.id);
    const s = statusItem(p.tipo, it);
    const obs = observacoes[obsKey(p.tipo, it.id)];
    
    let tagHtml = `<span class="estoque-tag ${s.st}">${s.label}</span>`;
    let disabledAttr = `disabled`;
    
    // Suporte para visualização de Item Pendente
    if (it.pendente) {
      tagHtml = `<span class="estoque-tag baixo" style="background:#fff3cd; color:#856404; border-color:#ffeeba;">Pendente Aprovação</span>`;
      disabledAttr = `disabled`; 
    }

    const clsEstoque = it.pendente ? 'estoque-baixo' : (s.st === 'ok' ? '' : (s.st === 'falta' ? 'estoque-falta' : 'estoque-baixo'));
    
    return `
      <label class="check-item ${obs ? 'has-obs' : ''} ${clsEstoque}">
        <input type="checkbox" data-id="${it.id}" ${s.ok && !it.pendente ? 'checked' : ''} ${disabledAttr}>
        <span class="check-box"><span class="material-symbols-outlined">check</span></span>
        <span class="check-label" data-obs="${it.id}">${it.nome}</span>
        <span class="obs-flag" title="${obs || ''}"><span class="material-symbols-outlined">sticky_note_2</span></span>
        ${tagHtml}
        <span class="check-qty">${it.pendente ? '?' : disp}/${it.necessario}${it.unidade}</span>
      </label>`;
  }).join('');

  updateProgress(p);
  aplicarScrollAdaptativo(p.lista, itens.length, p.rotulo);
}

function renderTudo() {
  renderPainel(painels.main);
  renderPainel(painels.util);
}

function configurarPainel(p, btnResetId) {
  p.lista.addEventListener('click', e => {
    const label = e.target.closest('.check-label');
    if (label) {
      e.preventDefault();
      abrirObs(p.tipo, label.dataset.obs);
    }
  });

  if(btnResetId && $(btnResetId)) {
    $(btnResetId).addEventListener('click', () => {
      const e = estoquePorTurma[turmaAtual];
      const bucket = p.tipo === 'util' ? e.utensilios : e.insumos;
      p.getItens().forEach(i => bucket[i.id] = 0);
      renderPainel(p);
    });
  }
}

configurarPainel(painels.main, 'main-btn-reset'); 
configurarPainel(painels.util, 'util-btn-reset');


// ===== MODAL DE INSUMO EXTRA =====
const extraModal = $('extra-modal');

if($('btn-add-insumo')) {
  $('btn-add-insumo').addEventListener('click', () => {
    $('extra-name').value = '';
    $('extra-qtd').value = '';
    $('extra-un').value = '';
    $('extra-obs').value = '';
    extraModal.classList.add('show');
    $('extra-name').focus();
  });
}

function fecharModalExtra() { extraModal.classList.remove('show'); }

$('extra-close').addEventListener('click', fecharModalExtra);
$('extra-cancel').addEventListener('click', fecharModalExtra);
extraModal.addEventListener('click', e => { if (e.target === extraModal) fecharModalExtra(); });

$('extra-save').addEventListener('click', () => {
  const nome = $('extra-name').value.trim();
  if (!nome) return alert("Por favor, insira o nome do insumo.");
  
  const necessario = parseFloat($('extra-qtd').value) || 0;
  const unidade = $('extra-un').value.trim() || 'un';
  const obs = $('extra-obs').value.trim();
  const id = 'item_extra_' + Date.now();

  painels.main.getItens().push({ id, nome, necessario, unidade, pendente: true });
  
  const e = estoquePorTurma[turmaAtual];
  e.insumos[id] = 0; 
  
  // Se o usuário digitou uma observação, salva e vincula
  if (obs) observacoes[obsKey('insumo', id)] = obs;

  renderPainel(painels.main);
  fecharModalExtra();
  
  // Atualiza as notificações globais para gerar o sininho
  if (window.atualizarNotificacoes) window.atualizarNotificacoes();
  
  alert(`A solicitação urgente para "${nome}" foi enviada para o Desktop de Gestão de Estoque.`);
});


// ===== MODAL DE UTENSÍLIO EXTRA =====
const utilModal = $('util-modal');

if($('btn-add-util')) {
  $('btn-add-util').addEventListener('click', () => {
    $('util-name').value = '';
    $('util-qtd').value = '';
    $('util-obs').value = '';
    utilModal.classList.add('show');
    $('util-name').focus();
  });
}

function fecharModalUtil() { utilModal.classList.remove('show'); }

$('util-close').addEventListener('click', fecharModalUtil);
$('util-cancel').addEventListener('click', fecharModalUtil);
utilModal.addEventListener('click', e => { if (e.target === utilModal) fecharModalUtil(); });

$('util-save').addEventListener('click', () => {
  const nome = $('util-name').value.trim();
  if (!nome) return alert("Por favor, insira o nome do utensílio.");
  
  const necessario = parseFloat($('util-qtd').value) || 0;
  const obs = $('util-obs').value.trim();
  const id = 'item_util_' + Date.now();

  (utensiliosFicha[receitaAtual] = utensiliosFicha[receitaAtual] || []);
  
  // Adiciona a flag pendente: true para bloquear o checklist e solicitar aprovação
  painels.util.getItens().push({ id, nome, necessario, unidade: 'un', pendente: true });

  const e = estoquePorTurma[turmaAtual];
  e.utensilios[id] = 0;

  if (obs) observacoes[obsKey('util', id)] = obs;

  renderPainel(painels.util);
  fecharModalUtil();
  
  // Atualiza as notificações globais para gerar o sininho
  if (window.atualizarNotificacoes) window.atualizarNotificacoes();
  
  alert(`A solicitação de empréstimo para o utensílio "${nome}" foi enviada para o Desktop de Gestão de Estoque.`);
});


// ===== Troca de receita / turma =====
function trocarReceita(key) {
  const permitidas = receitasPorTurma[turmaAtual] || Object.keys(receitas);
  if (!receitas[key] || !permitidas.includes(key)) key = permitidas[0];
  receitaAtual = key;
  if (select) select.value = key;
  renderTudo();
  highlightCard(key);
}

function popularReceitasDaTurma(turmaKey) {
  const permitidas = receitasPorTurma[turmaKey] || Object.keys(receitas);
  select.innerHTML = permitidas
    .map(id => `<option value="${id}">${receitas[id].local} • ${receitas[id].nome}</option>`)
    .join('');
}

function trocarTurma(key) {
  if (!turmas[key]) key = '2024.1.A';
  turmaAtual = key;
  if (turmaSelect) turmaSelect.value = key;

  popularReceitasDaTurma(key);
  const permitidas = receitasPorTurma[key] || Object.keys(receitas);
  if (!permitidas.includes(receitaAtual)) {
    receitaAtual = permitidas[0];
  }
  select.value = receitaAtual;

  renderTudo();
  highlightCard(receitaAtual);
}

select.addEventListener('change', e => trocarReceita(e.target.value));
turmaSelect.addEventListener('change', e => trocarTurma(e.target.value));

turmaSelect.innerHTML = Object.entries(turmas)
  .map(([k, t]) => `<option value="${k}">${t.nome} — ${t.cozinha}</option>`).join('');

document.querySelectorAll('.class-card').forEach(card => {
  const recipeKey = card.dataset.recipe;
  const turmaKey  = card.dataset.turma;
  const link = card.querySelector('.recipe-link');
  if (link && recipeKey) {
    link.addEventListener('click', () => {
      if (turmaKey && turmas[turmaKey]) trocarTurma(turmaKey);
      trocarReceita(recipeKey);
      painels.main.lista.closest('.checklist-card')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

function highlightCard(key) {
  document.querySelectorAll('.class-card').forEach(c =>
    c.classList.toggle('selected', c.dataset.recipe === key)
  );
}

// Menu Mobile
const menuBtn = $('menu-toggle');
const sidebar = $('sidebar');
const overlay = $('overlay');

function toggleSidebar(open) {
  sidebar.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
}
menuBtn?.addEventListener('click', () => toggleSidebar(!sidebar.classList.contains('open')));
overlay?.addEventListener('click', () => toggleSidebar(false));

document.querySelectorAll('button').forEach(el => {
  el.addEventListener('mousedown',  () => el.style.transform = 'scale(0.97)');
  el.addEventListener('mouseup',    () => el.style.transform = 'scale(1)');
  el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
});

// Modal de observação
const obsModal = $('obs-modal');
const obsName  = $('obs-item-name');
const obsText  = $('obs-text');
let obsIdAtual   = null;
let obsTipoAtual = null;

function abrirObs(tipo, id) {
  obsTipoAtual = tipo;
  obsIdAtual   = id;
  const panel = painels[tipo] || painels.main; 
  const item = panel.getItens().find(i => i.id === id);
  obsName.textContent = item ? item.nome : '';
  obsText.value = observacoes[obsKey(tipo, id)] || '';
  obsModal.classList.add('show');
  obsText.focus();
}

function fecharObs() {
  obsModal.classList.remove('show');
  obsIdAtual = null;
  obsTipoAtual = null;
}

$('obs-save').addEventListener('click', () => {
  if (obsIdAtual && obsTipoAtual) {
    observacoes[obsKey(obsTipoAtual, obsIdAtual)] = obsText.value.trim();
    renderPainel(painels[obsTipoAtual]);
  }
  fecharObs();
});

$('obs-close').addEventListener('click', fecharObs);
$('obs-cancel').addEventListener('click', fecharObs);
obsModal.addEventListener('click', e => { if (e.target === obsModal) fecharObs(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharObs(); });


// ===== Inicialização =====
turmaAtual   = '2024.1.A';
turmaSelect.value = turmaAtual;
popularReceitasDaTurma(turmaAtual);
receitaAtual = (receitasPorTurma[turmaAtual] || Object.keys(receitas))[0];
select.value = receitaAtual;

renderTudo();
highlightCard(receitaAtual);

// ===== CALENDÁRIO INTERATIVO =====
(function () {
  const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const FERIADOS = {
    '01-01': 'Ano Novo', '04-21': 'Tiradentes', '05-01': 'Trabalho',
    '09-07': 'Independência', '10-12': 'N. Sra.', '11-15': 'República',
    '12-25': 'Natal', '06-19': 'Recesso', '07-09': 'Recesso'
  };

  const cozinhaToValue = {
    "Padaria Lab 01":        "lab01",
    "Cozinha Pedagógica 02": "lab02",
    "Cozinha Pedagógica 04": "lab04"
  };

  const fichasDisponiveis = [
    { id: 'confeitaria_bolo',     nome: 'Confeitaria: Bolo de Cenoura', turma: '2024.1.C' },
    { id: 'confeitaria_torta',    nome: 'Confeitaria: Torta de Maçã',   turma: '2024.1.C' },
    { id: 'panificacao_pao',      nome: 'Panificação: Pão & Baguete',   turma: '2024.1.A' },
    { id: 'panificacao_brioche',  nome: 'Panificação: Brioche',         turma: '2024.1.A' },
    { id: 'asia_yakisoba',        nome: 'Ásia: Yakisoba & Tempurá',     turma: '2024.2.N' },
    { id: 'asia_sushi',           nome: 'Ásia: Sushi & Sashimi',        turma: '2024.2.N' }
  ];

  const alocacoes = JSON.parse(localStorage.getItem('sigec-alocacoes') || '{}');
  function salvar() { localStorage.setItem('sigec-alocacoes', JSON.stringify(alocacoes)); }

  let viewDate = new Date(2026, 5, 1);
  let diaSelecionado = null;
  let calFiltroCozinha = 'todas';

  const modal      = document.getElementById('cal-modal');
  const grid       = document.getElementById('cal-grid');
  const monthEl    = document.getElementById('cal-month');
  const kitchenSel = document.getElementById('cal-kitchen');

  const pad = n => String(n).padStart(2, '0');
  const chave = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const mmdd  = d => `${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

  function fichaPassaFiltro(f) {
    if (!f) return false;
    const turmaInfo = turmas[f.turma];
    const cozValue = turmaInfo ? (cozinhaToValue[turmaInfo.cozinha] || turmaInfo.cozinha) : '';
    return calFiltroCozinha === 'todas' || cozValue === calFiltroCozinha;
  }

  function statusEstoque(ficha) {
    const r = receitas[ficha.id];
    if (!r) return { classe: 'stock-out', txt: 'Sem ficha' };
    const e = estoquePorTurma[ficha.turma];
    if (!e) return { classe: 'stock-out', txt: 'Turma sem estoque' };
    const total = r.itens.length;
    let ok = 0, algum = 0;
    r.itens.forEach(it => {
      const disp = e.insumos?.[it.id] ?? 0;
      if (disp >= it.necessario) ok++;
      if (disp > 0) algum++;
    });
    if (ok === total) return { classe: 'stock-ok',  txt: 'Estoque OK' };
    if (algum === 0)  return { classe: 'stock-out', txt: 'Sem estoque' };
    return { classe: 'stock-low', txt: `${total - ok} item(s) em falta` };
  }

  function fichaBloqueada(ficha) {
    return statusEstoque(ficha).classe !== 'stock-ok';
  }

  function render() {
    const ano = viewDate.getFullYear();
    const mes = viewDate.getMonth();
    monthEl.textContent = `${MESES[mes]} ${ano}`;

    const primeiro = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const hoje = chave(new Date());

    let html = '';
    for (let i = 0; i < primeiro; i++) html += `<div class="cal-day empty"></div>`;

    for (let d = 1; d <= diasNoMes; d++) {
      const data = new Date(ano, mes, d);
      const k = chave(data);
      const dow = data.getDay();
      const feriado = FERIADOS[mmdd(data)];
      const fimDeSemana = dow === 0 || dow === 6;

      let cls = 'cal-day';
      if (k === hoje) cls += ' today';
      if (fimDeSemana) cls += ' weekend';
      if (feriado) cls += ' holiday';

      const aulas = (alocacoes[k] || []).filter(id => {
        const f = fichasDisponiveis.find(x => x.id === id);
        return fichaPassaFiltro(f);
      });
      const dots = aulas.map(() => '<i></i>').join('');

      html += `
        <div class="${cls}" data-date="${k}">
          <span class="cal-day-num">${d}</span>
          ${feriado ? `<span class="cal-day-tag">${feriado}</span>` : ''}
          <div class="cal-day-dots">${dots}</div>
        </div>`;
    }
    grid.innerHTML = html;
  }

  function renderPainelCal(k) {
    document.getElementById('cal-panel-empty').style.display = 'none';
    document.getElementById('cal-panel-content').style.display = 'block';

    const [y, m, d] = k.split('-');
    const data = new Date(y, m - 1, d);
    document.getElementById('cal-panel-date').textContent =
      data.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });

    const aulas = (alocacoes[k] || []).filter(id => {
      const f = fichasDisponiveis.find(x => x.id === id);
      return fichaPassaFiltro(f);
    });

    const elAloc = document.getElementById('cal-allocated');
    elAloc.innerHTML = aulas.length ? aulas.map(id => {
      const f = fichasDisponiveis.find(x => x.id === id);
      const st = statusEstoque(f || { id });
      return `
        <div class="cal-fiche">
          <div class="cal-fiche-info">
            <p class="cal-fiche-name">${f ? f.nome : id} <small>(${f ? f.turma : ''})</small></p>
            <p class="cal-fiche-stock ${st.classe}">
              <span class="material-symbols-outlined sm">inventory_2</span>${st.txt}
            </p>
          </div>
          <button class="cal-fiche-btn remove" data-remove="${id}" title="Remover">
            <span class="material-symbols-outlined sm">delete</span>
          </button>
        </div>`;
    }).join('') : '<p class="cal-empty-text">Nenhuma ficha alocada para o filtro atual.</p>';

    const elDisp = document.getElementById('cal-available');
    const alocadasDoDia = alocacoes[k] || [];
    const livres = fichasDisponiveis.filter(f =>
      fichaPassaFiltro(f) && !alocadasDoDia.includes(f.id)
    );
    elDisp.innerHTML = livres.length ? livres.map(f => {
      const st = statusEstoque(f);
      const bloqueada = fichaBloqueada(f);
      return `
        <div class="cal-fiche ${bloqueada ? 'is-blocked' : ''}">
          <div class="cal-fiche-info">
            <p class="cal-fiche-name">${f.nome} <small>(${f.turma})</small></p>
            <p class="cal-fiche-stock ${st.classe}">
              <span class="material-symbols-outlined sm">inventory_2</span>${st.txt}
            </p>
            ${bloqueada ? `
              <p class="cal-fiche-locked">
                <span class="material-symbols-outlined sm">lock</span>
                Indisponível — insumos insuficientes
              </p>` : ''}
          </div>
          ${bloqueada
            ? `<button class="cal-fiche-btn locked" disabled title="Estoque insuficiente">
                 <span class="material-symbols-outlined sm">block</span>
               </button>`
            : `<button class="cal-fiche-btn" data-add="${f.id}" title="Alocar">
                 <span class="material-symbols-outlined sm">add_circle</span>
               </button>`
          }
        </div>`;
    }).join('') : '<p class="cal-empty-text">Nenhuma ficha disponível para o filtro atual.</p>';
  }

  grid.addEventListener('click', e => {
    const dia = e.target.closest('.cal-day');
    if (!dia || dia.classList.contains('empty')) return;
    if (dia.classList.contains('weekend') || dia.classList.contains('holiday')) {
      alert('Dia indisponível (fim de semana, feriado ou recesso).');
      return;
    }
    grid.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
    dia.classList.add('selected');
    diaSelecionado = dia.dataset.date;
    renderPainelCal(diaSelecionado);
  });

  document.getElementById('cal-day-panel').addEventListener('click', e => {
    const addBtn = e.target.closest('[data-add]');
    const remBtn = e.target.closest('[data-remove]');
    if (!diaSelecionado) return;

    if (addBtn) {
      const id = addBtn.dataset.add;
      const f = fichasDisponiveis.find(x => x.id === id);

      if (!f || fichaBloqueada(f)) {
        alert(`🚫 Alocação bloqueada.\nReponha o estoque antes de agendar.`);
        return;
      }
      
      const alocacoesNoDia = alocacoes[diaSelecionado] || [];
      const cozinhaDaFichaAtual = turmas[f.turma].cozinha;
      
      const conflito = alocacoesNoDia.some(idAlocado => {
        const fichaAlocada = fichasDisponiveis.find(x => x.id === idAlocado);
        if (fichaAlocada) {
          const cozinhaAlocada = turmas[fichaAlocada.turma].cozinha;
          return cozinhaAlocada === cozinhaDaFichaAtual;
        }
        return false;
      });

      if (conflito) {
        alert(`⚠️ Conflito de Agenda!\nA ${cozinhaDaFichaAtual} já está ocupada por outra turma neste dia. Cancele a aula anterior ou escolha outro dia.`);
        return;
      }

      (alocacoes[diaSelecionado] = alocacoes[diaSelecionado] || []).push(id);
    }
    if (remBtn) {
      alocacoes[diaSelecionado] =
        (alocacoes[diaSelecionado] || []).filter(x => x !== remBtn.dataset.remove);
      if (!alocacoes[diaSelecionado].length) delete alocacoes[diaSelecionado];
    }
    salvar();
    render();
    grid.querySelector(`[data-date="${diaSelecionado}"]`)?.classList.add('selected');
    renderPainelCal(diaSelecionado);
  });

  document.getElementById('cal-prev').addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() - 1); render();
  });
  document.getElementById('cal-next').addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() + 1); render();
  });

  kitchenSel?.addEventListener('change', e => {
    calFiltroCozinha = e.target.value;
    render();
    if (diaSelecionado) renderPainelCal(diaSelecionado);
  });

  function abrir() {
    modal.classList.add('show');
    render();
  }
  function fechar() { modal.classList.remove('show'); }

  document.getElementById('cal-close').addEventListener('click', fechar);
  modal.addEventListener('click', e => { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  document.querySelectorAll('.link-btn').forEach(btn => {
    if (btn.textContent.includes('Calendário')) btn.addEventListener('click', abrir);
  });
})();

// ===== NOTIFICAÇÕES (AGORA COM ITENS PENDENTES) =====
(function () {
  const btn    = document.getElementById('notif-btn');
  const panel  = document.getElementById('notif-panel');
  const list   = document.getElementById('notif-list');
  const badge  = document.getElementById('notif-badge');
  const clear  = document.getElementById('notif-clear');
  if (!btn || !panel) return;

  function fichaTurmaMap() {
    const map = {};
    Object.entries(receitasPorTurma).forEach(([turmaId, fichas]) => {
      fichas.forEach(f => map[f] = turmaId);
    });
    return map;
  }

  function gerarNotificacoes() {
    const notifs = [];
    const lidas = JSON.parse(localStorage.getItem('sigec-notif-lidas') || '[]');
    const fichaTurma = fichaTurmaMap();

    Object.entries(receitas).forEach(([fichaId, receita]) => {
      const turmaId = fichaTurma[fichaId];
      if (!turmaId) return;
      const est = estoquePorTurma[turmaId];
      if (!est) return;

      // 1. Notifica sobre Insumos Pendentes e em Falta
      receita.itens.forEach(item => {
        const id = `${turmaId}-${fichaId}-insumo-${item.id}`;
        
        if (item.pendente) {
          notifs.push({
            id, tipo: 'info',
            titulo: `Aprovação Pendente`,
            texto: `Aguardando liberação do insumo extra: ${item.nome}.`
          });
        } else {
          const disp = est.insumos?.[item.id] ?? 0;
          if (disp === 0) {
            notifs.push({
              id, tipo: 'err',
              titulo: `Sem estoque: ${item.nome}`,
              texto: `${turmas[turmaId].nome} • ${receita.nome} — falta tudo (${item.necessario}${item.unidade}).`
            });
          } else if (disp < item.necessario) {
            notifs.push({
              id, tipo: 'warn',
              titulo: `Estoque baixo: ${item.nome}`,
              texto: `${turmas[turmaId].nome} • falta ${item.necessario - disp}${item.unidade} de ${item.nome}.`
            });
          }
        }
      });

      // 2. Notifica sobre Utensílios Pendentes
      const utensilios = utensiliosFicha[fichaId] || [];
      utensilios.forEach(item => {
        const id = `${turmaId}-${fichaId}-util-${item.id}`;
        if (item.pendente) {
          notifs.push({
            id, tipo: 'info',
            titulo: `Aprovação Pendente`,
            texto: `Aguardando liberação do utensílio extra: ${item.nome}.`
          });
        }
      });
    });

    return notifs.map(n => ({ ...n, lida: lidas.includes(n.id) }));
  }

  function render() {
    const notifs = gerarNotificacoes();
    const naoLidas = notifs.filter(n => !n.lida).length;
    badge.hidden = naoLidas === 0;

    if (!notifs.length) {
      list.innerHTML = `<p class="notif-empty">🎉 Tudo certo! Nenhuma pendência.</p>`;
      return;
    }

    const icone = { err: 'error', warn: 'warning', info: 'schedule' };
    list.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.lida ? '' : 'unread'}">
        <span class="notif-icon ${n.tipo}">
          <span class="material-symbols-outlined">${icone[n.tipo]}</span>
        </span>
        <div class="notif-body">
          <p class="notif-title">${n.titulo}</p>
          <p class="notif-text">${n.texto}</p>
        </div>
      </div>`).join('');
  }
  
  // Expõe a função globalmente para podermos chamá-la ao criar um item extra
  window.atualizarNotificacoes = render;

  function marcarTodasLidas() {
    const ids = gerarNotificacoes().map(n => n.id);
    localStorage.setItem('sigec-notif-lidas', JSON.stringify(ids));
    render();
  }

  function toggle(open) {
    const abrir = open ?? !panel.classList.contains('show');
    panel.classList.toggle('show', abrir);
    btn.setAttribute('aria-expanded', abrir);
    if (abrir) render();
  }

  btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });
  clear.addEventListener('click', marcarTodasLidas);

  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) toggle(false);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  render();
})();