let email, password, oldPassword, newPassword, newPasswordCopy, existingEmail,
existingPassword, existingOldPassword, existingNewPassword, existingNewPasswordCopy;
existingEmail = existingPassword = existingOldPassword = existingNewPassword =
existingNewPasswordCopy = false;
let minEmailLength = 5;
let minPasswordLength = 6;
const usersEmailAddresses = {
  'user@gmail.com': {
    password: 'UserPass'
  },
  'admin@gmail.com': {
    password: 'AdminPass'
  }
};
while (!existingEmail) {
  email = prompt('Enter your email');
  if (email === null || email.length === 0) {
    alert('Chancelled');
    break;
  } else {
    if (email.length < minEmailLength) {
      alert(`I don't know any emails having name length less than 5 symbols`);
    } else if (usersEmailAddresses.hasOwnProperty(email)) {
      existingEmail = true;
    } else {
      alert(`I don't know you`);
    }
  }
}
while (!existingPassword && existingEmail) {
  password = prompt('Enter your password');
  if (password === null || password.length === 0) {
    alert('Chancelled');
    break;
  } else if (password === usersEmailAddresses[email].password) {
    existingPassword = true;
  } else {
    alert('Wrong password');
  }
}
if (existingEmail && existingPassword) {
  if (confirm('Do you want to change your password?')) {
    while (!existingOldPassword) {
      oldPassword = prompt('Enter the old password');
      if (oldPassword === null || oldPassword.length === 0) {
        alert('Chancelled');
        break;
      } else if (oldPassword === usersEmailAddresses[email].password) {
        existingOldPassword = true;
      } else {
        alert('Wrong password');
      }
    }
    while (!existingNewPassword && existingOldPassword) {
      newPassword = prompt('Enter your new password');
      if (newPassword.length < minPasswordLength) {
        alert(`It's too short password. Sorry`);
      } else {
        existingNewPassword = true;
        while (!existingNewPasswordCopy) {
          newPasswordCopy = prompt('Enter again your new password');
          if (oldPassword === null) {
            break;
          } else if (newPassword === newPasswordCopy) {
            existingNewPasswordCopy = true;
            usersEmailAddresses[email].password = newPassword;
            alert('You have successfully changed your password');
          } else {
            alert('You wrote the wrong password');
          }
        }
      }
    }
  } else {
    alert('You have failed the change');
  }
}
