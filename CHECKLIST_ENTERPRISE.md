# CHECKLIST ENTERPRISE - THE FORGE // NEXUS

Este checklist organiza a evolução da The Forge como uma plataforma fitness premium, escalável e respeitada no mercado. A meta não é apenas "ter um site bonito", mas construir uma empresa digital completa: produto forte, marca memorável, operação confiável, comunidade ativa, receita recorrente e tecnologia pronta para crescer.

## Legenda

- `[x]` Já existe no frontend atual.
- `[ ]` Precisa ser criado, integrado ou refinado.
- `P0` Essencial para lançar com credibilidade.
- `P1` Importante para escalar.
- `P2` Diferencial de marca grande.

## 1. Posicionamento e Marca

- [x] P0 Nome e conceito principal: `THE FORGE // NEXUS`.
- [x] P0 Estética futurista, cyberpunk premium e alto contraste.
- [x] P0 Promessa central: forjar corpo, mente e disciplina.
- [ ] P0 Definir manifesto oficial da marca.
- [ ] P0 Criar slogan curto para campanhas.
- [ ] P0 Criar tom de voz: militar premium, tecnológico, disciplinado e motivacional.
- [ ] P0 Definir persona principal: iniciante disciplinado, atleta amador, hipertrofia, corrida, emagrecimento.
- [ ] P0 Definir diferenciais claros contra academias, apps genéricos e consultorias comuns.
- [ ] P1 Criar guia de marca com cores, tipografia, iconografia, motion e uso do logo.
- [ ] P1 Criar variações de logo: horizontal, vertical, ícone, selo, avatar social.
- [ ] P1 Criar identidade verbal para nomes de planos, treinos, níveis e produtos.
- [ ] P2 Criar narrativa de universo: facções, protocolos, rankings, missões e temporadas.

## 2. Experiência Visual e UI/UX

- [x] P0 Header fixo com transparência.
- [x] P0 Menu mobile funcional.
- [x] P0 Tela cinematográfica de abertura.
- [x] P0 Hero principal com portal futurista.
- [x] P0 Cards holográficos com hover e brilho neon.
- [x] P0 Glassmorphism, partículas, scanner e HUD visual.
- [x] P0 Layout responsivo desktop/mobile.
- [x] P0 Scroll suave.
- [x] P0 Revisar contraste real por WCAG em todos os textos.
- [x] P0 Criar estados consistentes de loading, vazio, erro e sucesso.
- [x] P0 Criar design tokens formais: cores, spacing, radius, sombras, blur, z-index.
- [x] P0 Criar componentes base reutilizáveis: Button, Card, Badge, Section, Modal, Tabs, Progress, Toast.
- [x] P1 Adicionar microinterações por contexto: compra, protocolo iniciado, XP ganho, link copiado.
- [x] P1 Criar versão reduzida de animações para usuários com `prefers-reduced-motion`.
- [x] P1 Criar dark premium refinado com menos ruído visual em áreas de leitura longa.
- [x] P1 Criar sistema de notificações in-app.
- [ ] P2 Criar cena 3D ou WebGL para o portal Nexus.
- [ ] P2 Criar avatares futuristas, badges e assets próprios da marca.

## 3. Arquitetura Frontend

- [x] P0 React com Vite.
- [x] P0 Tailwind CSS.
- [x] P0 Framer Motion.
- [x] P0 Lucide React.
- [x] P0 Componentes organizados em `src/components`.
- [x] P0 Dados mockados em `src/data`.
- [x] P0 Configurar ESLint e Prettier.
- [x] P0 Adicionar aliases de import, por exemplo `@/components`.
- [x] P0 Separar constantes visuais e dados de navegação.
- [x] P0 Criar camada de tipos com TypeScript ou JSDoc consistente.
- [ ] P1 Migrar para TypeScript.
- [x] P1 Criar testes unitários com Vitest.
- [ ] P1 Criar testes de interface com Playwright.
- [ ] P1 Criar Storybook ou Ladle para catálogo de componentes.
- [x] P2 Criar design system interno `Forge UI`.

## 4. Training Core

