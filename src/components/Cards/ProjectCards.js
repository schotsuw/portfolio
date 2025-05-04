import React from 'react'
import styled from 'styled-components'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Button = styled.button`
    display: none;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: auto;
    min-width: 120px;
    max-width: 220px;
    padding: 10px 32px;
    background: linear-gradient(225deg, ${({ theme }) => theme.primary} 0%, #be1adb 100%);
    color: ${({ theme }) => theme.white};
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 ${({ theme }) => theme.primary}22;
    transition: all 0.22s cubic-bezier(.4,0,.2,1);
    position: absolute;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    z-index: 3;
    &:hover {
        background: linear-gradient(225deg, #be1adb 0%, ${({ theme }) => theme.primary} 100%);
        color: ${({ theme }) => theme.white};
        transform: translateX(-50%) scale(1.04);
        box-shadow: 0 6px 18px 0 ${({ theme }) => theme.primary}33;
    }
`;

const Card = styled.div`
    width: 340px;
    min-height: 500px;
    background: ${({ theme }) => theme.card + 'cc'};
    backdrop-filter: blur(8px);
    cursor: pointer;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 ${({ theme }) => theme.primary}22;
    overflow: hidden;
    padding: 28px 22px 22px 22px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    transition: all 0.22s cubic-bezier(.4,0,.2,1);
    &:hover {
        transform: translateY(-6px) scale(1.015);
        box-shadow: 0 12px 40px 0 ${({ theme }) => theme.primary}33;
        filter: brightness(1.03);
    }
    &:hover ${Button} {
        display: flex;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 14px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.15);
    object-fit: cover;
    transition: transform 0.22s cubic-bezier(.4,0,.2,1);
    &:hover {
        transform: scale(1.025);
    }
`;

const DateBadge = styled.div`
    position: absolute;
    top: 18px;
    right: 18px;
    background: ${({ theme }) => theme.primary + 'ee'};
    color: ${({ theme }) => theme.white};
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 12px;
    box-shadow: 0 2px 8px 0 ${({ theme }) => theme.primary}33;
    z-index: 2;
`;

const IconLinks = styled.div`
    display: flex;
    gap: 12px;
    position: absolute;
    top: 18px;
    left: 18px;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    ${Card}:hover & {
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.3s;
    }
`;

const IconButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: ${({ theme }) => theme.card_light};
    color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    font-size: 18px;
    box-shadow: 0 2px 8px 0 ${({ theme }) => theme.primary}22;
    transition: all 0.2s;
    margin-right: 2px;
    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
        transform: scale(1.08);
    }
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`;

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`;

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`;

const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`;

const Avatar = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card};
`;

const ProjectCards = ({project, setOpenModal}) => {
  return (
    <Card onClick={() => setOpenModal({state: true, project: project})}>
        <Image src={project.image}/>
        <DateBadge>{project.date}</DateBadge>
        <IconLinks>
          {project.github && (
            <IconButton href={project.github} target="_blank" onClick={e => e.stopPropagation()}><FaGithub /></IconButton>
          )}
          {project.webapp && (
            <IconButton href={project.webapp} target="_blank" onClick={e => e.stopPropagation()}><FaExternalLinkAlt /></IconButton>
          )}
        </IconLinks>
        <Tags>
            {project.tags?.map((tag, index) => (<Tag key={index}>{tag}</Tag>))}
        </Tags>
        <Details>
            <Title>{project.title}</Title>
            <Description>{project.description}</Description>
        </Details>
        <Members>
            {project.member?.map((member, idx) => (<Avatar key={idx} src={member.img}></Avatar>))}
        </Members>
        <Button>View Project</Button>
    </Card>
  )
}

export default ProjectCards