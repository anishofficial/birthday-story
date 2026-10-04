document.addEventListener('DOMContentLoaded', () => {
  // 1. Floating Hearts Background
  const heartsContainer = document.getElementById('hearts-container');
  const createHeart = () => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 7 + 's'; // 7-10s
    heart.style.fontSize = Math.random() * 10 + 15 + 'px'; // 15-25px
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 10000);
  };
  
  setInterval(createHeart, 500);

  // 2. Music Control & Spotify Player Toggle
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const spotifyPlayerWrapper = document.getElementById('spotify-player-wrapper');

  if (musicToggleBtn && spotifyPlayerWrapper) {
    musicToggleBtn.addEventListener('click', () => {
      spotifyPlayerWrapper.classList.toggle('collapsed');
    });
  }

  // 3. Section Navigation Buttons
  const navButtons = document.querySelectorAll('[data-next]');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-next');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Interactive Birthday Cake & Candles Logic
  const candleButtons = [
    { btn: document.getElementById('btn-candle-1'), candle: document.getElementById('candle-1'), num: 1 },
    { btn: document.getElementById('btn-candle-2'), candle: document.getElementById('candle-2'), num: 2 },
    { btn: document.getElementById('btn-candle-3'), candle: document.getElementById('candle-3'), num: 3 }
  ];

  const cakeKnife = document.getElementById('cake-knife');
  const birthdayCake = document.getElementById('birthday-cake');
  const cakeInstruction = document.getElementById('cake-instruction');
  const cakeCutStatus = document.getElementById('cake-cut-status');
  const litCandleSet = new Set();

  candleButtons.forEach(({ btn, candle, num }) => {
    if (btn && candle) {
      btn.addEventListener('click', () => {
        if (litCandleSet.has(num)) return;

        // 1. Light candle with flame animation
        candle.classList.add('lit');
        btn.classList.add('lit-btn');
        btn.disabled = true;
        btn.innerHTML = `Candle ${num} Lit! 🔥`;
        litCandleSet.add(num);

        // Ambient sparks
        for (let j = 0; j < 8; j++) {
          setTimeout(createHeart, j * 50);
        }

        // 2. Check if all 3 candles are lit
        if (litCandleSet.size === 3) {
          triggerCakeCutting();
        }
      });
    }
  });

  function triggerCakeCutting() {
    if (cakeInstruction) {
      cakeInstruction.textContent = "All candles lit! Slicing the cake… 🎂🔪";
    }

    setTimeout(() => {
      // 1. Slice knife animation
      if (cakeKnife) {
        cakeKnife.classList.add('slice');
      }

      // 2. Cut cake animation
      if (birthdayCake) {
        birthdayCake.classList.add('cut');
      }

      // 3. Heart shower celebration
      startHeartShower();

      // 4. Reveal celebration status
      if (cakeCutStatus) {
        cakeCutStatus.classList.remove('hidden-start');
      }

      if (cakeInstruction) {
        cakeInstruction.textContent = "Make a wish, My Love! ✨";
      }

      // 5. Automatically scroll to next page (Hero Section) after 2.2 seconds
      setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2200);
    }, 600);
  }

  // 5. Scroll Reveal with IntersectionObserver
  const revealSections = document.querySelectorAll('.reveal-section');
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden-start');
        
        // Trigger specific animations based on section ID
        const id = entry.target.id;
        
        if (id === 'first-chat') {
          animateChatMessages(entry.target);
        } else if (id === 'why-i-love-you') {
          animateLoveList(entry.target);
        }
        
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealSections.forEach(section => {
    // Keep cake-screen visible from start, observe others
    if (section.id !== 'cake-screen') {
      sectionObserver.observe(section);
    } else {
      section.classList.add('visible');
      section.classList.remove('hidden-start');
    }
  });

  // 5. Staggered Animations
  function animateChatMessages(section) {
    const messages = section.querySelectorAll('.chat-message:not(.show)');
    messages.forEach((msg, index) => {
      setTimeout(() => {
        msg.classList.add('show');
      }, index * 800); // 800ms delay between messages
    });
  }

  function animateLoveList(section) {
    const items = section.querySelectorAll('.love-list li:not(.show)');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * 600);
    });
  }

  // 6. Proposal Typing Effect & Interactive Yes / No Choice
  const revealProposalBtn = document.getElementById('reveal-proposal-btn');
  const proposalText = document.getElementById('proposal-text');
  const proposalChoiceContainer = document.getElementById('proposal-choice-container');
  const proposalYesBtn = document.getElementById('proposal-yes-btn');
  const proposalNoBtn = document.getElementById('proposal-no-btn');
  const proposalSuccess = document.getElementById('proposal-success');
  const proposalMessage = "Will you be mine forever? 💍❤️";
  
  if (revealProposalBtn) {
    revealProposalBtn.addEventListener('click', () => {
      revealProposalBtn.style.display = 'none';
      proposalText.classList.remove('hidden-start');
      
      let i = 0;
      proposalText.innerHTML = "";
      
      function typeWriter() {
        if (i < proposalMessage.length) {
          proposalText.innerHTML += proposalMessage.charAt(i);
          i++;
          setTimeout(typeWriter, 80);
        } else {
          // Show Yes and No buttons smoothly after typing finishes
          if (proposalChoiceContainer) {
            proposalChoiceContainer.classList.remove('hidden-start');
          }
          // Ambient heart burst
          for (let j = 0; j < 15; j++) setTimeout(createHeart, j * 60);
        }
      }
      
      typeWriter();
    });
  }

  // Playful dodging "No" button
  const noPhrases = [
    'Are you sure? 🥺',
    'Think again! 😜',
    'Wrong button! 😂',
    'You can\'t say no! 💕',
    'Try clicking YES! 🥰',
    'Pretty please? 🥺❤️',
    'No is not an option! 😉'
  ];
  let noClickCount = 0;
  let yesScale = 1;

  function dodgeNoButton() {
    if (!proposalNoBtn) return;
    
    // Change phrase
    const nextPhrase = noPhrases[noClickCount % noPhrases.length];
    proposalNoBtn.textContent = nextPhrase;
    noClickCount++;

    // Random safe offset translation inside card
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 50;
    proposalNoBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Make YES button grow bigger and more irresistible
    if (proposalYesBtn) {
      yesScale += 0.08;
      proposalYesBtn.style.transform = `scale(${Math.min(yesScale, 1.4)})`;
    }
  }

  if (proposalNoBtn) {
    proposalNoBtn.addEventListener('mouseenter', dodgeNoButton);
    proposalNoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeNoButton();
    });
  }

  // Celebratory "YES" button click
  if (proposalYesBtn) {
    proposalYesBtn.addEventListener('click', () => {
      // Hide choices
      if (proposalChoiceContainer) {
        proposalChoiceContainer.style.display = 'none';
      }
      // Show success message and next step button
      if (proposalSuccess) {
        proposalSuccess.classList.remove('hidden-start');
      }
      // Trigger romantic heart shower
      startHeartShower();
    });
  }

  // 7. Full-Screen GPU-Accelerated Smooth Heart Shower
  const showerContainer = document.getElementById('shower-container');
  const celebrationFlash = document.getElementById('celebration-flash');
  const celebrationToast = document.getElementById('celebration-toast');
  const finaleCelebrateBtn = document.getElementById('finale-celebrate-btn');

  const heartEmojis = ['💖', '❤️', '💕', '💗', '💓', '💘', '💝', '✨', '🌸', '🥰', '🌹'];
  let showerTimer = null;

  function createShowerHeart(initialDelay = 0) {
    if (!showerContainer) return;

    const heart = document.createElement('div');
    heart.className = 'shower-heart';

    const inner = document.createElement('span');
    inner.className = 'shower-heart-inner';
    inner.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    const x = Math.random() * 96 + 2; // 2vw to 98vw for full-width coverage
    const drift = (Math.random() - 0.5) * 80; // Gentle wind drift
    const duration = Math.random() * 1.2 + 2.8; // 2.8s - 4.0s smooth fall duration
    const swayDuration = Math.random() * 0.8 + 1.2; // 1.2s - 2.0s fluttering speed
    const fontSize = Math.random() * 14 + 22; // 22px - 36px
    const rotStart = (Math.random() - 0.5) * 40;
    const rotEnd = (Math.random() - 0.5) * 40 + (Math.random() > 0.5 ? 25 : -25);
    const swayDist = (Math.random() - 0.5) * 30 + 10;

    heart.style.fontSize = `${fontSize}px`;
    heart.style.setProperty('--x', `${x}vw`);
    heart.style.setProperty('--drift', `${drift}px`);
    heart.style.setProperty('--fall-duration', `${duration}s`);
    heart.style.setProperty('--sway-duration', `${swayDuration}s`);
    heart.style.setProperty('--rot-start', `${rotStart}deg`);
    heart.style.setProperty('--rot-end', `${rotEnd}deg`);
    heart.style.setProperty('--sway-dist', `${swayDist}px`);

    if (initialDelay > 0) {
      heart.style.animationDelay = `${initialDelay}s`;
    }

    heart.appendChild(inner);
    showerContainer.appendChild(heart);

    // Auto-remove node after CSS animation completes
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }

  function startHeartShower() {
    if (showerTimer) clearInterval(showerTimer);

    // 1. Initial immediate gentle cascade
    for (let i = 0; i < 12; i++) {
      createShowerHeart(i * 0.08);
    }

    // 2. Continuous steady stream for 3.5 seconds
    let count = 0;
    const maxDrops = 75;
    showerTimer = setInterval(() => {
      createShowerHeart();
      count++;
      if (count >= maxDrops) {
        clearInterval(showerTimer);
        showerTimer = null;
      }
    }, 45);
  }

  if (finaleCelebrateBtn) {
    let toastTimeout = null;

    finaleCelebrateBtn.addEventListener('click', () => {
      // 1. Snappy button pop bounce animation
      finaleCelebrateBtn.classList.remove('pop');
      void finaleCelebrateBtn.offsetWidth; // trigger reflow
      finaleCelebrateBtn.classList.add('pop');

      // 2. Launch buttery-smooth GPU heart shower
      startHeartShower();

      // 3. Romantic screen flash effect
      if (celebrationFlash) {
        celebrationFlash.classList.remove('active');
        void celebrationFlash.offsetWidth;
        celebrationFlash.classList.add('active');
      }

      // 4. Celebration banner toast
      if (celebrationToast) {
        celebrationToast.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          celebrationToast.classList.remove('show');
        }, 3200);
      }

      // 5. Ambient rising bubbles from bottom
      for (let j = 0; j < 12; j++) {
        setTimeout(createHeart, j * 90);
      }
    });
  }
});