- [x] P0 Catálogo com Emagrecimento, Hipertrofia, Corrida, Funcional, Treino em Casa e Iniciante.
- [x] P0 Cards com nome, nível, duração, objetivo e botão.
- [ ] P0 Criar páginas individuais de cada protocolo.
- [ ] P0 Adicionar detalhes do treino: aquecimento, blocos, séries, descanso, finalização.
- [ ] P0 Adicionar filtros por objetivo, nível, duração, local e equipamento.
- [ ] P0 Adicionar busca de treinos.
- [ ] P0 Criar CTA real para iniciar protocolo.
- [ ] P1 Criar progressão semanal.
- [ ] P1 Criar histórico de treinos concluídos.
- [ ] P1 Criar favoritos e treinos salvos.
- [ ] P1 Criar biblioteca de exercícios com vídeos ou animações.
- [ ] P1 Criar plano adaptativo por disponibilidade semanal.
- [ ] P2 Criar integração com wearables e dados biométricos.
- [ ] P2 Criar periodização avançada com ciclos, deload e metas.

## 5. Forge Market

- [x] P0 Marketplace visual com seis produtos mockados.
- [x] P0 Cards com preço fictício, tag e botão de WhatsApp.
- [x] P0 Placeholders futuristas sem dependência de imagens externas.
- [ ] P0 Trocar número mockado do WhatsApp por configuração real.
- [ ] P0 Criar página de produto com descrição, benefícios, tamanhos, composição e garantia.
- [ ] P0 Criar carrinho ou fluxo claro de compra.
- [ ] P0 Definir política de entrega, troca e devolução.
- [ ] P0 Definir SKUs, estoque e categorias.
- [ ] P1 Integrar checkout real: Stripe, Mercado Pago, Shopify ou WooCommerce.
- [ ] P1 Criar cupons, bundles e upsell.
- [ ] P1 Criar avaliações e prova social.
- [ ] P1 Criar tracking de compra e funil.
- [ ] P2 Criar drops limitados, lista de espera e acesso VIP.
- [ ] P2 Criar produtos digitais: e-books, desafios, planos premium e consultorias.

## 6. Knowledge Vault

- [x] P0 Área com conteúdos sobre treino, nutrição, disciplina, corrida, recuperação e mentalidade.
- [x] P0 Cards premium de artigos.
- [ ] P0 Criar página de artigo.
- [ ] P0 Criar categorias, tags e busca.
- [ ] P0 Criar conteúdos reais com autoria e revisão.
- [ ] P0 Definir calendário editorial.
- [ ] P1 Integrar CMS: Sanity, Strapi, Contentful ou markdown remoto.
- [ ] P1 Adicionar SEO por artigo: title, description, Open Graph e schema.
- [ ] P1 Criar newsletter e captura de lead.
- [ ] P1 Criar materiais ricos: checklists, guias, calculadoras e e-books.
- [ ] P2 Criar Vault premium com assinatura.
- [ ] P2 Criar trilhas de aprendizado por objetivo.

## 7. Discipline Lab

- [x] P0 Níveis: Recruta, Soldado, Guerreiro, Elite, Lenda e Forjado.
- [x] P0 Barra de XP.
- [x] P0 Missões diárias.
- [x] P0 Conquistas.
- [ ] P0 Definir regras reais de XP.
- [ ] P0 Criar sistema de check-in diário.
- [ ] P0 Criar calendário de streak.
- [ ] P0 Criar ranking por período: diário, semanal, mensal e temporada.
- [ ] P1 Persistir XP por usuário.
- [ ] P1 Criar badges desbloqueáveis.
- [ ] P1 Criar penalidades leves por abandono e recompensas por retorno.
- [ ] P1 Criar missões por perfil: iniciante, corrida, força, casa, emagrecimento.
- [ ] P2 Criar temporadas com tema, narrativa e recompensas.
- [ ] P2 Criar squads ou equipes dentro da comunidade.

## 8. AI Coach

- [x] P0 Chat visual fake.
- [x] P0 Perguntas de objetivo, disponibilidade e local de treino.
- [x] P0 Resposta fake: protocolo personalizado gerado com sucesso.
- [x] P0 Botão de geração.
- [ ] P0 Criar formulário real com objetivo, nível, dias, lesões, equipamentos e restrições.
- [ ] P0 Criar resultado estruturado do protocolo.
- [ ] P0 Adicionar aviso de segurança: não substitui médico, nutricionista ou educador físico.
- [ ] P1 Conectar IA real via backend.
- [ ] P1 Criar prompt engineering seguro e versionado.
- [ ] P1 Criar validações para respostas perigosas ou inadequadas.
- [ ] P1 Criar histórico de protocolos gerados.
- [ ] P1 Criar ajustes por feedback do usuário.
- [ ] P2 Criar coach multimodal com voz, imagem de execução e análise de treino.
- [ ] P2 Criar integração com calendário, notificações e wearables.

