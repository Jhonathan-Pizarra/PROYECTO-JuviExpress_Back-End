const db = require('../config/config');

const Category = {};

Category.create = (category, result) => {

    const sql = `
        INSERT INTO categories(
            name,
            description,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [
            //id_user,
            category.name,
            category.description,
            new Date(),
            new Date()
        ],
        (err, res)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Categoria creada: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

module.exports = Category;