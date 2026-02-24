import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      <div className="home-content">
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t('about.title')} <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Podiweda.com</span></h2>
          
          <div style={{ lineHeight: '1.8', color: '#2d3748' }}>
            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.whoWeAre')}</h3>
            <p>{t('about.whoWeAreText')}</p>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.ourMission')}</h3>
            <p>{t('about.ourMissionText')}</p>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.whyChoose')}</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {t('about.whyChooseItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.ourValues')}</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {t('about.ourValuesItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
