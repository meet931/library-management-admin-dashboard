// functions.ts
// Function to set a cookie
export const setCookie = (name: string, value: string, days?: number): void => {
    if (typeof document !== 'undefined') {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
  };
  
  // Function to get a cookie
  export const getCookie = (name: string): string | null => {
    if (typeof document !== 'undefined') {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };
  
  // Function to delete a cookie
  export const deleteCookie = (name: string, path: string = '/', domain?: string): void => {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=; Max-Age=0; path=${path};${domain ? ` domain=${domain};` : ''}`;
    }
  };
  
