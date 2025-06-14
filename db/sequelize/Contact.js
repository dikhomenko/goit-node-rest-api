import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const Contact = sequelize.define(
  'contact',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }
);

Contact.sync({ force: false })
  .then(() => {
    console.log('Contact table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating Contact table:', error);
  });

export default Contact;