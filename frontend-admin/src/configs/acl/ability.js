import { Ability, AbilityBuilder } from '@casl/ability'
import { initialAbility } from './initialAbility'


const userData = JSON.parse(localStorage.getItem('user'))
const existingAbility = [];

if (userData && userData.role === 'admin') {
    existingAbility.push(

      //{ action: 'manage', subject: 'all' }
      { action: 'read', subject: 'home' },
      { action: 'manage', subject: 'alat' },
      { action: 'read', subject: 'setting' },
      { action: 'manage', subject: 'kategori' },
      { action: 'manage', subject: 'lokasi' },
      { action: 'manage', subject: 'laboratorium' },
      { action: 'manage', subject: 'pages' },
      { action: 'manage', subject: 'user' },
    );
  }

// Define abilities based on the user's role
if (userData && userData.role === 'koordinator') {
  existingAbility.push(
    { action: 'read', subject: 'home' },
    { action: 'manage', subject: 'alat' },
    { action: 'read', subject: 'profilelab' },
    { action: 'update', subject: 'laboratorium' },

  );
}

if (userData && userData.role === 'manajer') {
  existingAbility.push(

  );
}

// Define abilities based on the user's role
if (userData && userData.role === 'public') {
  existingAbility.push(
    { action: 'read', subject: 'home' },

  );
}

export default new Ability(existingAbility || initialAbility)