## 9. Afiliados

- [x] P0 Seção explicando compartilhamento, indicação, cliques, vendas e comissões.
- [x] P0 Card com exemplo `theforge.com/ref/usuario123`.
- [x] P0 Botão para entrar no programa.
- [x] P0 Botão de copiar link.
- [ ] P0 Criar regulamento do programa.
- [ ] P0 Definir comissão, janela de atribuição, prazo de pagamento e regras antifraude.
- [ ] P0 Criar cadastro real de afiliado.
- [ ] P0 Criar painel com cliques, leads, vendas, conversão e comissão.
- [ ] P1 Criar links rastreáveis reais.
- [ ] P1 Criar cupons por afiliado.
- [ ] P1 Criar materiais de divulgação.
- [ ] P1 Criar ranking de afiliados.
- [ ] P1 Criar pagamentos automatizados.
- [ ] P2 Criar níveis de afiliado: Operador, Agente, Comandante, Lenda.

## 10. Comunidade

- [x] P0 Chamada para grupo VIP.
- [x] P0 Itens: desafios mensais, ranking, evolução dos membros e suporte.
- [x] P0 Botão de WhatsApp.
- [ ] P0 Trocar número mockado por grupo/canal oficial.
- [ ] P0 Criar onboarding de novos membros.
- [ ] P0 Criar regras da comunidade.
- [ ] P0 Criar calendário de desafios mensais.
- [ ] P1 Criar painel público de ranking.
- [ ] P1 Criar posts de evolução de membros.
- [ ] P1 Criar moderação e suporte.
- [ ] P1 Criar automações de boas-vindas e lembretes.
- [ ] P2 Criar comunidade própria dentro da plataforma.
- [ ] P2 Criar eventos ao vivo, mentorias e desafios patrocinados.

## 11. Autenticação e Área do Usuário

- [ ] P0 Criar login e cadastro.
- [ ] P0 Criar perfil do usuário.
- [ ] P0 Criar painel inicial com progresso, treino de hoje, XP e missões.
- [ ] P0 Criar recuperação de senha.
- [ ] P0 Criar aceite de termos e política de privacidade.
- [ ] P1 Criar assinatura e plano ativo.
- [ ] P1 Criar preferências de treino.
- [ ] P1 Criar upload de foto/avatar.
- [ ] P1 Criar notificações.
- [ ] P2 Criar identidade visual de operador com card compartilhável.

## 12. Backend e Dados

- [ ] P0 Escolher stack backend: Node/Nest, Next API, Supabase, Firebase ou Laravel.
- [ ] P0 Criar banco de dados.
- [ ] P0 Modelar entidades principais: User, Training, Exercise, Product, Order, Article, Mission, XP, Affiliate, Referral, Community.
- [ ] P0 Criar API REST ou GraphQL.
- [ ] P0 Criar validação de entrada.
- [ ] P0 Criar autenticação com JWT/session segura.
- [ ] P1 Criar roles: admin, coach, cliente, afiliado, suporte.
- [ ] P1 Criar painel administrativo.
- [ ] P1 Criar logs de atividade.
- [ ] P1 Criar fila de jobs para emails, WhatsApp e relatórios.
- [ ] P2 Criar arquitetura multi-tenant para franquias, academias e coaches parceiros.

## 13. Pagamentos e Receita

- [ ] P0 Definir modelo de negócio: assinatura, produtos, afiliados, consultoria, desafios pagos.
- [ ] P0 Criar planos: Starter, Pro, Elite ou nomes próprios do universo The Forge.
- [ ] P0 Criar página de preços.
- [ ] P0 Integrar gateway de pagamento.
- [ ] P0 Criar webhooks de pagamento.
- [ ] P0 Criar controle de acesso por plano.
- [ ] P1 Criar trial, cupom e recuperação de carrinho.
- [ ] P1 Criar nota fiscal/recibos conforme operação.
- [ ] P1 Criar cobrança recorrente.
- [ ] P2 Criar B2B para empresas, boxes, academias e assessorias.

## 14. Analytics, Growth e Marketing

