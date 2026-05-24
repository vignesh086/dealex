import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Summary from './components/Summary.jsx'
import Issues from './components/Issues.jsx'
import { RedesignsSection, ShellSection } from './components/Redesigns.jsx'
import CodePatches from './components/CodePatches.jsx'
import QuickWins from './components/QuickWins.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Summary />
      <Issues />
      <RedesignsSection />
      <ShellSection />
      <CodePatches />
      <QuickWins />
      <Footer />
    </>
  )
}
