import { ChangeEvent } from 'react';


export function createHandleChange<T>(
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setState(prev => ({ ...prev, [name]: checked }));
    } else {
      setState(prev => ({ ...prev, [name]: value }));
    }
  };
}

export function createHandleNumberChange<T>(
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value ? Number(value) : '' }));
  };
}
