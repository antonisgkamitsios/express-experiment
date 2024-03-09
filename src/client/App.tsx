import './App.css';
import './index.css';
// import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { About } from './pages/About.tsx';
import { Profile } from './pages/Profile.tsx';
import { HelmetProvider } from 'react-helmet-async';
// const Counter = lazy(() => import('./Counter.tsx'));
// import Counter from './Counter';

const queryClient = new QueryClient();
function App({ path }: { path: string }) {
  console.log(path);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
