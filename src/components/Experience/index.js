import { useRef, useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  AnimatePresence,
} from "framer-motion"
import { experiences } from "../../data/constants"

/* ────────────────────────────────  STYLED COMPONENTS  ──────────────────────────────── */

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 60px 0;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 24px;
  padding: 0 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`

const Title = styled(motion.h2)`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary} 0%,
    #8b5cf6 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`

const Desc = styled(motion.p)`
  max-width: 600px;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

/* ▸ timeline container
   ──────────────────────────────────────────────────────────────────── */
const TimelineSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 20px;

  /* 24 px dot + 16 px gap + 800 px card  =  840 px  */
  width: 100%;
  max-width: calc(24px + 16px + 800px);
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 960px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`

const TimelineItem = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding-bottom: 24px;

  @media (max-width: 768px) {
    gap: 12px;
    padding-bottom: 16px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding-bottom: 12px;
  }
`

const TimelineLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 24px;
  width: 24px;

  @media (max-width: 480px) {
    min-width: 20px;
    width: 20px;
  }
`

const TimelineDot = styled(motion.div)`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    #8b5cf6 100%
  );
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
  z-index: 2;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 6px rgba(139, 92, 246, 0.6);
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    transition: all 0.3s ease;

    @media (max-width: 480px) {
      width: 8px;
      height: 8px;
    }
  }
`

const TimelineRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
  opacity: 0;
  z-index: 1;
`

const TimelineContent = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  padding: 28px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: 0.3s;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 24px;
    left: -8px;
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.card};
    transform: rotate(45deg);
    border-radius: 2px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;

    &::before {
      width: 12px;
      height: 12px;
      top: 20px;
      left: -6px;
    }
  }
`

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.05) 0%,
    rgba(139, 92, 246, 0) 100%
  );
  pointer-events: none;
  z-index: -1;
`

/* ▸ text bits inside card
   ──────────────────────────────────────────────────────────────────── */
const TimelineTitleLink = styled(motion.a)`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
  text-decoration: none;
  display: inline-block;
  transition: 0.3s;

  &:hover {
    color: #8b5cf6;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`

const TimelineTitleNoLink = styled(motion.div)`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`

const TimelineRole = styled(motion.div)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const TimelineDate = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => `${theme.primary}15`};
  border-radius: 20px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`

const TimelineDescription = styled(motion.div)`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`

const SkillsList = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    gap: 6px;
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    margin-top: 10px;
  }
`

const SkillItem = styled(motion.li)`
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background: linear-gradient(
    135deg,
    ${({ theme }) => `${theme.primary}22`} 0%,
    rgba(139, 92, 246, 0.2) 100%
  );
  border-radius: 20px;
  transition: 0.3s;

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => `${theme.primary}44`} 0%,
      rgba(139, 92, 246, 0.4) 100%
    );
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 12px;
  }
`

/* ▸ growing vertical line
   ──────────────────────────────────────────────────────────────────── */
const VerticalLine = styled(motion.div)`
  position: absolute;
  left: 12px;
  top: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.primary} 0%,
    #8b5cf6 100%
  );
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
  transform-origin: top;
  z-index: 1;

  @media (max-width: 480px) {
    left: 10px;
    width: 2px;
  }
`

/* ────────────────────────────────  ANIMATION VARIANTS  ──────────────────────────────── */

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

const timelineItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

const floatVariants = {
  initial: { y: 0 },
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

const titleVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const skillsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const skillItemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    color: "#8b5cf6",
    transition: {
      duration: 0.2,
    },
  },
}

const pulseVariants = {
  initial: { scale: 1, opacity: 1 },
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

const ringVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 2,
    opacity: [0, 0.5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeOut",
    },
  },
}

const glowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0.1, 0.3, 0.1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
}

/* ───────────────────────────────────── COMPONENT ───────────────────────────────────── */

const Experience = () => {
  const controls = useAnimation()
  const theme = useTheme()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(null)

  /* vertical‑line scroll progress */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  /* fire stagger entrance once visible */
  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  const handleTimelineDotHover = (index) => {
    setActiveIndex(index)
  }
  
  const handleTimelineDotLeave = () => {
    setActiveIndex(null)
  }

  return (
    <Container
      id="experience"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Wrapper>
        {/* headline with text scramble effect */}
        <Title
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </Title>

        {/* subtitle with staggered character animation */}
        <Desc
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of my professional experiences
        </Desc>

        {/* timeline */}
        <TimelineSection ref={sectionRef}>
          {/* growing gradient line */}
          <VerticalLine style={{ scaleY: scrollYProgress }} />

          {experiences.map((experience, index) => (
            <TimelineItem
              key={index}
              custom={index}
              variants={timelineItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* animated dot */}
              <TimelineLeft>
                <TimelineDot
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 12,
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.9)",
                  }}
                  animate={activeIndex === index ? "pulse" : "initial"}
                  variants={pulseVariants}
                  onMouseEnter={() => handleTimelineDotHover(index)}
                  onMouseLeave={handleTimelineDotLeave}
                />
                {/* animated ring effect on hover */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <TimelineRing
                      variants={ringVariants}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, scale: 0 }}
                    />
                  )}
                </AnimatePresence>
              </TimelineLeft>

              {/* card with content */}
              <TimelineContent
                whileHover={{
                  y: -8,
                  boxShadow: "0 12px 30px rgba(139, 92, 246, 0.2)",
                  transition: { duration: 0.3 },
                }}
                animate={activeIndex === index ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <GlowEffect
                  variants={glowVariants}
                  initial="initial"
                  animate={activeIndex === index ? "animate" : "initial"}
                />

                {/* Company logo and name in a row */}
                <CompanyHeader>
                  {experience.img && (
                    <CompanyLogo src={experience.img} alt={experience.company + ' logo'} />
                  )}
                  {experience.companyUrl ? (
                    <TimelineTitleLink
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={titleVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        x: 8,
                        color: "#8b5cf6",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {experience.company}
                    </TimelineTitleLink>
                  ) : (
                    <TimelineTitleNoLink
                      variants={titleVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {experience.company}
                    </TimelineTitleNoLink>
                  )}
                </CompanyHeader>

                {/* Role with animated entrance */}
                <TimelineRole
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {experience.role}
                </TimelineRole>

                {/* Date badge with floating animation */}
                <TimelineDate
                  variants={floatVariants}
                  initial="initial"
                  animate={activeIndex === index ? "float" : "initial"}
                >
                  {experience.date}
                </TimelineDate>

                {/* Description with staggered entrance */}
                <TimelineDescription
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {Array.isArray(experience.desc) ? (
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {experience.desc.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + idx * 0.1,
                          }}
                          style={{
                            marginBottom:
                              window.innerWidth <= 480
                                ? 6
                                : window.innerWidth <= 768
                                ? 8
                                : 10,
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    experience.desc
                  )}
                </TimelineDescription>

                {/* Skills with staggered entrance */}
                {experience.skills?.length > 0 && (
                  <SkillsList
                    variants={skillsVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {experience.skills.map((skill, idx) => (
                      <SkillItem
                        key={idx}
                        variants={skillItemVariants}
                        whileHover="hover"
                        custom={idx}
                      >
                        {skill}
                      </SkillItem>
                    ))}
                  </SkillsList>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineSection>
      </Wrapper>
    </Container>
  )
}

// Add styled component for company logo
const CompanyLogo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.10);
  background: #fff;
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

// Add styled component for company header row
const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

export default Experience