// ===== Configuração =====
const LIMITE_SCROLL = 10;

// ===== ENTIDADES SEPARADAS (RF06) =====

// Turmas / laboratórios independentes
const turmas = {
  "2024.1.A": { nome: "Turma 2024.1.A", cozinha: "Padaria Lab 01" },
  "2024.1.C": { nome: "Turma 2024.1.C", cozinha: "Cozinha Pedagógica 02" },
  "2024.2.N": { nome: "Turma 2024.2.N", cozinha: "Cozinha Pedagógica 04" }
};

// 2 RECEITAS POR TURMA
const receitas = {
  // --- Turma 2024.1.C (Confeitaria) ---
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

  // --- Turma 2024.1.A (Panificação) ---
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

  // --- Turma 2024.2.N (Ásia) ---
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

// ===== RECEITAS PERMITIDAS POR TURMA (RF06) =====
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

// ===== ESTOQUE ISOLADO POR TURMA (RF06) — com folga (todos os itens OK) =====
const estoquePorTurma = {
  "2024.1.A": {
    insumos: {
      farinha_t1: 8000, fermento: 400, sal: 200, melhorador: 80, agua: 6000, assadeiras: 6,
      manteiga_p: 1000, ovos_p: 24, acucar_p: 600
    },
    utensilios: {
      masseira: 1, forno: 1, cestas: 8, lamina: 2, formas_b: 6
    }
  },
  "2024.1.C": {
    insumos: {
      cenoura: 800, farinha: 4000, acucar: 2000, ovos: 24, choco: 500, formas: 6,
      manteiga: 700, maca: 2000
    },
    utensilios: {
      batedeira: 1, tigelas: 4, espatula: 3, balanca: 1, rolo: 2, formas_t: 4
    }
  },
  "2024.2.N": {
    insumos: {
      macarrao: 3000, shoyu: 2000, gengibre: 500, legumes: 4000, oleo: 8000, tempura: 1500,
      arroz: 2500, salmao: 1500, alga: 200
    },
    utensilios: {
      wok: 2, fritadeira: 1, escumadeira: 2, tabuas: 4, esteira: 4, faca_s: 2
    }
  }
};

// Observações por turma+ficha
const observacoes = {}; // chave: `${turma}|${ficha}|${tipo}|${id}`

// ===== Estado atual =====
let receitaAtual;

// ===== Helpers de DOM =====
const $ = id => document.getElementById(id);

// ===== Acesso ao estoque da turma ativa =====
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

// ===== Configuração dos painéis com as NOVAS ABAS =====
const painels = {
  rec: {
    tipo: 'insumo', 
    getItens: () => receitas[receitaAtual].itens,
    lista: $('checklist-rec'), 
    name: $('recipe-name'), 
    loc: $('recipe-loc'), 
    badge: $('turma-badge'),
    pText: $('rec-progress-text'), 
    pPct: $('rec-progress-pct'), 
    pBar: $('rec-progress-bar'),
    rotulo: 'Recebimento do CD'
  },
  exe: {
    tipo: 'insumo', 
    getItens: () => receitas[receitaAtual].itens,
    lista: $('checklist-exe'), 
    pText: $('exe-progress-text'), 
    pPct: $('exe-progress-pct'), 
    pBar: $('exe-progress-bar'),
    rotulo: 'Execução da Aula'
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

// ===== Funções genéricas =====
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
  const done  = itens.filter(i => i.ok).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  p.pText.textContent = `${done} de ${total} itens`;
  p.pPct.textContent  = pct;
  p.pBar.style.width  = pct + '%';
}

function renderPainel(p) {
  const receita = receitas[receitaAtual];
  const turma = turmas[turmaAtual];

  if (!receita || !turma) return;

  if (p.name) p.name.textContent = receita.nome;
  if (p.loc) p.loc.textContent  = receita.local;
  if (p.badge) p.badge.textContent = `${turma.nome} • ${turma.cozinha}`;

  const itens = p.getItens();
  p.lista.innerHTML = itens.map((it, i) => `
    <label class="check-item ${it.obs ? 'has-obs' : ''}">
      <input type="checkbox" data-i="${i}" ${it.ok ? 'checked' : ''}>
      <span class="check-box"><span class="material-symbols-outlined">check</span></span>
      <span class="check-label" data-obs="${i}">${it.nome}</span>
      <span class="obs-flag" title="${it.obs || ''}"><span class="material-symbols-outlined">sticky_note_2</span></span>
      <span class="check-qty">${it.qtd}</span>
    </label>
  `).join('');

  p.lista.innerHTML = html;
  updateProgress(p);
  aplicarScrollAdaptativo(p.lista, itens.length + solics.length, p.rotulo);
}

function renderTudo() {
  renderPainel(painels.rec);
  renderPainel(painels.exe);
  renderPainel(painels.util);
}

// ===== Listeners por painel (marcar, limpar, observação) =====
function configurarPainel(tipo, p, btnAddId, btnResetId) {
  // Marcar / desmarcar
  p.lista.addEventListener('change', e => {
    if (e.target.matches('input[type=checkbox]')) {
      p.getItens()[e.target.dataset.i].ok = e.target.checked;
      updateProgress(p);
    }
  });

  // Abrir modal de observação ao clicar no nome
  p.lista.addEventListener('click', e => {
    // Registrar avaria (modo recebimento)
    const avBtn = e.target.closest('[data-avaria]');
    if (avBtn) {
      e.preventDefault();
      abrirAvaria(tipo, Number(avBtn.dataset.avaria));
      return;
    }
    // Remover solicitação adicional
    const delBtn = e.target.closest('[data-del-solic]');
    if (delBtn) {
      e.preventDefault();
      if (confirm('Remover esta solicitação?')) {
        getSolic(receitaAtual, tipo).splice(Number(delBtn.dataset.delSolic), 1);
        salvarSolicitacoes();
        renderPainel(p);
      }
      return;
    }
    // Observação
    const label = e.target.closest('.check-label');
    if (label && label.dataset.obs !== undefined) {
      e.preventDefault();
      abrirObs(p.tipo, label.dataset.obs);
    }
  });

  // Limpar
  $(btnResetId).addEventListener('click', () => {
    p.getItens().forEach(i => i.ok = false);
    renderPainel(p);
  });

  // Adicionar
  $(btnAddId).addEventListener('click', () => {
    const label = tipo === 'util' ? 'utensílio' : 'insumo';
    const nome = prompt(`Nome do ${label}:`);
    if (!nome || !nome.trim()) return;
    const qtd = prompt('Quantidade (ex.: 500 g, 2 un, 1 L):') || '';
    if (tipo === 'util' && !utensilios[receitaAtual]) utensilios[receitaAtual] = [];
    p.getItens().push({ nome: nome.trim(), qtd: qtd.trim(), ok: false });
    renderPainel(p);
  });
}

configurarPainel('insumo', painels.insumo, 'btn-add-insumo', 'btn-reset');
configurarPainel('util',   painels.util,   'btn-add-util',   'util-btn-reset');

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

// ===== Links "Ver receita & checklist" =====
document.querySelectorAll('.class-card').forEach(card => {
  const recipeKey = card.dataset.recipe;
  const turmaKey  = card.dataset.turma;
  const link = card.querySelector('.recipe-link');
  if (link && recipeKey) {
    link.addEventListener('click', () => {
      if (turmaKey && turmas[turmaKey]) trocarTurma(turmaKey);
      trocarReceita(recipeKey);
      painels.rec.lista.closest('.checklist-card')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

function highlightCard(key) {
  document.querySelectorAll('.class-card').forEach(c =>
    c.classList.toggle('selected', c.dataset.recipe === key)
  );
}

// ===== Menu hambúrguer mobile + overlay =====
const menuBtn = $('menu-toggle');
const sidebar = $('sidebar');
const overlay = $('overlay');

function toggleSidebar(open) {
  sidebar.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
}
menuBtn?.addEventListener('click', () => toggleSidebar(!sidebar.classList.contains('open')));
overlay?.addEventListener('click', () => toggleSidebar(false));

// ===== Micro-interações nos botões =====
document.querySelectorAll('button').forEach(el => {
  el.addEventListener('mousedown',  () => el.style.transform = 'scale(0.97)');
  el.addEventListener('mouseup',    () => el.style.transform = 'scale(1)');
  el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
});

// ===== Modal de observação =====
const obsModal = $('obs-modal');
const obsName  = $('obs-item-name');
const obsText  = $('obs-text');
let obsIdAtual   = null;
let obsTipoAtual = null;

function abrirObs(tipo, id) {
  obsTipoAtual = tipo;
  obsIdAtual   = id;
  const panel = painels[tipo] || painels.rec; 
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
    if(obsTipoAtual === 'insumo') {
      renderPainel(painels.rec);
      renderPainel(painels.exe);
    } else {
      renderPainel(painels[obsTipoAtual]);
    }
  }
  fecharObs();
});

$('obs-close').addEventListener('click', fecharObs);
$('obs-cancel').addEventListener('click', fecharObs);
obsModal.addEventListener('click', e => { if (e.target === obsModal) fecharObs(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && obsModal.classList.contains('show')) fecharObs(); });

// ===== Inicialização =====
trocarReceita(select.value);

// ===== CALENDÁRIO INTERATIVO =====
(function () {
  const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const FERIADOS = {
    '01-01': 'Ano Novo', '04-21': 'Tiradentes', '05-01': 'Trabalho',
    '09-07': 'Independência', '10-12': 'N. Sra.', '11-15': 'República',
    '12-25': 'Natal', '06-19': 'Recesso', '07-09': 'Recesso'
  };

  // Fichas disponíveis no plano de curso (usa suas receitas existentes)
  const fichasDisponiveis = [
    { id: 'confeitaria', nome: 'Técnicas de Confeitaria' },
    { id: 'panificacao', nome: 'Panificação Clássica' },
    { id: 'asia',        nome: 'Cozinha Internacional: Ásia' }
  ];

  // Fichas alocadas por data { 'YYYY-MM-DD': ['confeitaria', ...] }
  const alocacoes = JSON.parse(localStorage.getItem('sigec-alocacoes') || '{}');
  function salvar() { localStorage.setItem('sigec-alocacoes', JSON.stringify(alocacoes)); }

  let viewDate = new Date(2026, 5, 1);
  let diaSelecionado = null;

  // Elementos
  const modal   = document.getElementById('cal-modal');
  const grid    = document.getElementById('cal-grid');
  const monthEl = document.getElementById('cal-month');

  // Helpers de data
  const pad = n => String(n).padStart(2, '0');
  const chave = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const mmdd  = d => `${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

  // Verifica estoque de uma ficha (integra com `receitas`)
  function statusEstoque(id) {
    const r = receitas[id];
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

  // Renderiza a grade do mês
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

  // Renderiza painel lateral do dia
  function renderPainel(k) {
    document.getElementById('cal-panel-empty').style.display = 'none';
    document.getElementById('cal-panel-content').style.display = 'block';

    const [y, m, d] = k.split('-');
    const data = new Date(y, m - 1, d);
    document.getElementById('cal-panel-date').textContent =
      data.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });

    // Alocadas
    const aulas = alocacoes[k] || [];
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
            ? `<button class="cal-fiche-btn locked" disabled title="Estoque insuficiente — alocação bloqueada">
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
      const st = statusEstoque(id);
      // VALIDAÇÃO DE ESTOQUE antes de alocar
      if (st.classe === 'stock-out') {
        if (!confirm(`⚠️ "${id}" está sem estoque. Alocar mesmo assim?`)) return;
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

  // Abrir / fechar modal
  function abrir() { modal.classList.add('show'); render(); }
  function fechar() { modal.classList.remove('show'); }

  document.getElementById('cal-close').addEventListener('click', fechar);
  modal.addEventListener('click', e => { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show')) fechar(); });

  document.querySelectorAll('.link-btn').forEach(btn => {
    if (btn.textContent.includes('Calendário')) btn.addEventListener('click', abrir);
  });
})();

