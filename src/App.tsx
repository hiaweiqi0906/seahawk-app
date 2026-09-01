import { Navigate, Route, Routes } from 'react-router-dom';
import { AppStateProvider, useAppState } from './state/AppState';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { WarrantyList } from './pages/WarrantyList';
import { WarrantyRegister } from './pages/WarrantyRegister';
import { BookService } from './pages/BookService';
import { ProductCategories } from './pages/ProductCategories';
import { ProductItems } from './pages/ProductItems';
import { ProductDetail } from './pages/ProductDetail';
import { DealerSearch } from './pages/DealerSearch';
import { Faq } from './pages/Faq';
import { Capture } from './pages/Capture';
import { SpeciesConfirm } from './pages/SpeciesConfirm';
import { CatchLog } from './pages/CatchLog';
import { Leaderboard } from './pages/Leaderboard';
import { More } from './pages/More';
import { RewardsOverview } from './pages/RewardsOverview';
import { RedemptionShop } from './pages/RedemptionShop';
import { ReceiptSubmission } from './pages/ReceiptSubmission';
import { MyRewards } from './pages/MyRewards';

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAppState();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/warranty" element={<RequireAuth><WarrantyList /></RequireAuth>} />
      <Route path="/warranty/register" element={<RequireAuth><WarrantyRegister /></RequireAuth>} />
      <Route path="/warranty/book-service" element={<RequireAuth><BookService /></RequireAuth>} />
      <Route path="/products" element={<RequireAuth><ProductCategories /></RequireAuth>} />
      <Route path="/products/:categorySlug" element={<RequireAuth><ProductItems /></RequireAuth>} />
      <Route path="/products/:categorySlug/:productSlug" element={<RequireAuth><ProductDetail /></RequireAuth>} />
      <Route path="/buy-now" element={<RequireAuth><DealerSearch /></RequireAuth>} />
      <Route path="/faq" element={<RequireAuth><Faq /></RequireAuth>} />
      <Route path="/catch/capture" element={<RequireAuth><Capture /></RequireAuth>} />
      <Route path="/catch/confirm" element={<RequireAuth><SpeciesConfirm /></RequireAuth>} />
      <Route path="/catch" element={<RequireAuth><CatchLog /></RequireAuth>} />
      <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
      <Route path="/more" element={<RequireAuth><More /></RequireAuth>} />
      <Route path="/rewards" element={<RequireAuth><RewardsOverview /></RequireAuth>} />
      <Route path="/rewards/shop" element={<RequireAuth><RedemptionShop /></RequireAuth>} />
      <Route path="/rewards/receipt" element={<RequireAuth><ReceiptSubmission /></RequireAuth>} />
      <Route path="/rewards/mine" element={<RequireAuth><MyRewards /></RequireAuth>} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppStateProvider>
      <AppRoutes />
    </AppStateProvider>
  );
}

export default App;
