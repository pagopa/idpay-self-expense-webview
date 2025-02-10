
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string; 
        const base64String = result.split(",")[1]; 
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
}