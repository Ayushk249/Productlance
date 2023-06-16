import bcrypt  from 'bcrypt';

const user =[
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: "AKD",
        email: "AKD123@gmail.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    },
    {
        name: "Anand",
        email: "Anand123@gmail.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    }
]

export default user
