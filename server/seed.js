require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Game = require('./models/Game');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Game.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        username: 'gamedev1',
        email: 'gamedev1@example.com',
        password: hashedPassword,
        bio: 'Indie game developer passionate about creating unique gaming experiences',
        avatarUrl: 'https://placehold.co/400x400/4B5563/FFF?text=GD1'
      },
      {
        username: 'gamedev2',
        email: 'gamedev2@example.com',
        password: hashedPassword,
        bio: 'Creating pixel-perfect adventures',
        avatarUrl: 'https://placehold.co/400x400/3B82F6/FFF?text=GD2'
      },
      {
        username: 'gamedev3',
        email: 'gamedev3@example.com',
        password: hashedPassword,
        bio: 'Strategy games specialist',
        avatarUrl: 'https://placehold.co/400x400/8B5CF6/FFF?text=GD3'
      },
      {
        username: 'player1',
        email: 'player1@example.com',
        password: hashedPassword,
        bio: 'Avid gamer and collector',
        avatarUrl: 'https://placehold.co/400x400/10B981/FFF?text=P1'
      }
    ]);

    console.log('Created users');

    // Create games
    const games = [
      {
        title: 'Space Explorer',
        description: 'Explore the vast universe in this epic space adventure. Discover new planets, encounter alien species, and uncover ancient mysteries.',
        price: 19.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://placehold.co/600x400/1E3A8A/FFF?text=Space+Explorer',
        gameFileUrl: 'https://example.com/games/space-explorer.zip'
      },
      {
        title: 'Fantasy Kingdom',
        description: 'Build and manage your own medieval kingdom. Defend against invaders, manage resources, and become the greatest ruler.',
        price: 24.99,
        genre: 'Strategy',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://placehold.co/600x400/7C2D12/FFF?text=Fantasy+Kingdom',
        gameFileUrl: 'https://example.com/games/fantasy-kingdom.zip'
      },
      {
        title: 'Pixel Adventure',
        description: 'A retro-style platformer with modern mechanics. Jump, run, and solve puzzles in this charming pixel art world.',
        price: 9.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[1]._id,
        coverImageUrl: 'https://placehold.co/600x400/059669/FFF?text=Pixel+Adventure',
        gameFileUrl: 'https://example.com/games/pixel-adventure.zip'
      },
      {
        title: 'Mystery Manor',
        description: 'Solve intricate puzzles and uncover dark secrets in this atmospheric mystery game.',
        price: 14.99,
        genre: 'Puzzle',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://placehold.co/600x400/4C1D95/FFF?text=Mystery+Manor',
        gameFileUrl: 'https://example.com/games/mystery-manor.zip'
      },
      {
        title: 'Dungeon Crawler RPG',
        description: 'An immersive RPG experience with deep character customization, challenging combat, and engaging storylines.',
        price: 29.99,
        genre: 'RPG',
        platform: 'PC',
        developer: users[1]._id,
        coverImageUrl: 'https://placehold.co/600x400/7F1D1D/FFF?text=Dungeon+Crawler',
        gameFileUrl: 'https://example.com/games/dungeon-crawler.zip'
      },
      {
        title: 'City Builder Pro',
        description: 'Design and build the city of your dreams. Manage traffic, economy, and citizen happiness.',
        price: 34.99,
        genre: 'Simulation',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://placehold.co/600x400/1E40AF/FFF?text=City+Builder',
        gameFileUrl: 'https://example.com/games/city-builder.zip'
      },
      {
        title: 'Racing Legends',
        description: 'High-speed racing action with realistic physics and stunning graphics.',
        price: 19.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://placehold.co/600x400/DC2626/FFF?text=Racing+Legends',
        gameFileUrl: 'https://example.com/games/racing-legends.zip'
      },
      {
        title: 'Puzzle Master',
        description: 'Test your brain with hundreds of challenging puzzles across multiple difficulty levels.',
        price: 7.99,
        genre: 'Puzzle',
        platform: 'Web',
        developer: users[1]._id,
        coverImageUrl: 'https://placehold.co/600x400/B45309/FFF?text=Puzzle+Master',
        gameFileUrl: 'https://example.com/games/puzzle-master.zip'
      },
      {
        title: 'Tactical Warfare',
        description: 'Command your troops in strategic turn-based combat. Every decision matters.',
        price: 22.99,
        genre: 'Strategy',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://placehold.co/600x400/065F46/FFF?text=Tactical+Warfare',
        gameFileUrl: 'https://example.com/games/tactical-warfare.zip'
      },
      {
        title: 'Farm Life Simulator',
        description: 'Experience the joy of farming. Plant crops, raise animals, and build your dream farm.',
        price: 16.99,
        genre: 'Simulation',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://placehold.co/600x400/65A30D/FFF?text=Farm+Simulator',
        gameFileUrl: 'https://example.com/games/farm-simulator.zip'
      }
    ];

    const createdGames = await Game.create(games);
    console.log(`Created ${createdGames.length} games`);

    // Update users' listings
    for (const game of createdGames) {
      await User.findByIdAndUpdate(game.developer, {
        $push: { listings: game._id }
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('Email: gamedev1@example.com');
    console.log('Email: gamedev2@example.com');
    console.log('Email: gamedev3@example.com');
    console.log('Email: player1@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
