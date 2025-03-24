import { useState, useEffect } from 'react'
import './App.css'
import DiaryEntry from './components/DiaryEntry'
import AddEntryModal from './components/AddEntryModal'
import Footer from './components/Footer'

function App() {
  const [entries, setEntries] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  // Load entries from localStorage on component mount
  useEffect(() => {
    console.log('Loading entries from localStorage...')
    const savedEntries = localStorage.getItem('diaryEntries')
    console.log('Raw saved entries:', savedEntries)
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries)
        console.log('Parsed entries:', parsedEntries)
        setEntries(parsedEntries)
      } catch (error) {
        console.error('Error parsing entries:', error)
      }
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      console.log('Saving entries to localStorage:', entries)
      try {
        localStorage.setItem('diaryEntries', JSON.stringify(entries))
        console.log('Successfully saved to localStorage')
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [entries])

  const handleAddEntry = async (newEntry) => {
    console.log('Adding new entry:', newEntry)
    const entryWithId = {
      ...newEntry,
      id: Date.now().toString(),
    }
    
    // Update entries state with the new entry
    setEntries(prevEntries => {
      const updatedEntries = [entryWithId, ...prevEntries]
      console.log('Updated entries:', updatedEntries)
      return updatedEntries
    })
  }

  const handleDeleteEntry = (entryId) => {
    console.log('Deleting entry:', entryId)
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId))
  }

  const checkExistingEntry = (date) => {
    return entries.some(entry => entry.date === date)
  }

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col">
      <header className="bg-bg-dark/90 shadow-lg sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-h1-base md:text-h1-md font-bold text-text-light flex items-center gap-2">
              <span className="text-highlight">My</span>Diary
            </h1>
            <button
              onClick={() => {
                setSelectedDate(null)
                setIsAddModalOpen(true)
              }}
              className="px-4 py-2 bg-highlight text-text-light rounded-lg hover:bg-highlight/90 transition-all duration-200 text-p-base shadow-md hover:shadow-lg active:scale-95"
            >
              Add entry
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DiaryEntry
                entry={entry}
                onDelete={handleDeleteEntry}
              />
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-lg text-text-light/80">
              No entries yet. Click the button above to create your first diary entry!
            </p>
          </div>
        )}
      </main>

      <Footer />

      <AddEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddEntry}
        existingDate={selectedDate ? checkExistingEntry(selectedDate) : false}
      />
    </div>
  )
}

export default App
