module.exports = (sequelize, Datatypes) => {
    const Todo = sequelize.define(
        'Todo',
        {
            title: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            completed: {
                type: Datatypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            underscored: true,
        }
    );

    Todo.associate = (models) => {
        Todo.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });
    };

    return Todo;
};
