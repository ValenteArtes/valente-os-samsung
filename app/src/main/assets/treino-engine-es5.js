/* ═══════════════════════════════════════════════════════════════════════
   VALENTE OS — CENTRO DE CAPACITAÇÃO — MOTOR ES5 (tablets antigos)
   Porte de treinamento.js pra ES5 puro: sem const/let, sem arrow function,
   sem template literal, sem async/await, sem Set/Object.assign/Array.find.
   Rede: usa as funções sbGet/sbPost/sbPatch já definidas no HTML hospedeiro
   (XMLHttpRequest puro, com fallback nativo NativeBridge quando presente —
   mesmo padrão do ValenteOS_Terminal.html). Requer treino-conteudo-es5.js
   carregado ANTES deste arquivo (define TREINAMENTO_TRILHAS).

   Simplificações em relação ao motor completo (treinamento.js):
   - Sem "rever etapa anterior" avançado nem modo revisão pós-conclusão —
     só "← Etapa anterior" simples enquanto a aula está em andamento.
   - Sem contador de tentativas por etapa.
   - Sem Painel do Gestor (fica pra uma v2 se for preciso nestes tablets).
   Fora isso, todos os 11 tipos de etapa e a classificação por competência
   funcionam igual ao app principal.
   ═══════════════════════════════════════════════════════════════════════ */

var T = {
  colaborador: null,   // { id, nome, cargo } — setado por TreinoAbrir()
  trilha: null,        // id da trilha aberta
  progresso: [],       // linhas de treinamento_progresso carregadas
  view: 'trilhas',      // 'trilhas' | 'inicio' | 'aula' | 'resultado' | 'central'
  diaAberto: null,
  aoFechar: null        // callback opcional chamado quando o usuário fecha o treinamento
};

var TREIN_STATUS_ICONE_ES5 = { nao_iniciado: '○', em_andamento: '◐', concluido: '✓', bloqueado: '🔒' };
var TREIN_STATUS_LABEL_ES5 = { nao_iniciado: 'Não iniciado', em_andamento: 'Em andamento', concluido: 'Concluído', bloqueado: 'Bloqueado' };
var TREIN_MISSAO_MIN_CHARS_ES5 = 5;
var TREIN_LIMIAR_VERDE_ES5 = 0.8;
var TREIN_LIMIAR_AMARELO_ES5 = 0.5;
var TREIN_CLASSIFICACAO_LABEL_ES5 = {
  liberado: '🟢 LIBERADO PARA OPERAÇÃO',
  funcional_supervisao: '🟡 FUNCIONAL COM SUPERVISÃO',
  precisa_acompanhamento: '🔴 PRECISA DE ACOMPANHAMENTO'
};
var TREIN_COMPETENCIA_NOME_ES5 = {
  ferramentas_digitais: 'Ferramentas digitais', produtos: 'Produtos', atendimento: 'Atendimento',
  orcamento: 'Orçamento', operacao_os: 'Operação do Valente OS', marketplace: 'Marketplace',
  redes_sociais: 'Redes sociais', negociacao: 'Negociação', prospeccao: 'Prospecção'
};
var TREIN_TIER_ICONE_ES5 = { verde: '🟢', amarelo: '🟡', vermelho: '🔴', sem_dados: '⚪' };
var TREIN_TIER_LABEL_ES5 = { verde: 'Bom domínio', amarelo: 'Funcional, com acompanhamento', vermelho: 'Precisa de reforço', sem_dados: 'Sem dados ainda' };

/* ── helpers ES5 (sem Array.find / Object.assign / Array.includes) ── */
function trEsc(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function trIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) { if (arr[i] === val) return i; }
  return -1;
}
function trFindRow(dia) {
  for (var i = 0; i < T.progresso.length; i++) { if (T.progresso[i].dia === dia) return T.progresso[i]; }
  return null;
}
function trValuesOf(obj) {
  var out = [];
  for (var k in obj) { if (obj.hasOwnProperty(k)) out.push(obj[k]); }
  return out;
}
function trVersaoAtual() {
  var trilha = TREINAMENTO_TRILHAS[T.trilha];
  return trilha ? trilha.versao : 1;
}
function trTrilhasDoColaborador() {
  var cargo = T.colaborador ? T.colaborador.cargo : null;
  var todas = trValuesOf(TREINAMENTO_TRILHAS);
  var out = [];
  for (var i = 0; i < todas.length; i++) {
    var t = todas[i];
    if (!t.cargosPermitidos || trIndexOf(t.cargosPermitidos, cargo) !== -1) out.push(t);
  }
  return out;
}

/* ── container ── */
function trBox() { return document.getElementById('treinoApp'); }

/* ── entrada / saída ── */
function TreinoAbrir(colaborador, aoFechar) {
  T.colaborador = colaborador;
  T.trilha = null; T.diaAberto = null; T.progresso = [];
  T.view = 'trilhas';
  T.aoFechar = aoFechar || null;
  var box = trBox();
  if (box) box.style.display = 'block';
  treinoRender();
}
function TreinoFechar() {
  var box = trBox();
  if (box) box.style.display = 'none';
  if (T.aoFechar) T.aoFechar();
}

/* ── persistência ── */
function trCarregarProgresso(cb) {
  var qs = 'colaborador_id=eq.' + T.colaborador.id + '&trilha=eq.' + T.trilha + '&versao=eq.' + trVersaoAtual();
  sbGet('treinamento_progresso', qs, function(err, data) {
    if (err) { toast('Não consegui carregar seu progresso: ' + err.message, true); if (cb) cb(false); return; }
    T.progresso = data || [];
    if (cb) cb(true);
  });
}
function trStatusDoDia(dia) {
  var row = trFindRow(dia);
  if (row) return row.status;
  if (dia === 1) return 'nao_iniciado';
  var anterior = trFindRow(dia - 1);
  return (anterior && anterior.status === 'concluido') ? 'nao_iniciado' : 'bloqueado';
}
/* Grava status/etapa_atual/respostas (merge) de um dia. patch (opcional) é
   mesclado em cima de `respostas` já salvo. novoStatus (opcional) troca o
   status; sem ele mantém o que já existia (ou 'em_andamento' se é novo). */