- [ ] P0 Instalar analytics: GA4, Plausible ou PostHog.
- [ ] P0 Medir eventos: clique CTA, protocolo iniciado, WhatsApp, produto, afiliado, scroll e cadastro.
- [ ] P0 Configurar pixels de mídia paga.
- [ ] P0 Criar landing pages por campanha.
- [ ] P0 Criar funil: visitante -> lead -> usuário -> comprador -> membro ativo.
- [ ] P1 Criar dashboard de conversão.
- [ ] P1 Criar testes A/B de hero, CTA e pricing.
- [ ] P1 Criar automação de email/WhatsApp.
- [ ] P1 Criar campanha de remarketing.
- [ ] P2 Criar programa de embaixadores e collabs com influenciadores.

## 15. SEO e Presença Pública

- [ ] P0 Criar metadata completa por página.
- [ ] P0 Criar Open Graph para compartilhamento.
- [ ] P0 Criar sitemap e robots.
- [ ] P0 Otimizar títulos, descrições e estrutura semântica.
- [ ] P0 Criar páginas indexáveis para treinos, artigos, produtos e afiliados.
- [ ] P1 Criar blog com estratégia de palavras-chave.
- [ ] P1 Criar schema.org para artigos, produtos e organização.
- [ ] P1 Criar performance forte em Core Web Vitals.
- [ ] P2 Criar páginas programáticas para objetivos fitness.

## 16. Acessibilidade e Inclusão

- [ ] P0 Garantir navegação por teclado.
- [ ] P0 Garantir foco visível em botões e links.
- [ ] P0 Revisar labels e aria em componentes interativos.
- [ ] P0 Validar contraste de textos em cards e badges.
- [ ] P0 Respeitar `prefers-reduced-motion`.
- [ ] P1 Testar com leitor de tela.
- [ ] P1 Adicionar textos alternativos em imagens futuras.
- [ ] P1 Garantir que animações não bloqueiem conteúdo essencial.
- [ ] P2 Criar modo leitura para conteúdos longos.

## 17. Performance

- [ ] P0 Auditar bundle final.
- [ ] P0 Evitar animações pesadas em dispositivos fracos.
- [ ] P0 Otimizar CSS e componentes.
- [ ] P0 Lazy load de seções não críticas.
- [ ] P1 Otimizar assets reais quando forem adicionados.
- [ ] P1 Usar code splitting por rota.
- [ ] P1 Medir LCP, CLS, INP e TTFB.
- [ ] P2 Criar versão PWA com cache inteligente.

## 18. Segurança e LGPD

- [ ] P0 Criar política de privacidade.
- [ ] P0 Criar termos de uso.
- [ ] P0 Criar consentimento para cookies e tracking.
- [ ] P0 Definir dados pessoais coletados e finalidade.
- [ ] P0 Proteger formulários contra spam e abuso.
- [ ] P1 Criar exclusão/exportação de dados do usuário.
- [ ] P1 Criar registro de consentimentos.
- [ ] P1 Criar políticas de retenção de dados.
- [ ] P1 Criar rate limiting no backend.
- [ ] P2 Criar auditoria de segurança periódica.

## 19. Qualidade e QA

- [ ] P0 Checklist manual de desktop e mobile.
- [ ] P0 Testar Chrome, Edge, Safari mobile e Android.
- [ ] P0 Testar todos os CTAs.
- [ ] P0 Testar menu mobile.
- [ ] P0 Testar links externos.
- [ ] P0 Testar ausência de overflow horizontal.
- [ ] P1 Testes automatizados de componentes.
- [ ] P1 Testes end-to-end de jornada principal.
- [ ] P1 Testes visuais de regressão.
- [ ] P1 Testes de acessibilidade automatizados.
- [ ] P2 Testes de carga para backend e APIs.

## 20. DevOps e Operação

- [ ] P0 Configurar deploy: Vercel, Netlify, Cloudflare Pages ou AWS.
- [ ] P0 Configurar domínio oficial.
- [ ] P0 Configurar HTTPS.
- [ ] P0 Criar ambientes: local, staging e produção.
- [ ] P0 Configurar variáveis de ambiente.
- [ ] P1 Configurar CI/CD.
- [ ] P1 Rodar build, lint e testes no pipeline.
- [ ] P1 Configurar observabilidade: logs, erros e métricas.
- [ ] P1 Configurar backup do banco.
- [ ] P2 Criar status page pública.

## 21. Atendimento e Customer Success

- [ ] P0 Criar canal oficial de suporte.
- [ ] P0 Criar FAQ.
- [ ] P0 Criar base de conhecimento.
- [ ] P0 Criar fluxo de onboarding.
- [ ] P1 Criar tickets e SLAs.
- [ ] P1 Criar pesquisas NPS.
- [ ] P1 Criar playbook de retenção.
- [ ] P1 Criar fluxo de cancelamento com feedback.
- [ ] P2 Criar concierge premium para membros Elite.

