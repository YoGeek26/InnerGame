import React from 'react';
import { Simulation } from '../../types';
import { CheckCircle, MessageCircle, Users } from 'lucide-react';

interface SimulationCardProps {
  simulation: Simulation;
  onClick: () => void;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ simulation, onClick }) => {
  const getScenarioIcon = () => {
    switch (simulation.scenarioType) {
      case 'tinder':
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4 text-[var(--color-gold)] mr-1" />;
      case 'irl':
        return <Users className="h-4 w-4 text-[var(--color-gold)] mr-1" />;
      default:
        return <MessageCircle className="h-4 w-4 text-[var(--color-gold)] mr-1" />;
    }
  };

  const getScenarioLabel = () => {
    switch (simulation.scenarioType) {
      case 'tinder':
        return 'Tinder';
      case 'whatsapp':
        return 'WhatsApp';
      case 'irl':
        return 'In-Person';
      default:
        return simulation.scenarioType;
    }
  };

  return (
    <div 
      className="luxury-card overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-40">
        <img 
          src={simulation.image} 
          alt={simulation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute top-2 right-2 bg-[var(--color-gold)] text-[var(--color-midnight)] px-2 py-1 rounded text-xs font-bold">
          {simulation.difficulty}
        </div>
        {simulation.completed && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center">
            {getScenarioIcon()}
            <span className="text-xs font-medium text-white">{getScenarioLabel()}</span>
          </div>
          <h3 className="text-white font-bold mt-1">{simulation.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm">{simulation.description}</p>
      </div>
    </div>
  );
};

export default SimulationCard;
