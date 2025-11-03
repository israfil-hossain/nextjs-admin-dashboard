export interface DemoCredentials {
  username?: string;
  password?: string;
}

export interface Template {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  thumbnail: string;
  thumbnailAlt?: string;
  previewImages?: Array<{
    url: string;
    alt?: string;
  }>;
  previewUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  category: 'SaaS' | 'E-commerce' | 'Portfolio' | 'Blog' | 'Landing Page' | 'Dashboard';
  technologies?: string[];
  features?: string[];
  demoCredentials?: DemoCredentials;
  licenseType: 'single' | 'unlimited' | 'extended';
  includes?: string[];
  stripeProductId?: string;
  stripePriceId?: string;
  downloadUrl?: string;
  templateFile?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
