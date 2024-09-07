# 📝 Todo List - Frontend

- [📝 Todo List - Frontend](#-todo-list---frontend)
  - [📜 Description](#-description)
  - [✨ Features](#-features)
  - [🛠️ Stack](#️-stack)
  - [🖥️ Setup Steps](#️-setup-steps)
  - [📚 Project Structure](#-project-structure)
  - [� License](#-license)

## 📜 Description

Welcome to the Todo List frontend project! This application allows users to manage tasks using a beautiful, responsive UI built with React, Zustand, Tailwind CSS, and ShadCN UI. We also use React Query for fetching tasks and Axios for API communication.

## ✨ Features

- Task Management: Create, view, and manage tasks.
- Responsive UI: Built with Tailwind CSS, optimized for all screen sizes.
- State Management: Lightweight state management using Zustand.
- Design System: Consistent and accessible components with ShadCN UI.
- Clean Architecture: Feature-based project structure for scalability and maintainability.

## 🛠️ Stack

- React: JavaScript library for building user interfaces.
- Zustand: State management for storing tasks.
- Tailwind CSS: Utility-first CSS framework for rapid styling.
- ShadCN UI: A design system for building consistent, accessible UIs.
- React Query: For server state management and data fetching.
- Axios: For making HTTP requests.

## 🖥️ Setup Steps

1. Install Node.js
   Before getting started, make sure Node.js is installed on your machine. Node.js includes npm, which will be used to install PNPM.

Download and install Node.js
Verify the installation of Node.js and npm by running the following command:

```bash
node -v
npm -v
```

2. Install PNPM globally
   If PNPM is not already installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

Verify that PNPM has been installed correctly:

```bash
pnpm -v
```

3. Clone the repository

```bash
git clone https://github.com/yourusername/todo-list-web.git
cd todo-list-web
```

4. Install PNPM:

```bash
npm install -g pnpm
```

5. Install dependencies using PNPM:

```bash
pnpm install
```

6. Create a .env file:
   Create a `.env` file in the root of the project with the following variables:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

7. Start the development server:

```bash
pnpm start
```

8. Execute unit tests:

```bash
pnpm test
```

9.  Build the project for production:

```bash
pnpm build
```

9. Run Tailwind CSS build script:

```bash
pnpm tailwind:build
```

## 📚 Project Structure

```
src/
├── features/
│   ├── tasks/
│   │   ├── components/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaskForm.tsx
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   ├── pages/
│   │   │   └── TaskPage.tsx
│   │   ├── services/
│   │   │   └── taskService.ts
│   │   ├── stores/
│   │   │   └── useTaskStore.ts
│   │   └── taskTypes.ts
├── pages/
│   ├── HomePage.tsx
│   ├── HomePage.test.tsx
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   ├── services/
│   │   └── api.ts
│   ├── utils/
├── store/
│   └── rootStore.ts
├── styles/
│   ├── globalStyles.ts
│   └── tailwind.css
├── App.tsx
├── index.tsx
└── .env
```

## 📝 License

This project is licensed under the MIT License.
