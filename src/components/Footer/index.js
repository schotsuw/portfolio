import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { Bio } from "../../data/constants"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

const FooterContainer = styled.div`
  width: 100%;
  padding: 5rem 0 3rem;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    100.26deg, 
    rgba(0, 122, 255, 0.06) 42.33%, 
    rgba(88, 86, 214, 0.06) 127.07%
  );
  position: relative;
  backdrop-filter: blur(10px);
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(0, 122, 255, 0.3), 
      rgba(88, 86, 214, 0.3), 
      transparent
    );
  }
`

const FooterWrapper = styled(motion.footer)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.text_primary || '#000'};
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 20px;
  }
`

const Logo = styled(motion.div)`
  font-weight: 800;
  font-size: 32px;
  background: linear-gradient(
    90deg, 
    #007AFF 0%, 
    #5856D6 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const Nav = styled(motion.nav)`
  width: 100%;
  max-width: 800px;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    text-align: center;
  }
`

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.text_primary || '#000'};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg, 
      #007AFF 0%, 
      #5856D6 100%
    );
    transition: width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 2px;
  }
  
  &:hover {
    color: #007AFF;
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const SocialMediaIcons = styled(motion.div)`
  display: flex;
  margin-top: 1.25rem;
  gap: 1.75rem;
`

const SocialMediaIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card || '#fff'};
  color: ${({ theme }) => theme.text_primary || '#000'};
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: linear-gradient(
      90deg, 
      #007AFF 0%, 
      #5856D6 100%
    );
    color: white;
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 122, 255, 0.15);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.3rem;
  }
`

const Divider = styled(motion.div)`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(0, 122, 255, 0.2), 
    rgba(88, 86, 214, 0.2), 
    transparent
  );
  margin: 10px 0;
`

const FooterInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`

const FooterInfoText = styled(motion.p)`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text_secondary || '#666'};
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
`

const Copyright = styled(motion.p)`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary || '#666'};
  text-align: center;
  opacity: 0.8;
`

// New Components
// These newsletter components have been removed as requested

// These components have been removed as requested

function Footer() {
  const year = new Date().getFullYear();
  
  // Removed newsletter submission handler

  return (
    <FooterContainer>
      <FooterWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Logo variants={itemVariants}>
          Portfolio
        </Logo>
        
        <Nav variants={containerVariants}>
          {["about", "skills", "experience", "projects", "contact"].map((item, index) => (
            <NavLink
              key={index}
              href={`#${item}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </Nav>
        
        <SocialMediaIcons variants={containerVariants}>
          <SocialMediaIcon
            href={Bio.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={Bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={`mailto:${Bio.email || "example@example.com"}`}
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope />
          </SocialMediaIcon>
        </SocialMediaIcons>
        
        <Divider variants={itemVariants} />
        
        <FooterInfo variants={containerVariants}>
          <FooterInfoText variants={itemVariants}>
            Built with React, Styled Components, and Framer Motion
          </FooterInfoText>
          <Copyright variants={itemVariants}>© {year} Saran Chotsuwan. All rights reserved.</Copyright>
        </FooterInfo>
      </FooterWrapper>
    </FooterContainer>
  )
}

export default Footer