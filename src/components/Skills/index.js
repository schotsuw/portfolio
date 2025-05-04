import { useRef, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation, useInView } from "framer-motion"
import { skills } from "../../data/constants"

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 24px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const Title = styled(motion.div)`
  font-size: 48px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary} 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
  }
`

const Desc = styled(motion.div)`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const SkillsContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

const Skill = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 28px 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary} 0%, #8b5cf6 100%);
  }
  
  &:hover {
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.15);
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 20px 28px;
  }
  
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 16px 24px;
  }
`

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary} 0%, #8b5cf6 100%);
    border-radius: 10px;
  }
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`

const SkillItem = styled(motion.div)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: linear-gradient(135deg, ${({ theme }) => theme.primary + "11"} 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 16px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.primary + "22"} 0%, rgba(139, 92, 246, 0.2) 100%);
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 16px;
  }
  
  @media (max-width: 500px) {
    font-size: 13px;
    padding: 8px 14px;
  }
`

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
  
  ${SkillItem}:hover & {
    transform: scale(1.15) rotate(5deg);
  }
`

const SkillCategory = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + "22"};
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const Skills = () => {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const skillItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <Container id="skills" ref={sectionRef}>
      <Wrapper>
        <Title
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </Title>
        <Desc
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of my skills on which I have been working on for the past 2 years.
        </Desc>
        <SkillsContainer variants={containerVariants} initial="hidden" animate={controls}>
          {skills.map((skill, index) => (
            <Skill
              key={skill.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <SkillCategory>{index % 2 === 0 ? "Core" : "Advanced"}</SkillCategory>
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item) => (
                  <SkillItem
                    key={item.name}
                    variants={skillItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkillImage src={item.image} alt={item.name} />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </Skill>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills
