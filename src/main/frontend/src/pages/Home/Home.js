import FirstNavbar from './shared/FirstNavbar/FirstNavbar';
import SecondNavbar from './shared/SecondNavbar/SecondNavbar';
import Footer from './shared/Footer/Footer';

import HomeProducts from './HomeProducts';

function Home() {
  // return (
  //   <Routes>
  //     <Route path='/' element={<HomeLayout />}>

  //       <Route index element={<Products />} />

  //       <Route path='products'>
  //         <Route path='view' element={<ViewProduct />} />
  //       </Route>

  //     </Route>
  //   </Routes>
  // )

  return (
    <div className='flex flex-col'>
      <FirstNavbar />
      <SecondNavbar />
      <div className="h-screen flex flex-col justify-between">
        <HomeProducts />
        <Footer />
      </div>
    </div>
  )
}

export default Home