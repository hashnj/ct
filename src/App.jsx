import { useState } from 'react'
import './App.css'
import { Signup } from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Form } from './components/Form'
import { NotFound } from './pages/NotFound'
import { VendorSignup } from './pages/VendorSignup'
import { GetInfo } from './pages/GetInfo'
import { Layout } from './pages/Layout'
import { Unauthorized } from './components/Unauthorized'
import { RequireAuth } from './components/RequireAuth'
import { VendorDashboard } from './pages/VendorDashboard'
import { Listing } from './pages/Listing'
import { Main } from './pages/Main'
import { Profile } from './pages/Profile'
import { Test } from './pages/Test'
import WishPage from './pages/WishPage'
import CartPage from './pages/CartPage'
import ProductInfo from './pages/ProductInfo'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/auth/register' element={<Signup/>} />
      <Route path='/auth/register/vendor' element={<VendorSignup/>} />
      <Route path='/auth/login' element={<Signin/>} />
      <Route path='/unauthorized' element={<Unauthorized />}/>
      <Route element={<RequireAuth allowedRoles={['Customer','Admin' ,'Vendor','Staff']} />}>
      <Route path='/your-profile' element={<Profile />}/>
      <Route path='/wishlist' element={<WishPage />}/>
      <Route path='/your-cart' element={<CartPage />}/>
      <Route path='/product/:id' element={<ProductInfo />}/>
      </Route>
      <Route path='/' element={<Main />} /> 
      {/* </Route> */}
      <Route element={<RequireAuth allowedRoles={['Vendor','Admin']} />}>
      <Route path='/vendor/info' element={<GetInfo/>} />
      <Route path='/vendor' element={<VendorDashboard/>} />
      <Route path='/auth/login/vendor' element={<Signin/>} />
      <Route path='/your-listings' element={<Listing/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={['Admin','Staff']} />}>
      {/* <Route path='' element={user details}/> */}
      </Route>
      <Route element={<RequireAuth allowedRoles={['Admin']} />}>
      <Route path='/dashboard' element={<Dashboard/>} />
      {/* <Route path='' element={transction log}/> */}
      </Route>
      <Route path='/test' element={<Test/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