function trSalvar(dia, etapaAtual, patch, novoStatus, cb) {
  var existente = trFindRow(dia);
  var respostas = {};
  if (existente && existente.respostas) { for (var k in existente.respostas) respostas[k] = existente.respostas[k]; }
  if (patch) { for (var k2 in patch) respostas[k2] = patch[k2]; }
  var payload = {
    colaborador_id: T.colaborador.id,
    trilha: T.trilha,
    versao: trVersaoAtual(),
    dia: dia,
    status: novoStatus || (existente ? existente.status : 'em_andamento'),
    etapa_atual: etapaAtual,
    respostas: respostas,
    updated_at: new Date().toISOString()
  };
  if (payload.status === 'em_andamento' && (!existente || !existente.iniciado_em)) payload.iniciado_em = new Date().toISOString();
  if (payload.status === 'concluido') payload.concluido_em = new Date().toISOString();

  function depois(err) {
    if (err) { toast('Erro ao salvar progresso: ' + err.message, true); if (cb) cb(false); return; }
    trCarregarProgresso(function() { if (cb) cb(true); });
  }
  if (existente && existente.id) {
    sbPatch('treinamento_progresso', 'id=eq.' + existente.id, payload, depois);
  } else {
    sbPost('treinamento_progresso', payload, depois);
  }
}

/* ── dispatcher ── */
function treinoRender() {
  var box = trBox();
  if (!box) return;
  if (T.view === 'trilhas') { treinoRenderTrilhas(box); return; }
  if (T.view === 'inicio') { treinoRenderInicio(box); return; }
  if (T.view === 'aula') { treinoRenderAula(box); return; }
  if (T.view === 'resultado') { treinoRenderResultado(box); return; }
  if (T.view === 'central') { treinoRenderCentral(box); return; }
}

/* ── tela: escolha de trilha ── */
function treinoRenderTrilhas(box) {
  var trilhas = trTrilhasDoColaborador();
  var nome = (T.colaborador.nome || '').trim();

  if (trilhas.length === 0) {
    box.innerHTML =
      '<div class="trein-identificacao">' +
      '<div class="trein-logo">🎓 CENTRO DE CAPACITAÇÃO</div>' +
      '<p class="hint">Olá, ' + trEsc(nome || 'colaborador') + '. Nenhuma trilha de capacitação está liberada pro seu cargo ainda.</p>' +
      '<button class="btn-icon" id="treinBtnFechar">← Voltar ao trabalho</button>' +
      '</div>';
    box.querySelector('#treinBtnFechar').onclick = TreinoFechar;
    return;
  }

  var cardsHtml = '';
  for (var i = 0; i < trilhas.length; i++) {
    var t = trilhas[i];
    cardsHtml +=
      '<div class="trein-card trein-trilha-card" data-trilha="' + trEsc(t.id) + '">' +
      '<div class="trein-card-topo"><span class="trein-card-status-ic">' + (t.icone || '🎓') + '</span></div>' +
      '<div class="trein-card-titulo">' + trEsc(t.nome) + '</div>' +
      '<div class="trein-card-sub">' + trEsc(t.descricao || '') + '</div>' +
      '</div>';
  }

  box.innerHTML =
    '<div class="trein-inicio">' +
    '<div class="trein-header">' +
    '<div><div class="trein-titulo-principal">🎓 CENTRO DE CAPACITAÇÃO</div><p class="hint">Olá, ' + trEsc(nome || 'colaborador') + '.</p></div>' +
    '<button class="btn-icon" id="treinBtnFechar">← Voltar ao trabalho</button>' +
    '</div>' +
    '<div class="trein-cards-grid">' + cardsHtml + '</div>' +
    '</div>';

  box.querySelector('#treinBtnFechar').onclick = TreinoFechar;
  var cards = box.querySelectorAll('.trein-trilha-card');
  for (var c = 0; c < cards.length; c++) {
    (function(card) {
      card.onclick = function() {
        T.trilha = card.getAttribute('data-trilha');
        trCarregarProgresso(function() { T.view = 'inicio'; treinoRender(); });
      };
    })(cards[c]);
  }
}

/* ── tela: início da trilha (cards de dia) ── */
function treinoRenderInicio(box) {
  var trilha = TREINAMENTO_TRILHAS[T.trilha];
  if (!trilha) { T.trilha = null; T.view = 'trilhas'; treinoRender(); return; }
  var dias = trilha.dias;
  var concluidos = 0;
  for (var i = 0; i < dias.length; i++) { if (trStatusDoDia(dias[i].dia) === 'concluido') concluidos++; }
  var pct = Math.round((concluidos / dias.length) * 100);
  var nome = (T.colaborador.nome || '').trim();
  var temOutras = trTrilhasDoColaborador().length > 1;

  var cardsHtml = '';
  for (var d = 0; d < dias.length; d++) {
    var dd = dias[d];
    var status = trStatusDoDia(dd.dia);
    var bloqueado = status === 'bloqueado';
    cardsHtml +=
      '<div class="trein-card trein-card--' + status + (bloqueado ? ' trein-card--bloqueado' : '') + '" data-dia="' + dd.dia + '">' +
      '<div class="trein-card-topo"><span class="trein-card-dia">Dia ' + dd.dia + '</span>' +
      '<span class="trein-card-status-ic">' + TREIN_STATUS_ICONE_ES5[status] + '</span></div>' +
      '<div class="trein-card-titulo">' + trEsc(dd.titulo) + '</div>' +
      '<div class="trein-card-sub">' + trEsc(dd.subtitulo || '') + '</div>' +
      '<div class="trein-card-label">' + TREIN_STATUS_LABEL_ES5[status] + '</div>' +
      '</div>';
  }

  box.innerHTML =
    '<div class="trein-inicio">' +
    '<div class="trein-header">' +
    '<div>' +
    (temOutras ? '<button class="btn-icon" id="treinBtnVoltarTrilhas">← Trilhas</button>' : '') +
    '<div class="trein-titulo-principal">' + (trilha.icone || '🎓') + ' ' + trEsc(trilha.nome.toUpperCase()) + '</div>' +
    '<p class="hint">Olá, ' + trEsc(nome || 'colaborador') + '.</p>' +
    '</div>' +
    '<button class="btn-icon" id="treinBtnFechar">← Voltar ao trabalho</button>' +
    '</div>' +
    '<div class="trein-progresso-wrap">' +
    '<div class="trein-progresso-label">Seu progresso: ' + concluidos + ' de ' + dias.length + ' aulas</div>' +
    '<div class="trein-progresso-barra"><div class="trein-progresso-fill" style="width:' + pct + '%"></div></div>' +
    '</div>' +
    (concluidos === dias.length
      ? '<div class="trein-acoes-trilha-concluida">' +
        '<button class="btn-primary" id="treinBtnResultado">🎯 Ver meu resultado</button>' +
        '<button class="btn-icon" id="treinBtnCentral">📚 Central de Consulta</button>' +
        '</div>'
      : '') +
    '<div class="trein-cards-grid">' + cardsHtml + '</div>' +
    '</div>';

  box.querySelector('#treinBtnFechar').onclick = TreinoFechar;
  var btnVoltarTrilhas = box.querySelector('#treinBtnVoltarTrilhas');
  if (btnVoltarTrilhas) btnVoltarTrilhas.onclick = function() { T.trilha = null; T.view = 'trilhas'; treinoRender(); };
  var btnResultado = box.querySelector('#treinBtnResultado');
  if (btnResultado) btnResultado.onclick = function() { T.view = 'resultado'; treinoRender(); };
  var btnCentral = box.querySelector('#treinBtnCentral');
  if (btnCentral) btnCentral.onclick = function() { T.view = 'central'; treinoRender(); };

  var cards = box.querySelectorAll('.trein-card[data-dia]');
  for (var ci = 0; ci < cards.length; ci++) {
    if (cards[ci].className.indexOf('trein-card--bloqueado') !== -1) continue;
    (function(card) {
      card.onclick = function() {
        T.diaAberto = parseInt(card.getAttribute('data-dia'), 10);
        T.view = 'aula';
        treinoRender();
      };
    })(cards[ci]);
  }
}

