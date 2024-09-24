import { Suspense } from 'react';
import './App.css';
import { Signup } from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { NotFound } from './pages/NotFound';
import { VendorSignup } from './pages/VendorSignup';
import { GetInfo } from './pages/GetInfo';
import { Layout } from './pages/Layout';  // Import your Layout component
import { Unauthorized } from './components/Unauthorized';
import { RequireAuth } from './components/RequireAuth';
import { VendorDashboard } from './pages/VendorDashboard';
import { Listing } from './pages/Listing';
import { Main } from './pages/Main';
import { Profile } from './pages/Profile';
import WishPage from './pages/WishPage';
import CartPage from './pages/CartPage';
import ProductInfo from './pages/ProductInfo';
import { Product } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { Test } from './pages/Test';
import { Success } from './pages/Success';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function App() {
  return (
    <Suspense fallback={<div className="bg-background text-primary text-6xl w-screen h-screen flex justify-center items-center">
                          <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} /> 
            <Route path="/auth/register" element={<Signup />} />
            <Route path="/auth/register/vendor" element={<VendorSignup />} />
            <Route path="/auth/login" element={<Signin />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<RequireAuth allowedRoles={['Customer', 'Admin', 'Vendor', 'Staff']} />}>
              <Route path="/your-profile" element={<Profile />} />
              <Route path="/wishlist" element={<WishPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products" element={<Product />} />
              <Route path="/product/:id" element={<ProductInfo />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:id" element={<Success />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={['Vendor', 'Admin']} />}>
              <Route path="/vendor/info" element={<GetInfo />} />
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/your-listings" element={<Listing />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={['Admin', 'Staff']} />}>

            </Route>
            <Route element={<RequireAuth allowedRoles={['Admin']} />}>

              <Route path="/dashboard" element={<Dashboard />} />

            </Route>
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
