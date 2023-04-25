module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        { 
          name: 'Delivery App Admin',
          email: 'adm@deliveryapp.com',
          password: 'a4c86edecc5aee06eff8fdeda69e0d04',
          role: 'administrator',
        },
        { 
          name: 'Fulana Pereira',
          email: 'fulana@deliveryapp.com',
          password: '3c28d2b0881bf46457a853e0b07531c6',
          role: 'seller',
        },
        { 
          name: 'Cliente Zé Birita',
          email: 'zebirita@email.com',
          password: 'd20432eb5dc065b3a4c2c7c28d389325',
          role: 'customer',
        },
      ],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users');
  },
};
