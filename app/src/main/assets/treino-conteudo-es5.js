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
  // ── Cursos do Centro de Capacitação Valente (v133) ──
  integracao: {
    "id": "integracao",
    "nome": "Integração Valente",
    "descricao": "Formação comum de entrada: o fluxo do pedido, o Kanban e as perguntas que guiam o seu trabalho.",
    "icone": "🧭",
    "versao": 1,
    "cargosPermitidos": null,
    "competencias": [
      "Visão do processo",
      "Fluxo e Kanban",
      "Uso do Valente OS",
      "Informação completa",
      "Responsabilidade",
      "Qualidade e segurança"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Onde estou trabalhando",
        "subtitulo": "A Valente vista de ponta a ponta",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Do pedido à entrega",
            "texto": "A Valente Artes é um estúdio de impressão 3D. Ela transforma a necessidade de um cliente em um produto ou serviço. Entre o pedido e a entrega, o trabalho passa por várias pessoas. Cada uma cuida de uma parte, mas todas respondem pelo mesmo resultado: aquilo que foi prometido ao cliente. Mesmo que você trabalhe em uma única etapa, precisa entender o conjunto para saber por que a sua parte importa."
          },
          {
            "tipo": "conteudo",
            "titulo": "Três tipos de trabalho",
            "texto": "Produto próprio é algo que a empresa já tem na sua linha, pronto para ser produzido e vendido. Produto personalizado nasce de uma necessidade específica do cliente, como uma miniatura feita a partir de fotos. Serviço é quando a Valente executa uma etapa para o cliente, como modelagem, impressão, acabamento ou pintura. Cada tipo pode seguir um caminho diferente dentro da empresa."
          },
          {
            "tipo": "conteudo",
            "titulo": "Qualidade nasce no começo",
            "texto": "Muita gente pensa que qualidade é conferir a peça no fim. Na prática, ela depende de informação correta desde o primeiro contato. Imagine que o pedido entra com o tamanho errado. A modelagem, a impressão e a pintura podem trabalhar muito bem e, ainda assim, entregar a peça errada. Todos executaram certo uma instrução errada. Por isso, informação correta no início economiza tempo, material e a confiança do cliente."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como agir",
            "texto": "Antes de executar qualquer tarefa, faça duas perguntas. Primeiro: qual resultado a empresa prometeu entregar neste trabalho? Segundo: qual é a minha participação nesse resultado? Se você não souber responder, não precisa fingir. Consulte a fonte, como o Valente OS ou a ficha do pedido, e, se necessário, o responsável. Dizer que não sabe não é erro. Inventar é."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "visao_processo",
            "pergunta": "Um pedido chega com o tamanho da miniatura anotado errado. A impressão e a pintura são feitas com muito cuidado. Qual é o resultado mais provável?",
            "opcoes": [
              "A peça sai correta, porque a boa execução compensa a informação errada",
              "A peça sai bem feita, mas errada em relação ao que o cliente queria",
              "O erro aparece sozinho na impressão e o pedido é corrigido a tempo",
              "Só o setor de envio é afetado, porque ele fala com o cliente"
            ],
            "correta": 1,
            "feedbackCerto": "Isso mesmo. Várias pessoas trabalham bem sobre uma instrução errada, e o erro só aparece no final.",
            "feedbackPorOpcao": [
              "Boa execução não corrige uma instrução errada. Ela apenas entrega o erro com mais capricho.",
              null,
              "A máquina imprime o que recebe. Ela não sabe qual era a intenção do cliente.",
              "O erro nasceu no começo e atinge todas as etapas, não só o envio."
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "visao_processo",
            "afirmacao": "A qualidade de uma peça depende só da conferência feita no último setor antes do envio.",
            "correta": false,
            "feedbackCerto": "Correto. A qualidade depende de informação certa desde o começo e de cuidado em cada etapa.",
            "feedbackErrado": "Na verdade, a conferência final não conserta uma informação errada que entrou no início e atravessou todas as etapas."
          },
          {
            "tipo": "texto_livre",
            "competencia": "visao_processo",
            "pergunta": "Pense na função que você vai exercer na Valente. Qual resultado a empresa promete ao cliente e onde a sua parte entra nele?",
            "pontosEsperados": [
              "Cita o resultado prometido ao cliente, como a peça certa, no prazo combinado e em boas condições",
              "Identifica a etapa em que a sua função atua",
              "Diz de quem ele recebe o trabalho e para quem entrega",
              "Reconhece que, se faltar informação, consulta a fonte em vez de supor"
            ]
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "Como um trabalho atravessa a empresa",
        "subtitulo": "O fluxo do pedido, etapa por etapa",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O fluxo em um olhar",
            "texto": "No Valente OS, o caminho de um pedido aparece em etapas. Tudo começa no Cliente, que traz a necessidade. Depois vêm: Negociação, Pago, Modelando, Imprimindo, Pós-impressão, Pintura, Preparar p/ envio e Enviado. Ver o fluxo de forma visual ajuda qualquer pessoa a saber onde um trabalho está e o que falta para ele chegar ao cliente."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que cada etapa quer dizer",
            "texto": "Negociação: o pedido está sendo combinado com o cliente. Pago: o pagamento foi confirmado e o trabalho pode seguir. Modelando: o modelo 3D está sendo criado ou preparado. Imprimindo: a peça está sendo fabricada na impressora. Pós-impressão: a peça é tratada depois de impressa, por exemplo com limpeza e remoção de suportes. Pintura: a peça recebe acabamento de cor. Preparar p/ envio: conferência e embalagem. Enviado: a peça saiu para o cliente."
          },
          {
            "tipo": "conteudo",
            "titulo": "Nem todo trabalho usa todas as etapas",
            "texto": "Uma miniatura feita a partir de fotos precisa de modelagem antes de imprimir. Já um arquivo STL pronto e aprovado, que é o arquivo do modelo 3D, pode pular essa etapa. Uma peça sem pintura também não passa por Pintura. O importante é que o fluxo represente o que realmente aconteceu. Cada mudança de etapa informa à equipe uma mudança real de situação, e não apenas faz o cartão andar."
          },
          {
            "tipo": "conteudo",
            "titulo": "As cinco perguntas mentais",
            "texto": "Ao receber um trabalho, pergunte de qual etapa ele veio e qual será a próxima. Além disso, use cinco perguntas ao longo do seu dia. O que estou recebendo? O que preciso saber antes de começar? O que é minha responsabilidade fazer? Como sei que fiz corretamente? O que a próxima pessoa precisa receber de mim? Você vai praticar uma por vez nas próximas aulas."
          },
          {
            "tipo": "ordenar",
            "competencia": "fluxo_kanban",
            "instrucao": "Coloque as etapas do Kanban na ordem em que um pedido completo normalmente avança.",
            "itens": [
              "Negociação",
              "Pago",
              "Modelando",
              "Imprimindo",
              "Pós-impressão",
              "Pintura",
              "Preparar p/ envio",
              "Enviado"
            ],
            "feedbackCerto": "Perfeito. Essa é a sequência completa. Lembre que nem todo pedido passa por todas as etapas.",
            "feedbackErrado": "Revise a sequência: o pedido é combinado e pago, depois modelado, impresso, tratado, pintado, preparado e só então enviado."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "fluxo_kanban",
            "pergunta": "Quais destes trabalhos podem dispensar a etapa Modelando?",
            "itens": [
              "Peça com arquivo STL pronto e já aprovado",
              "Miniatura que precisa ser criada a partir de fotos do cliente",
              "Reimpressão de um modelo que já existe e está aprovado",
              "Personagem que o cliente descreveu só por texto"
            ],
            "corretos": [
              0,
              2
            ],
            "feedbackCerto": "Isso mesmo. Quando o modelo já existe e está aprovado, não há o que modelar. Se o modelo precisa ser criado, a etapa é necessária.",
            "feedbackErrado": "A etapa Modelando é necessária quando o modelo 3D ainda precisa ser criado. Se o arquivo já existe e está aprovado, ela pode ser dispensada."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "fluxo_kanban",
            "local": "Valente OS > aba Pedidos (Kanban)",
            "instrucao": "Abra a aba Pedidos e apenas observe as colunas. Leia o nome de cada uma e confira se reconhece Negociação, Pago, Modelando, Imprimindo, Pós-impressão, Pintura, Preparar p/ envio e Enviado. Não mova nenhum cartão. Depois, escolha um cartão e diga a si mesmo de qual etapa ele veio e qual é a próxima."
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Conhecendo o Valente OS",
        "subtitulo": "A fonte de informação da equipe",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Para que serve o sistema",
            "texto": "O Valente OS organiza as informações para que a equipe não dependa só de memória, mensagens soltas ou perguntas de corredor. As abas principais são Pedidos, que mostra o Kanban, Peças Próprias, Caixa, Orçamento, Missão (a caixa de entrada das suas tarefas) e o Centro de Capacitação, onde você faz este curso. Cada cargo enxerga as abas liberadas para a sua função, então é normal que o seu usuário não mostre todas."
          },
          {
            "tipo": "conteudo",
            "titulo": "Consulte antes de presumir",
            "texto": "Regra de ouro: consulte o sistema antes de supor uma informação. Se você precisa saber o estado de um pedido, abra a aba correspondente antes de interromper outro setor. Só consulte uma pessoa se a informação não estiver disponível, estiver contraditória ou envolver uma decisão que não é sua. Assim você economiza o tempo de todos e evita decidir em cima de um palpite."
          },
          {
            "tipo": "conteudo",
            "titulo": "Treinamento não altera dados",
            "texto": "Durante o treinamento, o sistema é fonte de trabalho, não enfeite administrativo. Por isso, as práticas aqui são de consulta e observação. Não altere dados reais, não mova cartões e não finalize tarefas de verdade, a menos que exista uma prática supervisionada e autorizada pelo responsável. Se abrir algo por engano, saia sem salvar e avise o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "uso_valente_os",
            "cliente": "Colega do pós-impressão: 'Você sabe em que etapa está o pedido da Marina? Preciso saber se já posso separar espaço para a peça.'",
            "opcoes": [
              {
                "label": "Respondo que acho que está em Pintura, mas não tenho certeza.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Responder com palpite como se fosse informação pode gerar decisões erradas. Dizer o que não se sabe é melhor do que supor."
              },
              {
                "label": "Abro a aba Pedidos, procuro o cartão da Marina e informo a etapa que aparece.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Isso. O sistema é a primeira fonte. Você responde com um dado verificado."
              },
              {
                "label": "Peço para ele perguntar ao líder, que deve saber.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Você tem acesso à informação. Interromper o líder sem consultar antes gera trabalho desnecessário."
              },
              {
                "label": "Digo que pedidos assim sempre estão na etapa de Imprimindo.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Generalizar é inventar. Cada pedido tem o seu próprio andamento."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "uso_valente_os",
            "afirmacao": "Se a informação do sistema estiver contraditória ou ausente, o certo é consultar o responsável em vez de escolher a versão que parece mais provável.",
            "correta": true,
            "feedbackCerto": "Correto. Quando a fonte falha, consulte o responsável. Escolher a versão mais provável é suposição.",
            "feedbackErrado": "Quando as informações se contradizem, escolher uma delas por intuição é suposição. A atitude correta é consultar o responsável."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "uso_valente_os",
            "local": "Valente OS > todas as abas liberadas no seu usuário",
            "instrucao": "Faça um tour pelas abas que aparecem para você. Leia o nome de cada uma, abra e observe que tipo de informação aparece. Não altere, não salve e não mova nada. Se alguma aba que você esperava não aparecer, anote para perguntar ao responsável depois, pois ela pode não estar liberada para a sua função."
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "O que é Kanban",
        "subtitulo": "Cartões, colunas e o peso de mover",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Kanban em três ideias",
            "texto": "Kanban é uma forma visual de acompanhar trabalho. A palavra vem do japonês e lembra um cartão sinalizador. Ele tem três ideias simples. Um cartão representa um trabalho ou pedido. Uma coluna representa uma situação, ou etapa. Mover o cartão de uma coluna para outra significa informar que a situação mudou. No Valente OS, a aba Pedidos funciona assim."
          },
          {
            "tipo": "conteudo",
            "titulo": "Mover é comunicar",
            "texto": "Mover um cartão não é arrumar a tela. É dar uma notícia para toda a equipe. Se o cartão está em Imprimindo, todos entendem que a impressão está em execução ou naquela etapa. Se alguém move para Pintura sem a peça ter sido liberada, o sistema passa a dizer uma coisa falsa. Isso pode gerar uma promessa errada ao cliente e fazer outra pessoa esperar por uma peça que ainda não está pronta."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como agir",
            "texto": "Antes de mover qualquer cartão, confirme qual fato real autoriza aquela mudança. A peça terminou de imprimir? Foi conferida? O pagamento foi confirmado? Mover vem depois do fato, nunca antes, e não serve para parecer que o trabalho está andando. Quem pode mover cada etapa e quais condições liberam a movimentação seguem o procedimento definido pela Valente. Em caso de dúvida, consulte o responsável."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "fluxo_kanban",
            "pergunta": "Você terminou a limpeza de uma peça, mas ainda não conferiu se ficou boa. Seu cartão está em Pós-impressão. O que é mais correto fazer?",
            "opcoes": [
              "Mover para Pintura agora e conferir enquanto a pessoa da pintura pega a peça",
              "Mover para Pintura e avisar depois, se achar algum problema",
              "Conferir primeiro e só mover o cartão se a peça estiver liberada",
              "Deixar o cartão onde está até alguém pedir a peça"
            ],
            "correta": 2,
            "feedbackCerto": "Exato. O fato que autoriza mover é a peça estar conferida e liberada, não apenas ter terminado a limpeza.",
            "feedbackPorOpcao": [
              "Isso empurra o problema para a próxima etapa e informa uma situação que ainda não é verdadeira.",
              "Avisar depois não desfaz a informação falsa que já circulou no Kanban.",
              null,
              "Esperar ser cobrado deixa o quadro desatualizado. O cartão deve refletir a situação real."
            ],
            "erroCriticoOpcoes": [
              0,
              1
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "fluxo_kanban",
            "pergunta": "Quais destas situações justificam mover um cartão para a próxima coluna?",
            "itens": [
              "A impressão terminou e a peça foi conferida e liberada",
              "Estou com pressa e quero mostrar progresso ao líder",
              "O cliente perguntou e quero parecer adiantado",
              "O evento real que marca o fim da etapa aconteceu"
            ],
            "corretos": [
              0,
              3
            ],
            "feedbackCerto": "Isso mesmo. Só um fato real justifica a mudança de coluna.",
            "feedbackErrado": "Pressa e aparência não são fatos. Mova o cartão apenas quando o evento real que encerra a etapa tiver acontecido."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "fluxo_kanban",
            "local": "Valente OS > aba Pedidos (Kanban)",
            "instrucao": "Escolha um cartão e observe apenas. Pense em qual evento real deveria acontecer para ele passar à coluna seguinte. Não arraste nem altere o cartão. Se tiver dúvida sobre quem pode mover aquela etapa, pergunte ao responsável."
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "Informação também faz parte do produto",
        "subtitulo": "O que preciso saber antes de começar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Ordem incompleta, peça errada",
            "texto": "Uma ordem incompleta pode produzir uma peça errada mesmo quando todos trabalham bem. Dependendo do trabalho, são necessárias informações como: cliente, produto, quantidade, tamanho, arquivo ou referência, acabamento, observações e prazo. Os campos reais do Valente OS são a referência oficial. Esta é a segunda pergunta mental: o que preciso saber antes de começar?"
          },
          {
            "tipo": "conteudo",
            "titulo": "Um exemplo",
            "texto": "Uma ordem que diz apenas 'fazer a miniatura do João' não diz qual modelo, qual tamanho, quantas unidades nem qual versão. Quem recebe vai adivinhar, e adivinhar errado custa material, tempo de máquina e retrabalho. Agora compare com uma ordem que traz todos os dados necessários. O próximo setor consegue trabalhar sem perguntar e sem supor."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como agir",
            "texto": "Ao receber uma tarefa, compare o que você recebeu com o que precisa para executar. Se faltar um dado essencial, pare e consulte a fonte: o pedido no Valente OS, a ficha ou a OT. Se a fonte não resolver, fale com o responsável. Não preencha a lacuna com suposição. Dizer 'não sei, vou conferir' não é erro. Inventar é."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "informacao_completa",
            "pergunta": "Você recebeu a ordem: 'Imprimir miniaturas do dragão para a Carla.' Quais informações ainda precisam estar claras antes de começar?",
            "itens": [
              "Tamanho da miniatura",
              "Quantidade de unidades",
              "Qual arquivo ou versão do modelo usar",
              "O sobrenome da Carla"
            ],
            "corretos": [
              0,
              1,
              2
            ],
            "feedbackCerto": "Isso mesmo. Tamanho, quantidade e arquivo são essenciais para executar. O sobrenome do cliente não muda o trabalho.",
            "feedbackErrado": "Faltam dados que mudam o resultado da peça: tamanho, quantidade e arquivo ou versão. Dados que não alteram a execução não bloqueiam o trabalho."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "informacao_completa",
            "pergunta": "Na ordem de uma peça, o campo de quantidade está em branco. O que você faz?",
            "opcoes": [
              "Imprimo uma unidade, que é o mais comum",
              "Procuro a informação no pedido do Valente OS e, se não achar, consulto o responsável",
              "Pergunto a um colega que provavelmente lembra",
              "Imprimo várias para não faltar e sobra eu guardo"
            ],
            "correta": 1,
            "feedbackCerto": "Correto. Primeiro a fonte oficial, depois o responsável. Nada de adivinhar.",
            "feedbackPorOpcao": [
              "O 'mais comum' é uma suposição. Pode faltar peça ou sobrar material desperdiçado.",
              null,
              "Memória de colega não é fonte confiável. Consulte o sistema primeiro.",
              "Imprimir a mais gasta material e tempo sem autorização."
            ],
            "erroCriticoOpcoes": [
              0,
              3
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "informacao_completa",
            "pergunta": "Receba esta ordem fictícia: 'Fazer a miniatura do João.' Liste o que está faltando e diga o que você faria antes de começar.",
            "pontosEsperados": [
              "Aponta dados ausentes, como modelo, tamanho, quantidade e versão",
              "Diz que consultaria o pedido no Valente OS ou a ficha antes de perguntar",
              "Se a fonte não resolver, consultaria o responsável",
              "Afirma que não começaria a trabalhar com suposições"
            ]
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Minha responsabilidade começa antes de executar",
        "subtitulo": "Identificar, conferir, executar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Conferir antes de agir",
            "texto": "Executar bem começa pela conferência. Antes de ligar uma máquina, pintar, modelar, embalar ou responder algo que dependa da operação, verifique três coisas. Você sabe exatamente o que deve fazer? Você tem a referência correta? Você tem autorização para decidir? Esta é a terceira pergunta mental: o que é minha responsabilidade fazer?"
          },
          {
            "tipo": "conteudo",
            "titulo": "Parecido não é igual",
            "texto": "Dois arquivos com nomes quase iguais podem ser versões diferentes do modelo. Duas peças visualmente semelhantes podem pertencer a pedidos diferentes. Usar o arquivo ou a peça errada é um erro sério, porque ele só aparece depois que o trabalho já foi feito. Pressa não transforma dúvida em certeza."
          },
          {
            "tipo": "conteudo",
            "titulo": "A sequência",
            "texto": "Use a sequência IDENTIFICAR, CONFERIR, EXECUTAR. Identificar: qual é o pedido, a peça e a tarefa. Conferir: o arquivo, a referência, a quantidade e as instruções batem com o que foi pedido? Executar: só então comece. Se a conferência falhar, use CONSULTAR RESPONSÁVEL. Na dúvida, o passo de consultar vem antes do passo de executar."
          },
          {
            "tipo": "ordenar",
            "competencia": "responsabilidade",
            "instrucao": "Ordene a sequência de responsabilidade antes de executar uma tarefa.",
            "itens": [
              "Identificar o pedido e a tarefa",
              "Conferir arquivo, referência e instruções",
              "Executar a tarefa",
              "Seguir para a conferência do resultado"
            ],
            "feedbackCerto": "Isso. Primeiro saber o que é, depois verificar, depois fazer.",
            "feedbackErrado": "Lembre da ordem: IDENTIFICAR, CONFERIR e só então EXECUTAR."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "responsabilidade",
            "pergunta": "Na pasta há dois arquivos: 'dragao_v2.stl' e 'dragao_v2_final.stl'. A tarefa só diz 'imprimir o dragão'. Qual é o melhor passo?",
            "opcoes": [
              "Usar o mais recente, porque 'final' deve ser o correto",
              "Imprimir os dois, para garantir que um deles serve",
              "Conferir no pedido ou na OT qual versão vale e, se não estiver claro, consultar o responsável",
              "Usar o que tem o nome mais curto"
            ],
            "correta": 2,
            "feedbackCerto": "Certo. A referência do pedido decide qual arquivo usar. Nome parecido não prova versão.",
            "feedbackPorOpcao": [
              "'Final' no nome não garante que seja a versão aprovada.",
              "Imprimir os dois desperdiça material e tempo, e ainda deixa dúvida sobre qual enviar.",
              null,
              "O tamanho do nome não tem relação com a versão correta."
            ],
            "erroCriticoOpcoes": [
              0,
              1,
              3
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "responsabilidade",
            "local": "Valente OS > aba Missão (caixa de entrada de tarefas)",
            "instrucao": "Abra uma tarefa (OT) apenas para ler. Observe título, instruções, checklist e quantidade. Pergunte-se: eu saberia exatamente o que fazer? Tenho a referência certa? Não clique em Iniciar nem em Concluir. Se não houver tarefas na sua caixa, observe a área e anote o que espera encontrar nela."
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Minha responsabilidade termina depois de executar",
        "subtitulo": "Executar, conferir, registrar, entregar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Terminar não é acabar",
            "texto": "Terminar a atividade física não encerra a sua responsabilidade. Falta conferir o resultado, organizar o material, registrar o que for devido, identificar a peça corretamente e entregar para a próxima etapa em condição de uso. Aqui entram as duas últimas perguntas mentais: como sei que fiz corretamente? E o que a próxima pessoa precisa receber de mim?"
          },
          {
            "tipo": "conteudo",
            "titulo": "Exemplos do dia a dia",
            "texto": "Uma impressão pode ter terminado na máquina, mas a peça ainda precisa ser conferida antes de ser liberada. Uma pintura pode estar seca, mas ainda precisa ser comparada com a referência e com o pedido. Se você entrega sem conferir, a próxima pessoa herda um problema que talvez só descubra tarde, quando já gastou tempo em cima dele."
          },
          {
            "tipo": "conteudo",
            "titulo": "A sequência",
            "texto": "Use EXECUTAR, CONFERIR, REGISTRAR, ENTREGAR. Conferir: o resultado bate com o pedido? Registrar: marque o que for devido no Valente OS, como concluir a tarefa ou preencher o checklist. Entregar: a peça vai identificada, organizada e com o que a próxima pessoa precisa saber, como alertas ou observações. Só registre como feito aquilo que de fato foi feito."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "responsabilidade",
            "cliente": "Colega da próxima etapa: 'A peça já está comigo, mas não tem identificação e a tarefa ainda aparece como em andamento. Pode me dizer se terminou?'",
            "opcoes": [
              {
                "label": "Já terminei. Esqueci de registrar, mas pode seguir que depois eu marco.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Entregar sem registrar deixa o sistema dizendo uma coisa diferente da realidade."
              },
              {
                "label": "Vou conferir a peça, identificá-la, concluir a tarefa no sistema e avisar você de qualquer observação.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Isso. Conferir, registrar e entregar identificado é o que fecha a sua responsabilidade."
              },
              {
                "label": "Marco a tarefa como concluída agora e depois confiro a peça quando der.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Marcar como feito sem ter conferido é registrar uma coisa que não aconteceu."
              },
              {
                "label": "Pode seguir sem identificação, porque a peça é reconhecível.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Peças parecidas se confundem. Identificar é parte da entrega."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "responsabilidade",
            "afirmacao": "Uma impressão que terminou na máquina já pode ser liberada para a próxima etapa sem conferência.",
            "correta": false,
            "feedbackCerto": "Correto. Terminar na máquina não prova que a peça está boa. É preciso conferir antes.",
            "feedbackErrado": "A peça pode ter falhas que só aparecem na conferência. Liberar sem conferir passa o problema adiante."
          },
          {
            "tipo": "texto_livre",
            "competencia": "responsabilidade",
            "pergunta": "Pense na sua função. Ao terminar sua parte, o que você conferiria e o que entregaria à próxima pessoa?",
            "pontosEsperados": [
              "Indica ao menos uma conferência concreta do resultado",
              "Cita o que registraria no Valente OS, como concluir a tarefa",
              "Menciona a identificação da peça ou do material",
              "Diz o que a próxima pessoa precisa saber ou receber"
            ]
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Erro, dúvida e segurança",
        "subtitulo": "Posso executar, preciso consultar ou preciso parar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Três níveis de decisão",
            "texto": "Nem toda decisão tem o mesmo nível de autonomia. Algumas ações são rotineiras e autorizadas, e você pode executar. Outras exigem consulta ao sistema ou ao responsável. Em situações de risco, é preciso parar. Classificar a decisão antes de agir evita tanto a paralisia quanto o improviso. Os limites exatos de autonomia de cada função seguem o procedimento definido pela Valente ou o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Onde vai cada dúvida",
            "texto": "Se a dúvida é só onde achar uma informação, consulte o sistema. Se envolve autorização, regra que não está documentada, risco, equipamento com comportamento anormal ou condição comercial não definida, consulte o responsável. Você não precisa saber tudo. A regra da casa é: não saber não é erro; inventar é."
          },
          {
            "tipo": "conteudo",
            "titulo": "Segurança vem primeiro",
            "texto": "Segurança nunca é sacrificada para ganhar tempo. Como regra geral na impressão 3D: resina líquida exige luvas, proteção para os olhos e boa ventilação; solventes, tintas e lixamento pedem ventilação e proteção respiratória adequadas; ferramentas de corte pedem atenção e proteção das mãos. Se algo parecer perigoso ou anormal, pare. Os EPI e procedimentos oficiais da Valente prevalecem sobre qualquer regra geral."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "seguranca_qualidade",
            "pergunta": "Quais destas situações exigem PARAR ou consultar o responsável, e não decidir sozinho?",
            "itens": [
              "Descobrir em qual aba está o status de um pedido",
              "Impressora fazendo um barulho diferente do normal e cheirando a queimado",
              "Cliente pedindo um desconto que ninguém definiu",
              "Dúvida sobre qual cartão é do pedido da Marina, já visível na tela"
            ],
            "corretos": [
              1,
              2
            ],
            "feedbackCerto": "Isso mesmo. Equipamento com comportamento anormal e condição comercial não definida pedem parar ou consultar. Achar uma informação no sistema é consulta de rotina.",
            "feedbackErrado": "Consultar o sistema resolve dúvida de localização. Equipamento anormal e condição comercial não definida exigem parar ou consultar o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "seguranca_qualidade",
            "cliente": "Colega: 'Estou com pressa. Vou lavar essa peça de resina sem luva, é rapidinho. Você vigia a porta?'",
            "opcoes": [
              {
                "label": "Vigio, mas só desta vez.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Ignorar segurança para ganhar tempo é um erro crítico. Resina em contato com a pele pode causar irritação."
              },
              {
                "label": "Lembro que precisa usar luva e ventilação, e ofereço ajuda para pegar o EPI.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Isso. Segurança não é negociável e você ajuda sem cobrar ou ironizar."
              },
              {
                "label": "Não é problema meu, cada um cuida de si.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Segurança é responsabilidade de todos. Avisar é a atitude correta."
              },
              {
                "label": "Digo que, se for rápido mesmo, tudo bem.",
                "correta": false,
                "erroCritico": true,
                "feedback": "A rapidez não elimina o risco. O contato com a resina é perigoso, mesmo que breve."
              }
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "seguranca_qualidade",
            "local": "Área física de trabalho (bancada, impressoras, pós-impressão e pintura)",
            "instrucao": "Observe a sua área de trabalho e localize onde ficam os EPI, como luvas e proteção para os olhos, e quais são as saídas de ventilação ou de emergência. Se não souber onde está algo, pergunte ao responsável. Não manuseie resina, solventes ou tintas nesta prática, apenas identifique os locais."
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Qualidade é responsabilidade de todos",
        "subtitulo": "Não deixe um defeito viajar adiante",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Todo mundo é controle de qualidade",
            "texto": "Qualidade não pertence apenas ao último setor. Quem identifica um defeito deve impedir que ele viaje adiante sem tratamento. Continuar um trabalho que se sabe errado transforma um problema pequeno em retrabalho grande e caro. O defeito só fica barato quando é achado cedo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Dois exemplos",
            "texto": "Se o acabamento recebe uma peça quebrada, não deve simplesmente prepará-la e mandá-la para a pintura. Se a pintura percebe um defeito estrutural, não deve escondê-lo com tinta. Esconder o defeito dá a sensação de problema resolvido, mas entrega ao cliente uma peça ruim e tira da empresa a chance de corrigir a causa."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que fazer ao achar um problema",
            "texto": "Siga a sequência: IDENTIFICAR, SEPARAR, REGISTRAR ou COMUNICAR, DECIDIR COM AUTORIZAÇÃO, e só DEPOIS AVANÇAR. Separe a peça para que ela não siga por engano. Descreva o que viu, de forma clara e sem culpar ninguém. A decisão sobre refazer, reparar ou aceitar segue o procedimento definido pela Valente ou a orientação do responsável."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "seguranca_qualidade",
            "pergunta": "Na pintura, você percebe uma trinca na base de uma peça. A tinta cobriria bem. Qual é a atitude correta?",
            "opcoes": [
              "Pintar normalmente, porque a trinca fica escondida e o cliente não vai ver",
              "Pintar e avisar só se o cliente reclamar",
              "Corrigir a trinca sozinho com o que tiver à mão e seguir",
              "Separar a peça, registrar ou comunicar o defeito e aguardar a decisão do responsável"
            ],
            "correta": 3,
            "feedbackCerto": "Correto. Defeito estrutural não se esconde. Separar e comunicar permite a decisão certa.",
            "feedbackPorOpcao": [
              "Esconder defeito é um erro crítico. A trinca continua lá e pode quebrar com o uso.",
              "Esperar a reclamação transfere o problema para o cliente.",
              "Reparo improvisado sem autorização pode piorar a peça e foge da sua decisão.",
              null
            ],
            "erroCriticoOpcoes": [
              0,
              1
            ]
          },
          {
            "tipo": "cenario",
            "competencia": "seguranca_qualidade",
            "titulo": "Peça com defeito no acabamento",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "Você está na pós-impressão e recebe uma peça com um dos braços partido. O cartão está na etapa e a pessoa da pintura já perguntou se a peça está liberada.",
                "opcoes": [
                  {
                    "label": "Colo o braço rápido e envio para pintura sem comentar nada.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Avançar sem comunicar esconde o defeito. A pessoa da pintura recebe uma peça com problema sem saber.",
                    "proximo": "b"
                  },
                  {
                    "label": "Separo a peça para que ela não siga adiante e anoto o que vi.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Isso. Separar e registrar é o primeiro passo.",
                    "proximo": "b"
                  },
                  {
                    "label": "Mando para a pintura e peço que ela decida o que fazer.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Isso empurra o problema para outro setor em vez de tratar na origem.",
                    "proximo": "b"
                  },
                  {
                    "label": "Deixo a peça no meio das outras, para ninguém se preocupar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Misturar a peça defeituosa com as boas pode fazer com que ela siga por engano.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "A peça está separada. Agora você precisa avisar o responsável. Como faz a comunicação?",
                "opcoes": [
                  {
                    "label": "Digo apenas que a peça veio com problema.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Falta informação. Sem descrição, o responsável não consegue decidir.",
                    "proximo": "c"
                  },
                  {
                    "label": "Descrevo o defeito, o pedido e a etapa de onde veio, sem apontar culpados.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Informação clara permite uma decisão rápida.",
                    "proximo": "c"
                  },
                  {
                    "label": "Culpo a impressão e explico como o erro devia ter sido evitado.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Apontar culpa não ajuda a decidir. O foco é o fato e o pedido.",
                    "proximo": "c"
                  },
                  {
                    "label": "Espero alguém perguntar sobre a peça.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Esperar deixa o pedido parado e o cartão desatualizado.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "O responsável ainda não respondeu e a pessoa da pintura pergunta se pode começar essa peça.",
                "opcoes": [
                  {
                    "label": "Digo que pode começar, para ganhar tempo.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Avançar um trabalho com defeito sem decisão é erro crítico."
                  },
                  {
                    "label": "Digo que a peça está separada aguardando a decisão do responsável e que ela não deve ser pintada ainda.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Isso. Só avança depois da decisão com autorização."
                  },
                  {
                    "label": "Repasso a peça sem conversa, achando que ela decide sozinha.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Sem informação, ela pode seguir por engano."
                  },
                  {
                    "label": "Digo que a peça vai ser descartada, que é o mais provável.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Você não sabe qual será a decisão. Inventar um desfecho é erro."
                  }
                ]
              }
            }
          },
          {
            "tipo": "texto_livre",
            "competencia": "seguranca_qualidade",
            "pergunta": "Descreva um defeito que você poderia encontrar na sua etapa, como uma peça quebrada ou com falha de impressão, e diga o que faria em ordem, desde o momento em que o encontra.",
            "pontosEsperados": [
              "Descreve um defeito concreto da sua etapa",
              "Diz que separaria a peça para não seguir adiante",
              "Cita registrar ou comunicar o responsável com clareza",
              "Diz que só avançaria após decisão com autorização"
            ]
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "A viagem de um pedido",
        "subtitulo": "Missão final da Integração",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Tudo conectado",
            "texto": "Um pedido nasce de uma necessidade do cliente, ganha informações, passa pelas etapas que precisa e termina quando aquilo que foi combinado é entregue e registrado corretamente. Cada setor recebe algo e deve acrescentar valor sem perder informação. Nada disso funciona se um elo apenas executa e não confere."
          },
          {
            "tipo": "conteudo",
            "titulo": "Uma viagem fictícia",
            "texto": "Acompanhe: o cliente pede uma peça personalizada. O Comercial entende e registra o pedido. A Modelagem prepara o modelo, quando necessário. A Impressão fabrica. A Pós-impressão trata a peça. A Pintura finaliza, quando aplicável. A expedição confere e prepara o envio. O envio é registrado. Em cada passo, uma pessoa recebe de outra e entrega para a próxima."
          },
          {
            "tipo": "conteudo",
            "titulo": "As cinco perguntas, em cada etapa",
            "texto": "Em qualquer etapa, repita as cinco perguntas. O que estou recebendo? O que preciso saber antes de começar? O que é minha responsabilidade fazer? Como sei que fiz corretamente? O que a próxima pessoa precisa receber de mim? Se você consegue responder às cinco, está pronto para trabalhar com segurança. Se não consegue, consulte a fonte ou o responsável antes de avançar."
          },
          {
            "tipo": "cenario",
            "competencia": "visao_processo",
            "titulo": "A viagem do pedido da Bia",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "Pedido fictício: a Bia pediu uma miniatura personalizada do cachorro dela, a partir de fotos. Falta definir o tamanho e a quantidade. O cartão está em Negociação. O que você faz?",
                "opcoes": [
                  {
                    "label": "Escolho um tamanho comum e deixo anotado para adiantar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Escolher o tamanho sem confirmar é inventar. A ordem fica errada desde o início.",
                    "proximo": "b"
                  },
                  {
                    "label": "Confirmo o tamanho e a quantidade com a cliente e registro no pedido.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Isso. Informação correta no começo evita retrabalho depois.",
                    "proximo": "b"
                  },
                  {
                    "label": "Movo o cartão para Pago para adiantar o processo.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Só se move depois do fato real. O pagamento não foi confirmado.",
                    "proximo": "b"
                  },
                  {
                    "label": "Deixo para quem for modelar perguntar depois.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Isso empurra o problema e faz a próxima etapa trabalhar sem informação.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "Na Pós-impressão, a peça chega com marcas de suporte e uma pequena trinca num ponto fino. O pedido segue para pintura amanhã. O que você faz?",
                "opcoes": [
                  {
                    "label": "Passo tinta grossa por cima para esconder a trinca.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Esconder defeito estrutural é erro crítico.",
                    "proximo": "c"
                  },
                  {
                    "label": "Separo a peça, registro o que vi e comunico o responsável antes de avançar.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Identificar, separar, comunicar e só avançar com autorização.",
                    "proximo": "c"
                  },
                  {
                    "label": "Envio direto para a pintura e deixo a pessoa de lá avaliar.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Isso passa o defeito para a etapa seguinte sem tratamento.",
                    "proximo": "c"
                  },
                  {
                    "label": "Descarto a peça sem avisar e peço outra.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Você não tem autorização para decidir isso e perde o registro do problema.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "A peça foi resolvida e pintada. Na etapa Preparar p/ envio, você confere e vai embalar. O que você faz antes de mover para Enviado?",
                "opcoes": [
                  {
                    "label": "Embalo e movo para Enviado, pois a peça parece certa.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Parecer certa não é conferir com o pedido."
                  },
                  {
                    "label": "Confiro a peça contra o pedido, embalo identificada e só movo para Enviado quando for de fato enviada.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Isso. O cartão acompanha o fato real, e a entrega sai conferida."
                  },
                  {
                    "label": "Movo para Enviado agora para o cliente ver que já está a caminho.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Informar um envio que não aconteceu é uma informação falsa."
                  },
                  {
                    "label": "Envio sem conferir, porque as etapas anteriores já conferiram.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Qualidade é de todos, mas cada etapa confere a sua parte."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "visao_processo",
            "titulo": "Missão: a viagem do seu pedido",
            "objetivo": "Mostrar que você sabe percorrer o fluxo completo do pedido, aplicando as cinco perguntas mentais em cada etapa.",
            "contexto": "Pedido fictício: o cliente Rafael pediu três miniaturas personalizadas de um personagem, com pintura, a partir de fotos. O cartão acaba de entrar no Kanban.",
            "tarefas": [
              "Liste as etapas pelas quais esse pedido passa, na ordem, de Negociação até Enviado, e diga se alguma poderia ser dispensada.",
              "Escolha a etapa em que você atua e responda às cinco perguntas mentais: o que estou recebendo, o que preciso saber, o que faço, como confiro e o que entrego à próxima pessoa.",
              "Cite uma informação que pode faltar nessa etapa e o que você faria para obtê-la sem supor.",
              "Descreva o que faria se encontrasse um defeito: identificar, separar, comunicar e aguardar a decisão.",
              "Diga qual fato real justificaria mover o cartão para a etapa seguinte."
            ],
            "criterioConclusao": "Você percorreu o fluxo na ordem, respondeu às cinco perguntas para a sua etapa, consultou a fonte em vez de supor e tratou o defeito sem escondê-lo nem avançar sem autorização."
          }
        ]
      }
    ]
  },
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

  modelagem_3d: {
    "id": "modelagem_3d",
    "nome": "Modelagem 3D",
    "descricao": "Aprenda a transformar um briefing em um modelo 3D pronto para imprimir, com escala, arquivos, conferência e entrega corretos.",
    "icone": "🗿",
    "versao": 1,
    "cargosPermitidos": null,
    "competencias": [
      "Organização do trabalho de modelagem",
      "Leitura de briefing e referências",
      "Escala e medidas",
      "Modelagem para fabricação",
      "Arquivos, versões e entrega",
      "Conferência e liberação"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Minha estação de modelagem",
        "subtitulo": "Onde o trabalho nasce e onde ele deve ser guardado",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O trabalho começa em uma ordem, não em uma mensagem solta",
            "texto": "Modelar é transformar uma ideia em um objeto que possa ser impresso. Antes de abrir o software, você precisa saber qual trabalho está fazendo. Na Valente, a fonte oficial é o Valente OS. O pedido aparece na aba Pedidos (Kanban), na etapa Modelando, e as tarefas chegam na Missão/Inbox de tarefas como OTs, com título, instruções, checklist e quantidade. Uma mensagem de WhatsApp pode avisar que algo existe, mas o briefing oficial é o que vale."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que compõe a sua estação",
            "texto": "Sua estação de modelagem tem quatro partes. Primeiro, o pedido ou a OT que diz o que fazer. Segundo, as referências: fotos, desenhos, medidas e links do cliente. Terceiro, o software de modelagem e os arquivos de trabalho. Quarto, as pastas onde ficam os arquivos de entrada e de saída. Saber onde cada coisa fica evita que você perca tempo procurando e, principalmente, evita que trabalhe em cima do arquivo errado."
          },
          {
            "tipo": "conteudo",
            "titulo": "O perigo das versões",
            "texto": "Imagine uma pasta com um arquivo antigo e outro novo do mesmo capacete. Abrir o que parece certo sem conferir pode custar horas de trabalho sobre a versão errada. O hábito correto é confirmar, no pedido ou na OT, qual é o trabalho e qual é a versão vigente, e só então abrir o arquivo. Siga a nomenclatura e a estrutura de pastas definidas pela Valente; se você não souber qual é a regra, consulte o responsável em vez de adivinhar."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "organizacao_trabalho",
            "cliente": "Colega da produção: \"Ei, o cliente mandou um áudio dizendo que quer o capacete maior. Já começa a mexer no arquivo que está na pasta, depois a gente vê o pedido.\"",
            "opcoes": [
              {
                "label": "Começo pelo arquivo da pasta e confiro o pedido no final, quando terminar.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Se o arquivo ou o pedido estiverem diferentes do que você imagina, o trabalho inteiro pode ser perdido."
              },
              {
                "label": "Antes de mexer, abro o pedido e a OT no Valente OS para confirmar o trabalho e a versão vigente, e registro o que o cliente pediu no próprio pedido.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. O áudio é um aviso, mas o briefing oficial e a versão do arquivo precisam ser confirmados na fonte."
              },
              {
                "label": "Peço ao cliente para mandar outro arquivo novo e uso esse, sem olhar o pedido.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Você deixa de usar a fonte oficial e cria mais uma versão solta no meio do caminho."
              },
              {
                "label": "Aumento o capacete por conta própria, em uma escala que eu achar boa.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Isso é inventar uma medida. Quando faltar informação, consulte a fonte e o responsável."
              }
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "organizacao_trabalho",
            "instrucao": "Coloque na ordem correta os passos para começar um trabalho de modelagem.",
            "itens": [
              "Abrir o pedido ou a OT no Valente OS",
              "Ler instruções, checklist e quantidade",
              "Localizar as referências do trabalho",
              "Confirmar a versão vigente do arquivo e a pasta de saída",
              "Só então abrir o software e começar a modelar"
            ],
            "feedbackCerto": "Isso mesmo: primeiro a fonte oficial, depois as referências e a versão, por último o software.",
            "feedbackErrado": "A ordem correta começa pelo pedido ou OT, passa pelas referências e pela versão, e só depois abre o software."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "organizacao_trabalho",
            "local": "Valente OS > Pedidos (Kanban) e Missão/Inbox de tarefas",
            "instrucao": "Apenas consulte, sem alterar nada: localize um pedido na etapa Modelando e a OT correspondente. Observe título, instruções, checklist e quantidade. Depois identifique onde ficam as referências e a pasta de saída. Se a estrutura de pastas e a nomenclatura oficiais não estiverem claras, anote a dúvida e consulte o responsável. Marque como feito somente depois de realmente localizar tudo."
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "Entendendo a solicitação",
        "subtitulo": "O briefing é o contrato técnico do que será construído",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Tipos de demanda",
            "texto": "Nem todo pedido de modelagem é igual. Pode ser produto novo, criado do zero. Pode ser alteração de um modelo que já existe. Pode ser reprodução de algo que o cliente trouxe como referência. Pode ser personalização, como incluir um nome ou trocar um acessório. Pode ser ajuste de escala, para deixar uma peça maior ou menor. Ou pode ser apenas preparação para fabricação de um modelo pronto. Cada tipo exige perguntas diferentes."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que o briefing precisa responder",
            "texto": "O briefing é o contrato técnico do que deve ser construído. Ele precisa deixar claros três pontos. A finalidade: a peça será exposta, pintada, usada no dia a dia? O tamanho final: altura ou largura em milímetros ou centímetros. E o nível de detalhe esperado: rosto marcado, textura de armadura, detalhes finos. Sem essas respostas, você estaria construindo geometria no escuro."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quando a intenção está ambígua",
            "texto": "Imagine o pedido: \"faça igual à foto\". Se existe só uma vista, a foto mostra o que está visível e esconde o resto. Você precisa reconhecer o que a referência mostra e o que ela não mostra. Quando a intenção estiver ambígua, não escolha uma interpretação em silêncio. Registre a dúvida no pedido ou na OT e consulte o responsável. Dizer \"não sei\" e perguntar não é erro. Inventar é."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "leitura_briefing",
            "pergunta": "O pedido diz: \"Preciso do meu personagem do jogo, só que com a espada na outra mão\". Que tipo de demanda é esse?",
            "opcoes": [
              "Personalização ou alteração sobre uma reprodução: há um modelo base e uma mudança pedida, então é preciso confirmar o que muda e o que se mantém.",
              "Produto novo, porque o cliente pediu algo diferente do original.",
              "Apenas ajuste de escala, porque o tamanho é o que normalmente muda.",
              "Preparação para fabricação, porque o modelo já existe."
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Identificar o tipo de demanda define as perguntas certas: qual é o personagem base, de onde vêm as referências e o que exatamente muda.",
            "feedbackPorOpcao": [
              null,
              "Há um personagem de referência. Tratar como produto novo faz você ignorar o que já está definido.",
              "O pedido não fala de tamanho. A mudança é na pose e no acessório.",
              "Não sabemos se o modelo existe pronto. E há uma mudança de pose, que não é só preparação."
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "leitura_briefing",
            "pergunta": "Um briefing chegou dizendo só \"faça a miniatura do dragão da foto\". Quais informações você ainda precisa confirmar antes de modelar?",
            "itens": [
              "Tamanho final desejado",
              "Finalidade da peça (exposição, pintura, uso)",
              "Como são as costas e a cauda, que não aparecem na foto",
              "Qual é a sua cor favorita para o dragão",
              "Nível de detalhe esperado nas escamas"
            ],
            "corretos": [
              0,
              1,
              2,
              4
            ],
            "feedbackCerto": "Isso mesmo. Tamanho, finalidade, partes não visíveis e nível de detalhe fazem parte do briefing.",
            "feedbackErrado": "Faltaram itens ou sobrou algum. Sua preferência pessoal de cor não faz parte do briefing; tamanho, finalidade, partes invisíveis e nível de detalhe fazem."
          },
          {
            "tipo": "texto_livre",
            "competencia": "leitura_briefing",
            "pergunta": "Imagine um pedido simulado: \"Faça um busto do meu avô, igual à foto\", com apenas uma foto de frente. Escreva as dúvidas que você registraria antes de modelar.",
            "pontosEsperados": [
              "Tamanho final do busto",
              "Como são lado e costas da cabeça, já que só há vista frontal",
              "Finalidade e nível de detalhe esperado (por exemplo, será pintado?)",
              "Consultar o responsável em vez de inventar o que não aparece na foto"
            ]
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Referências e briefing",
        "subtitulo": "Referência suficiente, incompleta ou contraditória",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que é referência suficiente",
            "texto": "Referência suficiente é aquela que permite decidir sem inventar características importantes. Em geral ajudam fotos de vários ângulos (frente, lado, costas e topo), medidas conhecidas, desenhos em vista ortogonal e fotos de detalhes como mãos, rosto e acessórios. Quanto mais vistas, menos o modelador precisa adivinhar. Não existe um número mágico de fotos: o que importa é conseguir responder o que o briefing pede."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que a foto não mostra",
            "texto": "Uma foto frontal pode mostrar bem o rosto, mas não define as costas, a espessura ou os acessórios laterais. O que não está visível não deve ser tratado como fato. Se você completar essas partes com a sua imaginação e o cliente esperava outra coisa, o retrabalho é seu e do próximo setor. O caminho certo é listar o que falta e pedir ao responsável, que pode falar com o cliente."
          },
          {
            "tipo": "conteudo",
            "titulo": "Referências que se contradizem",
            "texto": "Às vezes duas referências discordam: uma foto mostra o personagem com capa e outra, sem capa. Ou a medida escrita no pedido não bate com a proporção da imagem. Referências contraditórias precisam ser resolvidas antes de consolidar o modelo, ou seja, antes de investir horas em geometria final. Registre a contradição no pedido, indique as duas fontes e aguarde a definição do responsável."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "leitura_briefing",
            "pergunta": "Duas imagens de referência do mesmo cavaleiro: na primeira ele tem um escudo no braço esquerdo, na segunda não. O que você faz?",
            "opcoes": [
              "Modelo com escudo, porque uma imagem mostra o escudo e é mais seguro incluir.",
              "Modelo sem escudo, porque é mais fácil e rápido de imprimir.",
              "Registro a contradição no pedido, indico quais imagens divergem e peço a definição ao responsável antes de consolidar o modelo.",
              "Modelo as duas versões e entrego as duas sem avisar nada."
            ],
            "correta": 2,
            "feedbackCerto": "Correto. Contradição se resolve na fonte, antes de gastar tempo no modelo final.",
            "feedbackPorOpcao": [
              "Você escolheu uma interpretação em silêncio. Se o cliente não queria o escudo, o trabalho vai ser refeito.",
              "Facilidade de produção não define o que o cliente pediu.",
              null,
              "Dobra o trabalho e deixa a decisão com o próximo setor, sem registro."
            ],
            "erroCriticoOpcoes": [
              0
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "leitura_briefing",
            "afirmacao": "Se a foto frontal mostra o rosto com clareza, você já pode considerar definidas as costas e os acessórios laterais da peça.",
            "correta": false,
            "feedbackCerto": "Correto. O que não aparece na referência não é fato; deve ser listado como falta.",
            "feedbackErrado": "Na verdade, falso. Uma vista só define o que está visível. Costas, espessura e laterais continuam em aberto e precisam ser perguntados."
          },
          {
            "tipo": "texto_livre",
            "competencia": "leitura_briefing",
            "pergunta": "Simulação: o pedido traz 1 foto frontal de um robô, a medida \"20 cm\" e uma descrição dizendo que ele tem \"antena no topo\", mas a foto mostra a cabeça sem antena. Classifique o conjunto como suficiente, incompleto ou contraditório e liste o que falta.",
            "pontosEsperados": [
              "Classificação coerente (contraditório, por conta da antena, e também incompleto por ter só uma vista)",
              "Lista do que falta: vistas laterais e de costas",
              "Resolver a divergência da antena com o responsável",
              "Não completar com suposições"
            ]
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "Escala e medidas",
        "subtitulo": "O mesmo desenho se comporta diferente em cada tamanho",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Escala muda tudo",
            "texto": "Escala é o tamanho final do objeto em relação ao modelo original. Ao reduzir uma figura, tudo diminui junto: braços, dedos, espadas, textura. Uma peça que funciona bem a 30 cm pode não funcionar igual a 5 cm. Os detalhes finos podem sumir na impressão, as partes finas ficam frágeis e os encaixes ficam apertados demais. Por isso, o tamanho final precisa ser decidido antes de refinar o detalhe."
          },
          {
            "tipo": "conteudo",
            "titulo": "Espessura mínima e detalhes",
            "texto": "Toda impressora 3D tem um limite do que consegue reproduzir. Paredes e hastes muito finas podem falhar, quebrar no manuseio ou nem formar. O que é suficiente depende do processo, por exemplo resina ou FDM, e do material. Como prática geral, evite partes sutis demais para o tamanho final e engrosse o que for frágil. Os valores mínimos que a Valente adota por processo devem ser consultados com a produção; não use números de cabeça."
          },
          {
            "tipo": "conteudo",
            "titulo": "Tolerância em encaixes",
            "texto": "Quando uma peça precisa encaixar em outra, como um braço no ombro, o furo precisa ser um pouco maior que o pino. Essa folga se chama tolerância. Sem ela, a peça impressa pode não montar, porque a impressão nunca é perfeita ao décimo de milímetro. Com folga demais, a peça fica solta. O valor certo depende do processo e deve seguir o padrão da Valente. Quando não houver padrão documentado, consulte a produção, e se possível peça um teste de encaixe."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "escala_medidas",
            "pergunta": "Você modelou uma figura com uma espada bem fina, pensando em 30 cm. O cliente pediu a figura com 5 cm de altura. O que você deve fazer?",
            "opcoes": [
              "Apenas reduzir tudo proporcionalmente, pois o desenho está igual.",
              "Manter a espada como está e avisar que, se quebrar, é problema da impressão.",
              "Remover a espada para não ter risco, sem avisar ninguém.",
              "Rever a espada na escala final: ela pode ficar frágil ou desaparecer, então avalio engrossá-la e confirmo os mínimos com a produção."
            ],
            "correta": 3,
            "feedbackCerto": "Correto. A escala final precisa ser considerada antes de fechar o detalhe, e os mínimos devem ser confirmados com a produção.",
            "feedbackPorOpcao": [
              "Reduzir em escala não reduz o problema: a espada fica ainda mais fina e frágil.",
              "Você entregou um risco previsível sem tentar evitá-lo.",
              "Retirar um elemento do pedido é mudar o escopo sem consultar.",
              null
            ],
            "erroCriticoOpcoes": [
              1,
              2
            ]
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "escala_medidas",
            "cliente": "Colega da pintura: \"Você sabe qual é a espessura mínima que a gente pode usar nessa miniatura? Preciso saber para o meu modelo.\"",
            "opcoes": [
              {
                "label": "É sempre 1 mm, pode usar em qualquer peça.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Inventar um número específico é arriscado, porque o mínimo depende do processo e do material."
              },
              {
                "label": "Não tenho esse número documentado. Vou consultar a produção ou o responsável e usar o padrão da Valente.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Dizer que não sabe e consultar a fonte é o comportamento esperado; o número oficial vem da Valente."
              },
              {
                "label": "Qualquer espessura serve, a impressora resolve.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Impressoras têm limites. Partes finas demais falham ou quebram."
              },
              {
                "label": "Deixa fino mesmo e vemos na impressão se quebra.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Isso desperdiça tempo e material de produção."
              }
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "escala_medidas",
            "local": "Conversa com o responsável da produção / bancada de produção",
            "instrucao": "Pergunte a um responsável da produção quais são os padrões de espessura mínima e tolerância de encaixe adotados para cada processo. Se houver documento oficial, anote onde fica. Se não houver, anote que não há padrão documentado e combine como proceder em casos assim. Marque como feito só depois de ter feito a consulta de verdade."
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "Modelar para fabricar",
        "subtitulo": "Um modelo bonito na tela precisa também funcionar como objeto",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Geometria íntegra",
            "texto": "Uma renderização bonita não garante uma boa impressão. Para o fatiador (o programa que prepara o arquivo para a impressora), o modelo precisa ser um sólido fechado, também chamado de malha fechada ou watertight, como um balão sem furos. Buracos na superfície, faces invertidas, partes que se atravessam ou superfícies sem espessura confundem o programa e geram falhas. Antes de entregar, verifique a integridade da malha com as ferramentas do seu software."
          },
          {
            "tipo": "conteudo",
            "titulo": "Divisão de peças e pintura",
            "texto": "Dividir uma figura em partes pode facilitar a impressão e a pintura. Braços, cabeça e acessórios separados deixam alcançar áreas difíceis com o pincel e podem exigir menos suporte. Por outro lado, cada divisão cria a necessidade de encaixes bem pensados, com tolerância. Decida a divisão pensando em quem imprime, quem pinta e quem monta, e registre como as peças se juntam."
          },
          {
            "tipo": "conteudo",
            "titulo": "Suportes e orientação",
            "texto": "Suportes são pequenas estruturas temporárias que sustentam partes que ficariam no ar durante a impressão, como braços levantados ou ponta de espada. Orientação é o ângulo em que a peça será posicionada na plataforma. A orientação e o suporte afetam o acabamento e a quantidade de pós-processamento. Como modelador, você deve reduzir problemas previsíveis: evitar balanços exagerados, deixar áreas planas de apoio e pensar em onde o suporte vai marcar. A configuração final de impressão segue a regra da Valente."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "modelagem_fabricacao",
            "pergunta": "Qual destes itens são riscos de fabricação reais para uma figura de guerreiro?",
            "itens": [
              "Lança extremamente fina, que pode quebrar no manuseio",
              "Braço levantado sem apoio, que pode exigir suporte",
              "Fendas ou buracos na malha do modelo",
              "Cor do uniforme que você acha mais bonita",
              "Peças divididas sem encaixe ou com encaixe sem folga"
            ],
            "corretos": [
              0,
              1,
              2,
              4
            ],
            "feedbackCerto": "Isso mesmo. Fragilidade, balanços, malha aberta e encaixes ruins são riscos previsíveis; preferência estética não é risco de fabricação.",
            "feedbackErrado": "Você deixou passar algum risco ou marcou algo que não é risco. Fragilidade, balanços sem apoio, malha aberta e encaixes ruins são riscos de fabricação."
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "modelagem_fabricacao",
            "afirmacao": "Se o modelo parece perfeito na renderização, pode ser entregue para impressão sem verificar se a malha é fechada.",
            "correta": false,
            "feedbackCerto": "Correto. A aparência na tela não garante integridade; a malha precisa ser verificada.",
            "feedbackErrado": "Falso. Um modelo bonito pode ter buracos ou faces invertidas que só aparecem no fatiador ou na impressão."
          },
          {
            "tipo": "texto_livre",
            "competencia": "modelagem_fabricacao",
            "pergunta": "Simulação: você recebeu um modelo de um mago com cajado muito fino, braços estendidos para o lado e uma capa solta no ar. Identifique três riscos de fabricação antes de liberar e diga o que sugeriria.",
            "pontosEsperados": [
              "Cajado fino demais para o tamanho: engrossar e confirmar mínimos com a produção",
              "Braços estendidos e capa em balanço: pensar em suporte ou apoio e orientação",
              "Considerar dividir peças para facilitar pintura, com encaixes adequados",
              "Consultar a regra da Valente e a produção em caso de dúvida"
            ]
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Preparação do arquivo",
        "subtitulo": "Exportar é entregar o modelo aprovado, não apenas salvar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O arquivo STL",
            "texto": "O formato mais usado para impressão 3D é o STL. Ele guarda só a forma do objeto, feita de pequenos triângulos, e não guarda cores nem unidades. Por isso, o tamanho de um STL só faz sentido se a escala e a unidade de exportação (milímetros, por exemplo) estiverem corretas. Um modelo pode estar perfeito na tela e sair 10 vezes menor ou maior no arquivo exportado. Confira sempre as dimensões depois de exportar."
          },
          {
            "tipo": "conteudo",
            "titulo": "Nome, versão e componentes",
            "texto": "Arquivos precisam ser identificáveis. O nome deve dizer o que é a peça e qual a versão, de modo que ninguém precise adivinhar. Imagine encontrar soldado.stl, soldado_final.stl e soldado_final2.stl: qual usar? A produção não deveria ter que decidir. Se o conjunto tem várias peças, cada componente deve estar identificado e nenhum deve ficar esquecido. Aplique o padrão oficial de nomenclatura da Valente quando houver; se não souber qual é, consulte o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Exportar é uma etapa de qualidade",
            "texto": "Exportar não é só clicar em salvar. É garantir que o arquivo entregue corresponde ao modelo aprovado e ao processo esperado. Antes de exportar, confirme qual versão do modelo está aberta. Depois de exportar, reabra o arquivo ou confira no visualizador se as peças estão todas lá, se a escala está certa e se o nome está claro. Guarde o arquivo na pasta de saída do trabalho, e não em uma pasta qualquer do computador."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "organizacao_versoes",
            "pergunta": "Na pasta de saída há soldado.stl, soldado_final.stl e soldado_final2.stl, sem nenhuma informação no pedido sobre qual é o vigente. O que você faz?",
            "opcoes": [
              "Não escolho pela aparência do nome: confiro no pedido ou na OT e com o responsável qual é o aprovado, e organizo a pasta conforme o padrão.",
              "Uso o soldado_final2.stl, porque o número maior deve ser o mais recente.",
              "Uso o primeiro, soldado.stl, porque é o original.",
              "Exporto um novo arquivo chamado soldado_final3.stl para resolver."
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Em caso de dúvida sobre a versão, a fonte oficial e o responsável decidem, não o nome do arquivo.",
            "feedbackPorOpcao": [
              null,
              "O nome não garante a versão. Você pode estar usando o arquivo errado.",
              "Pode ser a versão mais antiga, não a aprovada.",
              "Cria mais uma versão solta e aumenta a confusão."
            ],
            "erroCriticoOpcoes": [
              1,
              2
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "organizacao_versoes",
            "instrucao": "Ordene os passos de uma exportação segura.",
            "itens": [
              "Confirmar no pedido ou OT qual versão do modelo está aprovada",
              "Conferir escala, unidade e se todos os componentes estão no conjunto",
              "Exportar o STL com o nome seguindo o padrão oficial",
              "Reabrir ou visualizar o arquivo exportado para conferir dimensões e peças",
              "Guardar o arquivo na pasta de saída do trabalho"
            ],
            "feedbackCerto": "Ordem correta: confirmar a versão, preparar, exportar, conferir o resultado e guardar no lugar certo.",
            "feedbackErrado": "Primeiro confirme a versão e prepare o modelo; depois exporte, confira o arquivo gerado e guarde na pasta de saída."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "organizacao_versoes",
            "local": "Pasta de saída do trabalho simulado / software de modelagem",
            "instrucao": "Com um modelo de treino (não um trabalho real em andamento), exporte um STL, reabra-o e confira dimensões, componentes e nome. Se o padrão oficial de nomenclatura da Valente existir, aplique-o; se não souber qual é, consulte o responsável. Marque como feito somente depois de conferir o arquivo exportado."
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Conferência antes de liberar",
        "subtitulo": "Conferir antes de gastar tempo e material",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Por que conferir antes",
            "texto": "A conferência acontece antes de liberar porque, depois que a impressão começa, o tempo da máquina e o material já estão sendo gastos. Corrigir um erro no arquivo leva minutos; corrigir depois de uma impressão perdida custa horas, resina ou filamento e prazo. Um modelo pode estar visualmente correto e exportado em escala errada. Uma peça pode ter sido esquecida no conjunto. A conferência existe para pegar esses casos."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que conferir",
            "texto": "Confira seis pontos. Tamanho: as dimensões finais batem com o briefing? Integridade: a malha é fechada, sem buracos? Componentes: todas as peças do conjunto estão presentes? Versão: é a aprovada? Encaixes: há folga adequada? Informações de produção: quantidade, observações e orientação sugerida estão registradas? Use o checklist de liberação da Valente quando existir."
          },
          {
            "tipo": "checklist",
            "titulo": "Checklist de liberação (modelo geral)",
            "itens": [
              "Dimensões finais conferidas com o briefing",
              "Malha fechada, sem buracos ou faces invertidas",
              "Todos os componentes presentes no conjunto",
              "Versão confirmada como a aprovada",
              "Encaixes com folga e áreas frágeis revisadas",
              "Quantidade e observações de produção registradas"
            ]
          },
          {
            "tipo": "conteudo",
            "titulo": "Quando algo não pode ser confirmado",
            "texto": "Se um item crítico não puder ser confirmado, não marque como liberado. Marcar como liberado sem ter conferido é um erro crítico, porque empurra o problema para o próximo setor. Diga o que falta, registre no pedido ou na OT e peça ajuda ao responsável. Lembre que competências práticas exigem validação do responsável antes do status Liberado."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "conferencia_liberacao",
            "cliente": "Colega da impressão, com pressa: \"Esse arquivo já está pronto, né? Só falta você marcar como liberado, não deu tempo de abrir o modelo, mas deve estar bom.\"",
            "opcoes": [
              {
                "label": "Libero, porque é quase certo que está bom e o prazo é curto.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Liberar sem conferir é um erro crítico: o problema vai aparecer na impressão."
              },
              {
                "label": "Libero e peço para você conferir a escala na hora de imprimir.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Você está transferindo para o próximo setor uma conferência que é sua."
              },
              {
                "label": "Marco como liberado e confiro depois, se der tempo.",
                "correta": false,
                "erroCritico": true,
                "feedback": "A conferência precisa ocorrer antes, não depois."
              },
              {
                "label": "Ainda não posso liberar. Vou conferir tamanho, malha, componentes e versão agora. Se algum item não for confirmado, registro e aviso o responsável.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Sem conferência, não há liberação."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "conferencia_liberacao",
            "afirmacao": "Se o modelo estiver visualmente correto no software, a conferência de escala pode ser dispensada.",
            "correta": false,
            "feedbackCerto": "Correto. A escala pode estar errada mesmo com o visual correto, por isso as dimensões precisam ser conferidas.",
            "feedbackErrado": "Falso. Um modelo pode parecer certo na tela e ter sido exportado em escala errada."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "conferencia_liberacao",
            "local": "Software de modelagem / modelo de treino",
            "instrucao": "Usando um modelo de treino, percorra o checklist de liberação item por item. Para cada item, verifique de verdade: meça as dimensões, procure buracos na malha, conte os componentes. Se algum item não puder ser confirmado, anote e não considere o modelo liberado. Marque como feito só depois de completar a conferência."
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Correções e alterações",
        "subtitulo": "Erro, revisão e alteração solicitada são coisas diferentes",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Três situações diferentes",
            "texto": "Erro é algo que não atende ao que já estava definido. Por exemplo, o briefing pedia escudo e o arquivo entregue ficou sem escudo. Revisão é um ajuste dentro do processo normal, como refinar um detalhe que ainda estava sendo trabalhado. Alteração solicitada é uma mudança de escopo ou de decisão anterior, como o cliente aprovar o capacete A e depois pedir o capacete B."
          },
          {
            "tipo": "conteudo",
            "titulo": "Por que diferenciar",
            "texto": "Separar as três situações ajuda a registrar o histórico e evitar perda de versão. Um erro costuma ser responsabilidade de quem produziu e deve ser corrigido de acordo com o processo da Valente. Uma alteração solicitada pelo cliente muda o escopo e precisa ser registrada e encaminhada ao responsável, já que pode envolver orçamento, prazo ou aprovação. Não decida sozinho como tratar o custo: siga o procedimento da Valente ou consulte o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Registrar nova versão",
            "texto": "Sempre que o modelo mudar, crie uma nova versão em vez de sobrescrever a antiga, e registre o motivo da mudança no pedido ou na OT. Isso preserva a rastreabilidade: dá para voltar ao que foi aprovado, saber quem mudou o quê e evitar que a produção use um arquivo desatualizado. Siga o padrão oficial de nomenclatura de versões da Valente."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "versionamento",
            "pergunta": "Quais destas situações são alterações solicitadas, e não erros de modelagem?",
            "itens": [
              "O cliente aprovou o capacete A e agora pede o capacete B",
              "O briefing pedia escudo e o arquivo entregue não tem escudo",
              "O cliente decide aumentar a altura da figura depois de aprovada",
              "O encaixe do braço ficou fora do que estava definido no briefing",
              "O cliente pede para adicionar uma capa que não estava no pedido"
            ],
            "corretos": [
              0,
              2,
              4
            ],
            "feedbackCerto": "Isso mesmo. Mudanças na decisão ou no escopo depois da aprovação são alterações solicitadas.",
            "feedbackErrado": "As alterações solicitadas são as que mudam a decisão ou o escopo depois da aprovação. O escudo faltando e o encaixe fora do definido são erros."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "versionamento",
            "cliente": "Cliente (via atendimento): \"Eu aprovei o capacete A, mas agora gostei mais do B. Troca aí rapidinho no mesmo arquivo, né?\"",
            "opcoes": [
              {
                "label": "Sobrescrevo o arquivo do capacete A com o B, que fica mais rápido.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Você perde a versão aprovada e a rastreabilidade."
              },
              {
                "label": "Digo que não é possível mudar depois de aprovado.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Você inventou uma regra. A decisão sobre aceitar ou não e sobre custo cabe ao responsável."
              },
              {
                "label": "Isso é uma alteração solicitada, então registro o pedido, mantenho o arquivo aprovado como está e crio uma nova versão. Encaminho ao responsável o que envolve escopo, valor ou prazo.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. A alteração muda a decisão anterior e deve ser registrada, com versão nova e encaminhamento ao responsável."
              },
              {
                "label": "Faço a troca e aviso depois que terminar.",
                "correta": false,
                "erroCritico": false,
                "feedback": "O registro e o encaminhamento precisam acontecer antes."
              }
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "versionamento",
            "pergunta": "Simulação: o cliente recebeu a miniatura e diz que \"o escudo não está igual à foto\". Como você descobriria se é erro, revisão ou alteração solicitada, e o que registraria?",
            "pontosEsperados": [
              "Comparar o arquivo entregue com o briefing e as referências aprovadas",
              "Se o arquivo não atendia ao definido, é erro; se o cliente quer algo diferente do aprovado, é alteração solicitada",
              "Registrar a decisão no pedido ou OT e criar nova versão sem sobrescrever a anterior",
              "Consultar o responsável quando a dúvida envolver escopo ou custo"
            ]
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Entrega para Impressão",
        "subtitulo": "Um pacote que o operador entende sem perguntar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que a produção precisa receber",
            "texto": "A produção precisa receber o arquivo correto, a versão, a escala, a quantidade e as observações necessárias. O objetivo é que o operador não precise reconstruir o briefing para descobrir o que imprimir. Entregar apenas um STL em uma pasta sem identificação pode gerar erro mesmo que o arquivo esteja tecnicamente perfeito, porque ninguém sabe se é o certo, quantas cópias fazer ou se há peças em outro arquivo."
          },
          {
            "tipo": "conteudo",
            "titulo": "O pacote de liberação",
            "texto": "Um pacote bem feito traz: nome da peça e do pedido, versão aprovada, lista de arquivos e componentes, tamanho final, quantidade, observações como sugestão de orientação, pontos frágeis e como as peças se encaixam, e o que ainda ficou em aberto, se houver. Registre isso no pedido ou na OT do Valente OS, no lugar que a Valente define, para que a informação fique junto do trabalho."
          },
          {
            "tipo": "conteudo",
            "titulo": "O teste da pessoa sem contexto",
            "texto": "Um bom jeito de testar o seu pacote é pedir a outra pessoa que o interprete sem nenhuma explicação verbal. Se ela precisar adivinhar qualquer coisa, falta informação. Também vale lembrar que a avaliação do pacote não é só do arquivo: informação clara faz a impressão acontecer sem retrabalho."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "entrega_producao",
            "pergunta": "Qual pacote de entrega é o mais adequado para o operador de impressão?",
            "opcoes": [
              "Apenas o STL na pasta do trabalho, porque o operador pode olhar o pedido depois.",
              "STL com nome e versão claros, tamanho final, quantidade, lista de componentes e observações registrados no pedido ou na OT.",
              "O STL por mensagem pessoal, com a explicação falada, sem registro.",
              "O STL mais recente da pasta, com a mensagem \"é este\"."
            ],
            "correta": 1,
            "feedbackCerto": "Correto. O pacote deve ser compreensível sozinho, com tudo registrado.",
            "feedbackPorOpcao": [
              "O operador teria que reconstruir o briefing por conta própria.",
              null,
              "O que não fica registrado se perde e cria dúvida.",
              "Sem identificação de versão, escala e quantidade, a informação ainda é insuficiente."
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "entrega_producao",
            "pergunta": "Quais informações o pacote para a impressão precisa trazer?",
            "itens": [
              "Versão aprovada do arquivo",
              "Escala ou tamanho final",
              "Quantidade a imprimir",
              "Quanto tempo você demorou para modelar",
              "Observações sobre pontos frágeis e encaixes"
            ],
            "corretos": [
              0,
              1,
              2,
              4
            ],
            "feedbackCerto": "Isso mesmo. Versão, escala, quantidade e observações permitem imprimir sem adivinhar.",
            "feedbackErrado": "O tempo que você levou para modelar não ajuda a produção. Versão, escala, quantidade e observações, sim."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "entrega_producao",
            "local": "Valente OS > OT / pedido simulado e uma pessoa colega",
            "instrucao": "Prepare um pacote de liberação simulado, com os itens que aprendeu, usando um trabalho de treino. Peça a um colega que o interprete sem nenhuma explicação sua. Anote tudo o que ele precisou perguntar ou adivinhar e complete o pacote. Não altere pedidos reais. Marque como feito só depois do teste com o colega."
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "Missão Modelagem",
        "subtitulo": "Do briefing à liberação, do jeito certo",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "A missão do curso",
            "texto": "Nesta missão você percorre o fluxo inteiro: identifica o trabalho no Valente OS, lê o briefing e as referências, descobre as lacunas, planeja escala e divisão, prepara e exporta a versão final, faz a conferência e entrega o pacote à produção. A avaliação observa o processo, não apenas a aparência do modelo. Você identificou o trabalho? Evitou inventar referência? Registrou versão? Pensou em fabricação? Entregou informação suficiente?"
          },
          {
            "tipo": "conteudo",
            "titulo": "Lembretes de método",
            "texto": "Regras gerais deste curso, como malha fechada, tolerância e checklist, são práticas comuns da área. Medidas, nomenclatura de arquivos e padrões por processo são da Valente: quando você não tiver o número ou a regra, consulte a fonte e o responsável. Dizer \"não sei\" e perguntar não é erro; inventar é. O procedimento oficial da Valente sempre prevalece sobre qualquer regra geral deste curso."
          },
          {
            "tipo": "cenario",
            "competencia": "conferencia_liberacao",
            "titulo": "Briefing simulado: busto de guerreira",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "Briefing simulado no pedido: \"Quero uma miniatura da minha personagem guerreira, igual à foto, para pintar. Tamanho: o que ficar bom.\" Há uma única foto frontal e nenhuma medida. Qual é o seu primeiro passo?",
                "opcoes": [
                  {
                    "label": "Começo a modelar com base na foto e defino eu mesmo o tamanho.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Você inventou tamanho e partes que não aparecem na foto.",
                    "proximo": "b"
                  },
                  {
                    "label": "Registro as lacunas no pedido (tamanho, costas, acessórios, finalidade) e consulto o responsável antes de modelar.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Lacunas são consultadas na fonte, sem inventar.",
                    "proximo": "b"
                  },
                  {
                    "label": "Peço qualquer foto extra pelo WhatsApp e já começo, sem registrar nada no sistema.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Você deixa o briefing fora do Valente OS e perde o registro.",
                    "proximo": "b"
                  },
                  {
                    "label": "Modelo a frente e deixo as costas lisas para economizar tempo.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Decisão de escopo tomada em silêncio.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "O responsável respondeu: altura final definida, peça será pintada, e enviou novas fotos de lado e costas. Agora você precisa planejar a modelagem. O que considera?",
                "opcoes": [
                  {
                    "label": "Confiro a escala final com os detalhes finos, planejo dividir a espada e a cabeça para facilitar a pintura, com encaixes com tolerância pelo padrão da Valente.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Escala, divisão e encaixes pensados para fabricação e pintura.",
                    "proximo": "c"
                  },
                  {
                    "label": "Modelo tudo em uma peça só, sem pensar em suportes ou pintura, e vejo na impressão.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Isso ignora riscos previsíveis de fabricação.",
                    "proximo": "c"
                  },
                  {
                    "label": "Uso a espessura mínima que acho certa, pois sei que 1 mm basta.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Você inventou um padrão. Os mínimos devem vir da produção.",
                    "proximo": "c"
                  },
                  {
                    "label": "Salvo os arquivos em qualquer pasta, depois organizo.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "A organização de versão e pasta faz parte do trabalho desde o início.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "O modelo ficou pronto. Você exportou o STL e precisa liberar para a impressão. Qual é a atitude correta?",
                "opcoes": [
                  {
                    "label": "Confiro dimensões, malha, componentes, versão e encaixes, registro o pacote no pedido ou OT, e aguardo a validação do responsável antes do status Liberado.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. A conferência vem antes, e o responsável valida."
                  },
                  {
                    "label": "Marco como liberado, porque o modelo está bonito na tela.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Liberar sem conferir é erro crítico."
                  },
                  {
                    "label": "Entrego só o STL e aviso a produção por mensagem.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Falta registro do pacote."
                  },
                  {
                    "label": "Libero sem conferir a escala, já que não mudei o tamanho.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Escala errada na exportação é comum e precisa ser conferida."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "conferencia_liberacao",
            "titulo": "Missão Modelagem: miniatura da guerreira",
            "objetivo": "Conduzir um briefing simulado, do recebimento até a liberação, sem inventar informações e deixando um pacote claro para a produção.",
            "contexto": "Pedido fictício de treinamento: o cliente quer uma miniatura de uma guerreira para pintar, a partir de uma foto frontal, sem medidas. Use apenas material de treino, sem alterar pedidos reais.",
            "tarefas": [
              "Localizar o trabalho simulado e suas referências, e confirmar a pasta de saída",
              "Classificar as referências como suficientes, incompletas ou contraditórias e listar o que falta",
              "Registrar as dúvidas e consultar o responsável em vez de supor tamanho ou detalhes ocultos",
              "Planejar escala, espessuras, divisão de peças e encaixes, confirmando padrões com a produção",
              "Preparar e exportar o arquivo com nome e versão no padrão da Valente, conferindo escala e componentes",
              "Preencher o checklist de liberação e montar o pacote de entrega com versão, escala, quantidade e observações",
              "Pedir a validação do responsável antes de considerar o trabalho Liberado"
            ],
            "criterioConclusao": "Todos os itens foram feitos com informação real, nenhuma lacuna foi preenchida com suposição, o checklist foi completado e o responsável validou a liberação."
          }
        ]
      }
    ]
  },
  impressao_3d: {
    "id": "impressao_3d",
    "nome": "Impressão 3D",
    "descricao": "Operar a estação de impressão 3D em resina e FDM, da OT até a liberação para o pós-impressão.",
    "icone": "🖨️",
    "versao": 1,
    "cargosPermitidos": null,
    "competencias": [
      "Estação e segurança",
      "Leitura da OT",
      "Processos e fatiamento",
      "Preparo e acompanhamento",
      "Inspeção e falhas",
      "Liberação para pós-impressão"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Minha estação de impressão",
        "subtitulo": "Equipamentos, materiais, EPIs e onde consultar a OT",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que existe na estação",
            "texto": "A estação de impressão 3D reúne impressoras, um computador ou tablet, o Valente OS, o fatiador, materiais, ferramentas e EPIs. Impressora é a máquina que fabrica a peça. Fatiador é o programa que transforma o modelo 3D em instruções para a máquina. Material é a resina líquida ou o filamento, que é o fio plástico usado no processo FDM. Cada item tem uma finalidade, e você precisa saber qual é antes de mexer."
          },
          {
            "tipo": "conteudo",
            "titulo": "Disponível não é autorizado",
            "texto": "Uma máquina livre não significa que o trabalho é autorizado. Um material na prateleira não significa que serve para qualquer peça. A fonte da verdade do que produzir é a ordem de trabalho (OT), que você consulta no Valente OS, na Missão/Inbox de tarefas. No tablet, a OT mostra título, instruções, checklist e quantidade."
          },
          {
            "tipo": "conteudo",
            "titulo": "EPIs e ventilação",
            "texto": "EPI é o equipamento de proteção individual. Com resina líquida, a prática geral é usar luvas adequadas, proteção para os olhos e trabalhar com ventilação, porque resina irrita a pele e tem odor forte. Em ferramentas de corte e solventes, o cuidado é o mesmo. Quais máquinas você pode operar e quais EPIs são exigidos em cada uma: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "estacao_seguranca",
            "cliente": "Colega: 'A impressora do canto está livre e tem resina no tanque. Pode já ir imprimindo uma peça que você acha que vai precisar, né?'",
            "opcoes": [
              {
                "label": "Posso, máquina livre e material na estação são sinal de que está liberado.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Máquina e material disponíveis não são autorização. Sem OT, não há trabalho autorizado."
              },
              {
                "label": "Só imprimo depois de abrir a OT no Valente OS e confirmar que o equipamento é um que posso operar.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. A OT define o que produzir, e a autorização por máquina segue o que a Valente definiu."
              },
              {
                "label": "Imprimo uma peça de teste pequena, porque gasta pouco material.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Mesmo teste gasta material, tempo de máquina e pode ocupar o lugar de um trabalho real. Precisa de OT ou de autorização."
              },
              {
                "label": "Pergunto ao colega qual resina usar e sigo o que ele disser, sem olhar a OT.",
                "correta": false,
                "erroCritico": false,
                "feedback": "A informação do material vem da OT e da ficha, não de memória de alguém."
              }
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "estacao_seguranca",
            "local": "Estação de impressão (área física) e Valente OS, aba Missão/Inbox",
            "instrucao": "Sem iniciar nenhuma produção, caminhe pela estação com o líder ou responsável. Identifique impressoras, onde ficam os materiais, ferramentas e EPIs, e localize no tablet ou computador a Missão/Inbox onde as OTs aparecem. Confirme apenas quando tiver visto cada item e perguntado quais máquinas você está autorizado a operar."
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "Entendendo a OT antes de imprimir",
        "subtitulo": "Conferir antes de preparar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que a OT precisa dizer",
            "texto": "A OT deve informar o suficiente para você saber o que produzir: peça, arquivo e versão, quantidade, tamanho, material, prioridade e observações. Versão importa porque um mesmo modelo pode ter sido corrigido depois. Imprimir a versão antiga é usar o arquivo errado, e isso só aparece quando a peça já está pronta."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quando a OT e o arquivo divergem",
            "texto": "Se a OT diz uma coisa e o arquivo diz outra, você não escolhe sozinho. Exemplo: a OT pede 16 unidades, mas a plataforma preparada contém 15. Se isso for percebido antes de iniciar, o custo é um minuto. Se for percebido depois de quatro horas, o custo é a máquina ocupada e uma peça faltando."
          },
          {
            "tipo": "conteudo",
            "titulo": "A sequência de conferência",
            "texto": "Use sempre esta ordem: identificar a OT, conferir o arquivo, conferir a quantidade, conferir o material e só então preparar. Ao não ter uma informação, não invente: consulte a fonte (Valente OS, ficha, OT) e, se for preciso, o responsável. Dizer 'não sei, vou confirmar' não é erro. Supor é."
          },
          {
            "tipo": "ordenar",
            "competencia": "leitura_ot",
            "instrucao": "Coloque a conferência antes de imprimir na ordem correta.",
            "itens": [
              "Identificar a OT",
              "Conferir arquivo e versão",
              "Conferir quantidade",
              "Conferir material",
              "Preparar a impressão"
            ],
            "feedbackCerto": "Isso mesmo. Preparar vem por último.",
            "feedbackErrado": "A ordem é: identificar a OT, arquivo e versão, quantidade, material, e só então preparar."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "leitura_ot",
            "pergunta": "A OT pede 16 unidades, mas o arquivo aberto no fatiador tem 15 peças na plataforma. O que você faz?",
            "opcoes": [
              "Corrige a quantidade conforme a OT se for dentro do que você já faz e, se a divergência vier de arquivo ou versão, avisa o responsável antes de iniciar.",
              "Imprime as 15 e depois vê se dá tempo de fazer a que falta.",
              "Confia no arquivo, pois quem preparou deve ter calculado.",
              "Inicia com 15 e registra 16 ao concluir, para a OT ficar certa."
            ],
            "correta": 0,
            "feedbackCerto": "Certo. Quantidade e arquivo precisam bater com a OT antes de iniciar.",
            "feedbackPorOpcao": [
              null,
              "Você já sabe que está errado e mesmo assim iniciaria. Isso gera tempo perdido e peça faltando.",
              "A OT é a referência da quantidade. O arquivo preparado pode ter erro.",
              "Registrar o que não foi feito é esconder o problema, um erro crítico."
            ],
            "erroCriticoOpcoes": [
              1,
              3
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "leitura_ot",
            "pergunta": "Pegue uma OT de treino no Valente OS (apenas consulta). Descreva quais informações dela você usaria para saber o que produzir e o que faria se faltasse alguma.",
            "pontosEsperados": [
              "Cita peça, arquivo/versão, quantidade, material e observações",
              "Percebe que falta de informação se resolve consultando ficha, OT ou responsável",
              "Não inventa o dado que falta"
            ]
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Resina x FDM",
        "subtitulo": "Dois processos, duas formas de operar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Como cada processo funciona",
            "texto": "Na impressão por resina, uma resina líquida fotossensível fica em um tanque e é endurecida por luz, camada a camada. A peça sai molhada de resina, cheia de suportes, e precisa de lavagem e cura UV depois. No FDM, um filamento plástico é derretido e depositado em camadas sobre uma mesa. Ali o pós-processo costuma ser remover suportes e acabar a superfície."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que muda na operação",
            "texto": "Na resina, os cuidados centrais são o tanque (com o filme FEP no fundo), o nível de resina, luvas e ventilação. No FDM, os cuidados são o nivelamento e a limpeza da mesa, a adesão da primeira camada e o estado do filamento, que absorve umidade e pode causar defeitos. Parâmetros como temperatura e tempo de exposição: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quem escolhe o processo",
            "texto": "O processo vem da OT e do padrão definido, não da preferência do operador nem de qual máquina está livre. Uma peça designada para resina não migra para FDM só porque uma impressora está parada. Isso muda acabamento, resistência e tolerância. Trocar só com decisão autorizada."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "processos_fatiamento",
            "pergunta": "Quais itens são cuidados típicos da impressão em RESINA?",
            "itens": [
              "Tanque de resina com filme FEP",
              "Nivelamento e adesão da mesa de filamento",
              "Luvas e ventilação ao manusear resina líquida",
              "Umidade do filamento",
              "Lavagem e cura UV após a impressão"
            ],
            "corretos": [
              0,
              2,
              4
            ],
            "feedbackCerto": "Certo. Os outros dois são cuidados do FDM.",
            "feedbackErrado": "Tanque/FEP, luvas e ventilação, e lavagem com cura UV são da resina. Nivelamento de mesa e umidade do filamento são do FDM."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "processos_fatiamento",
            "cliente": "Colega: 'A impressora de resina está ocupada e a de FDM está livre. Essa peça é pra resina, mas se eu mandar no FDM sai hoje. Manda ver?'",
            "opcoes": [
              {
                "label": "Mando no FDM, o importante é entregar no prazo.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Trocar o processo muda acabamento e resistência. Só com decisão autorizada."
              },
              {
                "label": "Mando no FDM e aviso depois se ninguém reclamar.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Avisar depois é esconder a decisão que não era sua."
              },
              {
                "label": "Espero a resina terminar e imprimo mais tarde, sem falar com ninguém.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Aguardar pode ser certo, mas se o prazo aperta você deve avisar o responsável em vez de decidir sozinho."
              },
              {
                "label": "A OT define resina, então mantenho resina e, se o prazo é problema, falo com o responsável para decidir.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. O processo segue a OT; mudança precisa de quem decide."
              }
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "processos_fatiamento",
            "local": "Estação de impressão (área física)",
            "instrucao": "Com o líder, identifique quais máquinas da estação são de resina e quais são FDM, e quais delas você está autorizado a operar. Confirme quando souber distinguir os dois tipos e souber onde consultar o que é autorizado."
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "Preparação do arquivo",
        "subtitulo": "Fatiamento, orientação, suportes e prévia",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que é fatiar",
            "texto": "Fatiar é transformar o modelo 3D em instruções de fabricação: o programa corta o modelo em camadas finas e gera o caminho que a máquina vai seguir. Orientação é o ângulo em que a peça fica na plataforma. Suportes são estruturas temporárias que seguram partes que ficariam no ar. Posicionamento é onde cada peça fica na plataforma."
          },
          {
            "tipo": "conteudo",
            "titulo": "Por que a preparação importa",
            "texto": "Orientação ruim pode deixar marcas visíveis ou aumentar falhas. Suporte insuficiente pode fazer parte da peça cair ou deformar. Duplicar uma peça na plataforma muda a quantidade e também o tempo total. Por isso o fatiamento deve seguir o padrão: perfis oficiais e parâmetros autorizados, siga o procedimento definido pela Valente ou consulte o responsável. Não altere parâmetros críticos sem autorização."
          },
          {
            "tipo": "conteudo",
            "titulo": "A prévia é seu último filtro",
            "texto": "Antes de enviar para a máquina, abra a prévia do fatiamento e confira: é a versão certa do arquivo? A quantidade bate com a OT? Todas as peças cabem e estão dentro da plataforma? Os suportes cobrem as partes no ar? O tempo estimado faz sentido? Só então envie. Corrigir na prévia leva minutos; depois de iniciar, custa horas."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "processos_fatiamento",
            "pergunta": "Ao abrir o fatiamento você percebe que uma parte da peça ficou sem suporte, pendurada. O que fazer?",
            "opcoes": [
              "Enviar assim mesmo e torcer para a parte se segurar.",
              "Remover a parte do arquivo para a impressão ficar mais rápida.",
              "Aumentar parâmetros do perfil por conta própria até o suporte parecer forte.",
              "Ajustar a orientação ou os suportes dentro do que o procedimento permite, e consultar o responsável se precisar mexer em parâmetro crítico."
            ],
            "correta": 3,
            "feedbackCerto": "Certo. Corrija na prévia, dentro do que é autorizado.",
            "feedbackPorOpcao": [
              "Enviar sabendo do risco é avançar trabalho defeituoso.",
              "Alterar o modelo muda a peça entregue.",
              "Parâmetros críticos não se alteram sem autorização.",
              null
            ],
            "erroCriticoOpcoes": [
              0,
              2
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "processos_fatiamento",
            "afirmacao": "Se a prévia do fatiamento parece boa, não é necessário conferir quantidade e versão do arquivo contra a OT.",
            "correta": false,
            "feedbackCerto": "Isso. A prévia só vale se o arquivo for a versão certa e a quantidade bater com a OT.",
            "feedbackErrado": "Aparência boa não garante versão e quantidade corretas. Confira sempre contra a OT."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "processos_fatiamento",
            "local": "Fatiador (computador da estação)",
            "instrucao": "Sem enviar nada para a máquina, abra um arquivo de treino no fatiador com o líder. Localize a prévia por camadas, os suportes, a quantidade de peças na plataforma e o tempo estimado. Confirme quando souber onde conferir cada um desses pontos."
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "Preparação da máquina",
        "subtitulo": "Checagem curta que evita perda de horas",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Por que checar antes",
            "texto": "Iniciar com material errado ou máquina em condição anormal transforma uma tarefa simples em retrabalho. A checagem antes de iniciar leva poucos minutos e evita perder horas de máquina e material. Use o checklist específico da máquina, e para procedimentos químicos e mecânicos siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Checagem na resina",
            "texto": "Na resina, a prática geral é conferir: resina correta e suficiente no tanque, filme FEP sem riscos, furos ou resíduos endurecidos, plataforma de impressão limpa e bem fixada, e tela e tampa em ordem. Resina com resíduo curado no tanque pode arrancar a peça do suporte. Use luvas e ventilação ao manusear."
          },
          {
            "tipo": "conteudo",
            "titulo": "Checagem no FDM",
            "texto": "No FDM, confira: filamento correto e seco (filamento úmido pode estalar, soltar fiapos e deixar acabamento ruim), bico sem sujeira, mesa limpa e nivelada e primeira camada com boa adesão. Nivelar a mesa é ajustar a distância do bico para que o filamento grude de forma uniforme. Mesa suja ou desnivelada é uma das causas comuns de descolamento e warping, que é o canto da peça levantando."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "preparo_acompanhamento",
            "pergunta": "Você vai iniciar uma impressão em resina e vê pedaços endurecidos flutuando no tanque. Qual é o passo certo?",
            "opcoes": [
              "Iniciar mesmo assim, a máquina costuma passar por cima.",
              "Misturar com uma ferramenta qualquer e iniciar em seguida.",
              "Não iniciar, avisar o responsável e tratar o tanque pelo procedimento oficial antes de imprimir.",
              "Iniciar uma peça menor para testar se funciona."
            ],
            "correta": 2,
            "feedbackCerto": "Isso. Condição anormal do equipamento se resolve antes de iniciar, pelo procedimento.",
            "feedbackPorOpcao": [
              "Resíduo curado pode estragar a impressão e o tanque. Avançar é erro crítico.",
              "Improvisar ferramenta pode riscar o FEP e danificar o tanque.",
              null,
              "Mesmo peça pequena usa o mesmo tanque com problema."
            ],
            "erroCriticoOpcoes": [
              0
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "preparo_acompanhamento",
            "pergunta": "Quais itens fazem parte da checagem do FDM antes de iniciar?",
            "itens": [
              "Mesa limpa e nivelada",
              "Filme FEP sem riscos",
              "Filamento correto e seco",
              "Bico sem sujeira",
              "Plataforma de resina fixada"
            ],
            "corretos": [
              0,
              2,
              3
            ],
            "feedbackCerto": "Correto. FEP e plataforma de resina são da impressão em resina.",
            "feedbackErrado": "Mesa, filamento e bico são do FDM. FEP e plataforma de resina pertencem à impressão em resina."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "preparo_acompanhamento",
            "local": "Estação de impressão (checklist da máquina)",
            "instrucao": "Com o líder, localize o checklist específico de uma máquina e percorra cada item sem iniciar produção. Confirme quando souber onde fica o checklist e o que fazer se algum item estiver fora da condição normal."
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Iniciando e acompanhando",
        "subtitulo": "Iniciar a OT, observar e reconhecer sinais",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Iniciar a OT certa",
            "texto": "No tablet, a tarefa tem três ações: Iniciar, Pausar e Concluir. Ao começar o trabalho, use Iniciar na OT correta, para que o sistema saiba o que está em produção e por quem. Confira que a máquina recebeu o arquivo da mesma OT. Iniciar na OT errada gera confusão de quantidade e de responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Acompanhar não é olhar sem parar",
            "texto": "Acompanhar é fazer as verificações previstas e reconhecer sinais de problema. Os pontos de inspeção e critérios de parada oficiais: siga o procedimento definido pela Valente ou consulte o responsável. Como regra geral, a primeira camada é a mais importante, então observe o começo com atenção. Se precisar parar o trabalho para resolver algo, use Pausar na OT."
          },
          {
            "tipo": "conteudo",
            "titulo": "Sinais de problema e decisão",
            "texto": "Sinais comuns: peça soltando da plataforma ou da mesa, cantos levantando, fiapos de filamento, camadas falhando, barulho diferente ou cheiro anormal. Não continue só para ver se termina. Classifique: posso corrigir com procedimento autorizado, devo pausar ou abortar, ou devo chamar o responsável. Em caso de risco, segurança vem primeiro."
          },
          {
            "tipo": "cenario",
            "competencia": "preparo_acompanhamento",
            "titulo": "Primeira camada com problema",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "Você iniciou uma impressão FDM e, na primeira camada, vê o filamento saindo mas não grudando na mesa; os cantos já soltam.",
                "opcoes": [
                  {
                    "label": "Deixar rodando, as próximas camadas vão compensar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "A falha só cresce. Continuar sem agir é avançar trabalho com defeito conhecido."
                  },
                  {
                    "label": "Pausar a impressão e avaliar a causa (mesa suja, desnivelada) pelo procedimento.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Parar cedo poupa material e horas.",
                    "proximo": "b"
                  },
                  {
                    "label": "Dar uma pancada na mesa para ajustar.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Isso pode danificar a máquina e não resolve a causa."
                  },
                  {
                    "label": "Aumentar parâmetros por conta própria durante a impressão.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Parâmetros críticos não se mudam sem autorização."
                  }
                ]
              },
              "b": {
                "cliente": "Você pausou. Limpando a mesa e revisando o nivelamento você ainda não tem certeza do ajuste correto para esse material.",
                "opcoes": [
                  {
                    "label": "Chutar um valor e reiniciar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Chutar é inventar. O ajuste certo vem do procedimento da Valente."
                  },
                  {
                    "label": "Consultar o procedimento da Valente e, se persistir a dúvida, o responsável.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Isso. Não saber é aceitável, inventar não.",
                    "proximo": "c"
                  },
                  {
                    "label": "Descartar o material e trocar de máquina sem avisar.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Trocar de máquina sem avisar quebra o vínculo da OT com a máquina."
                  },
                  {
                    "label": "Concluir a tarefa na OT para sair do alerta.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Concluir sem ter produzido é marcar como feito o que não foi feito."
                  }
                ]
              },
              "c": {
                "cliente": "O responsável liberou você para reiniciar. Como registrar?",
                "opcoes": [
                  {
                    "label": "Reiniciar e manter a OT iniciada, retomando o acompanhamento da primeira camada.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Retome e observe a primeira camada com atenção."
                  },
                  {
                    "label": "Reiniciar e não dizer nada, para não parecer que errou.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Esconder falha impede aprender com ela."
                  },
                  {
                    "label": "Reiniciar e apagar as anotações da tentativa anterior.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Apagar o histórico esconde o ocorrido."
                  },
                  {
                    "label": "Deixar a máquina rodando e sair, já que o problema foi resolvido.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Depois de uma falha, a primeira camada merece acompanhamento extra."
                  }
                ]
              }
            }
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "preparo_acompanhamento",
            "local": "Valente OS, tablet, Missão/Inbox de tarefas (apenas observação)",
            "instrucao": "Sem alterar nenhuma OT real, abra uma OT no tablet e localize os botões Iniciar, Pausar e Concluir. Confirme quando souber o que cada um representa e quando usaria Pausar."
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Quando a impressão termina",
        "subtitulo": "Fim do ciclo não é aprovação",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Terminar não é aprovar",
            "texto": "Quando a máquina acaba, o ciclo terminou, mas a peça ainda não foi aprovada. A máquina pode concluir normalmente e a peça sair com defeito. Antes de liberar, confira quantidade, integridade, falhas, deformações e resultado geral. Retire a peça com cuidado, usando luvas quando houver resina, e sem forçar para não quebrar."
          },
          {
            "tipo": "conteudo",
            "titulo": "Contar e inspecionar",
            "texto": "Conte as peças e compare com a OT. Uma bandeja com 16 posições e 15 peças boas não deve ser registrada como 16 concluídas. Inspecione: partes faltando, suportes quebrados, camadas falhadas, empenamento (warping), superfície com defeito e peças que soltaram no meio do processo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Registrar o que aconteceu",
            "texto": "Registre conforme o procedimento. No tablet, Concluir só se usa quando a tarefa foi de fato realizada. O registro da fornada e, quando houver, da falha com o motivo, deve refletir a realidade: quantas peças boas, quantas reprovadas e por quê. O formato exato do registro: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "inspecao_falhas",
            "pergunta": "A bandeja tinha 16 posições; saíram 15 peças boas e 1 com camada falhada. Como você registra?",
            "opcoes": [
              "16 concluídas, porque a bandeja estava completa.",
              "15 boas, 1 falha registrada com o motivo, separada das aprovadas.",
              "15 concluídas e não menciono a falha, já que a quantidade das boas está certa.",
              "Descarto a peça defeituosa sem registro."
            ],
            "correta": 1,
            "feedbackCerto": "Certo. Quantidade real e falha com motivo.",
            "feedbackPorOpcao": [
              "Registrar 16 é afirmar o que não existe, um erro crítico.",
              null,
              "Omitir a falha impede que a causa seja investigada.",
              "Descartar sem registro apaga a evidência."
            ],
            "erroCriticoOpcoes": [
              0,
              2,
              3
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "inspecao_falhas",
            "afirmacao": "Se a impressora terminou sem mostrar erro, as peças já podem ser consideradas aprovadas.",
            "correta": false,
            "feedbackCerto": "Isso. Terminar sem erro não prova que as peças estão boas.",
            "feedbackErrado": "A máquina pode terminar normalmente e ainda ter gerado peças defeituosas. A inspeção é sua."
          },
          {
            "tipo": "texto_livre",
            "competencia": "inspecao_falhas",
            "pergunta": "Você retirou uma bandeja e as peças parecem corretas, mas uma está com um canto levantado. Descreva como você contaria, inspecionaria e registraria esse resultado.",
            "pontosEsperados": [
              "Conta as peças e compara com a OT",
              "Identifica a peça com canto levantado (warping) como reprovada",
              "Registra quantidade real e falha com motivo, sem esconder"
            ]
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Falhas de impressão",
        "subtitulo": "Reconhecer, separar e comunicar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Falhas comuns",
            "texto": "Falha é qualquer resultado que não atende à OT. Exemplos: peça solta da plataforma, suporte quebrado, falta de material no meio da impressão, falha parcial, deformação, arquivo incorreto ou máquina parada. Em FDM, os nomes mais comuns são warping (canto levantando), descolamento da mesa e falha de camada (camadas deslocadas ou faltando)."
          },
          {
            "tipo": "conteudo",
            "titulo": "Procurar a causa, não o culpado",
            "texto": "O objetivo não é achar um culpado, é impedir que se repita e proteger o fluxo. Reimprimir automaticamente pode repetir a mesma causa. Antes, olhe o que dá: arquivo, preparação, material, máquina e outros fatores dentro da sua competência. Causas comuns: mesa suja ou desnivelada, filamento úmido, suporte insuficiente, FEP sujo ou riscado, quantidade errada."
          },
          {
            "tipo": "conteudo",
            "titulo": "Separar e comunicar",
            "texto": "Não esconda a falha e não misture peça reprovada com peça aprovada. Separe fisicamente, identifique e registre a falha com motivo (no tablet, no registro de fornada/falha). Se a causa for fora da sua competência ou envolver reimpressão, comunique o responsável. Regras de descarte e reimpressão: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "inspecao_falhas",
            "cliente": "Colega: 'Deu falha na peça 7, mas sobraram 15 boas. Joga a ruim junto com as outras e a gente vê isso depois, ninguém percebe.'",
            "opcoes": [
              {
                "label": "Jogo junto e confiro depois se alguém reclama.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Misturar peça reprovada com aprovada é erro crítico, pois pode chegar ao cliente."
              },
              {
                "label": "Separo e identifico a peça ruim, registro a falha com motivo e comunico o responsável.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Isso protege o fluxo e a causa pode ser tratada."
              },
              {
                "label": "Descarto a ruim e não registro nada, para não gerar burocracia.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Sem registro a causa não é investigada e a falha pode se repetir."
              },
              {
                "label": "Reimprimo logo a peça sem avisar, assim o prazo não muda.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Reimprimir sem entender a causa pode repetir a falha e gastar material."
              }
            ]
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "inspecao_falhas",
            "pergunta": "Uma peça saiu com warping (cantos levantados). Qual é o melhor primeiro passo antes de reimprimir?",
            "opcoes": [
              "Procurar a causa (mesa suja/desnivelada, primeira camada, material) e comunicar o responsável.",
              "Reimprimir na mesma máquina com o mesmo arquivo.",
              "Esconder a peça e pegar outra da bandeja anterior.",
              "Trocar a OT para outra máquina sem avisar."
            ],
            "correta": 0,
            "feedbackCerto": "Isso. Entender antes de repetir.",
            "feedbackPorOpcao": [
              null,
              "Isso pode repetir exatamente a mesma falha.",
              "Usar peça de outra OT é confundir pedidos e esconder o defeito.",
              "Mudar a máquina sem avisar quebra o rastro da OT."
            ],
            "erroCriticoOpcoes": [
              2
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "inspecao_falhas",
            "local": "Valente OS, registro de fornada/falha (apenas observação)",
            "instrucao": "Sem registrar nada real, peça ao líder para mostrar onde se registra uma fornada com falha e o campo de motivo. Confirme quando souber como se registra a falha e por que o motivo importa."
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Liberando para Pós-impressão",
        "subtitulo": "Entregar o que o próximo setor consegue conferir",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que o pós-processo precisa",
            "texto": "O pós-impressão é a etapa do Kanban que recebe suas peças. Ele precisa de quantidade identificada, peças em condição compatível com o processo e vínculo claro com a OT e o pedido. Se ele precisa adivinhar o que recebeu, o erro aparece só depois, quando já é caro."
          },
          {
            "tipo": "conteudo",
            "titulo": "Risco de misturar",
            "texto": "Peças de pedidos diferentes misturadas aumentam muito o risco de troca. Componentes pequenos sem identificação podem desaparecer ou ser montados no conjunto errado. Separe por OT, use recipientes ou etiquetas conforme o padrão e guarde peças pequenas juntas, identificadas. Formato de identificação e local de entrega: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Concluir e liberar",
            "texto": "Depois de contar, inspecionar e organizar, use Concluir na OT, que registra o término. O Concluir só entra quando o trabalho realmente terminou e a entrega está identificada. Concluir com peça faltando ou sem conferir passa o problema para o próximo setor, que depois não tem como saber a origem."
          },
          {
            "tipo": "ordenar",
            "competencia": "liberacao_pos",
            "instrucao": "Coloque o fechamento da OT na ordem correta.",
            "itens": [
              "Contar as peças e comparar com a OT",
              "Inspecionar e separar peças reprovadas",
              "Organizar e identificar por OT/pedido",
              "Registrar quantidade e falhas",
              "Concluir a OT e liberar ao pós-impressão"
            ],
            "feedbackCerto": "Certo. Concluir vem depois de conferir e identificar.",
            "feedbackErrado": "A ordem é contar, inspecionar, organizar e identificar, registrar, e só então concluir e liberar."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "liberacao_pos",
            "pergunta": "Você tem peças de duas OTs diferentes na mesma bandeja, todas parecidas. O que faz antes de liberar?",
            "opcoes": [
              "Libera tudo junto, o pós-processo separa depois.",
              "Marca todas com o nome da OT mais antiga.",
              "Libera só uma OT e deixa a outra sem registro.",
              "Separa por OT, identifica cada grupo e confere a quantidade de cada um."
            ],
            "correta": 3,
            "feedbackCerto": "Correto. Cada OT vai separada e identificada.",
            "feedbackPorOpcao": [
              "O pós-processo não tem como saber a origem. Gera troca de peças.",
              "Isso mistura os pedidos.",
              "Uma OT sem registro fica perdida.",
              null
            ],
            "erroCriticoOpcoes": [
              0,
              1
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "liberacao_pos",
            "local": "Estação de impressão e Pós-impressão (área física)",
            "instrucao": "Prepare uma entrega simulada com peças de treino: separe por OT fictícia, identifique, conte e deixe pronta para que o pós-processo confira sem adivinhar. Confirme quando um colega ou líder conseguir conferir a quantidade e a origem só olhando."
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "Missão Produção",
        "subtitulo": "Do arquivo à liberação em uma OT simulada",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "A missão",
            "texto": "Você vai receber uma OT simulada e percorrer o fluxo do curso: identificar arquivo e versão, conferir quantidade e material, preparar o fatiamento conforme padrão, fazer o checklist da máquina, simular o início, inspecionar o resultado e decidir se libera ou trata falha."
          },
          {
            "tipo": "conteudo",
            "titulo": "Há uma inconsistência",
            "texto": "A missão inclui pelo menos uma inconsistência proposital. O objetivo é verificar se você percebe e interrompe antes de transformar dúvida em desperdício. Lembre: não saber não é erro, inventar é. Liberação prática real depende de validação do responsável."
          },
          {
            "tipo": "cenario",
            "competencia": "liberacao_pos",
            "titulo": "OT de produção com inconsistência",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "OT: 12 peças em resina, versão 3 do arquivo. No fatiador está aberto o arquivo de versão 2, com 10 peças na plataforma.",
                "opcoes": [
                  {
                    "label": "Imprimir 10 e depois fazer 2 à parte.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Versão e quantidade estão divergindo da OT. Prosseguir é usar arquivo errado."
                  },
                  {
                    "label": "Parar, não preparar nada e avisar o responsável sobre versão e quantidade.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Percebeu antes de iniciar.",
                    "proximo": "b"
                  },
                  {
                    "label": "Usar a versão 2, que é a que já está aberta.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Arquivo/versão errada é erro crítico."
                  },
                  {
                    "label": "Mudar a quantidade do arquivo para 12 e usar a versão 2.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Corrige a quantidade mas mantém o arquivo errado."
                  }
                ]
              },
              "b": {
                "cliente": "Com o arquivo correto liberado, você faz o checklist da máquina e vê resíduo endurecido no tanque.",
                "opcoes": [
                  {
                    "label": "Iniciar mesmo assim para não perder tempo.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Condição anormal exige tratar antes de iniciar."
                  },
                  {
                    "label": "Não iniciar, avisar e tratar o tanque pelo procedimento da Valente.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Isso. Condição do equipamento primeiro.",
                    "proximo": "c"
                  },
                  {
                    "label": "Limpar com o que tiver à mão e iniciar.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Improvisar pode danificar o FEP."
                  },
                  {
                    "label": "Usar Concluir na OT para sinalizar que há problema.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Concluir significa que foi realizado."
                  }
                ]
              },
              "c": {
                "cliente": "A impressão terminou: a bandeja tem 12 posições, 11 peças boas e 1 com suporte quebrado e parte faltando.",
                "opcoes": [
                  {
                    "label": "Registrar 11 boas e 1 falha com motivo, separar a peça ruim e comunicar o responsável antes de liberar.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Realidade registrada e falha tratada."
                  },
                  {
                    "label": "Registrar 12 concluídas.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Registrar o que não existe é erro crítico."
                  },
                  {
                    "label": "Liberar as 12 juntas, pois o pós-processo vai notar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Mistura peça reprovada com aprovada."
                  },
                  {
                    "label": "Descartar a peça ruim sem registro.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Sem registro a causa não é investigada."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "liberacao_pos",
            "titulo": "Missão Produção: da OT à liberação",
            "objetivo": "Percorrer o fluxo de produção em uma OT simulada, percebendo a inconsistência e decidindo com segurança.",
            "contexto": "Você recebeu uma OT simulada de peças em resina. Há pelo menos uma inconsistência proposital entre OT, arquivo, quantidade, material ou resultado. Nada é produzido de verdade e nenhum dado real é alterado.",
            "tarefas": [
              "Identifique a OT e confira arquivo, versão, quantidade e material.",
              "Descreva o que você conferiria na prévia do fatiamento, sem inventar parâmetros e remetendo ao perfil da Valente.",
              "Percorra o checklist da máquina e diga o que faria se algo estivesse anormal.",
              "Simule Iniciar, acompanhe e diga quando usaria Pausar.",
              "Inspecione o resultado apresentado, conte e registre fornada e falha com motivo.",
              "Decida se libera ou trata falha e como entregaria ao pós-impressão com identificação."
            ],
            "criterioConclusao": "Você apontou a inconsistência, interrompeu antes de gastar material, registrou a quantidade real e a falha com motivo, e só liberou o que estava aprovado. A liberação prática real depende de validação do responsável."
          }
        ]
      }
    ]
  },
  pos_impressao: {
    "id": "pos_impressao",
    "nome": "Pós-impressão e Acabamento",
    "descricao": "Aprenda a tratar, inspecionar e entregar peças de resina e FDM com segurança, qualidade e organização.",
    "icone": "🧰",
    "versao": 1,
    "cargosPermitidos": null,
    "competencias": [
      "Organização da bancada",
      "Conferência de recebimento",
      "Segurança com resina",
      "Remoção de suportes",
      "Acabamento de superfície",
      "Qualidade e entrega"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Minha bancada",
        "subtitulo": "Ferramentas, EPIs e organização do posto",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Pós-impressão: o que acontece aqui",
            "texto": "A peça sai da impressora 3D ainda bruta. Ela pode ter suportes (apoios que a seguraram durante a impressão), resíduos de resina, rebarbas, marcas de camada e pequenos defeitos. O pós-impressão transforma essa peça bruta em uma peça pronta para a Pintura. É a etapa do Kanban chamada Pós-impressão, entre Imprimindo e Pintura. Cada processo tem riscos e uma sequência própria. Você nunca usa produto, ferramenta ou equipamento sem saber para que serve e sem ter o procedimento autorizado."
          },
          {
            "tipo": "conteudo",
            "titulo": "EPI e ventilação vêm primeiro",
            "texto": "EPI significa equipamento de proteção individual. Como regra geral, ao manusear resina líquida ou ainda não curada, use luvas adequadas e proteção ocular, e trabalhe em local ventilado. Resina pode irritar a pele e os olhos, e solventes como o álcool isopropílico têm vapores e são inflamáveis. Ao lixar, a poeira exige proteção ocular e respiratória. Ao cortar suportes, uma lasca pode saltar. Quais EPIs, de que tipo e em qual etapa: o procedimento da Valente prevalece. Se faltar EPI, não comece."
          },
          {
            "tipo": "conteudo",
            "titulo": "Bancada organizada é controle de qualidade",
            "texto": "Uma bancada bagunçada mistura componentes de pedidos diferentes, perde peças pequenas, contamina áreas limpas com poeira ou resina e causa acidentes. Pense em três zonas: onde a peça entra, onde ela fica durante cada processo (limpeza, cura, lixamento) e onde ela espera para sair. Em todas, a peça continua vinculada à OT, a tarefa do Valente OS com título, instruções, checklist e quantidade. Peça sem identificação é peça que alguém vai ter de adivinhar."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "organizacao_bancada",
            "pergunta": "Marque o que é regra de uma bancada de pós-impressão segura e organizada.",
            "itens": [
              "Luvas e proteção ocular à mão antes de abrir qualquer recipiente de resina ou solvente",
              "Peças de pedidos diferentes na mesma bandeja para ganhar espaço",
              "Ventilação do ambiente verificada antes de começar",
              "Usar a ferramenta que estiver mais perto, mesmo sem saber a finalidade",
              "Cada peça identificada com a OT durante todo o processo"
            ],
            "corretos": [
              0,
              2,
              4
            ],
            "feedbackCerto": "Isso mesmo. EPI, ventilação e identificação por OT são a base do posto.",
            "feedbackErrado": "Misturar pedidos e usar ferramenta sem saber a finalidade são erros de iniciante que geram perda e acidente."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "organizacao_bancada",
            "pergunta": "Você precisa parar um lote de peças para atender o telefone. O que fazer com as peças que estão na bancada?",
            "opcoes": [
              "Deixá-las na zona do processo, identificadas com a OT, e guardar solventes e resina fechados",
              "Misturar todas numa caixa para liberar a mesa",
              "Deixar espalhadas, porque você volta em um minuto",
              "Jogar um pano por cima para proteger da poeira"
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Identificação e recipientes fechados evitam troca de peças e acidentes.",
            "feedbackPorOpcao": [
              null,
              "Misturar peças de OTs diferentes é a causa clássica de troca de componentes.",
              "Um minuto vira dez, e peças soltas se misturam ou se perdem.",
              "Pano pode contaminar a peça e não resolve a identificação."
            ],
            "erroCriticoOpcoes": [
              1
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "organizacao_bancada",
            "local": "Bancada de pós-impressão (área física)",
            "instrucao": "Com seu líder ou colega experiente, aponte na bancada onde a peça entra, onde fica em cada processo (limpeza, cura, lixamento) e onde espera para sair, e como ela permanece vinculada à OT. Confirme também onde ficam os EPIs. Só marque como feito depois de ter visto cada ponto."
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "O que estou recebendo",
        "subtitulo": "Conferir antes de trabalhar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Conte antes de tocar",
            "texto": "Antes de remover suporte ou lixar, descubra o que você está recebendo. Identifique o pedido e a OT, a quantidade e os componentes. Depois compare o que chegou com o que deveria chegar. Essa conferência leva poucos minutos e evita o pior cenário: trabalhar em metade do conjunto e só então perceber que falta o resto."
          },
          {
            "tipo": "conteudo",
            "titulo": "Um exemplo",
            "texto": "Um conjunto deveria ter corpo, base e dois acessórios. Chegou apenas o corpo. Começar o tratamento mesmo assim parece produtivo, mas você pode estar tratando uma peça de um lote errado, ou a base pode ter ficado na impressora, quebrada ou na fila de reimpressão. Descobrir a falta depois mistura os tempos de cada componente e dificulta o rastreio."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como agir",
            "texto": "Leia a OT no Valente OS: título, instruções, checklist e quantidade. Conte as peças e identifique cada componente. Se a conta não fecha, não improvise e não presuma que alguém vai trazer depois. Registre a divergência e consulte o responsável pela etapa anterior ou o seu líder. Dizer que não sabe a origem da peça não é erro. Seguir adiante sem saber é."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "conferencia_recebimento",
            "cliente": "Colega da impressão: \"Deixei o corpo do conjunto aí na sua bancada. A base e os acessórios saem mais tarde. Já pode ir tirando os suportes.\" A OT lista corpo, base e dois acessórios.",
            "opcoes": [
              {
                "label": "Começo agora pelo corpo e junto o resto quando chegar.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Pode até funcionar, mas sem confirmar o restante você não sabe se os outros componentes existem ou virão no mesmo estado."
              },
              {
                "label": "Confirmo na OT e peço para registrar que o conjunto está incompleto e quando os demais componentes chegam, antes de começar.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Você confere, deixa a divergência registrada e só então trabalha."
              },
              {
                "label": "Marco a OT como concluída para não perder o prazo.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Marcar etapa como feita sem ter feito é erro crítico."
              },
              {
                "label": "Pergunto a outro colega e faço o que ele achar melhor.",
                "correta": false,
                "erroCritico": false,
                "feedback": "A fonte da verdade é a OT e quem responde pela etapa anterior, não a opinião de terceiros."
              }
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "conferencia_recebimento",
            "instrucao": "Coloque na ordem a conferência de recebimento.",
            "itens": [
              "Identificar pedido e OT",
              "Ler quantidade e componentes esperados na OT",
              "Contar e identificar o que chegou",
              "Comparar o recebido com o esperado",
              "Se faltar ou sobrar algo, registrar e consultar antes de trabalhar"
            ],
            "feedbackCerto": "Perfeito. Primeiro saber o que deveria vir, depois checar o que veio.",
            "feedbackErrado": "A ordem é: identificar a OT, ler o esperado, contar o recebido, comparar e só então decidir."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "conferencia_recebimento",
            "local": "Valente OS > Missão/Inbox de tarefas (apenas consulta)",
            "instrucao": "Abra uma OT em modo de consulta, sem alterar nada, e anote mentalmente título, quantidade e componentes. Explique para seu líder o que você conferiria na peça física antes de iniciar. Não clique em Iniciar nem Concluir no treinamento."
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Resina: limpeza e cura",
        "subtitulo": "Lavagem, cura UV, segurança e descarte",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Por que lavar e curar",
            "texto": "A peça de resina sai da impressora coberta de resina líquida, ainda não curada. Ela precisa ser lavada para remover esse resíduo e depois curada com luz UV para completar o endurecimento do material. Peça mal lavada fica pegajosa e com acabamento ruim. Peça mal curada pode ficar frágil, deformar ou manter resina que irrita a pele. Cura demais também pode causar problemas. Por isso tempo, produto e método não são improviso."
          },
          {
            "tipo": "conteudo",
            "titulo": "Limpeza: prática geral",
            "texto": "Uma prática comum é lavar a peça em álcool isopropílico, conhecido como IPA, em recipiente próprio e fechado, e depois secar bem. Use luvas adequadas e proteção ocular e trabalhe com ventilação. O IPA é inflamável: longe de fontes de calor e faísca. Não deixe a peça de molho além do que o procedimento manda, pois isso pode prejudicar o material. Produto, tempo, número de banhos e método: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Cura UV e descarte",
            "texto": "A cura usa luz UV em equipamento próprio. Evite olhar para a luz e use a proteção indicada. Tempo e posição seguem o procedimento da Valente para cada resina, nunca palpite. Descarte: resina líquida, IPA sujo e panos ou luvas contaminados não vão para a pia, o ralo ou o lixo comum. Eles têm destino próprio, conforme o procedimento de descarte da empresa e a legislação local. Em dúvida sobre onde jogar, pergunte antes."
          },
          {
            "tipo": "ordenar",
            "competencia": "seguranca_resina",
            "instrucao": "Coloque na ordem a sequência segura de limpeza e cura de uma peça de resina.",
            "itens": [
              "Vestir luvas e proteção ocular e confirmar a ventilação",
              "Lavar a peça conforme o procedimento",
              "Secar e conferir que não há resina líquida ou pegajosa",
              "Curar conforme o procedimento",
              "Descartar líquidos e materiais contaminados no local correto"
            ],
            "feedbackCerto": "Certo. EPI antes de tudo, e descarte correto fecha o processo.",
            "feedbackErrado": "A sequência é EPI, lavagem, secagem e conferência, cura e descarte correto."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "seguranca_resina",
            "cliente": "Colega novo: \"Não lembro quanto tempo essa resina fica na cura. Coloca uns minutinhos que sempre dá certo, né?\"",
            "opcoes": [
              {
                "label": "Sim, uns minutos costumam bastar.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Inventar tempo de cura é erro crítico. Cada material tem seu procedimento."
              },
              {
                "label": "Melhor deixar bastante tempo, o excesso nunca faz mal.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Cura em excesso também pode prejudicar a peça."
              },
              {
                "label": "Vamos olhar o procedimento da Valente para essa resina ou perguntar ao responsável.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Quando falta informação, consulta-se a fonte."
              },
              {
                "label": "Pega pelo cheiro: se ainda tem cheiro, curou pouco.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Cheiro não é critério confiável de cura."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "seguranca_resina",
            "afirmacao": "Se o IPA usado na lavagem ficou sujo de resina, o certo é descartá-lo no ralo com bastante água.",
            "correta": false,
            "feedbackCerto": "Correto. Líquido contaminado tem descarte próprio, definido pelo procedimento da empresa.",
            "feedbackErrado": "Não. IPA sujo de resina não vai para o ralo. Siga o procedimento de descarte da Valente."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "seguranca_resina",
            "local": "Área de lavagem e cura (física) e procedimento da Valente",
            "instrucao": "Com seu líder, localize os EPIs, o recipiente de lavagem, o equipamento de cura e o local de descarte. Peça para ver o procedimento oficial de lavagem e cura e confirme que sabe onde estão tempos e produtos aprovados. Não manipule resina sem supervisão."
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "Remoção de suportes",
        "subtitulo": "Retirar sem quebrar detalhes",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que são suportes",
            "texto": "Suportes são pequenas hastes que seguram partes da peça no ar durante a impressão. Eles são necessários, mas ficam presos ao modelo por pontas finas, e quando saem deixam marcas. Remover é uma operação delicada: força demais arranca pedaços do modelo, e a peça perde detalhes que não voltam."
          },
          {
            "tipo": "conteudo",
            "titulo": "Onde olhar primeiro",
            "texto": "Um suporte perto de dedo, arma, penacho, orelha ou qualquer detalhe fino exige muito mais cuidado do que um suporte em uma base robusta. Antes de tocar, olhe a peça por todos os lados e marque mentalmente os pontos frágeis. Planeje a sequência: comece pelos suportes grandes em áreas fortes e deixe os delicados para depois, quando a peça já está mais livre."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como remover com segurança",
            "texto": "Use as ferramentas indicadas no procedimento, como alicate de corte fino ou lâmina, sempre cortando longe do corpo e das mãos, com proteção ocular, pois lascas saltam. Corte o suporte rente, mas sem entrar no modelo. Não puxe e não torça. Se o suporte parecer não sair sem risco, pare e consulte antes de quebrar. Se for resina, siga o procedimento da Valente sobre fazer isso antes ou depois da cura."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "remocao_suportes",
            "pergunta": "Marque os pontos que pedem mais cuidado ao remover suportes.",
            "itens": [
              "Suporte encostado em um dedo fino",
              "Suporte em uma base larga e grossa",
              "Suporte sob a ponta de um penacho",
              "Suporte na parte inferior reta da peça",
              "Suporte junto a uma espada fina"
            ],
            "corretos": [
              0,
              2,
              4
            ],
            "feedbackCerto": "Correto. Detalhes finos quebram com facilidade.",
            "feedbackErrado": "Áreas robustas aguentam mais. O risco está nos detalhes finos."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "remocao_suportes",
            "pergunta": "Um suporte está colado na ponta de um dedo e você sente que, ao puxar, o dedo vai junto. O que fazer?",
            "opcoes": [
              "Puxar mais rápido para sair de uma vez",
              "Deixar o suporte e mandar para a Pintura assim",
              "Torcer até soltar e depois colar o dedo se quebrar",
              "Parar, avaliar o ponto e consultar o responsável antes de continuar"
            ],
            "correta": 3,
            "feedbackCerto": "Correto. Consultar antes de quebrar é a regra.",
            "feedbackPorOpcao": [
              "Velocidade e força aumentam a chance de quebrar.",
              "Avançar com defeito conhecido transfere o problema para a Pintura.",
              "Torcer e colar depois é aceitar o defeito.",
              null
            ],
            "erroCriticoOpcoes": [
              1
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "remocao_suportes",
            "pergunta": "Descreva em 3 ou 4 frases como você planejaria a remoção dos suportes de uma figura com espada fina, capa e base larga. Diga por onde começa, qual EPI usa e quando para para consultar.",
            "pontosEsperados": [
              "Começa pelos suportes das áreas robustas, como a base",
              "Deixa por último os pontos frágeis, como a espada",
              "Usa proteção ocular e ferramenta indicada",
              "Para e consulta se o risco de quebrar for alto"
            ]
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "FDM: remoção e limpeza",
        "subtitulo": "Suportes, rebarbas e áreas funcionais",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Como a peça FDM chega",
            "texto": "FDM significa que a peça foi feita derretendo filamento plástico e depositando camada sobre camada. Ela pode chegar com suportes, fios soltos, respingos, bordas rebarbadas na primeira camada e marcas de camada. O objetivo do pós-processo é preparar a superfície sem alterar medidas nem detalhes funcionais."
          },
          {
            "tipo": "conteudo",
            "titulo": "Estético ou funcional",
            "texto": "Antes de corrigir, diferencie duas áreas. Área estética é o que será visto, e pode receber lixamento para ficar uniforme. Área funcional é a que cumpre uma função: encaixe, furo, pino, rosca, dobradiça. Lixar um encaixe sem entender sua função pode aumentar a folga ou impedir a montagem. Na dúvida, consulte o modelo, a ficha ou a OT."
          },
          {
            "tipo": "conteudo",
            "titulo": "Cuidados práticos",
            "texto": "Ao retirar suportes de FDM, use alicate ou lâmina com cuidado e proteção ocular. Peças plásticas podem estilhaçar. Remova os fios com ferramenta adequada, não com a mão nua. Se aquecer a superfície para alisar, siga o procedimento da Valente e cuide de ventilação. A poeira de lixamento deve ser evitada, e a peça deve ficar limpa antes de ir adiante."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "acabamento_superficie",
            "pergunta": "Uma peça FDM tem um pino de encaixe com uma rebarba na base. O que você faz primeiro?",
            "opcoes": [
              "Lixa o pino até ficar liso como o resto",
              "Identifica que é área funcional, confere na ficha ou consulta antes de mexer",
              "Corta o pino fora, pois está feio",
              "Ignora, porque FDM sempre tem rebarba"
            ],
            "correta": 1,
            "feedbackCerto": "Correto. Área funcional pede entendimento antes de correção.",
            "feedbackPorOpcao": [
              "Lixar pode mudar a medida do encaixe.",
              null,
              "Remover uma peça funcional inutiliza o conjunto.",
              "Rebarba em encaixe pode impedir a montagem, então não deve ser ignorada."
            ],
            "erroCriticoOpcoes": [
              0
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "acabamento_superficie",
            "afirmacao": "Em uma peça FDM, todas as marcas de camada devem ser lixadas até desaparecer, inclusive nas áreas de encaixe.",
            "correta": false,
            "feedbackCerto": "Correto. Áreas funcionais não se lixam sem entender a função e a tolerância.",
            "feedbackErrado": "Não. Lixar encaixes pode alterar medidas e impedir a montagem."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "acabamento_superficie",
            "local": "Peça FDM de treino na bancada",
            "instrucao": "Pegue uma peça FDM de treino com seu líder e aponte quais áreas são estéticas e quais são funcionais. Diga o que faria em cada uma e confirme com seu líder antes de qualquer corte ou lixamento."
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Lixamento e correção",
        "subtitulo": "Gradação, geometria e referência",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Lixar não é deixar tudo liso",
            "texto": "Lixar é remover marcas indesejadas, como marcas de suporte, linhas de camada e rebarbas, preservando a geometria. O alvo é preparar a peça para montagem ou pintura. Lixar demais apaga detalhes, afina paredes e muda medidas. Por isso toda correção respeita a referência do modelo e a tolerância."
          },
          {
            "tipo": "conteudo",
            "titulo": "Gradação crescente",
            "texto": "Lixas têm grãos: número menor é mais grosso, número maior é mais fino. Comece com o grão mais grosso necessário para tirar a marca e vá passando para grãos progressivamente mais finos, sem pular muito, porque cada grão apaga os riscos do anterior. Qual lixa e em qual ordem, siga o procedimento da Valente. Limpe a poeira entre as trocas, para que partículas grossas não arranhem de novo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Defeito ou detalhe",
            "texto": "Uma dobra do uniforme faz parte do modelo. Uma marca de suporte não. O operador precisa distinguir detalhe intencional de defeito comparando com a foto, a ficha e o modelo de referência. Para lixar, use proteção ocular e respiratória adequada e ventilação, pois a poeira, principalmente de resina, não deve ser inalada nem levada à pele. Em dúvida, consulte, pois material lixado não volta."
          },
          {
            "tipo": "ordenar",
            "competencia": "acabamento_superficie",
            "instrucao": "Coloque na ordem o lixamento de uma marca de suporte.",
            "itens": [
              "Colocar proteção ocular e respiratória e confirmar a ventilação",
              "Comparar com a referência para confirmar que é defeito e não detalhe",
              "Lixar a marca com o grão mais grosso necessário",
              "Passar para um grão mais fino",
              "Limpar a poeira e conferir a superfície"
            ],
            "feedbackCerto": "Certo. Referência primeiro, depois do mais grosso ao mais fino.",
            "feedbackErrado": "A lógica é EPI, confirmar o defeito, grão mais grosso, grão mais fino e limpeza."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "acabamento_superficie",
            "cliente": "Colega: \"Tem uma linha em relevo no peito dessa figura. Vou lixar tudo para ficar liso, né?\"",
            "opcoes": [
              {
                "label": "Vai, peça lisa é sempre melhor.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Liso nem sempre é correto: pode ser detalhe do modelo."
              },
              {
                "label": "Antes, vamos conferir na foto ou na ficha se aquela linha faz parte do modelo.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Referência decide o que é defeito."
              },
              {
                "label": "Lixa com um grão bem grosso para ser rápido.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Grão grosso em detalhe fino destrói o relevo."
              },
              {
                "label": "Pode lixar e a Pintura refaz o detalhe.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Avançar trabalho defeituoso transferindo para a Pintura é erro crítico."
              }
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "acabamento_superficie",
            "pergunta": "Você vai lixar uma marca de suporte perto de um detalhe de uniforme. Escreva como decidiria o que lixar, que sequência de grãos usaria e como se protegeria.",
            "pontosEsperados": [
              "Confere referência para distinguir marca de detalhe",
              "Usa gradação do mais grosso para o mais fino, conforme procedimento",
              "Usa proteção ocular e respiratória e ventilação",
              "Consulta se houver dúvida sobre tolerância"
            ]
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Montagem e encaixes",
        "subtitulo": "Testar antes de colar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Teste antes de colar",
            "texto": "Quando o processo permitir, faça um teste de encaixe sem cola antes de montar. Encaixe a peça com cuidado e sinta. Ele entra com leve resistência, sobra folga ou trava? Esse teste mostra o problema enquanto ainda dá para corrigir."
          },
          {
            "tipo": "conteudo",
            "titulo": "Encaixe difícil tem causa",
            "texto": "Se o encaixe está apertado, pode ser resíduo de resina, rebarba ou suporte esquecido. Pode ser deformação da peça, peça trocada de outro conjunto ou problema de modelagem. Forçar até entrar pode mascarar a causa e quebrar o encaixe ou a peça inteira. Uma peça quebrada por pressa é perda de material e de tempo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Sequência de ação",
            "texto": "Teste, identifique a causa, corrija se estiver autorizado e consulte quando necessário. Limpar um resíduo ou remover uma rebarba pode estar dentro da sua competência, mas alterar medida, refazer encaixe ou usar adesivo é decisão que segue o procedimento da Valente. Adesivos exigem ventilação e luvas e cuidado com os olhos. Se a causa for deformação ou modelagem, pare e consulte."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "qualidade_entrega",
            "pergunta": "Ao testar um encaixe, o pino entra pela metade e trava. O que fazer?",
            "opcoes": [
              "Dar um golpe leve para entrar de vez",
              "Lixar o pino até entrar fácil, sem medir",
              "Procurar a causa, como resíduo, rebarba ou peça trocada, e consultar se não resolver",
              "Colar assim mesmo, a cola preenche"
            ],
            "correta": 2,
            "feedbackCerto": "Correto. Descobrir a causa evita quebrar a peça.",
            "feedbackPorOpcao": [
              "Golpe pode quebrar o pino ou o furo.",
              "Lixar sem medir muda a tolerância e gera folga.",
              null,
              "Cola não corrige encaixe, só esconde o problema."
            ],
            "erroCriticoOpcoes": [
              3
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "qualidade_entrega",
            "pergunta": "Marque as possíveis causas de um encaixe que não entra.",
            "itens": [
              "Resíduo de resina no furo",
              "Peça de outro conjunto misturada",
              "Deformação da peça",
              "Falta de cola",
              "Rebarba no pino"
            ],
            "corretos": [
              0,
              1,
              2,
              4
            ],
            "feedbackCerto": "Correto. Primeiro se investiga, e cola não é a causa.",
            "feedbackErrado": "Falta de cola não impede encaixe. Resíduo, rebarba, troca e deformação sim."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "qualidade_entrega",
            "local": "Bancada de montagem (área física)",
            "instrucao": "Com um conjunto de treino e seu líder, faça o teste de encaixe sem cola, descreva em voz alta o que sentiu e qual causa suspeitaria se estivesse apertado, e diga quando consultaria. Não use cola sem autorização."
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Controle de qualidade",
        "subtitulo": "Aprovar, corrigir ou consultar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que procurar",
            "texto": "No controle de qualidade, olhe a peça com atenção e boa luz. Procure bolhas, falhas de impressão, deformações, quebras, marcas excessivas de suporte ou lixa e componentes faltantes. Compare com a referência. Faça isso antes da Pintura, porque pintura não esconde defeito: ela pode até destacá-lo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Pintura não é remendo",
            "texto": "Um braço quebrado ou uma superfície deformada precisa de decisão antes de avançar. Massa de reparo e pequenas correções podem ser feitas quando estiverem dentro da sua competência e do procedimento da Valente. Reparos estruturais, ou dúvidas sobre se o defeito é aceitável, vão para consulta. Se a massa tiver solvente ou liberar poeira ao lixar, use ventilação e EPI."
          },
          {
            "tipo": "conteudo",
            "titulo": "Três classificações",
            "texto": "Classifique cada peça em uma das três. Aprovada: sem defeito, pode avançar. Corrigível dentro da sua competência: você corrige e inspeciona de novo. Necessita consulta ou reimpressão: defeito além do que você pode decidir. Quem decide reimpressão segue o procedimento da Valente. Defeito escondido é erro; defeito comunicado é qualidade."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "qualidade_entrega",
            "cliente": "Seu líder de produção: \"Essa peça tem uma rachadura no ombro, mas a Pintura cobre. Manda logo, o prazo está apertado.\"",
            "opcoes": [
              {
                "label": "Envio e deixo a Pintura resolver.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Avançar peça com defeito estrutural é erro crítico."
              },
              {
                "label": "Explico que a rachadura é estrutural e peço a decisão sobre correção ou reimpressão antes de avançar.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Você comunica o defeito e deixa a decisão com quem é responsável."
              },
              {
                "label": "Passo massa na rachadura e envio sem avisar.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Reparo estrutural sem autorização e sem avisar é esconder defeito."
              },
              {
                "label": "Descarto a peça por conta própria.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Descarte e reimpressão seguem decisão e procedimento da empresa."
              }
            ]
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "qualidade_entrega",
            "pergunta": "Qual destas peças você classificaria como corrigível dentro da sua competência?",
            "opcoes": [
              "Pequena marca de suporte remanescente em área estética",
              "Braço quebrado ao meio, com a parte faltando",
              "Corpo deformado e empenado",
              "Conjunto sem a base"
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Uma marca simples se resolve com lixamento, seguindo o procedimento.",
            "feedbackPorOpcao": [
              null,
              "Quebra com parte faltando precisa de decisão.",
              "Deformação estrutural exige consulta ou reimpressão.",
              "Componente faltante é caso de conferência e consulta, não de lixamento."
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "qualidade_entrega",
            "pergunta": "Três peças chegam à inspeção: uma com pequena rebarba, uma com bolha grande na face e uma sem o acessório. Classifique cada uma em aprovada, corrigível ou consulta e justifique em uma frase cada.",
            "pontosEsperados": [
              "Rebarba pequena é corrigível dentro da competência",
              "Bolha grande na face precisa de consulta",
              "Sem acessório precisa de consulta e registro",
              "Nada é empurrado para a Pintura com defeito conhecido"
            ]
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Entregando para Pintura",
        "subtitulo": "Kit completo, limpo e identificado",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que a Pintura precisa receber",
            "texto": "A Pintura precisa receber a peça limpa, identificada, completa e em condição adequada. Sem resíduos, sem poeira de lixa, sem suportes esquecidos, com todos os componentes e a OT vinculada. A peça passa a ser trabalho de outro setor, e um erro seu vira retrabalho dele."
          },
          {
            "tipo": "conteudo",
            "titulo": "O custo de passar errado",
            "texto": "Entregar uma peça ainda com resíduos ou sem um acessório transfere o retrabalho para o próximo setor e pode atrasar todo o pedido. A pintura sobre superfície suja pode descascar ou ficar irregular. Um acessório que falta é descoberto tarde, quando a figura já está pintada."
          },
          {
            "tipo": "conteudo",
            "titulo": "Kit e conferência cruzada",
            "texto": "Mantenha os componentes de um pedido juntos, por exemplo em um saco ou caixa identificada com a OT. Faça a conferência cruzada: você mesmo confere o kit e outra pessoa confere de novo, de forma independente, comparando com a OT. Só depois conclua a tarefa e mova o pedido para a etapa seguinte, conforme o procedimento da Valente. Peças pequenas saem em embalagem fechada para não se perderem."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "qualidade_entrega",
            "pergunta": "Marque o que precisa estar certo antes de entregar para a Pintura.",
            "itens": [
              "Todos os componentes da OT presentes",
              "Peça sem poeira ou resíduo de resina",
              "Identificação da OT junto ao kit",
              "Suportes ainda presos para proteger a peça",
              "Defeitos conhecidos avisados, não escondidos"
            ],
            "corretos": [
              0,
              1,
              2,
              4
            ],
            "feedbackCerto": "Isso mesmo. Completa, limpa e identificada.",
            "feedbackErrado": "Suporte esquecido é retrabalho para a Pintura. O kit deve vir limpo e completo."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "qualidade_entrega",
            "pergunta": "Para quê serve a conferência cruzada na entrega do kit?",
            "opcoes": [
              "Para dividir a responsabilidade e conferir menos",
              "Para acelerar a entrega",
              "Para a Pintura não precisar conferir o recebimento",
              "Para uma segunda pessoa confirmar de forma independente que o kit bate com a OT"
            ],
            "correta": 3,
            "feedbackCerto": "Correto. Um segundo olhar independente encontra o que o primeiro não viu.",
            "feedbackPorOpcao": [
              "A responsabilidade continua sua.",
              "Conferir de novo é checagem, não pressa.",
              "A Pintura continua conferindo seu recebimento.",
              null
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "qualidade_entrega",
            "local": "Bancada de entrega (área física)",
            "instrucao": "Monte com um conjunto de treino um kit de entrega identificado com a OT e peça a um colega ou ao líder para fazer a conferência cruzada, comparando com a lista de componentes. Anote qualquer divergência encontrada."
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "Missão Pós-impressão",
        "subtitulo": "Do recebimento à entrega",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "A missão",
            "texto": "Você vai aplicar o curso inteiro em uma situação simulada: receber, conferir, tratar, inspecionar e decidir o que avança. O que mais conta é saber parar diante de um defeito, não a velocidade de empurrar tudo para a Pintura. Nenhum dado real é alterado."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como será avaliado",
            "texto": "Cada decisão tem consequência: conferir antes de trabalhar, proteger-se, respeitar a referência e comunicar defeitos. Não existe resposta que dependa de tempo, produto ou número específico da Valente. Quando faltar informação, a resposta certa é consultar o procedimento ou o responsável."
          },
          {
            "tipo": "cenario",
            "competencia": "qualidade_entrega",
            "titulo": "Pedido simulado: figura com base e 2 acessórios",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "Você recebe a OT de 3 conjuntos de resina: cada um com figura, base e dois acessórios. Na bancada chegaram 3 figuras, 3 bases e 5 acessórios. O que faz?",
                "opcoes": [
                  {
                    "label": "Começa a limpar e lixar as figuras, os acessórios sobram depois.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Trabalhar sem fechar a conta mistura tudo e esconde a falta.",
                    "proximo": "b"
                  },
                  {
                    "label": "Confere contra a OT, identifica que falta um acessório, registra e consulta antes de seguir.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Conferência antes de trabalhar.",
                    "proximo": "b"
                  },
                  {
                    "label": "Considera que 5 está perto de 6 e segue.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Presumir que está completo é erro crítico.",
                    "proximo": "b"
                  },
                  {
                    "label": "Junta as peças de outros pedidos para completar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Misturar peças de outro pedido é erro crítico.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "Na hora de lavar a resina, você nota que não tem luvas adequadas à mão e o exaustor está desligado. O que faz?",
                "opcoes": [
                  {
                    "label": "Lava rápido sem luvas e liga o exaustor depois.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Ignorar EPI e ventilação com resina e IPA é erro crítico.",
                    "proximo": "c"
                  },
                  {
                    "label": "Para, veste EPI, ventila o ambiente, segue o procedimento de lavagem e cura e descarta o IPA sujo no local correto.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Segurança antes de produção.",
                    "proximo": "c"
                  },
                  {
                    "label": "Pede a um colega para lavar sem proteção.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Expor outra pessoa é erro crítico.",
                    "proximo": "c"
                  },
                  {
                    "label": "Despeja o IPA sujo na pia no final.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Descarte tem local próprio.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "Na inspeção, uma das figuras tem uma rachadura no braço. As outras duas estão limpas. O prazo está apertado. O que faz?",
                "opcoes": [
                  {
                    "label": "Passa massa e envia as três para a Pintura sem avisar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Esconder defeito é erro crítico."
                  },
                  {
                    "label": "Envia as duas aprovadas, retém a peça rachada e comunica o defeito para decisão sobre correção ou reimpressão.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Parar diante do defeito e comunicar."
                  },
                  {
                    "label": "Envia as três; a Pintura cobre.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Pintura não esconde falha estrutural."
                  },
                  {
                    "label": "Descarta a figura por conta própria.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Quem decide é o procedimento da Valente e o responsável."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "qualidade_entrega",
            "titulo": "Missão Pós-impressão",
            "objetivo": "Mostrar que você conduz um conjunto do recebimento à entrega com segurança e qualidade, sabendo parar e consultar.",
            "contexto": "Pedido fictício: 3 conjuntos de resina, cada um com figura, base e 2 acessórios. A OT descreve a quantidade e os componentes. Um supervisor acompanha, pois prática real exige supervisão e procedimentos de segurança aprovados.",
            "tarefas": [
              "Conferir o recebido contra a OT, contando e identificando cada componente, e registrar divergências",
              "Verificar EPIs e ventilação e descrever como seria a lavagem, a cura e o descarte conforme o procedimento da Valente",
              "Planejar a remoção de suportes, apontando pontos frágeis, e a sequência de lixamento do grão mais grosso ao mais fino",
              "Fazer teste de encaixe sem cola e inspecionar defeitos, classificando cada peça como aprovada, corrigível ou consulta",
              "Montar o kit de entrega identificado com a OT e fazer a conferência cruzada, avisando qualquer defeito antes de avançar"
            ],
            "criterioConclusao": "Você conferiu na entrada, usou EPI e ventilação, não inventou tempos nem produtos, parou diante dos defeitos, comunicou e entregou um kit limpo, completo e identificado."
          }
        ]
      }
    ]
  },
  pintura: {
    "id": "pintura",
    "nome": "Pintura",
    "descricao": "Aprenda a preparar, pintar, corrigir e inspecionar miniaturas seguindo a referência numerada da Valente.",
    "icone": "🎨",
    "versao": 1,
    "cargosPermitidos": null,
    "competencias": [
      "Estação de pintura",
      "Leitura do pedido",
      "Preparação da superfície",
      "Fidelidade à cor",
      "Técnicas de pintura",
      "Inspeção e liberação"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Minha estação de pintura",
        "subtitulo": "Materiais, referências, EPI e organização",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que existe na estação",
            "texto": "A estação de pintura reúne tintas, pincéis de formatos diferentes, paleta ou godê para misturar e apoiar tinta, água ou diluente para limpar e afinar, papel absorvente, iluminação boa e, quando a Valente usa, o aerógrafo. O aerógrafo é uma pequena pistola que borrifa tinta bem fina. Cada material tem um uso. Só use tintas, diluentes e ferramentas autorizados pela Valente. Se um item não for conhecido, pergunte antes de usar."
          },
          {
            "tipo": "conteudo",
            "titulo": "A referência oficial é o pote",
            "texto": "Na Valente, cada cor tem uma referência numerada, de Cor 01 a Cor 33. O número fica na etiqueta do pote. A tela de Pintura mostra a imagem de referência e o número da cor de cada parte da peça. Telas distorcem tons, então o número do pote vale mais que a cor que você vê na tela. Pode haver três tipos de verde na prateleira: confira sempre a etiqueta, nunca o olho."
          },
          {
            "tipo": "conteudo",
            "titulo": "Por que não usar a cor parecida",
            "texto": "Usar a cor que parece a mais próxima, sem conferir o número, quebra o padrão entre peças do mesmo lote. O cliente recebe miniaturas que deveriam ser iguais e vê uma diferente. Se o pote da cor pedida acabou ou está sem etiqueta, não troque por outro: avise o responsável e siga o procedimento da Valente."
          },
          {
            "tipo": "conteudo",
            "titulo": "EPI, ventilação e organização",
            "texto": "Tintas e solventes pedem ventilação e, quando o procedimento indicar, luvas e máscara adequada. No aerógrafo e no lixamento, o cuidado com partículas e névoa é maior. Mantenha potes tampados, pincéis limpos e separados por uso, e a bancada livre. Peças aguardando pintura ficam na área indicada, as do pedido real não são mexidas durante o treino. Em dúvida sobre um material, consulte o responsável."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "preparacao_estacao",
            "pergunta": "Na tela de Pintura, a parte da peça mostra um verde, mas na prateleira há três potes de verde diferentes. Como escolher o certo?",
            "opcoes": [
              "Escolher o verde que mais se parece com o que aparece na tela",
              "Misturar os três verdes até chegar perto da imagem",
              "Usar o pote cuja etiqueta tem o mesmo número de Cor indicado na tela para aquela parte",
              "Usar o verde que você já usou em outra peça parecida"
            ],
            "correta": 2,
            "feedbackCerto": "Isso mesmo. O número é a referência; a cor na tela pode estar distorcida.",
            "feedbackPorOpcao": [
              "A tela distorce tons. Compare números, não impressões.",
              "Misturar sem receita oficial quebra o padrão do lote.",
              null,
              "A memória não substitui o número indicado para este pedido."
            ],
            "erroCriticoOpcoes": [
              3
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "preparacao_estacao",
            "pergunta": "Quais itens fazem parte de uma estação de pintura organizada e segura?",
            "itens": [
              "Potes tampados e com etiqueta de Cor legível",
              "Ventilação adequada e EPI conforme o procedimento",
              "Peça de pedido real usada para testar pincel",
              "Pincéis limpos, separados por uso",
              "Pote sem etiqueta usado por parecer a cor certa"
            ],
            "corretos": [
              0,
              1,
              3
            ],
            "feedbackCerto": "Correto. Etiqueta legível, ventilação e pincéis limpos protegem você e o padrão.",
            "feedbackErrado": "Peça de pedido real não é lugar de teste, e pote sem etiqueta não é referência confiável."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "preparacao_estacao",
            "local": "Tela de Pintura e prateleira de tintas",
            "instrucao": "Sem alterar nenhum trabalho real, abra a tela de Pintura, veja a imagem de referência e o número de Cor de uma parte, e localize na prateleira o pote com esse número. Localize também a área de peças aguardando pintura. Confirme que fez a consulta."
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "Entendendo o que vou pintar",
        "subtitulo": "Pedido, OT, referência e versão correta",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Pintura começa na leitura",
            "texto": "Antes de abrir qualquer tinta, entenda o trabalho. Consulte o pedido no Kanban, na etapa Pintura, e a tarefa (OT) na Missão ou Inbox de tarefas. A OT tem título, instruções, checklist e quantidade. Veja também a imagem de referência e o número de Cor de cada parte, os componentes da peça e as observações do pedido."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quem decide é a referência",
            "texto": "Uma figura pode ter versões diferentes: outro uniforme, outro tom, acessório a mais ou a menos. A memória do pintor não substitui a referência do pedido. Mesmo que você já tenha pintado aquele modelo cem vezes, confirme qual versão está na sua frente e qual foi pedida."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como agir",
            "texto": "Antes de abrir tinta, confirme: a versão da peça, a quantidade, as cores por parte e as observações. Se algo estiver faltando ou contraditório, não adivinhe. Não saber é normal; inventar é erro. Consulte a ficha, a OT e, se ainda restar dúvida, o responsável. Só então comece."
          },
          {
            "tipo": "ordenar",
            "competencia": "leitura_pedido",
            "instrucao": "Coloque na ordem em que você deve conferir o trabalho antes de abrir qualquer tinta.",
            "itens": [
              "Abrir a OT e ler título, instruções e quantidade",
              "Ver a imagem de referência e o número de Cor de cada parte",
              "Comparar a peça em mãos com a versão pedida",
              "Registrar dúvidas e consultar o responsável se algo não bater",
              "Só então separar os potes e começar"
            ],
            "feedbackCerto": "Isso mesmo: primeiro entender, depois executar.",
            "feedbackErrado": "A leitura vem antes da tinta. Releia a aula: OT, referência, comparação, dúvidas e só então começar."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "leitura_pedido",
            "pergunta": "Você pintou uma figura de guerreiro ontem, e hoje chega outro pedido do mesmo modelo. Qual atitude evita erro?",
            "opcoes": [
              "Conferir a referência e as observações do novo pedido, pois a versão pode ser diferente",
              "Repetir as cores de ontem, que você lembra bem",
              "Perguntar ao colega ao lado qual cor ele usaria",
              "Começar e conferir só ao terminar"
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Cada pedido tem sua referência, e a versão pode mudar.",
            "feedbackPorOpcao": [
              null,
              "A memória não substitui a referência do pedido.",
              "A fonte é o pedido e a referência, não a opinião de um colega.",
              "Descobrir o erro no fim obriga a refazer o trabalho todo."
            ],
            "erroCriticoOpcoes": [
              1
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "leitura_pedido",
            "pergunta": "Abra, só para consulta, a OT ou pedido em Pintura que o supervisor indicar e descreva: qual a versão, a quantidade, quais Cores aparecem e se há observação especial.",
            "pontosEsperados": [
              "Versão da peça identificada",
              "Quantidade conferida",
              "Números de Cor por parte citados",
              "Observações do pedido lidas ou registro de que não há"
            ]
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Preparação da superfície",
        "subtitulo": "Limpeza, defeitos e primer",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Tinta não corrige superfície ruim",
            "texto": "A tinta mostra o que está embaixo. Resíduo de resina, oleosidade dos dedos, pó de lixamento, marcas de suporte e linhas de camada aparecem mais depois de pintar. Pintar sobre resíduo ou defeito torna a correção mais difícil depois. Antes de tudo, olhe a peça sob luz boa e passe os dedos com cuidado para sentir áreas ásperas ou pegajosas."
          },
          {
            "tipo": "conteudo",
            "titulo": "Limpeza e defeitos",
            "texto": "A limpeza remove pó e gordura, conforme o procedimento da Valente. Procure marcas de suporte, rebarbas, bolhas, superfície pegajosa e partes quebradas. Pequenas rebarbas podem ser tratadas se isso fizer parte do seu processo, usando EPI e ventilação ao lixar. Se o defeito vem da impressão ou do pós-impressão, não esconda: separe a peça e trate conforme o fluxo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Primer: para que serve",
            "texto": "Primer é uma tinta de base. Ele ajuda a tinta seguinte a aderir e deixa a cor da peça uniforme. Passe em camada fina, para não apagar detalhes. Marca, tipo e momento de usar seguem o processo adotado pela Valente, e nem toda peça usa primer. Consulte o procedimento ou o responsável. Aplique com ventilação e EPI, longe de peças já prontas."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "preparacao_superficie",
            "cliente": "Colega: Essa peça está com marca de suporte bem visível no ombro. Passa uma camada grossa de primer que esconde, o prazo está apertado.",
            "opcoes": [
              {
                "label": "Concordo, camada grossa cobre a marca e ganhamos tempo",
                "correta": false,
                "erroCritico": true,
                "feedback": "Primer grosso apaga detalhe e não elimina a marca. Esconder defeito é erro crítico."
              },
              {
                "label": "Vou separar a peça e tratar a marca conforme o fluxo, ou consultar o responsável, antes de pintar",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Defeito de etapa anterior é separado e tratado, não escondido."
              },
              {
                "label": "Passo primer, pinto e vejo se o cliente reclama",
                "correta": false,
                "erroCritico": true,
                "feedback": "Avançar peça defeituosa transfere o problema para o cliente."
              },
              {
                "label": "Pinto direto com a tinta final, que é mais espessa",
                "correta": false,
                "erroCritico": false,
                "feedback": "Tinta espessa também não corrige marca e piora a perda de detalhe."
              }
            ]
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "preparacao_superficie",
            "pergunta": "Qual é a função do primer, de forma geral?",
            "opcoes": [
              "Esconder defeitos da impressão",
              "Substituir a camada de cor final",
              "Tornar desnecessária a limpeza",
              "Ajudar a tinta a aderir e uniformizar a base da peça"
            ],
            "correta": 3,
            "feedbackCerto": "Correto, em camada fina e seguindo o processo da Valente.",
            "feedbackPorOpcao": [
              "Primer não conserta defeito, e camada grossa apaga detalhe.",
              "Ele é base, não cor final.",
              "Sem limpeza o primer adere mal.",
              null
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "preparacao_superficie",
            "local": "Peça de treino na bancada",
            "instrucao": "Com uma peça de treino, inspecione sob luz boa: procure resíduo, marcas de suporte, rebarbas e áreas pegajosas. Anote o que encontrou e o que faria. Não mexa em peças de pedidos reais."
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "Cor e referência",
        "subtitulo": "Padrão, iluminação e consistência no lote",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Comparar sempre",
            "texto": "A cor da peça deve ser comparada com a referência e com o padrão do lote. Iluminação, base e número de camadas mudam a percepção da cor. Uma tinta pode parecer mais clara no pote e mais escura seca. Compare com a mesma luz, sempre que possível luz neutra e boa, e com a referência ao lado."
          },
          {
            "tipo": "conteudo",
            "titulo": "Número de Cor, não gosto pessoal",
            "texto": "Quando o pedido especifica a cor, não improvise outra porque fica bonita. Use o pote com o número de Cor indicado. Receitas, misturas e paletas oficiais seguem o procedimento definido pela Valente: se for preciso misturar ou ajustar, consulte o responsável e não crie receita própria."
          },
          {
            "tipo": "conteudo",
            "titulo": "Consistência do lote",
            "texto": "Duas miniaturas do mesmo lote com uniformes visualmente diferentes parecem erro ao cliente, mesmo que cada uma isoladamente esteja bem pintada. Por isso pinte a mesma cor em todas as peças de uma vez, use o mesmo pote, sem diluir diferente entre peças, e compare as peças lado a lado ao longo do trabalho."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "fidelidade_cor",
            "pergunta": "Quais fatores podem fazer a mesma tinta parecer outra cor?",
            "itens": [
              "Luz diferente no local de comparação",
              "Cor da base ou do primer por baixo",
              "Número de camadas aplicadas",
              "Nome do pincel usado",
              "Telas que distorcem tons"
            ],
            "corretos": [
              0,
              1,
              2,
              4
            ],
            "feedbackCerto": "Correto. Luz, base, camadas e telas alteram a percepção; o número do pote é a referência.",
            "feedbackErrado": "O nome do pincel não muda a cor. Luz, base, camadas e tela mudam."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "fidelidade_cor",
            "pergunta": "No lote de 6 miniaturas, a Cor indicada está no fim e você pintou 4 peças. As 2 últimas parecem um pouco mais escuras. O que fazer?",
            "opcoes": [
              "Seguir assim, é pouca diferença",
              "Comparar as 6 lado a lado, conferir se o pote e a diluição são os mesmos e consultar o responsável se a diferença persistir",
              "Clarear as 2 com outra tinta que parece combinar",
              "Repintar as 4 primeiras com o que sobrou do pote"
            ],
            "correta": 1,
            "feedbackCerto": "Correto. Comparar o conjunto e investigar a causa mantém o padrão do lote.",
            "feedbackPorOpcao": [
              "Em lote, diferença pequena já parece erro ao cliente.",
              null,
              "Improvisar outra cor quebra o padrão e a referência.",
              "Sem investigar a causa, você pode aumentar a diferença."
            ],
            "erroCriticoOpcoes": [
              2
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "fidelidade_cor",
            "local": "Tela de Pintura",
            "instrucao": "Na tela de Pintura, observe a imagem de referência e o número de Cor de cada parte de uma peça. Localize os potes e confirme os números nas etiquetas. Veja se a cor na tela e a do pote diferem. Apenas consulta."
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "Ordem de pintura",
        "subtitulo": "Base, sombras, luzes e detalhes",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Planejar a sequência",
            "texto": "Planejar a ordem reduz retrabalho e contaminação, que é tinta indo onde não deve. Observe a peça e defina a sequência antes de começar. Pintar um detalhe delicado cedo demais pode obrigar a refazê-lo quando as áreas vizinhas forem trabalhadas."
          },
          {
            "tipo": "conteudo",
            "titulo": "A ordem geral",
            "texto": "De modo geral: primeiro a base, que são as cores principais das áreas grandes. Depois as sombras, que escurecem reentrâncias e dão profundidade. Depois as luzes, que clareiam as áreas altas. Por último os detalhes, como olhos, distintivos e pequenos acessórios, e aplicações como decalques. A proteção final só entra se o processo Valente previr. Siga o procedimento da Valente."
          },
          {
            "tipo": "conteudo",
            "titulo": "Em lote e com cuidado",
            "texto": "Em lotes, busque consistência: faça a mesma etapa em todas as peças antes de passar à próxima. Espere cada camada secar antes de trabalhar a vizinha, para não manchar. Se uma peça tem áreas que se tocam, pense em qual cor vem primeiro para ficar mais fácil acertar a borda."
          },
          {
            "tipo": "ordenar",
            "competencia": "leitura_pedido",
            "instrucao": "Ordene as etapas de pintura de uma figura, da primeira para a última.",
            "itens": [
              "Base: cores principais nas áreas grandes",
              "Sombras nas reentrâncias",
              "Luzes nas áreas altas",
              "Detalhes: olhos, distintivos e pequenos itens"
            ],
            "feedbackCerto": "Isso mesmo: base, sombras, luzes e detalhes.",
            "feedbackErrado": "A ordem geral começa pela base e deixa os detalhes por último."
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "tecnica_pintura",
            "afirmacao": "Em um lote de 10 miniaturas, o melhor para manter o padrão é terminar uma peça completa antes de começar a outra.",
            "correta": false,
            "feedbackCerto": "Correto. Fazer a mesma etapa em todas as peças ajuda a manter a consistência.",
            "feedbackErrado": "Falso. Em lote, a mesma etapa é feita em todas as peças antes de seguir, favorecendo o padrão."
          },
          {
            "tipo": "texto_livre",
            "competencia": "leitura_pedido",
            "pergunta": "Observe uma peça de treino e descreva a sequência de pintura que você planeja: quais áreas vêm primeiro, onde ficam os detalhes e por quê.",
            "pontosEsperados": [
              "Base nas áreas grandes primeiro",
              "Sombras e luzes antes dos detalhes",
              "Detalhes delicados por último",
              "Cuidado com secagem entre áreas vizinhas"
            ]
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Técnicas básicas",
        "subtitulo": "Camadas finas, pincel seco e lavagem",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Camadas finas",
            "texto": "Cobertura uniforme costuma vir de várias camadas finas, e não de uma camada grossa. Tinta insuficiente deixa cobertura irregular, e camada grossa apaga detalhe. Retire o excesso do pincel no papel absorvente e deixe secar entre as camadas. Tintas muito espessas podem ser afinadas, conforme o procedimento da Valente, para não deixar marcas de pincel."
          },
          {
            "tipo": "conteudo",
            "titulo": "Pincel seco e lavagem",
            "texto": "Pincel seco é quando você tira quase toda a tinta do pincel no papel e passa de leve nas áreas em relevo, deixando as luzes nas bordas. Lavagem é uma tinta bem diluída que escorre para as reentrâncias e cria sombra. Ambas dependem de controle de quantidade de tinta, e o resultado é visto aos poucos."
          },
          {
            "tipo": "conteudo",
            "titulo": "Pincel ou aerógrafo",
            "texto": "O pincel dá controle para detalhes. O aerógrafo cobre áreas maiores de forma uniforme, mas exige ventilação, máscara adequada, limpeza e treino. Nem toda peça usa aerógrafo. As técnicas reais adotadas pela Valente são demonstradas na prática supervisionada: treine em peça de treino antes de qualquer pedido real."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "tecnica_pintura",
            "pergunta": "A tinta do pote está espessa e a peça tem detalhes finos no rosto. O que fazer?",
            "opcoes": [
              "Aplicar uma camada grossa para terminar rápido",
              "Adicionar água sem limite até ficar bem líquida",
              "Aplicar camadas finas, com controle de tinta no pincel, e secar entre camadas, seguindo o procedimento da Valente",
              "Passar a segunda camada com a primeira ainda úmida"
            ],
            "correta": 2,
            "feedbackCerto": "Correto. Camadas finas preservam o detalhe.",
            "feedbackPorOpcao": [
              "Camada grossa apaga detalhe e escorre.",
              "Tinta líquida demais cobre mal e escorre. Siga o procedimento.",
              null,
              "Tinta úmida sobre úmida mancha e arrasta a camada de baixo."
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "tecnica_pintura",
            "afirmacao": "Pincel seco é usado para realçar as áreas em relevo, com pouca tinta no pincel.",
            "correta": true,
            "feedbackCerto": "Correto. Pouca tinta e movimento leve realçam as bordas.",
            "feedbackErrado": "Verdadeiro. Pincel seco usa pouca tinta e realça relevo."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "tecnica_pintura",
            "local": "Bancada de treino com supervisor",
            "instrucao": "Em prática supervisionada, em peça de treino, repita duas camadas finas e um pincel seco. Aguarde a validação do supervisor antes de qualquer pedido real. Confirme depois que realizou."
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Detalhes e aplicações",
        "subtitulo": "Olhos, distintivos, decalques e DTF",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Detalhes pedem referência",
            "texto": "Olhos, distintivos, decalques, DTF e pequenos detalhes exigem alinhamento, referência e sequência. Nem todo produto usa todas essas técnicas: veja na OT quais valem. Um distintivo bonito, mas pertencente a outra versão, é erro. Antes de aplicar, confira identidade e posição na referência."
          },
          {
            "tipo": "conteudo",
            "titulo": "Decalque em passos",
            "texto": "Decalque é uma película com desenho transferida para a peça. Em geral: recortar perto do desenho, molhar o suficiente, deslizar para a posição, ajustar com pincel macio, retirar o excesso de água com cuidado e deixar secar. A superfície deve estar lisa e limpa. Um decalque correto aplicado torto continua sendo um defeito, por isso teste a posição antes de fixar."
          },
          {
            "tipo": "conteudo",
            "titulo": "DTF e olhos",
            "texto": "DTF é um transfer impresso que também é aplicado com procedimento próprio, que a Valente define. Siga o treinamento ou consulte o responsável. Olhos pedem mão firme, ponto mínimo de tinta e simetria entre os dois lados. Faça por último, depois das áreas vizinhas, e compare os dois olhos antes de secar."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "inspecao_liberacao",
            "cliente": "Colega: Terminei o decalque do distintivo, mas ficou um pouco torto e já secou. Vamos deixar assim, ninguém vai notar.",
            "opcoes": [
              {
                "label": "Sim, está seco, vamos seguir",
                "correta": false,
                "erroCritico": true,
                "feedback": "Torto continua sendo defeito, e esconder falha é erro crítico."
              },
              {
                "label": "Confiro com a referência, classifico o defeito e consulto o responsável sobre como corrigir",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Comparar, classificar e consultar é o caminho."
              },
              {
                "label": "Raspo o decalque com lixa forte",
                "correta": false,
                "erroCritico": false,
                "feedback": "Lixar forte pode danificar a pintura e a peça."
              },
              {
                "label": "Cubro com tinta por cima e refaço outro",
                "correta": false,
                "erroCritico": true,
                "feedback": "Camadas aleatórias acumulam problema e não resolvem a posição."
              }
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "tecnica_pintura",
            "instrucao": "Ordene os passos para aplicar um decalque.",
            "itens": [
              "Conferir na referência identidade e posição",
              "Recortar o decalque perto do desenho",
              "Molhar o suficiente e deslizar para a posição",
              "Ajustar com pincel macio e retirar o excesso de água",
              "Deixar secar sem mexer"
            ],
            "feedbackCerto": "Isso mesmo.",
            "feedbackErrado": "Revise: confira, recorte, molhe e deslize, ajuste e deixe secar."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "inspecao_liberacao",
            "local": "Peça de treino ou referência da OT",
            "instrucao": "Em peça de treino, simule o posicionamento de um decalque ou detalhe sem fixar: confira identidade e posição na referência. Se a peça for real, apenas observe. Confirme."
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Erros e correções",
        "subtitulo": "Reconhecer, classificar e agir",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Erros comuns",
            "texto": "Os erros mais comuns: excesso de tinta, que forma grumos; mancha; escorrimento, quando a tinta desce e forma gota; cobertura ruim, com a cor de baixo aparecendo; diferença de tonalidade entre peças; e falha de detalhe, como olho borrado. Reconhecer cedo facilita a correção."
          },
          {
            "tipo": "conteudo",
            "titulo": "Corrigir com método",
            "texto": "Tentar esconder mancha com mais tinta pode apagar textura e ampliar o problema. Se a tinta ainda está úmida, retire com cuidado com pincel ou cotonete. Se secou, espere, lixe de leve se o procedimento permitir e repinte em camada fina. Evite acumular camadas aleatórias."
          },
          {
            "tipo": "conteudo",
            "titulo": "Classifique antes de agir",
            "texto": "Pergunte: posso corrigir com procedimento conhecido? Preciso consultar? Ou a peça precisa retornar a uma etapa anterior, como pós-impressão? Peça com defeito de impressão não se resolve com tinta. Em caso de dúvida, consulte o responsável e registre o que aconteceu."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "tecnica_pintura",
            "pergunta": "Quais situações exigem consultar o responsável ou devolver a peça a outra etapa?",
            "itens": [
              "Defeito de impressão visível que a tinta não resolve",
              "Mancha pequena em tinta úmida que você sabe retirar",
              "Diferença de tonalidade entre peças do lote sem causa clara",
              "Cor errada aplicada e dúvida sobre como remover",
              "Escorrimento que você já corrige com o método ensinado"
            ],
            "corretos": [
              0,
              2,
              3
            ],
            "feedbackCerto": "Correto. Quando não há procedimento conhecido ou o defeito vem de etapa anterior, consulte ou devolva.",
            "feedbackErrado": "Mancha úmida e escorrimento com método ensinado você corrige. O restante exige consulta ou retorno."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "inspecao_liberacao",
            "pergunta": "Uma peça seca com um escorrimento no braço. Qual é o caminho correto?",
            "opcoes": [
              "Passar mais tinta por cima para nivelar",
              "Deixar assim e colocar a peça entre as aprovadas",
              "Lixar forte até remover toda a tinta do braço",
              "Esperar secar, tratar o ponto com o método ensinado e repintar em camada fina, ou consultar se não souber"
            ],
            "correta": 3,
            "feedbackCerto": "Correto. Corrigir com método preserva a textura.",
            "feedbackPorOpcao": [
              "Mais tinta amplia o problema.",
              "Avançar peça com defeito é erro crítico.",
              "Lixar forte pode apagar detalhe e danificar.",
              null
            ],
            "erroCriticoOpcoes": [
              1
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "inspecao_liberacao",
            "pergunta": "Pense em um erro possível (mancha, escorrimento ou cobertura ruim) e classifique: você corrige, consulta ou devolve a peça? Explique o motivo.",
            "pontosEsperados": [
              "Erro nomeado",
              "Classificação entre corrigir, consultar ou devolver",
              "Motivo coerente com o procedimento",
              "Menção de não acumular camadas aleatórias"
            ]
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Inspeção e liberação",
        "subtitulo": "Conferir o conjunto antes de liberar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Terminar não é liberar",
            "texto": "Terminar de pintar não significa liberar. Compare referência, pedido, padrão, quantidade e acabamento. Olhe a peça de todos os lados, sob boa luz e a distância normal e de perto. Verifique bordas, olhos, decalques, cobertura e marcas de dedo."
          },
          {
            "tipo": "conteudo",
            "titulo": "O conjunto importa",
            "texto": "Em lote, uma unidade pode estar ótima e ainda assim destoar das demais. Coloque todas lado a lado e compare tonalidades e detalhes. Confira a quantidade com a OT. Se uma peça destoa, separe-a para correção, não deixe passar."
          },
          {
            "tipo": "conteudo",
            "titulo": "Separar e registrar",
            "texto": "Use um checklist visual e mantenha peças aprovadas separadas das que precisam de correção, em lugares claros. Seguir para a próxima etapa do Kanban, Preparar p/ envio, é feito conforme o procedimento da Valente. Se um padrão visual exige validação, o responsável valida. Em dúvida, consulte."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "inspecao_liberacao",
            "cliente": "Líder: Seu lote de 8 está pronto? O cliente espera hoje.",
            "opcoes": [
              {
                "label": "Está pronto, todas ficaram boas pelo que vi da última",
                "correta": false,
                "erroCritico": true,
                "feedback": "Avaliar só a última peça ignora o conjunto."
              },
              {
                "label": "Ainda estou comparando as 8 lado a lado com a referência e a OT. Há uma que destoa, separei para correção",
                "correta": true,
                "erroCritico": false,
                "feedback": "Correto. Comparar o conjunto e separar a que destoa."
              },
              {
                "label": "Posso liberar as 8 e corrigir depois se reclamarem",
                "correta": false,
                "erroCritico": true,
                "feedback": "Liberar peça com defeito é erro crítico."
              },
              {
                "label": "Conto só a quantidade; se for 8, está liberado",
                "correta": false,
                "erroCritico": false,
                "feedback": "Quantidade é só um item do checklist."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "inspecao_liberacao",
            "afirmacao": "Se uma peça do lote está bem pintada isoladamente, ela pode ser liberada mesmo que destoe das outras.",
            "correta": false,
            "feedbackCerto": "Correto. O cliente enxerga o conjunto.",
            "feedbackErrado": "Falso. Em lote, uma peça que destoa parece erro, mesmo bem pintada."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "inspecao_liberacao",
            "local": "Bancada de inspeção",
            "instrucao": "Com peças de treino, faça uma inspeção usando o checklist visual: referência, quantidade, acabamento, conjunto. Separe aprovadas e a corrigir. Confirme que fez."
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "Missão Pintura",
        "subtitulo": "Do pedido à liberação",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O fluxo da pintura",
            "texto": "Você recebe uma peça de treino, a referência e uma OT simulada. O fluxo: ler pedido e referência, conferir Cor 01 a 33 pelo pote, preparar a superfície, planejar a ordem base, sombras, luzes e detalhes, aplicar técnicas básicas, fazer detalhes e decalques, corrigir com método e inspecionar o conjunto."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como será avaliado",
            "texto": "A avaliação considera preparação, fidelidade à referência, organização, correção de erros e conferência final. Somente o supervisor pode validar competências práticas que exigem padrão visual ou técnico. Este treinamento não altera dados reais do sistema."
          },
          {
            "tipo": "checklist",
            "titulo": "Checklist da missão",
            "itens": [
              "OT e referência lidas",
              "Número de Cor conferido no pote",
              "Superfície inspecionada",
              "Sequência de pintura planejada",
              "Camadas finas aplicadas",
              "Detalhes conferidos",
              "Inspeção final do conjunto"
            ]
          },
          {
            "tipo": "cenario",
            "competencia": "inspecao_liberacao",
            "titulo": "Lote de 4 soldados",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "OT simulada: pintar 4 soldados, uniforme conforme a referência. Você abre a OT e a tela de Pintura. A referência mostra um verde e na prateleira existem três potes de verde. O que faz primeiro?",
                "opcoes": [
                  {
                    "label": "Confiro o número de Cor da referência e uso o pote com a mesma etiqueta",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. O número do pote é a fonte da verdade.",
                    "proximo": "b"
                  },
                  {
                    "label": "Uso o verde que parece mais próximo na tela",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Telas distorcem tons. Usar cor parecida quebra o padrão.",
                    "proximo": "b"
                  },
                  {
                    "label": "Mistura dois verdes até ficar parecido",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Mistura sem receita oficial é improviso.",
                    "proximo": "b"
                  },
                  {
                    "label": "Começo a pintar e confiro depois",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Conferir depois pode obrigar a refazer tudo.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "Ao inspecionar as peças antes de pintar, você vê uma marca de suporte e uma superfície pegajosa em um soldado. O que faz?",
                "opcoes": [
                  {
                    "label": "Passo primer grosso para esconder",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Esconder defeito é erro crítico.",
                    "proximo": "c"
                  },
                  {
                    "label": "Separo essa peça e trato conforme o fluxo ou consulto o responsável, e sigo com as demais",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Defeito de etapa anterior é separado e tratado.",
                    "proximo": "c"
                  },
                  {
                    "label": "Pinto assim mesmo, a tinta resolve",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Tinta não corrige superfície ruim.",
                    "proximo": "c"
                  },
                  {
                    "label": "Descarto a peça sem avisar ninguém",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Qualquer decisão sobre a peça deve ser comunicada e seguir o fluxo.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "Você pintou os 4 soldados. Um deles está com um escorrimento seco no braço e o tom parece mais escuro. Como liberar?",
                "opcoes": [
                  {
                    "label": "Libero os 4, o erro é pequeno",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Liberar peça com defeito é erro crítico."
                  },
                  {
                    "label": "Passo mais tinta sobre o escorrimento",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Camadas aleatórias ampliam o problema."
                  },
                  {
                    "label": "Comparo os 4 lado a lado com a referência e a OT, separo o que destoa, corrijo com método ou consulto, e libero só as aprovadas",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Conjunto, método e separação."
                  },
                  {
                    "label": "Refaço as 4 peças do zero sem avisar",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Refazer tudo sem consultar desperdiça trabalho."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "inspecao_liberacao",
            "titulo": "Missão Pintura",
            "objetivo": "Executar o fluxo completo de pintura em uma peça de treino e decidir se ela está pronta para seguir.",
            "contexto": "Você recebeu uma peça de treino, uma imagem de referência e uma OT simulada de 1 unidade, com 3 cores e um detalhe. Nenhum dado real deve ser alterado.",
            "tarefas": [
              "Ler a OT e a referência e anotar versão, quantidade e números de Cor",
              "Localizar os potes pelos números de etiqueta",
              "Inspecionar e preparar a superfície",
              "Planejar e anotar a sequência: base, sombras, luzes e detalhes",
              "Executar a pintura autorizada em camadas finas, com supervisor",
              "Inspecionar a peça e decidir: liberar, corrigir ou devolver"
            ],
            "criterioConclusao": "O supervisor valida a prática: preparação, fidelidade à referência, organização, correção de erros e conferência final."
          }
        ]
      }
    ]
  },
  expedicao: {
    "id": "expedicao",
    "nome": "Preparação, Embalagem e Expedição",
    "descricao": "Aprenda a conferir, embalar, identificar e despachar pedidos com segurança, registrando o envio no Valente OS.",
    "icone": "📦",
    "versao": 1,
    "cargosPermitidos": null,
    "competencias": [
      "Conferência do pedido",
      "Conferência final",
      "Embalagem e proteção",
      "Identificação do pacote",
      "Dados de envio",
      "Despacho e Kanban"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Minha estação de expedição",
        "subtitulo": "Conheça o lugar e o papel da última conferência",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Expedição é a última barreira",
            "texto": "Expedição não é só colocar a peça em uma caixa. É a última barreira interna antes de o produto chegar ao cliente. Tudo o que foi feito antes, como modelagem, impressão, pós-impressão e pintura, só vale para o cliente se a peça certa, inteira e bem protegida chegar até ele. Se algo errado passar por você, o próximo a descobrir será o cliente."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que existe na sua estação",
            "texto": "Sua estação reúne alguns elementos. Materiais de embalagem, como caixas, proteção interna e fita. Etiquetas e identificação. O sistema, ou seja, o Valente OS no tablet, onde você consulta o pedido e a tarefa de Expedição. Ferramentas básicas, como tesoura ou estilete, que exigem cuidado ao cortar. E uma área de conferência, uma bancada limpa e organizada onde você compara o que recebeu com o que o pedido diz. Os materiais e padrões aprovados são os definidos pela Valente."
          },
          {
            "tipo": "conteudo",
            "titulo": "Um exemplo para guardar",
            "texto": "Uma embalagem bonita com produto errado continua sendo uma falha grave. O cliente não avalia a caixa se abrir e encontrar a miniatura trocada, faltando um acessório ou quebrada. Por isso, sua primeira pergunta nunca é como embalar. É: o que eu estou recebendo e está tudo certo? Manter a bancada organizada, com um pedido de cada vez, ajuda a evitar mistura entre pedidos."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "conferencia_final",
            "pergunta": "Um pedido chega à expedição, e a miniatura dentro da caixa de transporte pronta é de outra versão do que consta no pedido. Como isso deve ser tratado?",
            "opcoes": [
              "É falha leve, pois a caixa está bonita e bem fechada e o cliente pode trocar depois",
              "É falha de quem embalou, então basta refazer a caixa mantendo a peça",
              "É uma falha grave, mesmo com a embalagem perfeita; deve ser parado e levado ao responsável",
              "Depende do cliente: se ele não perceber, o envio segue normalmente"
            ],
            "correta": 2,
            "feedbackCerto": "Isso mesmo. Embalagem bonita com produto errado é falha grave, e você é a última barreira interna.",
            "feedbackPorOpcao": [
              "Embalagem bonita não compensa produto errado. O erro chegaria ao cliente.",
              "Refazer a caixa não resolve: o problema é a peça, não a embalagem.",
              null,
              "Contar com o cliente não perceber é esconder o defeito, e isso não é aceitável."
            ],
            "erroCriticoOpcoes": [
              0,
              3
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "conferencia_pedido",
            "local": "Valente OS (tablet) > aba Pedidos (Kanban), coluna Preparar p/ envio, e a área de conferência da expedição",
            "instrucao": "Sem alterar nenhum dado, abra a aba Pedidos e localize a coluna Preparar p/ envio. Escolha um pedido apenas para consultar. Depois, caminhe até a estação e identifique onde ficam os materiais de embalagem, as etiquetas e a área de conferência. Marque como feito quando souber onde está cada um."
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "O que estou recebendo",
        "subtitulo": "Antes de embalar, consulte e compare",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Consulte antes de abrir",
            "texto": "Antes de embalar qualquer coisa, consulte o pedido no Valente OS e na tarefa de Expedição. Veja o cliente, a quantidade de peças, os componentes ou acessórios, o acabamento pedido e as observações. As observações costumam guardar detalhes importantes, como um pedido para tratar a peça de forma especial. Se uma informação não estiver clara, não complete por suposição: consulte a ficha ou o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Compare o físico com o registro",
            "texto": "Depois de ler o registro, olhe o que chegou fisicamente à bancada e compare item a item. Registro e realidade precisam bater. Um pedido de duas peças com acessórios não pode ser conferido contando apenas duas caixas, porque as caixas podem estar certas e um acessório faltando. Conte conteúdo, não volume."
          },
          {
            "tipo": "conteudo",
            "titulo": "Checklist por conteúdo",
            "texto": "O jeito mais seguro é montar uma lista pelo conteúdo esperado. Por exemplo: peça A, peça B, acessório da peça A, base, observação especial. Marque cada item à medida que o vê com seus olhos. Itens que você presume que estão lá, sem ver, não contam como conferidos. Se algo não aparecer, pare e consulte o responsável, em vez de seguir esperando que apareça depois."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "conferencia_pedido",
            "pergunta": "O pedido registra duas miniaturas e um acessório para cada uma. Na bancada há duas caixas. Qual é a conferência correta?",
            "opcoes": [
              "Abrir e verificar peça por peça e acessório por acessório, comparando com o registro do pedido",
              "Contar as caixas: se são duas, o pedido está completo",
              "Confiar na etiqueta das caixas, pois quem as fechou já conferiu",
              "Embalar e conferir depois, quando o rastreio for gerado"
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Conferir por conteúdo evita que uma falta passe despercebida.",
            "feedbackPorOpcao": [
              null,
              "Contar volume não confirma conteúdo; um acessório pode estar faltando.",
              "A conferência anterior não substitui a sua; a expedição é a última barreira.",
              "Depois de despachar, uma falta já chegou ao cliente."
            ],
            "erroCriticoOpcoes": [
              2,
              3
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "conferencia_pedido",
            "local": "Valente OS (tablet) > aba Pedidos (Kanban) e o pedido na área de conferência",
            "instrucao": "Sem alterar dados, abra um pedido em Preparar p/ envio apenas para consulta. Anote mentalmente cliente, quantidade, componentes, acabamento e observações. Depois monte, em um papel ou na cabeça, um checklist por conteúdo. Marque como feito quando conseguir listar todos os itens esperados sem contar apenas caixas."
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Conferência final",
        "subtitulo": "Aprovar para embalagem é uma decisão de qualidade",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que você verifica",
            "texto": "Na conferência final, você verifica seis pontos. Produto correto, quantidade certa, versão certa, acabamento conforme pedido, integridade da peça e todos os componentes presentes. Olhe a peça com boa luz e em mãos. Procure rachaduras, partes soltas, detalhes finos quebrados, marcas de manuseio, tinta descascada e sujeira. Se for o caso, compare com a descrição do pedido."
          },
          {
            "tipo": "conteudo",
            "titulo": "Detectar antes de fechar",
            "texto": "Esta etapa existe para detectar troca, falta ou dano antes de fechar a embalagem. Depois de lacrada, a caixa esconde o problema, e o cliente o descobrirá. Se uma peça apresenta quebra, não a embale esperando que o cliente aceite. Separe a peça, não envie e acione o fluxo de correção definido pela Valente, avisando o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "Uma decisão de qualidade",
            "texto": "Aprovar para embalagem é uma decisão de qualidade, não um passo burocrático. Se você aprova, está dizendo que aquele produto pode chegar ao cliente. Se estiver em dúvida, a dúvida é um sinal para parar e consultar, não para seguir. Parar e avisar não é erro. Esconder ou ignorar um defeito é."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "conferencia_final",
            "cliente": "Colega: A miniatura tem uma rachadura na base, pequena. O prazo está apertado, vamos embalar logo, o cliente nem vai notar.",
            "opcoes": [
              {
                "label": "Concordo: é pequena, o prazo pesa mais. Embalo e sigo.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Embalar um defeito conhecido é esconder o problema. O cliente notará."
              },
              {
                "label": "Separo a peça, não embalo e aciono o fluxo de correção, avisando o responsável.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Certo. Quebra ou rachadura não segue; você separa e aciona o fluxo de correção."
              },
              {
                "label": "Embalo, mas coloco um bilhete avisando da rachadura para o cliente.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Transferir o defeito ao cliente não corrige a falha. A decisão não é sua nem é o cliente quem deve resolver."
              },
              {
                "label": "Marco a tarefa como concluída e deixo para o próximo turno decidir.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Marcar como feito sem resolver passa o defeito adiante e engana o registro."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "conferencia_final",
            "afirmacao": "Se você tem dúvida sobre se a pintura de uma peça está conforme o pedido, o certo é aprovar e deixar o cliente reportar qualquer problema.",
            "correta": false,
            "feedbackCerto": "Correto. Dúvida é motivo para parar e consultar a ficha ou o responsável.",
            "feedbackErrado": "Falso. Dúvida não autoriza aprovar. Consulte a ficha e o responsável antes de liberar."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "conferencia_final",
            "local": "Área de conferência da expedição",
            "instrucao": "Pegue uma peça de treino ou observe uma peça de um pedido com permissão do responsável, sem alterar dados. Passe pelos seis pontos: produto, quantidade, versão, acabamento, integridade e componentes. Marque como feito quando tiver olhado a peça inteira com boa luz."
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "Montagem final",
        "subtitulo": "Sequência, encaixe e acessórios antes de fechar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Quando há montagem",
            "texto": "Alguns produtos saem da pintura em partes separadas e precisam ser montados antes do envio, como uma figura com base, braço ou acessório encaixado. Quais produtos são montados na expedição e qual é o procedimento são definidos pela Valente. Siga o procedimento definido pela Valente ou consulte o responsável. Não monte por conta própria algo que a ficha não pede."
          },
          {
            "tipo": "conteudo",
            "titulo": "Sequência e teste de encaixe",
            "texto": "Quando houver montagem, siga a sequência e o padrão definidos. Antes de fixar qualquer coisa, teste o encaixe sem força: as partes devem entrar com facilidade. Se estiver apertado demais, não force, pois detalhes finos de miniaturas quebram com facilidade. Pare e consulte o responsável. Confirme também que cada acessório está na posição certa, de acordo com a ficha ou foto de referência."
          },
          {
            "tipo": "conteudo",
            "titulo": "O risco da pressa",
            "texto": "Montagem apressada pode inverter um componente ou causar um dano que não existia ao sair da pintura. Uma peça que passou na conferência e quebra durante a montagem vira problema seu. Trabalhe com calma, com a bancada limpa e as peças à vista. Se algo se soltar ou quebrar, pare, não esconda e avise o responsável."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "conferencia_final",
            "pergunta": "Ao testar o encaixe de um braço numa miniatura, a peça entra apertada e você sente resistência. O que fazer?",
            "opcoes": [
              "Forçar até entrar, pois peças bem apertadas ficam firmes",
              "Lixar a ponta do encaixe por conta própria para dar folga",
              "Deixar o braço solto dentro da caixa e avisar o cliente na mensagem",
              "Parar, não forçar e consultar a ficha e o responsável"
            ],
            "correta": 3,
            "feedbackCerto": "Correto. Em caso de resistência, você para e consulta, nunca força.",
            "feedbackPorOpcao": [
              "Forçar pode quebrar um detalhe fino ou danificar a pintura.",
              "Alterar a peça sem procedimento aprovado pode estragá-la.",
              "Mudar o produto final sem autorização é decidir algo que não é seu.",
              null
            ],
            "erroCriticoOpcoes": [
              1,
              2
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "conferencia_final",
            "local": "Valente OS (tablet) > tarefa de Expedição do pedido, instruções e checklist",
            "instrucao": "Sem alterar dados, abra a tarefa de Expedição de um pedido e leia título, instruções e checklist, procurando qualquer menção a montagem final. Se não houver, anote que você consultaria o responsável. Marque como feito quando souber onde olhar para saber se um produto precisa ser montado."
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "Escolha e preparação da embalagem",
        "subtitulo": "Proteção compatível com o transporte",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que a embalagem faz",
            "texto": "A embalagem existe para proteger a peça contra movimento e impactos compatíveis com o transporte esperado. Durante o transporte, a caixa é empilhada, virada, balançada e pode cair. Quanto mais frágil a peça, mais cuidado. Tamanho, fragilidade e componentes influenciam na escolha. Miniaturas têm detalhes finos, como dedos, armas e adornos, que quebram com pouco impacto."
          },
          {
            "tipo": "conteudo",
            "titulo": "Folga demais, aperto demais",
            "texto": "Caixa grande demais sem imobilização permite que a peça bata internamente, e o impacto contra a parede da caixa quebra detalhes. Caixa apertada demais pode pressionar partes frágeis e danificá-las só pelo contato. O objetivo é a peça firme, sem folga para balançar, mas sem pressão sobre os detalhes. Proteja cada peça separadamente quando houver mais de uma, para que não se toquem."
          },
          {
            "tipo": "conteudo",
            "titulo": "Padrões aprovados",
            "texto": "Use materiais e padrões aprovados para cada categoria quando disponíveis. Não invente embalagens improvisadas se existir um padrão definido. Se não houver padrão para aquele caso, consulte o responsável em vez de decidir sozinho. Depois de embalar, balance levemente a caixa fechada: se ouvir ou sentir a peça se mexendo, a imobilização não está boa."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "embalagem_protecao",
            "pergunta": "Você coloca uma miniatura delicada, de braços finos, numa caixa muito maior que ela, sem nada ao redor. Qual é o principal risco?",
            "opcoes": [
              "A caixa ficar cara demais, sem relação com a qualidade da peça",
              "A peça se deslocar e bater contra as paredes, quebrando detalhes finos",
              "A peça descolorir por falta de contato com a proteção interna",
              "A etiqueta não caber na caixa grande"
            ],
            "correta": 1,
            "feedbackCerto": "Correto. Folga sem imobilização deixa a peça bater dentro da caixa.",
            "feedbackPorOpcao": [
              "O problema principal é de proteção, não de aparência.",
              null,
              "Cor não muda por folga; o risco é o impacto físico.",
              "A etiqueta cabe; o risco real é o movimento interno."
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "embalagem_protecao",
            "pergunta": "Marque o que indica uma embalagem bem preparada.",
            "itens": [
              "A peça fica firme, sem balançar ao mexer de leve na caixa",
              "Os detalhes frágeis não são pressionados pela proteção",
              "Vários itens soltos na mesma caixa, encostando uns nos outros",
              "Foi usado o material padrão aprovado para a categoria",
              "Sobrou espaço vazio para a peça se acomodar durante o transporte"
            ],
            "corretos": [
              0,
              1,
              3
            ],
            "feedbackCerto": "Correto. Firme, sem pressão e com material aprovado.",
            "feedbackErrado": "Revise: peças encostando e espaço vazio são risco de dano; firme, sem pressão e padrão aprovado são os sinais certos."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "embalagem_protecao",
            "local": "Estação de expedição, área de materiais de embalagem",
            "instrucao": "Observe os tipos de caixa e proteção disponíveis na estação, sem consumir material. Escolha mentalmente qual usaria para uma peça pequena e frágil e como a deixaria imobilizada. Em caso de dúvida sobre o padrão, consulte o responsável. Marque como feito depois de conferir onde está o padrão aprovado."
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Identificação",
        "subtitulo": "Evitar troca entre pacotes",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que identificar",
            "texto": "Cada pacote precisa de identificação clara do cliente, do pedido, do conteúdo e das etiquetas necessárias. As informações vêm do pedido no Valente OS. A identificação deve sobreviver ao manuseio: etiqueta solta, borrada ou presa em lugar que descola não serve. Identificar protege a rastreabilidade, ou seja, a capacidade de saber de qual pedido aquele pacote veio."
          },
          {
            "tipo": "conteudo",
            "titulo": "O perigo das caixas iguais",
            "texto": "Duas caixas iguais lado a lado sem identificação são um convite à troca. Em um dia corrido, é fácil pegar a caixa errada e despachar para o cliente errado. Por isso, identifique cada pacote logo depois de fechado, antes de iniciar o próximo pedido. Trabalhe um pedido por vez na bancada e não deixe pacotes sem identificação perto uns dos outros."
          },
          {
            "tipo": "conteudo",
            "titulo": "Antes de perder a rastreabilidade",
            "texto": "Identifique antes de perder a rastreabilidade. Depois que dois pacotes se misturam sem etiqueta, você só consegue saber o que há em cada um abrindo de novo. Antes de colar, confira se o nome e o pedido na etiqueta batem com o registro no sistema. Se algo estiver ilegível ou divergente, não improvise: confirme na fonte ou com o responsável."
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "identificacao_envio",
            "pergunta": "Marque o que deve ser verificado antes de fechar a identificação de um pacote.",
            "itens": [
              "O pedido na etiqueta é o mesmo do sistema",
              "O nome do cliente está correto e legível",
              "A etiqueta pode ser colada depois, quando o pacote chegar à transportadora",
              "A etiqueta está firme, em local que não descola com o manuseio",
              "Basta confiar na memória sobre qual caixa é de qual pedido"
            ],
            "corretos": [
              0,
              1,
              3
            ],
            "feedbackCerto": "Correto. Conferir com o sistema e garantir durabilidade evita troca.",
            "feedbackErrado": "Revise: deixar para depois e confiar na memória são justamente as causas de troca."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "identificacao_envio",
            "pergunta": "Você terminou de fechar duas caixas idênticas de pedidos diferentes e ainda não as identificou. O que fazer agora?",
            "opcoes": [
              "Separar as caixas, conferir pedido e cliente no sistema e identificar cada uma na hora",
              "Colocá-las juntas e identificar no final do dia, com tudo pronto",
              "Identificar uma e supor que a outra é a restante",
              "Deixar para quem for despachar descobrir pelo peso"
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Identificar logo depois de fechar preserva a rastreabilidade.",
            "feedbackPorOpcao": [
              null,
              "Quanto mais tempo sem identificação, maior o risco de troca.",
              "Suposição não é identificação; confirme as duas.",
              "Peso não é critério confiável de identificação."
            ],
            "erroCriticoOpcoes": [
              2
            ]
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "identificacao_envio",
            "local": "Valente OS (tablet) > aba Pedidos (Kanban) e estação de expedição",
            "instrucao": "Sem alterar dados, abra um pedido em consulta e leia nome do cliente e número do pedido. Verifique, na estação, onde ficam as etiquetas e como você as fixaria numa caixa. Marque como feito quando souber onde conferir os dados e onde colar a identificação."
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Endereço e dados de envio",
        "subtitulo": "Conferir, não presumir",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Fonte dos dados",
            "texto": "Os dados de envio, como destinatário, endereço, número, complemento, CEP e contato, devem ser consultados no pedido e conferidos. A fonte é o registro do pedido no Valente OS, e não a memória, uma conversa antiga ou um endereço parecido de outro pedido. Compare o que está na etiqueta com o que está no registro, campo por campo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Um número errado estraga tudo",
            "texto": "Um número de casa incorreto pode inutilizar todo o trabalho anterior: a modelagem, a impressão, a pintura e a embalagem. O pacote pode voltar, atrasar ou ir para outro endereço. Erro de dado de envio é difícil de corrigir depois que o pacote saiu. Por isso a regra é: CONFERIR, NÃO PRESUMIR."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quando falta ou duvida",
            "texto": "Se faltar um dado, como o complemento, ou se algo parecer estranho, não complete por suposição. Solicite confirmação pelo canal correto, que normalmente passa pelo Comercial ou pelo responsável. Enquanto isso, o pedido não deve ser despachado com dado duvidoso. Dizer não sei e consultar é o comportamento certo; inventar um dado não é."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "dados_envio",
            "cliente": "Colega do Comercial: o endereço do pedido está sem o número da casa, mas o cliente mora na mesma rua de outro pedido dele, no 120. Usa o 120 aí.",
            "opcoes": [
              {
                "label": "Uso o 120, pois é a mesma rua e deve ser a mesma casa.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Presumir o número pode mandar o pacote ao lugar errado."
              },
              {
                "label": "Peço que a confirmação do número seja feita com o cliente pelo canal correto e aguardo antes de despachar.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Certo. Dado faltante é confirmado, nunca presumido."
              },
              {
                "label": "Escrevo sem número e deixo a transportadora procurar.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Endereço incompleto aumenta o risco de atraso e extravio."
              },
              {
                "label": "Despacho assim mesmo e depois corrijo no sistema.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Despachar com dado incompleto ignora a regra de conferir antes."
              }
            ]
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "dados_envio",
            "pergunta": "Ao conferir, a etiqueta traz um CEP diferente do que está no pedido no Valente OS. O que fazer?",
            "opcoes": [
              "Confiar na etiqueta, pois foi impressa por um sistema",
              "Corrigir a etiqueta pelo CEP que você lembra da região",
              "Parar, comparar com o registro do pedido e, se a divergência continuar, confirmar pelo canal correto",
              "Despachar e aguardar a transportadora avisar se der problema"
            ],
            "correta": 2,
            "feedbackCerto": "Correto. Divergência é motivo para parar e confirmar na fonte.",
            "feedbackPorOpcao": [
              "Etiqueta também pode ter erro; o registro do pedido deve ser conferido.",
              "Memória não é fonte de dado.",
              null,
              "O erro seria descoberto tarde demais."
            ],
            "erroCriticoOpcoes": [
              1,
              3
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "dados_envio",
            "pergunta": "Descreva como você conferiria os dados de envio de um pedido antes de despachar. O que você compara com o quê e o que faz se faltar um dado?",
            "pontosEsperados": [
              "Compara os dados da etiqueta com o registro do pedido no Valente OS, campo por campo",
              "Não completa dado por memória ou suposição",
              "Solicita confirmação pelo canal correto e não despacha até resolver"
            ]
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Despacho e rastreio",
        "subtitulo": "O pacote realmente saiu",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Despacho é um fato",
            "texto": "Despacho é o momento em que o pacote realmente sai da empresa para a entrega. Etiqueta impressa não significa pacote enviado. Código gerado também pode não significar postagem concluída. Só vale como enviado quando houve a entrega do pacote à transportadora ou o envio pela forma definida. Transportadoras, comprovantes e registro seguem o procedimento definido pela Valente ou o responsável."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que registrar",
            "texto": "Após o despacho, registre as informações exigidas e o rastreio quando aplicável. Na tarefa de Expedição do tablet, você informa a transportadora ou forma de envio e o código de rastreio. Isso permite ao cliente e à equipe saber que o pacote saiu e acompanhar o caminho. Confira o código com cuidado: um dígito errado torna o rastreio inútil."
          },
          {
            "tipo": "conteudo",
            "titulo": "O que o tablet faz",
            "texto": "Ainda na tarefa de Expedição, você confirma o saldo e toca em Marcar como enviado. Esse toque move o pedido para Enviado no Kanban e cria automaticamente a tarefa de Pós-compra para o Comercial, para 5 dias depois. Ou seja, o seu registro dispara o contato com o cliente. Por isso ele só pode ser feito quando o pacote saiu de verdade."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "despacho_kanban",
            "pergunta": "A etiqueta de envio foi impressa e o código de rastreio já foi gerado, mas o pacote ainda está na sua bancada. O pedido pode ser marcado como enviado?",
            "opcoes": [
              "Sim, com etiqueta e código tudo está pronto para a transportadora",
              "Sim, o rastreio avisará se algo der errado",
              "Sim, desde que o Comercial esteja ciente",
              "Não, pois etiqueta e código não provam que o pacote saiu"
            ],
            "correta": 3,
            "feedbackCerto": "Correto. O registro só vale depois do despacho real.",
            "feedbackPorOpcao": [
              "Pronto não é o mesmo que despachado.",
              "O rastreio não corrige um registro falso de envio.",
              "A ciência do Comercial não torna verdadeiro um envio que não ocorreu.",
              null
            ],
            "erroCriticoOpcoes": [
              0,
              1,
              2
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "despacho_kanban",
            "instrucao": "Coloque na ordem correta as ações de despacho e registro.",
            "itens": [
              "Conferir dados de envio e identificação do pacote",
              "Entregar o pacote à transportadora ou realizar o envio",
              "Informar transportadora/forma de envio e código de rastreio na tarefa",
              "Confirmar o saldo",
              "Tocar em Marcar como enviado"
            ],
            "feedbackCerto": "Correto. Primeiro o fato, depois o registro.",
            "feedbackErrado": "A ordem começa por conferir, depois despachar de verdade, e só então registrar e marcar como enviado."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "despacho_kanban",
            "local": "Valente OS (tablet) > tarefa de Expedição",
            "instrucao": "Em modo de consulta, sem tocar em Marcar como enviado, abra uma tarefa de Expedição e localize os campos de transportadora/forma de envio, código de rastreio e saldo, além do botão Marcar como enviado. Marque como feito quando souber onde cada um fica."
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Atualizando o Kanban",
        "subtitulo": "Enviado representa um fato",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O significado de Enviado",
            "texto": "As etapas do Kanban refletem a realidade do pedido: Negociação, Pago, Modelando, Imprimindo, Pós-impressão, Pintura, Preparar p/ envio e Enviado. A etapa Enviado representa um fato: o envio ocorreu conforme critério da empresa. Embalagem pronta não é envio. Aquele pedido ainda é Preparar p/ envio enquanto o pacote não saiu."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quem depende do status",
            "texto": "Marcar Enviado antes do despacho pode fazer o Comercial informar ao cliente algo que ainda não aconteceu. Como Marcar como enviado cria a tarefa de Pós-compra para 5 dias depois, o cliente também passa a ser contatado com base nessa data. Um status errado gera informação errada para o cliente e para a equipe."
          },
          {
            "tipo": "conteudo",
            "titulo": "Regra de ouro",
            "texto": "Atualize somente quando a condição real da etapa estiver atendida. Isso vale também para as outras etapas do Kanban e para marcar tarefas como concluídas. Marcar como feito algo que não foi feito é erro crítico. Se você marcou Enviado por engano, avise o responsável imediatamente; não tente esconder."
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "despacho_kanban",
            "afirmacao": "Se a caixa está fechada, identificada e pronta na prateleira, o pedido já pode ser marcado como Enviado para adiantar o trabalho do Comercial.",
            "correta": false,
            "feedbackCerto": "Correto. Pronto para sair não é enviado; só marque depois do despacho.",
            "feedbackErrado": "Falso. Enviado é um fato que ocorreu. Marcar antes faz o Comercial informar algo que não aconteceu."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "despacho_kanban",
            "pergunta": "Ao tocar em Marcar como enviado, o que acontece automaticamente no sistema?",
            "opcoes": [
              "Só a cor do cartão muda no Kanban, sem tarefa nova",
              "O pedido vai para Enviado e é criada uma tarefa de Pós-compra para o Comercial 5 dias depois",
              "O cliente recebe a foto final da peça tirada pelo tablet",
              "O pedido volta para Pós-impressão para revisão"
            ],
            "correta": 1,
            "feedbackCerto": "Correto. Por isso o toque só vale com o envio real.",
            "feedbackPorOpcao": [
              "Além do status, cria-se a tarefa de Pós-compra.",
              null,
              "A foto final é feita em outro aparelho, não pelo tablet.",
              "Esse toque leva o pedido adiante, para Enviado."
            ]
          },
          {
            "tipo": "texto_livre",
            "competencia": "despacho_kanban",
            "pergunta": "Explique por que você só deve marcar um pedido como Enviado depois do despacho real, e o que pode acontecer com o Comercial e o cliente se marcar antes.",
            "pontosEsperados": [
              "Enviado representa um fato: o pacote realmente saiu",
              "O Comercial pode informar ao cliente algo que não aconteceu",
              "A tarefa de Pós-compra é criada automaticamente com base nessa data"
            ]
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "Missão Expedição",
        "subtitulo": "Fluxo completo com um pedido simulado",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Como funciona a missão",
            "texto": "Você vai receber um pedido finalizado simulado e percorrer o fluxo do curso: conferir conteúdo, notar um erro proposital, escolher a embalagem, validar dados, preparar a identificação e simular o registro do despacho. A missão verifica se você prefere parar e corrigir a enviar algo duvidoso. Tudo aqui é simulação e não altera dados reais."
          },
          {
            "tipo": "conteudo",
            "titulo": "Antes de começar",
            "texto": "Lembre-se do caminho: consultar o pedido, conferir por conteúdo, aprovar só o que está certo, embalar com proteção, identificar, conferir dados, despachar e só então registrar. Em qualquer dúvida, consulte a ficha, o Valente OS ou o responsável. Não saber não é erro; inventar é."
          },
          {
            "tipo": "cenario",
            "competencia": "conferencia_final",
            "titulo": "Pedido simulado: duas miniaturas e um acessório",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "O pedido simulado registra duas miniaturas pintadas e um acessório para cada. Na bancada há duas miniaturas e apenas um acessório. A pressa é grande, pois o cliente já perguntou do pedido. O que você faz?",
                "opcoes": [
                  {
                    "label": "Embalo as duas miniaturas com o acessório que há e envio o restante depois, sem avisar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Esconder a falta é erro crítico. A diferença deve ser tratada, não omitida."
                  },
                  {
                    "label": "Paro a conferência, registro o que falta e aviso o responsável para corrigir antes de embalar.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Você detectou a falta antes de fechar.",
                    "proximo": "b"
                  },
                  {
                    "label": "Conto as caixas, que estão certas, e sigo.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Contar volume não confirma conteúdo.",
                    "proximo": "b"
                  },
                  {
                    "label": "Pego um acessório parecido de outro pedido para completar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Usar item de outro pedido gera troca e perda de rastreabilidade.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "O responsável resolveu a falta e o pedido está completo. Agora você precisa escolher a embalagem. As miniaturas têm detalhes finos e há duas peças com acessórios. Como prepara?",
                "opcoes": [
                  {
                    "label": "Uso uma caixa grande e coloco tudo solto, pois o importante é caber.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Folga permite que as peças batam entre si.",
                    "proximo": "c"
                  },
                  {
                    "label": "Uso o padrão aprovado, protegendo cada peça separadamente e imobilizando para que nada balance.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Correto. Proteção individual e imobilização com padrão aprovado.",
                    "proximo": "c"
                  },
                  {
                    "label": "Aperto bastante tudo numa caixa pequena para não se mexer.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Pressão excessiva pode danificar detalhes frágeis.",
                    "proximo": "c"
                  },
                  {
                    "label": "Improviso uma embalagem diferente do padrão, porque é mais rápido.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Ignorar o padrão aprovado sem consultar é arriscado.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "A caixa está pronta. Ao conferir, o endereço da etiqueta está sem complemento, e o pedido no Valente OS tem uma observação que não esclarece. A transportadora vem buscar daqui a pouco. O que faz?",
                "opcoes": [
                  {
                    "label": "Complemento é detalhe: despacho assim mesmo e marco como enviado.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Despachar com dado duvidoso e marcar como enviado são erros."
                  },
                  {
                    "label": "Invento um complemento comum para a região para não atrasar.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Inventar dado é erro crítico. Conferir, não presumir."
                  },
                  {
                    "label": "Marco como enviado agora para adiantar e confirmo o complemento depois.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Enviado é um fato; marcar antes cria informação falsa."
                  },
                  {
                    "label": "Não despacho, peço a confirmação pelo canal correto, identifico a caixa e só registro o envio depois que o pacote realmente sair.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Você conferiu, não presumiu e só registrou o fato real."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "despacho_kanban",
            "titulo": "Missão Expedição",
            "objetivo": "Percorrer o fluxo completo de expedição de um pedido simulado, parando e corrigindo antes de enviar algo duvidoso.",
            "contexto": "Você recebeu um pedido finalizado simulado com duas miniaturas pintadas e acessórios. Este exercício é uma simulação: não altere dados reais nem marque pedidos reais como enviados.",
            "tarefas": [
              "Consultar o pedido e montar um checklist por conteúdo, comparando o físico com o registro",
              "Identificar o erro proposital (falta, troca ou dano) e separar o pedido, avisando o responsável",
              "Escolher a embalagem pelo padrão aprovado e imobilizar a peça",
              "Conferir os dados de envio e a identificação do pacote, sem presumir nada",
              "Simular o registro do despacho: transportadora/forma de envio, rastreio, saldo e Marcar como enviado, somente depois do envio real simulado",
              "Aguardar a conferência do responsável para a liberação prática"
            ],
            "criterioConclusao": "Você identificou o erro, parou em vez de enviar algo duvidoso, escolheu embalagem e identificação adequadas, conferiu os dados e o registro de despacho só foi simulado após o envio. A liberação prática depende da conferência do responsável."
          }
        ]
      }
    ]
  },
  gestao_producao: {
    "id": "gestao_producao",
    "nome": "Gestão da Produção",
    "descricao": "Aprenda a ler o Kanban, priorizar, planejar capacidade, tratar gargalos e retrabalho, distribuir trabalho e usar indicadores com gestão enxuta.",
    "icone": "📊",
    "versao": 1,
    "cargosPermitidos": [
      "admin",
      "supervisor"
    ],
    "competencias": [
      "Leitura do Kanban",
      "Priorização",
      "Capacidade e fluxo",
      "Gargalos",
      "Qualidade e melhoria",
      "Distribuição de trabalho"
    ],
    "criteriosConclusao": null,
    "dias": [
      {
        "dia": 1,
        "titulo": "Visão geral da fábrica pelo Kanban",
        "subtitulo": "Ler o quadro como um sistema, não como enfeite",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O Kanban é um retrato da operação",
            "texto": "Kanban é um quadro visual em que cada pedido é um cartão e cada coluna é uma etapa do trabalho. No Valente OS, a aba Pedidos mostra as colunas Negociação, Pago, Modelando, Imprimindo, Pós-impressão, Pintura, Preparar p/ envio e Enviado. O objetivo do quadro não é ficar bonito. É representar a operação real. Se o cartão diz Imprimindo, mas a peça já está na bancada de acabamento, o quadro está mentindo, e qualquer decisão tomada em cima dele nasce errada."
          },
          {
            "tipo": "conteudo",
            "titulo": "Três sinais que o gestor aprende a notar",
            "texto": "O primeiro sinal é acúmulo: muitos cartões numa mesma coluna. O segundo é o cartão parado: um pedido que está no mesmo lugar há muito mais tempo que os outros. O terceiro é o trabalho que avança sem informação: o cartão muda de coluna, mas falta foto, observação ou registro do que foi feito. Esses sinais não dizem a causa. Dizem onde olhar. Na gestão enxuta, o quadro serve para fazer boas perguntas, não para dar respostas prontas."
          },
          {
            "tipo": "conteudo",
            "titulo": "Exemplo: dez cartões em Pintura",
            "texto": "Imagine dez cartões em Pintura. Pode ser capacidade insuficiente na pintura. Pode ser um lote que chegou todo de uma vez. Pode ser atraso lá atrás, que empurrou tudo para o mesmo dia. Ou pode ser só status desatualizado: peças que já foram para embalagem e ninguém moveu o cartão. Cada causa pede uma ação diferente. Por isso a regra é: antes de agir, descubra a causa. Pergunte à pessoa que está na bancada, olhe a peça, confira a OT e só depois decida."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como agir na prática",
            "texto": "Ao olhar o quadro, siga uma sequência curta. Primeiro, anote o que você vê: colunas cheias, vazias e cartões parados. Segundo, escreva hipóteses, ou seja, explicações possíveis. Terceiro, liste os dados que você precisa confirmar para saber qual hipótese é a verdadeira, como a OT, a conversa com quem executa e o estado físico da peça. Só então faça uma mudança. Se faltar informação, consultar a fonte é o certo. Não sei não é erro. Inventar uma causa é."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "leitura_kanban",
            "pergunta": "A coluna Pintura tem dez cartões e as outras estão quase vazias. Qual é o melhor primeiro passo?",
            "opcoes": [
              "Confirmar na bancada e nas OTs se as peças estão mesmo em pintura, antes de decidir qualquer mudança",
              "Cobrar mais velocidade de quem pinta, já que o acúmulo é lá",
              "Mover os cartões para Preparar p/ envio para limpar a coluna",
              "Pedir ao Comercial que avise os clientes de que todos os pedidos vão atrasar"
            ],
            "correta": 0,
            "feedbackCerto": "Isso mesmo. Confirmar o estado real separa acúmulo verdadeiro de status desatualizado.",
            "feedbackPorOpcao": [
              null,
              "Acúmulo é um sinal, não a causa. Cobrar velocidade sem investigar pode atingir a pessoa errada.",
              "Mover cartões sem a peça estar pronta faz o quadro mentir e esconde o problema real.",
              "Avisar atraso sem saber a causa é inventar informação. Primeiro levante os fatos."
            ],
            "erroCriticoOpcoes": [
              2,
              3
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "leitura_kanban",
            "pergunta": "Quais destes itens são sinais no quadro que merecem investigação?",
            "itens": [
              "Muitos cartões acumulados em uma coluna",
              "Um cartão parado há muito mais tempo que os outros",
              "Cartão que mudou de coluna sem nenhum registro do que foi feito",
              "Coluna Enviado com pedidos concluídos",
              "Uma coluna vazia por poucos minutos entre uma entrega e outra"
            ],
            "corretos": [
              0,
              1,
              2
            ],
            "feedbackCerto": "Certo. Acúmulo, cartão parado e avanço sem registro são sinais. Eles indicam onde olhar, não a causa.",
            "feedbackErrado": "Releia os três sinais: acúmulo, cartão parado e trabalho avançando sem informação. Pedidos enviados e uma pausa normal não são sinais de problema."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "leitura_kanban",
            "local": "Valente OS, aba Pedidos (Kanban)",
            "instrucao": "Apenas observando, sem mover nenhum cartão, olhe o quadro e anote em um papel: duas colunas com mais cartões, um cartão que parece parado, uma hipótese para cada um e o dado que você precisaria confirmar. Não altere nada no sistema."
          }
        ]
      },
      {
        "dia": 2,
        "titulo": "Pedidos, OTs e prioridades",
        "subtitulo": "Prioridade tem critério, e tudo urgente não é prioridade",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que é prioridade",
            "texto": "Prioridade é a ordem em que o trabalho deve ser feito quando não dá para fazer tudo ao mesmo tempo. Para decidir, o gestor olha vários critérios: a urgência real do cliente, a ordem de entrada dos pedidos, compromissos comerciais já assumidos, dependências (o que precisa estar pronto antes) e o impacto de atrasar. Quando tudo vira urgente, a palavra perde o sentido, porque a equipe não sabe mais o que fazer primeiro."
          },
          {
            "tipo": "conteudo",
            "titulo": "Cuidado com a interrupção",
            "texto": "Trocar de trabalho tem custo. Se um lote está quase concluído e você interrompe para começar outro pedido que parece mais importante, a impressora precisa ser preparada de novo, o lote parado espera, e o atraso total pode aumentar. Em gestão enxuta, terminar o que já está em andamento costuma ser melhor do que começar coisa nova. Interrompa só quando houver motivo claro, e registre o motivo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Pedidos e OTs falando a mesma língua",
            "texto": "O pedido é o que o cliente comprou e aparece como cartão no Kanban. A OT, ordem de tarefa, é o trabalho que alguém executa, com título, instruções, checklist e quantidade, e no tablet tem Iniciar, Pausar e Concluir. Ao priorizar, confira se a ordem dos cartões e a ordem das OTs contam a mesma história. Quem define os critérios oficiais de prioridade e quem pode alterá-los é a Valente: siga o procedimento definido pela Valente ou consulte o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "priorizacao",
            "cliente": "Gestor, esse pedido novo é urgente! Para o cliente é para ontem. Para e começa ele agora, o lote da outra impressora já está quase acabando, mas deixa pra lá.",
            "opcoes": [
              {
                "label": "Entendo a urgência. Vou olhar a OT e ver quanto falta no lote atual, qual o prazo real do novo pedido e se dá para encaixar sem desmontar o que está quase pronto.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Boa. Você considera o custo de interromper e verifica o prazo real antes de decidir."
              },
              {
                "label": "Pode parar o lote agora. Urgente sempre passa na frente.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Interromper um lote quase concluído pode aumentar o atraso total. Urgência precisa ser verificada."
              },
              {
                "label": "Vou deixar o novo pedido por último, porque ele entrou depois.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Ordem de entrada é um critério, mas não é o único. Ignorar urgência real e compromisso comercial também gera problema."
              },
              {
                "label": "Não sei o prazo, mas marque o novo como urgente e o do lote também, assim ninguém fica de fora.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Marcar tudo como urgente elimina a ideia de prioridade e deixa a equipe sem direção."
              }
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "priorizacao",
            "instrucao": "Coloque na ordem uma boa decisão de prioridade quando chega um pedido que se diz urgente.",
            "itens": [
              "Levantar o prazo real e o compromisso comercial do pedido novo",
              "Verificar o que está em andamento e quanto falta para terminar",
              "Checar dependências, como arquivo, material e etapa seguinte",
              "Decidir a ordem e registrar o motivo",
              "Avisar a equipe e o Comercial sobre a decisão"
            ],
            "feedbackCerto": "Isso. Primeiro fatos, depois decisão, depois comunicação.",
            "feedbackErrado": "Comece pelos fatos (prazo real e o que está em andamento), depois dependências, e só então decida e comunique."
          },
          {
            "tipo": "texto_livre",
            "competencia": "priorizacao",
            "pergunta": "Descreva uma situação em que interromper um trabalho em andamento seria uma má ideia e uma em que seria justificável. Quais critérios você usaria?",
            "pontosEsperados": [
              "Cita o custo de interromper trabalho quase concluído",
              "Considera prazo real e impacto no atraso total",
              "Menciona consultar a regra da Valente ou o responsável sobre quem altera prioridade",
              "Registra o motivo da mudança"
            ]
          }
        ]
      },
      {
        "dia": 3,
        "titulo": "Capacidade das máquinas e pessoas",
        "subtitulo": "Planejar o fluxo, não apenas usar máquina",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Capacidade é mais que impressoras",
            "texto": "Capacidade é quanto trabalho a fábrica consegue entregar num período. Muita gente conta só as impressoras, mas capacidade tem várias partes: disponibilidade da máquina, tempo de ciclo (quanto tempo cada peça leva do início ao fim), manutenção, material disponível, competência de quem opera e capacidade dos setores seguintes. A capacidade real é a menor dessas partes, pois a corrente é tão forte quanto o elo mais fraco."
          },
          {
            "tipo": "conteudo",
            "titulo": "Máquina, pessoa e etapa seguinte",
            "texto": "Pense em três perguntas. Máquinas: quais estão disponíveis, em manutenção ou sem material? Pessoas: quem está presente e liberado para cada tarefa, lembrando que em uma equipe pequena a mesma pessoa pode cobrir várias funções? Etapas seguintes: pós-impressão, pintura e embalagem conseguem absorver o que sai da impressora? Se você só olha a primeira pergunta, enche a impressão e o resto sufoca."
          },
          {
            "tipo": "conteudo",
            "titulo": "Exemplo: o gargalo que só muda de lugar",
            "texto": "Aumentar a impressão sem capacidade de pós-processo apenas desloca o gargalo. As peças saem mais rápido, mas ficam empilhadas esperando limpeza, cura e acabamento. Os cartões se acumulam em Pós-impressão e o pedido não anda mais rápido. Por isso, a regra é planejar fluxo, não utilização de máquina. Uma impressora parada pode ser a decisão certa se a etapa seguinte já está lotada."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "capacidade_fluxo",
            "pergunta": "A equipe quer ligar todas as impressoras ao máximo porque há três paradas. A pós-impressão já tem peças esperando. O que isso provavelmente causará?",
            "opcoes": [
              "Entregas mais rápidas, porque mais peças saem das máquinas",
              "Aumento natural da capacidade de acabamento, pois haverá mais prática",
              "Mais peças esperando na pós-impressão, o gargalo apenas muda de lugar",
              "Nenhum efeito, pois a pós-impressão se organiza sozinha"
            ],
            "correta": 2,
            "feedbackCerto": "Correto. Planejar fluxo significa olhar a etapa seguinte antes de abrir mais impressão.",
            "feedbackPorOpcao": [
              "Peça impressa não é peça entregue. Sem capacidade nas etapas seguintes, o pedido não anda.",
              "Mais peças não criam mais capacidade de pessoas nem de bancada.",
              null,
              "Sem planejar o fluxo, a fila só cresce e o gargalo passa para essa etapa."
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "capacidade_fluxo",
            "pergunta": "Marque tudo o que entra no cálculo de capacidade real da fábrica.",
            "itens": [
              "Máquinas disponíveis e sem manutenção",
              "Material disponível para imprimir",
              "Pessoas presentes e liberadas para a tarefa",
              "Capacidade das etapas seguintes à impressão",
              "Quantidade de cartões na coluna Enviado do mês passado"
            ],
            "corretos": [
              0,
              1,
              2,
              3
            ],
            "feedbackCerto": "Certo. Capacidade junta máquina, material, pessoas e etapas seguintes.",
            "feedbackErrado": "Capacidade olha para o que está disponível agora: máquinas, material, pessoas e etapas seguintes. Pedidos já enviados são histórico, não capacidade."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "capacidade_fluxo",
            "local": "Área de produção e Valente OS, aba Pedidos",
            "instrucao": "Sem alterar nada, percorra a produção e o Kanban e anote: quantas máquinas estão disponíveis hoje, quem está presente, e para cada etapa seguinte (pós-impressão, pintura, preparar para envio) se ela tem fila ou folga. Qual é a menor capacidade da lista?"
          }
        ]
      },
      {
        "dia": 4,
        "titulo": "Prazos e filas de produção",
        "subtitulo": "Prometer só o que o fluxo sustenta",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Prazo comercial e capacidade conversam",
            "texto": "O prazo que o Comercial promete ao cliente precisa conversar com a capacidade operacional. Quem enxerga a fila real é o gestor da produção. Por isso ele deve fornecer informação realista e sinalizar risco antes do vencimento, não depois. Avisar com antecedência permite negociar com o cliente. Avisar quando o prazo já estourou só transfere o problema e queima a confiança."
          },
          {
            "tipo": "conteudo",
            "titulo": "Fila: quanto trabalho vem antes",
            "texto": "Fila é o conjunto de trabalhos esperando antes do seu pedido. Quanto maior a fila, maior o tempo de espera, mesmo que cada tarefa seja rápida. Um pedido novo não passa a ser feito na hora só porque entrou: ele entra no fim da fila, a menos que se decida por prioridade. Para estimar um prazo, some o tempo das etapas, inclua a espera entre elas e use dados do fluxo, não palpite."
          },
          {
            "tipo": "conteudo",
            "titulo": "Exemplo: cinco urgentes no mesmo dia",
            "texto": "Aceitar cinco pedidos urgentes para o mesmo dia não cria cinco vezes mais capacidade. A fábrica continua com as mesmas máquinas, pessoas e etapas. O resultado provável é atrasar os cinco, e ainda os pedidos que já estavam na fila. Evite promessas baseadas apenas em otimismo. Se não houver dado, diga: preciso confirmar. Os prazos oficiais e margens seguem o procedimento definido pela Valente ou o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "capacidade_fluxo",
            "cliente": "Fala do Comercial: O cliente quer cinco peças personalizadas amanhã. Posso confirmar? Você acha que dá, né?",
            "opcoes": [
              {
                "label": "Deixa eu olhar a fila, a capacidade de cada etapa e o material. Em pouco tempo te respondo com o que dá para prometer e o que é risco.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Boa. Resposta baseada em dados e sem promessa no escuro."
              },
              {
                "label": "Confirma. A gente dá um jeito, sempre dá.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Otimismo sem dados é como se prometem prazos que não se cumprem."
              },
              {
                "label": "Não confirma nada, a fila está sempre cheia.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Recusar sem olhar os dados também não ajuda. A resposta precisa ser baseada no fluxo real."
              },
              {
                "label": "Confirma e depois eu aviso se atrasar.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Sinalizar risco precisa acontecer antes do vencimento, não depois."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "capacidade_fluxo",
            "afirmacao": "Aceitar vários pedidos urgentes para o mesmo dia aumenta proporcionalmente a capacidade da produção.",
            "correta": false,
            "feedbackCerto": "Correto. A capacidade continua a mesma. O risco é atrasar todos os pedidos.",
            "feedbackErrado": "Falso. Máquinas, pessoas e etapas não se multiplicam por causa de um pedido urgente."
          },
          {
            "tipo": "texto_livre",
            "competencia": "capacidade_fluxo",
            "pergunta": "Você tem uma fila de pedidos e o Comercial pergunta um prazo para um pedido novo. Liste quais dados você levantaria para responder e como avisaria um risco de atraso.",
            "pontosEsperados": [
              "Fila atual e tempo de cada etapa, incluindo espera",
              "Capacidade de máquinas, pessoas e etapas seguintes",
              "Disponibilidade de material e arquivo",
              "Sinalizar o risco ao Comercial antes do vencimento",
              "Admite não saber e confirma a fonte"
            ]
          }
        ]
      },
      {
        "dia": 5,
        "titulo": "Identificação de gargalos",
        "subtitulo": "Investigar a causa antes de cobrar velocidade",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O que é gargalo",
            "texto": "Gargalo é o ponto que limita o fluxo naquele momento. É como o gargalo de uma garrafa: por mais água que entre, só sai o que passa por ali. Ele pode ser uma máquina, uma pessoa, uma aprovação do cliente, um arquivo com erro, falta de material ou falta de informação. E muda de lugar: resolveu um, outro aparece. Por isso o gestor precisa reavaliar sempre."
          },
          {
            "tipo": "conteudo",
            "titulo": "Acúmulo é sinal, não causa",
            "texto": "Cartões acumulados mostram que algo está segurando o fluxo, mas não dizem o quê. Cartões parados em Modelando, por exemplo, podem decorrer de falta de referência do cliente, não de lentidão do modelador. Se o gestor cobra velocidade sem investigar, pressiona a pessoa errada e o problema continua. A regra é: investigue a causa antes de cobrar velocidade."
          },
          {
            "tipo": "conteudo",
            "titulo": "Como investigar",
            "texto": "Siga um caminho simples. Observe onde o trabalho espera mais. Pergunte a quem executa o que está impedindo, sem acusar. Confirme com a OT, o arquivo e o pedido. Teste a hipótese: se a causa fosse essa, o que mudaria ao resolver? Por fim, trate a causa e registre. Um bom truque é perguntar cinco vezes o porquê, até chegar em algo que dá para consertar, como um processo ou uma informação que faltava."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "gargalos",
            "pergunta": "Há seis cartões parados em Modelando e o prazo apertou. Qual abordagem é a mais adequada?",
            "opcoes": [
              "Cobrar do modelador que acelere, pois é ele quem está com os cartões",
              "Perguntar ao modelador e checar os pedidos para ver se falta referência, aprovação ou arquivo antes de cobrar",
              "Mover os cartões para Imprimindo para destravar a fila",
              "Contratar ajuda para modelar, porque a modelagem é claramente o gargalo"
            ],
            "correta": 1,
            "feedbackCerto": "Isso. O acúmulo é um sinal. A investigação aponta a causa real.",
            "feedbackPorOpcao": [
              "Pode ser falta de informação do cliente. Cobrar velocidade pressiona a pessoa errada.",
              null,
              "Avançar trabalho sem o modelo pronto gera retrabalho e esconde o problema.",
              "Concluir a causa antes de investigar é suposição. Pode nem ser capacidade."
            ],
            "erroCriticoOpcoes": [
              2
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "gargalos",
            "pergunta": "Marque tudo o que pode ser um gargalo no fluxo de produção.",
            "itens": [
              "Uma máquina com manutenção atrasada",
              "Um cliente que demora a aprovar o orçamento ou a arte",
              "Um arquivo com erro que precisa voltar à modelagem",
              "Falta de material de impressão",
              "Uma coluna do Kanban com cor diferente"
            ],
            "corretos": [
              0,
              1,
              2,
              3
            ],
            "feedbackCerto": "Certo. Gargalo pode ser máquina, aprovação, arquivo, material ou informação.",
            "feedbackErrado": "Gargalo é qualquer ponto que limita o fluxo: máquina, pessoa, aprovação, arquivo, material ou informação. A cor da coluna não limita nada."
          },
          {
            "tipo": "texto_livre",
            "competencia": "gargalos",
            "pergunta": "Escolha uma coluna do Kanban com acúmulo e descreva três possíveis causas diferentes e como você confirmaria cada uma.",
            "pontosEsperados": [
              "Apresenta pelo menos três causas diferentes",
              "Diferencia máquina, pessoa, informação ou etapa seguinte",
              "Indica como confirmar (OT, conversa, observação da peça)",
              "Não culpa a pessoa antes de investigar"
            ]
          }
        ]
      },
      {
        "dia": 6,
        "titulo": "Falhas, retrabalho e reimpressões",
        "subtitulo": "Tratar a causa, não só pagar de novo pelo erro",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Retrabalho custa capacidade",
            "texto": "Retrabalho é refazer algo que já deveria estar certo, como reimprimir uma peça com falha, repintar ou corrigir um arquivo. Além de gastar material e tempo, ele consome capacidade que poderia produzir novos pedidos. Em uma equipe pequena, uma reimpressão tira horas de máquina e de gente do que está na fila. Quanto mais retrabalho, menos entrega."
          },
          {
            "tipo": "conteudo",
            "titulo": "Registrar para enxergar padrões",
            "texto": "Para agir na causa, é preciso registrar a ocorrência com o suficiente para identificar padrões: o que falhou, em qual etapa, em qual máquina ou material, e o que foi feito. Se várias impressões falham pelo mesmo motivo e só reimprimimos, estamos pagando repetidamente pela mesma causa. O objetivo do registro não é punir quem relata. Quando a pessoa tem medo, esconde a falha e o padrão nunca aparece."
          },
          {
            "tipo": "conteudo",
            "titulo": "Correção imediata e ação preventiva",
            "texto": "São duas coisas diferentes. A correção imediata resolve o pedido de agora: reimprimir, repintar, refazer. A ação preventiva trata a causa para não repetir, como revisar o suporte do modelo, conferir o nivelamento, checar o estado do material ou ajustar a instrução da OT. Faça as duas. Só a primeira apaga o incêndio. A segunda evita o próximo. Procedimentos específicos de reimpressão seguem o que a Valente definir ou o responsável."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "qualidade_melhoria",
            "cliente": "Colega: Falhou de novo a peça do lote. Eu só aperto reimprimir e pronto, né? Não vou ficar anotando que falhou, senão vão achar que errei.",
            "opcoes": [
              {
                "label": "Reimprima para atender o pedido, mas anote o que falhou, onde e em qual material. O registro não é para punir, é para achar a causa e evitar que se repita.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Certo. Correção imediata mais registro para a ação preventiva, sem culpar."
              },
              {
                "label": "Reimprime e esquece. Se anotar, vai dar problema para você.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Esconder a falha impede de achar o padrão e repete o custo."
              },
              {
                "label": "Para tudo e investiga até ter certeza da causa antes de reimprimir qualquer coisa.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Parar tudo é exagero. A correção imediata e a prevenção podem andar juntas."
              },
              {
                "label": "Reimprima e diga ao cliente que a peça já foi feita normalmente.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Esconder a falha do cliente e da equipe é informação falsa."
              }
            ]
          },
          {
            "tipo": "ordenar",
            "competencia": "qualidade_melhoria",
            "instrucao": "Ordene o tratamento de uma falha repetida de impressão.",
            "itens": [
              "Garantir a segurança e parar o que está com risco",
              "Corrigir o pedido atual (reimprimir ou refazer)",
              "Registrar o que falhou, onde e em qual condição",
              "Comparar com outras ocorrências para achar o padrão",
              "Definir e aplicar a ação preventiva"
            ],
            "feedbackCerto": "Isso. Do imediato ao preventivo, sempre com registro.",
            "feedbackErrado": "Primeiro segurança e correção do pedido, depois registro, padrão e prevenção."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "qualidade_melhoria",
            "local": "Valente OS, Missão/Inbox de tarefas (OTs) e área de produção",
            "instrucao": "Apenas consultando, pense em uma falha recente que você viu ou ouviu falar. Escreva em um papel: a correção imediata, a causa provável e uma ação preventiva possível. Não altere dados reais."
          }
        ]
      },
      {
        "dia": 7,
        "titulo": "Distribuição de trabalho",
        "subtitulo": "Quem pode fazer o quê, e não apenas quem está livre",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Critérios para distribuir",
            "texto": "Distribuir trabalho é decidir quem faz qual tarefa. Considere cinco coisas: qualificação (a pessoa sabe e está liberada?), disponibilidade (tem tempo?), complexidade da tarefa, prioridade e continuidade (quem já começou o trabalho tem contexto e evita troca desnecessária). Numa equipe de três pessoas com funções delegadas livremente, isso é ainda mais importante, pois qualquer um pode acabar fazendo qualquer coisa."
          },
          {
            "tipo": "conteudo",
            "titulo": "Livre não significa liberado",
            "texto": "Uma pessoa pode estar parada e mesmo assim não estar liberada para determinada competência. Colocar um colaborador não treinado numa tarefa crítica só porque está disponível gera risco de retrabalho, de acidente e de peça perdida. A matriz de qualificação é uma tabela que mostra quem está liberado em cada competência. Ela evita esse erro e também mostra quem precisa de treinamento."
          },
          {
            "tipo": "conteudo",
            "titulo": "Status de competência",
            "texto": "Quando o sistema estiver implementado, use os status de competência: Não iniciado, Em capacitação, Prática supervisionada, Liberado e Reciclagem. Quem está em Prática supervisionada pode executar, mas com acompanhamento. Quem está em Reciclagem precisa rever o conteúdo. Se faltar o dado, consulte o responsável. Quem define as regras de liberação é a Valente. Não presuma que uma pessoa está liberada."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "distribuicao_trabalho",
            "pergunta": "O Pedro, que está sem tarefa, é Em capacitação em pintura. Chegou uma peça de pintura com prazo apertado. O que fazer?",
            "opcoes": [
              "Dar a ele só a parte que o status permite, com acompanhamento, e reservar a tarefa crítica para quem está Liberado",
              "Entregar a tarefa inteira a ele, porque está livre e é a forma de aprender",
              "Deixar o Pedro parado e adiar a peça até todos estarem liberados",
              "Entregar a tarefa inteira à pessoa mais experiente, mesmo que ela esteja ocupada com outra urgente"
            ],
            "correta": 0,
            "feedbackCerto": "Correto. Equilíbrio entre qualificação, supervisão e disponibilidade.",
            "feedbackPorOpcao": [
              null,
              "Livre não é liberado. Tarefa crítica sem qualificação gera retrabalho e risco.",
              "Existe meio-termo: atividade supervisionada compatível com o status.",
              "Sobrecarregar sem checar disponibilidade e prioridade cria novo gargalo."
            ],
            "erroCriticoOpcoes": [
              1
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "distribuicao_trabalho",
            "pergunta": "Marque os fatores que o gestor deve considerar ao distribuir uma tarefa.",
            "itens": [
              "Se a pessoa está liberada na competência",
              "Disponibilidade de tempo",
              "Complexidade da tarefa",
              "Continuidade de quem já começou o trabalho",
              "Quem reclama menos"
            ],
            "corretos": [
              0,
              1,
              2,
              3
            ],
            "feedbackCerto": "Certo. Qualificação, disponibilidade, complexidade, prioridade e continuidade.",
            "feedbackErrado": "Os critérios são qualificação, disponibilidade, complexidade, prioridade e continuidade. Quem reclama menos não é critério de gestão."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "distribuicao_trabalho",
            "local": "Centro de Capacitação e Valente OS, Missão/Inbox de tarefas",
            "instrucao": "Sem alterar nada, escolha uma tarefa da produção e liste: qual competência ela exige, quem na equipe você acredita estar liberado e como você confirmaria isso na fonte (status de competência ou responsável)."
          }
        ]
      },
      {
        "dia": 8,
        "titulo": "Qualidade e liberações",
        "subtitulo": "Feita, conferida e liberada são coisas diferentes",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Três estados diferentes",
            "texto": "Uma tarefa executada, uma tarefa conferida e uma tarefa liberada são três estados diferentes. Executada: alguém diz que fez. Conferida: outra verificação confirmou. Liberada: está aprovada para seguir à próxima etapa ou ao cliente. A autodeclaração terminei não substitui a inspeção quando o processo exige validação. Em trabalhos críticos, a conferência é uma proteção para a pessoa, para o cliente e para a Valente."
          },
          {
            "tipo": "conteudo",
            "titulo": "Ponto de controle",
            "texto": "Ponto de controle é o momento do fluxo em que alguém confere antes de o trabalho seguir. Exemplos gerais: antes de passar da impressão para o acabamento, antes da pintura, antes de embalar. Quanto antes o defeito é pego, menos custa. Uma peça defeituosa que avança acumula custo de pintura, embalagem e envio. Nunca avance trabalho defeituoso apenas para cumprir o prazo."
          },
          {
            "tipo": "conteudo",
            "titulo": "Quem valida",
            "texto": "O gestor deve definir quem pode validar competências e trabalhos críticos. Em uma equipe pequena, isso evita que a mesma pessoa execute e libere sem olhar de novo. Quais são os pontos de controle e os responsáveis por liberação na Valente? Siga o procedimento definido pela Valente ou consulte o responsável. Não crie regra própria."
          },
          {
            "tipo": "resposta_cliente",
            "competencia": "qualidade_melhoria",
            "cliente": "Colega: Terminei a pintura do lote. Pode marcar como liberado e seguir para embalagem, ninguém precisa olhar de novo.",
            "opcoes": [
              {
                "label": "Ótimo que terminou. Vou conferir conforme o procedimento da Valente ou chamar quem faz a liberação antes de seguir.",
                "correta": true,
                "erroCritico": false,
                "feedback": "Certo. Terminar não é liberar. A conferência vem antes."
              },
              {
                "label": "Pode seguir, confio em você.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Confiança não substitui validação quando o processo a exige."
              },
              {
                "label": "Marca como liberado agora e a gente confere depois, se der tempo.",
                "correta": false,
                "erroCritico": true,
                "feedback": "Avançar sem conferir pode levar defeito ao cliente."
              },
              {
                "label": "Refaça tudo para garantir.",
                "correta": false,
                "erroCritico": false,
                "feedback": "Refazer sem avaliar gera retrabalho desnecessário. Confira primeiro."
              }
            ]
          },
          {
            "tipo": "verdadeiro_falso",
            "competencia": "qualidade_melhoria",
            "afirmacao": "Quando uma pessoa declara que terminou, o trabalho já pode ser considerado liberado.",
            "correta": false,
            "feedbackCerto": "Correto. Terminar e liberar são estados diferentes. A conferência vem antes quando exigida.",
            "feedbackErrado": "Falso. Executada, conferida e liberada são estados diferentes."
          },
          {
            "tipo": "confirmacao_pratica",
            "competencia": "qualidade_melhoria",
            "local": "Valente OS, aba Pedidos e Missão/Inbox de tarefas",
            "instrucao": "Escolha uma etapa do Kanban e escreva em um papel: onde você colocaria um ponto de controle, o que seria conferido e quem você perguntaria sobre o responsável oficial pela liberação. Não altere nada no sistema."
          }
        ]
      },
      {
        "dia": 9,
        "titulo": "Indicadores e melhoria contínua",
        "subtitulo": "Medir para decidir, não para enfeitar",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "Indicador serve para decidir",
            "texto": "Indicador é uma medida que ajuda a tomar decisão. Os mais comuns em produção são prazo (entregas no dia combinado), retrabalho, gargalos, produtividade, qualidade e capacidade. Eles só são úteis quando os dados são confiáveis. Se o quadro está desatualizado, qualquer indicador sai errado. Não crie métricas apenas porque são fáceis de contar."
          },
          {
            "tipo": "conteudo",
            "titulo": "Uma métrica isolada engana",
            "texto": "O número de cartões movidos pode subir enquanto o retrabalho também sobe: a equipe parece mais produtiva, mas está só refazendo. Por isso, olhe indicadores em conjunto. Produtividade junto com retrabalho e prazo. Evite também usar indicador para punir, porque as pessoas passam a ajustar os dados para parecer bem. As metas numéricas são definidas pela Valente. Aqui você aprende a pensar, não a criar metas."
          },
          {
            "tipo": "conteudo",
            "titulo": "Melhoria contínua",
            "texto": "Melhoria contínua é um ciclo simples: planejar uma mudança pequena, executar, verificar o que mudou nos dados e ajustar. Faça uma coisa por vez, para saber o que funcionou. Registre o que testou. A pergunta que guia tudo é: que decisão este indicador melhora? Se ninguém decidiria nada diferente com ele, ele não precisa existir."
          },
          {
            "tipo": "multipla_escolha",
            "competencia": "qualidade_melhoria",
            "pergunta": "O número de cartões movidos por semana subiu, mas as reimpressões também subiram. Como interpretar?",
            "opcoes": [
              "A produtividade melhorou, então não há problema",
              "O retrabalho subiu porque as pessoas estão mais rápidas",
              "Parar de medir cartões movidos e medir só reimpressões",
              "Olhar os dois juntos: a produtividade aparente pode estar escondendo retrabalho"
            ],
            "correta": 3,
            "feedbackCerto": "Certo. Indicadores se leem em conjunto, sempre com dados confiáveis.",
            "feedbackPorOpcao": [
              "Uma métrica isolada engana. O retrabalho também subiu.",
              "Sem dados da causa, é suposição. Investigue antes de concluir.",
              "Um único indicador também engana. O ideal é combinar e perguntar que decisão cada um apoia.",
              null
            ]
          },
          {
            "tipo": "selecionar_itens",
            "competencia": "qualidade_melhoria",
            "pergunta": "Quais destes são bons critérios para escolher um indicador?",
            "itens": [
              "Ajuda a tomar uma decisão",
              "Os dados são confiáveis",
              "Pode ser lido junto com outros indicadores",
              "É fácil de contar, mesmo que ninguém use",
              "Serve para apontar quem errou mais"
            ],
            "corretos": [
              0,
              1,
              2
            ],
            "feedbackCerto": "Certo. Indicador bom apoia decisão, tem dado confiável e se lê em conjunto.",
            "feedbackErrado": "Fácil de contar e punir não são bons critérios. Indicador serve para decidir."
          },
          {
            "tipo": "texto_livre",
            "competencia": "qualidade_melhoria",
            "pergunta": "Escolha um indicador (prazo, retrabalho, gargalo, produtividade, qualidade ou capacidade) e diga que decisão ele ajudaria a tomar, qual dado seria preciso e que outro indicador você leria junto.",
            "pontosEsperados": [
              "Liga o indicador a uma decisão concreta",
              "Cita a fonte de dados e sua confiabilidade",
              "Combina com outro indicador",
              "Não inventa meta numérica da Valente"
            ]
          }
        ]
      },
      {
        "dia": 10,
        "titulo": "Missão Gestão: um dia problemático",
        "subtitulo": "Aplicar o fluxo inteiro num dia de imprevistos",
        "etapas": [
          {
            "tipo": "conteudo",
            "titulo": "O cenário",
            "texto": "Hoje é um dia difícil, fictício, de treinamento. Uma impressora parou. Surgiu um pedido urgente. Há uma reimpressão em andamento. Um colega faltou. E chegaram novos pedidos. Tudo ao mesmo tempo. Não existe ponto extra por declarar tudo prioridade. A avaliação olha coerência, rastreabilidade das decisões e uso correto da autonomia."
          },
          {
            "tipo": "conteudo",
            "titulo": "O roteiro do gestor",
            "texto": "Use a sequência do curso. Primeiro levante os fatos: o que parou, o que está em andamento, quem está presente. Proteja segurança e qualidade. Identifique o gargalo atual. Priorize com critério e registre o motivo. Redistribua apenas para pessoas qualificadas. Comunique o impacto de prazo antes do vencimento. Quando faltar informação, consulte a fonte e o responsável. Não invente."
          },
          {
            "tipo": "cenario",
            "competencia": "priorizacao",
            "titulo": "Um dia problemático",
            "noInicial": "a",
            "nos": {
              "a": {
                "cliente": "Logo cedo: a impressora 2 parou com um lote pela metade, um colega avisou que faltará hoje, e o Comercial pede para encaixar um pedido urgente. O que você faz primeiro?",
                "opcoes": [
                  {
                    "label": "Levanto os fatos: o que está parado, o estado do lote, quem está presente e o que está na fila, e só depois decido.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Fatos antes de decisões.",
                    "proximo": "b"
                  },
                  {
                    "label": "Aceito o urgente na hora para não perder o cliente e vejo depois como resolver.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Prometer sem dados de capacidade é o erro de otimismo que o curso ensinou.",
                    "proximo": "b"
                  },
                  {
                    "label": "Peço à equipe que tente fazer tudo ao mesmo tempo, tudo é urgente hoje.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Tudo urgente elimina a prioridade e sobrecarrega.",
                    "proximo": "b"
                  },
                  {
                    "label": "Troco todo o plano da semana sem olhar o quadro.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Sem leitura do quadro, a decisão não tem base.",
                    "proximo": "b"
                  }
                ]
              },
              "b": {
                "cliente": "Fatos levantados: a máquina parada precisa de verificação, a pós-impressão está cheia, e o colega ausente era o único liberado em pintura. O urgente chegou. Como redistribuir?",
                "opcoes": [
                  {
                    "label": "Priorizo por critério, protejo o que está quase pronto, e passo a pintura apenas a quem está Liberado, com supervisão para quem está em prática supervisionada.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Critério, continuidade e qualificação.",
                    "proximo": "c"
                  },
                  {
                    "label": "Passo a pintura a quem estiver livre, sem checar status de competência.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Livre não é liberado. Risco de retrabalho.",
                    "proximo": "c"
                  },
                  {
                    "label": "Peço que a máquina parada volte a funcionar logo, mesmo que sem verificar a causa.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Voltar sem verificar é ignorar segurança e qualidade.",
                    "proximo": "c"
                  },
                  {
                    "label": "Mando imprimir tudo que entrou para ocupar as máquinas.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Imprimir mais sem capacidade nas etapas seguintes só desloca o gargalo.",
                    "proximo": "c"
                  }
                ]
              },
              "c": {
                "cliente": "No fim do dia, o prazo de dois pedidos está em risco. O Comercial pergunta como está. Como você responde?",
                "opcoes": [
                  {
                    "label": "Informo o risco antes do vencimento, com dados do fluxo, o que mudou, o que permanece em risco e a nova previsão confirmada na fonte.",
                    "correta": true,
                    "erroCritico": false,
                    "feedback": "Certo. Comunicação antecipada e baseada em dados."
                  },
                  {
                    "label": "Digo que está tudo certo e resolvo depois.",
                    "correta": false,
                    "erroCritico": true,
                    "feedback": "Esconder risco é informação falsa."
                  },
                  {
                    "label": "Digo que atrasou por culpa do colega que faltou.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Culpar não ajuda e não é fato verificado. Comunique impacto e plano."
                  },
                  {
                    "label": "Não respondo até ter certeza total do prazo.",
                    "correta": false,
                    "erroCritico": false,
                    "feedback": "Silêncio atrapalha. Comunique o risco e diga o que ainda precisa ser confirmado."
                  }
                ]
              }
            }
          },
          {
            "tipo": "missao",
            "competencia": "priorizacao",
            "titulo": "Missão Gestão: um dia problemático",
            "objetivo": "Montar o plano de um dia de imprevistos usando o fluxo do curso, sem inventar regras e sem alterar dados reais.",
            "contexto": "Treinamento fictício. Uma impressora parou, há um pedido urgente, uma reimpressão em andamento, um colega faltou e entraram novos pedidos. A equipe é pequena e as funções são delegadas.",
            "tarefas": [
              "Liste os fatos conhecidos e o que ainda precisa ser confirmado, indicando a fonte",
              "Descreva os critérios de prioridade que usou e o motivo de cada decisão",
              "Identifique o gargalo atual e a causa provável antes de cobrar velocidade",
              "Redistribua tarefas apenas para pessoas qualificadas, citando o status de competência",
              "Separe a correção imediata da ação preventiva para a falha ocorrida",
              "Escreva o que comunicaria ao Comercial sobre o impacto de prazo, os riscos que permanecem e quem precisa ser avisado"
            ],
            "criterioConclusao": "Você registrou o plano, o que foi alterado, os riscos que permanecem e quem deve ser comunicado, sem inventar números ou regras da Valente."
          }
        ]
      }
    ]
  },
  // Trilhas futuras entram aqui do mesmo jeito, por exemplo:
  // producao: { id: 'producao', nome: 'Produção 3D', cargosPermitidos: ['producao'], dias: [...] },
  // pintura:  { id: 'pintura',  nome: 'Pintura',       cargosPermitidos: ['producao','pintura'], dias: [...] },
  // etc. — nenhuma mudança necessária em treinamento.js pra isso funcionar.
};

// Rótulos das competências dos cursos novos (usados na tela de resultado).
var TREIN_COMPETENCIA_NOME_EXTRA = {
  "visao_processo": "Visão do processo",
  "fluxo_kanban": "Fluxo e Kanban",
  "uso_valente_os": "Uso do Valente OS",
  "informacao_completa": "Informação completa",
  "responsabilidade": "Responsabilidade",
  "seguranca_qualidade": "Qualidade e segurança",
  "organizacao_trabalho": "Organização do trabalho de modelagem",
  "leitura_briefing": "Leitura de briefing e referências",
  "escala_medidas": "Escala e medidas",
  "modelagem_fabricacao": "Modelagem para fabricação",
  "organizacao_versoes": "Arquivos e versões",
  "versionamento": "Correções e controle de versão",
  "conferencia_liberacao": "Conferência e liberação",
  "entrega_producao": "Entrega para a produção",
  "estacao_seguranca": "Estação e segurança",
  "leitura_ot": "Leitura da OT",
  "processos_fatiamento": "Processos e fatiamento",
  "preparo_acompanhamento": "Preparo e acompanhamento",
  "inspecao_falhas": "Inspeção e falhas",
  "liberacao_pos": "Liberação para pós-impressão",
  "organizacao_bancada": "Organização da bancada",
  "conferencia_recebimento": "Conferência de recebimento",
  "seguranca_resina": "Segurança com resina",
  "remocao_suportes": "Remoção de suportes",
  "acabamento_superficie": "Acabamento de superfície",
  "qualidade_entrega": "Qualidade e entrega",
  "preparacao_estacao": "Estação de pintura",
  "leitura_pedido": "Leitura do pedido",
  "preparacao_superficie": "Preparação da superfície",
  "fidelidade_cor": "Fidelidade à cor",
  "tecnica_pintura": "Técnicas de pintura",
  "inspecao_liberacao": "Inspeção e liberação",
  "conferencia_pedido": "Conferência do pedido",
  "conferencia_final": "Conferência final",
  "embalagem_protecao": "Embalagem e proteção",
  "identificacao_envio": "Identificação do pacote",
  "dados_envio": "Dados de envio",
  "despacho_kanban": "Despacho e Kanban",
  "leitura_kanban": "Leitura do Kanban",
  "priorizacao": "Priorização",
  "capacidade_fluxo": "Capacidade e fluxo",
  "gargalos": "Gargalos",
  "qualidade_melhoria": "Qualidade e melhoria",
  "distribuicao_trabalho": "Distribuição de trabalho"
};
