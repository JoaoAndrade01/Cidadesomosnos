/**
 * Converte URLs do Imgur para formato direto de imagem
 * @param url - URL original (pode ser do Imgur ou qualquer outra)
 * @returns URL formatada para imagem direta
 */
export function normalizeImgurUrl(url: string): string {
  if (!url) return url;
  
  try {
    const urlObj = new URL(url);
    
    // Verifica se é uma URL do Imgur
    if (urlObj.hostname === 'imgur.com' || urlObj.hostname === 'www.imgur.com') {
      // Extrai o ID da imagem (ex: /xxxxx ou /gallery/xxxxx ou /a/xxxxx)
      const pathParts = urlObj.pathname.split('/').filter(p => p);
      let imageId = '';
      
      if (pathParts.length > 0) {
        // Pega o último segmento (geralmente o ID)
        imageId = pathParts[pathParts.length - 1];
        
        // Remove extensão se já tiver
        imageId = imageId.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
        
        // Converte para URL direta de imagem
        // Usa i.imgur.com que é o domínio para imagens diretas
        return `https://i.imgur.com/${imageId}.jpg`;
      }
    }
    
    // Se já for i.imgur.com, verifica se tem extensão
    if (urlObj.hostname === 'i.imgur.com') {
      const path = urlObj.pathname;
      // Se não tiver extensão, adiciona .jpg
      if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(path)) {
        const imageId = path.replace('/', '');
        return `https://i.imgur.com/${imageId}.jpg`;
      }
      // Se já tiver extensão, retorna como está
      return url;
    }
    
    // Para outras URLs, retorna como está
    return url;
  } catch (e) {
    // Se não for uma URL válida, retorna como está
    return url;
  }
}

/**
 * Valida se uma URL de imagem é válida (formato básico)
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // Verifica se é HTTP/HTTPS
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Aceita Imgur (será normalizado) ou URLs com extensões de imagem comuns
    const isImgur = urlObj.hostname.includes('imgur.com');
    const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname);
    
    return isImgur || hasImageExtension;
  } catch (e) {
    return false;
  }
}