/* ── tela: aula (dispatcher dia com/sem etapas) ── */
function treinoFindDia(trilha, dia) {
  for (var i = 0; i < trilha.dias.length; i++) { if (trilha.dias[i].dia === dia) return trilha.dias[i]; }
  return null;
}
function treinoRenderAula(box) {
  var dia = T.diaAberto;
  var trilha = TREINAMENTO_TRILHAS[T.trilha];
  var info = treinoFindDia(trilha, dia);
  if (!info) { T.view = 'inicio'; treinoRender(); return; }
  if (info.etapas && info.etapas.length > 0) {
    treinoRenderAulaEtapas(box, trilha, dia, info);
  } else {
    treinoRenderAulaPlaceholder(box, trilha, dia, info);
  }
}
function treinoRenderAulaPlaceholder(box, trilha, dia, info) {
  var status = trStatusDoDia(dia);
  box.innerHTML =
    '<div class="trein-aula">' +
    '<button class="btn-icon" id="treinBtnVoltar">← Voltar</button>' +
    '<div class="trein-aula-dia">' + trEsc(trilha.nome.toUpperCase()) + ' — DIA ' + dia + ' / ' + trilha.dias.length + '</div>' +
    '<h2>' + trEsc(info.titulo) + '</h2><p class="hint">' + trEsc(info.subtitulo || '') + '</p>' +
    '<div class="trein-placeholder"><p>🚧 Esta aula ainda não tem conteúdo interativo.</p></div>' +
    (status !== 'concluido'
      ? '<button class="btn-primary" id="treinBtnConcluir">Marcar aula como concluída</button>'
      : '<p class="trein-concluido-msg">✓ Aula concluída</p>') +
    '</div>';
  box.querySelector('#treinBtnVoltar').onclick = function() { T.view = 'inicio'; T.diaAberto = null; treinoRender(); };
  var btnConcluir = box.querySelector('#treinBtnConcluir');
  if (btnConcluir) {
    btnConcluir.onclick = function() {
      trSalvar(dia, 0, {}, 'concluido', function(ok) {
        if (ok) { toast('✓ Dia ' + dia + ' concluído!'); T.view = 'inicio'; T.diaAberto = null; treinoRender(); }
      });
    };
  } else if (status === 'nao_iniciado') {
    trSalvar(dia, 0, {}, 'em_andamento');
  }
}

/* ── motor de etapas ── */
function treinoRenderAulaEtapas(box, trilha, dia, info) {
  var row = trFindRow(dia);
  var statusAtual = trStatusDoDia(dia);
  var totalEtapas = info.etapas.length;

  if (statusAtual === 'concluido') {
    box.innerHTML =
      '<div class="trein-aula">' +
      '<button class="btn-icon" id="treinBtnVoltar">← Voltar</button>' +
      '<div class="trein-aula-dia">' + trEsc(trilha.nome.toUpperCase()) + ' — DIA ' + dia + ' / ' + trilha.dias.length + '</div>' +
      '<h2>' + trEsc(info.titulo) + '</h2>' +
      '<div class="trein-placeholder"><p class="trein-concluido-msg">✓ Aula concluída</p>' +
      '<p class="hint">Você já completou todas as ' + totalEtapas + ' etapas desta aula.</p></div>' +
      '</div>';
    box.querySelector('#treinBtnVoltar').onclick = function() { T.view = 'inicio'; T.diaAberto = null; treinoRender(); };
    return;
  }

  var etapaInicial = Math.min((row && row.etapa_atual) ? row.etapa_atual : 0, totalEtapas - 1);
  var respostas = (row && row.respostas) || {};
  if (!row || statusAtual === 'nao_iniciado') trSalvar(dia, etapaInicial, {}, 'em_andamento');
  treinoRenderEtapaAtual(box, trilha, dia, info, etapaInicial, respostas);
}

function treinoRenderEtapaAtual(box, trilha, dia, info, etapaIndex, respostas) {
  var totalEtapas = info.etapas.length;
  var etapa = info.etapas[etapaIndex];
  var pct = Math.round((etapaIndex / totalEtapas) * 100);
  var respostaSalva = respostas[String(etapaIndex)] || null;

  box.innerHTML =
    '<div class="trein-aula">' +
    '<button class="btn-icon" id="treinBtnVoltar">← Voltar</button>' +
    (etapaIndex > 0 ? '<button class="btn-icon" id="treinBtnEtapaAnterior">← Etapa anterior</button>' : '') +
    '<div class="trein-aula-dia">' + trEsc(trilha.nome.toUpperCase()) + ' — DIA ' + dia + ' / ' + trilha.dias.length + '</div>' +
    '<div class="trein-progresso-wrap">' +
    '<div class="trein-progresso-label">Etapa ' + (etapaIndex + 1) + ' de ' + totalEtapas + '</div>' +
    '<div class="trein-progresso-barra"><div class="trein-progresso-fill" style="width:' + pct + '%"></div></div>' +
    '</div>' +
    '<div id="treinCorpo"></div>' +
    '</div>';

  box.querySelector('#treinBtnVoltar').onclick = function() { T.view = 'inicio'; T.diaAberto = null; treinoRender(); };
  var btnAnterior = box.querySelector('#treinBtnEtapaAnterior');
  if (btnAnterior) btnAnterior.onclick = function() { treinoRenderEtapaAtual(box, trilha, dia, info, etapaIndex - 1, respostas); };

  var corpo = box.querySelector('#treinCorpo');

  function avancar() {
    var proximoIndex = etapaIndex + 1;
    if (proximoIndex >= totalEtapas) {
      trSalvar(dia, totalEtapas, {}, 'concluido', function(ok) {
        if (ok) { toast('✓ Dia ' + dia + ' concluído!'); T.view = 'inicio'; T.diaAberto = null; treinoRender(); }
      });
      return;
    }
    trSalvar(dia, proximoIndex, {}, null, function(ok) {
      if (ok) {
        var rowAtual = trFindRow(dia);
        treinoRenderEtapaAtual(box, trilha, dia, info, proximoIndex, (rowAtual && rowAtual.respostas) || {});
      }
    });
  }

  /* grava campos da resposta desta etapa (mescla com o que já existir nela) e,
     opcionalmente, chama cb(ok) depois de recarregar o progresso */
  function salvarCampos(campos, cb) {
    var patch = {};
    var existenteEtapa = respostas[String(etapaIndex)] || {};
    var mesclado = {};
    for (var k in existenteEtapa) mesclado[k] = existenteEtapa[k];
    for (var k2 in campos) mesclado[k2] = campos[k2];
    mesclado.competencia = etapa.competencia || existenteEtapa.competencia || null;
    mesclado.tipo = etapa.tipo;
    patch[String(etapaIndex)] = mesclado;
    trSalvar(dia, etapaIndex, patch, null, cb);
  }

  function registrarResposta(acertou, respostaEscolhida, erroCritico, cb) {
    salvarCampos({ acertou: acertou, ultimaResposta: respostaEscolhida, erroCritico: !!erroCritico }, cb);
  }

  treinoRenderCorpoEtapa(corpo, etapa, respostaSalva, avancar, registrarResposta, salvarCampos);
}

