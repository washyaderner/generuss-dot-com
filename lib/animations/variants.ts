/**
 * Animation Variants Library
 * A collection of reusable animation configurations for consistent UI animations throughout the site.
 */

import { Variants } from 'framer-motion';

/* Page Transition Variants */

/**
 * Page transition animation for consistent page changes
 */
export const pageVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

/* Card Animation Variants */

/**
 * Staggered entrance for card elements
 */
export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 260,
      damping: 20 
    }
  },
  hover: {
    y: -5,
    scale: 1.03,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  }
};

/**
 * Staggered entrance for grid layouts
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/* Text Animation Variants */

/**
 * Text reveal animation for headings
 */
export const headingVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  }
};

/**
 * Letter-by-letter text animation
 */
export const letterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  }
};

/* Other Element Animations */

/**
 * Fade-in animation for general elements
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: 'easeInOut' 
    }
  }
};

/**
 * Scale-in animation for buttons and interactive elements
 */
export const scaleVariants: Variants = {
  hidden: { 
    scale: 0,
    opacity: 0 
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
}; 