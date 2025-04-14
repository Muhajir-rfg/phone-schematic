export interface PhoneSchematic {
  id: string;
  brand: string;
  model: string;
  year: number;
  schematicImage: string;
  components: Component[];
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: string;
  name: string;
  type: ComponentType;
  location: {
    x: number;
    y: number;
  };
  description: string;
  replacementParts?: string[];
}

export enum ComponentType {
  BATTERY = 'battery',
  SCREEN = 'screen',
  MOTHERBOARD = 'motherboard',
  CAMERA = 'camera',
  SPEAKER = 'speaker',
  MICROPHONE = 'microphone',
  CHARGING_PORT = 'charging_port',
  BUTTONS = 'buttons',
  SENSORS = 'sensors',
  OTHER = 'other'
}
