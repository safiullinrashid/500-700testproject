import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NewsPage from '../pages/NewsPage';

const AppRouter: React.FC = () => (
  <BrowserRouter basename="/500-700testproject">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;