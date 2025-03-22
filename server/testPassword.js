const bcrypt = require('bcrypt');
const hashedPassword = "$2b$10$Z/0FocPyLX62824.Rf1/6uR2hxSu.9QPzR89RM/znY1z0MqmWcy5y"; // Failing hash
const plainPassword = "6666"; // Try the password you used during registration

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    console.log("Password Match:", result); // Should return true if correct
});
