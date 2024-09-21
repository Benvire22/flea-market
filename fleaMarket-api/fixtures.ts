import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Product';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropDatabase();
    // await db.dropCollection('users');
    // await db.dropCollection('products');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const user1 = new User({
    username: 'ANITAR',
    password: '1qaz@fewfWSX',
    displayName: 'Иван',
    phoneNumber: '999-333-333'
  });

  user1.generateToken();
  await user1.save();

  const user2 = new User({
    username: 'Protomax',
    password: '1qaz@WSX',
    displayName: 'Сергей',
    phoneNumber: '999-333-333'
  });

  user2.generateToken();
  await user2.save();

  await Post.create({
    user: user1,
    title: 'Экспертная экспертность',
    description: 'Вы знали об этом?',
    image: 'fixtures/product1-mem.jpg',
    price: 2030,
    category: 'Computers',
  }, {
    user: user1,
    title: 'КОТИКИ',
    description: 'Милоты вам в ленту',
    image: 'fixtures/product2-cat.jpg',
    price: 2300,
    category: 'Cors',
  }, {
    user: user2,
    title: 'Время поговорить о важном',
    description: 'А здесь армяне в нарды играют',
    image: 'fixtures/product2-cat.jpg',
    price: 5500,
    category: 'Other',
  }, {
    user: user2,
    title: 'Камни',
    description: 'Камни',
    image: 'fixtures/product4-rock.jpg',
    price: 400,
    category: 'Computers',
  });

  await db.close();
};

run().catch(console.error);