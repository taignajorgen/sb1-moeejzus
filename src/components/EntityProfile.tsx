import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowLeft, Building2, Users, Percent, Shield, Clock, Globe, Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Business } from '../types';

interface EntityProfileProps {
  entityName: string;
  onBack: () => void;
  relatedBusinesses: Array<{
    business: Business;
    relationships: Array<{
      type: 'Owner' | 'Ultimate Beneficial Owner' | 'Representative';
      role?: string;
      share?: number;
      since: string;
    }>;
  }>;
}

export function EntityProfile({ entityName, onBack, relatedBusinesses }: EntityProfileProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'revenue'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const relationshipTypes = useMemo(() => {
    const types = new Set<string>();
    relatedBusinesses.forEach(({ relationships }) => {
      relationships.forEach(rel => types.add(rel.type));
    });
    return ['all', ...Array.from(types)];
  }, [relatedBusinesses]);

  const filteredAndSortedBusinesses = useMemo(() => {
    return relatedBusinesses
      .filter(({ business, relationships }) => {
        const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            business.industry.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || 
                           relationships.some(rel => rel.type === selectedType);
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        const aValue = sortBy === 'name' ? a.business.name :
                      parseFloat(a.business.revenue.replace(/[^0-9.]/g, ''));
        const bValue = sortBy === 'name' ? b.business.name :
                      parseFloat(b.business.revenue.replace(/[^0-9.]/g, ''));
        
        return sortOrder === 'asc' 
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
  }, [relatedBusinesses, searchTerm, selectedType, sortBy, sortOrder]);

  const getRelationshipIcon = (type: string) => {
    switch (type) {
      case 'Owner':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'Ultimate Beneficial Owner':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'Representative':
        return <Building2 className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'name':
        return 'Company Name';
      case 'revenue':
        return 'Revenue';
      default:
        return 'Sort by';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{entityName}</h1>
            <p className="text-sm text-gray-500">
              Connected to {relatedBusinesses.length} {relatedBusinesses.length === 1 ? 'business' : 'businesses'}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company name or industry..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {relationshipTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Relationships' : type}
                </option>
              ))}
            </select>

            <div className="relative" ref={dropdownRef}>
              <button
                className="px-4 py-2 border border-gray-200 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>{getSortLabel()}</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${sortBy === 'name' ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder('asc');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Company Name
                  </button>
                  <button
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${sortBy === 'revenue' ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => {
                      setSortBy('revenue');
                      setSortOrder('desc');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Revenue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {filteredAndSortedBusinesses.map(({ business, relationships }) => (
          <div key={business.id} className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Company name and industry */}
              <div className="col-span-2">
                <h2 
                  className="text-base font-semibold text-blue-600 hover:text-blue-800 cursor-pointer truncate"
                  onClick={() => {
                    const event = new CustomEvent('selectBusiness', { detail: business });
                    window.dispatchEvent(event);
                  }}
                >
                  {business.name}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Globe className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{business.industry}</span>
                </div>
              </div>

              {/* Relationship type */}
              <div className="col-span-2">
                {relationships[0] && (
                  <div className="flex items-center space-x-1.5 text-sm">
                    {getRelationshipIcon(relationships[0].type)}
                    <span className="font-medium">{relationships[0].type}</span>
                  </div>
                )}
              </div>

              {/* Role */}
              <div className="col-span-2">
                {relationships[0]?.role && (
                  <div className="text-sm text-gray-500">
                    {relationships[0].role}
                  </div>
                )}
              </div>

              {/* Share */}
              <div className="col-span-2">
                {relationships[0]?.share && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Percent className="h-3 w-3" />
                    <span>{relationships[0].share}%</span>
                  </div>
                )}
              </div>

              {/* Since */}
              <div className="col-span-2">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Since {new Date(relationships[0].since).getFullYear()}</span>
                </div>
              </div>

              {/* Revenue */}
              <div className="col-span-2 text-right">
                <div className="text-sm font-medium">{business.revenue}</div>
                <div className="text-xs text-gray-500">Annual Revenue</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}