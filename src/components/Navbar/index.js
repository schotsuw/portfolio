import { useState, useEffect } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { Bio } from "../../data/constants";
import ToggleTheme from "../ToggleTheme";
import { motion, AnimatePresence } from "framer-motion";
import sLogo from "../../images/s-logo.png";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Styled‑components (unchanged except comments removed for brevity)        */
/* ────────────────────────────────────────────────────────────────────────── */

const Nav = styled(motion.nav)`
  background-color: ${({ theme }) => theme.card_light};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

const NavLogo = styled(LinkR)`
  padding: 0 6px;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none !important;
  position: relative;         
  display: inline-block;  
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
    background: linear-gradient(90deg, #007aff 0%, #5856d6 100%);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 20px;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: #7f5af0;
  }

  &.active {
   color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  /* only the underline should stretch */
  &.active::after {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoImage = styled(motion.img)`
  height: 50px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const MobileMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 32px 40px;
  background: ${({ theme }) => theme.card_light};
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 0;
  text-decoration: none !important;
  position: relative;
  display: inline-block;
  border-bottom: 1px solid ${({ theme }) => theme.text_primary + "10"};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`;

const GithubButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justifyContent: "center",
  gap: 10px;
  padding: 0 20px;
  height: 44px;
  border-radius: 50px;
  color: ${({ theme }) => theme.white};
  background: linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);

    &:before {
      left: 100%;
    }
  }

  svg {
    margin-right: 4px; // Add a small right margin to the icon
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
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
`;

/* ────────────────────────────────────────────────────────────────────────── */
/*  Component                                                               */
/* ────────────────────────────────────────────────────────────────────────── */

const SECTION_IDS = ["about", "skills", "experience", "projects", "contact"];

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localDarkMode, setLocalDarkMode] = useState(darkMode ?? true);
  const [activeSection, setActiveSection] = useState("about");
  // eslint-disable-next-line
  const theme = useTheme();

  /* -------------------------------------------------- */
  /*  1. Track which section is in view (no magic nums) */
  /* -------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        // Trigger when the section’s top hits 40 % from top,
        // and stay active until it leaves 50 % bottom
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ------------------------------- */
  /*  2. Close mobile menu on resize */
  /* ------------------------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------------------------------ */
  /*  3. Handle clicks (smooth‑scroll + close)  */
  /* ------------------------------------------ */
  const handleNavClick = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setLocalDarkMode((prev) => !prev);
    if (setDarkMode) setDarkMode((prev) => !prev);
  };

  /* ----------------- */
  /*  Framer variants  */
  /* ----------------- */
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, height: 0 },
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  /* ───────────────────────────────────────── */

  return (
    <Nav initial="hidden" animate="visible" variants={navVariants}>
      <NavContainer>
        {/* Logo */}
        <NavLogo to="/">
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
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

        {/* Mobile burger / close */}
        <MobileIcon>
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
            exit={{ rotate: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </MobileIcon>

        {/* Desktop nav links */}
        <NavItems>
          {SECTION_IDS.map((item, i) => (
            <motion.li key={item} custom={i} initial="hidden" animate="visible" variants={linkVariants}>
              <NavLink
                href={`#${item}`}
                className={activeSection === item ? "active" : ""}
                onClick={() => handleNavClick(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </motion.li>
          ))}
        </NavItems>

        {/* Desktop buttons */}
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
            {/* GitHub icon */}
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

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {SECTION_IDS.map((item, i) => (
                <MobileLink
                  key={item}
                  href={`#${item}`}
                  onClick={() => handleNavClick(item)}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  className={activeSection === item ? "active" : ""}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </MobileLink>
              ))}

              <GithubButton
                style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
                href={Bio.github}
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* (same svg as above) */}
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

              <div
                style={{
                  marginTop: 18,
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <ToggleTheme isDark={localDarkMode} toggleTheme={toggleTheme} />
              </div>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
