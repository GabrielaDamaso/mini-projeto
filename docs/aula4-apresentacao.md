# Roteiro de apresentação — Laboratório Aula 4 (até 10 minutos)

Os campos de links abaixo devem ser preenchidos somente depois de existirem runs reais. Não declare aprovação, rollback ou resultados de IA sem conferir os Summaries e artefatos.

## 1. Problema e contexto — 1 minuto

Apresente o conversor Celsius/Fahrenheit, explique que é um front-end estático sem backend e mostre brevemente a tela. O laboratório demonstra como levar controles de DevOps e IA generativa a esse projeto sem inventar endpoints.

**Run CI:** [inserir link real após execução]

## 2. Solução — 2 minutos

Mostre os workflows e scripts. Explique a ordem de segurança: regra fixa primeiro; IA avalia somente quando a regra permite; resposta inválida, indisponibilidade ou ausência de chave resulta na opção segura. As métricas consultam a página `/` servida localmente, e o helper limita a 6000 caracteres do material enviado à Groq.

**Run Blue/Green:** [inserir link real após execução]

## 3. Demonstração — 3 minutos

Abra um run `normal` e um `com_falha` do Blue/Green. No Canary, apresente os runs `normal`, `com_falha` e `lentidao`; mostre as etapas 10%, 50% e 100%, a regra fixa, a decisão, a ação e os JSONs de métricas. Explique SAST, revisão por IA e pausa do job de produção até aprovação humana.

- Blue/Green `normal`: [inserir link real]
- Blue/Green `com_falha`: [inserir link real]
- Canary `normal`: [inserir link real]
- Canary `com_falha`: [inserir link real]
- Canary `lentidao`: [inserir link real]
- Pipeline aguardando/aprovada: [inserir link real]

## 4. Prompt injection e ética — 2 minutos

Mostre a fixture de ataque, compare as três abordagens usando os resultados realmente produzidos e explique que o comportamento do modelo pode variar. Comente os limites de envio de dados, a necessidade de remover informações sensíveis e o papel da opção segura e da aprovação humana.

**Evidência de prompt injection:** [inserir caminho e link real após execução]

## 5. Conclusão e limitações — 1 minuto

Recapitule o papel dos testes, SAST e regras determinísticas. Reforce que os servidores e a medição são simulações locais: não representam publicação de verdade, tráfego real ou todos os riscos de produção. Termine indicando o que ainda depende de configuração manual do secret e do Environment `producao`.
