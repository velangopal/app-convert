
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeWebsite = async (url: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Deeply analyze this URL for native Android WebView conversion: ${url}. 
    Evaluate:
    1. Mobile responsiveness.
    2. Technology stack (React, WordPress, etc.).
    3. PWA readiness.
    4. Required Android permissions (Camera, Location, etc.).
    5. Performance optimization tips for a native wrapper.
    Provide a security score (0-100).
    Output as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isResponsive: { type: Type.BOOLEAN },
          detectedFramework: { type: Type.STRING },
          pwaCompatible: { type: Type.BOOLEAN },
          securityScore: { type: Type.NUMBER },
          suggestedPermissions: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          optimizationTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["isResponsive", "detectedFramework", "suggestedPermissions", "optimizationTips", "securityScore", "pwaCompatible"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateAppLogo = async (appName: string, themeColor: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A 1024x1024 ultra-high-definition Android app launcher icon for "${appName}". 
        Style: Modern, flat, minimalist vector. 
        Background: Rounded square. 
        Primary Color: ${themeColor}. 
        Focus: Central abstract symbol representing the brand. 
        No text in the icon, just a clean logo.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateAndroidProject = async (config: any, analysis: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a senior Android Engineer. Generate a fully functional native Kotlin source set for a WebView app.
    Name: ${config.appName}
    URL: ${config.url}
    Package: ${config.packageName}
    Analysis Data: ${JSON.stringify(analysis)}
    
    The code must handle:
    - Custom UserAgent
    - WebChromeClient for File Uploads
    - Pull-to-refresh implementation
    - App Color branding: ${config.themeColor}
    
    Return JSON with fields: mainActivity, manifest, buildGradle.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mainActivity: { type: Type.STRING },
          manifest: { type: Type.STRING },
          buildGradle: { type: Type.STRING }
        },
        required: ["mainActivity", "manifest", "buildGradle"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
