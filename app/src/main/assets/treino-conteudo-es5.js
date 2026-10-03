/* ═══════════════════════════════════════════════════════════════════════
   VALENTE OS — CENTRO DE CAPACITAÇÃO — CONTEÚDO (versão ES5 pra tablets antigos)
   Gerado a partir de treinamento-conteudo.js (v131 / trilha.versao=3).
   Conteúdo é só dados (objetos/arrays/strings) — a única mudança real
   pra ficar ES5 é troca de `const` por `var`. Mantém sincronizado com o
   arquivo moderno sempre que a trilha Comercial for revisada.
   ═══════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// VALENTE OS — CENTRO DE CAPACITAÇÃO — CONTEÚDO
// ═══════════════════════════════════════════════════════════════════════════
// Arquivo só de DADOS. Nenhuma lógica de interface aqui — isso fica em
// treinamento.js. A ideia é poder editar/criar uma trilha inteira sem
// precisar mexer no motor.
//
// v119 — ajuste estrutural: a entidade principal é a TRILHA, não "o curso
// comercial". "Comercial" é hoje a primeira trilha, mas o motor foi escrito
// pra tratar qualquer trilha do mesmo jeito. Trilhas futuras (producao,
// pintura, acabamento, modelagem, atendimento, gestao, procedimentos...)
// entram só adicionando outra chave abaixo — nada no motor precisa mudar.
//
// v129 — CONTEÚDO REESCRITO conforme revisão entregue pelo responsável
// (documento "Formação Comercial Valente — Aulas Revisadas"). Princípio
// pedagógico seguido: cada aula caminha por situação → conceito → exemplo →
// decisão → erro → correção → nova situação → prática. Alternativas erradas
// são plausíveis (coisas que um iniciante realmente faria), nada de
// pegadinha irreal. Onde uma regra de negócio da Valente ainda não foi
// definida (% de desconto, taxa de marketplace, política de entrada/saldo,
// prazo padrão), o conteúdo usa CONSULTAR RESPONSÁVEL — nenhuma regra foi
// inventada neste arquivo.
//
// v131 — CONTEÚDO REESCRITO DE NOVO conforme "Formação Comercial Valente v3
// — Ferramentas primeiro, atendimento depois" (docx enviado pelo responsável).
// Mudança estrutural: Dias 1-4 agora são um TOUR GUIADO pelas ferramentas
// reais (Pedidos/Kanban, Peças Próprias, Caixa, Orçamento) e pelos tipos de
// demanda/orçamento — sem nenhum atendimento ao cliente ainda. Só a partir
// do Dia 5 entra RECEBER→ENTENDER→CONFIRMAR→APRESENTAR→CONDUZIR, já usando
// o que foi visto nos tours. Critério de qualidade pedagógica do documento:
// "o colaborador já recebeu explicação, demonstração ou prática suficiente
// pra chegar nesta resposta? Se não, falta conteúdo antes da avaliação."
//
// Cada trilha tem:
//   id                 — igual à chave do objeto (redundante de propósito,
//                         fica mais fácil de usar a trilha isolada em algum
//                         lugar sem precisar saber sob qual chave ela vive)
//   nome, descricao     — texto de apresentação
//   icone               — emoji usado nos cards
//   versao              — versão DESTA trilha (não é mais um número global!
//                          cada trilha evolui e versiona de forma independente;
//                          ao revisar o conteúdo de uma trilha de forma
//                          relevante, incrementa só o versao dela — o
//                          progresso salvo com a versão anterior continua no
//                          histórico, sem se misturar com o novo)
//   cargosPermitidos    — array de cargos que enxergam esta trilha no Centro
//                          de Capacitação. null/ausente = visível pra
//                          qualquer colaborador identificado (mesmo padrão
//                          já usado em ABAS_PERMITIDAS_POR_CARGO no app.js:
//                          lista = restrito, ausência = sem restrição)
//   competencias        — lista de competências que a trilha desenvolve.
//   criteriosConclusao  — hoje null = "concluir todos os dias/aulas" (regra
//                          padrão aplicada pelo motor).
//   dias                — granularidade "dia" (cada dia = uma aula).
//
// ETAPAS DA AULA (motor de navegação)
// Cada dia tem um array `etapas`. Cada etapa tem um `tipo`, reconhecido pelo
// motor (treinamento.js):
//   conteudo          — texto informativo, sem resposta obrigatória
//   multipla_escolha  — pergunta + opções, 1 correta (`erroCriticoOpcoes`
//                        marca índices de opções que, se escolhidas, contam
//                        como erro crítico no resultado por competência)
//   verdadeiro_falso  — afirmação + Verdadeiro/Falso
//   resposta_cliente  — balão de cliente + opções, cada uma com sua própria
//                        correta/feedback/erroCritico
//   selecionar_itens  — múltipla seleção com conjunto correto de itens
//   ordenar           — ordenar itens (já listados na ORDEM CORRETA no
//                        conteúdo — o motor embaralha a exibição sozinho)
//   cenario           — diálogo em nós (nos: {a:{...}, b:{...}}), cada opção
//                        pode levar a `proximo` nó; sem `proximo` o cenário
//                        encerra. Permite revelar informação progressivamente,
//                        como na missão do Dia 10.
//   checklist         — todos os itens precisam ser marcados pra avançar
//   missao            — bloco maior (objetivo/contexto/tarefas/critério),
//                        exige anotação escrita por tarefa pra concluir
//                        (v127); `local`, quando informado, aponta pra uma
//                        aba real do sistema — sem ele, é raciocínio/anotação
//   confirmacao_pratica — pede pra abrir uma aba real e localizar algo,
//                        execução só declarada (não altera dados reais)
//   texto_livre       — resposta escrita livre, com pontos esperados
//                        mostrados depois (não é correção automática)
//
// Campos comuns a `multipla_escolha` / `verdadeiro_falso`:
//   feedbackCerto         — texto mostrado quando acerta
//   feedbackErrado        — texto padrão mostrado quando erra (opcional)
//   feedbackPorOpcao      — (só multipla_escolha) array paralelo a `opcoes`,
//                           feedback específico pra cada alternativa errada
// ═══════════════════════════════════════════════════════════════════════════

var TREINAMENTO_TRILHAS = {
  comercial: {
    id: 'comercial',
    nome: 'Formação Comercial Valente',
    descricao: 'Do atendimento ao pós-venda: como vender o que a Valente produz.',
    icone: '🎓',
    versao: 3, // v131 — conteúdo reescrito de novo (v3, ferramentas primeiro); progresso das versões anteriores fica no histórico, sem se misturar
    cargosPermitidos: ['comercial'],
    competencias: [
      'Atendimento e condução de venda',
      'Orçamento e formação de preço',
      'Fluxo de pedido no Valente OS',
      'Venda em marketplace',
      'Negociação e prospecção',
    ],
    criteriosConclusao: null, // null = concluir todos os dias (regra padrão do motor)
    dias: [
      {
        dia: 1, titulo: 'Minha Estação Comercial Valente', subtitulo: 'Conhecer as ferramentas disponíveis no usuário Comercial e saber para que cada uma serve antes de atender clientes',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Antes de vender, conheça sua bancada de trabalho',
            texto: 'O Valente OS organiza informações usadas pelo Comercial e por outras etapas da operação. Você não precisa decorar tudo no primeiro dia. Precisa aprender onde cada tipo de informação nasce, onde é consultado e quando uma ferramenta deve ser usada. No usuário Comercial, as áreas principais são: Pedidos, Peças Próprias, Caixa, Orçamento e Centro de Capacitação. Regra do Dia 1: antes de perguntar a outra pessoa ou responder de memória, verifique se a informação já está disponível na ferramenta correta.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'operacao_os', local: 'Aba Pedidos',
            instrucao: 'Abra a aba Pedidos. Nela ficam os pedidos registrados e o andamento operacional de cada trabalho. O que é Kanban? É uma forma visual de acompanhar um trabalho por etapas — cada pedido é um cartão que passa de uma coluna para outra conforme avança. Na Valente, o fluxo pode apresentar etapas como: Negociação → Pago → Modelando → Imprimindo → Pós-impressão → Pintura → Preparar/envio → Enviado. O nome da coluna informa a etapa atual: estar em Pintura não significa automaticamente que o pedido está pronto para retirada; ainda podem existir preparação, conferência e envio.',
          },
          {
            tipo: 'conteudo', titulo: 'O que existe dentro de um pedido',
            texto: 'Para um pedido ser útil à operação, ele precisa conter informações suficientes pra identificar quem pediu, o que foi combinado e o que deverá ser produzido (os campos exatos seguem a tela real do Valente OS): Cliente (quem está comprando), Produto/serviço (o que será produzido ou entregue), Quantidade, Valor (valor comercial acordado), Pagamento/entrada e saldo (conforme a regra vigente e os campos disponíveis), Prazo (condição confirmada), Observações (detalhes necessários pra executar corretamente). Atenção: nunca invente um dado só pra completar um campo — se uma informação obrigatória ainda não foi confirmada, siga o procedimento vigente ou consulte o responsável.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'produtos', local: 'Aba Peças Próprias',
            instrucao: 'Abra Peças Próprias. Esta área reúne produtos e referências já cadastrados pela Valente — ajuda o Comercial a verificar se algo já existe antes de tratar toda solicitação como projeto novo. Observe os campos disponíveis na versão atual: nome, foto, preço, estoque, categoria, tamanho ou outros dados cadastrados.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'ferramentas_digitais', local: 'Aba Caixa',
            instrucao: 'Abra Caixa. O Comercial usa esta área pra consultar informações financeiras relacionadas aos pedidos, como valores recebidos e saldos, dentro das permissões do usuário. O objetivo aqui não é fazer a contabilidade da empresa — é conseguir responder perguntas operacionais sem alterar dados por suposição.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'orcamento', local: 'Aba Orçamento',
            instrucao: 'Abra Orçamento. Esta é a ferramenta usada pra formar preço com base em informações do trabalho — orçamento não deve sair de memória ou chute. A tela tem caminhos diferentes pra situações diferentes; dois caminhos importantes são "Tenho STL" e "Só tenho imagem". Nesta primeira aula, o objetivo é só localizar esses caminhos — no Dia 4 você aprende a usá-los.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'ferramentas_digitais', local: 'Centro de Capacitação (aqui mesmo)',
            instrucao: 'É a área em que você está agora. Aqui ficam as trilhas de aprendizagem, progresso e, futuramente, consultas rápidas de procedimento. Quando não lembrar um processo, o Centro de Capacitação deve ser uma das primeiras fontes de consulta.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os',
            pergunta: 'Um cliente pergunta: "Em que etapa está meu pedido?" Onde você procura primeiro?',
            opcoes: ['Caixa', 'Pedidos/Kanban', 'Orçamento', 'Peças Próprias'],
            correta: 1,
            feedbackCerto: 'Você aprendeu no tour que o Kanban mostra o estágio operacional do pedido.',
            feedbackPorOpcao: ['Caixa é financeiro, não status — tente de novo.', null, 'Orçamento calcula preço, não mostra status — tente de novo.', 'Peças Próprias é estoque de produto pronto, não status de pedido — tente de novo.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'ferramentas_digitais',
            pergunta: 'Você precisa verificar quanto ainda falta pagar de um pedido. Onde procura?',
            opcoes: ['Caixa', 'Orçamento', 'Peças Próprias', 'Centro de Capacitação'],
            correta: 0,
            feedbackCerto: 'A área financeira é a fonte adequada pra consultar pagamento e saldo dentro das permissões do Comercial.',
            feedbackPorOpcao: [null, 'Orçamento calcula preço, não mostra o que já foi pago — tente de novo.', 'Peças Próprias não tem nada a ver com pagamento — tente de novo.', 'Centro de Capacitação é aprendizado, não controle financeiro — tente de novo.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'produtos',
            pergunta: 'O cliente pergunta se a Valente já possui determinado modelo cadastrado. Onde começa a busca?',
            opcoes: ['Pedidos', 'Caixa', 'Peças Próprias', 'Orçamento'],
            correta: 2,
            feedbackCerto: 'Essa área reúne produtos e referências já cadastrados.',
            feedbackPorOpcao: ['Pedidos é pra pedidos já registrados, não catálogo — tente de novo.', 'Caixa é financeiro — tente de novo.', null, 'Orçamento calcula preço, não mostra o catálogo — tente de novo.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'orcamento',
            pergunta: 'Você precisa calcular o preço de uma impressão. Qual ferramenta foi criada pra isso?',
            opcoes: ['Orçamento', 'Caixa', 'Pedidos', 'Capacitação'],
            correta: 0,
            feedbackCerto: 'O Dia 4 vai ensinar a usar essa ferramenta em profundidade.',
            feedbackPorOpcao: [null, 'Caixa não calcula preço — tente de novo.', 'Pedidos é pra registrar depois de orçado — tente de novo.', 'Capacitação é aprendizado, não a ferramenta de cálculo — tente de novo.'],
          },
        ],
      },
      {
        dia: 2, titulo: 'Como funciona um pedido', subtitulo: 'Aprender a registrar informações mínimas, compreender o cartão do pedido e interpretar o Kanban',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Por que registrar corretamente',
            texto: 'Um pedido é a tradução operacional do que foi combinado com o cliente. Se o registro estiver incompleto ou errado, produção, financeiro e atendimento podem trabalhar com informações diferentes. Registrar não é "encher campos" — é garantir que outra pessoa consiga entender o pedido sem depender da memória de quem atendeu.',
          },
          {
            tipo: 'conteudo', titulo: 'Dados mínimos e origem da informação',
            texto: 'Cliente vem do cadastro/identificação do comprador. Produto e quantidade vêm do que foi aprovado. Valor vem do orçamento/negociação. Pagamento vem do que foi efetivamente recebido ou da condição confirmada. Prazo deve ser o prazo confirmado, não o desejado pelo cliente quando ainda não foi validado. Observações guardam detalhes relevantes para execução.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'operacao_os', local: 'Criação/edição de pedido',
            instrucao: 'Abra a criação/edição de pedido e percorra os campos sem salvar um pedido real. Pra cada campo, responda mentalmente: "de onde vem esta informação?" e "o que pode acontecer se eu preencher errado?".',
          },
          {
            tipo: 'conteudo', titulo: 'Entendendo o Kanban em profundidade',
            texto: 'Negociação indica que a oportunidade ainda está sendo tratada. Pago representa a condição de pagamento/entrada conforme a regra vigente. Modelando indica desenvolvimento/modelagem. Imprimindo indica fabricação em impressora. Pós-impressão reúne operações posteriores à impressão. Pintura indica acabamento de pintura. Preparar/envio indica conferência, embalagem ou preparação para saída. Enviado indica que o pedido seguiu para o cliente. Nem todo trabalho terá exatamente a mesma necessidade em todas as etapas — o importante é interpretar o estado mostrado e não prometer algo que o sistema não confirma.',
          },
          {
            tipo: 'conteudo', titulo: 'Como responder andamento',
            texto: 'Use a sequência: CONSULTAR → INTERPRETAR → RESPONDER. Se o status não for suficiente: CONSULTAR → CONFIRMAR COM O RESPONSÁVEL → RESPONDER.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os',
            pergunta: 'O pedido aparece em "Imprimindo". O cliente pergunta: "Já está sendo pintado?"',
            opcoes: ['Sim, porque já está em produção.', 'Não podemos afirmar; o sistema ainda mostra Imprimindo.', 'Sim, impressão e pintura são a mesma etapa.', 'Verificar o Caixa.'],
            correta: 1,
            feedbackCerto: 'Pintura é uma etapa posterior no fluxo apresentado.',
            feedbackPorOpcao: ['O sistema ainda não mostra Pintura — não dá pra afirmar isso — tente de novo.', null, 'Impressão e pintura são etapas diferentes no fluxo — tente de novo.', 'Caixa é financeiro, não mostra etapa de produção — tente de novo.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os', erroCriticoOpcoes: [0, 2],
            pergunta: 'O pedido aparece em "Pintura" e o cliente pergunta se pode retirar hoje. O que fazer?',
            opcoes: ['Confirmar retirada imediatamente.', 'Verificar se concluiu as etapas necessárias e se está liberado.', 'Mover para Enviado.', 'Dizer que não sem consultar.'],
            correta: 1,
            feedbackCerto: 'Estar em Pintura não significa automaticamente estar pronto pra retirada.',
            feedbackPorOpcao: ['Confirmar sem verificar é um erro crítico — status intermediário não é liberação.', null, 'Mover manualmente o pedido pra fingir que está pronto é um erro crítico.', 'Recusar sem consultar também pode estar errado — verifique antes.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os',
            pergunta: 'Qual informação deve entrar no campo prazo?',
            opcoes: ['O prazo que o cliente gostaria, mesmo sem confirmação.', 'O prazo confirmado conforme o processo da empresa.', 'Qualquer data aproximada.', 'A data em que a conversa começou.'],
            correta: 1,
            feedbackCerto: 'O registro operacional deve representar o que foi efetivamente confirmado.',
            feedbackPorOpcao: ['Desejo do cliente não é prazo confirmado — tente de novo.', null, 'Uma data aproximada não é uma confirmação real — tente de novo.', 'A data do início da conversa não tem relação com o prazo de entrega — tente de novo.'],
          },
          {
            tipo: 'missao', competencia: 'operacao_os',
            titulo: 'Missão do dia',
            objetivo: 'Praticar quais dados mínimos um pedido precisa ter e em que etapa do Kanban ele começaria.',
            contexto: 'Pense num pedido fictício.',
            tarefas: ['Identifique: cliente, produto, quantidade, valor, pagamento/saldo, prazo e observações.', 'Indique em qual etapa do Kanban esse pedido começaria segundo o procedimento vigente. Não grave dados reais.'],
            criterioConclusao: 'Ter identificado os dados e a etapa inicial antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 3, titulo: 'O que a Valente vende?', subtitulo: 'Entender os tipos de demanda para saber qual ferramenta e qual caminho usar depois',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Produto existente, personalizado e projeto novo',
            texto: 'Produto existente: já foi desenvolvido e pode possuir cadastro/referência em Peças Próprias. Produto personalizado: parte de algo existente, mas recebe alterações. Projeto sob encomenda: nasce de foto, desenho, ideia ou necessidade e ainda exige desenvolvimento/modelagem.',
          },
          {
            tipo: 'conteudo', titulo: 'Quando o cliente já possui STL',
            texto: 'STL é um arquivo 3D usado como base para impressão. Ter um STL pode eliminar a necessidade de criar o modelo do zero, mas não elimina perguntas sobre tamanho, quantidade, acabamento, material adequado ou prazo.',
          },
          {
            tipo: 'conteudo', titulo: 'Resina e FDM — visão comercial',
            texto: 'Resina costuma ser indicada quando detalhe e acabamento são prioridade. FDM costuma ser usada em peças maiores, funcionais ou quando suas características atendem melhor ao projeto. O Comercial não deve transformar isso em regra absoluta. Dúvida técnica específica deve ser confirmada com a produção.',
          },
          {
            tipo: 'conteudo', titulo: 'Quantidade muda a operação',
            texto: 'Produzir uma unidade e produzir cem unidades não são a mesma operação. Volume pode alterar capacidade, prazo, organização, custo e logística. Por isso, grandes quantidades exigem análise antes de prometer condição ou prazo.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'produtos',
            pergunta: '"Quero esse modelo do catálogo, mas com outro nome na base." Como classificar?',
            opcoes: ['Produto existente sem alteração', 'Produto personalizado', 'Projeto totalmente novo', 'Apenas impressão de STL'],
            correta: 1,
            feedbackCerto: 'Existe uma solução de base, mas haverá alteração solicitada pelo cliente.',
            feedbackPorOpcao: ['Houve pedido de alteração — não é sem alteração — tente de novo.', null, 'Já existe uma base pronta, não é do zero — tente de novo.', 'Não foi mencionado nenhum arquivo 3D enviado — tente de novo.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'produtos',
            pergunta: '"Tenho STL e quero 80 unidades pintadas." O que o STL resolve e o que ainda precisa ser analisado?',
            opcoes: ['Resolve tudo.', 'Resolve a existência do arquivo 3D; ainda é preciso analisar tamanho, quantidade, acabamento, prazo e demais condições.', 'Só resolve o pagamento.', 'Significa que deve ser FDM.'],
            correta: 1,
            feedbackCerto: 'Arquivo pronto não elimina as variáveis comerciais e produtivas.',
            feedbackPorOpcao: ['O STL só resolve o arquivo, não o resto — tente de novo.', null, 'STL não tem relação com pagamento — tente de novo.', 'Ter STL não define a tecnologia de impressão — tente de novo.'],
          },
          {
            tipo: 'missao', competencia: 'produtos',
            titulo: 'Missão de classificação',
            objetivo: 'Classificar demandas e identificar o que ainda falta descobrir antes de orçar.',
            contexto: 'Cinco demandas: peça do catálogo; peça do catálogo com personalização; STL pronto; foto sem arquivo 3D; pedido de 200 unidades.',
            tarefas: ['Classifique cada uma das 5 demandas.', 'Pra cada uma, diga qual informação ainda precisaria obter antes de orçar.'],
            criterioConclusao: 'Ter classificado as 5 e identificado a informação faltante de cada uma antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 4, titulo: 'Aprendendo a fazer um orçamento', subtitulo: 'Conhecer a aba Orçamento, entender os caminhos disponíveis e aprender quais informações alimentam a ferramenta',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'O que é um orçamento',
            texto: 'Orçar é transformar informações do pedido em uma proposta usando regras e ferramentas da empresa. O preço não deve ser escolhido por sensação. Material é apenas uma parte; também podem existir mão de obra, perdas, operação, acabamento, taxas, impostos e margem.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'ferramentas_digitais', local: 'Aba Orçamento',
            instrucao: 'Abra a aba Orçamento. Localize os caminhos "Tenho STL" e "Só tenho imagem". Observe os campos existentes em cada caminho.',
          },
          {
            tipo: 'conteudo', titulo: 'Caminho: Tenho STL',
            texto: 'Use quando o cliente fornece um arquivo 3D. A ferramenta poderá exigir informações extraídas do arquivo ou definidas no pedido, como dimensões, tecnologia, material, tempo/peso estimado, quantidade e acabamento, conforme a versão atual do sistema.',
          },
          {
            tipo: 'conteudo', titulo: 'Caminho: Só tenho imagem',
            texto: 'Use quando o cliente possui foto, desenho ou referência, mas não um modelo 3D pronto. Nessa situação pode existir uma etapa de avaliação/modelagem antes da produção. A imagem não deve ser tratada como se fosse automaticamente um STL.',
          },
          {
            tipo: 'conteudo', titulo: 'As 6 perguntas de ouro agora têm um motivo',
            texto: 'O que deseja produzir? Tem arquivo 3D ou só imagem? Qual tamanho? Quantas unidades? Precisa de pintura/acabamento? Para quando precisa? Essas perguntas existem porque as ferramentas e a operação precisam dessas informações pra escolher o caminho, calcular e verificar viabilidade.',
          },
          {
            tipo: 'missao', competencia: 'orcamento',
            titulo: 'Exercício orientado',
            objetivo: 'Praticar a escolha do caminho certo da calculadora.',
            contexto: 'Caso A — STL pronto, 1 unidade. Caso B — somente fotografia. Caso C — STL pronto, 50 unidades pintadas.',
            tarefas: ['Em cada caso, identifique o caminho da ferramenta (Tenho STL / Só tenho imagem).', 'Em cada caso, liste os dados que ainda faltam. Não grave dados reais.'],
            criterioConclusao: 'Ter pensado nos 3 casos antes de marcar como concluída.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'orcamento',
            pergunta: 'Cliente envia apenas uma fotografia e pede preço. Qual caminho conceitual deve ser considerado primeiro?',
            opcoes: ['Tratar a foto como STL.', 'Caminho de imagem/referência, com avaliação/modelagem quando necessário.', 'Usar preço de produto parecido.', 'Perguntar somente forma de pagamento.'],
            correta: 1,
            feedbackCerto: 'A aula mostrou que foto é referência visual, não arquivo 3D pronto.',
            feedbackPorOpcao: ['Foto não é STL — tente de novo.', null, 'Comparar com outro produto não substitui o cálculo real — tente de novo.', 'Forma de pagamento vem depois de orçar — tente de novo.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'orcamento',
            pergunta: 'Por que não basta saber o custo do material para definir o preço?',
            opcoes: ['Porque material nunca entra no preço.', 'Porque existem outros custos e regras que também podem compor a proposta.', 'Porque todo produto precisa ter o mesmo preço.', 'Porque o cliente escolhe o lucro.'],
            correta: 1,
            feedbackCerto: 'Preço não é apenas material mais uma diferença arbitrária.',
            feedbackPorOpcao: ['Material entra sim no preço, só não é o único custo — tente de novo.', null, 'Cada produto tem seu próprio custo — não é sempre o mesmo preço — tente de novo.', 'O lucro não é escolhido pelo cliente — tente de novo.'],
          },
        ],
      },
      {
        dia: 5, titulo: 'Agora vamos atender o cliente', subtitulo: 'Usar as ferramentas já conhecidas para receber, entender, confirmar, apresentar e conduzir uma demanda',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Atendimento não é decorar frases',
            texto: 'Agora você já conhece o sistema, sabe o que é um pedido, reconhece tipos de demanda e conhece os caminhos do orçamento. O atendimento serve para obter e organizar as informações necessárias para usar essas ferramentas corretamente.',
          },
          {
            tipo: 'conteudo', titulo: 'Fluxo do atendimento',
            texto: 'RECEBER → ENTENDER → CONFIRMAR → APRESENTAR → CONDUZIR. Receber é acolher. Entender é descobrir a necessidade. Confirmar é repetir/organizar o que foi entendido. Apresentar é oferecer a solução ou proposta adequada. Conduzir é indicar o próximo passo.',
          },
          {
            tipo: 'conteudo', titulo: 'Perguntar com propósito',
            texto: 'Não faça um interrogatório. Use o que o cliente já disse e pergunte apenas o que falta. Se ele já informou quantidade, não pergunte novamente. Se mandou STL, não pergunte se tem arquivo 3D. A conversa deve parecer natural, mas produzir informação útil.',
          },
          {
            tipo: 'conteudo', titulo: 'Quando não souber',
            texto: 'Nunca transforme dúvida em certeza. Use: "Vou confirmar essa informação e retorno para você." Isso vale para técnica, prazo, capacidade, desconto ou regra que não esteja clara.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'atendimento', erroCriticoOpcoes: [3],
            pergunta: 'Cliente: "Quanto custa uma miniatura personalizada?" Qual resposta inicia melhor o atendimento?',
            opcoes: ['"R$70."', '"Claro. Você já tem alguma referência, foto ou arquivo 3D do que gostaria de fazer?"', '"Depende."', '"Me mande o pagamento primeiro."'],
            correta: 1,
            feedbackCerto: 'A resposta acolhe e começa a obter uma informação que define o caminho do orçamento.',
            feedbackPorOpcao: ['Você deu um preço sem saber nada sobre o pedido — tente de novo.', null, 'Resposta vaga, não conduz a nada — tente de novo.', 'Pedir pagamento antes de qualquer levantamento é um erro crítico.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'atendimento', erroCriticoOpcoes: [2, 3],
            pergunta: 'Cliente: "Tenho STL, quero 30 unidades de 8 cm pintadas para um evento daqui a 20 dias." Qual atitude é melhor?',
            opcoes: ['Repetir as seis perguntas de ouro desde o começo.', 'Reconhecer o que já foi informado e investigar apenas o que ainda falta, além de verificar orçamento/capacidade.', 'Dar desconto automático pela quantidade.', 'Prometer o prazo.'],
            correta: 1,
            feedbackCerto: 'Bom atendimento aproveita os dados já fornecidos e evita interrogatório.',
            feedbackPorOpcao: ['Repetir tudo que ele já disse vira interrogatório — tente de novo.', null, 'Desconto automático fora da autonomia é erro crítico.', 'Prometer prazo sem verificar capacidade é erro crítico.'],
          },
          {
            tipo: 'texto_livre', competencia: 'atendimento',
            pergunta: 'Cliente: "Vi uma peça de vocês no Instagram e queria fazer uma parecida para minha filha." Escreva sua primeira resposta.',
            pontosEsperados: ['Acolher', 'Identificar qual peça/referência', 'Iniciar levantamento sem inventar preço ou prazo'],
          },
          {
            tipo: 'missao', competencia: 'atendimento',
            titulo: 'Missão',
            objetivo: 'Conduzir mentalmente três atendimentos reconhecendo qual ferramenta usar depois.',
            contexto: '1) cliente com produto do catálogo. 2) cliente com STL. 3) cliente com apenas fotos.',
            tarefas: ['Conduza os três atendimentos simulados.', 'Em cada um, identifique qual ferramenta do Valente OS será usada depois da conversa.'],
            criterioConclusao: 'Ter pensado nos 3 atendimentos e nas ferramentas correspondentes antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 6, titulo: 'Da negociação ao pedido', subtitulo: 'Transformar uma oportunidade aprovada em informação operacional correta, sem confundir conversa com pedido',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'O que muda quando o cliente aprova',
            texto: 'Aprovação comercial precisa ser convertida em registro operacional. O pedido deve refletir o que foi combinado: produto, quantidade, valor, pagamento, prazo confirmado e observações relevantes.',
          },
          {
            tipo: 'conteudo', titulo: 'Conferência antes do registro',
            texto: 'Antes de concluir o pedido, compare o que está no sistema com o que foi aprovado. Uma divergência pequena pode virar erro grande na produção.',
          },
          {
            tipo: 'conteudo', titulo: 'Pagamento e início do fluxo',
            texto: 'Não invente política de entrada ou condição de pagamento. Use a regra vigente. Se houver dúvida, consulte o responsável. O status financeiro deve representar o que realmente aconteceu.',
          },
          {
            tipo: 'conteudo', titulo: 'Acompanhamento depois da venda',
            texto: 'Depois de registrado, o Comercial acompanha pelo Kanban e consulta o Caixa quando necessário. O sistema deve ser a primeira fonte antes de interromper produção ou financeiro.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os', erroCriticoOpcoes: [0, 2],
            pergunta: 'Cliente diz "pode fazer", mas a condição de pagamento ainda não está confirmada. O que fazer?',
            opcoes: ['Marcar como Pago para adiantar.', 'Seguir a regra vigente e confirmar o que faltar antes de representar o pedido como pago.', 'Inventar 50% de entrada.', 'Enviar direto para impressão.'],
            correta: 1,
            feedbackCerto: 'O sistema deve refletir fatos e regras confirmadas.',
            feedbackPorOpcao: ['Marcar como pago sem o pagamento é erro crítico.', null, 'Inventar um percentual é erro crítico.', 'Mandar pra produção sem confirmar pagamento foge da regra — risco operacional.'],
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os',
            pergunta: 'Ao registrar o pedido, você percebe que o prazo no WhatsApp era apenas um desejo do cliente e nunca foi confirmado. O que fazer?',
            opcoes: ['Registrar como prazo fechado.', 'Confirmar viabilidade antes de registrar como compromisso.', 'Escolher uma data parecida.', 'Deixar a produção descobrir depois.'],
            correta: 1,
            feedbackCerto: 'Desejo do cliente não é automaticamente prazo confirmado.',
            feedbackPorOpcao: ['Isso não foi confirmado — não registre como fechado — tente de novo.', null, 'Chutar uma data parecida é inventar informação — tente de novo.', 'Deixar a produção descobrir depois gera um problema evitável — tente de novo.'],
          },
          {
            tipo: 'missao', competencia: 'operacao_os',
            titulo: 'Missão',
            objetivo: 'Transformar um orçamento aprovado em pedido registrado corretamente.',
            contexto: 'Receba um orçamento fictício aprovado.',
            tarefas: ['Monte o conjunto de informações necessárias para criar o pedido.', 'Descreva como acompanharia o trabalho até Enviado.'],
            criterioConclusao: 'Ter montado as informações e descrito o acompanhamento antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 7, titulo: 'Colocando um produto à venda', subtitulo: 'Aprender a transformar informações confiáveis do produto em cadastro e anúncio comercial',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Antes de anunciar, a informação precisa estar certa',
            texto: 'Um anúncio ruim não é apenas feio. Pode gerar preço errado, expectativa errada, dúvidas e retrabalho. Antes de publicar, confira a fonte das informações.',
          },
          {
            tipo: 'conteudo', titulo: 'O que um anúncio precisa responder',
            texto: 'O que é? Para quem é? Qual tamanho? Como é feito? Quais opções existem? Quanto custa? Qual o prazo? Como comprar? Nem todo anúncio precisa ter um texto enorme, mas não deve esconder informação essencial.',
          },
          {
            tipo: 'conteudo', titulo: 'Título, fotos e descrição',
            texto: 'Título identifica o produto de forma clara. Fotos precisam representar corretamente a peça. Descrição organiza características e condições. Não invente característica apenas para deixar o anúncio mais atraente.',
          },
          {
            tipo: 'confirmacao_pratica', competencia: 'produtos', local: 'Aba Peças Próprias',
            instrucao: 'Abra Peças Próprias e use os dados cadastrados como ponto de partida. Confirme preço, tamanho, variações e demais campos relevantes antes de publicar.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'produtos', erroCriticoOpcoes: [1, 3],
            pergunta: 'A foto está ótima, mas o preço do cadastro está diferente do material de divulgação antigo. O que fazer?',
            opcoes: ['Usar o menor preço.', 'Publicar e corrigir depois.', 'Confirmar qual informação está vigente antes de publicar.', 'Tirar o preço e inventar no atendimento.'],
            correta: 2,
            feedbackCerto: 'Quando duas fontes divergem, o Comercial precisa confirmar a informação vigente.',
            feedbackPorOpcao: ['Escolher o menor preço "no chute" é inventar informação — tente de novo.', 'Publicar errado e corrigir depois é erro crítico — informação errada pode já ter alcançado o cliente.', null, 'Inventar preço no atendimento é erro crítico.'],
          },
          {
            tipo: 'texto_livre', competencia: 'produtos',
            pergunta: 'Com os dados: miniatura personalizada de pet, resina, 10 cm, pintura manual, prazo 20 dias, preço R$85 — escreva um título e uma descrição curta.',
            pontosEsperados: ['Usa somente informações fornecidas', 'Identifica produto, tamanho/personalização e condições relevantes', 'Não inventa benefícios não informados'],
          },
          {
            tipo: 'missao', competencia: 'produtos',
            titulo: 'Missão',
            objetivo: 'Montar e revisar criticamente um anúncio de treinamento.',
            contexto: 'Use os dados da etapa anterior ou um produto fictício similar.',
            tarefas: ['Monte um anúncio de treinamento.', 'Revise procurando 5 tipos de erro: informação faltando, preço divergente, prazo ausente, foto inadequada e promessa não confirmada.'],
            criterioConclusao: 'Ter montado e revisado o anúncio procurando os 5 tipos de erro antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 8, titulo: 'Marketplaces e redes sociais', subtitulo: 'Entender como o canal de venda muda preço, comunicação e condução do cliente',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Venda direta e marketplace não são iguais',
            texto: 'Shopee, Mercado Livre e outros canais podem possuir taxas, comissões e custos próprios. Por isso, copiar o preço da venda direta pode reduzir o resultado da Valente.',
          },
          {
            tipo: 'conteudo', titulo: 'O que o Comercial precisa entender',
            texto: 'Preço anunciado → custos/taxas do canal → líquido recebido → custo do produto → resultado/margem. Não é necessário decorar taxas. É necessário usar parâmetros atualizados da ferramenta ou consultar o responsável.',
          },
          {
            tipo: 'conteudo', titulo: 'Calculadora de marketplace',
            texto: '⚠️ Quando o recurso estiver disponível no Valente OS, a ferramenta deve mostrar os modos reais: preservar determinado resultado, ou testar um preço de anúncio e visualizar o que sobra. Enquanto não estiver disponível, a regra é CONSULTAR RESPONSÁVEL e não inventar percentual.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'marketplace', erroCriticoOpcoes: [0, 3],
            pergunta: 'Preço direto é R$70. Você pode copiar automaticamente R$70 para qualquer marketplace?',
            opcoes: ['Sim.', 'Não; é preciso considerar os custos atuais do canal.', 'Sim, se a peça for pequena.', 'Não, mas basta acrescentar 10%.'],
            correta: 1,
            feedbackCerto: 'Nem copiar o preço nem inventar um percentual substitui a ferramenta.',
            feedbackPorOpcao: ['Copiar o preço direto ignora as taxas do canal — erro crítico.', null, 'Tamanho do produto não muda o fato de que o canal cobra taxas — tente de novo.', 'Inventar um percentual fixo (10%) também é chute — erro crítico.'],
          },
          {
            tipo: 'conteudo', titulo: 'Redes sociais como entrada comercial',
            texto: 'Nas redes, nem toda interação é venda. O Comercial precisa reconhecer intenção. Um elogio é engajamento; "vocês fazem personalizado?" é oportunidade; "qual prazo para 30?" é uma oportunidade ainda mais qualificada.',
          },
          {
            tipo: 'conteudo', titulo: 'Conteúdo e próximo passo',
            texto: 'Produto mostra o que vendemos. Processo mostra fabricação/acabamento. Prova mostra resultado ou entrega. A chamada para ação indica o próximo passo: WhatsApp, orçamento ou consulta.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'redes_sociais',
            pergunta: 'Qual interação merece prioridade comercial?',
            opcoes: ['❤️', '"Muito bonito!"', '"Vocês fazem 30 unidades com a logo da minha empresa?"', '🔥'],
            correta: 2,
            feedbackCerto: 'A pessoa apresentou necessidade, quantidade e personalização: há intenção comercial clara.',
            feedbackPorOpcao: ['Reação é só sinal de atenção — tente de novo.', 'Elogio não revela necessidade específica — tente de novo.', null, 'Reação não revela necessidade nenhuma — tente de novo.'],
          },
          {
            tipo: 'missao', competencia: 'redes_sociais',
            titulo: 'Missão',
            objetivo: 'Praticar os formatos de conteúdo comercial e reconhecer quando uma interação vira atendimento.',
            contexto: 'Produto fictício.',
            tarefas: ['Prepare uma publicação, um Story, uma resposta de Direct e uma chamada para WhatsApp.', 'Identifique qual interação deve virar atendimento.'],
            criterioConclusao: 'Ter preparado os itens e identificado a interação antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 9, titulo: 'Negociação, follow-up e prospecção', subtitulo: 'Aprender a investigar objeções, respeitar limites de autonomia e continuar oportunidades',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Negociar não é dar desconto',
            texto: 'Quando o cliente diz "está caro", ele pode estar comparando tamanho, acabamento, prazo, personalização, forma de pagamento ou simplesmente não ter entendido o valor da proposta. Primeiro investigue.',
          },
          {
            tipo: 'conteudo', titulo: 'Comparar propostas corretamente',
            texto: 'Preço só é comparável quando o escopo também é. Pergunte o que está incluído na outra proposta antes de atacar concorrente ou alterar preço.',
          },
          {
            tipo: 'conteudo', titulo: 'Autonomia',
            texto: 'PODE: consultar produto, enviar fotos, coletar informações, acompanhar pedido e orçar dentro das regras. CONSULTAR: prazo fora do normal, grandes quantidades, produto diferente, desconto ou condição especial. NÃO PODE: inventar preço/prazo, prometer capacidade sem verificar, conceder desconto fora da autorização ou alterar financeiro por suposição.',
          },
          {
            tipo: 'resposta_cliente', competencia: 'negociacao',
            cliente: 'O concorrente faz mais barato.',
            opcoes: [
              { label: '"O material dele é pior."', correta: false, feedback: 'Evite atacar o concorrente — isso não fortalece sua proposta e pode nem ser verdade.' },
              { label: '"Então já baixo meu preço."', correta: false, erroCritico: true, feedback: 'Dar desconto automático pra "competir" sem avaliar está fora da autonomia padrão.' },
              { label: '"Entendo. O que está incluído na proposta dele para compararmos corretamente?"', correta: true, feedback: 'A resposta investiga a objeção sem atacar concorrente nem dar desconto automático.' },
              { label: '"Compre com ele."', correta: false, feedback: 'Essa resposta fecha a porta pra uma venda que ainda pode acontecer.' },
            ],
          },
          {
            tipo: 'conteudo', titulo: 'Follow-up',
            texto: 'Orçamento enviado não é atendimento encerrado. Acompanhe de forma profissional: orçamento → acompanhamento → retorno → fechamento ou perda. O objetivo do follow-up é facilitar a decisão, não pressionar.',
          },
          {
            tipo: 'texto_livre', competencia: 'negociacao',
            pergunta: 'O cliente recebeu orçamento há 3 dias e não respondeu. Escreva um follow-up curto.',
            pontosEsperados: ['Lembra o orçamento', 'Oferece ajuda', 'Evita pressão ou urgência inventada'],
          },
          {
            tipo: 'conteudo', titulo: 'Prospecção',
            texto: 'O Comercial também busca oportunidades. Escolas, unidades militares, empresas, restaurantes, eventos, clubes, lojas e instituições podem ter demandas compatíveis. A abordagem deve ter motivo e relevância para aquele contato.',
          },
          {
            tipo: 'texto_livre', competencia: 'prospeccao',
            pergunta: 'Escolha um desses públicos e escreva uma abordagem inicial.',
            pontosEsperados: ['Apresentação curta', 'Motivo do contato', 'Relevância/benefício', 'Convite pra conversar'],
          },
          {
            tipo: 'missao', competencia: 'prospeccao',
            titulo: 'Missão',
            objetivo: 'Analisar contatos fictícios, escolher os de maior potencial e praticar negociação sem desconto automático.',
            contexto: 'Cinco contatos fictícios.',
            tarefas: ['Analise os 5 e escolha dois com maior potencial; prepare abordagem pra eles.', 'Pra um deles, simule uma objeção de preço e conduza sem desconto automático.'],
            criterioConclusao: 'Ter escolhido os 2 contatos, preparado a abordagem e simulado a objeção antes de marcar como concluída.',
          },
        ],
      },
      {
        dia: 10, titulo: 'Missão Comercial Valente', subtitulo: 'Demonstrar que consegue usar as ferramentas e conhecimentos da trilha em uma situação integrada',
        etapas: [
          {
            tipo: 'conteudo', titulo: 'Como funciona',
            texto: 'Este dia não apresenta conteúdo novo importante. Ele verifica se você consegue combinar: consulta ao sistema, classificação da demanda, levantamento de dados, orçamento, negociação, registro e acompanhamento.',
          },
          {
            tipo: 'cenario', competencia: 'atendimento', titulo: 'Atendimento integrado',
            noInicial: 'a',
            nos: {
              a: {
                cliente: 'Olá. Vi vocês no Instagram. Minha empresa fará um evento e precisamos de miniaturas personalizadas. Vocês fazem?',
                opcoes: [
                  { label: '"R$70 cada."', correta: false, erroCritico: true, feedback: 'Você informou preço sem saber nada sobre o pedido — isso é um erro crítico.', proximo: 'b' },
                  { label: '"Fazemos trabalhos personalizados. Me conta um pouco mais: o que vocês imaginam e quantas unidades precisam?"', correta: true, feedback: 'Usa o método de atendimento aprendido no Dia 5.', proximo: 'b' },
                  { label: '"Mande o pagamento."', correta: false, erroCritico: true, feedback: 'Pedir pagamento antes de levantar qualquer informação é um erro crítico.', proximo: 'b' },
                  { label: '"Só com STL."', correta: false, feedback: 'Recusar de cara sem perguntar fecha uma oportunidade real.', proximo: 'b' },
                ],
              },
              b: {
                cliente: 'Seriam 100 miniaturas da nossa equipe. Tenho apenas algumas fotos. Pensamos em 10 cm, pintadas. O evento é daqui a 12 dias.',
                opcoes: [
                  { label: '"Já temos tudo e podemos prometer."', correta: false, erroCritico: true, feedback: 'Prometer sem orçamento nem verificação de capacidade é um erro crítico.', proximo: 'c' },
                  { label: '"É projeto a partir de referência, com possível modelagem; quantidade, acabamento e prazo exigem orçamento e verificação de capacidade."', correta: true, feedback: 'A resposta combina os Dias 3 e 4.', proximo: 'c' },
                  { label: '"Foto é equivalente a STL."', correta: false, erroCritico: true, feedback: 'Foto não é arquivo 3D — essa afirmação é tecnicamente incorreta.', proximo: 'c' },
                  { label: '"Basta multiplicar um preço unitário por 100."', correta: false, erroCritico: true, feedback: 'Produção em escala muda custo por peça — multiplicar direto é um erro crítico.', proximo: 'c' },
                ],
              },
              c: {
                cliente: 'Se eu fizer 300, consegue melhorar o preço?',
                opcoes: [
                  { label: '"Sim, 20%."', correta: false, erroCritico: true, feedback: 'Prometer um percentual específico de desconto sem consultar é um erro crítico.', proximo: 'd' },
                  { label: '"Volume maior pode mudar a condição, mas preciso recalcular/consultar antes de confirmar."', correta: true, feedback: 'Não promete desconto fora da autonomia.', proximo: 'd' },
                  { label: '"O preço nunca muda."', correta: false, feedback: 'Essa afirmação fecha uma negociação que talvez pudesse avançar.', proximo: 'd' },
                  { label: '"Faço metade."', correta: false, erroCritico: true, feedback: 'Prometer 50% de desconto sem qualquer análise é um erro crítico grave.', proximo: 'd' },
                ],
              },
              d: {
                cliente: 'Mas preciso em 5 dias.',
                opcoes: [
                  { label: '"Tranquilo."', correta: false, erroCritico: true, feedback: 'Prometer prazo sem checar capacidade é um erro crítico.', proximo: 'e' },
                  { label: '"Vou verificar a capacidade de produção antes de confirmar se esse prazo é viável."', correta: true, feedback: 'Prazo precisa de confirmação operacional.', proximo: 'e' },
                  { label: '"Impossível."', correta: false, feedback: 'Recusar sem verificar a capacidade pode perder uma venda viável.', proximo: 'e' },
                  { label: '"Se pagar hoje eu garanto."', correta: false, erroCritico: true, feedback: 'Condicionar uma garantia de prazo ao pagamento, sem checar capacidade, é um erro crítico.', proximo: 'e' },
                ],
              },
              e: {
                cliente: 'Posso pagar metade agora?',
                opcoes: [
                  { label: '"Sim, sempre 50%."', correta: false, erroCritico: true, feedback: 'Afirmar uma política fixa sem confirmar é um erro crítico — essa condição precisa ser consultada.' },
                  { label: '"Pode pagar 30%."', correta: false, erroCritico: true, feedback: 'Afirmar um percentual específico sem confirmar a política vigente é um erro crítico.' },
                  { label: '"Vou confirmar a condição aplicável ao pedido e te explico entrada e saldo corretamente."', correta: true, feedback: 'Não inventa política comercial.' },
                  { label: '"Só pagamento total."', correta: false, feedback: 'Essa afirmação pode nem ser verdadeira e fecha uma forma de pagamento sem necessidade.' },
                ],
              },
            },
          },
          {
            tipo: 'texto_livre', competencia: 'atendimento',
            pergunta: 'Monte o briefing final do atendimento. Organize: cliente, tipo de projeto, referência disponível, tamanho, quantidade, acabamento, prazo solicitado, necessidade de modelagem, condição de pagamento a confirmar, orçamento a realizar e próximo passo.',
            pontosEsperados: ['Organiza todos os itens com base no que foi revelado na conversa', 'Não inventa preço, prazo ou condição ainda não confirmados', 'Indica claramente o próximo passo'],
          },
          {
            tipo: 'missao', competencia: 'operacao_os',
            titulo: 'Missão operacional',
            objetivo: 'Associar cada ação à ferramenta correta do Valente OS e explicar o próximo passo ao cliente.',
            contexto: 'Ações: consultar produto existente; formar orçamento; registrar pedido; consultar pagamento; acompanhar produção.',
            tarefas: ['Indique em qual ferramenta faria cada uma dessas ações.', 'Descreva como explicaria ao cliente o próximo passo.'],
            criterioConclusao: 'Ter associado as ações às ferramentas e descrito o próximo passo antes de marcar como concluída.',
          },
          {
            tipo: 'multipla_escolha', competencia: 'operacao_os',
            pergunta: 'Associe as ações às ferramentas.',
            opcoes: ['Produto existente → Peças Próprias; preço → Orçamento; pedido/status → Pedidos; pagamento → Caixa.', 'Tudo → Caixa.', 'Tudo → Pedidos.', 'Produto → Orçamento; pagamento → Peças Próprias.'],
            correta: 0,
            feedbackCerto: 'A missão fecha o ciclo iniciado no tour do Dia 1.',
            feedbackPorOpcao: [null, 'Cada ferramenta tem um propósito diferente — não é tudo a mesma — tente de novo.', 'Cada ferramenta tem um propósito diferente — não é tudo a mesma — tente de novo.', 'Essas associações estão trocadas — revise o tour do Dia 1.'],
          },
          {
            tipo: 'conteudo', titulo: 'Parabéns!',
            texto: 'Você concluiu a Formação Comercial Valente. A classificação final considera suas competências e os erros críticos ao longo dos 10 dias — não é só uma contagem de respostas certas.',
          },
        ],
      },
    ],
  },

  // Trilhas futuras entram aqui do mesmo jeito, por exemplo:
  // producao: { id: 'producao', nome: 'Produção 3D', cargosPermitidos: ['producao'], dias: [...] },
  // pintura:  { id: 'pintura',  nome: 'Pintura',       cargosPermitidos: ['producao','pintura'], dias: [...] },
  // etc. — nenhuma mudança necessária em treinamento.js pra isso funcionar.
};
