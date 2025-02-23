import { Business } from './types';

export const mockBusinesses: Business[] = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Manufacturing",
    description: "Manufacture of bearings, gears, gearing and driving elements",
    founded: "1985",
    employees: "5,000+",
    headquarters: "Chicago, IL",
    revenue: "$2.5B (2023)",
    majorityOwner: "Sarah Chen (CN)",
    website: "www.acmecorp.com",
    socialMedia: {
      linkedin: "acme-corporation",
      twitter: "acmecorp"
    },
    complianceScore: 92,
    riskLevel: "Dual Use Goods",
    lastUpdated: "2024-03-15",
    keyMetrics: [
      { label: "Customer Satisfaction", value: "4.5/5", change: 0.3 }
    ],
    recentNews: [
      {
        date: "2024-03-10",
        title: "Acme Corp Announces Expansion into European Markets",
        source: "Business Weekly"
      },
      {
        date: "2024-02-28",
        title: "New Sustainable Manufacturing Initiative Launched",
        source: "Industry Today"
      }
    ],
    quarterlyRevenue: [
      { quarter: "Q1 2023", revenue: 580 },
      { quarter: "Q2 2023", revenue: 620 },
      { quarter: "Q3 2023", revenue: 650 },
      { quarter: "Q4 2023", revenue: 700 },
      { quarter: "Q1 2024", revenue: 720 }
    ],
    representatives: [
      {
        name: "Maria Kowalski (PL)",
        dob: "1975-03-15",
        role: "Board Member",
        since: "2020-01-01"
      },
      {
        name: "John Smith (UK)",
        dob: "1980-07-22",
        role: "CEO",
        since: "2019-06-15"
      }
    ],
    representativesChanges: {
      count: 3,
      lastChange: "2024-02-15"
    },
    owners: [
      {
        name: "Acme Holdings Ltd",
        dobOrRegDate: "1980-01-01",
        role: "Legal Entity",
        share: 51,
        shareType: "Common Stock",
        since: "2015-03-01"
      },
      {
        name: "Sarah Chen (CN)",
        dobOrRegDate: "1970-11-30",
        role: "Individual",
        share: 25,
        shareType: "Common Stock",
        since: "2015-03-01"
      }
    ],
    ownersChanges: {
      count: 2,
      lastChange: "2023-11-30"
    },
    beneficialOwners: [
      {
        name: "Sarah Chen (CN)",
        dob: "1970-11-30",
        control: "Direct ownership > 25%",
        since: "2015-03-01"
      }
    ],
    beneficialOwnersChanges: {
      count: 1,
      lastChange: "2023-11-30"
    },
    registryInfo: {
      code: "12345678",
      capital: "€2,500,000",
      address: "Tartu mnt 10, 10145 Tallinn",
      email: "info@acmecorp.ee",
      phone: "+372 5555 1234",
      status: "Registered",
      legalForm: "Private Limited Company"
    },
    financialData: [
      {
        year: 2019,
        currentAssets: 15000000,
        fixedAssets: 25000000,
        totalAssets: 40000000,
        shortTermLiabilities: 8000000,
        longTermLiabilities: 12000000,
        totalLiabilities: 20000000,
        shareCapital: 10000000,
        retainedEarnings: 8000000,
        netProfit: 2000000,
        equityCapital: 20000000,
        turnover: 45000000,
        profitMargin: 4.44
      },
      {
        year: 2020,
        currentAssets: 18000000,
        fixedAssets: 27000000,
        totalAssets: 45000000,
        shortTermLiabilities: 9000000,
        longTermLiabilities: 13000000,
        totalLiabilities: 22000000,
        shareCapital: 10000000,
        retainedEarnings: 10000000,
        netProfit: 2500000,
        equityCapital: 23000000,
        turnover: 50000000,
        profitMargin: 5.00
      },
      {
        year: 2021,
        currentAssets: 22000000,
        fixedAssets: 30000000,
        totalAssets: 52000000,
        shortTermLiabilities: 10000000,
        longTermLiabilities: 14000000,
        totalLiabilities: 24000000,
        shareCapital: 10000000,
        retainedEarnings: 13000000,
        netProfit: 3500000,
        equityCapital: 28000000,
        turnover: 58000000,
        profitMargin: 6.03
      },
      {
        year: 2022,
        currentAssets: 25000000,
        fixedAssets: 32000000,
        totalAssets: 57000000,
        shortTermLiabilities: 11000000,
        longTermLiabilities: 15000000,
        totalLiabilities: 26000000,
        shareCapital: 10000000,
        retainedEarnings: 16000000,
        netProfit: 4000000,
        equityCapital: 31000000,
        turnover: 65000000,
        profitMargin: 6.15
      },
      {
        year: 2023,
        currentAssets: 28000000,
        fixedAssets: 35000000,
        totalAssets: 63000000,
        shortTermLiabilities: 12000000,
        longTermLiabilities: 16000000,
        totalLiabilities: 28000000,
        shareCapital: 10000000,
        retainedEarnings: 20000000,
        netProfit: 5000000,
        equityCapital: 35000000,
        turnover: 72000000,
        profitMargin: 6.94
      }
    ],
    taxData: [
      {
        period: "2021 yr Q1",
        nationalTaxes: 0,
        workforceTaxes: 0,
        taxableTurnover: 0,
        employeeCount: 1
      },
      {
        period: "2020 yr Q4",
        nationalTaxes: 0,
        workforceTaxes: 0,
        taxableTurnover: 0,
        employeeCount: 1
      },
      {
        period: "2020 yr Q3",
        nationalTaxes: 0,
        workforceTaxes: 0,
        taxableTurnover: 0,
        employeeCount: 1
      },
      {
        period: "2020 yr Q2",
        nationalTaxes: 0,
        workforceTaxes: 0,
        taxableTurnover: 0,
        employeeCount: 1
      }
    ]
  },
  {
    id: 2,
    name: "TechVision Solutions OÜ",
    industry: "Information Technology",
    description: "Enterprise software development and cloud solutions",
    founded: "2018",
    employees: "250+",
    headquarters: "Tallinn, Estonia",
    revenue: "€45M (2023)",
    majorityOwner: "Sarah Chen (CN)",
    website: "www.techvision.ee",
    socialMedia: {
      linkedin: "techvision-solutions",
      twitter: "techvisionEE"
    },
    complianceScore: 88,
    riskLevel: "Medium",
    lastUpdated: "2024-03-14",
    keyMetrics: [
      { label: "Client Retention", value: "95%", change: 0.2 }
    ],
    recentNews: [
      {
        date: "2024-03-12",
        title: "TechVision Secures Major Government Contract",
        source: "Estonian Business Daily"
      }
    ],
    quarterlyRevenue: [
      { quarter: "Q1 2023", revenue: 10 },
      { quarter: "Q2 2023", revenue: 12 },
      { quarter: "Q3 2023", revenue: 11 },
      { quarter: "Q4 2023", revenue: 13 },
      { quarter: "Q1 2024", revenue: 14 }
    ],
    representatives: [
      {
        name: "Erik Tamm (EE)",
        dob: "1982-05-20",
        role: "CEO",
        since: "2018-01-01"
      }
    ],
    representativesChanges: {
      count: 1,
      lastChange: "2018-01-01"
    },
    owners: [
      {
        name: "Sarah Chen (CN)",
        dobOrRegDate: "1970-11-30",
        role: "Individual",
        share: 60,
        shareType: "Common Stock",
        since: "2018-01-01"
      },
      {
        name: "Tech Ventures AS",
        dobOrRegDate: "2015-06-15",
        role: "Legal Entity",
        share: 40,
        shareType: "Common Stock",
        since: "2018-01-01"
      }
    ],
    ownersChanges: {
      count: 1,
      lastChange: "2018-01-01"
    },
    beneficialOwners: [
      {
        name: "Sarah Chen (CN)",
        dob: "1970-11-30",
        control: "Direct ownership > 25%",
        since: "2018-01-01"
      }
    ],
    beneficialOwnersChanges: {
      count: 1,
      lastChange: "2018-01-01"
    },
    registryInfo: {
      code: "14567890",
      capital: "€25,000",
      address: "Lõõtsa 2a, 11415 Tallinn",
      email: "info@techvision.ee",
      phone: "+372 5555 5678",
      status: "Registered",
      legalForm: "Private Limited Company"
    },
    financialData: [
      {
        year: 2021,
        currentAssets: 5000000,
        fixedAssets: 2000000,
        totalAssets: 7000000,
        shortTermLiabilities: 1500000,
        longTermLiabilities: 1000000,
        totalLiabilities: 2500000,
        shareCapital: 25000,
        retainedEarnings: 4475000,
        netProfit: 1500000,
        equityCapital: 4500000,
        turnover: 15000000,
        profitMargin: 10.00
      },
      {
        year: 2022,
        currentAssets: 7000000,
        fixedAssets: 3000000,
        totalAssets: 10000000,
        shortTermLiabilities: 2000000,
        longTermLiabilities: 1500000,
        totalLiabilities: 3500000,
        shareCapital: 25000,
        retainedEarnings: 6475000,
        netProfit: 2000000,
        equityCapital: 6500000,
        turnover: 20000000,
        profitMargin: 10.00
      },
      {
        year: 2023,
        currentAssets: 10000000,
        fixedAssets: 5000000,
        totalAssets: 15000000,
        shortTermLiabilities: 3000000,
        longTermLiabilities: 2000000,
        totalLiabilities: 5000000,
        shareCapital: 25000,
        retainedEarnings: 9975000,
        netProfit: 3500000,
        equityCapital: 10000000,
        turnover: 45000000,
        profitMargin: 7.78
      }
    ],
    taxData: [
      {
        period: "2023 Q4",
        nationalTaxes: 875000,
        workforceTaxes: 450000,
        taxableTurnover: 11250000,
        employeeCount: 250
      },
      {
        period: "2023 Q3",
        nationalTaxes: 825000,
        workforceTaxes: 425000,
        taxableTurnover: 10750000,
        employeeCount: 240
      },
      {
        period: "2023 Q2",
        nationalTaxes: 775000,
        workforceTaxes: 400000,
        taxableTurnover: 10250000,
        employeeCount: 230
      }
    ]
  },
  {
    id: 3,
    name: "Nordic Investments AS",
    industry: "Financial Services",
    description: "Investment management and financial consulting",
    founded: "2010",
    employees: "50+",
    headquarters: "Oslo, Norway",
    revenue: "€15M (2023)",
    majorityOwner: "Tech Ventures AS",
    website: "www.nordicinv.no",
    socialMedia: {
      linkedin: "nordic-investments"
    },
    complianceScore: 95,
    riskLevel: "Medium",
    lastUpdated: "2024-03-10",
    keyMetrics: [
      { label: "Assets Under Management", value: "€2.5B", change: 0.15 }
    ],
    recentNews: [
      {
        date: "2024-03-01",
        title: "Nordic Investments Expands Baltic Operations",
        source: "Nordic Business Journal"
      }
    ],
    quarterlyRevenue: [
      { quarter: "Q1 2023", revenue: 3.5 },
      { quarter: "Q2 2023", revenue: 3.8 },
      { quarter: "Q3 2023", revenue: 3.7 },
      { quarter: "Q4 2023", revenue: 4.0 },
      { quarter: "Q1 2024", revenue: 4.2 }
    ],
    representatives: [
      {
        name: "Lars Hansen (NO)",
        dob: "1968-09-12",
        role: "CEO",
        since: "2010-01-01"
      },
      {
        name: "Maria Kowalski (PL)",
        dob: "1975-03-15",
        role: "Board Member",
        since: "2019-06-01"
      }
    ],
    representativesChanges: {
      count: 2,
      lastChange: "2019-06-01"
    },
    owners: [
      {
        name: "Tech Ventures AS",
        dobOrRegDate: "2015-06-15",
        role: "Legal Entity",
        share: 75,
        shareType: "Common Stock",
        since: "2015-06-15"
      },
      {
        name: "Lars Hansen (NO)",
        dobOrRegDate: "1968-09-12",
        role: "Individual",
        share: 25,
        shareType: "Common Stock",
        since: "2010-01-01"
      }
    ],
    ownersChanges: {
      count: 2,
      lastChange: "2015-06-15"
    },
    beneficialOwners: [
      {
        name: "Sarah Chen (CN)",
        dob: "1970-11-30",
        control: "Indirect ownership through Tech Ventures AS",
        since: "2015-06-15"
      },
      {
        name: "Lars Hansen (NO)",
        dob: "1968-09-12",
        control: "Direct ownership > 25%",
        since: "2010-01-01"
      }
    ],
    beneficialOwnersChanges: {
      count: 2,
      lastChange: "2015-06-15"
    },
    registryInfo: {
      code: "NO987654321",
      capital: "NOK 1,000,000",
      address: "Karl Johans gate 15, 0154 Oslo",
      email: "contact@nordicinv.no",
      phone: "+47 21 54 67 89",
      status: "Registered",
      legalForm: "Private Limited Company"
    },
    financialData: [
      {
        year: 2021,
        currentAssets: 8000000,
        fixedAssets: 2000000,
        totalAssets: 10000000,
        shortTermLiabilities: 2000000,
        longTermLiabilities: 1000000,
        totalLiabilities: 3000000,
        shareCapital: 100000,
        retainedEarnings: 6900000,
        netProfit: 2000000,
        equityCapital: 7000000,
        turnover: 12000000,
        profitMargin: 16.67
      },
      {
        year: 2022,
        currentAssets: 10000000,
        fixedAssets: 2500000,
        totalAssets: 12500000,
        shortTermLiabilities: 2500000,
        longTermLiabilities: 1000000,
        totalLiabilities: 3500000,
        shareCapital: 100000,
        retainedEarnings: 8900000,
        netProfit: 2500000,
        equityCapital: 9000000,
        turnover: 13500000,
        profitMargin: 18.52
      },
      {
        year: 2023,
        currentAssets: 12000000,
        fixedAssets: 3000000,
        totalAssets: 15000000,
        shortTermLiabilities: 3000000,
        longTermLiabilities: 1000000,
        totalLiabilities: 4000000,
        shareCapital: 100000,
        retainedEarnings: 10900000,
        netProfit: 3000000,
        equityCapital: 11000000,
        turnover: 15000000,
        profitMargin: 20.00
      }
    ],
    taxData: [
      {
        period: "2023 Q4",
        nationalTaxes: 750000,
        workforceTaxes: 250000,
        taxableTurnover: 3750000,
        employeeCount: 50
      },
      {
        period: "2023 Q3",
        nationalTaxes: 725000,
        workforceTaxes: 240000,
        taxableTurnover: 3500000,
        employeeCount: 48
      },
      {
        period: "2023 Q2",
        nationalTaxes: 700000,
        workforceTaxes: 230000,
        taxableTurnover: 3250000,
        employeeCount: 45
      }
    ]
  }
];

export const getEntityRelationships = (entityName: string) => {
  const relationships = [];

  for (const business of mockBusinesses) {
    const businessRelationships = [];

    // Check representatives
    business.representatives.forEach(rep => {
      if (rep.name === entityName) {
        businessRelationships.push({
          type: 'Representative',
          role: rep.role,
          since: rep.since
        });
      }
    });

    // Check owners
    business.owners.forEach(owner => {
      if (owner.name === entityName) {
        businessRelationships.push({
          type: 'Owner',
          role: owner.role,
          share: owner.share,
          since: owner.since
        });
      }
    });

    // Check beneficial owners
    business.beneficialOwners.forEach(owner => {
      if (owner.name === entityName) {
        businessRelationships.push({
          type: 'Ultimate Beneficial Owner',
          control: owner.control,
          since: owner.since
        });
      }
    });

    if (businessRelationships.length > 0) {
      relationships.push({
        business,
        relationships: businessRelationships
      });
    }
  }

  return relationships;
};