function treinoRenderCorpoEtapa(corpo, etapa, respostaSalva, avancar, registrarResposta, salvar) {
  if (etapa.tipo === 'conteudo') {
    corpo.innerHTML =
      '<div class="trein-placeholder trein-etapa-conteudo">' +
      (etapa.titulo ? '<h3>' + trEsc(etapa.titulo) + '</h3>' : '') +
      '<p>' + trEsc(etapa.texto) + '</p></div>' +
      '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>';
    corpo.querySelector('#treinBtnContinuar').onclick = avancar;
    return;
  }

  if (etapa.tipo === 'multipla_escolha') {
    var opcoesMe = [];
    for (var i1 = 0; i1 < etapa.opcoes.length; i1++) {
      opcoesMe.push({ label: etapa.opcoes[i1], valor: i1, erroCritico: etapa.erroCriticoOpcoes ? trIndexOf(etapa.erroCriticoOpcoes, i1) !== -1 : false });
    }
    treinoRenderPergunta(corpo, {
      enunciado: etapa.pergunta,
      opcoes: opcoesMe,
      ehCorreta: function(valor) { return valor === etapa.correta; },
      feedbackCerto: etapa.feedbackCerto,
      feedbackErradoPara: function(valor) { return (etapa.feedbackPorOpcao && etapa.feedbackPorOpcao[valor]) || etapa.feedbackErrado || 'Não é essa — tente novamente.'; }
    }, respostaSalva, avancar, registrarResposta);
    return;
  }

  if (etapa.tipo === 'verdadeiro_falso') {
    treinoRenderPergunta(corpo, {
      enunciado: etapa.afirmacao,
      opcoes: [{ label: 'Verdadeiro', valor: true }, { label: 'Falso', valor: false }],
      ehCorreta: function(valor) { return valor === etapa.correta; },
      feedbackCerto: etapa.feedbackCerto,
      feedbackErradoPara: function() { return etapa.feedbackErrado || 'Não é bem assim — tente novamente.'; }
    }, respostaSalva, avancar, registrarResposta);
    return;
  }

  if (etapa.tipo === 'resposta_cliente') {
    var opcoesRc = [];
    for (var i2 = 0; i2 < etapa.opcoes.length; i2++) {
      opcoesRc.push({ label: etapa.opcoes[i2].label, valor: i2, erroCritico: !!etapa.opcoes[i2].erroCritico });
    }
    treinoRenderPergunta(corpo, {
      enunciadoCliente: etapa.cliente,
      opcoes: opcoesRc,
      ehCorreta: function(valor) { return !!etapa.opcoes[valor].correta; },
      feedbackCerto: null,
      feedbackErradoPara: function(valor) { return etapa.opcoes[valor].feedback; },
      feedbackCertoPara: function(valor) { return etapa.opcoes[valor].feedback; }
    }, respostaSalva, avancar, registrarResposta);
    return;
  }

  if (etapa.tipo === 'selecionar_itens') { treinoEtapaSelecionarItens(corpo, etapa, respostaSalva, avancar, salvar); return; }
  if (etapa.tipo === 'ordenar') { treinoEtapaOrdenar(corpo, etapa, respostaSalva, avancar, salvar); return; }
  if (etapa.tipo === 'cenario') { treinoEtapaCenario(corpo, etapa, respostaSalva, avancar, salvar); return; }
  if (etapa.tipo === 'checklist') { treinoEtapaChecklist(corpo, etapa, respostaSalva, avancar, salvar); return; }
  if (etapa.tipo === 'missao') { treinoEtapaMissao(corpo, etapa, respostaSalva, avancar, salvar); return; }
  if (etapa.tipo === 'confirmacao_pratica') { treinoEtapaConfirmacaoPratica(corpo, etapa, respostaSalva, avancar, salvar); return; }
  if (etapa.tipo === 'texto_livre') { treinoEtapaTextoLivre(corpo, etapa, respostaSalva, avancar, salvar); return; }

  corpo.innerHTML =
    '<div class="trein-placeholder"><p>🚧 Etapa do tipo "' + trEsc(etapa.tipo) + '" ainda não tem tela própria nesta versão.</p></div>' +
    '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>';
  corpo.querySelector('#treinBtnContinuar').onclick = avancar;
}

