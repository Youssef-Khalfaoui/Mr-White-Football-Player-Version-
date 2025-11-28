import styled, { keyframes, css } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  backdrop-filter: blur(8px);
  transition: opacity 0.4s ease;

  &.entering {
    animation: fadeIn 0.4s ease-out forwards;
  }

  &.exiting {
    animation: fadeOut 0.4s ease-in forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  transition: filter 0.3s ease;

  ${(props) =>
    props.dimmed &&
    css`
      filter: brightness(0.4);
      pointer-events: none;
    `}

  @media (max-height: 600px) {
    padding: 20px;
  }
`;

export const Title = styled.h1`
  color: #7e1532;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #7e1532;
  border-radius: 10px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #b82550;
    box-shadow: 0 0 0 3px rgba(126, 21, 50, 0.1);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #7e1532, #b82550);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(126, 21, 50, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export const GuestButton = styled.button`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  background: ${(props) =>
    props.revealed
      ? 'linear-gradient(135deg, #2ecc71, #27ae60)'
      : 'white'};
  color: ${(props) => (props.revealed ? 'white' : '#7e1532')};
  border: 2px solid ${(props) => (props.revealed ? '#27ae60' : '#7e1532')};
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(126, 21, 50, 0.2);
  }
`;

const flipIn = keyframes`
  0% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(180deg) scale(0.3);
    opacity: 0;
  }
  40% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(-20deg) scale(1.1);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(10deg) scale(0.95);
  }
  100% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(0deg) scale(1);
    opacity: 1;
  }
`;

const flipOut = keyframes`
  0% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(0deg) scale(1);
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(-15deg) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) perspective(1200px) rotateY(180deg) scale(0.3);
    opacity: 0;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-12px);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 25px 80px rgba(126, 21, 50, 0.5),
                0 0 60px rgba(184, 37, 80, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }
  50% {
    box-shadow: 0 30px 100px rgba(126, 21, 50, 0.7),
                0 0 80px rgba(184, 37, 80, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  }
`;

// Floating modal card container
export const PlayerCardModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  transform-style: preserve-3d;

  &.entering {
    animation: ${flipIn} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
               ${floatAnimation} 3s ease-in-out 0.7s infinite;
  }

  &.exiting {
    animation: ${flipOut} 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
  }
`;

export const PlayerCard = styled.div`
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%);
  border-radius: 20px;
  padding: 30px 35px;
  color: white;
  text-align: center;
  animation: ${pulseGlow} 2s ease-in-out infinite;
  min-width: 300px;
  max-width: 360px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 3px solid #e94560;
  backface-visibility: hidden;

  /* Animated gradient border */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 22px;
    background: linear-gradient(45deg, #e94560, #ffd700, #e94560, #00d4ff, #e94560);
    background-size: 400% 400%;
    z-index: -1;
    animation: gradientBorder 3s ease infinite;
  }

  @keyframes gradientBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Inner card background */
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    background: linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%);
    border-radius: 17px;
    z-index: -1;
  }
`;

export const CardHeader = styled.div`
  background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
  margin: -30px -35px 20px -35px;
  padding: 18px 20px;
  border-radius: 17px 17px 0 0;
  position: relative;
  
  h2 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const PlayerImageContainer = styled.div`
  position: relative;
  margin: 10px auto 20px;
  width: 140px;
  height: 140px;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e94560, #ffd700, #00d4ff);
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const PlayerImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid #1a1a2e;
  object-fit: cover;
  position: relative;
  z-index: 1;
  background: #16213e;
`;

export const PlayerName = styled.h3`
  font-size: 1.8rem;
  margin: 15px 0;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
`;

export const PlayerStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(233, 69, 96, 0.2);
    border-color: #e94560;
    transform: translateY(-2px);
  }
  
  .stat-icon {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }
  
  .stat-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2px;
  }
  
  .stat-value {
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
  }
`;

export const PositionBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 5px;
  box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
`;

export const CloseHint = styled.p`
  margin-top: 20px;
  font-size: 0.8rem;
  opacity: 0.4;
  font-style: italic;
  letter-spacing: 0.5px;
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 15px;
`;

export const ProgressText = styled.p`
  text-align: center;
  color: #7e1532;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

export const NameList = styled.div`
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
`;

export const NameItem = styled.div`
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 500;
    color: #333;
  }
`;

export const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: #c0392b;
  }
`;