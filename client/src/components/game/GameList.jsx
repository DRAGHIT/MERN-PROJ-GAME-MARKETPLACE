import GameCard from './GameCard';

const GameList = ({ games }) => {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No games found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
