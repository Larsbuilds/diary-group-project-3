import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function DiaryEntry({ entry, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-bg-dark rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative overflow-hidden">
          <img 
            src={entry.imageUrl} 
            alt={entry.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h2 className="text-h2-base md:text-h2-md text-text-light mb-2 line-clamp-2">{entry.title}</h2>
          <p className="text-p-base text-text-light/70">{new Date(entry.date).toLocaleDateString()}</p>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-bg-dark w-full max-w-2xl rounded-lg shadow-xl overflow-hidden transform transition-all duration-300">
            <div className="relative">
              <img 
                src={entry.imageUrl} 
                alt={entry.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6 text-text-light" />
              </button>
            </div>
            
            <div className="p-6">
              <Dialog.Title as="h2" className="text-h2-base md:text-h2-md text-text-light mb-2">
                {entry.title}
              </Dialog.Title>
              <p className="text-p-base text-text-light/70 mb-4">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              <p className="text-p-base text-text-light whitespace-pre-wrap leading-relaxed">{entry.content}</p>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    onDelete(entry.id);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-text-dark text-text-light rounded-lg hover:bg-text-dark/90 transition-all duration-200 hover:shadow-md active:scale-95"
                >
                  Delete Entry
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 