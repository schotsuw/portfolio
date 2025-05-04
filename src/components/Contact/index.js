import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Snackbar, Alert } from '@mui/material';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100
    }
  }
};

// Styled components with animations
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0 80px 0;
  @media (max-width: 960px) {
    padding: 30px 0 60px 0;
  }
`;

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 15px;
`;

const Title = styled(motion.h2)`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 0;
  background: linear-gradient(90deg, #007AFF, #5856D6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary || '#555'};
  margin-top: 0;
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 16px;
  }
`;

const ContactForm = styled(motion.form)`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card || '#ffffff'};
  padding: 38px;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 24px;
  margin-top: 28px;
  gap: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;
  
  &:hover {
    /* Subtle shadow, no translateY for better perf */
    box-shadow: rgba(0, 122, 255, 0.10) 0px 8px 32px;
    /* transform: translateY(-2px); */
  }
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const ContactTitle = styled(motion.h3)`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || '#000'};
`;

const InputContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  margin-bottom: 5px;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 16px;
  top: ${props => props.focused || props.hasValue ? '-16px' : '12px'};
  background: ${({ theme, focused }) => focused ? 'linear-gradient(90deg, #007AFF, #5856D6)' : theme.card || '#fff'};
  padding: 0 8px;
  font-size: ${props => props.focused || props.hasValue ? '12px' : '16px'};
  color: ${props => props.focused ? '#007AFF' : ({ theme }) => theme.text_secondary || '#555'};
  transition: all 0.2s ease;
  pointer-events: none;
  -webkit-background-clip: ${props => props.focused ? 'text' : 'unset'};
  -webkit-text-fill-color: ${props => props.focused ? 'transparent' : 'inherit'};
  margin-top: ${props => props.focused || props.hasValue ? '-4px' : '0'};
`;

const ContactInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${props => props.focused ? '#007AFF' : ({ theme }) => theme.text_secondary || '#555'};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary || '#000'};
  border-radius: 12px;
  padding: 15px 16px;
  transition: all 0.2s ease;
  
  &:focus {
    border: 1px solid #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${props => props.focused ? '#007AFF' : ({ theme }) => theme.text_secondary || '#555'};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary || '#000'};
  border-radius: 12px;
  padding: 15px 16px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;
  
  &:focus {
    border: 1px solid #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const ContactButton = styled(motion.button)`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(90deg, #007AFF, #5856D6);
  padding: 15px 16px;
  margin-top: 10px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0));
    transition: left 0.7s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 25px rgba(0, 122, 255, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const Contact = () => {
  // States for form inputs and focus
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('success');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [inputValues, setInputValues] = useState({
    from_email: '',
    from_name: '',
    subject: '',
    message: ''
  });
  
  const form = useRef();

  const handleFocus = (field) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!inputValues.from_email || !inputValues.from_name || !inputValues.message) {
      setStatus('error');
      setMessage('Please fill out all required fields');
      setOpen(true);
      setLoading(false);
      return;
    }
    
    emailjs.sendForm('service_3cgwktg', 'template_lcwu0lg', form.current, 'WLJeiDcP61bxrRDU6')
      .then((result) => {
        setStatus('success');
        setMessage('Message sent successfully! I\'ll get back to you soon.');
        setOpen(true);
        setLoading(false);
        // Reset form
        setInputValues({
          from_email: '',
          from_name: '',
          subject: '',
          message: ''
        });
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        setStatus('error');
        setMessage('Something went wrong. Please try again later.');
        setOpen(true);
        setLoading(false);
      });
  };

  return (
    <Container id="contact">
      <Wrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Title variants={itemVariants}>Get In Touch</Title>
        <Desc variants={itemVariants}>Have a question or want to work together? Drop me a message! 🚀</Desc>
        <ContactForm 
          ref={form} 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <ContactTitle variants={itemVariants}>Send Me a Message</ContactTitle>
          
          <InputContainer variants={itemVariants}>
            <InputLabel 
              focused={focusedField === 'email'} 
              hasValue={inputValues.from_email.length > 0}
            >
              Email
            </InputLabel>
            <ContactInput 
              name="from_email"
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.from_email}
              focused={focusedField === 'email'}
              required
            />
          </InputContainer>
          
          <InputContainer variants={itemVariants}>
            <InputLabel 
              focused={focusedField === 'name'} 
              hasValue={inputValues.from_name.length > 0}
            >
              Name
            </InputLabel>
            <ContactInput 
              name="from_name"
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.from_name}
              focused={focusedField === 'name'}
              required
            />
          </InputContainer>
          
          <InputContainer variants={itemVariants}>
            <InputLabel 
              focused={focusedField === 'subject'} 
              hasValue={inputValues.subject.length > 0}
            >
              Subject
            </InputLabel>
            <ContactInput 
              name="subject"
              onFocus={() => handleFocus('subject')}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.subject}
              focused={focusedField === 'subject'}
            />
          </InputContainer>
          
          <InputContainer variants={itemVariants}>
            <InputLabel 
              focused={focusedField === 'message'} 
              hasValue={inputValues.message.length > 0}
            >
              Message
            </InputLabel>
            <ContactInputMessage 
              name="message"
              rows="4"
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              onChange={handleChange}
              value={inputValues.message}
              focused={focusedField === 'message'}
              required
            />
          </InputContainer>
          
          <ContactButton 
            type="submit"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </ContactButton>
        </ContactForm>
        
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={status}
            sx={{
              width: '100%',
              fontSize: '14px',
              alignItems: 'center'
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;