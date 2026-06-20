// ===== Configuração =====
const LIMITE_SCROLL = 10;

// ===== Base de dados =====
const receitas = {
  confeitaria: {
    nome: "Bolo de Cenoura com Cobertura",
    local: "08:00 • Cozinha Pedagógica 02",
    itens: [
      { nome: "Cenoura Fresca",      qtd: "500 g", ok: true },
      { nome: "Farinha de Trigo",    qtd: "2 kg",  ok: true },
      { nome: "Açúcar Refinado",     qtd: "1 kg",  ok: true },
      { nome: "Ovos",                qtd: "12 un", ok: true },
      { nome: "Chocolate em Pó 50%", qtd: "300 g", ok: false },
      { nome: "Formas de Bolo",      qtd: "6 un",  ok: false }
    ]
  },
  panificacao: {
    nome: "Pão Francês & Baguete",
    local: "13:30 • Padaria Lab 01",
    itens: [
      { nome: "Farinha de Trigo Tipo 1",   qtd: "5 kg",  ok: true },
      { nome: "Fermento Biológico Fresco", qtd: "250 g", ok: true },
      { nome: "Sal Refinado",              qtd: "100 g", ok: false },
      { nome: "Melhorador de Farinha",     qtd: "50 g",  ok: false },
      { nome: "Água Filtrada",             qtd: "3 L",   ok: false },
      { nome: "Formas / Assadeiras",       qtd: "6 un",  ok: false }
    ]
  },
  asia: {
    nome: "Yakisoba & Tempurá de Legumes",
    local: "19:00 • Cozinha Pedagógica 04",
    itens: [
      { nome: "Macarrão para Yakisoba", qtd: "2 kg",  ok: false },
      { nome: "Molho Shoyu",            qtd: "1 L",   ok: false },
      { nome: "Gengibre Fresco",        qtd: "200 g", ok: false },
      { nome: "Legumes Variados",       qtd: "3 kg",  ok: false },
      { nome: "Óleo para Fritura",      qtd: "5 L",   ok: false },
      { nome: "Farinha Tempurá",        qtd: "1 kg",  ok: false },
      { nome: "Camarão Médio",          qtd: "1 kg",  ok: false }
    ]
  }
};

const utensilios = {
  confeitaria: [
    { nome: "Batedeira Planetária", qtd: "1 un", ok: true },
    { nome: "Tigelas Inox",         qtd: "4 un", ok: true },
    { nome: "Espátula de Silicone", qtd: "3 un", ok: false },
    { nome: "Balança Digital",      qtd: "1 un", ok: false }
  ],
  panificacao: [
    { nome: "Masseira / Amassadeira",   qtd: "1 un", ok: true },
    { nome: "Forno de Lastro",          qtd: "1 un", ok: false },
    { nome: "Cestas de Fermentação",    qtd: "8 un", ok: false },
    { nome: "Lâmina de Corte (grigne)", qtd: "2 un", ok: false }
  ],
  asia: [
    { nome: "Wok",             qtd: "2 un", ok: false },
    { nome: "Fritadeira",      qtd: "1 un", ok: false },
    { nome: "Escumadeira",     qtd: "2 un", ok: false },
    { nome: "Tábuas de Corte", qtd: "4 un", ok: false }
  ]
};

// ===== Estado atual =====
let receitaAtual;

// ===== Helpers de DOM =====
const $ = id => document.getElementById(id);

