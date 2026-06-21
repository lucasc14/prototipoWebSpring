// ===== Configuração =====
const LIMITE_SCROLL = 10;

// ===== ENTIDADES SEPARADAS (RF06) =====

// Turmas / laboratórios independentes
const turmas = {
  "2024.1.A": { nome: "Turma 2024.1.A", cozinha: "Padaria Lab 01" },
  "2024.1.C": { nome: "Turma 2024.1.C", cozinha: "Cozinha Pedagógica 02" },
  "2024.2.N": { nome: "Turma 2024.2.N", cozinha: "Cozinha Pedagógica 04" }
};

// Catálogo de fichas/receitas (necessidades) — unidades em g/ml/un (RNF02)
const receitas = {
  confeitaria: {
    nome: "Bolo de Cenoura com Cobertura",
    local: "08:00 • Cozinha Pedagógica 02",
    itens: [
      { id: "cenoura",   nome: "Cenoura Fresca",      necessario: 500,  unidade: "g" },
      { id: "farinha",   nome: "Farinha de Trigo",    necessario: 2000, unidade: "g" },
      { id: "acucar",    nome: "Açúcar Refinado",     necessario: 1000, unidade: "g" },
      { id: "ovos",      nome: "Ovos",                necessario: 12,   unidade: "un" },
      { id: "choco",     nome: "Chocolate em Pó 50%", necessario: 300,  unidade: "g" },
      { id: "formas",    nome: "Formas de Bolo",      necessario: 6,    unidade: "un" }
    ]
  },
  panificacao: {
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
  asia: {
    nome: "Yakisoba & Tempurá de Legumes",
    local: "19:00 • Cozinha Pedagógica 04",
    itens: [
      { id: "macarrao", nome: "Macarrão para Yakisoba", necessario: 2000, unidade: "g" },
      { id: "shoyu",    nome: "Molho Shoyu",            necessario: 1000, unidade: "ml" },
      { id: "gengibre", nome: "Gengibre Fresco",        necessario: 200,  unidade: "g" },
      { id: "legumes",  nome: "Legumes Variados",       necessario: 3000, unidade: "g" },
      { id: "oleo",     nome: "Óleo para Fritura",      necessario: 5000, unidade: "ml" },
      { id: "tempura",  nome: "Farinha Tempurá",        necessario: 1000, unidade: "g" },
      { id: "camarao",  nome: "Camarão Médio",          necessario: 1000, unidade: "g" }
    ]
  }
};

// Catálogo de utensílios necessários por ficha
const utensiliosFicha = {
  confeitaria: [
    { id: "batedeira", nome: "Batedeira Planetária", necessario: 1, unidade: "un" },
    { id: "tigelas",   nome: "Tigelas Inox",         necessario: 4, unidade: "un" },
    { id: "espatula",  nome: "Espátula de Silicone", necessario: 3, unidade: "un" },
    { id: "balanca",   nome: "Balança Digital",      necessario: 1, unidade: "un" }
  ],
  panificacao: [
    { id: "masseira", nome: "Masseira / Amassadeira",   necessario: 1, unidade: "un" },
    { id: "forno",    nome: "Forno de Lastro",          necessario: 1, unidade: "un" },
    { id: "cestas",   nome: "Cestas de Fermentação",    necessario: 8, unidade: "un" },
    { id: "lamina",   nome: "Lâmina de Corte (grigne)", necessario: 2, unidade: "un" }
  ],
  asia: [
    { id: "wok",        nome: "Wok",             necessario: 2, unidade: "un" },
    { id: "fritadeira", nome: "Fritadeira",      necessario: 1, unidade: "un" },
    { id: "escumadeira",nome: "Escumadeira",     necessario: 2, unidade: "un" },
    { id: "tabuas",     nome: "Tábuas de Corte", necessario: 4, unidade: "un" }
  ]
};

// ===== ESTOQUE ISOLADO POR TURMA (RF06) =====
// Cada turma tem sua própria quantidade disponível de insumos e utensílios.
const estoquePorTurma = {
  "2024.1.A": {
    insumos:     { farinha_t1: 5000, fermento: 250, sal: 0, melhorador: 30, agua: 3000, assadeiras: 4 },
    utensilios:  { masseira: 1, forno: 1, cestas: 4, lamina: 0 }
  },
  "2024.1.C": {
    insumos:     { cenoura: 500, farinha: 2000, acucar: 1000, ovos: 12, choco: 100, formas: 0 },
    utensilios:  { batedeira: 1, tigelas: 4, espatula: 0, balanca: 1 }
  },
  "2024.2.N": {
    insumos:     { macarrao: 2000, shoyu: 1000, gengibre: 0, legumes: 1500, oleo: 5000, tempura: 1000, camarao: 0 },
    utensilios:  { wok: 2, fritadeira: 1, escumadeira: 1, tabuas: 4 }
  }
};

// Observações por turma+ficha (persistem por contexto)
const observacoes = {}; // chave: `${turma}|${ficha}|${tipo}|${id}`

// ===== Estado atual =====
let receitaAtual;
let turmaAtual;

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

// ===== Configuração dos dois painéis =====
const painels = {
  insumo: {
    tipo: 'insumo',
    getItens: () => receitas[receitaAtual].itens,
    lista:  $('checklist'),
    name:   $('recipe-name'),
    loc:    $('recipe-loc'),
    badge:  $('turma-badge'),
    pText:  $('progress-text'),
    pPct:   $('progress-pct'),
    pBar:   $('progress-bar'),
    rotulo: 'Lista de insumos'
  },
  util: {
    tipo: 'util',
    getItens: () => utensiliosFicha[receitaAtual] || [],
    lista:  $('util-checklist'),
    name:   $('util-recipe-name'),
    loc:    $('util-recipe-loc'),
    badge:  $('util-turma-badge'),
    pText:  $('util-progress-text'),
    pPct:   $('util-progress-pct'),
    pBar:   $('util-progress-bar'),
    rotulo: 'Lista de utensílios'
  }
};

const select = $('recipe-select');
const turmaSelect = $('turma-select');

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
  const done  = itens.filter(i => statusItem(p.tipo, i).ok).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  p.pText.textContent = `${done} de ${total} itens em estoque`;
  p.pPct.textContent  = pct;
  p.pBar.style.width  = pct + '%';
}