/* pergunta genérica (multipla_escolha / verdadeiro_falso / resposta_cliente) */
function treinoRenderPergunta(corpo, cfg, respostaSalva, avancar, registrarResposta) {
  var jaAcertou = !!(respostaSalva && respostaSalva.acertou);

  function desenhar(feedback) {
    var opcoesHtml = '';
    for (var i = 0; i < cfg.opcoes.length; i++) {
      opcoesHtml += '<button class="trein-opcao-btn" data-i="' + i + '">' + trEsc(cfg.opcoes[i].label) + '</button>';
    }
    corpo.innerHTML =
      '<div class="trein-etapa-pergunta">' +
      (cfg.enunciadoCliente
        ? '<div class="trein-balao-cliente"><span class="trein-balao-tag">CLIENTE</span>' + trEsc(cfg.enunciadoCliente) + '</div>'
        : '<p class="trein-pergunta-enunciado">' + trEsc(cfg.enunciado) + '</p>') +
      '<div class="trein-opcoes">' + opcoesHtml + '</div>' +
      (feedback ? '<div class="trein-feedback trein-feedback--' + (feedback.ok ? 'ok' : 'erro') + '">' + trEsc(feedback.texto) + '</div>' : '') +
      (jaAcertou ? '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>' : '') +
      '</div>';

    var btns = corpo.querySelectorAll('.trein-opcao-btn');
    for (var b = 0; b < btns.length; b++) {
      (function(btn) {
        btn.onclick = function() {
          var i = parseInt(btn.getAttribute('data-i'), 10);
          var opcao = cfg.opcoes[i];
          var valor = opcao.valor;
          var acertou = cfg.ehCorreta(valor);
          registrarResposta(acertou, valor, opcao.erroCritico, function() {
            if (acertou) jaAcertou = true;
            var texto = acertou
              ? (cfg.feedbackCertoPara ? cfg.feedbackCertoPara(valor) : cfg.feedbackCerto)
              : cfg.feedbackErradoPara(valor);
            desenhar({ ok: acertou, texto: texto });
          });
        };
      })(btns[b]);
    }
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  var textoInicial = (cfg.feedbackCertoPara && respostaSalva) ? cfg.feedbackCertoPara(respostaSalva.ultimaResposta) : cfg.feedbackCerto;
  desenhar(jaAcertou ? { ok: true, texto: textoInicial } : null);
}

/* selecionar_itens */
function treinoEtapaSelecionarItens(corpo, etapa, respostaSalva, avancar, salvar) {
  var marcados = (respostaSalva && respostaSalva.itensMarcados) ? respostaSalva.itensMarcados.slice() : [];
  var concluido = !!(respostaSalva && respostaSalva.acertou);

  function desenhar(feedback) {
    var itensHtml = '';
    for (var i = 0; i < etapa.itens.length; i++) {
      var marcado = trIndexOf(marcados, i) !== -1;
      itensHtml += '<label class="trein-check-item"><input type="checkbox" data-i="' + i + '"' + (marcado ? ' checked' : '') + '><span>' + trEsc(etapa.itens[i]) + '</span></label>';
    }
    corpo.innerHTML =
      '<div class="trein-etapa-selecionar">' +
      '<p class="trein-pergunta-enunciado">' + trEsc(etapa.pergunta) + '</p>' +
      '<div class="trein-opcoes">' + itensHtml + '</div>' +
      (feedback ? '<div class="trein-feedback trein-feedback--' + (feedback.ok ? 'ok' : 'erro') + '">' + trEsc(feedback.texto) + '</div>' : '') +
      '<button class="btn-primary" id="treinBtnConfirmar">' + (concluido ? 'Conferir de novo' : 'Confirmar seleção') + '</button>' +
      (concluido ? '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>' : '') +
      '</div>';

    var cbs = corpo.querySelectorAll('input[type="checkbox"]');
    for (var c = 0; c < cbs.length; c++) {
      (function(cb) {
        cb.onchange = function() {
          var i = parseInt(cb.getAttribute('data-i'), 10);
          var pos = trIndexOf(marcados, i);
          if (cb.checked) { if (pos === -1) marcados.push(i); }
          else { if (pos !== -1) marcados.splice(pos, 1); }
        };
      })(cbs[c]);
    }

    corpo.querySelector('#treinBtnConfirmar').onclick = function() {
      var ok = marcados.length === etapa.corretos.length;
      if (ok) { for (var j = 0; j < marcados.length; j++) { if (trIndexOf(etapa.corretos, marcados[j]) === -1) { ok = false; break; } } }
      concluido = ok;
      salvar({ acertou: ok, itensMarcados: marcados }, function() {
        desenhar({ ok: ok, texto: ok ? etapa.feedbackCerto : (etapa.feedbackErrado || 'A seleção não bateu com o esperado — revise e tente de novo.') });
      });
    };
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar(concluido ? { ok: true, texto: etapa.feedbackCerto } : null);
}

/* ordenar */
function treinoEtapaOrdenar(corpo, etapa, respostaSalva, avancar, salvar) {
  var total = etapa.itens.length;
  var ordemEscolhida = (respostaSalva && respostaSalva.ordemEscolhida) ? respostaSalva.ordemEscolhida.slice() : [];
  var concluido = !!(respostaSalva && respostaSalva.acertou);
  var ordemExibicao = [];
  for (var oi = 0; oi < total; oi++) ordemExibicao.push(oi);
  ordemExibicao.sort(function(a, b) { return ((a * 7 + 3) % total) - ((b * 7 + 3) % total); });

  function desenhar(feedback) {
    var escolhidosHtml;
    if (ordemEscolhida.length === 0) {
      escolhidosHtml = '<p class="hint">Toque nos itens abaixo, na ordem que você acha correta.</p>';
    } else {
      var li = '';
      for (var e = 0; e < ordemEscolhida.length; e++) li += '<li>' + trEsc(etapa.itens[ordemEscolhida[e]]) + '</li>';
      escolhidosHtml = '<ol>' + li + '</ol>';
    }
    var opcoesHtml = '';
    for (var oi2 = 0; oi2 < ordemExibicao.length; oi2++) {
      var idx = ordemExibicao[oi2];
      if (trIndexOf(ordemEscolhida, idx) !== -1) continue;
      opcoesHtml += '<button class="trein-opcao-btn" data-i="' + idx + '">' + trEsc(etapa.itens[idx]) + '</button>';
    }

    corpo.innerHTML =
      '<div class="trein-etapa-ordenar">' +
      '<p class="trein-pergunta-enunciado">' + trEsc(etapa.instrucao) + '</p>' +
      '<div class="trein-ordenar-escolhidos">' + escolhidosHtml + '</div>' +
      '<div class="trein-opcoes">' + opcoesHtml + '</div>' +
      (feedback ? '<div class="trein-feedback trein-feedback--' + (feedback.ok ? 'ok' : 'erro') + '">' + trEsc(feedback.texto) + '</div>' : '') +
      '<div class="trein-ordenar-acoes">' +
      (ordemEscolhida.length > 0 && !concluido ? '<button class="btn-icon" id="treinBtnReiniciar">Reiniciar</button>' : '') +
      (ordemEscolhida.length === total && !concluido ? '<button class="btn-primary" id="treinBtnConferir">Conferir</button>' : '') +
      (concluido ? '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>' : '') +
      '</div></div>';

    var btns = corpo.querySelectorAll('.trein-opcao-btn');
    for (var b = 0; b < btns.length; b++) {
      (function(btn) {
        btn.onclick = function() { ordemEscolhida.push(parseInt(btn.getAttribute('data-i'), 10)); desenhar(null); };
      })(btns[b]);
    }
    var btnReiniciar = corpo.querySelector('#treinBtnReiniciar');
    if (btnReiniciar) btnReiniciar.onclick = function() { ordemEscolhida = []; desenhar(null); };
    var btnConferir = corpo.querySelector('#treinBtnConferir');
    if (btnConferir) {
      btnConferir.onclick = function() {
        var ok = true;
        for (var v = 0; v < ordemEscolhida.length; v++) { if (ordemEscolhida[v] !== v) { ok = false; break; } }
        concluido = ok;
        salvar({ acertou: ok, ordemEscolhida: ordemEscolhida }, function() {
          if (!ok) ordemEscolhida = [];
          desenhar({ ok: ok, texto: ok ? etapa.feedbackCerto : (etapa.feedbackErrado || 'Ainda não ficou na ordem certa — tente de novo.') });
        });
      };
    }
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar(concluido ? { ok: true, texto: etapa.feedbackCerto } : null);
}

/* cenario */
function treinoEtapaCenario(corpo, etapa, respostaSalva, avancar, salvar) {
  var noAtual = (respostaSalva && respostaSalva.noCenarioAtual) || etapa.noInicial;
  var historico = (respostaSalva && respostaSalva.historico) ? respostaSalva.historico.slice() : [];
  var ultimaEscolha = historico.length > 0 ? historico[historico.length - 1] : null;
  var aguardandoContinuar = !!(ultimaEscolha && ultimaEscolha.no === noAtual);

  function desenhar(feedback) {
    var no = etapa.nos[noAtual];
    var opcoesHtml = '';
    if (!aguardandoContinuar && no) {
      for (var i = 0; i < no.opcoes.length; i++) opcoesHtml += '<button class="trein-opcao-btn" data-i="' + i + '">' + trEsc(no.opcoes[i].label) + '</button>';
    }
    corpo.innerHTML =
      '<div class="trein-etapa-pergunta">' +
      (etapa.titulo ? '<div class="trein-aula-dia">' + trEsc(etapa.titulo) + '</div>' : '') +
      (no ? '<div class="trein-balao-cliente"><span class="trein-balao-tag">CLIENTE</span>' + trEsc(no.cliente) + '</div>' : '') +
      (opcoesHtml ? '<div class="trein-opcoes">' + opcoesHtml + '</div>' : '') +
      (feedback ? '<div class="trein-feedback trein-feedback--' + (feedback.ok ? 'ok' : 'erro') + '">' + trEsc(feedback.texto) + '</div>' : '') +
      (aguardandoContinuar ? '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>' : '') +
      '</div>';

    var btns = corpo.querySelectorAll('.trein-opcao-btn');
    for (var b = 0; b < btns.length; b++) {
      (function(btn) {
        btn.onclick = function() {
          var i = parseInt(btn.getAttribute('data-i'), 10);
          var op = etapa.nos[noAtual].opcoes[i];
          historico.push({ no: noAtual, escolha: i, acertou: !!op.correta, erroCritico: !!op.erroCritico, feedback: op.feedback });
          var proximo = op.proximo || null;
          noAtual = proximo || noAtual;
          var algumErroCritico = false;
          for (var h = 0; h < historico.length; h++) { if (historico[h].erroCritico) { algumErroCritico = true; break; } }
          aguardandoContinuar = !proximo;
          salvar({ noCenarioAtual: noAtual, historico: historico, acertou: !algumErroCritico && !!op.correta, erroCritico: algumErroCritico }, function() {
            desenhar({ ok: !op.erroCritico, texto: op.feedback });
          });
        };
      })(btns[b]);
    }
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar(aguardandoContinuar ? { ok: !ultimaEscolha.erroCritico, texto: ultimaEscolha.feedback } : null);
}

/* checklist */
function treinoEtapaChecklist(corpo, etapa, respostaSalva, avancar, salvar) {
  var marcados = (respostaSalva && respostaSalva.itensMarcados) ? respostaSalva.itensMarcados.slice() : [];

  function desenhar() {
    var todos = marcados.length === etapa.itens.length;
    var itensHtml = '';
    for (var i = 0; i < etapa.itens.length; i++) {
      var marcado = trIndexOf(marcados, i) !== -1;
      itensHtml += '<label class="trein-check-item"><input type="checkbox" data-i="' + i + '"' + (marcado ? ' checked' : '') + '><span>' + trEsc(etapa.itens[i]) + '</span></label>';
    }
    corpo.innerHTML =
      '<div class="trein-etapa-checklist">' +
      (etapa.titulo ? '<p class="trein-pergunta-enunciado">' + trEsc(etapa.titulo) + '</p>' : '') +
      '<div class="trein-opcoes">' + itensHtml + '</div>' +
      (todos ? '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>' : '<p class="hint">Marque todos os itens pra continuar.</p>') +
      '</div>';

    var cbs = corpo.querySelectorAll('input[type="checkbox"]');
    for (var c = 0; c < cbs.length; c++) {
      (function(cb) {
        cb.onchange = function() {
          var i = parseInt(cb.getAttribute('data-i'), 10);
          var pos = trIndexOf(marcados, i);
          if (cb.checked) { if (pos === -1) marcados.push(i); }
          else { if (pos !== -1) marcados.splice(pos, 1); }
          salvar({ itensMarcados: marcados, acertou: marcados.length === etapa.itens.length }, function() { desenhar(); });
        };
      })(cbs[c]);
    }
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar();
}

/* missao */
function treinoEtapaMissao(corpo, etapa, respostaSalva, avancar, salvar) {
  var iniciada = !!(respostaSalva && respostaSalva.missaoIniciadaEm);
  var concluida = !!(respostaSalva && respostaSalva.missaoConcluidaEm);
  var numCaixas = (etapa.tarefas && etapa.tarefas.length) ? etapa.tarefas.length : 1;
  var anotacoes = (respostaSalva && respostaSalva.anotacoes) ? respostaSalva.anotacoes.slice() : [];
  while (anotacoes.length < numCaixas) anotacoes.push('');

  function todasPreenchidas() {
    for (var i = 0; i < anotacoes.length; i++) { if (((anotacoes[i] || '') + '').replace(/^\s+|\s+$/g, '').length < TREIN_MISSAO_MIN_CHARS_ES5) return false; }
    return true;
  }

  function desenhar() {
    var pistaLocal = etapa.local
      ? '<p class="hint">📍 Pra executar: vá até <strong>' + trEsc(etapa.local) + '</strong>.</p>'
      : '<p class="hint">💡 Esta missão é pra pensar/organizar — escreva sua resposta abaixo pra concluir.</p>';

    var caixasHtml = '';
    if (etapa.tarefas && etapa.tarefas.length) {
      for (var i = 0; i < etapa.tarefas.length; i++) {
        caixasHtml += '<div class="trein-missao-anotacao"><p class="hint">' + trEsc(etapa.tarefas[i]) + '</p>' +
          '<textarea class="trein-textarea" data-i="' + i + '" rows="2" placeholder="Anote aqui...">' + trEsc(anotacoes[i] || '') + '</textarea></div>';
      }
    } else {
      caixasHtml = '<div class="trein-missao-anotacao"><textarea class="trein-textarea" data-i="0" rows="4" placeholder="Anote aqui o que você pensou/decidiu...">' + trEsc(anotacoes[0] || '') + '</textarea></div>';
    }

    var tarefasListaHtml = '';
    if (etapa.tarefas) {
      var li = '';
      for (var t = 0; t < etapa.tarefas.length; t++) li += '<li>' + trEsc(etapa.tarefas[t]) + '</li>';
      tarefasListaHtml = '<p><strong>Tarefas:</strong></p><ul>' + li + '</ul>';
    }

    corpo.innerHTML =
      '<div class="trein-etapa-missao">' +
      '<div class="trein-missao-titulo">🎯 ' + trEsc(etapa.titulo) + '</div>' +
      '<p><strong>Objetivo:</strong> ' + trEsc(etapa.objetivo) + '</p>' +
      '<p><strong>Contexto:</strong> ' + trEsc(etapa.contexto) + '</p>' +
      tarefasListaHtml + pistaLocal +
      '<p><strong>Critério de conclusão:</strong> ' + trEsc(etapa.criterioConclusao) + '</p>' +
      (!iniciada ? '<button class="btn-primary" id="treinBtnIniciar">Iniciar missão</button>' : '') +
      (iniciada && !concluida
        ? '<p class="trein-pergunta-enunciado">Registre sua resposta (obrigatório pra concluir):</p>' + caixasHtml +
          '<button class="btn-primary" id="treinBtnConcluirMissao"' + (todasPreenchidas() ? '' : ' disabled') + '>Concluir missão</button>'
        : '') +
      (concluida
        ? '<div class="trein-placeholder"><p><strong>O que você registrou:</strong></p>' + (function() { var h = ''; for (var a = 0; a < anotacoes.length; a++) h += '<p>' + trEsc(anotacoes[a]) + '</p>'; return h; })() + '</div>' +
          '<p class="trein-concluido-msg">✓ Missão concluída</p><button class="btn-primary" id="treinBtnContinuar">Continuar</button>'
        : '') +
      '</div>';

    var btnIniciar = corpo.querySelector('#treinBtnIniciar');
    if (btnIniciar) btnIniciar.onclick = function() { iniciada = true; salvar({ missaoIniciadaEm: new Date().toISOString() }, function() { desenhar(); }); };

    var btnConcluirMissao = corpo.querySelector('#treinBtnConcluirMissao');
    var tas = corpo.querySelectorAll('.trein-missao-anotacao textarea');
    for (var ta = 0; ta < tas.length; ta++) {
      (function(area) {
        area.oninput = function() {
          anotacoes[parseInt(area.getAttribute('data-i'), 10)] = area.value;
          if (btnConcluirMissao) btnConcluirMissao.disabled = !todasPreenchidas();
        };
      })(tas[ta]);
    }
    if (btnConcluirMissao) {
      btnConcluirMissao.onclick = function() {
        if (!todasPreenchidas()) return;
        concluida = true;
        var limpas = [];
        for (var a2 = 0; a2 < anotacoes.length; a2++) limpas.push(((anotacoes[a2] || '') + '').replace(/^\s+|\s+$/g, ''));
        salvar({ missaoConcluidaEm: new Date().toISOString(), acertou: true, anotacoes: limpas }, function() { desenhar(); });
      };
    }
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar();
}

/* confirmacao_pratica */
function treinoEtapaConfirmacaoPratica(corpo, etapa, respostaSalva, avancar, salvar) {
  var concluido = !!(respostaSalva && respostaSalva.concluidoEm);

  function desenhar() {
    corpo.innerHTML =
      '<div class="trein-placeholder"><p>' + trEsc(etapa.instrucao) + '</p></div>' +
      (!concluido
        ? '<button class="btn-primary" id="treinBtnConcluiAtividade">Concluí a atividade</button>'
        : '<p class="trein-concluido-msg">✓ Execução declarada (ainda não validada por instrutor)</p><button class="btn-primary" id="treinBtnContinuar">Continuar</button>');

    var btn = corpo.querySelector('#treinBtnConcluiAtividade');
    if (btn) btn.onclick = function() {
      concluido = true;
      salvar({ concluidoEm: new Date().toISOString(), validadoPorInstrutor: null, acertou: true }, function() { desenhar(); });
    };
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar();
}

/* texto_livre */
function treinoEtapaTextoLivre(corpo, etapa, respostaSalva, avancar, salvar) {
  var enviado = !!(respostaSalva && respostaSalva.textoResposta);
  var textoAtual = (respostaSalva && respostaSalva.textoResposta) || '';

  function desenhar() {
    var pontosHtml = '';
    var pts = etapa.pontosEsperados || [];
    for (var p = 0; p < pts.length; p++) pontosHtml += '<li>' + trEsc(pts[p]) + '</li>';

    corpo.innerHTML =
      '<div class="trein-etapa-texto-livre">' +
      '<p class="trein-pergunta-enunciado">' + trEsc(etapa.pergunta) + '</p>' +
      (!enviado
        ? '<textarea id="treinTextoLivre" class="trein-textarea" rows="4" placeholder="Escreva sua resposta...">' + trEsc(textoAtual) + '</textarea>' +
          '<button class="btn-primary" id="treinBtnEnviarTexto">Enviar resposta</button>'
        : '<div class="trein-placeholder"><p><strong>Sua resposta:</strong></p><p>' + trEsc(textoAtual) + '</p></div>' +
          '<div class="trein-feedback trein-feedback--ok"><p><strong>Pontos que uma boa resposta deveria conter:</strong></p><ul>' + pontosHtml + '</ul></div>' +
          '<button class="btn-primary" id="treinBtnContinuar">Continuar</button>') +
      '</div>';

    var btnEnviar = corpo.querySelector('#treinBtnEnviarTexto');
    if (btnEnviar) btnEnviar.onclick = function() {
      var campo = corpo.querySelector('#treinTextoLivre');
      textoAtual = (campo.value || '').replace(/^\s+|\s+$/g, '');
      if (!textoAtual) { toast('Escreva alguma coisa antes de enviar.', true); return; }
      enviado = true;
      salvar({ textoResposta: textoAtual, acertou: true }, function() { desenhar(); });
    };
    var btnContinuar = corpo.querySelector('#treinBtnContinuar');
    if (btnContinuar) btnContinuar.onclick = avancar;
  }

  desenhar();
}

/* ── resultado por competência ── */
function treinoClassificarTrilha(trilha, progresso) {
  var porCompetencia = {};
  var errosCriticosTotal = 0;
  var errosCriticosDiaFinal = 0;
  var ultimoDia = trilha.dias[trilha.dias.length - 1].dia;

  for (var d = 0; d < trilha.dias.length; d++) {
    var diaInfo = trilha.dias[d];
    if (!diaInfo.etapas) continue;
    var row = null;
    for (var r = 0; r < progresso.length; r++) { if (progresso[r].dia === diaInfo.dia) { row = progresso[r]; break; } }
    var respostas = (row && row.respostas) || {};
    for (var idx in respostas) {
      var resp = respostas[idx];
      if (resp.erroCritico) { errosCriticosTotal++; if (diaInfo.dia === ultimoDia) errosCriticosDiaFinal++; }
      if (resp.competencia && typeof resp.acertou === 'boolean') {
        var nomes = (resp.competencia instanceof Array) ? resp.competencia : [resp.competencia];
        for (var n = 0; n < nomes.length; n++) {
          var nome = nomes[n];
          if (!porCompetencia[nome]) porCompetencia[nome] = { acertos: 0, total: 0 };
          porCompetencia[nome].total++;
          if (resp.acertou) porCompetencia[nome].acertos++;
        }
      }
    }
  }

  var resultadoCompetencias = [];
  for (var nome2 in porCompetencia) {
    var c = porCompetencia[nome2];
    var taxa = c.total > 0 ? c.acertos / c.total : 0;
    var tier = 'vermelho';
    if (c.total === 0) tier = 'sem_dados';
    else if (taxa >= TREIN_LIMIAR_VERDE_ES5) tier = 'verde';
    else if (taxa >= TREIN_LIMIAR_AMARELO_ES5) tier = 'amarelo';
    resultadoCompetencias.push({ nome: nome2, acertos: c.acertos, total: c.total, taxa: taxa, tier: tier });
  }

  var diasConcluidos = 0;
  for (var d2 = 0; d2 < trilha.dias.length; d2++) {
    var row2 = null;
    for (var r2 = 0; r2 < progresso.length; r2++) { if (progresso[r2].dia === trilha.dias[d2].dia) { row2 = progresso[r2]; break; } }
    if (row2 && row2.status === 'concluido') diasConcluidos++;
  }
  var concluiuTudo = diasConcluidos === trilha.dias.length;

  var classificacao = 'precisa_acompanhamento';
  if (concluiuTudo) {
    if (errosCriticosDiaFinal > 0) {
      classificacao = 'precisa_acompanhamento';
    } else {
      var tiersSemDados = [];
      for (var t2 = 0; t2 < resultadoCompetencias.length; t2++) { if (resultadoCompetencias[t2].tier !== 'sem_dados') tiersSemDados.push(resultadoCompetencias[t2].tier); }
      var todosVerde = tiersSemDados.length > 0;
      for (var t3 = 0; t3 < tiersSemDados.length; t3++) { if (tiersSemDados[t3] !== 'verde') { todosVerde = false; break; } }
      var temVermelho = trIndexOf(tiersSemDados, 'vermelho') !== -1;
      if (todosVerde) classificacao = 'liberado';
      else if (temVermelho) classificacao = 'precisa_acompanhamento';
      else classificacao = 'funcional_supervisao';
    }
  }

  return { porCompetencia: resultadoCompetencias, errosCriticosTotal: errosCriticosTotal, errosCriticosDiaFinal: errosCriticosDiaFinal, diasConcluidos: diasConcluidos, totalDias: trilha.dias.length, concluiuTudo: concluiuTudo, classificacao: classificacao };
}

function treinoRenderResultado(box) {
  var trilha = TREINAMENTO_TRILHAS[T.trilha];
  var resultado = treinoClassificarTrilha(trilha, T.progresso);

  var linhasComp = '';
  if (resultado.porCompetencia.length === 0) {
    linhasComp = '<p class="hint">Ainda não há dados avaliativos suficientes.</p>';
  } else {
    for (var i = 0; i < resultado.porCompetencia.length; i++) {
      var c = resultado.porCompetencia[i];
      linhasComp += '<div class="trein-resultado-linha"><span>' + trEsc(TREIN_COMPETENCIA_NOME_ES5[c.nome] || c.nome) + '</span>' +
        '<span>' + TREIN_TIER_ICONE_ES5[c.tier] + ' ' + TREIN_TIER_LABEL_ES5[c.tier] + ' (' + c.acertos + '/' + c.total + ')</span></div>';
    }
  }

  box.innerHTML =
    '<div class="trein-aula">' +
    '<button class="btn-icon" id="treinBtnVoltar">← Voltar</button>' +
    '<h2>🎯 Resultado da Formação ' + trEsc(trilha.nome.replace('Formação ', '')) + '</h2>' +
    '<div class="trein-resultado-competencias">' + linhasComp + '</div>' +
    '<div class="trein-resultado-resumo">' +
    '<div class="trein-resultado-linha"><span>Erros críticos (total)</span><span>' + resultado.errosCriticosTotal + '</span></div>' +
    '<div class="trein-resultado-linha"><span>Erros críticos na missão final</span><span>' + resultado.errosCriticosDiaFinal + '</span></div>' +
    '<div class="trein-resultado-linha"><span>Aulas concluídas</span><span>' + resultado.diasConcluidos + '/' + resultado.totalDias + '</span></div>' +
    '</div>' +
    '<div class="trein-resultado-classificacao trein-resultado-classificacao--' + resultado.classificacao + '">' + TREIN_CLASSIFICACAO_LABEL_ES5[resultado.classificacao] + '</div>' +
    '</div>';

  box.querySelector('#treinBtnVoltar').onclick = function() { T.view = 'inicio'; treinoRender(); };
}

/* ── central de consulta rápida ── */
function treinoRenderCentral(box) {
  var trilha = TREINAMENTO_TRILHAS[T.trilha];
  var cardsHtml = '';
  for (var i = 0; i < trilha.dias.length; i++) {
    var d = trilha.dias[i];
    cardsHtml += '<div class="trein-card" data-dia="' + d.dia + '"><div class="trein-card-titulo">' + trEsc(d.titulo) + '</div><div class="trein-card-sub">' + trEsc(d.subtitulo || '') + '</div></div>';
  }

  box.innerHTML =
    '<div class="trein-inicio">' +
    '<div class="trein-header">' +
    '<div><div class="trein-titulo-principal">📚 CENTRAL DE CONSULTA</div><p class="hint">Toque num dia pra reabrir o conteúdo dele.</p></div>' +
    '<button class="btn-icon" id="treinBtnVoltar">← Voltar</button>' +
    '</div>' +
    '<div class="trein-cards-grid">' + cardsHtml + '</div>' +
    '</div>';

  box.querySelector('#treinBtnVoltar').onclick = function() { T.view = 'inicio'; treinoRender(); };
  var cards = box.querySelectorAll('.trein-card');
  for (var c = 0; c < cards.length; c++) {
    (function(card) {
      card.onclick = function() { T.diaAberto = parseInt(card.getAttribute('data-dia'), 10); T.view = 'aula'; treinoRender(); };
    })(cards[c]);
  }
}
