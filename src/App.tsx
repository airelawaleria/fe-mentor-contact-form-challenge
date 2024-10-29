import './App.css';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className='flex items-center justify-center content-center h-screen'>
      <ContactForm />
      <Toaster />
    </div>
  );
}

export default App;