function renderPainel(p) {
  const receita = receitas[receitaAtual];
  const turma = turmas[turmaAtual];
  p.name.textContent = receita.nome;
  p.loc.textContent  = receita.local;
  if (p.badge) p.badge.textContent = `${turma.nome} • ${turma.cozinha}`;

  const itens = p.getItens();
  p.lista.innerHTML = itens.map((it) => {
    const disp = estoqueDisponivel(p.tipo, it.id);
    const s = statusItem(p.tipo, it);
    const obs = observacoes[obsKey(p.tipo, it.id)];
    const clsEstoque = s.st === 'ok' ? '' : (s.st === 'falta' ? 'estoque-falta' : 'estoque-baixo');
    return `
      <label class="check-item ${obs ? 'has-obs' : ''} ${clsEstoque}">
        <input type="checkbox" data-id="${it.id}" ${s.ok ? 'checked' : ''} disabled>
        <span class="check-box"><span class="material-symbols-outlined">check</span></span>
        <span class="check-label" data-obs="${it.id}">${it.nome}</span>
        <span class="obs-flag" title="${obs || ''}"><span class="material-symbols-outlined">sticky_note_2</span></span>
        <span class="estoque-tag ${s.st}">${s.label}</span>
        <span class="check-qty">${disp}/${it.necessario}${it.unidade}</span>
      </label>`;
  }).join('');

  updateProgress(p);
  aplicarScrollAdaptativo(p.lista, itens.length, p.rotulo);
}

function renderTudo() {
  renderPainel(painels.insumo);
  renderPainel(painels.util);
}

// ===== Listeners por painel (observação, adicionar) =====
function configurarPainel(p, btnAddId, btnResetId) {
  // Observação ao clicar no nome
  p.lista.addEventListener('click', e => {
    const label = e.target.closest('.check-label');
    if (label) {
      e.preventDefault();
      abrirObs(p.tipo, label.dataset.obs);
    }
  });

  // "Limpar" = zera o estoque dos itens desta ficha (na turma atual)
  $(btnResetId).addEventListener('click', () => {
    const e = estoquePorTurma[turmaAtual];
    const bucket = p.tipo === 'util' ? e.utensilios : e.insumos;
    p.getItens().forEach(i => bucket[i.id] = 0);
    renderPainel(p);
  });

  // Adicionar insumo/utensílio à ficha + estoque da turma
  $(btnAddId).addEventListener('click', () => {
    const label = p.tipo === 'util' ? 'utensílio' : 'insumo';
    const nome = prompt(`Nome do ${label}:`);
    if (!nome || !nome.trim()) return;
    const necessario = parseFloat(prompt('Quantidade necessária (número):')) || 0;
    const unidade = (prompt('Unidade (g, ml, un):') || 'un').trim();
    const disp = parseFloat(prompt(`Quanto há em estoque na ${turmas[turmaAtual].nome}?`)) || 0;
    const id = 'item_' + Date.now();

    const catalogo = p.tipo === 'util' ? utensiliosFicha : null;
    if (p.tipo === 'util') {
      (utensiliosFicha[receitaAtual] = utensiliosFicha[receitaAtual] || []);
    }
    p.getItens().push({ id, nome: nome.trim(), necessario, unidade });

    const e = estoquePorTurma[turmaAtual];
    (p.tipo === 'util' ? e.utensilios : e.insumos)[id] = disp;
    renderPainel(p);
  });
}

