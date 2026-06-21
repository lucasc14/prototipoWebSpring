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

// ===== Modo de checklist (RF04): 'recebimento' | 'execucao' =====
let modoChecklist = 'recebimento';

// ===== Solicitações adicionais (por receita + tipo) =====
let solicitacoes = JSON.parse(localStorage.getItem('sigec-solicitacoes') || '{}');
const salvarSolicitacoes = () =>
  localStorage.setItem('sigec-solicitacoes', JSON.stringify(solicitacoes));

function getSolic(key, tipo) {
  solicitacoes[key] = solicitacoes[key] || { insumo: [], util: [] };
  return solicitacoes[key][tipo];
}

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

// Status visuais das solicitações
const REQ_STATUS = {
  pending:  { cls: 'pending',  icon: 'hourglass_top', txt: 'Aguardando aprovação' },
  approved: { cls: 'approved', icon: 'check_circle',  txt: 'Aprovada' },
  rejected: { cls: 'rejected', icon: 'cancel',        txt: 'Recusada' }
};

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
  const campo = modoChecklist === 'recebimento' ? 'recebido' : 'ok';
  const done  = itens.filter(i => i[campo]).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  p.pText.textContent = `${done} de ${total} itens`;
  p.pPct.textContent  = pct;
  p.pBar.style.width  = pct + '%';
  if (window.atualizarNotificacoes) window.atualizarNotificacoes();
}

function renderPainel(p) {
  const receita = receitas[receitaAtual];
  p.name.textContent = receita.nome;
  p.loc.textContent  = receita.local;

  const itens = p.getItens();
  const recv  = modoChecklist === 'recebimento';

  let html = itens.map((it, i) => {
    if (recv) {
      // MODO RECEBIMENTO DO CD: conferir caixa + registrar avaria
      return `
        <label class="check-item ${it.avaria ? 'has-avaria' : ''} ${it.obs ? 'has-obs' : ''}">
          <input type="checkbox" data-i="${i}" ${it.recebido ? 'checked' : ''}>
          <span class="check-box recv-box"><span class="material-symbols-outlined">check</span></span>
          <span class="check-label" data-obs="${i}">${it.nome}</span>
          <span class="avaria-flag" title="${it.avaria || ''}"><span class="material-symbols-outlined">report</span></span>
          <span class="obs-flag" title="${it.obs || ''}"><span class="material-symbols-outlined">sticky_note_2</span></span>
          <span class="check-qty">${it.qtd}</span>
          <button class="btn-avaria" data-avaria="${i}" title="Registrar avaria">
            <span class="material-symbols-outlined">report</span>Avaria
          </button>
        </label>`;
    }
    // MODO EXECUÇÃO DA AULA: check simples (vai para a panela)
    return `
      <label class="check-item ${it.obs ? 'has-obs' : ''}">
        <input type="checkbox" data-i="${i}" ${it.ok ? 'checked' : ''}>
        <span class="check-box"><span class="material-symbols-outlined">check</span></span>
        <span class="check-label" data-obs="${i}">${it.nome}</span>
        <span class="obs-flag" title="${it.obs || ''}"><span class="material-symbols-outlined">sticky_note_2</span></span>
        <span class="check-qty">${it.qtd}</span>
      </label>`;
  }).join('');

  // Solicitações adicionais (mantidas em ambos os modos)
  const tipo = (p === painels.util) ? 'util' : 'insumo';
  const solics = getSolic(receitaAtual, tipo);

  html += solics.map((s, i) => {
    const st = REQ_STATUS[s.status] || REQ_STATUS.pending;
    return `
      <div class="check-item is-request" title="${s.justificativa || ''}">
        <span class="material-symbols-outlined req-ico">assignment_add</span>
        <span class="check-label">${s.nome}${s.urgencia === 'Urgente' ? '<span class="req-urg">• Urgente</span>' : ''}</span>
        <span class="req-badge ${st.cls}"><span class="material-symbols-outlined">${st.icon}</span>${st.txt}</span>
        <span class="check-qty">${s.qtd}</span>
        <button class="req-del" data-del-solic="${i}" title="Remover solicitação">
          <span class="material-symbols-outlined sm">delete</span>
        </button>
      </div>`;
  }).join('');

  p.lista.innerHTML = html;
  updateProgress(p);
  aplicarScrollAdaptativo(p.lista, itens.length + solics.length, p.rotulo);
}

