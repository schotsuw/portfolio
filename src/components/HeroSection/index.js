import { useRef, useEffect } from "react"
import styled from "styled-components"
import { Bio } from "../../data/constants"
import Typewriter from "typewriter-effect"
import HeroImg from "../../images/HeroImage.png"
import HeroBgAnimation from "../HeroBgAnimation"
import ParticleBackground from "../ParticleBackground"
import { motion, useAnimation, useInView } from "framer-motion"

const HeroContainer = styled(motion.div)`
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640){
    padding: 32px 16px;
  }
  z-index: 1;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  -webkit-transform: translateX(-45%) translateY(-50%); /* Shifted right from -50% to -45% */
  transform: translateX(-45%) translateY(-50%); /* Shifted right from -50% to -45% */

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled(motion.div)`
  font-weight: 700;
  font-size: 50px;
  color: ${({theme}) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled(motion.div)`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({theme}) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const Span = styled.span`
  color: ${({theme}) => theme.primary};
  cursor: pointer;
`;

const SubTitle = styled(motion.div)`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({theme}) => theme.text_primary + 95};
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

// New styled container for buttons and icons in a row
const ButtonAndIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 960px) {
    align-items: center;
  }
`;

const ResumeButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: auto;
  min-width: 160px;
  max-width: 320px;
  text-align: center;
  padding: 14px 32px;
  color: ${({theme}) => theme.white};
  border-radius: 50px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #7F5AF0 0%, #2CB67D 100%);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  border: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
    filter: brightness(1.1);
  }
  &:hover:before {
    left: 100%;
  }

  @media (max-width: 640px) {
    padding: 12px 16px;
    font-size: 18px;
  }
`;

// Social Icons container
const SocialIcons = styled(motion.div)`
  display: flex;
  gap: 16px;
  
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

// Individual Social Icon
const SocialIcon = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(90deg, #7F5AF0 0%, #2CB67D 100%);
    color: white;
    box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  transition: all 0.3s ease;

  @media (max-width: 960px) {
    max-width: 250px;
  }

  @media (max-width: 640px) {
    max-width: 200px;
  }
`;

const Name = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Improved ScrollIndicator with proper centering
const ScrollIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const ScrollIndicator = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  opacity: 0.8;
  
  span {
    margin-bottom: 8px;
    text-align: center;
    white-space: nowrap;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <HeroContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={ref}
      id="about"
    >
      <ParticleBackground />
      <HeroBg>
        <HeroBgAnimation />
      </HeroBg>
      <HeroInnerContainer>
        <HeroLeftContainer>
          <motion.div variants={containerVariants} initial="hidden" animate={controls}>
            <Title variants={itemVariants}>
              Hi, I am <br /> <Name>{Bio.name}</Name>
            </Title>
            <TextLoop variants={itemVariants}>
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle variants={itemVariants}>{Bio.description}</SubTitle>
            
            <ButtonAndIconsContainer>
              <ResumeButton
                href={Bio.resume}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Check Résumé
              </ResumeButton>
              
              <SocialIcons variants={itemVariants}>
                <SocialIcon 
                  href="https://github.com/schotsuw" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </SocialIcon>
                
                <SocialIcon 
                  href="https://www.linkedin.com/in/saran-chotsuwan-5b38682b5/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </SocialIcon>
                
                
              </SocialIcons>
            </ButtonAndIconsContainer>
          </motion.div>
        </HeroLeftContainer>
        <HeroRightContainer>
          <HeroImage
            src={HeroImg}
            alt="hero-image"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          />
        </HeroRightContainer>
      </HeroInnerContainer>
      
      {/* Improved scroll indicator with proper centering */}
      <ScrollIndicatorWrapper>
        <ScrollIndicator
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            y: [0, 10, 0], 
            opacity: [0.8, 0.4, 0.8] 
          }}
          transition={{
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          whileInView={{ 
            opacity: [0.8, 0],
            transition: { delay: 3, duration: 1.5 }
          }}
        >
          <span>Scroll to explore</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </ScrollIndicator>
      </ScrollIndicatorWrapper>
    </HeroContainer>
  );
};

export default Hero;