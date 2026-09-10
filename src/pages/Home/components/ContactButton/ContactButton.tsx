import { Link } from 'react-router-dom';
import styles from './ContactButton.module.css';

const ContactButton = () => {
  return (
    <Link to="/get-started">
      <button className={styles.button}>Get Started</button>
    </Link>
  );
};

export default ContactButton;
