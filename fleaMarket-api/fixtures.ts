import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Product';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropDatabase();
  } catch (e) {
    console.log('Skipping drop...');
  }

  const user1 = new User({
    username: 'ANITAR',
    password: '123',
    displayName: 'Иван',
    phoneNumber: '999-333-333'
  });

  user1.generateToken();
  await user1.save();

  const user2 = new User({
    username: 'Protomax',
    password: '321',
    displayName: 'Сергей',
    phoneNumber: '444-666-333'
  });

  user2.generateToken();
  await user2.save();

  await Post.create({
    user: user1,
    title: 'Монитор HP 27m 27", черный 3wl48aa',
    description: 'Хороший моник',
    image: 'fixtures/monitor.jpg',
    price: 5030,
    category: 'Computers',
  }, {
    user: user1,
    title: 'Клавиатура Oklick 180m черный PS/2',
    description: 'Хорошая клава',
    image: 'fixtures/klaviatur.jpg',
    price: 2300,
    category: 'Computers',
  }, {
    user: user2,
    title: 'Intel Core i7',
    description: 'Отличная CPU (нет)',
    image: 'fixtures/cpu.png',
    price: 5700,
    category: 'Cors',
  }, {
    user: user2,
    title: 'Цветок алоэ',
    description: 'Или не алоэ',
    image: 'fixtures/Flower.jpg',
    price: 400,
    category: 'Other',
  });

  await db.close();
};

run().catch(console.error);