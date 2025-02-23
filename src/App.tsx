import React, { useState, useEffect, useRef } from 'react';
import { Search, Circle, Building2, ClipboardCheck, Users, ArrowRight } from 'lucide-react';
import { mockBusinesses, getEntityRelationships } from './mockData';
import { BusinessProfile } from './components/BusinessProfile';
import { EntityProfile } from './components/EntityProfile';
import { Business } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter businesses based on search term
  const filteredBusinesses = mockBusinesses
    .filter(business => 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.industry.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredBusinesses.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          const selected = filteredBusinesses[selectedIndex];
          setSearchTerm(selected.name);
          setShowResults(false);
          setSelectedIndex(-1);
          setSelectedBusiness(selected);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleEntityClick = (entityName: string) => {
    setSelectedEntity(entityName);
    setSelectedBusiness(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    }

    function handleSelectBusiness(event: CustomEvent<Business>) {
      setSelectedBusiness(event.detail);
      setSelectedEntity(null);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('selectBusiness', handleSelectBusiness as EventListener);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('selectBusiness', handleSelectBusiness as EventListener);
    };
  }, []);

  if (selectedEntity) {
    return (
      <EntityProfile
        entityName={selectedEntity}
        onBack={() => setSelectedEntity(null)}
        relatedBusinesses={getEntityRelationships(selectedEntity)}
      />
    );
  }

  if (selectedBusiness) {
    return (
      <BusinessProfile 
        business={selectedBusiness}
        onBack={() => setSelectedBusiness(null)}
        onEntityClick={handleEntityClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Circle className="h-8 w-8 text-gray-900 fill-current" />
              <span className="text-2xl font-bold text-gray-900">Tarka</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Champion Transparency
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Make informed decisions with our advanced business verification system. 
              Get detailed reports on any registered Estonian business instantly.
            </p>
            <div className="max-w-xl mx-auto" ref={searchRef}>
              <div className="relative">
                <div className="flex items-center bg-white rounded-lg shadow-md p-2">
                  <Search className="h-5 w-5 text-gray-400 ml-2" />
                  <input
                    type="text"
                    placeholder="Search for a business..."
                    className="flex-1 px-4 py-2 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowResults(true);
                      setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowResults(true)}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Search
                  </button>
                </div>
                
                {showResults && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    {filteredBusinesses.length > 0 ? (
                      <ul className="divide-y divide-gray-100">
                        {filteredBusinesses.map((business, index) => (
                          <li
                            key={business.id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                              index === selectedIndex ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => {
                              setSearchTerm(business.name);
                              setShowResults(false);
                              setSelectedIndex(-1);
                              setSelectedBusiness(business);
                            }}
                          >
                            <div className="font-medium text-gray-900">{business.name}</div>
                            <div className="text-sm text-gray-500">{business.industry}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Verification</h3>
              <p className="text-gray-600">Verify business credentials and legal status with our comprehensive database.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">Access detailed reports including financial history, legal records, and more.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Owner History</h3>
              <p className="text-gray-600">Track ownership changes and verify business relationships over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-blue-100">Sign up now to access our comprehensive business registry database.</p>
            </div>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center">
              Start Searching
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Circle className="h-6 w-6 text-gray-900 fill-current" />
                <span className="text-xl font-bold text-white">Tarka</span>
              </div>
              <p className="text-sm">Providing reliable business information since 1970.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Background Checks</a></li>
                <li><a href="#" className="hover:text-white">Business Verification</a></li>
                <li><a href="#" className="hover:text-white">Risk Assessment</a></li>
                <li><a href="#" className="hover:text-white">Compliance Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Tarka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;