function renderTudo() {
  renderPainel(painels.insumo);
  renderPainel(painels.util);
}

// ===== Listeners por painel (marcar, limpar, observação, solicitação) =====
function configurarPainel(tipo, p, btnAddId, btnResetId) {
  // Marcar / desmarcar (grava no campo certo conforme o modo)
  p.lista.addEventListener('change', e => {
    if (e.target.matches('input[type=checkbox]')) {
      const campo = modoChecklist === 'recebimento' ? 'recebido' : 'ok';
      p.getItens()[e.target.dataset.i][campo] = e.target.checked;
      updateProgress(p);
    }
  });

  // Clique na lista: avaria > remover solicitação > observação
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
      abrirObs(tipo, Number(label.dataset.obs));
    }
  });

  // Limpar (limpa o campo do modo atual)
  $(btnResetId).addEventListener('click', () => {
    const campo = modoChecklist === 'recebimento' ? 'recebido' : 'ok';
    p.getItens().forEach(i => i[campo] = false);
    renderPainel(p);
  });

  // Adicionar
  $(btnAddId).addEventListener('click', () => {
    const label = tipo === 'util' ? 'utensílio' : 'insumo';
    const nome = prompt(`Nome do ${label}:`);
    if (!nome || !nome.trim()) return;
    const qtd = prompt('Quantidade (ex.: 500 g, 2 un, 1 L):') || '';
    if (tipo === 'util' && !utensilios[receitaAtual]) utensilios[receitaAtual] = [];
    p.getItens().push({ nome: nome.trim(), qtd: qtd.trim(), ok: false, recebido: false });
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

// ============================================
// ===== MODAL DE SOLICITAÇÃO ADICIONAL =====
// ============================================
(function () {
  const modal  = $('req-modal');
  const ctxEl  = $('req-context');
  const inNome = $('req-nome');
  const inQtd  = $('req-qtd');
  const inUrg  = $('req-urgencia');
  const inJust = $('req-just');
  if (!modal) return;

  let tipoAtual = 'insumo';

  function abrir(tipo) {
    tipoAtual = tipo;
    const label = tipo === 'util' ? 'Utensílio' : 'Insumo';
    ctxEl.textContent = `${label} • ${receitas[receitaAtual]?.nome || '—'}`;
    inNome.value = ''; inQtd.value = ''; inJust.value = ''; inUrg.value = 'Normal';
    modal.classList.add('show');
    inNome.focus();
  }
  function fechar() { modal.classList.remove('show'); }

  document.querySelectorAll('.btn-solicitar').forEach(btn => {
    btn.addEventListener('click', () => abrir(btn.dataset.tipo));
  });

  $('req-save').addEventListener('click', () => {
    const nome = inNome.value.trim();
    const qtd  = inQtd.value.trim();
    if (!nome || !qtd) { alert('Preencha o nome do item e a quantidade.'); return; }

    getSolic(receitaAtual, tipoAtual).push({
      nome, qtd,
      urgencia: inUrg.value,
      justificativa: inJust.value.trim(),
      status: 'pending',  // sempre nasce aguardando aprovação no desktop
      data: new Date().toLocaleString('pt-BR')
    });
    salvarSolicitacoes();

    renderPainel(tipoAtual === 'util' ? painels.util : painels.insumo);
    fechar();

    if (window.adicionarNotificacaoManual) {
      window.adicionarNotificacaoManual(
        `Solicitação enviada: ${nome} (${qtd}) — aguardando aprovação`,
        'assignment_add'
      );
    }
  });

  $('req-close').addEventListener('click', fechar);
  $('req-cancel').addEventListener('click', fechar);
  modal.addEventListener('click', e => { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });
})();

// ============================================
// ===== ABAS DE CHECKLIST (RF04) =====
// ============================================
(function () {
  const tabs = document.querySelectorAll('.ch-tab');
  const badges = [$('mode-badge-insumo'), $('mode-badge-util')];

  const TEXTO_MODO = {
    recebimento: { badge: 'Recebimento', confirm: 'Confirmar Recebimento' },
    execucao:    { badge: 'Execução',    confirm: 'Confirmar Separação' }
  };

  function aplicarModo(modo) {
    modoChecklist = modo;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.modo === modo));
    badges.forEach(b => { if (b) b.textContent = TEXTO_MODO[modo].badge; });

    // Atualiza rótulo do botão de confirmar dos insumos
    const btnConf = $('btn-confirm-insumo');
    if (btnConf) btnConf.textContent = TEXTO_MODO[modo].confirm;

    renderTudo();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => aplicarModo(tab.dataset.modo));
  });
})();

