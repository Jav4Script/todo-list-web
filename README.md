📝 Todo List - Frontend
Welcome to the Todo List frontend project! This application allows users to manage tasks using a beautiful, responsive UI built with React, Zustand, Styled Components, Tailwind CSS, and ShadCN UI. We also use React Query for fetching tasks and Axios for API communication.

✨ Features

- Task Management: Create, view, and manage tasks.
- Responsive UI: Built with Tailwind CSS and styled-components, optimized for all screen sizes.
- State Management: Lightweight state management using Zustand.
- Design System: Consistent and accessible components with ShadCN UI.
- Clean Architecture: Feature-based project structure for scalability and maintainability.

🛠️ Stack

- React: JavaScript library for building user interfaces.
- Zustand: State management for storing tasks.
- Styled Components: For writing CSS in JS with dynamic styling.
- Tailwind CSS: Utility-first CSS framework for rapid styling.
- ShadCN UI: A design system for building consistent, accessible UIs.
- React Query: For server state management and data fetching.
- Axios: For making HTTP requests.

🖥️ Setup Steps

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

📚 Project Structure

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
│   │   ├── stores/
│   │   │   └── useTaskStore.ts
│   │   ├── services/
│   │   │   └── taskService.ts
│   │   └── taskStyles.ts
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   ├── services/
│   │   └── api.ts
├── store/
│   └── rootStore.ts
├── styles/
│   ├── globalStyles.ts
│   └── tailwind.css
├── App.tsx
├── index.tsx
└── .env
```

🔧 Developer Setup
Tailwind CSS
Tailwind is used for utility-first styling. To ensure you have it configured correctly, follow the steps below:

1. Install Tailwind and its peer dependencies:

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

2. Initialize Tailwind:

```bash
pnpm tailwindcss init
```

3. Update the tailwind.config.js file:

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

4. Include Tailwind in your CSS file:
   Create `src/styles/tailwind.css` and add the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

📝 License
This project is licensed under the MIT License.
