import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <Link to={`/games/${game._id}`} className="card hover:border-blue-500 transition group">
      <img 
        src={game.coverImageUrl} 
        alt={game.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:text-blue-400 transition mb-2">
          {game.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">{game.genre}</span>
          <span className="text-lg font-bold text-blue-400">${game.price}</span>
        </div>
        {game.developer && (
          <p className="text-xs text-gray-500 mt-2">by {game.developer.username}</p>
        )}
      </div>
    </Link>
  );
};

export default GameCard;
