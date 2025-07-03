import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const User = sequelize.define(
    'user',
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter"
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
        },
    });

User.sync({ force: true })
    .then(() => {   
        console.log('User table created successfully.');
    })
    .catch((error) => { 
        console.error('Error creating User table:', error);
    });    

export default User;