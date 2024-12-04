export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  image: string;
  capacity: number;
  registered: number;
  type: 'Camp' | 'Ceremony' | 'Service' | 'Training';
}