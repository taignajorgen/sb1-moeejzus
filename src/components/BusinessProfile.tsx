import React from 'react';
import { ArrowLeft, Building2, Users, DollarSign, Award, AlertTriangle, TrendingUp, Globe, Linkedin, Twitter, FileText, Search, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Business } from '../types';
import { RevenueGraph } from './RevenueGraph';
import { OwnershipInfo } from './OwnershipInfo';
import { SmallRevenueGraph } from './SmallRevenueGraph';
import { FinancialDataTable } from './FinancialDataTable';
import { TaxInformationTable } from './TaxInformationTable';

interface BusinessProfileProps {
  business: Business;
  onBack: () => void;
  onEntityClick: (entityName: string) => void;
}

export function BusinessProfile({ business, onBack, onEntityClick }: BusinessProfileProps) {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Dual Use Goods': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstonianRegistryUrl = (companyName: string) => {
    const encodedName = encodeURIComponent(companyName.replace(/\s+/g, '+'));
    return `https://www.riigiteataja.ee/kohtulahendid/otsingutulemus.html?aktiivneTab=KOIK&sort=LahendiKuulutamiseAeg&asc=false&kohtuasjaNumber=&lahendiKpvAlgus=&lahendiKpvLopp=&menetluseKpvAlgus=&menetluseKpvLopp=&kohus=&kohtunik=&annotatsiooniSisu=&menetluseLiik=&lahendiLiik=&ecliNumber=&lahendiTekst=${encodedName}`;
  };

  const getOpenSanctionsUrl = (companyName: string) => {
    const encodedName = encodeURIComponent(companyName);
    return `https://www.opensanctions.org/search/?q=${encodedName}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{business.industry}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(business.riskLevel)}`}>
                {business.riskLevel}
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href={getOpenSanctionsUrl(business.name)}
               target="_blank"
               rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-600"
               title="Search in OpenSanctions">
              <Search className="h-5 w-5" />
            </a>
            <a href={getEstonianRegistryUrl(business.name)}
               target="_blank"
               rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-600"
               title="Estonian Business Registry">
              <FileText className="h-5 w-5" />
            </a>
            {business.socialMedia.linkedin && (
              <a href={`https://linkedin.com/company/${business.socialMedia.linkedin}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-600 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {business.socialMedia.twitter && (
              <a href={`https://twitter.com/${business.socialMedia.twitter}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-600 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
            <p className="text-gray-600 mb-6">{business.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500">Founded</div>
                <div className="font-medium">{business.founded}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Employees</div>
                <div className="font-medium">{business.employees}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="font-medium">{business.revenue}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Majority Owner</div>
                <div 
                  className="font-medium cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => onEntityClick(business.majorityOwner)}
                >
                  {business.majorityOwner}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Revenue Graphs */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <SmallRevenueGraph
                data={business.quarterlyRevenue.slice(-5)}
                title="Yearly Revenue"
                period="Last 5 years"
              />
              <SmallRevenueGraph
                data={business.quarterlyRevenue.slice(-5)}
                title="Total Assets"
                period="Last 5 years"
              />
              <SmallRevenueGraph
                data={business.quarterlyRevenue.slice(-5)}
                title="Total Liabilities"
                period="Last 5 years"
              />
              <SmallRevenueGraph
                data={business.quarterlyRevenue.slice(-5)}
                title="Equity Capital"
                period="Last 5 years"
              />
            </div>

            {/* Registry Information */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-sm font-semibold mb-4">Registry Information</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Registry Code</div>
                    <div className="font-medium">{business.registryInfo.code}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Legal Form</div>
                    <div className="font-medium">{business.registryInfo.legalForm}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Share Capital</div>
                    <div className="font-medium">{business.registryInfo.capital}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="font-medium">{business.registryInfo.address}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium">{business.registryInfo.status}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ownership Information */}
          <OwnershipInfo business={business} onEntityClick={onEntityClick} />

          {/* Tax Information */}
          <TaxInformationTable data={business.taxData} />

          {/* Financial Data Table */}
          <FinancialDataTable data={business.financialData} />

          {/* Recent News */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent News</h2>
            <div className="space-y-4">
              {business.recentNews.map((news, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="text-sm text-gray-500 mb-1">{news.date}</div>
                  <div className="font-medium mb-1">{news.title}</div>
                  <div className="text-sm text-gray-600">Source: {news.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Right column content can be added here if needed */}
        </div>
      </div>
    </div>
  );
}