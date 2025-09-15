import React from 'react';
import styles from './ResourcesModal.module.css';
import { yogaResources, podcastResources } from '../data/resources';

const ResourcesModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // Map yoga categories to specific colors
  const categoryColors = {
    'Stress & Anxiety': 'color-yellow',
    'Depression / Low Mood': 'color-blue',
    'Overthinking / Lack of Focus': 'color-purple',
    'Insomnia / Neend ki Samasya': 'color-pink',
    'Anger & Irritability': 'color-red',
    'Confidence & Self-Esteem Issues': 'color-green',
  };

  // Map podcast categories to specific colors
  const podcastColors = [
      'color-blue',
      'color-purple',
      'color-pink',
      'color-yellow',
      'color-green',
      'color-red',
      'color-orange',
      'color-blue', // Re-use colors if you have more items than colors
  ];

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.active : ''}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className={styles.modalTitle}>Psychoeducational Resource Hub</h2>
        <div className={styles.modalDescription}>
          Explore our curated collection of resources tailored for your well-being, available in multiple regional languages.
        </div>
        
        {/* Dynamically render Yoga Resources */}
        {yogaResources.map((section, index) => (
          <div key={index} className={styles.resourceSection}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            {section.items.map((category, catIndex) => (
              <div key={catIndex} className={styles.categoryBlock}>
                <h4 className={styles.categoryTitle}>{category.category}</h4>
                <div className={styles.resourceList}>
                  {category.exercises.map((exercise, exIndex) => (
                    // Apply the color class here
                    <div 
                      key={exIndex} 
                      className={`${styles.resourceCard} ${styles[categoryColors[category.category]]}`}
                    >
                      <h5 className={styles.resourceTitle}>
                        <a href={exercise.link} target="_blank" rel="noopener noreferrer">
                          {exercise.name}
                        </a>
                      </h5>
                      <p className={styles.resourceDescription}>{exercise.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Dynamic rendering of Podcast Resources */}
        <div className={styles.resourceSection}>
          <h3 className={styles.sectionTitle}>Podcasts</h3>
          <div className={styles.podcastGrid}>
            {podcastResources.map((podcast, index) => (
              // Apply the color class here
              <div 
                key={index} 
                className={`${styles.resourceCard} ${styles[podcastColors[index]]}`}
              >
                <h5 className={styles.resourceTitle}>
                  <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                    {podcast.name}
                  </a>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesModal;