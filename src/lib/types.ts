export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  publicationDate: string;
  category: 'Higher Education' | 'Primary Education' | 'Government Regulations' | 'Scholarships';
  source: string;
  sourceUrl: string;
}

export interface Regulation {
  id: string;
  title: string;
  summary: string;
  documentUrl: string;
  issuedBy: string;
  effectiveDate: string;
}

export interface Admission {
  id: string;
  university: string;
  logoUrl: string;
  logoHint: string;
  deadline: string;
  documents: string[];
  portalUrl: string;
}