// ============================================
// ===== MODAL DE AVARIA (RF04) =====
// ============================================
const avariaModal = $('avaria-modal');
let avariaTipoAtual = null, avariaIndexAtual = null;

function abrirAvaria(tipo, i) {
  avariaTipoAtual = tipo;
  avariaIndexAtual = i;
  const item = painels[tipo].getItens()[i];
  $('avaria-item-name').textContent = item.nome;
  $('avaria-tipo').value = item.avariaTipo || '';
  $('avaria-text').value = item.avaria || '';
  avariaModal.classList.add('show');
}

function fecharAvaria() {
  avariaModal.classList.remove('show');
  avariaTipoAtual = null;
  avariaIndexAtual = null;
}

$('avaria-save').addEventListener('click', () => {
  if (avariaTipoAtual && avariaIndexAtual !== null) {
    const p = painels[avariaTipoAtual];
    const item = p.getItens()[avariaIndexAtual];
    const tipoAv = $('avaria-tipo').value;
    const desc   = $('avaria-text').value.trim();

    if (!tipoAv && !desc) {
      // limpar avaria
      delete item.avaria; delete item.avariaTipo;
    } else {
      item.avariaTipo = tipoAv;
      item.avaria = (tipoAv ? tipoAv + (desc ? ' — ' : '') : '') + desc;
      if (window.adicionarNotificacaoManual) {
        window.adicionarNotificacaoManual(
          `Avaria registrada: ${item.nome} (${tipoAv || 'sem tipo'})`,
          'report'
        );
      }
    }
    renderPainel(p);
  }
  fecharAvaria();
});

