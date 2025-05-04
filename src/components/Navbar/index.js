import { useState, useEffect } from "react"
import { Link as LinkR } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { FaBars, FaTimes } from "react-icons/fa"
import { Bio } from "../../data/constants"
import ToggleTheme from "../ToggleTheme"
import { motion, AnimatePresence } from "framer-motion"
import sLogo from "../../images/s-logo.png"

const Nav = styled(motion.nav)`
  background-color: ${({ theme }) => theme.card_light};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed; // Change from sticky to fixed
  top: 0;
  left: 0; // Add this to ensure it spans the full width
  right: 0; // Add this to ensure it spans the full width
  z-index: 10;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 960px) {
    transition: 0.8s all ease;
  }
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`

const NavLogo = styled(LinkR)`
  width: auto;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  @media (max-width: 640px) {
    padding: 0 0px;
  }
`

const NavItems = styled.ul`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  padding: 5px 0;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, #007AFF 0%, #5856D6 100%);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 20px;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  &:hover {
    color: #007AFF;
  }

  &.active::after {
    width: 100%;
  }
`

const ButtonContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  gap: 18px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const LogoImage = styled(motion.img)`
  height: 50px;
  width: auto;
  object-fit: contain;
  margin: 0 6px;
  @media (max-width: 768px) {
    height: 40px;
  }
`

// const LogoText = styled(motion.div)`
//   font-weight: 800;
//   font-size: 22px;
//   margin-left: 6px;
//   margin-right: 6px;
//   background: linear-gradient(90deg, #007AFF 0%, #5856D6 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `

const MobileMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 32px 40px 32px 40px;
  background: ${({ theme }) => theme.card_light};
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 0;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid ${({ theme }) => theme.text_primary + "10"};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);
  }

  &.active {
    color: ${({ theme }) => theme.primary};
  }
`

const GithubButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  justify-content: center;
  padding: 0 20px;
  height: 44px;
  border-radius: 50px;
  color: ${({ theme }) => theme.white};
  background: linear-gradient(90deg, #7F5AF0 0%, #2CB67D 100%);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
    
    &:before {
      left: 100%;
    }
  }
`

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${({ theme }) => theme.text_primary + "10"};
    }
  }
`

// const LogoIcon = styled.div`
//   font-size: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   -webkit-background-clip: text;
// `

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localDarkMode, setLocalDarkMode] = useState(darkMode ?? true)
  // eslint-disable-next-line
  const theme = useTheme()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setLocalDarkMode((prev) => !prev)
    if (setDarkMode) setDarkMode((prev) => !prev)
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, height: 0 },
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <Nav initial="hidden" animate="visible" variants={navVariants}>
      <NavContainer>
        <NavLogo to="/">
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >

            <LogoImage 
              src={sLogo} 
              alt="Saran Chotsuwan" 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

          </a>
        </NavLogo>
        <MobileIcon>
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
            exit={{ rotate: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </MobileIcon>
        <NavItems>
          {["about", "skills", "experience", "projects", "contact"].map((item, index) => (
            <motion.li key={index} custom={index} initial="hidden" animate="visible" variants={linkVariants}>
              <NavLink href={`#${item}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </motion.li>
          ))}
        </NavItems>
        <ButtonContainer>
          <GithubButton
            href={Bio.github}
            target="_blank"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </GithubButton>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ToggleTheme isDark={localDarkMode} toggleTheme={toggleTheme} />
          </motion.div>
        </ButtonContainer>
        <AnimatePresence>
          {isOpen && (
            <MobileMenu initial="closed" animate="open" exit="closed" variants={mobileMenuVariants}>
              {["about", "skills", "experience", "projects", "contact"].map((item, index) => (
                <MobileLink
                  key={index}
                  href={`#${item}`}
                  onClick={() => setIsOpen(false)}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </MobileLink>
              ))}
              <GithubButton
                style={{
                  marginTop: "16px",
                  width: "100%",
                }}
                href={Bio.github}
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub Profile
              </GithubButton>
              <div style={{ marginTop: "18px", display: "flex", justifyContent: "center", width: "100%" }}>
                <ToggleTheme isDark={localDarkMode} toggleTheme={toggleTheme} />
              </div>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  )
}

export default Navbar