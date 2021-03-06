module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define(
        'User',
        {
            username: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    minimum(value) {
                        if (value.length <= 4) {
                            throw new Error('length must be greater than 4');
                        }
                    },
                },
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Todo, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });
    };

    return User;
};
