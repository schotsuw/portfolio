import { useState, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import ProjectCard from "../Cards/ProjectCards"
import { projects } from "../../data/constants"
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion"

const Container = styled.div`
  background: linear-gradient(120deg, rgba(132, 59, 206, 0.08) 0%, rgba(0, 70, 209, 0.08) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(132, 59, 206, 0.3), transparent);
  }
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 70, 209, 0.3), transparent);
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  gap: 12px;
  padding: 0 32px;
  
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 0 16px;
  }
`

const Title = styled(motion.div)`
  font-size: 52px;
  text-align: center;
  font-weight: 800;
  margin-top: 24px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary} 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 40px;
  }
`

const Description = styled(motion.div)`
  font-size: 20px;
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`

const ToggleButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 32px 0 48px 0;
  width: 100%;
  
  @media (max-width: 768px) {
    margin: 24px 0 36px 0;
    gap: 8px;
  }
`

const ToggleButton = styled(motion.button)`
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  border: none;
  transition: all 0.3s ease;
  background: ${({ active, theme }) => (active ? theme.primary : theme.card_light)};
  color: ${({ active, theme }) => (active ? "white" : theme.text_primary)};
  box-shadow: ${({ active, theme }) => (active ? `0 4px 16px rgba(139, 92, 246, 0.4)` : `0 4px 8px rgba(0, 0, 0, 0.1)`)};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
    background: ${({ active, theme }) => (active ? theme.primary : `rgba(139, 92, 246, 0.1)`)};
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`

// Modified CardContainer to ensure proper centering at different screen widths
const CardContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  
  @media (max-width: 960px) {
    gap: 24px;
  }
  
  @media (max-width: 640px) {
    gap: 20px;
  }
`

// Modified ProjectCardWrapper to use percentage-based widths with max-width limits
const ProjectCardWrapper = styled(motion.div)`
  width: 330px;
  
  @media (max-width: 960px) {
    width: 300px;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    max-width: 330px;
  }
`

const EmptyMessage = styled(motion.div)`
  width: 100%;
  padding: 60px 0;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  font-weight: 500;
  
  span {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary + "11"} 0%, rgba(139, 92, 246, 0.1) 100%);
  filter: blur(10px);
  z-index: -1;
`

// Add a particle effect for more visual interest
const Particle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme, color }) => color || theme.primary + "33"};
  z-index: -1;
  width: 8px;
  height: 8px;
`



// Highlight animation for selected category
const CategoryHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(90deg, 
    rgba(139, 92, 246, 0.03) 0%, 
    rgba(139, 92, 246, 0.1) 50%,
    rgba(139, 92, 246, 0.03) 100%
  );
  border-radius: 30px;
  z-index: -1;
`

const Project = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("all")
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const containerRef = useRef(null)
  
  // For parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Handle category change with optimized rendering
  const handleCategoryChange = (category) => {
    // Only update if the category actually changed
    if (category !== toggle) {
      setToggle(category);
    }
  };

  // Optimized animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.3 
      } 
    }
  }
  
  // Lighter container variants with faster transitions
  const containerVariants = {
    hidden: { opacity: 0.8 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,  // Faster staggering
        delayChildren: 0.1,     // Shorter delay
        when: "beforeChildren" 
      } 
    }
  }

  // Get unique categories from projects - memoized to prevent recalculation
  const categories = useMemo(() => 
    ["all", ...new Set(projects.map((project) => project.category))], 
    []
  )
  
  // Pre-filter projects based on category - memoized for performance
  const filteredProjects = useMemo(() => 
    projects.filter((item) => toggle === "all" || item.category === toggle),
    [toggle]
  )

  // Generate particles efficiently with memoization
  const particles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({  // Reduced from 12 to 8 particles
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 4,
      color: i % 2 === 0 ? "rgba(139, 92, 246, 0.1)" : "rgba(132, 59, 206, 0.1)",
      duration: Math.random() * 20 + 15
    }));
  }, []);

  return (
    <Container id="projects" ref={containerRef}>
      {/* Animated particles */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          color={particle.color}
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: particle.id * 0.2
          }}
        />
      ))}
      
      {/* Original floating shapes with enhanced animations */}
      <FloatingShape
        style={{ left: "10%", top: "20%", width: "150px", height: "150px" }}
        variants={{
          hidden: { x: -100, y: -50, opacity: 0.1 },
          visible: {
            x: 0,
            y: 0,
            opacity: 0.2,
            transition: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          },
        }}
        initial="hidden"
        animate={controls}
      />
      <FloatingShape
        style={{ right: "10%", bottom: "20%", width: "200px", height: "200px" }}
        variants={{
          hidden: { x: 100, y: 50, opacity: 0.1 },
          visible: {
            x: 0,
            y: 0,
            opacity: 0.2,
            transition: {
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          },
        }}
        initial="hidden"
        animate={controls}
      />
      
      
      <Wrapper>
        {/* Parallax effect on scroll */}
        <motion.div 
          style={{ y, opacity }} 
          ref={ref} 
          initial="hidden" 
          animate={controls}
        >
          <Title
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: "easeOut"
                } 
              },
            }}
          >
            Projects
          </Title>
          <Description
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.8, 
                  delay: 0.5,
                  ease: "easeOut"
                } 
              },
            }}
          >
            Here are some of my projects which I have been working on.
          </Description>
        </motion.div>
        <ToggleButtonGroup
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.6, 
                delay: 0.7,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.8
              } 
            },
          }}
        >
          {/* Add a highlight that follows the selected category */}
          <motion.div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center"
            }}
          >
            {categories.map((category, index) => {
              const isActive = toggle === category;
              return (
                <motion.div key={category} style={{ position: "relative" }}>
                  {isActive && (
                    <CategoryHighlight
                      layoutId="categoryHighlight"
                      initial={false}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                  <ToggleButton
                    active={isActive}
                    onClick={() => handleCategoryChange(category)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { duration: 0.4 } 
                      }
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </ToggleButton>
                </motion.div>
              );
            })}
          </motion.div>
        </ToggleButtonGroup>
        <CardContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={toggle} // Important: Forces re-render when category changes
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
                <ProjectCardWrapper 
                  variants={cardVariants} 
                  key={project.id || index}
                  custom={index} // Use for staggered animation
                  whileHover={{ 
                    y: -10, // Reduced from -15 for better performance
                    transition: { 
                      type: "spring", 
                      stiffness: 200, // Reduced stiffness
                      damping: 15 
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  // Remove layout animations for better performance
                  transition={{
                    duration: 0.3
                  }}
                >
                
                  <ProjectCard 
                    project={project} 
                    openModal={openModal} 
                    setOpenModal={setOpenModal} 
                  />
                </ProjectCardWrapper>
              ))
          ) : (
            <EmptyMessage
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  } 
                },
              }}
            >
              No projects found in <span>{toggle}</span> category.
            </EmptyMessage>
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Project