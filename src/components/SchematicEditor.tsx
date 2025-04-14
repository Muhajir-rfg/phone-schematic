import React, { useState } from 'react';
import { PhoneSchematic, Component, ComponentType } from '../types/schema';

interface SchematicEditorProps {
  initialSchematic?: PhoneSchematic;
  onSave: (schematic: PhoneSchematic) => void;
}

export const SchematicEditor: React.FC<SchematicEditorProps> = ({
  initialSchematic,
  onSave,
}) => {
  const [schematic, setSchematic] = useState<PhoneSchematic>(
    initialSchematic || {
      id: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      schematicImage: '',
      components: [],
      description: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  );

  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!selectedComponent) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const updatedComponent = {
      ...selectedComponent,
      location: { x, y },
    };

    setSchematic((prev) => ({
      ...prev,
      components: [...prev.components, updatedComponent],
    }));
    setSelectedComponent(null);
  };

  const handleAddComponent = () => {
    const newComponent: Component = {
      id: Date.now().toString(),
      name: '',
      type: ComponentType.OTHER,
      location: { x: 0, y: 0 },
      description: '',
    };
    setSelectedComponent(newComponent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...schematic,
      updated_at: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Brand"
            value={schematic.brand}
            onChange={(e) =>
              setSchematic((prev) => ({ ...prev, brand: e.target.value }))
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Model"
            value={schematic.model}
            onChange={(e) =>
              setSchematic((prev) => ({ ...prev, model: e.target.value }))
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Year"
            value={schematic.year}
            onChange={(e) =>
              setSchematic((prev) => ({
                ...prev,
                year: parseInt(e.target.value),
              }))
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Schematic Image URL"
            value={schematic.schematicImage}
            onChange={(e) =>
              setSchematic((prev) => ({
                ...prev,
                schematicImage: e.target.value,
              }))
            }
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={schematic.description}
            onChange={(e) =>
              setSchematic((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="relative border rounded p-4">
          {schematic.schematicImage && (
            <img
              src={schematic.schematicImage}
              alt="Phone schematic"
              className="w-full h-auto cursor-crosshair"
              onClick={handleImageClick}
            />
          )}
          {schematic.components.map((component) => (
            <div
              key={component.id}
              className="absolute w-4 h-4 bg-blue-500 rounded-full"
              style={{
                left: `${component.location.x}%`,
                top: `${component.location.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={component.name}
            />
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddComponent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Component
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Schematic
          </button>
        </div>
      </form>
    </div>
  );
};
