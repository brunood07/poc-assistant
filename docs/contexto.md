# 📘 Contexto do Projeto: Sistema de Gestão de Tarefas

## 🧠 Regras de Negócio

- Cada usuário pode criar, editar e excluir suas próprias tarefas.
- Tarefas podem ter status: `pendente`, `em andamento`, `concluída`.
- Um usuário não pode ver ou editar tarefas de outro usuário.
- Tarefas devem ter prazos definidos (data de vencimento).
- Tarefas vencidas não podem ser marcadas como "em andamento".
- Usuários podem se registrar com e-mail e senha (com validação de formato).

## 🧱 Arquitetura do Projeto

- Utilizar arquitetura **MVC (Model-View-Controller)**.
- Separar responsabilidades:
  - `controllers/`: recebem requisições e retornam respostas.
  - `services/`: lógica de negócio (sem acesso direto ao banco).
  - `repositories/`: acesso ao banco de dados.
  - `middlewares/`: autenticação, validações.
- Sem lógica de negócio em `controllers`.

## ✨ Padrões de Código

- Código em **JavaScript/TypeScript** com Node.js.
- Usar **camelCase** para variáveis e funções.
- Usar **PascalCase** para classes.
- Cada arquivo deve conter **apenas uma classe ou função principal**.
- Evitar funções com mais de 30 linhas.
- Documentar funções com JSDoc (ou TSDoc se for TypeScript).

## 🔐 Segurança

- Rotas protegidas devem exigir token JWT válido.
- Senhas devem ser salvas com hash (bcrypt).
- Nunca retornar a senha do usuário na API.
- Validações de entrada obrigatórias em todas as rotas POST e PUT.

## 🗂️ Estrutura de Pastas

src/
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── models/
├── routes/
└── utils/

## ✅ Boas Práticas

- Tratar erros com try/catch em todos os `services`.
- Reutilizar código com `utils/` sempre que possível.
- Adicionar testes automatizados para cada serviço.
- Separar rotas públicas e privadas.
- Usar `.env` para configurações sensíveis (chaves, URL de DB).

## 📥 Exemplo de Nome de Arquivo

- `taskController.ts`, `userService.ts`, `authMiddleware.ts`
- Arquivos devem refletir a responsabilidade contida.
