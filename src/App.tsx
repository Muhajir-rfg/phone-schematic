import { useState } from 'react';
import { SchematicViewer } from './components/SchematicViewer';
import { SchematicEditor } from './components/SchematicEditor';
import { PhoneSchematic } from './types/schema';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [schematics, setSchematics] = useState<PhoneSchematic[]>([]);
  const [selectedSchematic, setSelectedSchematic] = useState<PhoneSchematic | null>(null);

  const handleSaveSchematic = (schematic: PhoneSchematic) => {
    if (selectedSchematic) {
      setSchematics(schematics.map(s => 
        s.id === schematic.id ? schematic : s
      ));
    } else {
      setSchematics([...schematics, { ...schematic, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setSelectedSchematic(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Phone Schematic Viewer
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEditing ? 'View Schematics' : 'Add New Schematic'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isEditing ? (
          <SchematicEditor
            initialSchematic={selectedSchematic || undefined}
            onSave={handleSaveSchematic}
          />
        ) : (
          <div className="space-y-6">
            {schematics.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No schematics available. Add your first one!</p>
              </div>
            ) : (
              schematics.map((schematic) => (
                <SchematicViewer key={schematic.id} schematic={schematic} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
