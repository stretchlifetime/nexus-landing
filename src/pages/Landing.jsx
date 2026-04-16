import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Archive from '../components/Archive';
import About from '../components/About';
import Reviews from '../components/Reviews';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import QuizModal from '../components/QuizModal';
import TermsModal from '../components/TermsModal';
import PrivacyModal from '../components/PrivacyModal';

export default function Landing() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [quizIntent, setQuizIntent] = useState('book'); // book | coaching | elite

  const openQuiz = (intent = 'book') => {
    setQuizIntent(intent);
    setIsQuizOpen(true);
  };

  return (
    <main className="relative bg-base min-h-screen font-sans">
      <Navbar onOpenQuiz={openQuiz} />
      <Hero onOpenQuiz={openQuiz} />
      <Manifesto />
      <Archive />
      <Pricing onOpenQuiz={openQuiz} />
      <Reviews />
      <About />
      <Footer 
        onOpenTerms={() => setIsTermsOpen(true)} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        intent={quizIntent} 
      />

      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />

      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </main>
  );
}
