import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import GameList from '../components/game/GameList';
import Spinner from '../components/common/Spinner';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const { data } = await api.getGames({ sort: 'newest' });
      setGames(data.slice(0, 8)); // Show only latest 8 games
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Game Marketplace</h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover, buy, and sell amazing indie games
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/browse" className="btn-primary text-lg px-8 py-3">
              Browse Games
            </Link>
            <Link to="/sell" className="btn-secondary text-lg px-8 py-3">
              Sell Your Game
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">New Releases</h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size={48} />
          </div>
        ) : (
          <GameList games={games} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
