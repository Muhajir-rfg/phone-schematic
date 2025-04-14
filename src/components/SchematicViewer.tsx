import React, { useState } from 'react';
import { PhoneSchematic, Component } from '../types/schema';

interface SchematicViewerProps {
  schematic: PhoneSchematic;
}

export const SchematicViewer: React.FC<SchematicViewerProps> = ({ schematic }) => {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {schematic.brand} {schematic.model} ({schematic.year})
        </h2>
        
        <div className="relative">
          <img
            src={schematic.schematicImage}
            alt={`${schematic.brand} ${schematic.model} schematic`}
            className="w-full h-auto"
          />
          
          {schematic.components.map((component) => (
            <button
              key={component.id}
              className={`absolute w-4 h-4 rounded-full ${
                selectedComponent?.id === component.id
                  ? 'bg-blue-500'
                  : 'bg-red-500'
              } hover:bg-blue-600 transition-colors`}
              style={{
                left: `${component.location.x}%`,
                top: `${component.location.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleComponentClick(component)}
              title={component.name}
            />
          ))}
        </div>

        {selectedComponent && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{selectedComponent.name}</h3>
            <p className="text-gray-700 mb-2">{selectedComponent.description}</p>
            {selectedComponent.replacementParts && (
              <div>
                <h4 className="font-medium mb-1">Replacement Parts:</h4>
                <ul className="list-disc list-inside">
                  {selectedComponent.replacementParts.map((part, index) => (
                    <li key={index} className="text-gray-600">{part}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
