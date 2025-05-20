## Features

- **Next.js 14**: Server-side rendering (SSR), Static Site Generation (SSG), optimized routing, and API integrations.
- **TypeScript**: Strongly typed code for better error detection and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Redux**: State management for managing the shopping cart and other global states.
- **Framer Motion**: Smooth animations and transitions for an enhanced user experience.
- **ShadCN UI**: Beautifully styled, accessible, and customizable UI components.
- **Fully Responsive**: Mobile-first design ensuring the layout adapts across devices.
- **Performance Optimized**: Best practices followed for fast loading and interaction.
- **Accessible**: Built with accessibility standards to provide an inclusive experience.

## Technologies

- **Next.js 14** - A popular React framework with built-in SSR and optimization.
- **TypeScript** - A superset of JavaScript for strong typing and code consistency.
- **Tailwind CSS** - A utility-first CSS framework for fast, responsive design.
- **Redux** - A state management library used for the shopping cart and global app state.
- **Framer Motion** - A library for animations and interactions in React.
- **ShadCN UI** - A collection of beautiful, accessible, and customizable UI components.

## Installation

To get started with Nextjs locally, follow these steps:
1. **Install dependencies:**

   ```bash
   npm install
   ```

   ```bash
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

   ```bash
   yarn dev
   ```

3. **Open in your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- To explore or modify the code, navigate through the `components`, `features`, and `app` directories.
- The shopping cart logic is managed using **Redux**. You can find the store configuration and cart actions in the `src/lib/features` directory.
- **ShadCN UI** components are used across the app. They can be customized in the `src/components/ui` directory.
- You can easily modify and extend the project to suit your needs, whether for personal use or professional projects.

## Project Structure

```bash
homechoice-ecommerce/
│
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # Reusable components (including ShadCN UI components)
│   └── lib/
│       ├── features/      # The Redux logics for features (e.g., shopping cart)
│       ├── hooks/         # Custom React hooks
│       ├── store.ts       # Redux store
│       ├── utils.ts       # Utility functions
│   ├── styles/            # Tailwind CSS styles (global, utilities and fonts)
│   ├── types/             # TypeScript types
│
├── components.json         # ShadCN UI configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Node.js dependencies and scripts
├── postcss.config.mjs      # Post CSS configuration
└── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
```
## Issues

Feel free to submit issues for any bugs, feature requests, or general questions related to the project. You can also reach out via [email](mailto:mr.mohammadoftadeh@gmail.com) for support.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

## Contact

Feel free to reach out to:

- **Name**: BBS
- **Email**: [mr.mohammadoftadeh@gmail.com](mailto:builtbysisi@gmail.com)
- **GitHub**: [https://github.com/mohammadoftadeh](https://github.com/builtbysisi)
