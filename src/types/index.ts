export interface Location {
  slug: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  surface: number;
  metro: string;
  capacity: string;
  highlights: string[];
  amenities: string[];
  heroImage: string;
  images: string[];
}

export interface Service {
  id: string;
  icon: string;
  images: string[];
}

export interface EventCategory {
  id: string;
  icon: string;
  images: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  location: string;
  category: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  positions: string;
  type: string;
  source: string;
  message: string;
}

export interface BrandTokens {
  name: string;
  tagline: string;
  logo: string;
  favicon: string;
  ogImage: string;
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    secondaryLight: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    text: string;
    textLight: string;
    textInverse: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  contact: {
    phone: string;
    email: string;
    instagram: string;
    linkedin: string;
  };
  legal: {
    companyName: string;
    rcs: string;
    address: string;
    director: string;
  };
}
