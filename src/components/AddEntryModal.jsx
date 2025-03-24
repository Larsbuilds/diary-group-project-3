import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function AddEntryModal({ isOpen, onClose, onSubmit, existingDate }) {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit(formData);
    
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      content: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-bg-dark w-full max-w-2xl transform overflow-hidden rounded-lg p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h2" className="text-h2-base md:text-h2-md text-text-light">
                    New entry
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-200 hover:shadow-md active:scale-95"
                  >
                    <XMarkIcon className="w-6 h-6 text-text-light" />
                  </button>
                </div>

                {existingDate ? (
                  <div className="text-center py-8">
                    <p className="text-p-base text-text-light/70">
                      You already have an entry for this date. Please choose a different date.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-p-base text-text-light mb-2 font-medium">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-text-light/10 border border-text-light/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 transition-all duration-200"
                        placeholder="Enter a title for your entry"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-other-pink">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-p-base text-text-light mb-2 font-medium">
                        Image
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="url"
                          id="imageUrl"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          className="flex-1 px-4 py-2.5 bg-text-light/10 border border-text-light/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 transition-all duration-200"
                          placeholder="Enter image URL"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2.5 bg-text-dark text-text-light rounded-lg hover:bg-text-dark/90 transition-all duration-200 hover:shadow-md active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          <PhotoIcon className="w-5 h-5" />
                          <span>Choose File</span>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      {formData.imageUrl && (
                        <div className="mt-3">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="h-40 w-full rounded-lg object-cover shadow-md"
                          />
                        </div>
                      )}
                      {errors.imageUrl && (
                        <p className="mt-1 text-sm text-other-pink">{errors.imageUrl}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-p-base text-text-light mb-2 font-medium">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 bg-text-light/10 border border-text-light/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 transition-all duration-200"
                      />
                      {errors.date && (
                        <p className="mt-1 text-sm text-other-pink">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-p-base text-text-light mb-2 font-medium">
                        Entry
                      </label>
                      <textarea
                        id="content"
                        rows="6"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-2.5 bg-text-light/10 border border-text-light/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 transition-all duration-200 resize-none"
                        placeholder="Write your diary entry here..."
                      />
                      {errors.content && (
                        <p className="mt-1 text-sm text-other-pink">{errors.content}</p>
                      )}
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 bg-text-dark text-text-light rounded-lg hover:bg-text-dark/90 transition-all duration-200 hover:shadow-md active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-highlight text-text-light rounded-lg hover:bg-highlight/90 transition-all duration-200 hover:shadow-md active:scale-95"
                      >
                        Add entry
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 