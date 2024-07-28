import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme} from './utils/Themes';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Hero from './components/HeroSection';
import { BrowserRouter as Router } from 'react-router-dom';
import Experience from './components/Experience';
import Project from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetails from './components/ProjectDetails';
import { useState } from 'react';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(
    38.73deg, 
    rgba(204, 0, 187, 0.15) 0%, 
    rgba(201, 32, 184, 0) 50%), 
    
    linear-gradient(
    141.27deg, 
    rgba(0, 70, 209, 0) 50%, 
    rgba(0, 70, 209, 0.15) 100%);

  width: 100%;
`;
function App() {
  //const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null});
  console.log(openModal);
  return (
    <ThemeProvider theme={darkTheme}>
    <Router>
      <Navbar/>
      <Body>
        <Hero/>
        <Wrapper>
          <Skills/>
          <Experience/>
        </Wrapper>
        <Project openModal={openModal} setOpenModal={setOpenModal}/>
        <Wrapper>
          <Contact/>
        </Wrapper>
        <Footer/>{openModal.state && <ProjectDetails openModal={openModal} setOpenModal={setOpenModal}></ProjectDetails>}
      </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
