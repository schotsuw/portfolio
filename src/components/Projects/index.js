
import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants';

const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
`;

const Wrapper= styled.div`
  position: reltive;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  gap: 12px;
  @media (max-width: 960px){
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px){
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 680;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px){
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
display: flex;
border: 1.5px solid ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.primary};
font-size: 16px;
border-radius: 12px;
font-weight: 500;
margin: 22px 0px;
@media (max-width: 768px) {
    font-size: 12px;
}
`;

const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    ${({ active, theme }) =>
        active && `
    background: ${theme.primary + 20};
    `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + 8};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`;


const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
    grid-auto-rows: minmax(100px, auto);
    @media (max-width: 960px) {
         grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 640px) {
         grid-template-columns: repeat(1, 1fr);
    }    
`;

const Project = ({openModal, setOpenModal}) => {
    const [toggle, setToggle] = useState('all');
  return (
    <Container id='projects'>
        <Wrapper>
            <Title>Projects</Title>
            <Description>These projects are based on my interests, and I've learned a lot from working on them</Description>
            <ToggleButtonGroup>
                {toggle === 'all' ? 
                  <ToggleButton active value='all' onClick={() => setToggle('all')}>All</ToggleButton> 
                  : 
                  <ToggleButton value='all' onClick={() => setToggle('all')}>All</ToggleButton>
                }
                <Divider/>
                {toggle === 'web app' ? 
                  <ToggleButton active value='web app' onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton> 
                  : 
                  <ToggleButton value='web app' onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
                }
                <Divider/>
                {toggle === 'game' ? 
                  <ToggleButton active value='game' onClick={() => setToggle('game')}>GAME</ToggleButton> 
                  : 
                  <ToggleButton value='game' onClick={() => setToggle('game')}>GAME</ToggleButton>
                }
                <Divider/>
                {toggle === 'ai-saas' ? 
                  <ToggleButton active value='ai-saas' onClick={() => setToggle('ai-saas')}>AI SAAS</ToggleButton> 
                  : 
                  <ToggleButton value='ai-saas' onClick={() => setToggle('ai-saas')}>AI SAAS</ToggleButton>
                }
            </ToggleButtonGroup>
            <CardContainer>
                {toggle === 'all' && projects.map((project) => (<ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>))}
                {projects
                .filter((item) => item.category === toggle)
                .map((project) => (
                    <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}></ProjectCard>))}
            </CardContainer>
        </Wrapper>
    </Container>
  )
}

export default Project