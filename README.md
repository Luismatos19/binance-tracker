# Binance Watchlist

Aplicação web para criação de watchlists personalizadas com pares de ativos da Binance, exibindo cotações em tempo real via WebSocket.

<h4 align="center"> 
	A aplicaçãp pode ser acessada pelo site (https://binance-tracker.vercel.app/)]())
</h4>

## Funcionalidades

- Criação e gerenciamento de múltiplas listas de ativos
- Adição e remoção dinâmica de pares de símbolos
- Atualizações em tempo real com WebSocket oficial da Binance
- Interface responsiva (desktop e mobile)
- Persistência local com Zustand + localStorage
- Testes unitários e de integração com cobertura

## Tecnologias Utilizadas

- **React 18**
- **Vite**
- **TypeScript**
- **Zustand**
- **Tailwind CSS**
- **WebSocket API**
- **Vitest** e **Testing Library**

## Principais Dependências

| Biblioteca                 | Descrição                                        |
|---------------------------|--------------------------------------------------|
| `zustand`                 | Gerenciamento global de estado                   |
| `tailwindcss`             | Estilização com utilitários CSS                  |
| `@testing-library/react` | Testes de componentes React                      |
| `vitest`                  | Executor de testes moderno                       |
| `jsdom`                   | Ambiente simulado de navegador nos testes       |

## Como Executar o Projeto

### Requisitos

- Node.js 18 ou superior
- npm ou yarn

### Instalação

```bash
npm install