$('avaria-close').addEventListener('click', fecharAvaria);
$('avaria-cancel').addEventListener('click', fecharAvaria);
avariaModal.addEventListener('click', e => { if (e.target === avariaModal) fecharAvaria(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharAvaria(); });

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
    { id: 'confeitaria', nome: 'Técnicas de Confeitaria' },
    { id: 'panificacao', nome: 'Panificação Clássica' },
    { id: 'asia',        nome: 'Cozinha Internacional: Ásia' }
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

  function statusEstoque(id) {
    const r = receitas[id];
    if (!r) return { classe: 'stock-out', txt: 'Sem ficha' };
    const total = r.itens.length;
    const ok = r.itens.filter(i => i.ok).length;
    if (ok === total) return { classe: 'stock-ok',  txt: 'Estoque OK' };
    if (ok === 0)     return { classe: 'stock-out', txt: 'Sem estoque' };
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

  function renderPainel(k) {
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

  document.getElementById('cal-day-panel').addEventListener('click', e => {
    const addBtn = e.target.closest('[data-add]');
    const remBtn = e.target.closest('[data-remove]');
    if (!diaSelecionado) return;

    if (addBtn) {
      const id = addBtn.dataset.add;
      const st = statusEstoque(id);
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

// ============================================
// ===== CENTRAL DE NOTIFICAÇÕES =====
// ============================================
(function () {
  const btn   = $('notif-btn');
  const panel = $('notif-panel');
  const list  = $('notif-list');
  const dot   = $('notif-dot');
  const clear = $('notif-clear');

  if (!btn || !panel || !list) return;

  const lidas = new Set(JSON.parse(localStorage.getItem('sigec-notif-lidas') || '[]'));
  const salvarLidas = () =>
    localStorage.setItem('sigec-notif-lidas', JSON.stringify([...lidas]));

  // Notificações manuais (ex.: solicitações enviadas)
  const manuais = [];

  function gerarAlertasBase() {
    const alertas = [];

    for (const key in receitas) {
      const r = receitas[key];
      const faltam = r.itens.filter(i => !i.ok);
      if (faltam.length) {
        alertas.push({
          id: `insumo-${key}`, tipo: 'low', icone: 'inventory_2',
          msg: `${r.nome}: ${faltam.length} insumo(s) a separar`,
          time: r.local
        });
      }
    }

    for (const key in utensilios) {
      const faltam = (utensilios[key] || []).filter(u => !u.ok);
      if (faltam.length) {
        const nome = receitas[key] ? receitas[key].nome : key;
        alertas.push({
          id: `util-${key}`, tipo: 'info', icone: 'blender',
          msg: `${nome}: ${faltam.length} utensílio(s) a preparar`,
          time: 'Checklist de utensílios'
        });
      }
    }

    alertas.push({
      id: 'cd-atraso', tipo: 'cd', icone: 'local_shipping',
      msg: 'Atraso do CD: entrega de insumos prevista pode atrasar.',
      time: 'Hoje, 09:12'
    });
    alertas.push({
      id: 'retirada', tipo: 'ret', icone: 'event_available',
      msg: 'Hoje é dia de retirada de insumos da semana.',
      time: 'Hoje'
    });

    return alertas;
  }

  // Junta manuais (no topo) + automáticas
  function gerarAlertas() {
    return [...manuais, ...gerarAlertasBase()];
  }

  function render() {
    const alertas = gerarAlertas();
    const naoLidas = alertas.filter(a => !lidas.has(a.id)).length;

    if (naoLidas > 0) {
      dot.style.display = 'flex';
      dot.textContent = naoLidas > 9 ? '9+' : naoLidas;
    } else {
      dot.style.display = 'none';
    }

    if (!alertas.length) {
      list.innerHTML = `
        <div class="notif-empty">
          <span class="material-symbols-outlined">notifications_off</span>
          <p>Nenhuma notificação no momento.</p>
        </div>`;
      return;
    }

    list.innerHTML = alertas.map(a => `
      <div class="notif-item ${lidas.has(a.id) ? 'read' : ''}" data-id="${a.id}">
        <div class="notif-icon ${a.tipo}">
          <span class="material-symbols-outlined">${a.icone}</span>
        </div>
        <div class="notif-content">
          <p class="notif-msg">${a.msg}</p>
          <p class="notif-time">${a.time}</p>
        </div>
        <span class="notif-unread"></span>
      </div>
    `).join('');
  }

  window.atualizarNotificacoes = render;

  // Dispara notificação manual (usado nas solicitações)
  window.adicionarNotificacaoManual = function (msg, icone = 'notifications') {
    manuais.unshift({
      id: `manual-${Date.now()}`, tipo: 'info', icone,
      msg, time: new Date().toLocaleString('pt-BR')
    });
    render();
  };

  function toggle(open) {
    panel.classList.toggle('show',
      open !== undefined ? open : !panel.classList.contains('show'));
  }

  btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });

  list.addEventListener('click', e => {
    const item = e.target.closest('.notif-item');
    if (!item) return;
    lidas.add(item.dataset.id);
    salvarLidas();
    render();
  });

  clear?.addEventListener('click', () => {
    gerarAlertas().forEach(a => lidas.add(a.id));
    salvarLidas();
    render();
  });

  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && !e.target.closest('#notif-btn')) {
      toggle(false);
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  render();
})();
