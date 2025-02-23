import React from 'react';
import { Business } from '../types';
import { History, Search, FileText, Linkedin } from 'lucide-react';

interface OwnershipInfoProps {
  business: Business;
  onEntityClick: (entityName: string) => void;
}

export function OwnershipInfo({ business, onEntityClick }: OwnershipInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('et-EE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const ChangeInfo = ({ count, lastChange }: { count: number; lastChange: string }) => (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <History className="h-4 w-4" />
      <span>{count} changes</span>
      <span>•</span>
      <span>Last change: {formatDate(lastChange)}</span>
    </div>
  );

  const getEstonianRegistryUrl = (name: string) => {
    const encodedName = encodeURIComponent(name.replace(/\s+/g, '+'));
    return `https://www.riigiteataja.ee/kohtulahendid/otsingutulemus.html?aktiivneTab=KOIK&sort=LahendiKuulutamiseAeg&asc=false&kohtuasjaNumber=&lahendiKpvAlgus=&lahendiKpvLopp=&menetluseKpvAlgus=&menetluseKpvLopp=&kohus=&kohtunik=&annotatsiooniSisu=&menetluseLiik=&lahendiLiik=&ecliNumber=&lahendiTekst=${encodedName}`;
  };

  const getOpenSanctionsUrl = (name: string) => {
    const encodedName = encodeURIComponent(name);
    return `https://www.opensanctions.org/search/?q=${encodedName}`;
  };

  const getLinkedinSearchUrl = (name: string) => {
    const encodedName = encodeURIComponent(name);
    return `https://www.linkedin.com/search/results/all/?keywords=${encodedName}`;
  };

  const ExternalLinks = ({ name }: { name: string }) => (
    <div className="flex space-x-2">
      <a href={getOpenSanctionsUrl(name)}
         target="_blank"
         rel="noopener noreferrer"
         className="text-gray-400 hover:text-blue-600"
         title="Search in OpenSanctions">
        <Search className="h-4 w-4" />
      </a>
      <a href={getEstonianRegistryUrl(name)}
         target="_blank"
         rel="noopener noreferrer"
         className="text-gray-400 hover:text-blue-600"
         title="Estonian Business Registry">
        <FileText className="h-4 w-4" />
      </a>
      <a href={getLinkedinSearchUrl(name)}
         target="_blank"
         rel="noopener noreferrer"
         className="text-gray-400 hover:text-blue-600"
         title="Search on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Representatives */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Representatives</h3>
          <ChangeInfo 
            count={business.representativesChanges.count}
            lastChange={business.representativesChanges.lastChange}
          />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Since</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {business.representatives.map((rep, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => onEntityClick(rep.name)}
                      >
                        {rep.name}
                      </span>
                      <ExternalLinks name={rep.name} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(rep.dob)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rep.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(rep.since)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Owners */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Owners</h3>
          <ChangeInfo 
            count={business.ownersChanges.count}
            lastChange={business.ownersChanges.lastChange}
          />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB/Reg. Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Since</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {business.owners.map((owner, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => onEntityClick(owner.name)}
                      >
                        {owner.name}
                      </span>
                      <ExternalLinks name={owner.name} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(owner.dobOrRegDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owner.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owner.share}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owner.shareType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(owner.since)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ultimate Beneficial Owners */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Ultimate Beneficial Owners</h3>
          <ChangeInfo 
            count={business.beneficialOwnersChanges.count}
            lastChange={business.beneficialOwnersChanges.lastChange}
          />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Since</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {business.beneficialOwners.map((owner, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => onEntityClick(owner.name)}
                      >
                        {owner.name}
                      </span>
                      <ExternalLinks name={owner.name} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(owner.dob)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owner.control}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(owner.since)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}