import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Sparkles, ExternalLink } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Sparkles className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full p-2 mr-2"
                >
                  <ChefHat className="h-5 w-5 text-white" />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Arisha's CookBot
                </h1>
                <span className="text-xs text-gray-400 -mt-1">AI-powered kitchen companion</span>
              </div>
            </Link>
            
            <nav>
              <ul className="flex items-center space-x-6">
                <li>
                  <Link 
                    to="/" 
                    className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium relative ${location.pathname === '/' ? 'text-emerald-600' : ''}`}
                  >
                    Home
                    {location.pathname === '/' && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium relative ${location.pathname === '/about' ? 'text-emerald-600' : ''}`}
                  >
                    About
                    {location.pathname === '/about' && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/your-repo/arishas-cookbot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-sm font-medium py-1.5 px-3 rounded-full flex items-center space-x-1 transition-colors duration-300"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full p-2 mr-2">
                  <ChefHat className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Arisha's CookBot
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Your AI-powered kitchen companion that turns available ingredients into delicious recipes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-emerald-500 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-500 hover:text-emerald-500 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#privacy" className="text-gray-500 hover:text-emerald-500 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#twitter" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#github" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#instagram" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Arisha's CookBot. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              Made with <span className="text-red-500">❤️</span> by Arisha Mumtaz.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}