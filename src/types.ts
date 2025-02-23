export interface Business {
  id: number;
  name: string;
  industry: string;
  description: string;
  founded: string;
  employees: string;
  headquarters: string;
  revenue: string;
  majorityOwner: string;
  website: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
  };
  complianceScore: number;
  riskLevel: 'Dual Use Goods' | 'Medium' | 'High';
  lastUpdated: string;
  keyMetrics: {
    label: string;
    value: string;
    change: number;
  }[];
  recentNews: {
    date: string;
    title: string;
    source: string;
  }[];
  quarterlyRevenue: {
    quarter: string;
    revenue: number;
  }[];
  representatives: {
    name: string;
    dob: string;
    role: string;
    since: string;
  }[];
  representativesChanges: {
    count: number;
    lastChange: string;
  };
  owners: {
    name: string;
    dobOrRegDate: string;
    role: string;
    share: number;
    shareType: string;
    since: string;
  }[];
  ownersChanges: {
    count: number;
    lastChange: string;
  };
  beneficialOwners: {
    name: string;
    dob: string;
    control: string;
    since: string;
  }[];
  beneficialOwnersChanges: {
    count: number;
    lastChange: string;
  };
  registryInfo: {
    code: string;
    capital: string;
    address: string;
    email: string;
    phone: string;
    status: string;
    legalForm: string;
  };
  financialData: {
    year: number;
    currentAssets: number;
    fixedAssets: number;
    totalAssets: number;
    shortTermLiabilities: number;
    longTermLiabilities: number;
    totalLiabilities: number;
    shareCapital: number;
    retainedEarnings: number;
    netProfit: number;
    equityCapital: number;
    turnover: number;
    profitMargin: number;
  }[];
  taxData: {
    period: string;
    nationalTaxes: number;
    workforceTaxes: number;
    taxableTurnover: number;
    employeeCount: number;
  }[];
}