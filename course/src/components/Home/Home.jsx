import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; // Import Chakra UI Button

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <div
          className="stack-container"
          style={{
            flexDirection: ['column', 'row'],
            height: '100%',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            spacing: ['16', '56'],
            paddingTop: '9rem', // Add top padding for vertical centering
          }}
        >
          <div
            className="vstack-container"
            style={{
              width: 'full',
              alignItems: 'center', // Center horizontally within the container
              spacing: '16',
              padding: '2rem', // Add padding for spacing
              textAlign: 'center', // Center text horizontally
            }}
          >
            <h1 className="heading" style={{ fontSize: '2rem' }}>
              HAPPY LEARNING
            </h1>
            <Link to="/Courses">
              <Button colorScheme={'yellow'}>Explore Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
