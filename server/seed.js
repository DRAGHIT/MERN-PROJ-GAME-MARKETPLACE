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
        title: 'Cosmic Odyssey',
        description: 'Embark on an epic journey through the cosmos. Explore mysterious planets, engage in space battles, and uncover the secrets of ancient alien civilizations. Features stunning visuals and immersive gameplay.',
        price: 24.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/cosmic-odyssey.zip'
      },
      {
        title: 'Medieval Legends',
        description: 'Build your kingdom from scratch in this immersive medieval strategy game. Manage resources, train armies, forge alliances, and defend your realm against rival kingdoms.',
        price: 29.99,
        genre: 'Strategy',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/medieval-legends.zip'
      },
      {
        title: 'Neon Racer',
        description: 'Experience high-octane racing in a cyberpunk world. Customize your vehicle, compete in underground races, and dominate the neon-lit streets.',
        price: 19.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[1]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/neon-racer.zip'
      },
      {
        title: 'Shadow Detective',
        description: 'Solve complex mysteries in this noir-inspired detective game. Investigate crime scenes, interrogate suspects, and piece together clues to catch the killer.',
        price: 17.99,
        genre: 'Puzzle',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/shadow-detective.zip'
      },
      {
        title: 'Dragon Quest Chronicles',
        description: 'An epic fantasy RPG with deep character progression, turn-based combat, and a rich storyline. Battle dragons, discover magical artifacts, and save the realm.',
        price: 34.99,
        genre: 'RPG',
        platform: 'PC',
        developer: users[1]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/dragon-quest.zip'
      },
      {
        title: 'Metropolis Builder',
        description: 'Design and manage a thriving metropolis. Balance economy, environment, and citizen happiness while expanding your city into a modern marvel.',
        price: 27.99,
        genre: 'Simulation',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/metropolis-builder.zip'
      },
      {
        title: 'Pixel Dungeon',
        description: 'A roguelike dungeon crawler with retro pixel art graphics. Each run is unique with procedurally generated levels and permadeath mechanics.',
        price: 12.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/pixel-dungeon.zip'
      },
      {
        title: 'Brain Teasers Deluxe',
        description: 'Exercise your mind with over 500 challenging puzzles. From logic puzzles to word games, test your cognitive skills across multiple categories.',
        price: 9.99,
        genre: 'Puzzle',
        platform: 'Web',
        developer: users[1]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/brain-teasers.zip'
      },
      {
        title: 'Warzone Tactics',
        description: 'Command elite squads in intense tactical combat. Plan your strategy, manage resources, and outmaneuver enemy forces in this turn-based strategy game.',
        price: 21.99,
        genre: 'Strategy',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/warzone-tactics.zip'
      },
      {
        title: 'Harvest Moon Valley',
        description: 'Live the peaceful life of a farmer. Plant crops, raise livestock, build relationships with villagers, and transform your humble farm into a thriving business.',
        price: 18.99,
        genre: 'Simulation',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/harvest-moon.zip'
      },
      {
        title: 'Zombie Apocalypse Survival',
        description: 'Survive in a post-apocalyptic world overrun by zombies. Scavenge for supplies, build shelter, and fight off hordes of the undead.',
        price: 22.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[1]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/zombie-survival.zip'
      },
      {
        title: 'Ocean Explorer',
        description: 'Dive into the depths of the ocean and discover underwater wonders. Explore coral reefs, encounter marine life, and uncover sunken treasures.',
        price: 15.99,
        genre: 'Simulation',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/ocean-explorer.zip'
      },
      {
        title: 'Samurai Warriors',
        description: 'Master the way of the samurai in feudal Japan. Engage in intense sword fights, honor the bushido code, and unite the warring clans.',
        price: 26.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[0]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/samurai-warriors.zip'
      },
      {
        title: 'Chess Master 3000',
        description: 'The ultimate chess experience with AI opponents ranging from beginner to grandmaster level. Includes tutorials, puzzles, and online multiplayer.',
        price: 11.99,
        genre: 'Puzzle',
        platform: 'Web',
        developer: users[1]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/chess-master.zip'
      },
      {
        title: 'Wild West Outlaws',
        description: 'Experience the lawless frontier of the Wild West. Rob trains, duel outlaws, and build your reputation as the most feared gunslinger.',
        price: 23.99,
        genre: 'Action',
        platform: 'PC',
        developer: users[2]._id,
        coverImageUrl: 'https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?w=800&h=600&fit=crop',
        gameFileUrl: 'https://example.com/games/wild-west.zip'
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