configurarPainel(painels.insumo, 'btn-add-insumo', 'btn-reset');
configurarPainel(painels.util,   'btn-add-util',   'util-btn-reset');

// ===== Troca de receita / turma =====
function trocarReceita(key) {
  receitaAtual = key;
  select.value = key;
  renderTudo();
  highlightCard(key);
}

function trocarTurma(key) {
  turmaAtual = key;
  turmaSelect.value = key;
  renderTudo();
}

select.addEventListener('change', e => trocarReceita(e.target.value));
turmaSelect.addEventListener('change', e => trocarTurma(e.target.value));

// Popular o <select> de turmas
turmaSelect.innerHTML = Object.entries(turmas)
  .map(([k, t]) => `<option value="${k}">${t.nome} — ${t.cozinha}</option>`).join('');

// ===== Links "Ver receita & checklist" — trocam receita E turma do card =====
document.querySelectorAll('.class-card').forEach(card => {
  const recipeKey = card.dataset.recipe;
  const turmaKey  = card.dataset.turma;
  const link = card.querySelector('.recipe-link');
  if (link && recipeKey) {
    link.addEventListener('click', () => {
      if (turmaKey && turmas[turmaKey]) trocarTurma(turmaKey);
      trocarReceita(recipeKey);
      painels.insumo.lista.closest('.checklist-card')
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

// ===== Modal de observação (por turma + ficha) =====
const obsModal = $('obs-modal');
const obsName  = $('obs-item-name');
const obsText  = $('obs-text');
let obsIdAtual   = null;
let obsTipoAtual = null;

function abrirObs(tipo, id) {
  obsTipoAtual = tipo;
  obsIdAtual   = id;
  const item = painels[tipo].getItens().find(i => i.id === id);
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
trocarTurma('2024.1.A');
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

  const fichasDisponiveis = [
    { id: 'confeitaria', nome: 'Técnicas de Confeitaria', turma: '2024.1.C' },
    { id: 'panificacao', nome: 'Panificação Clássica',    turma: '2024.1.A' },
    { id: 'asia',        nome: 'Cozinha Internacional: Ásia', turma: '2024.2.N' }
  ];

  const alocacoes = JSON.parse(localStorage.getItem('sigec-alocacoes') || '{}');
  function salvar() { localStorage.setItem('sigec-alocacoes', JSON.stringify(alocacoes)); }

  let viewDate = new Date(2026, 5, 1);
  let diaSelecionado = null;

  const modal   = document.getElementById('cal-modal');
  const grid    = document.getElementById('cal-grid');
  const monthEl = document.getElementById('cal-month');

  const pad = n => String(n).padStart(2, '0');
  const chave = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const mmdd  = d => `${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

  // Estoque calculado no contexto da TURMA daquela ficha (RF06)
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

      const aulas = alocacoes[k] || [];
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
    }).join('') : '<p class="cal-empty-text">Nenhuma ficha alocada.</p>';

    const elDisp = document.getElementById('cal-available');
    const livres = fichasDisponiveis.filter(f => !aulas.includes(f.id));
    elDisp.innerHTML = livres.length ? livres.map(f => {
      const st = statusEstoque(f);
      return `
        <div class="cal-fiche">
          <div class="cal-fiche-info">
            <p class="cal-fiche-name">${f.nome} <small>(${f.turma})</small></p>
            <p class="cal-fiche-stock ${st.classe}">
              <span class="material-symbols-outlined sm">inventory_2</span>${st.txt}
            </p>
          </div>
          <button class="cal-fiche-btn" data-add="${f.id}" title="Alocar">
            <span class="material-symbols-outlined sm">add_circle</span>
          </button>
        </div>`;
    }).join('') : '<p class="cal-empty-text">Todas as fichas já alocadas.</p>';
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
      const st = statusEstoque(f || { id });
      if (st.classe === 'stock-out') {
        if (!confirm(`⚠️ "${f ? f.nome : id}" está sem estoque na turma. Alocar mesmo assim?`)) return;
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

  function abrir() { modal.classList.add('show'); render(); }
  function fechar() { modal.classList.remove('show'); }

  document.getElementById('cal-close').addEventListener('click', fechar);
  modal.addEventListener('click', e => { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  document.querySelectorAll('.link-btn').forEach(btn => {
    if (btn.textContent.includes('Calendário')) btn.addEventListener('click', abrir);
  });
})();