// Configuração das duas listas (insumos e utensílios)
const painels = {
  insumo: {
    getItens: () => receitas[receitaAtual].itens,
    lista:    $('checklist'),
    name:     $('recipe-name'),
    loc:      $('recipe-loc'),
    pText:    $('progress-text'),
    pPct:     $('progress-pct'),
    pBar:     $('progress-bar'),
    rotulo:   'Lista de insumos'
  },
  util: {
    getItens: () => utensilios[receitaAtual] || [],
    lista:    $('util-checklist'),
    name:     $('util-recipe-name'),
    loc:      $('util-recipe-loc'),
    pText:    $('util-progress-text'),
    pPct:     $('util-progress-pct'),
    pBar:     $('util-progress-bar'),
    rotulo:   'Lista de utensílios'
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
    container.setAttribute('aria-label',
      `${rotulo}: ${qtd} itens. Use as setas ou a rolagem para navegar.`);
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
  p.name.textContent = receita.nome;
  p.loc.textContent  = receita.local;

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

  updateProgress(p);
  aplicarScrollAdaptativo(p.lista, itens.length, p.rotulo);
}

function renderTudo() {
  renderPainel(painels.insumo);
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
    const label = e.target.closest('.check-label');
    if (label) {
      e.preventDefault();
      abrirObs(tipo, Number(label.dataset.obs));
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

// ===== Troca de receita =====
function trocarReceita(key) {
  receitaAtual = key;
  select.value = key;
  renderTudo();
  highlightCard(key);
}

select.addEventListener('change', e => trocarReceita(e.target.value));

// ===== Links "Ver receita & checklist" nos cards =====
document.querySelectorAll('.class-card').forEach(card => {
  const recipeKey = card.dataset.recipe;
  const link = card.querySelector('.recipe-link');
  if (link && recipeKey) {
    link.addEventListener('click', () => {
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

// ===== Modal de observação (insumos + utensílios) =====
const obsModal = $('obs-modal');
const obsName  = $('obs-item-name');
const obsText  = $('obs-text');
let obsIndexAtual = null;
let obsTipoAtual  = null;

function abrirObs(tipo, i) {
  obsTipoAtual  = tipo;
  obsIndexAtual = i;
  const item = painels[tipo].getItens()[i];
  obsName.textContent = item.nome;
  obsText.value = item.obs || '';
  obsModal.classList.add('show');
  obsText.focus();
}

function fecharObs() {
  obsModal.classList.remove('show');
  obsIndexAtual = null;
  obsTipoAtual  = null;
}

$('obs-save').addEventListener('click', () => {
  if (obsIndexAtual !== null && obsTipoAtual) {
    const p = painels[obsTipoAtual];
    p.getItens()[obsIndexAtual].obs = obsText.value.trim();
    renderPainel(p);
  }
  fecharObs();
});

$('obs-close').addEventListener('click', fecharObs);
$('obs-cancel').addEventListener('click', fecharObs);
obsModal.addEventListener('click', e => { if (e.target === obsModal) fecharObs(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharObs(); });

// ===== Inicialização =====
trocarReceita(select.value);

// ===== CALENDÁRIO INTERATIVO =====
(function () {
  const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  // Feriados/recesso fixos (MM-DD) — ajuste conforme calendário do Senac
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

  // Estado
  let viewDate = new Date(2026, 5, 1); // Junho/2026
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
    const total = r.itens.length;
    const ok = r.itens.filter(i => i.ok).length;
    if (ok === total) return { classe: 'stock-ok',  txt: 'Estoque OK' };
    if (ok === 0)     return { classe: 'stock-out', txt: 'Sem estoque' };
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
      const st = statusEstoque(id);
      return `
        <div class="cal-fiche">
          <div class="cal-fiche-info">
            <p class="cal-fiche-name">${f ? f.nome : id}</p>
            <p class="cal-fiche-stock ${st.classe}">
              <span class="material-symbols-outlined sm">inventory_2</span>${st.txt}
            </p>
          </div>
          <button class="cal-fiche-btn remove" data-remove="${id}" title="Remover">
            <span class="material-symbols-outlined sm">delete</span>
          </button>
        </div>`;
    }).join('') : '<p class="cal-empty-text">Nenhuma ficha alocada.</p>';

    // Disponíveis (não alocadas neste dia)
    const elDisp = document.getElementById('cal-available');
    const livres = fichasDisponiveis.filter(f => !aulas.includes(f.id));
    elDisp.innerHTML = livres.length ? livres.map(f => {
      const st = statusEstoque(f.id);
      return `
        <div class="cal-fiche">
          <div class="cal-fiche-info">
            <p class="cal-fiche-name">${f.nome}</p>
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

  // ===== Eventos =====

  // Clique nos dias
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
    renderPainel(diaSelecionado);
  });

  // Alocar / remover ficha
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
    renderPainel(diaSelecionado);
  });

  // Navegação de mês
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  // Liga os botões "Calendário" existentes
  document.querySelectorAll('.link-btn').forEach(btn => {
    if (btn.textContent.includes('Calendário')) btn.addEventListener('click', abrir);
  });
})();

