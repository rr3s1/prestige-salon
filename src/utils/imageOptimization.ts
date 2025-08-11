// Image optimization utility
export const getOptimizedImageUrl = (
  unsplashId: string, 
  width: number = 800, 
  quality: number = 80,
  format: 'webp' | 'jpg' = 'webp'
) => {
  return `https://images.unsplash.com/${unsplashId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&q=${quality}&fm=${format}`;
};

export const getResponsiveImageSrcSet = (unsplashId: string) => {
  const sizes = [400, 800, 1200, 1600];
  return sizes.map(size => 
    `${getOptimizedImageUrl(unsplashId, size)} ${size}w`
  ).join(', ');
};