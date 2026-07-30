import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import { LikedProductsProvider } from './context/LikedProductsContext';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const WhoWeAre = lazy(() => import('./pages/WhoWeAre/WhoWeAre'));
const CaseStudies = lazy(() => import('./pages/CaseStudies/CaseStudies'));
const GetStarted = lazy(() => import('./pages/GetStarted/GetStarted'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPages/CaseStudyPage'));
const Product = lazy(() => import('./pages/Products/Products'));
const ProductPage = lazy(() => import('./pages/ProductPages/ProductPage'));
const GetEstimatePage = lazy(() => import('./pages/GetEstimatePage/GetEstimatePage'));
const GetStartedForm = lazy(() => import('./pages/GetStartedForm/GetStartedForm'));
const ComboConvoForm = lazy(() => import('./pages/activities/ComboConvo/ComboConvoForm'));
const ComboConvoAltForm = lazy(() => import('./pages/activities/ComboConvoAlt/ComboConvoAltForm'));
const LaserFocusForm = lazy(() => import('./pages/activities/LaserFocus/LaserFocusForm'));
const ScatterPlot = lazy(() => import('./pages/activities/LaserFocus/ScatterPlot/ScatterPlot'));
const VentingMachine = lazy(() => import('./pages/activities/VentingMachine/VentingMachine'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));

const MIN_LOADING_MS = 1200;

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const dismiss = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  useEffect(() => {
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      setTimeout(dismiss, remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
      return () => window.removeEventListener('load', finish);
    }
  }, [dismiss]);

  return (
    <LikedProductsProvider>
      {showLoader && <LoadingScreen fadeOut={fadeOut} />}
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/who-we-are" element={<WhoWeAre />} />
              <Route path="/products" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-study/:id" element={<CaseStudyPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/get-estimate" element={<GetEstimatePage />} />
              <Route path="/get-started-form" element={<GetStartedForm />} />
              <Route path="/comboconvo" element={<ComboConvoForm />} />
              <Route path="/comboconvo-noemail" element={<ComboConvoAltForm />} />
              <Route path="/laserfocus" element={<LaserFocusForm />} />
              <Route path="/laserfocus/scatterplot" element={<ScatterPlot />} />
              <Route path="/ventingmachine" element={<VentingMachine />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </LikedProductsProvider>
  );
};

export default App;
