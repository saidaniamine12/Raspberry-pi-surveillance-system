console.log('SELECT firstName FROM Users WHERE email = ?',[512]);

    // const email = req.body.email;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const password = req.body.password;
    // const address = req.body.address;
    // {firstName: firstName, lastName: lastName, address: address, email: email, password: hashedPassword}
    //'INSERT INTO Users VALUES (?,?,?,?,?);',[user.firstName,user.lastName,user.address,user.email,user.password]

    //'INSERT INTO Users(firstName,lastName,address,email,password) VALUES (?,?,?,?,?);',[user.firstName,user.lastName,user.address,user.email,user.password], async (error,results,fields) => {