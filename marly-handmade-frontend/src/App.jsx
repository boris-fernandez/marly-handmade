import { useState } from 'react'
import Header from './components/Header';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
      <Footer />
    </>
  )
}

export default App
