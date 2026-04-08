import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import WhatsAppFloat from '../WhatsAppFloat/WhatsAppFloat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Layout;