## 22. Conteúdo, Autoridade e Reputação

- [ ] P0 Validar conteúdos técnicos com profissionais qualificados.
- [ ] P0 Ter disclaimer de saúde e segurança.
- [ ] P0 Criar página "Sobre a The Forge".
- [ ] P0 Criar prova social real.
- [ ] P1 Criar estudos de caso de membros.
- [ ] P1 Criar certificações, parceiros e advisors.
- [ ] P1 Criar canal no YouTube/TikTok/Instagram com identidade consistente.
- [ ] P2 Criar evento anual ou desafio oficial da marca.

## 23. Internacionalização e Escala

- [ ] P1 Preparar arquitetura para múltiplos idiomas.
- [ ] P1 Separar textos da UI em arquivos de tradução.
- [ ] P1 Preparar moedas e formatos regionais.
- [ ] P2 Criar versão em inglês.
- [ ] P2 Criar expansão por unidades, academias ou representantes.

## 24. Critérios de Pronto para Lançamento Premium

- [ ] P0 O site abre rápido em desktop e mobile.
- [ ] P0 Todas as seções principais têm CTA funcional.
- [ ] P0 WhatsApp, Instagram e links oficiais estão corretos.
- [ ] P0 Copy revisada e sem placeholders visíveis indevidos.
- [ ] P0 Política de privacidade e termos publicados.
- [ ] P0 Analytics instalado.
- [ ] P0 Formulário ou fluxo de lead funcionando.
- [ ] P0 Página de preços ou oferta clara.
- [ ] P0 Conteúdo mínimo real no Knowledge Vault.
- [ ] P0 Produtos com informações mínimas reais.
- [ ] P0 Teste final em celular físico.
- [ ] P0 Backup do código e deploy versionado.

## 25. Roadmap Recomendado

### Fase 1 - Fundamento Premium

- [ ] Refinar design system.
- [ ] Criar páginas internas de treinos, produtos e artigos.
- [ ] Substituir mocks críticos por conteúdo real.
- [ ] Configurar analytics e links oficiais.
- [ ] Publicar em domínio próprio.

### Fase 2 - Produto Real

- [ ] Criar login.
- [ ] Criar dashboard do membro.
- [ ] Persistir XP, missões e histórico.
- [ ] Integrar pagamentos.
- [ ] Criar painel administrativo.

### Fase 3 - Escala e Receita

- [ ] Integrar marketplace real.
- [ ] Criar afiliados reais.
- [ ] Criar automações de WhatsApp/email.
- [ ] Criar ranking e comunidade integrada.
- [ ] Criar CMS para artigos e protocolos.

### Fase 4 - Empresa Gigante

- [ ] Criar IA real com segurança e personalização.
- [ ] Criar app mobile ou PWA avançado.
- [ ] Integrar wearables.
- [ ] Criar B2B para academias e empresas.
- [ ] Criar ecossistema de eventos, produtos, desafios e conteúdo premium.

## 26. KPIs de Empresa Grande

- [ ] Visitantes únicos mensais.
- [ ] Taxa de conversão visitante -> lead.
- [ ] Taxa de conversão lead -> comprador.
- [ ] Receita mensal recorrente.
- [ ] Ticket médio.
- [ ] Retenção mensal.
- [ ] Churn.
- [ ] Treinos concluídos por usuário.
- [ ] Streak médio.
- [ ] XP médio por semana.
- [ ] Produtos vendidos.
- [ ] Conversão por afiliado.
- [ ] CAC.
- [ ] LTV.
- [ ] NPS.

## 27. Próximas 10 Ações Mais Inteligentes

1. [ ] Trocar todos os contatos mockados por contatos reais.
2. [ ] Criar páginas internas para `Training Core`, `Forge Market` e `Knowledge Vault`.
3. [ ] Criar formulário real do `AI Coach`.
4. [ ] Criar página de preços/oferta.
5. [ ] Criar política de privacidade e termos.
6. [ ] Configurar analytics e eventos de CTA.
7. [ ] Criar conteúdo real inicial: 6 artigos e 6 protocolos completos.
8. [ ] Criar deploy em domínio próprio.
9. [ ] Criar fluxo de captura de lead.
10. [ ] Planejar backend com usuários, XP, pagamentos e afiliados.
