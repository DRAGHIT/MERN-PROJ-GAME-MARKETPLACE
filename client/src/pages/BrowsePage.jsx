import { useState, useEffect } from 'react';
import * as api from '../api';
import GameList from '../components/game/GameList';
import Spinner from '../components/common/Spinner';

const BrowsePage = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ genre: '', platform: '', sort: 'newest' });

  useEffect(() => {
    fetchGames();
  }, [filters]);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (filters.genre) params.genre = filters.genre;
      if (filters.platform) params.platform = filters.platform;
      if (filters.sort) params.sort = filters.sort;

      const { data } = await api.getGames(params);
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Games</h1>

      <div className="card p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Genre</label>
            <select
              className="input-field"
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            >
              <option value="">All Genres</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <select
              className="input-field"
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
            >
              <option value="">All Platforms</option>
              <option value="PC">PC</option>
              <option value="Mac">Mac</option>
              <option value="Linux">Linux</option>
              <option value="Web">Web</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              className="input-field"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size={48} />
        </div>
      ) : (
        <GameList games={games} />
      )}
    </div>
  );
};

export default BrowsePage;
