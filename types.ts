
export enum BuildStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING_ASSETS = 'GENERATING_ASSETS',
  GENERATING_CODE = 'GENERATING_CODE',
  COMPILING = 'COMPILING',
  SIGNING = 'SIGNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface AppConfig {
  url: string;
  appName: string;
  packageName: string;
  themeColor: string;
  logoUrl?: string;
  customLogoUrl?: string;
  generateLogoWithAI: boolean;
  features: {
    pullToRefresh: boolean;
    offlineFallback: boolean;
    fileUploads: boolean;
  };
}

export interface BuildLog {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
}

export interface AnalysisResult {
  isResponsive: boolean;
  detectedFramework: string;
  suggestedPermissions: string[];
  optimizationTips: string[];
  securityScore: number;
  pwaCompatible: boolean;
}

export interface ProjectFiles {
  mainActivity: string;
  manifest: string;
  buildGradle: string;
}
