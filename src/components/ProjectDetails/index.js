import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CloseRounded, GitHub, LinkedIn, Language, Code } from '@mui/icons-material'
import { Modal } from '@mui/material'

// Modernized container with improved performance
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 16px;
    align-items: flex-start;
  }
`;

// Optimized wrapper with simpler effects
const Wrapper = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  border-radius: 24px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.text_primary}08;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 60px 0;
  }
`;

// Header section with improved styling
const Header = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Improved close button
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card_light};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 15;
  color: ${({ theme }) => theme.text_primary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.text_primary}20;
    transform: scale(1.05);
  }
`;

// Content section with improved layout
const Content = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

// Improved title
const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Styled date badge
const DateBadge = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.text_primary}10;
  padding: 6px 14px;
  border-radius: 30px;
  margin-top: 4px;
  max-width: fit-content;
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 10px;
  }
`;

// Improved tags container
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
`;

// Modernized tag
const Tag = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}15;
  padding: 6px 14px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.primary}30;
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 10px;
  }
`;

// Improved description styling
const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary}dd;
  line-height: 1.8;
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;

// Section divider
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.text_primary}15;
  margin: 8px 0;
`;

// Section title
const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 20px 0;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0 0 16px 0;
  }
`;

// Members container
const MembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Improved member card
const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 16px;
  background: ${({ theme }) => theme.text_primary}08;
  border: 1px solid ${({ theme }) => theme.text_primary}15;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.text_primary}10;
    transform: translateY(-2px);
  }
`;

// Improved member avatar
const MemberAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.card};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

// Member info container
const MemberInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

// Member name
const MemberName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Member role
const MemberRole = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// Social links container
const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

// Social link button
const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

// Modern buttons container
const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// Modern styled button
const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 16px;
  background: ${({ primary, theme }) => primary 
    ? theme.primary
    : theme.card_light
  };
  color: ${({ primary, theme }) => primary ? 'white' : theme.text_primary};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: ${({ primary, theme }) => primary 
    ? `0 4px 12px ${theme.primary}40`
    : '0 4px 8px rgba(0, 0, 0, 0.1)'
  };
  border: 1px solid ${({ primary, theme }) => primary 
    ? 'transparent' 
    : theme.text_primary + '20'
  };
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ primary, theme }) => primary 
      ? `0 6px 16px ${theme.primary}60`
      : '0 6px 12px rgba(0, 0, 0, 0.15)'
    };
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  
  // Simple animation for modal
  const modalAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <Modal 
      open={openModal.state} 
      onClose={() => setOpenModal({ state: false, project: null })}
    >
      <Container onClick={() => setOpenModal({ state: false, project: null })}>
        <Wrapper 
          onClick={(e) => e.stopPropagation()}
          initial={modalAnimation.initial}
          animate={modalAnimation.animate}
        >
          <CloseButton
            onClick={() => setOpenModal({ state: false, project: null })}
          >
            <CloseRounded fontSize="small" />
          </CloseButton>
          
          <Header>
            <HeaderImage 
              src={project?.image} 
              alt={project?.title}
            />
          </Header>
          
          <Content>
            <div>
              <Title>{project?.title}</Title>
              <DateBadge>{project?.date}</DateBadge>
            </div>
            
            <Tags>
              {project?.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                </Tag>
              ))}
            </Tags>
            
            <Description>{project?.description}</Description>
            
            {project?.member && project?.member.length > 0 && (
              <>
                <Divider />
                <div>
                  <SectionTitle>Team Members</SectionTitle>
                  <MembersContainer>
                    {project?.member.map((member, index) => (
                      <MemberCard key={index}>
                        <MemberAvatar src={member.img} alt={member.name} />
                        <MemberInfo>
                          <MemberName>{member.name}</MemberName>
                          {member.role && <MemberRole>{member.role}</MemberRole>}
                        </MemberInfo>
                        <SocialLinks>
                          {member.github && (
                            <SocialLink 
                              href={member.github} 
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <GitHub fontSize="small" />
                            </SocialLink>
                          )}
                          {member.linkedin && (
                            <SocialLink 
                              href={member.linkedin} 
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <LinkedIn fontSize="small" />
                            </SocialLink>
                          )}
                        </SocialLinks>
                      </MemberCard>
                    ))}
                  </MembersContainer>
                </div>
              </>
            )}
            
            <ButtonGroup>
              {project?.github && (
                <Button 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code fontSize="small" /> View Code
                </Button>
              )}
              {project?.webapp && (
                <Button 
                  primary
                  href={project.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Language fontSize="small" /> View Live Demo
                </Button>
              )}
            </ButtonGroup>
          </Content>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default ProjectDetails;